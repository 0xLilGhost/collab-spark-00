import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const Profile = () => {
  const { t } = useLanguage();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [skillInput, setSkillInput] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user?.id)
      .single();

    if (error) {
      console.error("Error loading profile:", error);
    } else {
      setProfile(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: profile.full_name,
        role: profile.role,
        school: profile.school,
        location: profile.location,
        timezone: profile.timezone,
        bio: profile.bio,
        skills: profile.skills,
        interests: profile.interests,
        user_type: profile.user_type,
        experience_level: profile.experience_level,
        availability: profile.availability,
        linkedin_url: profile.linkedin_url,
        github_url: profile.github_url,
      })
      .eq("id", user?.id);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
    }

    setLoading(false);
  };

  const addSkill = () => {
    if (skillInput.trim() && !profile.skills?.includes(skillInput.trim())) {
      setProfile({
        ...profile,
        skills: [...(profile.skills || []), skillInput.trim()],
      });
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setProfile({
      ...profile,
      skills: profile.skills?.filter((s: string) => s !== skill) || [],
    });
  };

  if (authLoading || !profile) {
    return <div className="min-h-screen flex items-center justify-center">{t("profile.loading")}</div>;
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-24 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">{t("profile.myProfile")}</h1>
        
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="full_name">{t("profile.fullName")}</Label>
              <Input
                id="full_name"
                value={profile.full_name || ""}
                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="user_type">{t("profile.interestedIn")}</Label>
              <Select
                value={profile.user_type || "both"}
                onValueChange={(value) => setProfile({ ...profile, user_type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="competition">{t("profile.competitions")}</SelectItem>
                  <SelectItem value="startup">{t("profile.startups")}</SelectItem>
                  <SelectItem value="both">{t("profile.both")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">{t("profile.role")}</Label>
              <Input
                id="role"
                placeholder="e.g., Developer, Designer, PM"
                value={profile.role || ""}
                onChange={(e) => setProfile({ ...profile, role: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="school">{t("profile.school")}</Label>
                <Input
                  id="school"
                  value={profile.school || ""}
                  onChange={(e) => setProfile({ ...profile, school: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">{t("profile.location")}</Label>
                <Input
                  id="location"
                  placeholder="City, Country"
                  value={profile.location || ""}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">{t("profile.bio")}</Label>
              <Textarea
                id="bio"
                placeholder={t("profile.bioPlaceholder")}
                value={profile.bio || ""}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">{t("profile.skills")}</Label>
              <div className="flex gap-2">
                <Input
                  id="skills"
                  placeholder={t("profile.addSkill")}
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                />
                <Button type="button" onClick={addSkill}>{t("profile.add")}</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {profile.skills?.map((skill: string) => (
                  <Badge key={skill} variant="secondary" className="gap-1">
                    {skill}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeSkill(skill)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin_url">{t("profile.linkedin")}</Label>
              <Input
                id="linkedin_url"
                type="url"
                placeholder="https://linkedin.com/in/yourprofile"
                value={profile.linkedin_url || ""}
                onChange={(e) => setProfile({ ...profile, linkedin_url: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="github_url">{t("profile.github")}</Label>
              <Input
                id="github_url"
                type="url"
                placeholder="https://github.com/yourusername"
                value={profile.github_url || ""}
                onChange={(e) => setProfile({ ...profile, github_url: e.target.value })}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? t("profile.saving") : t("profile.saveChanges")}
            </Button>
          </form>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
