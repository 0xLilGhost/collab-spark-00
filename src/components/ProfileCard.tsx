import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Languages } from "lucide-react";
import { Link } from "react-router-dom";
import MessageDialog from "./MessageDialog";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProfileCardProps {
  id: string;
  name: string;
  role: string;
  school?: string;
  location: string;
  timezone: string;
  languages: string[];
  skills: string[];
  bio: string;
  avatar: string;
  availability: string;
}

const ProfileCard = ({
  id,
  name,
  role,
  school,
  location,
  timezone,
  languages,
  skills,
  bio,
  avatar,
  availability,
}: ProfileCardProps) => {
  const { t } = useLanguage();
  return (
    <Card className="p-6 hover:shadow-card-hover transition-all duration-300 border-border">
      <Link to={`/user/${id}`} className="block">
        <div className="flex items-start gap-4 mb-4">
          <div className="h-16 w-16 rounded-full bg-gradient-hero flex-shrink-0" style={{
            backgroundImage: `url(${avatar})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate hover:text-primary transition-colors">{name}</h3>
            <p className="text-sm text-muted-foreground">{role}</p>
            {school && <p className="text-xs text-muted-foreground mt-1">{school}</p>}
          </div>
        </div>
      
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{bio}</p>
      
      <div className="space-y-2 mb-4 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{timezone} • {availability}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Languages className="h-4 w-4" />
          <span>{languages.join(", ")}</span>
        </div>
      </div>
      
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.slice(0, 4).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {skills.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{skills.length - 4}
            </Badge>
          )}
        </div>
      </Link>
      
      <MessageDialog
        recipientId={id}
        recipientName={name}
        buttonText={t("browse.connect")}
        className="w-full"
      />
    </Card>
  );
};

export default ProfileCard;
