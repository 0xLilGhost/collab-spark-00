import { Search, Users, MessageCircle, Filter, Globe, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const Features = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: Search,
      title: t("features.smartMatching"),
      description: t("features.smartMatchingDesc"),
    },
    {
      icon: Users,
      title: t("features.teamBuilding"),
      description: t("features.teamBuildingDesc"),
    },
    {
      icon: Filter,
      title: t("features.advancedFilters"),
      description: t("features.advancedFiltersDesc"),
    },
    {
      icon: MessageCircle,
      title: t("features.directConnect"),
      description: t("features.directConnectDesc"),
    },
    {
      icon: Globe,
      title: t("features.globalCommunity"),
      description: t("features.globalCommunityDesc"),
    },
    {
      icon: Zap,
      title: t("features.fastSimple"),
      description: t("features.fastSimpleDesc"),
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            {t("features.title1")}{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              {t("features.title2")}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("features.description")}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 hover:shadow-card-hover transition-shadow duration-300 border-border bg-card"
            >
              <div className="h-12 w-12 rounded-lg bg-gradient-hero flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
