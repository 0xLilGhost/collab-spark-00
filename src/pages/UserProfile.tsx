import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MessageDialog from "@/components/MessageDialog";
import { 
  ArrowLeft, MapPin, Clock, Languages, Briefcase, GraduationCap, 
  Linkedin, Github, Globe, Calendar, User, Target, Lightbulb 
} from "lucide-react";

const UserProfile = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [education, setEducation] = useState<any[]>([]);
  const [employment, setEmployment] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadProfile();
    }
  }, [id]);

  const loadProfile = async () => {
    setLoading(true);
    
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    const { data: eduData } = await supabase
      .from("education")
      .select("*")
      .eq("user_id", id);

    const { data: empData } = await supabase
      .from("employment")
      .select("*")
      .eq("user_id", id)
      .order("start_date", { ascending: false });

    setProfile(profileData);
    setEducation(eduData || []);
    setEmployment(empData || []);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">{t("loading")}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">{t("userProfile.notFound")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("back")}
          </Button>

          {/* Header Card */}
          <Card className="p-8 mb-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="w-32 h-32">
                <AvatarImage src={profile.avatar_url} />
                <AvatarFallback className="text-3xl">
                  {profile.full_name?.charAt(0) || <User className="w-12 h-12" />}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{profile.full_name}</h1>
                <p className="text-xl text-muted-foreground mb-4">{profile.role}</p>
                
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  {profile.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {profile.location}
                    </div>
                  )}
                  {profile.timezone && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {profile.timezone}
                    </div>
                  )}
                  {profile.languages?.length > 0 && (
                    <div className="flex items-center gap-1">
                      <Languages className="h-4 w-4" />
                      {profile.languages.join(", ")}
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  {profile.linkedin_url && (
                    <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        <Linkedin className="h-4 w-4 mr-1" /> LinkedIn
                      </Button>
                    </a>
                  )}
                  {profile.github_url && (
                    <a href={profile.github_url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        <Github className="h-4 w-4 mr-1" /> GitHub
                      </Button>
                    </a>
                  )}
                  {profile.social_media_url && (
                    <a href={profile.social_media_url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        <Globe className="h-4 w-4 mr-1" /> Social
                      </Button>
                    </a>
                  )}
                  <MessageDialog
                    recipientId={profile.id}
                    recipientName={profile.full_name}
                    buttonText={t("sendMessage")}
                  />
                </div>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              {/* Bio */}
              {profile.bio && (
                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-3">{t("userProfile.about")}</h2>
                  <p className="text-muted-foreground whitespace-pre-wrap">{profile.bio}</p>
                </Card>
              )}

              {/* Impressive Accomplishment */}
              {profile.impressive_accomplishment && (
                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    {t("userProfile.accomplishment")}
                  </h2>
                  <p className="text-muted-foreground whitespace-pre-wrap">{profile.impressive_accomplishment}</p>
                </Card>
              )}

              {/* Startup Ideas */}
              {profile.startup_ideas && (
                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    {t("userProfile.startupIdeas")}
                  </h2>
                  <p className="text-muted-foreground whitespace-pre-wrap">{profile.startup_ideas}</p>
                </Card>
              )}

              {/* Education */}
              {education.length > 0 && (
                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    {t("userProfile.education")}
                  </h2>
                  <div className="space-y-4">
                    {education.map((edu) => (
                      <div key={edu.id} className="border-l-2 border-primary/20 pl-4">
                        <h3 className="font-medium">{edu.school}</h3>
                        <p className="text-sm text-muted-foreground">
                          {edu.degree} {edu.field_of_study && `in ${edu.field_of_study}`}
                        </p>
                        {edu.graduation_year && (
                          <p className="text-sm text-muted-foreground">
                            Class of {edu.graduation_year}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Employment */}
              {employment.length > 0 && (
                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    {t("userProfile.experience")}
                  </h2>
                  <div className="space-y-4">
                    {employment.map((emp) => (
                      <div key={emp.id} className="border-l-2 border-primary/20 pl-4">
                        <h3 className="font-medium">{emp.position || "Position"}</h3>
                        <p className="text-sm text-muted-foreground">{emp.employer}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {emp.start_date} - {emp.is_current ? t("userProfile.present") : emp.end_date}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Life Path */}
              {profile.life_path && (
                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-3">{t("userProfile.lifePath")}</h2>
                  <p className="text-muted-foreground whitespace-pre-wrap">{profile.life_path}</p>
                </Card>
              )}

              {/* Hobbies */}
              {profile.hobbies && (
                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-3">{t("userProfile.hobbies")}</h2>
                  <p className="text-muted-foreground whitespace-pre-wrap">{profile.hobbies}</p>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Skills */}
              {profile.skills?.length > 0 && (
                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-3">{t("userProfile.skills")}</h2>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill: string, i: number) => (
                      <Badge key={i} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </Card>
              )}

              {/* Interests */}
              {profile.interests?.length > 0 && (
                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-3">{t("userProfile.interests")}</h2>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest: string, i: number) => (
                      <Badge key={i} variant="outline">{t(`onboarding.interest.${interest}`)}</Badge>
                    ))}
                  </div>
                </Card>
              )}

              {/* Startup Readiness */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-3">{t("userProfile.startupReadiness")}</h2>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">{t("userProfile.technical")}:</span>
                    <span className="ml-2 font-medium">{profile.is_technical ? t("onboarding.yes") : t("onboarding.no")}</span>
                  </div>
                  {profile.fulltime_availability && (
                    <div>
                      <span className="text-muted-foreground">{t("userProfile.availability")}:</span>
                      <span className="ml-2 font-medium">{t(`onboarding.ft${profile.fulltime_availability.charAt(0).toUpperCase() + profile.fulltime_availability.slice(1).replace('_', '')}`)}</span>
                    </div>
                  )}
                  {profile.has_startup_idea && (
                    <div>
                      <span className="text-muted-foreground">{t("userProfile.hasIdea")}:</span>
                      <span className="ml-2 font-medium">{t(`onboarding.idea${profile.has_startup_idea.charAt(0).toUpperCase() + profile.has_startup_idea.slice(1)}`)}</span>
                    </div>
                  )}
                  {profile.equity_expectation && (
                    <div>
                      <span className="text-muted-foreground">{t("userProfile.equity")}:</span>
                      <span className="ml-2 font-medium">{t(`onboarding.equity${profile.equity_expectation.charAt(0).toUpperCase() + profile.equity_expectation.slice(1)}`)}</span>
                    </div>
                  )}
                </div>
              </Card>

              {/* Responsibility Areas */}
              {profile.responsibility_areas?.length > 0 && (
                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-3">{t("userProfile.responsibilities")}</h2>
                  <div className="flex flex-wrap gap-2">
                    {profile.responsibility_areas.map((area: string, i: number) => (
                      <Badge key={i} variant="secondary">{t(`onboarding.area.${area}`)}</Badge>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserProfile;
