import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowUp, Search, MessageCircle, TrendingUp, Star, Zap } from "lucide-react";

// Mock data for all products
const allProducts = [
  {
    id: 1,
    name: "Portia AI",
    description: "Secure AI agents with tools, auth, and smart control",
    votes: 389,
    comments: 37,
    tags: ["Developer Tools", "Artificial Intelligence", "GitHub"],
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=64&h=64&fit=crop",
    category: "AI",
    featured: true,
    date: "2025-01-02"
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
    featured: false,
    date: "2025-01-02"
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
    featured: false,
    date: "2025-01-01"
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
    featured: true,
    date: "2025-01-01"
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
    featured: false,
    date: "2024-12-31"
  },
  {
    id: 6,
    name: "CryptoWallet Pro",
    description: "Multi-chain wallet with advanced security features",
    votes: 167,
    comments: 18,
    tags: ["Wallet", "Security", "Multi-chain"],
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=64&h=64&fit=crop",
    category: "Web3",
    featured: false,
    date: "2024-12-30"
  }
];

const categories = ["All", "AI", "Productivity", "Hardware", "Metaverse", "Web3", "Developer Tools"];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("votes"); // votes, comments, date

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === "votes") return b.votes - a.votes;
    if (sortBy === "comments") return b.comments - a.comments;
    if (sortBy === "date") return new Date(b.date).getTime() - new Date(a.date).getTime();
    return 0;
  });

  const handleVote = (productId: number) => {
    console.log(`Voted for product ${productId}`);
  };

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
                  placeholder="Search products..." 
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
              <Button variant="ghost" className="text-primary font-medium" asChild>
                <Link to="/products">Products</Link>
              </Button>
              <Button variant="ghost" className="text-foreground/80" asChild>
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All Products</h1>
          <p className="text-muted-foreground">
            Discover all the amazing products launched on Web3Hunt
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
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

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <div className="flex gap-2">
              <Button
                variant={sortBy === "votes" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSortBy("votes")}
              >
                <TrendingUp className="h-4 w-4 mr-1" />
                Votes
              </Button>
              <Button
                variant={sortBy === "comments" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSortBy("comments")}
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                Comments
              </Button>
              <Button
                variant={sortBy === "date" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSortBy("date")}
              >
                <Star className="h-4 w-4 mr-1" />
                Latest
              </Button>
            </div>
          </div>
        </div>

        {/* Products List */}
        <div className="space-y-4">
          {filteredProducts.map((product, index) => (
            <Card key={product.id} className="hover:border-primary/50 transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  {/* Left: Rank and Logo */}
                  <div className="flex items-center gap-3 min-w-[80px]">
                    <span className="text-lg font-medium text-muted-foreground w-6">
                      {index + 1}.
                    </span>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    {product.featured && (
                      <Badge variant="default" className="text-xs">
                        <Zap className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  
                  {/* Middle: Content */}
                  <div className="flex-1">
                    <Link to={`/project/${product.id}`}>
                      <h3 className="font-semibold text-lg hover:text-primary transition-colors mb-1">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-muted-foreground text-sm mb-3">
                      {product.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
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
                      {product.comments}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleVote(product.id)}
                      className="flex flex-col items-center gap-1 h-auto py-2 px-3 hover:bg-accent"
                    >
                      <ArrowUp className="h-4 w-4" />
                      <span className="text-sm font-medium">{product.votes}</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline">
            Load More Products
          </Button>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              No products found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;