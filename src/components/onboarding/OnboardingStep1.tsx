import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import type { OnboardingData } from "@/pages/Onboarding";

interface Props {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
}

const OnboardingStep1 = ({ data, updateData }: Props) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{t("onboarding.step1Title")}</h2>
        <p className="text-muted-foreground mt-1">{t("onboarding.step1Desc")}</p>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-4">
        <Avatar className="w-20 h-20">
          <AvatarImage src={data.avatar_url} />
          <AvatarFallback>
            <User className="w-8 h-8" />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Label htmlFor="avatar_url">{t("onboarding.profilePicture")}</Label>
          <Input
            id="avatar_url"
            value={data.avatar_url}
            onChange={(e) => updateData({ avatar_url: e.target.value })}
            placeholder={t("onboarding.profilePicturePlaceholder")}
          />
        </div>
      </div>

      {/* Name */}
      <div>
        <Label htmlFor="full_name">
          {t("onboarding.fullName")} <span className="text-destructive">*</span>
        </Label>
        <Input
          id="full_name"
          value={data.full_name}
          onChange={(e) => updateData({ full_name: e.target.value })}
          placeholder={t("onboarding.fullNamePlaceholder")}
        />
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="email">
          {t("onboarding.email")} <span className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => updateData({ email: e.target.value })}
          placeholder={t("onboarding.emailPlaceholder")}
        />
      </div>

      {/* LinkedIn */}
      <div>
        <Label htmlFor="linkedin_url">{t("onboarding.linkedIn")}</Label>
        <Input
          id="linkedin_url"
          value={data.linkedin_url}
          onChange={(e) => updateData({ linkedin_url: e.target.value })}
          placeholder="https://linkedin.com/in/yourprofile"
        />
      </div>

      {/* Location */}
      <div>
        <Label htmlFor="location">
          {t("onboarding.location")} <span className="text-destructive">*</span>
        </Label>
        <Input
          id="location"
          value={data.location}
          onChange={(e) => updateData({ location: e.target.value })}
          placeholder={t("onboarding.locationPlaceholder")}
        />
      </div>
    </div>
  );
};

export default OnboardingStep1;
