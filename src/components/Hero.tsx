import { Button } from "@/components/ui/button";
import { Search, Users, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
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
              Find Your Perfect Co-Founder
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Build Your Dream Team{" "}
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Together
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-lg">
              Connect with aspiring entrepreneurs, developers, designers, and innovators. 
              Find co-founders for startups, teammates for hackathons, or partners for passion projects.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" className="text-base">
                <Users className="h-5 w-5" />
                Start Connecting
              </Button>
              <Button variant="outline" size="lg" className="text-base">
                <Search className="h-5 w-5" />
                Browse Profiles
              </Button>
            </div>
            
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-primary">1,000+</div>
                <div className="text-sm text-muted-foreground">Active Members</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Teams Formed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Universities</div>
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
                  <div className="text-sm text-muted-foreground">Found her CTO in 2 days</div>
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
