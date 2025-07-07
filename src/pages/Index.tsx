import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUp, Plus, Search, MessageCircle, X, Bell, Filter } from "lucide-react";
import { Link } from "react-router-dom";

// Web3 Project Categories
const categories = [
  "All",
  "Infrastructure", 
  "DeFi",
  "NFT & Creator Economy",
  "AI x Web3",
  "Gaming & Metaverse", 
  "DAO & Community",
  "Developer Tools",
  "Consumer Applications",
  "Privacy & Security",
  "Data & Analytics"
];

const stages = ["All", "Idea", "Alpha", "Beta", "Live"];
const timeFilters = ["Today", "Yesterday", "This Week", "Last Week"];

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
    category: "AI x Web3",
    stage: "Beta",
    createdAt: new Date(),
    timeFilter: "Today"
  },
  {
    id: 2,
    name: "Lazy 2.0", 
    description: "One shortcut to capture & chat with your notes, everywhere",
    votes: 298,
    comments: 16,
    tags: ["Productivity", "Notes", "Artificial Intelligence"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=64&h=64&fit=crop",
    category: "Consumer Applications",
    stage: "Live",
    createdAt: new Date(Date.now() - 86400000), // Yesterday
    timeFilter: "Yesterday"
  },
  {
    id: 3,
    name: "String.com",
    description: "AI agent for building AI agents", 
    votes: 249,
    comments: 21,
    tags: ["Productivity", "Developer Tools", "Artificial Intelligence"],
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=64&h=64&fit=crop",
    category: "Developer Tools",
    stage: "Alpha",
    createdAt: new Date(),
    timeFilter: "Today"
  },
  {
    id: 4,
    name: "DeFi Swap Protocol",
    description: "Next-generation decentralized exchange with advanced features",
    votes: 217,
    comments: 14,
    tags: ["DeFi", "DEX", "Protocol"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=64&h=64&fit=crop",
    category: "DeFi",
    stage: "Beta",
    createdAt: new Date(Date.now() - 172800000), // 2 days ago
    timeFilter: "This Week"
  },
  {
    id: 5,
    name: "MetaVerse Builder",
    description: "No-code platform for creating immersive metaverse experiences",
    votes: 185,
    comments: 22,
    tags: ["Metaverse", "No-code", "VR/AR"],
    image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=64&h=64&fit=crop",
    category: "Gaming & Metaverse",
    stage: "Live",
    createdAt: new Date(),
    timeFilter: "Today"
  },
  {
    id: 6,
    name: "CryptoNFT Marketplace",
    description: "Decentralized marketplace for digital art and collectibles",
    votes: 156,
    comments: 18,
    tags: ["NFT", "Marketplace", "Art"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=64&h=64&fit=crop",
    category: "NFT & Creator Economy",
    stage: "Live",
    createdAt: new Date(Date.now() - 259200000), // 3 days ago
    timeFilter: "This Week"
  },
  {
    id: 7,
    name: "DAO Governance Hub",
    description: "Comprehensive platform for decentralized organization management",
    votes: 134,
    comments: 12,
    tags: ["DAO", "Governance", "Management"],
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=64&h=64&fit=crop",
    category: "DAO & Community",
    stage: "Alpha",
    createdAt: new Date(Date.now() - 86400000), // Yesterday
    timeFilter: "Yesterday"
  },
  {
    id: 8,
    name: "Privacy Shield",
    description: "Advanced privacy protection for Web3 transactions",
    votes: 112,
    comments: 8,
    tags: ["Privacy", "Security", "Protection"],
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=64&h=64&fit=crop",
    category: "Privacy & Security",
    stage: "Idea",
    createdAt: new Date(),
    timeFilter: "Today"
  }
];


const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStage, setSelectedStage] = useState("All");
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("Today");

  const handleVote = (projectId: number) => {
    console.log(`Voted for project ${projectId}`);
  };

  // Filter projects based on selected filters
  const filteredProjects = mockProjects.filter(project => {
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    const matchesStage = selectedStage === "All" || project.stage === selectedStage;
    const matchesTime = project.timeFilter === selectedTimeFilter;
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesStage && matchesTime && matchesSearch;
  }).sort((a, b) => b.votes - a.votes); // Sort by votes descending

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
              <Button variant="ghost" className="text-primary font-medium">Launches</Button>
              <Button variant="ghost" className="text-foreground/80" asChild>
                <Link to="/products">Products</Link>
              </Button>
              <Button variant="ghost" className="text-foreground/80" asChild>
                <Link to="/resources">Resources</Link>
              </Button>
              <Button variant="ghost" className="text-foreground/80" asChild>
                <Link to="/jobs">Jobs</Link>
              </Button>
            </nav>
            
            {/* Right Actions */}
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
                Subscribe
              </Button>
              <Button variant="default" size="sm">
                Sign in
              </Button>
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
                <span className="font-medium">Welcome to Web3Hunt!</span>
                <span className="text-muted-foreground ml-2">
                  The place to discover and launch new Web3 products. 
                  <span className="text-primary cursor-pointer hover:underline ml-1">Take a tour.</span>
                </span>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setShowWelcome(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Main Content - Full Width */}
        <div className="w-full">
          {/* Time Filter Tabs */}
          <Tabs value={selectedTimeFilter} onValueChange={setSelectedTimeFilter} className="mb-8">
            <TabsList className="grid w-full grid-cols-4">
              {timeFilters.map((timeFilter) => (
                <TabsTrigger key={timeFilter} value={timeFilter}>
                  {timeFilter}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {timeFilters.map((timeFilter) => (
              <TabsContent key={timeFilter} value={timeFilter} className="mt-8">
                {/* Category Tabs */}
                <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                  <TabsList className="grid w-full grid-cols-6 lg:grid-cols-11 mb-8">
                    {categories.map((category) => (
                      <TabsTrigger 
                        key={category} 
                        value={category}
                        className="text-xs px-2 py-2"
                      >
                        {category === "NFT & Creator Economy" ? "NFT" : 
                         category === "Gaming & Metaverse" ? "Gaming" :
                         category === "DAO & Community" ? "DAO" :
                         category === "Consumer Applications" ? "Consumer" :
                         category === "Privacy & Security" ? "Privacy" :
                         category === "Data & Analytics" ? "Data" :
                         category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {categories.map((category) => (
                    <TabsContent key={category} value={category}>
                      {/* Stage Filter */}
                      <div className="flex gap-2 mb-6">
                        {stages.map((stage) => (
                          <Button
                            key={stage}
                            variant={selectedStage === stage ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedStage(stage)}
                            className="text-xs"
                          >
                            {stage}
                          </Button>
                        ))}
                      </div>
                      
                      {/* Projects Display */}
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <h1 className="text-2xl font-bold">
                            {category === "All" ? "All Categories" : category} - {timeFilter}
                          </h1>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Filter className="h-4 w-4" />
                            {filteredProjects.length} results
                          </div>
                        </div>
                        
                        {filteredProjects.length > 0 ? (
                          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {filteredProjects.map((project, index) => (
                              <div key={project.id} className="p-4 bg-card rounded-lg border border-border hover:border-border/80 transition-colors">
                                <div className="flex items-start gap-3 mb-3">
                                  <span className="text-sm font-medium text-muted-foreground">
                                    #{index + 1}
                                  </span>
                                  <img 
                                    src={project.image} 
                                    alt={project.name}
                                    className="w-10 h-10 rounded-lg object-cover"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <Link to={`/project/${project.id}`}>
                                      <h3 className="font-semibold hover:text-primary transition-colors mb-1">
                                        {project.name}
                                      </h3>
                                    </Link>
                                  </div>
                                </div>
                                
                                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                                  {project.description}
                                </p>
                                
                                <div className="flex flex-wrap gap-1 mb-4">
                                  <Badge variant="outline" className="text-xs">
                                    {project.category}
                                  </Badge>
                                  <Badge variant="secondary" className="text-xs">
                                    {project.stage}
                                  </Badge>
                                  {project.tags.slice(0, 2).map((tag) => (
                                    <Badge key={tag} variant="secondary" className="text-xs bg-muted/50">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                                
                                <div className="flex items-center justify-between">
                                  <Button variant="ghost" size="sm" className="text-muted-foreground h-auto p-0">
                                    <MessageCircle className="h-3 w-3 mr-1" />
                                    {project.comments}
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => handleVote(project.id)}
                                    className="flex items-center gap-1 h-auto p-0 hover:text-primary"
                                  >
                                    <ArrowUp className="h-3 w-3" />
                                    <span className="text-sm font-medium">{project.votes}</span>
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-12">
                            <p className="text-muted-foreground">No projects found for the selected filters.</p>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </TabsContent>
            ))}
          </Tabs>

          {/* Submit Project Button */}
          <div className="mt-12">
            <Link to="/submit">
              <Button variant="outline" className="w-full py-6 text-base">
                <Plus className="h-5 w-5 mr-2" />
                Submit your product
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;