import { Search, Users, MessageCircle, Filter, Globe, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Search,
    title: "Smart Matching",
    description: "Find co-founders based on skills, interests, timezone, and goals. Our filters help you discover the perfect match.",
  },
  {
    icon: Users,
    title: "Team Building",
    description: "Browse teams looking for members or create your own team listing. Perfect for hackathons and startup competitions.",
  },
  {
    icon: Filter,
    title: "Advanced Filters",
    description: "Filter by role, industry, school, language, location, and more. Find exactly who you're looking for.",
  },
  {
    icon: MessageCircle,
    title: "Direct Connect",
    description: "Message potential co-founders directly. Build relationships before committing to collaboration.",
  },
  {
    icon: Globe,
    title: "Global Community",
    description: "Connect with entrepreneurs and innovators from universities and communities worldwide.",
  },
  {
    icon: Zap,
    title: "Fast & Simple",
    description: "Create your profile in minutes and start connecting. No complicated onboarding or lengthy forms.",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Find Your Team
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            CoLabNow makes team building simple, fast, and effective for aspiring entrepreneurs and students.
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
