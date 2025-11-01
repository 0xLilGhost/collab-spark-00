import { UserPlus, Search, MessageSquare, Rocket } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Profile",
    description: "Sign up and tell us about your skills, interests, and what you're looking for in a co-founder or team.",
    step: "01",
  },
  {
    icon: Search,
    title: "Browse & Filter",
    description: "Search through profiles of entrepreneurs and teams. Use filters to find the perfect match for your needs.",
    step: "02",
  },
  {
    icon: MessageSquare,
    title: "Connect & Chat",
    description: "Reach out to potential co-founders or teams. Have conversations to see if you're aligned.",
    step: "03",
  },
  {
    icon: Rocket,
    title: "Build Together",
    description: "Start your journey! Work on your startup, compete in hackathons, or bring your ideas to life.",
    step: "04",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get started in minutes and find your perfect co-founder or team
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-center">
                <div className="relative inline-flex mb-6">
                  <div className="absolute inset-0 bg-gradient-accent opacity-20 blur-xl rounded-full" />
                  <div className="relative h-20 w-20 rounded-full bg-gradient-hero flex items-center justify-center mx-auto">
                    <step.icon className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-accent text-accent-foreground font-bold flex items-center justify-center text-sm">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
