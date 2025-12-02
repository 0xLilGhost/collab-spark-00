import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    
    if (!message) {
      return new Response(JSON.stringify({ error: "Missing message" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("AI service not configured");
    }

    // Get authorization header to identify user
    const authHeader = req.headers.get("authorization");
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    let userProfile = null;
    let chatHistory: { role: string; content: string }[] = [];
    let userId: string | null = null;

    // Try to get user from JWT
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      const { data: { user }, error: userError } = await supabase.auth.getUser(token);
      
      if (user && !userError) {
        userId = user.id;
        console.log("Authenticated user:", userId);

        // Fetch user profile
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();
        
        if (profile) {
          userProfile = profile;
          console.log("Loaded profile for user:", profile.full_name);
        }

        // Fetch recent chat history (last 10 messages)
        const { data: messages } = await supabase
          .from("ai_messages")
          .select("role, content")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(10);

        if (messages) {
          chatHistory = messages.reverse();
          console.log("Loaded chat history:", chatHistory.length, "messages");
        }
      }
    }

    // Build user profile summary for context
    let userProfileSummary = "No profile information available.";
    if (userProfile) {
      const p = userProfile;
      userProfileSummary = `
User Profile:
- Name: ${p.full_name || "Unknown"}
- Role: ${p.role || "Not specified"}
- School: ${p.school || "Not specified"}
- Location: ${p.location || "Not specified"}
- Experience Level: ${p.experience_level || "Not specified"}
- User Type: ${p.user_type || "Not specified"} (looking for: ${p.user_type === 'competition' ? 'hackathon teammates' : p.user_type === 'startup' ? 'co-founders' : 'both'})
- Skills: ${p.skills?.join(", ") || "Not specified"}
- Interests: ${p.interests?.join(", ") || "Not specified"}
- Languages: ${p.languages?.join(", ") || "Not specified"}
- Bio: ${p.bio || "Not specified"}
- Availability: ${p.availability || "Not specified"}
- Hours per week: ${p.hours_per_week || "Not specified"}
`;
    }

    // Build messages for LLM
    const systemPrompt = `You are Dova, a friendly AI assistant for a co-founder and teammate matching platform. Your personality is warm, encouraging, and helpful - like a supportive mentor.

Your main goals:
1. Help users find perfect co-founders or hackathon teammates
2. Understand what users are looking for in partners
3. Give personalized advice based on their profile and preferences
4. If their profile is incomplete, gently ask questions to understand them better

${userProfile ? `Current user's profile from database:
${userProfileSummary}

Use this information to personalize your responses. Reference their skills, interests, or goals when relevant.` : "The user is not logged in or has no profile yet. Encourage them to create an account and complete their profile for better matching."}

Keep responses concise (2-4 sentences usually). Be conversational and supportive. Use occasional emojis to be friendly 🌟

If asked about finding matches, suggest they:
- Complete their profile with skills and interests
- Browse the "Find Co-founders" or "Competitions" sections
- Be specific about what they're looking for`;

    const messagesForLLM = [
      { role: "system", content: systemPrompt },
      ...chatHistory.map(m => ({ 
        role: m.role as "user" | "assistant", 
        content: m.content 
      })),
      { role: "user", content: message },
    ];

    console.log("Sending to AI with", messagesForLLM.length, "messages");

    // Call Lovable AI Gateway
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: messagesForLLM,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Too many requests. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error("AI service error");
    }

    const data = await response.json();
    const aiReply = data.choices?.[0]?.message?.content ?? "I'm having trouble responding right now. Please try again!";

    console.log("AI reply received, length:", aiReply.length);

    // Save conversation to database if user is authenticated
    if (userId) {
      const { error: insertError } = await supabase.from("ai_messages").insert([
        { user_id: userId, role: "user", content: message },
        { user_id: userId, role: "assistant", content: aiReply },
      ]);
      
      if (insertError) {
        console.error("Error saving messages:", insertError);
      } else {
        console.log("Messages saved to database");
      }
    }

    return new Response(JSON.stringify({ reply: aiReply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error in dova-chat:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "An error occurred" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
