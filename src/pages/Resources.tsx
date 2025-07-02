import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, ExternalLink, BookOpen, Video, FileText, Code, Users, Lightbulb } from "lucide-react";

const resourceCategories = [
  {
    name: "Learning",
    description: "Educational resources and tutorials",
    icon: BookOpen,
    resources: [
      {
        title: "Web3 Development Bootcamp",
        description: "Complete guide to building decentralized applications",
        url: "https://example.com/bootcamp",
        type: "Course",
        tags: ["Beginner", "Full-stack", "Smart Contracts"]
      },
      {
        title: "DeFi Protocol Analysis",
        description: "Deep dive into popular DeFi protocols and their mechanics",
        url: "https://example.com/defi-analysis",
        type: "Article",
        tags: ["DeFi", "Analysis", "Advanced"]
      },
      {
        title: "Solidity Best Practices",
        description: "Security and optimization tips for smart contract development",
        url: "https://example.com/solidity-practices",
        type: "Guide",
        tags: ["Solidity", "Security", "Development"]
      }
    ]
  },
  {
    name: "Tools",
    description: "Development tools and utilities",
    icon: Code,
    resources: [
      {
        title: "Web3 Starter Kit",
        description: "Boilerplate for rapid Web3 application development",
        url: "https://github.com/web3-starter",
        type: "Tool",
        tags: ["React", "Ethereum", "Boilerplate"]
      },
      {
        title: "Smart Contract Auditor",
        description: "Automated security analysis for smart contracts",
        url: "https://example.com/auditor",
        type: "Tool",
        tags: ["Security", "Audit", "Analysis"]
      },
      {
        title: "Gas Fee Tracker",
        description: "Real-time gas price monitoring across multiple networks",
        url: "https://example.com/gas-tracker",
        type: "Tool",
        tags: ["Gas", "Monitoring", "Multi-chain"]
      }
    ]
  },
  {
    name: "Videos",
    description: "Video content and tutorials",
    icon: Video,
    resources: [
      {
        title: "Building Your First DApp",
        description: "Step-by-step video tutorial for creating a decentralized app",
        url: "https://youtube.com/watch?v=example",
        type: "Video",
        tags: ["Tutorial", "DApp", "Beginner"]
      },
      {
        title: "Web3 Design Patterns",
        description: "Common patterns and anti-patterns in Web3 development",
        url: "https://youtube.com/watch?v=example2",
        type: "Video",
        tags: ["Design", "Patterns", "Architecture"]
      },
      {
        title: "NFT Marketplace Deep Dive",
        description: "Technical analysis of how NFT marketplaces work",
        url: "https://youtube.com/watch?v=example3",
        type: "Video",
        tags: ["NFT", "Marketplace", "Technical"]
      }
    ]
  },
  {
    name: "Documentation",
    description: "Official docs and references",
    icon: FileText,
    resources: [
      {
        title: "Ethereum Developer Docs",
        description: "Comprehensive documentation for Ethereum development",
        url: "https://ethereum.org/developers",
        type: "Documentation",
        tags: ["Ethereum", "Official", "Reference"]
      },
      {
        title: "Web3.js Documentation",
        description: "Complete API reference for Web3.js library",
        url: "https://web3js.readthedocs.io",
        type: "Documentation",
        tags: ["Web3.js", "API", "JavaScript"]
      },
      {
        title: "OpenZeppelin Contracts",
        description: "Secure smart contract library documentation",
        url: "https://docs.openzeppelin.com",
        type: "Documentation",
        tags: ["OpenZeppelin", "Security", "Contracts"]
      }
    ]
  },
  {
    name: "Communities",
    description: "Developer communities and forums",
    icon: Users,
    resources: [
      {
        title: "Web3 Builders Discord",
        description: "Active community of Web3 developers and entrepreneurs",
        url: "https://discord.gg/web3builders",
        type: "Community",
        tags: ["Discord", "Developers", "Networking"]
      },
      {
        title: "DeFi Developer Forum",
        description: "Technical discussions about DeFi protocols and development",
        url: "https://forum.defi-dev.com",
        type: "Community",
        tags: ["DeFi", "Forum", "Technical"]
      },
      {
        title: "Ethereum Research",
        description: "Research discussions on Ethereum improvements and scaling",
        url: "https://ethresear.ch",
        type: "Community",
        tags: ["Research", "Ethereum", "Scaling"]
      }
    ]
  },
  {
    name: "Inspiration",
    description: "Case studies and success stories",
    icon: Lightbulb,
    resources: [
      {
        title: "Web3 Success Stories",
        description: "How successful Web3 projects got started and scaled",
        url: "https://example.com/success-stories",
        type: "Case Study",
        tags: ["Success", "Stories", "Inspiration"]
      },
      {
        title: "DeFi Innovation Report",
        description: "Latest trends and innovations in decentralized finance",
        url: "https://example.com/defi-report",
        type: "Report",
        tags: ["DeFi", "Innovation", "Trends"]
      },
      {
        title: "Web3 Design Showcase",
        description: "Beautiful and functional Web3 user interfaces",
        url: "https://example.com/design-showcase",
        type: "Showcase",
        tags: ["Design", "UI/UX", "Inspiration"]
      }
    ]
  }
];

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);

  const currentCategory = resourceCategories[selectedCategory];
  const filteredResources = currentCategory.resources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center">
                <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Web3Hunt
                </h1>
              </Link>
              
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search resources..." 
                  className="pl-10 w-80 bg-muted/30"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Button variant="ghost" className="text-foreground/80" asChild>
                <Link to="/">Launches</Link>
              </Button>
              <Button variant="ghost" className="text-foreground/80" asChild>
                <Link to="/products">Products</Link>
              </Button>
              <Button variant="ghost" className="text-primary font-medium" asChild>
                <Link to="/resources">Resources</Link>
              </Button>
              <Button variant="ghost" className="text-foreground/80" asChild>
                <Link to="/jobs">Jobs</Link>
              </Button>
            </nav>
            
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm">Subscribe</Button>
              <Button variant="default" size="sm">Sign in</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Web3 Resources
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Curated collection of tools, tutorials, and resources to help you build in Web3
          </p>
        </div>

        <div className="flex gap-8">
          {/* Category Sidebar */}
          <div className="w-64 space-y-2">
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            {resourceCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(index)}
                  className={`w-full p-4 rounded-lg text-left transition-colors ${
                    selectedCategory === index 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-card hover:bg-card/80 border border-border'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComponent className="h-5 w-5" />
                    <div>
                      <div className="font-medium">{category.name}</div>
                      <div className={`text-sm ${
                        selectedCategory === index ? 'text-primary-foreground/80' : 'text-muted-foreground'
                      }`}>
                        {category.description}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <currentCategory.icon className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">{currentCategory.name}</h2>
              </div>
              <p className="text-muted-foreground">{currentCategory.description}</p>
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredResources.map((resource, index) => (
                <Card key={index} className="group hover:border-primary/50 transition-all duration-200 hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {resource.title}
                        </CardTitle>
                        <Badge variant="secondary" className="mt-2 text-xs">
                          {resource.type}
                        </Badge>
                      </div>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {resource.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      asChild
                    >
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        View Resource
                        <ExternalLink className="h-3 w-3 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Category Stats */}
            <div className="mt-8 p-6 bg-card rounded-lg border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">Category Overview</h4>
                  <p className="text-muted-foreground text-sm">
                    {filteredResources.length} curated resources in {currentCategory.name.toLowerCase()}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {filteredResources.length}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Resources
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;