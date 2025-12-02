import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MessageDialog from "@/components/MessageDialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  MapPin, 
  Briefcase, 
  Globe, 
  FileText, 
  ArrowLeft,
  Calendar,
  Building2
} from "lucide-react";

interface Team {
  id: string;
  name: string;
  description: string | null;
  stage: string | null;
  industry: string | null;
  location: string | null;
  open_roles: string[] | null;
  team_size: number | null;
  logo_url: string | null;
  website_url: string | null;
  pitch_deck_url: string | null;
  looking_for: string | null;
  type: string;
  equity_offered: boolean | null;
  founder_id: string;
  created_at: string;
}

interface Founder {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: string | null;
  email: string;
}

const TeamDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [team, setTeam] = useState<Team | null>(null);
  const [founder, setFounder] = useState<Founder | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeam = async () => {
      if (!id) return;
      
      const { data: teamData, error: teamError } = await supabase
        .from("teams")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (teamError || !teamData) {
        console.error("Error loading team:", teamError);
        setLoading(false);
        return;
      }

      setTeam(teamData);

      const { data: founderData } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url, role, email")
        .eq("id", teamData.founder_id)
        .maybeSingle();

      if (founderData) {
        setFounder(founderData);
      }

      setLoading(false);
    };

    loadTeam();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">{t("loading")}</p>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Team not found</h1>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t("back")}
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="h-20 w-20 rounded-lg bg-gradient-accent flex-shrink-0 flex items-center justify-center">
                  {team.logo_url ? (
                    <img 
                      src={team.logo_url} 
                      alt={team.name} 
                      className="w-full h-full object-cover rounded-lg" 
                    />
                  ) : (
                    <Building2 className="h-10 w-10 text-accent-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-2">{team.name}</h1>
                  <div className="flex flex-wrap items-center gap-2">
                    {team.stage && (
                      <Badge variant="outline">{team.stage}</Badge>
                    )}
                    {team.industry && (
                      <Badge variant="secondary">{team.industry}</Badge>
                    )}
                    {team.equity_offered && (
                      <Badge className="bg-gradient-hero text-primary-foreground border-0">
                        Equity Offered
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold mb-2">{t("description")}</h2>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {team.description || "No description provided."}
                  </p>
                </div>

                {team.looking_for && (
                  <div>
                    <h2 className="text-lg font-semibold mb-2">{t("lookingFor")}</h2>
                    <p className="text-muted-foreground">{team.looking_for}</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Open Roles */}
            {team.open_roles && team.open_roles.length > 0 && (
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  {t("openRoles")}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {team.open_roles.map((role, index) => (
                    <Badge 
                      key={index} 
                      className="bg-gradient-hero text-primary-foreground border-0 px-4 py-2"
                    >
                      {role}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Team Info */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">{t("teamInfo")}</h2>
              <div className="space-y-3">
                {team.location && (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span>{team.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Users className="h-4 w-4 flex-shrink-0" />
                  <span>{team.team_size || 1} {t("members")}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Calendar className="h-4 w-4 flex-shrink-0" />
                  <span>{new Date(team.created_at).toLocaleDateString()}</span>
                </div>
                {team.website_url && (
                  <a 
                    href={team.website_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-primary hover:underline"
                  >
                    <Globe className="h-4 w-4 flex-shrink-0" />
                    <span>Website</span>
                  </a>
                )}
                {team.pitch_deck_url && (
                  <a 
                    href={team.pitch_deck_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-primary hover:underline"
                  >
                    <FileText className="h-4 w-4 flex-shrink-0" />
                    <span>Pitch Deck</span>
                  </a>
                )}
              </div>
            </Card>

            {/* Founder Card */}
            {founder && (
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">{t("founder")}</h2>
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={founder.avatar_url || undefined} />
                    <AvatarFallback>
                      {founder.full_name?.charAt(0) || "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{founder.full_name || "Anonymous"}</p>
                    {founder.role && (
                      <p className="text-sm text-muted-foreground">{founder.role}</p>
                    )}
                  </div>
                </div>
                <MessageDialog
                  recipientId={founder.id}
                  recipientName={founder.full_name || "Founder"}
                  buttonText={t("sendMessage")}
                />
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TeamDetail;
