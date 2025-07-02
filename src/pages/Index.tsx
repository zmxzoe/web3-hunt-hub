import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowUp, Plus, Search, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for projects
const mockProjects = [
  {
    id: 1,
    name: "DecentraFi",
    description: "Decentralized finance platform for seamless cross-chain transactions and yield farming",
    votes: 245,
    tags: ["DeFi", "Cross-chain", "Yield Farming"],
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop",
    category: "DeFi"
  },
  {
    id: 2,
    name: "NFT Marketplace Pro",
    description: "Next-generation NFT marketplace with advanced trading features and creator tools",
    votes: 189,
    tags: ["NFT", "Marketplace", "Creator Tools"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop",
    category: "NFT"
  },
  {
    id: 3,
    name: "Web3 Social",
    description: "Decentralized social media platform with token-based governance and content monetization",
    votes: 167,
    tags: ["Social", "Governance", "Monetization"],
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop",
    category: "Social"
  },
  {
    id: 4,
    name: "Chain Analytics",
    description: "Real-time blockchain analytics and DeFi protocol monitoring dashboard",
    votes: 134,
    tags: ["Analytics", "Monitoring", "Dashboard"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    category: "Analytics"
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const categories = ["All", "DeFi", "NFT", "Social", "Analytics", "Infrastructure"];

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleVote = (projectId: number) => {
    // In a real app, this would update the vote count in the backend
    console.log(`Voted for project ${projectId}`);
  };

  const handleWalletConnect = () => {
    // In a real app, this would integrate with wallet providers like MetaMask
    setIsWalletConnected(!isWalletConnected);
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Web3Hunt
              </h1>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">今日推荐</a>
                <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">热门项目</a>
                <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">分类浏览</a>
              </nav>
            </div>
            
            <div className="flex items-center space-x-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="gradient" className="hidden sm:flex">
                    <Plus className="h-4 w-4" />
                    提交项目
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-card border-border">
                  <DialogHeader>
                    <DialogTitle>提交新项目</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input placeholder="项目名称" />
                    <Textarea placeholder="项目描述" />
                    <Input placeholder="项目网址" />
                    <Input placeholder="标签 (用逗号分隔)" />
                    <Button className="w-full" variant="gradient">提交项目</Button>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button 
                variant={isWalletConnected ? "secondary" : "wallet"} 
                onClick={handleWalletConnect}
                className="flex items-center gap-2"
              >
                <Wallet className="h-4 w-4" />
                {isWalletConnected ? "已连接" : "连接钱包"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="搜索项目..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "secondary"}
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="group bg-card/50 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-card animate-fade-in">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleVote(project.id)}
                      className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
                    >
                      <ArrowUp className="h-3 w-3" />
                      {project.votes}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <Link to={`/project/${project.id}`}>
                  <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                </Link>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              没有找到匹配的项目
            </h3>
            <p className="text-muted-foreground">
              尝试调整搜索条件或浏览不同的分类
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;