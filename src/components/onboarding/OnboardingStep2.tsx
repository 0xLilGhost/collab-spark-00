import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { OnboardingData } from "@/pages/Onboarding";

interface Props {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
}

const OnboardingStep2 = ({ data, updateData }: Props) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{t("onboarding.step2Title")}</h2>
        <p className="text-muted-foreground mt-1">{t("onboarding.step2Desc")}</p>
      </div>

      {/* Bio */}
      <div>
        <Label htmlFor="bio">
          {t("onboarding.bio")} <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="bio"
          value={data.bio}
          onChange={(e) => updateData({ bio: e.target.value })}
          placeholder={t("onboarding.bioPlaceholder")}
          rows={4}
        />
      </div>

      {/* Impressive Accomplishment */}
      <div>
        <Label htmlFor="impressive_accomplishment">
          {t("onboarding.accomplishment")} <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="impressive_accomplishment"
          value={data.impressive_accomplishment}
          onChange={(e) => updateData({ impressive_accomplishment: e.target.value })}
          placeholder={t("onboarding.accomplishmentPlaceholder")}
          rows={3}
        />
        <p className="text-sm text-muted-foreground mt-1">
          {t("onboarding.accomplishmentHint")}
        </p>
      </div>

      {/* Technical */}
      <div>
        <Label className="mb-3 block">
          {t("onboarding.technical")} <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-muted-foreground mb-3">
          {t("onboarding.technicalDesc")}
        </p>
        <RadioGroup
          value={data.is_technical ? "yes" : "no"}
          onValueChange={(v) => updateData({ is_technical: v === "yes" })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="tech-yes" />
            <Label htmlFor="tech-yes">{t("onboarding.yes")}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="tech-no" />
            <Label htmlFor="tech-no">{t("onboarding.no")}</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default OnboardingStep2;
