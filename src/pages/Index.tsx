import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, Plus, Search, MessageCircle, X, Bell } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for projects
const mockProjects = [
  {
    id: 1,
    name: "Portia AI",
    description: "Secure AI agents with tools, auth, and smart control",
    votes: 389,
    comments: 37,
    tags: ["Developer Tools", "Artificial Intelligence", "GitHub"],
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=64&h=64&fit=crop",
    category: "AI",
    isToday: true
  },
  {
    id: 2,
    name: "Lazy 2.0",
    description: "One shortcut to capture & chat with your notes, everywhere",
    votes: 298,
    comments: 16,
    tags: ["Productivity", "Notes", "Artificial Intelligence"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=64&h=64&fit=crop",
    category: "Productivity",
    isToday: true
  },
  {
    id: 3,
    name: "String.com",
    description: "AI agent for building AI agents",
    votes: 249,
    comments: 21,
    tags: ["Productivity", "Developer Tools", "Artificial Intelligence"],
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=64&h=64&fit=crop",
    category: "AI",
    isToday: true
  },
  {
    id: 4,
    name: "Nothing Phone (3)",
    description: "Beyond lights, with the new Glyph Matrix",
    votes: 217,
    comments: 14,
    tags: ["Hardware", "UX Design"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=64&h=64&fit=crop",
    category: "Hardware",
    isToday: true
  },
  {
    id: 5,
    name: "MetaVerse Builder",
    description: "No-code platform for creating immersive metaverse experiences",
    votes: 185,
    comments: 22,
    tags: ["Metaverse", "No-code", "VR/AR"],
    image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=64&h=64&fit=crop",
    category: "Metaverse",
    isToday: true
  }
];

// Mock forum threads
const forumThreads = [
  {
    id: 1,
    author: "p/orbstack",
    title: "orbstack > docker desktop",
    upvotes: 0,
    comments: 0
  },
  {
    id: 2,
    author: "p/claude",
    title: "What's the weirdest thing you've asked AI to do? Examples welcome 🤖",
    upvotes: 10,
    comments: 3
  },
  {
    id: 3,
    author: "p/appreply",
    title: "NEW: Auto-Translate app reviews in 100+ languages",
    upvotes: 1,
    comments: 0
  },
  {
    id: 4,
    author: "p/crowd-3",
    title: "Quick reminder that we have an affiliate program (and it's actually pretty good)",
    upvotes: 0,
    comments: 0
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);

  const handleVote = (projectId: number) => {
    console.log(`Voted for project ${projectId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              {/* Logo */}
              <div className="flex items-center">
                <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Web3Hunt
                </h1>
              </div>
              
              {/* Search */}
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search ( ctrl + k )" 
                  className="pl-10 w-80 bg-muted/30"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Button variant="ghost" className="text-foreground/80">Launches</Button>
              <Button variant="ghost" className="text-foreground/80">Products</Button>
              <Button variant="ghost" className="text-foreground/80">News</Button>
              <Button variant="ghost" className="text-foreground/80">Forums</Button>
              <Button variant="ghost" className="text-foreground/80">Advertise</Button>
            </nav>
            
            {/* Right Actions */}
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
                Subscribe
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="default" size="sm" className="bg-primary text-primary-foreground">
                    Sign in
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Sign in</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input placeholder="Email" />
                    <Input placeholder="Password" type="password" />
                    <Button className="w-full">Sign in</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Welcome Banner */}
        {showWelcome && (
          <div className="bg-accent/50 border border-border rounded-lg p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 text-primary">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div>
                <span className="font-medium">Welcome to Product Hunt!</span>
                <span className="text-muted-foreground ml-2">
                  The place to launch and discover new tech products. 
                  <span className="text-primary cursor-pointer hover:underline ml-1">Take a tour.</span>
                </span>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setShowWelcome(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-6">Top Products Launching Today</h1>
            
            {/* Products List */}
            <div className="space-y-4">
              {mockProjects.map((project, index) => (
                <div key={project.id} className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border hover:border-border/80 transition-colors">
                  {/* Left: Rank and Logo */}
                  <div className="flex items-center gap-3 min-w-[80px]">
                    <span className="text-lg font-medium text-muted-foreground w-6">
                      {index + 1}.
                    </span>
                    <img 
                      src={project.image} 
                      alt={project.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                  </div>
                  
                  {/* Middle: Content */}
                  <div className="flex-1">
                    <Link to={`/project/${project.id}`}>
                      <h3 className="font-semibold text-lg hover:text-primary transition-colors mb-1">
                        {project.name}
                      </h3>
                    </Link>
                    <p className="text-muted-foreground text-sm mb-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-muted/50">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Right: Stats */}
                  <div className="flex items-center gap-4 min-w-[120px] justify-end">
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {project.comments}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleVote(project.id)}
                      className="flex flex-col items-center gap-1 h-auto py-2 px-3 hover:bg-accent"
                    >
                      <ArrowUp className="h-4 w-4" />
                      <span className="text-sm font-medium">{project.votes}</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Project Button */}
            <div className="mt-8">
              <Link to="/submit">
                <Button variant="outline" className="w-full py-6 text-base">
                  <Plus className="h-5 w-5 mr-2" />
                  Submit your product
                </Button>
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 space-y-6">
            {/* Trending Forum Threads */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">Trending Forum Threads</h2>
                <Button variant="ghost" size="sm" className="text-primary">
                  View all
                </Button>
              </div>
              
              <div className="space-y-3">
                {forumThreads.map((thread) => (
                  <div key={thread.id} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-primary rounded-sm flex items-center justify-center">
                        <span className="text-xs text-primary-foreground font-bold">
                          {thread.author.split('/')[1][0].toUpperCase()}
                        </span>
                      </div>
                      <span className="text-xs text-primary font-medium">{thread.author}</span>
                    </div>
                    
                    <h4 className="text-sm font-medium leading-tight">
                      {thread.title}
                    </h4>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <Button variant="ghost" size="sm" className="h-auto p-0 text-xs">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        Upvote {thread.upvotes > 0 && `(${thread.upvotes})`}
                      </Button>
                      <span>{thread.comments} comments</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" size="sm" className="w-full mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Start new thread
              </Button>
            </div>

            {/* Ad Space */}
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Airtable</h3>
              <p className="text-sm opacity-90 mb-4">
                6 predictions for product teams in 2025
              </p>
              <Button variant="secondary" size="sm" className="bg-white text-black hover:bg-gray-100">
                Learn more
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;