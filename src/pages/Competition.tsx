import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProfileCard from "@/components/ProfileCard";
import TeamCard from "@/components/TeamCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Trophy } from "lucide-react";
import CreateTeamDialog from "@/components/CreateTeamDialog";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Competition = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [profiles, setProfiles] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    
    // Load profiles interested in competitions (competition or both)
    const { data: profilesData } = await supabase
      .from("profiles")
      .select("*")
      .or("user_type.eq.competition,user_type.eq.both,user_type.is.null")
      .limit(20);
    
    // Load competition teams only
    const { data: teamsData } = await supabase
      .from("teams")
      .select("*")
      .eq("type", "competition")
      .limit(20);

    setProfiles(profilesData || []);
    setTeams(teamsData || []);
    setLoading(false);
  };

  const filteredProfiles = profiles.filter((profile) =>
    searchQuery
      ? profile.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.role?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.skills?.some((skill: string) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : true
  );

  const filteredTeams = teams.filter((team) =>
    searchQuery
      ? team.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.industry?.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">{t("browse.loading")}</div>
          <p className="text-muted-foreground">{t("browse.loadingDesc")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-gradient-hero flex items-center justify-center">
                <Trophy className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-4xl font-bold">
                {t("competition.title")}
              </h1>
            </div>
            <p className="text-xl text-muted-foreground">
              {t("competition.description")}
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex gap-4 items-center">
              <CreateTeamDialog type="competition" onSuccess={loadData} />
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder={t("browse.searchPlaceholder")}
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                {t("browse.filters")}
              </Button>
            </div>

            <div className="flex flex-wrap gap-4">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t("browse.role")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="developer">{t("browse.developer")}</SelectItem>
                  <SelectItem value="designer">{t("browse.designer")}</SelectItem>
                  <SelectItem value="business">{t("browse.business")}</SelectItem>
                  <SelectItem value="marketing">{t("browse.marketing")}</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t("competition.competitionType")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hackathon">{t("competition.hackathon")}</SelectItem>
                  <SelectItem value="casecomp">{t("competition.caseCompetition")}</SelectItem>
                  <SelectItem value="designchallenge">{t("competition.designChallenge")}</SelectItem>
                  <SelectItem value="other">{t("competition.other")}</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t("browse.availability")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fulltime">{t("browse.fulltime")}</SelectItem>
                  <SelectItem value="parttime">{t("browse.parttime")}</SelectItem>
                  <SelectItem value="flexible">{t("browse.flexible")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tabs for Competitions and Teammates */}
          <Tabs defaultValue="competitions" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="competitions">{t("competition.competitions")}</TabsTrigger>
              <TabsTrigger value="people">{t("competition.teammates")}</TabsTrigger>
            </TabsList>

            <TabsContent value="competitions">
              {filteredTeams.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">{t("competition.noCompetitions")}</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTeams.map((team) => (
                    <TeamCard
                      key={team.id}
                      name={team.name}
                      description={team.description || "No description"}
                      stage={team.stage || "Not specified"}
                      industry={team.industry || "General"}
                      location={team.location || "Remote"}
                      roles={team.open_roles || []}
                      teamSize={team.team_size || 1}
                      logo={team.logo_url}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="people">
              {filteredProfiles.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">{t("browse.noProfiles")}</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProfiles.map((profile) => (
                    <ProfileCard
                      key={profile.id}
                      id={profile.id}
                      name={profile.full_name || "Anonymous"}
                      role={profile.role || "Not specified"}
                      school={profile.school}
                      location={profile.location || "Unknown"}
                      timezone={profile.timezone || "Not specified"}
                      languages={profile.languages || []}
                      skills={profile.skills || []}
                      bio={profile.bio || "No bio provided"}
                      avatar={profile.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.id}`}
                      availability={profile.availability || "Not specified"}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Competition;