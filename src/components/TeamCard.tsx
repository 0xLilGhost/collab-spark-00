import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, MapPin, Briefcase } from "lucide-react";

interface TeamCardProps {
  name: string;
  description: string;
  stage: string;
  industry: string;
  location: string;
  roles: string[];
  teamSize: number;
  logo?: string;
}

const TeamCard = ({
  name,
  description,
  stage,
  industry,
  location,
  roles,
  teamSize,
  logo,
}: TeamCardProps) => {
  return (
    <Card className="p-6 hover:shadow-card-hover transition-all duration-300 border-border">
      <div className="flex items-start gap-4 mb-4">
        <div className="h-16 w-16 rounded-lg bg-gradient-accent flex-shrink-0 flex items-center justify-center">
          {logo ? (
            <img src={logo} alt={name} className="w-full h-full object-cover rounded-lg" />
          ) : (
            <Users className="h-8 w-8 text-accent-foreground" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg truncate">{name}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <Badge variant="outline" className="text-xs">
              {stage}
            </Badge>
            <span className="text-xs">•</span>
            <span className="text-xs">{industry}</span>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{description}</p>
      
      <div className="space-y-2 mb-4 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{teamSize} members</span>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Briefcase className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Open Roles:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {roles.map((role, index) => (
            <Badge key={index} className="text-xs bg-gradient-hero text-primary-foreground border-0">
              {role}
            </Badge>
          ))}
        </div>
      </div>
      
      <Button className="w-full" variant="default">
        View Team
      </Button>
    </Card>
  );
};

export default TeamCard;
