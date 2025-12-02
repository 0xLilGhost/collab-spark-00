import { useLanguage } from "@/contexts/LanguageContext";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import type { OnboardingData } from "@/pages/Onboarding";

interface Props {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
}

const RESPONSIBILITY_AREAS = [
  "product",
  "engineering",
  "design",
  "marketing",
  "sales",
  "operations",
  "finance",
  "legal",
  "hr",
  "customer_success",
];

const INTERESTS = [
  "ai",
  "b2b",
  "developer_tools",
  "education",
  "energy",
  "entertainment",
  "fintech",
  "health",
  "hardware",
  "robotics",
  "travel",
  "ecommerce",
  "social",
  "climate",
];

const OnboardingStep5 = ({ data, updateData }: Props) => {
  const { t } = useLanguage();

  const toggleResponsibility = (area: string) => {
    const current = data.responsibility_areas || [];
    if (current.includes(area)) {
      updateData({ responsibility_areas: current.filter((a) => a !== area) });
    } else {
      updateData({ responsibility_areas: [...current, area] });
    }
  };

  const toggleInterest = (interest: string) => {
    const current = data.interests || [];
    if (current.includes(interest)) {
      updateData({ interests: current.filter((i) => i !== interest) });
    } else {
      updateData({ interests: [...current, interest] });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{t("onboarding.step5Title")}</h2>
        <p className="text-muted-foreground mt-1">{t("onboarding.step5Desc")}</p>
      </div>

      {/* Has Startup Idea */}
      <div>
        <Label className="mb-3 block">
          {t("onboarding.hasIdea")} <span className="text-destructive">*</span>
        </Label>
        <RadioGroup
          value={data.has_startup_idea}
          onValueChange={(v) => updateData({ has_startup_idea: v })}
        >
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="committed" id="idea-committed" className="mt-1" />
              <Label htmlFor="idea-committed" className="font-normal">
                {t("onboarding.ideaCommitted")}
              </Label>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="exploring" id="idea-exploring" className="mt-1" />
              <Label htmlFor="idea-exploring" className="font-normal">
                {t("onboarding.ideaExploring")}
              </Label>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="open" id="idea-open" className="mt-1" />
              <Label htmlFor="idea-open" className="font-normal">
                {t("onboarding.ideaOpen")}
              </Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Startup Ideas (conditional) */}
      {(data.has_startup_idea === "committed" || data.has_startup_idea === "exploring") && (
        <div>
          <Label htmlFor="startup_ideas">{t("onboarding.whatIdeas")}</Label>
          <Textarea
            id="startup_ideas"
            value={data.startup_ideas}
            onChange={(e) => updateData({ startup_ideas: e.target.value })}
            placeholder={t("onboarding.ideasPlaceholder")}
            rows={3}
          />
        </div>
      )}

      {/* Has Cofounder */}
      <div>
        <Label className="mb-3 block">
          {t("onboarding.hasCofounder")} <span className="text-destructive">*</span>
        </Label>
        <RadioGroup
          value={data.has_cofounder ? "yes" : "no"}
          onValueChange={(v) => updateData({ has_cofounder: v === "yes" })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="cofounder-yes" />
            <Label htmlFor="cofounder-yes">{t("onboarding.yes")}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="cofounder-no" />
            <Label htmlFor="cofounder-no">{t("onboarding.no")}</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Full-time Availability */}
      <div>
        <Label className="mb-3 block">
          {t("onboarding.fulltimeWhen")} <span className="text-destructive">*</span>
        </Label>
        <RadioGroup
          value={data.fulltime_availability}
          onValueChange={(v) => updateData({ fulltime_availability: v })}
        >
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="already" id="ft-already" className="mt-1" />
              <Label htmlFor="ft-already" className="font-normal">
                {t("onboarding.ftAlready")}
              </Label>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="ready" id="ft-ready" className="mt-1" />
              <Label htmlFor="ft-ready" className="font-normal">
                {t("onboarding.ftReady")}
              </Label>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="within_year" id="ft-year" className="mt-1" />
              <Label htmlFor="ft-year" className="font-normal">
                {t("onboarding.ftYear")}
              </Label>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="no_plans" id="ft-no" className="mt-1" />
              <Label htmlFor="ft-no" className="font-normal">
                {t("onboarding.ftNoPlans")}
              </Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Responsibility Areas */}
      <div>
        <Label className="mb-3 block">
          {t("onboarding.responsibilityAreas")} <span className="text-destructive">*</span>
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {RESPONSIBILITY_AREAS.map((area) => (
            <div key={area} className="flex items-center space-x-2">
              <Checkbox
                id={`resp-${area}`}
                checked={data.responsibility_areas?.includes(area)}
                onCheckedChange={() => toggleResponsibility(area)}
              />
              <Label htmlFor={`resp-${area}`} className="font-normal">
                {t(`onboarding.area.${area}`)}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div>
        <Label className="mb-3 block">
          {t("onboarding.interests")} <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground mb-3">
          {t("onboarding.interestsHint")}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {INTERESTS.map((interest) => (
            <div key={interest} className="flex items-center space-x-2">
              <Checkbox
                id={`int-${interest}`}
                checked={data.interests?.includes(interest)}
                onCheckedChange={() => toggleInterest(interest)}
              />
              <Label htmlFor={`int-${interest}`} className="font-normal">
                {t(`onboarding.interest.${interest}`)}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep5;
