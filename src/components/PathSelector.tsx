import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Rocket, Users, Target, Zap, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const PathSelector = () => {
  return (
    <section className="py-20 px-4 bg-gradient-subtle">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your Path
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're competing or building the next big thing, find your perfect teammates
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Competitions Path */}
          <Card className="p-8 hover:shadow-card-hover transition-all duration-300 border-2 hover:border-primary group">
            <div className="flex justify-center mb-6">
              <div className="h-20 w-20 rounded-full bg-gradient-hero flex items-center justify-center">
                <Trophy className="h-10 w-10 text-primary-foreground" />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-center mb-4">
              Competitions & Hackathons
            </h3>
            
            <p className="text-muted-foreground text-center mb-6">
              Find teammates for hackathons, case competitions, innovation challenges, and academic contests
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">Perfect for students and competition enthusiasts</p>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">Short-term projects with clear deadlines</p>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">Match by skills, timezone, and availability</p>
              </div>
            </div>

            <Link to="/browse?type=competition" className="block">
              <Button className="w-full" size="lg" variant="hero">
                Find Competition Teams
              </Button>
            </Link>
          </Card>

          {/* Startup Path */}
          <Card className="p-8 hover:shadow-card-hover transition-all duration-300 border-2 hover:border-accent group">
            <div className="flex justify-center mb-6">
              <div className="h-20 w-20 rounded-full bg-gradient-accent flex items-center justify-center">
                <Rocket className="h-10 w-10 text-accent-foreground" />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-center mb-4">
              Startups & Ventures
            </h3>
            
            <p className="text-muted-foreground text-center mb-6">
              Connect with co-founders and early team members to build your startup from idea to launch
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3">
                <Rocket className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-sm">For aspiring founders and entrepreneurs</p>
              </div>
              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-sm">Long-term commitment and equity partnerships</p>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-sm">Find co-founders aligned with your vision</p>
              </div>
            </div>

            <Link to="/browse?type=startup" className="block">
              <Button className="w-full" size="lg" variant="accent">
                Find Co-founders
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PathSelector;
