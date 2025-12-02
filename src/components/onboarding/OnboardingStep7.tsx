import { useLanguage } from "@/contexts/LanguageContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
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

const OnboardingStep7 = ({ data, updateData }: Props) => {
  const { t } = useLanguage();

  const toggleCofounderResponsibility = (area: string) => {
    const current = data.cofounder_responsibility_areas || [];
    if (current.includes(area)) {
      updateData({ cofounder_responsibility_areas: current.filter((a) => a !== area) });
    } else {
      updateData({ cofounder_responsibility_areas: [...current, area] });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{t("onboarding.step7Title")}</h2>
        <p className="text-muted-foreground mt-1">{t("onboarding.step7Desc")}</p>
      </div>

      {/* Co-founder Idea Preference */}
      <div>
        <Label className="mb-3 block">{t("onboarding.cfIdeaPref")}</Label>
        <RadioGroup
          value={data.cofounder_idea_preference}
          onValueChange={(v) => updateData({ cofounder_idea_preference: v })}
        >
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="has_idea" id="cf-idea-yes" className="mt-1" />
              <Label htmlFor="cf-idea-yes" className="font-normal">
                {t("onboarding.cfWantsIdea")}
              </Label>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="no_idea" id="cf-idea-no" className="mt-1" />
              <Label htmlFor="cf-idea-no" className="font-normal">
                {t("onboarding.cfNoIdea")}
              </Label>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="no_preference" id="cf-idea-np" className="mt-1" />
              <Label htmlFor="cf-idea-np" className="font-normal">
                {t("onboarding.noPreference")}
              </Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Technical Preference */}
      <div>
        <Label className="mb-3 block">{t("onboarding.cfTechPref")}</Label>
        <RadioGroup
          value={data.cofounder_technical_preference}
          onValueChange={(v) => updateData({ cofounder_technical_preference: v })}
        >
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="technical" id="cf-tech-yes" />
              <Label htmlFor="cf-tech-yes" className="font-normal">
                {t("onboarding.technical")}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="non_technical" id="cf-tech-no" />
              <Label htmlFor="cf-tech-no" className="font-normal">
                {t("onboarding.nonTechnical")}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no_preference" id="cf-tech-np" />
              <Label htmlFor="cf-tech-np" className="font-normal">
                {t("onboarding.noPreference")}
              </Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Timing Preference */}
      <div>
        <Label className="mb-3 block">{t("onboarding.cfTimingPref")}</Label>
        <RadioGroup
          value={data.cofounder_timing_preference}
          onValueChange={(v) => updateData({ cofounder_timing_preference: v })}
        >
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="match_only" id="cf-time-only" />
              <Label htmlFor="cf-time-only" className="font-normal">
                {t("onboarding.cfTimingOnly")}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="prefer_match" id="cf-time-prefer" />
              <Label htmlFor="cf-time-prefer" className="font-normal">
                {t("onboarding.cfTimingPrefer")}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no_preference" id="cf-time-np" />
              <Label htmlFor="cf-time-np" className="font-normal">
                {t("onboarding.noPreference")}
              </Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Location Preference */}
      <div>
        <Label className="mb-3 block">{t("onboarding.cfLocationPref")}</Label>
        <RadioGroup
          value={data.cofounder_location_preference}
          onValueChange={(v) => updateData({ cofounder_location_preference: v })}
        >
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nearby" id="cf-loc-near" />
              <Label htmlFor="cf-loc-near" className="font-normal">
                {t("onboarding.cfLocNearby")}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="country" id="cf-loc-country" />
              <Label htmlFor="cf-loc-country" className="font-normal">
                {t("onboarding.cfLocCountry")}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="region" id="cf-loc-region" />
              <Label htmlFor="cf-loc-region" className="font-normal">
                {t("onboarding.cfLocRegion")}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no_preference" id="cf-loc-np" />
              <Label htmlFor="cf-loc-np" className="font-normal">
                {t("onboarding.noPreference")}
              </Label>
            </div>
          </div>
        </RadioGroup>

        {data.cofounder_location_preference === "nearby" && (
          <div className="mt-4">
            <Label>{t("onboarding.cfDistance")}: {data.cofounder_location_distance} km</Label>
            <Slider
              value={[data.cofounder_location_distance]}
              onValueChange={(v) => updateData({ cofounder_location_distance: v[0] })}
              min={10}
              max={500}
              step={10}
              className="mt-2"
            />
          </div>
        )}
      </div>

      {/* Age Preference */}
      <div>
        <Label className="mb-3 block">{t("onboarding.cfAgePref")}</Label>
        <RadioGroup
          value={data.cofounder_age_preference}
          onValueChange={(v) => updateData({ cofounder_age_preference: v })}
        >
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="range" id="cf-age-range" />
              <Label htmlFor="cf-age-range" className="font-normal">
                {t("onboarding.cfAgeRange")}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no_preference" id="cf-age-np" />
              <Label htmlFor="cf-age-np" className="font-normal">
                {t("onboarding.noPreference")}
              </Label>
            </div>
          </div>
        </RadioGroup>

        {data.cofounder_age_preference === "range" && (
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <Label>{t("onboarding.minAge")}</Label>
              <Input
                type="number"
                value={data.cofounder_age_min}
                onChange={(e) => updateData({ cofounder_age_min: parseInt(e.target.value) || 18 })}
                min={18}
                max={99}
              />
            </div>
            <div>
              <Label>{t("onboarding.maxAge")}</Label>
              <Input
                type="number"
                value={data.cofounder_age_max}
                onChange={(e) => updateData({ cofounder_age_max: parseInt(e.target.value) || 65 })}
                min={18}
                max={99}
              />
            </div>
          </div>
        )}
      </div>

      {/* Co-founder Responsibility Areas */}
      <div>
        <Label className="mb-3 block">{t("onboarding.cfResponsibility")}</Label>
        <div className="grid grid-cols-2 gap-2">
          {RESPONSIBILITY_AREAS.map((area) => (
            <div key={area} className="flex items-center space-x-2">
              <Checkbox
                id={`cf-resp-${area}`}
                checked={data.cofounder_responsibility_areas?.includes(area)}
                onCheckedChange={() => toggleCofounderResponsibility(area)}
              />
              <Label htmlFor={`cf-resp-${area}`} className="font-normal">
                {t(`onboarding.area.${area}`)}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Interest Matching Preference */}
      <div>
        <Label className="mb-3 block">{t("onboarding.cfInterestPref")}</Label>
        <RadioGroup
          value={data.cofounder_interest_preference}
          onValueChange={(v) => updateData({ cofounder_interest_preference: v })}
        >
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="match_only" id="cf-int-only" />
              <Label htmlFor="cf-int-only" className="font-normal">
                {t("onboarding.cfInterestOnly")}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="prefer_match" id="cf-int-prefer" />
              <Label htmlFor="cf-int-prefer" className="font-normal">
                {t("onboarding.cfInterestPrefer")}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no_preference" id="cf-int-np" />
              <Label htmlFor="cf-int-np" className="font-normal">
                {t("onboarding.noPreference")}
              </Label>
            </div>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default OnboardingStep7;
