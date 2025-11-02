import { UserPlus, Search, MessageSquare, Rocket } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const HowItWorks = () => {
  const { t } = useLanguage();
  
  const steps = [
    {
      icon: UserPlus,
      title: t("how.step1"),
      description: t("how.step1Desc"),
      step: "01",
    },
    {
      icon: Search,
      title: t("how.step2"),
      description: t("how.step2Desc"),
      step: "02",
    },
    {
      icon: MessageSquare,
      title: t("how.step3"),
      description: t("how.step3Desc"),
      step: "03",
    },
    {
      icon: Rocket,
      title: t("how.step4"),
      description: t("how.step4Desc"),
      step: "04",
    },
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{t("how.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("how.description")}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-center">
                <div className="relative inline-flex mb-6">
                  <div className="absolute inset-0 bg-gradient-accent opacity-20 blur-xl rounded-full" />
                  <div className="relative h-20 w-20 rounded-full bg-gradient-hero flex items-center justify-center mx-auto">
                    <step.icon className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-accent text-accent-foreground font-bold flex items-center justify-center text-sm">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
