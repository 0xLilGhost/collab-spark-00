import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Users className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              CoLabNow
            </span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link to="/browse">
              <Button variant="ghost">Browse</Button>
            </Link>
            <Button variant="outline">Sign In</Button>
            <Button variant="hero">Get Started</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
