import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const CTA = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-12 lg:p-20">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '32px 32px'
            }} />
          </div>
          
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              {t("cta.title")}
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              {t("cta.description")}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/auth">
                <Button variant="accent" size="lg" className="text-base">
                  {t("cta.getStartedFree")}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/browse">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-base bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                >
                  {t("cta.browseProfiles")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
