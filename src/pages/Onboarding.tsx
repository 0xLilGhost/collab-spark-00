import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Step components
import OnboardingStep1 from "@/components/onboarding/OnboardingStep1";
import OnboardingStep2 from "@/components/onboarding/OnboardingStep2";
import OnboardingStep3 from "@/components/onboarding/OnboardingStep3";
import OnboardingStep4 from "@/components/onboarding/OnboardingStep4";
import OnboardingStep5 from "@/components/onboarding/OnboardingStep5";
import OnboardingStep6 from "@/components/onboarding/OnboardingStep6";
import OnboardingStep7 from "@/components/onboarding/OnboardingStep7";

export interface OnboardingData {
  // Step 1 - Basic Info (Required)
  full_name: string;
  avatar_url: string;
  email: string;
  linkedin_url: string;
  location: string;
  
  // Step 2 - Professional Background (Required)
  bio: string;
  impressive_accomplishment: string;
  is_technical: boolean;
  
  // Step 3 - Education & Employment (Optional)
  education: Array<{
    school: string;
    degree: string;
    field_of_study: string;
    graduation_year: number | null;
  }>;
  employment: Array<{
    employer: string;
    position: string;
    start_date: string;
    end_date: string;
    is_current: boolean;
  }>;
  
  // Step 4 - Personal Info (Optional)
  gender: string;
  birthdate: string;
  social_media_url: string;
  
  // Step 5 - Startup Readiness (Required)
  has_startup_idea: string;
  startup_ideas: string;
  has_cofounder: boolean;
  fulltime_availability: string;
  responsibility_areas: string[];
  interests: string[];
  
  // Step 6 - Personal & Values (Optional)
  equity_expectation: string;
  hobbies: string;
  life_path: string;
  additional_info: string;
  
  // Step 7 - Co-founder Preferences (Required)
  cofounder_idea_preference: string;
  cofounder_technical_preference: string;
  cofounder_timing_preference: string;
  cofounder_location_preference: string;
  cofounder_location_distance: number;
  cofounder_age_preference: string;
  cofounder_age_min: number;
  cofounder_age_max: number;
  cofounder_responsibility_areas: string[];
  cofounder_interest_preference: string;
}

const TOTAL_STEPS = 7;

const Onboarding = () => {
  const { user, loading: authLoading } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<OnboardingData>({
    full_name: "",
    avatar_url: "",
    email: "",
    linkedin_url: "",
    location: "",
    bio: "",
    impressive_accomplishment: "",
    is_technical: false,
    education: [],
    employment: [],
    gender: "",
    birthdate: "",
    social_media_url: "",
    has_startup_idea: "",
    startup_ideas: "",
    has_cofounder: false,
    fulltime_availability: "",
    responsibility_areas: [],
    interests: [],
    equity_expectation: "",
    hobbies: "",
    life_path: "",
    additional_info: "",
    cofounder_idea_preference: "no_preference",
    cofounder_technical_preference: "no_preference",
    cofounder_timing_preference: "no_preference",
    cofounder_location_preference: "no_preference",
    cofounder_location_distance: 50,
    cofounder_age_preference: "no_preference",
    cofounder_age_min: 18,
    cofounder_age_max: 65,
    cofounder_responsibility_areas: [],
    cofounder_interest_preference: "no_preference",
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const loadExistingData = async () => {
      if (!user) return;
      
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (profile) {
        setData(prev => ({
          ...prev,
          full_name: profile.full_name || "",
          avatar_url: profile.avatar_url || "",
          email: profile.email || "",
          linkedin_url: profile.linkedin_url || "",
          location: profile.location || "",
          bio: profile.bio || "",
          impressive_accomplishment: (profile as any).impressive_accomplishment || "",
          is_technical: (profile as any).is_technical || false,
          gender: (profile as any).gender || "",
          birthdate: (profile as any).birthdate || "",
          social_media_url: (profile as any).social_media_url || "",
          has_startup_idea: (profile as any).has_startup_idea || "",
          startup_ideas: (profile as any).startup_ideas || "",
          has_cofounder: (profile as any).has_cofounder || false,
          fulltime_availability: (profile as any).fulltime_availability || "",
          responsibility_areas: (profile as any).responsibility_areas || [],
          interests: profile.interests || [],
          equity_expectation: (profile as any).equity_expectation || "",
          hobbies: (profile as any).hobbies || "",
          life_path: (profile as any).life_path || "",
          additional_info: (profile as any).additional_info || "",
          cofounder_idea_preference: (profile as any).cofounder_idea_preference || "no_preference",
          cofounder_technical_preference: (profile as any).cofounder_technical_preference || "no_preference",
          cofounder_timing_preference: (profile as any).cofounder_timing_preference || "no_preference",
          cofounder_location_preference: (profile as any).cofounder_location_preference || "no_preference",
          cofounder_location_distance: (profile as any).cofounder_location_distance || 50,
          cofounder_age_preference: (profile as any).cofounder_age_preference || "no_preference",
          cofounder_age_min: (profile as any).cofounder_age_min || 18,
          cofounder_age_max: (profile as any).cofounder_age_max || 65,
          cofounder_responsibility_areas: (profile as any).cofounder_responsibility_areas || [],
          cofounder_interest_preference: (profile as any).cofounder_interest_preference || "no_preference",
        }));

        if ((profile as any).onboarding_step) {
          setCurrentStep((profile as any).onboarding_step);
        }
      }

      // Load education
      const { data: educationData } = await supabase
        .from("education")
        .select("*")
        .eq("user_id", user.id);

      if (educationData && educationData.length > 0) {
        setData(prev => ({
          ...prev,
          education: educationData.map(e => ({
            school: e.school,
            degree: e.degree || "",
            field_of_study: e.field_of_study || "",
            graduation_year: e.graduation_year,
          })),
        }));
      }

      // Load employment
      const { data: employmentData } = await supabase
        .from("employment")
        .select("*")
        .eq("user_id", user.id);

      if (employmentData && employmentData.length > 0) {
        setData(prev => ({
          ...prev,
          employment: employmentData.map(e => ({
            employer: e.employer,
            position: e.position || "",
            start_date: e.start_date || "",
            end_date: e.end_date || "",
            is_current: e.is_current || false,
          })),
        }));
      }
    };

    loadExistingData();
  }, [user]);

  const updateData = (updates: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const saveProgress = async (step: number, isComplete = false) => {
    if (!user) return;
    setSaving(true);

    try {
      // Save profile data
      const profileUpdate: any = {
        full_name: data.full_name,
        avatar_url: data.avatar_url,
        linkedin_url: data.linkedin_url,
        location: data.location,
        bio: data.bio,
        impressive_accomplishment: data.impressive_accomplishment,
        is_technical: data.is_technical,
        gender: data.gender,
        birthdate: data.birthdate || null,
        social_media_url: data.social_media_url,
        has_startup_idea: data.has_startup_idea,
        startup_ideas: data.startup_ideas,
        has_cofounder: data.has_cofounder,
        fulltime_availability: data.fulltime_availability,
        responsibility_areas: data.responsibility_areas,
        interests: data.interests,
        equity_expectation: data.equity_expectation,
        hobbies: data.hobbies,
        life_path: data.life_path,
        additional_info: data.additional_info,
        cofounder_idea_preference: data.cofounder_idea_preference,
        cofounder_technical_preference: data.cofounder_technical_preference,
        cofounder_timing_preference: data.cofounder_timing_preference,
        cofounder_location_preference: data.cofounder_location_preference,
        cofounder_location_distance: data.cofounder_location_distance,
        cofounder_age_preference: data.cofounder_age_preference,
        cofounder_age_min: data.cofounder_age_min,
        cofounder_age_max: data.cofounder_age_max,
        cofounder_responsibility_areas: data.cofounder_responsibility_areas,
        cofounder_interest_preference: data.cofounder_interest_preference,
        onboarding_step: step,
        onboarding_completed: isComplete,
      };

      const { error: profileError } = await supabase
        .from("profiles")
        .update(profileUpdate)
        .eq("id", user.id);

      if (profileError) throw profileError;

      // Save education
      if (data.education.length > 0) {
        await supabase.from("education").delete().eq("user_id", user.id);
        const educationInserts = data.education
          .filter(e => e.school)
          .map(e => ({
            user_id: user.id,
            school: e.school,
            degree: e.degree || null,
            field_of_study: e.field_of_study || null,
            graduation_year: e.graduation_year,
          }));
        if (educationInserts.length > 0) {
          await supabase.from("education").insert(educationInserts);
        }
      }

      // Save employment
      if (data.employment.length > 0) {
        await supabase.from("employment").delete().eq("user_id", user.id);
        const employmentInserts = data.employment
          .filter(e => e.employer)
          .map(e => ({
            user_id: user.id,
            employer: e.employer,
            position: e.position || null,
            start_date: e.start_date || null,
            end_date: e.end_date || null,
            is_current: e.is_current,
          }));
        if (employmentInserts.length > 0) {
          await supabase.from("employment").insert(employmentInserts);
        }
      }

      if (isComplete) {
        toast({
          title: t("onboarding.complete"),
          description: t("onboarding.completeDesc"),
        });
        navigate("/browse");
      }
    } catch (error) {
      console.error("Error saving:", error);
      toast({
        title: t("error"),
        description: t("onboarding.saveError"),
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleNext = async () => {
    if (currentStep < TOTAL_STEPS) {
      await saveProgress(currentStep + 1);
      setCurrentStep(currentStep + 1);
    } else {
      await saveProgress(TOTAL_STEPS, true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = async () => {
    if (currentStep < TOTAL_STEPS) {
      await saveProgress(currentStep + 1);
      setCurrentStep(currentStep + 1);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">{t("loading")}</p>
      </div>
    );
  }

  const progress = (currentStep / TOTAL_STEPS) * 100;
  const isOptionalStep = currentStep === 3 || currentStep === 4 || currentStep === 6;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <OnboardingStep1 data={data} updateData={updateData} />;
      case 2:
        return <OnboardingStep2 data={data} updateData={updateData} />;
      case 3:
        return <OnboardingStep3 data={data} updateData={updateData} />;
      case 4:
        return <OnboardingStep4 data={data} updateData={updateData} />;
      case 5:
        return <OnboardingStep5 data={data} updateData={updateData} />;
      case 6:
        return <OnboardingStep6 data={data} updateData={updateData} />;
      case 7:
        return <OnboardingStep7 data={data} updateData={updateData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              {t("onboarding.step")} {currentStep} {t("onboarding.of")} {TOTAL_STEPS}
            </span>
            {isOptionalStep && (
              <span className="text-sm text-muted-foreground">
                ({t("onboarding.optional")})
              </span>
            )}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        <div className="bg-card rounded-lg border p-6 mb-6">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1 || saving}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("onboarding.back")}
          </Button>

          <div className="flex gap-2">
            {isOptionalStep && (
              <Button variant="ghost" onClick={handleSkip} disabled={saving}>
                {t("onboarding.skip")}
              </Button>
            )}
            <Button onClick={handleNext} disabled={saving}>
              {saving ? t("onboarding.saving") : currentStep === TOTAL_STEPS ? t("onboarding.finish") : t("onboarding.next")}
              {currentStep < TOTAL_STEPS && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
