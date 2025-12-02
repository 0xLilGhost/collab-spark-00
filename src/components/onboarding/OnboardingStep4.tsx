import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { OnboardingData } from "@/pages/Onboarding";

interface Props {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
}

const OnboardingStep4 = ({ data, updateData }: Props) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{t("onboarding.step4Title")}</h2>
        <p className="text-muted-foreground mt-1">{t("onboarding.step4Desc")}</p>
      </div>

      {/* Gender */}
      <div>
        <Label>{t("onboarding.gender")}</Label>
        <Select
          value={data.gender}
          onValueChange={(v) => updateData({ gender: v })}
        >
          <SelectTrigger>
            <SelectValue placeholder={t("onboarding.selectGender")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">{t("onboarding.male")}</SelectItem>
            <SelectItem value="female">{t("onboarding.female")}</SelectItem>
            <SelectItem value="non_binary">{t("onboarding.nonBinary")}</SelectItem>
            <SelectItem value="prefer_not_say">{t("onboarding.preferNotSay")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Birthdate */}
      <div>
        <Label htmlFor="birthdate">{t("onboarding.birthdate")}</Label>
        <Input
          id="birthdate"
          type="date"
          value={data.birthdate}
          onChange={(e) => updateData({ birthdate: e.target.value })}
        />
      </div>

      {/* Social Media URL */}
      <div>
        <Label htmlFor="social_media_url">{t("onboarding.socialMedia")}</Label>
        <Input
          id="social_media_url"
          value={data.social_media_url}
          onChange={(e) => updateData({ social_media_url: e.target.value })}
          placeholder={t("onboarding.socialMediaPlaceholder")}
        />
        <p className="text-sm text-muted-foreground mt-1">
          {t("onboarding.socialMediaHint")}
        </p>
      </div>
    </div>
  );
};

export default OnboardingStep4;
