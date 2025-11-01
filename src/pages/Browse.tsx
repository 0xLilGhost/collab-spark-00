import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProfileCard from "@/components/ProfileCard";
import TeamCard from "@/components/TeamCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample data
const sampleProfiles = [
  {
    name: "Alex Chen",
    role: "Full-Stack Developer",
    school: "Stanford University",
    location: "San Francisco, CA",
    timezone: "PST",
    languages: ["English", "Mandarin"],
    skills: ["React", "Node.js", "Python", "AI/ML"],
    bio: "Computer Science student passionate about building AI-powered products. Looking for a co-founder to start a SaaS company.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    availability: "20 hrs/week",
  },
  {
    name: "Sarah Williams",
    role: "Product Designer",
    school: "MIT",
    location: "Boston, MA",
    timezone: "EST",
    languages: ["English", "Spanish"],
    skills: ["UI/UX", "Figma", "Design Systems", "Research"],
    bio: "Senior design student with experience at tech startups. Seeking a technical co-founder for an edtech venture.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    availability: "Part-time",
  },
  {
    name: "Marcus Johnson",
    role: "Business & Marketing",
    school: "Harvard Business School",
    location: "New York, NY",
    timezone: "EST",
    languages: ["English", "French"],
    skills: ["Marketing", "Strategy", "Sales", "Growth"],
    bio: "MBA student with 3 years in marketing. Looking to join a pre-seed startup as Head of Growth or co-founder.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    availability: "Full-time",
  },
  {
    name: "Priya Patel",
    role: "Backend Developer",
    school: "UC Berkeley",
    location: "Berkeley, CA",
    timezone: "PST",
    languages: ["English", "Hindi", "Gujarati"],
    skills: ["Go", "Kubernetes", "AWS", "Microservices"],
    bio: "Infrastructure engineer interested in fintech and crypto. Open to co-founding or joining early-stage teams.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    availability: "15 hrs/week",
  },
];

const sampleTeams = [
  {
    name: "EduFlow",
    description: "AI-powered learning platform that adapts to each student's pace and style. We're building the future of personalized education.",
    stage: "Idea Stage",
    industry: "EdTech",
    location: "Remote",
    roles: ["Frontend Dev", "Marketing Lead"],
    teamSize: 3,
  },
  {
    name: "GreenChain",
    description: "Blockchain solution for carbon credit tracking and trading. Making sustainability transparent and accessible.",
    stage: "Building",
    industry: "Climate Tech",
    location: "San Francisco, CA",
    roles: ["Blockchain Dev", "Sustainability Advisor"],
    teamSize: 5,
  },
  {
    name: "HealthHub",
    description: "Telemedicine platform connecting patients with specialists. Streamlining healthcare access in underserved communities.",
    stage: "MVP",
    industry: "HealthTech",
    location: "Boston, MA",
    roles: ["iOS Developer", "Healthcare Operations"],
    teamSize: 4,
  },
];

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Discover Your{" "}
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Perfect Match
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Browse profiles of aspiring entrepreneurs and teams looking for members
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search by name, skill, or keyword..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>

            <div className="flex flex-wrap gap-4">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="developer">Developer</SelectItem>
                  <SelectItem value="designer">Designer</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ai">AI/ML</SelectItem>
                  <SelectItem value="fintech">FinTech</SelectItem>
                  <SelectItem value="edtech">EdTech</SelectItem>
                  <SelectItem value="healthtech">HealthTech</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fulltime">Full-time</SelectItem>
                  <SelectItem value="parttime">Part-time</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tabs for People and Teams */}
          <Tabs defaultValue="people" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="people">People</TabsTrigger>
              <TabsTrigger value="teams">Teams</TabsTrigger>
            </TabsList>

            <TabsContent value="people">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sampleProfiles.map((profile, index) => (
                  <ProfileCard key={index} {...profile} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="teams">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sampleTeams.map((team, index) => (
                  <TeamCard key={index} {...team} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Browse;
