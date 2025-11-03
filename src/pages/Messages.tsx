import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Send, Inbox, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
  sender?: {
    full_name: string;
    avatar_url: string;
  };
}

const Messages = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    loadMessages();
    
    // Set up realtime subscription
    const channel = supabase
      .channel('messages-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
          filter: `recipient_id=eq.${user.id}`
        },
        () => {
          loadMessages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, navigate]);

  const loadMessages = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("recipient_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: t("messages.loadError"),
        description: error.message,
        variant: "destructive",
      });
      setMessages([]);
    } else {
      // Fetch sender profiles separately
      const messagesWithSenders = await Promise.all(
        (data || []).map(async (msg) => {
          const { data: senderData } = await supabase
            .from("profiles")
            .select("full_name, avatar_url")
            .eq("id", msg.sender_id)
            .single();
          
          return {
            ...msg,
            sender: senderData || { full_name: "Unknown", avatar_url: "" }
          };
        })
      );
      setMessages(messagesWithSenders);
    }
    setLoading(false);
  };

  const markAsRead = async (messageId: string) => {
    await supabase
      .from("messages")
      .update({ read: true })
      .eq("id", messageId);
    
    setMessages(messages.map(m => 
      m.id === messageId ? { ...m, read: true } : m
    ));
  };

  const handleMessageClick = (message: Message) => {
    setSelectedMessage(message);
    if (!message.read) {
      markAsRead(message.id);
    }
  };

  const handleReply = async () => {
    if (!user || !selectedMessage || !replyText.trim()) return;

    setSending(true);
    const { error } = await supabase.from("messages").insert({
      sender_id: user.id,
      recipient_id: selectedMessage.sender_id,
      subject: `Re: ${selectedMessage.subject}`,
      message: replyText.trim(),
    });

    setSending(false);

    if (error) {
      toast({
        title: t("messages.sendError"),
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: t("messages.replySent"),
        description: t("messages.replySentDesc"),
      });
      setReplyText("");
      setSelectedMessage(null);
      loadMessages();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">{t("messages.loading")}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <Inbox className="h-8 w-8 text-primary" />
              {t("messages.inbox")}
            </h1>
            <p className="text-muted-foreground">
              {t("messages.inboxDesc")}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Messages List */}
            <Card className="lg:col-span-1 p-4 max-h-[600px] overflow-y-auto">
              {messages.length === 0 ? (
                <div className="text-center py-12">
                  <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">{t("messages.noMessages")}</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      onClick={() => handleMessageClick(message)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedMessage?.id === message.id
                          ? "bg-primary/10"
                          : "hover:bg-muted"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="h-10 w-10 rounded-full bg-gradient-hero flex-shrink-0"
                          style={{
                            backgroundImage: message.sender?.avatar_url 
                              ? `url(${message.sender.avatar_url})`
                              : undefined,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-semibold text-sm truncate">
                              {message.sender?.full_name || "Unknown"}
                            </p>
                            {!message.read && (
                              <Badge variant="default" className="text-xs">
                                {t("messages.new")}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm font-medium truncate mb-1">
                            {message.subject}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {message.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(message.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Message Detail & Reply */}
            <Card className="lg:col-span-2 p-6">
              {selectedMessage ? (
                <div className="space-y-6">
                  <div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedMessage(null)}
                      className="mb-4"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      {t("messages.back")}
                    </Button>
                    
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className="h-12 w-12 rounded-full bg-gradient-hero flex-shrink-0"
                        style={{
                          backgroundImage: selectedMessage.sender?.avatar_url
                            ? `url(${selectedMessage.sender.avatar_url})`
                            : undefined,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">
                          {selectedMessage.sender?.full_name || "Unknown"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(selectedMessage.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <h2 className="text-xl font-bold mb-4">
                      {selectedMessage.subject}
                    </h2>
                    
                    <div className="bg-muted/50 rounded-lg p-4 mb-6">
                      <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                    </div>

                    <Separator className="my-6" />

                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <Send className="h-5 w-5" />
                        {t("messages.reply")}
                      </h3>
                      <Textarea
                        placeholder={t("messages.replyPlaceholder")}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        rows={6}
                        className="resize-none"
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setReplyText("");
                            setSelectedMessage(null);
                          }}
                        >
                          {t("messages.cancel")}
                        </Button>
                        <Button onClick={handleReply} disabled={sending || !replyText.trim()}>
                          <Send className="h-4 w-4" />
                          {sending ? t("messages.sending") : t("messages.sendReply")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full min-h-[400px]">
                  <div className="text-center">
                    <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {t("messages.selectMessage")}
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Messages;
