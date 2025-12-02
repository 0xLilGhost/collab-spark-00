import { useLanguage } from "@/contexts/LanguageContext";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { OnboardingData } from "@/pages/Onboarding";

interface Props {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
}

const OnboardingStep6 = ({ data, updateData }: Props) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{t("onboarding.step6Title")}</h2>
        <p className="text-muted-foreground mt-1">{t("onboarding.step6Desc")}</p>
      </div>

      {/* Equity Expectation */}
      <div>
        <Label className="mb-3 block">{t("onboarding.equityExpectation")}</Label>
        <p className="text-sm text-muted-foreground mb-3">
          {t("onboarding.equityHint")}
        </p>
        <RadioGroup
          value={data.equity_expectation}
          onValueChange={(v) => updateData({ equity_expectation: v })}
        >
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="equal" id="eq-equal" />
              <Label htmlFor="eq-equal" className="font-normal">
                {t("onboarding.equityEqual")}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="flexible" id="eq-flexible" />
              <Label htmlFor="eq-flexible" className="font-normal">
                {t("onboarding.equityFlexible")}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="negotiable" id="eq-negotiable" />
              <Label htmlFor="eq-negotiable" className="font-normal">
                {t("onboarding.equityNegotiable")}
              </Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Hobbies */}
      <div>
        <Label htmlFor="hobbies">{t("onboarding.hobbies")}</Label>
        <Textarea
          id="hobbies"
          value={data.hobbies}
          onChange={(e) => updateData({ hobbies: e.target.value })}
          placeholder={t("onboarding.hobbiesPlaceholder")}
          rows={3}
        />
      </div>

      {/* Life Path */}
      <div>
        <Label htmlFor="life_path">{t("onboarding.lifePath")}</Label>
        <p className="text-sm text-muted-foreground mb-2">
          {t("onboarding.lifePathHint")}
        </p>
        <Textarea
          id="life_path"
          value={data.life_path}
          onChange={(e) => updateData({ life_path: e.target.value })}
          placeholder={t("onboarding.lifePathPlaceholder")}
          rows={4}
        />
      </div>

      {/* Additional Info */}
      <div>
        <Label htmlFor="additional_info">{t("onboarding.additionalInfo")}</Label>
        <p className="text-sm text-muted-foreground mb-2">
          {t("onboarding.additionalInfoHint")}
        </p>
        <Textarea
          id="additional_info"
          value={data.additional_info}
          onChange={(e) => updateData({ additional_info: e.target.value })}
          placeholder={t("onboarding.additionalInfoPlaceholder")}
          rows={3}
        />
      </div>
    </div>
  );
};

export default OnboardingStep6;
