import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import type { OnboardingData } from "@/pages/Onboarding";

interface Props {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
}

const OnboardingStep3 = ({ data, updateData }: Props) => {
  const { t } = useLanguage();

  const addEducation = () => {
    updateData({
      education: [
        ...data.education,
        { school: "", degree: "", field_of_study: "", graduation_year: null },
      ],
    });
  };

  const removeEducation = (index: number) => {
    updateData({
      education: data.education.filter((_, i) => i !== index),
    });
  };

  const updateEducation = (index: number, field: string, value: any) => {
    const updated = [...data.education];
    updated[index] = { ...updated[index], [field]: value };
    updateData({ education: updated });
  };

  const addEmployment = () => {
    updateData({
      employment: [
        ...data.employment,
        { employer: "", position: "", start_date: "", end_date: "", is_current: false },
      ],
    });
  };

  const removeEmployment = (index: number) => {
    updateData({
      employment: data.employment.filter((_, i) => i !== index),
    });
  };

  const updateEmployment = (index: number, field: string, value: any) => {
    const updated = [...data.employment];
    updated[index] = { ...updated[index], [field]: value };
    updateData({ employment: updated });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">{t("onboarding.step3Title")}</h2>
        <p className="text-muted-foreground mt-1">{t("onboarding.step3Desc")}</p>
      </div>

      {/* Education Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <Label className="text-lg font-semibold">{t("onboarding.education")}</Label>
          <Button type="button" variant="outline" size="sm" onClick={addEducation}>
            <Plus className="w-4 h-4 mr-1" />
            {t("onboarding.addEducation")}
          </Button>
        </div>

        {data.education.length === 0 ? (
          <p className="text-muted-foreground text-sm">{t("onboarding.noEducation")}</p>
        ) : (
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEducation(index)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <Label>{t("onboarding.school")}</Label>
                    <Input
                      value={edu.school}
                      onChange={(e) => updateEducation(index, "school", e.target.value)}
                      placeholder={t("onboarding.schoolPlaceholder")}
                    />
                  </div>
                  <div>
                    <Label>{t("onboarding.degree")}</Label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => updateEducation(index, "degree", e.target.value)}
                      placeholder={t("onboarding.degreePlaceholder")}
                    />
                  </div>
                  <div>
                    <Label>{t("onboarding.fieldOfStudy")}</Label>
                    <Input
                      value={edu.field_of_study}
                      onChange={(e) => updateEducation(index, "field_of_study", e.target.value)}
                      placeholder={t("onboarding.fieldPlaceholder")}
                    />
                  </div>
                  <div>
                    <Label>{t("onboarding.graduationYear")}</Label>
                    <Input
                      type="number"
                      value={edu.graduation_year || ""}
                      onChange={(e) => updateEducation(index, "graduation_year", e.target.value ? parseInt(e.target.value) : null)}
                      placeholder="2024"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Employment Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <Label className="text-lg font-semibold">{t("onboarding.employment")}</Label>
          <Button type="button" variant="outline" size="sm" onClick={addEmployment}>
            <Plus className="w-4 h-4 mr-1" />
            {t("onboarding.addEmployment")}
          </Button>
        </div>

        {data.employment.length === 0 ? (
          <p className="text-muted-foreground text-sm">{t("onboarding.noEmployment")}</p>
        ) : (
          <div className="space-y-4">
            {data.employment.map((emp, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEmployment(index)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>{t("onboarding.employer")}</Label>
                    <Input
                      value={emp.employer}
                      onChange={(e) => updateEmployment(index, "employer", e.target.value)}
                      placeholder={t("onboarding.employerPlaceholder")}
                    />
                  </div>
                  <div>
                    <Label>{t("onboarding.position")}</Label>
                    <Input
                      value={emp.position}
                      onChange={(e) => updateEmployment(index, "position", e.target.value)}
                      placeholder={t("onboarding.positionPlaceholder")}
                    />
                  </div>
                  <div>
                    <Label>{t("onboarding.startDate")}</Label>
                    <Input
                      type="month"
                      value={emp.start_date}
                      onChange={(e) => updateEmployment(index, "start_date", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>{t("onboarding.endDate")}</Label>
                    <Input
                      type="month"
                      value={emp.end_date}
                      onChange={(e) => updateEmployment(index, "end_date", e.target.value)}
                      disabled={emp.is_current}
                    />
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`current-${index}`}
                      checked={emp.is_current}
                      onChange={(e) => updateEmployment(index, "is_current", e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor={`current-${index}`}>{t("onboarding.currentJob")}</Label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingStep3;
