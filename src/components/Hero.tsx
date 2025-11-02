import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-subtle -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              {t("hero.badge")}
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              {t("hero.title1")}{" "}
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                {t("hero.title2")}
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-lg">
              {t("hero.description")}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#choose-path">
                <Button variant="hero" size="lg" className="text-base w-full sm:w-auto">
                  {t("hero.getStarted")}
                </Button>
              </a>
              <Link to="/browse">
                <Button variant="accent" size="lg" className="text-base w-full sm:w-auto">
                  {t("hero.browseNow")}
                </Button>
              </Link>
            </div>
            
            <p className="text-sm text-muted-foreground">
              {t("hero.freeJoin")}
            </p>
            
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-primary">1,000+</div>
                <div className="text-sm text-muted-foreground">{t("hero.activeMembers")}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">{t("hero.teamsFormed")}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">{t("hero.universities")}</div>
              </div>
            </div>
          </div>
          
          {/* Right image */}
          <div className="relative">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-card-hover">
              <img 
                src={heroImage} 
                alt="Entrepreneurs collaborating" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-card-hover max-w-xs">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-accent" />
                <div>
                  <div className="font-semibold">Sarah Chen</div>
                  <div className="text-sm text-muted-foreground">{t("hero.testimonial")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
