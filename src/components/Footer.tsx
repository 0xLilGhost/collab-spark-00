import { Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-muted/30 border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                CoLabNow
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t("footer.tagline")}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{t("footer.platform")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/browse" className="hover:text-primary transition-colors">{t("footer.browse")}</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">{t("footer.howItWorks")}</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">{t("footer.successStories")}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{t("footer.resources")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="#" className="hover:text-primary transition-colors">{t("footer.blog")}</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">{t("footer.faq")}</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">{t("footer.support")}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{t("footer.company")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="#" className="hover:text-primary transition-colors">{t("footer.about")}</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">{t("footer.privacy")}</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">{t("footer.terms")}</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
