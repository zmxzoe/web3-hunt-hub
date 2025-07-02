import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowUp, ExternalLink, Heart, Share2, Star } from "lucide-react";

// Mock project data - in a real app, this would come from an API
const mockProjectData = {
  1: {
    id: 1,
    name: "DecentraFi",
    description: "DecentraFi is a revolutionary decentralized finance platform that enables seamless cross-chain transactions and advanced yield farming strategies. Built on cutting-edge blockchain technology, it provides users with unprecedented control over their financial assets while maintaining the highest security standards.",
    fullDescription: `DecentraFi represents the next evolution in decentralized finance, offering a comprehensive suite of tools for modern crypto investors and DeFi enthusiasts. Our platform bridges multiple blockchains, allowing users to maximize their yield potential across various protocols.

Key Features:
- Cross-chain asset management
- Automated yield farming strategies
- Advanced portfolio analytics
- Institutional-grade security
- Community governance system

The platform leverages advanced smart contracts and cutting-edge cryptographic protocols to ensure maximum security and efficiency. With support for over 20 different blockchain networks, DecentraFi is the ultimate destination for sophisticated DeFi operations.`,
    votes: 245,
    tags: ["DeFi", "Cross-chain", "Yield Farming"],
    images: [
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
    ],
    category: "DeFi",
    website: "https://decentrafi.example.com",
    twitter: "https://twitter.com/decentrafi",
    discord: "https://discord.gg/decentrafi",
    github: "https://github.com/decentrafi",
    team: [
      { name: "Alice Chen", role: "CEO & Founder", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face" },
      { name: "Bob Smith", role: "CTO", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
      { name: "Carol Johnson", role: "Lead Developer", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" }
    ],
    stats: {
      totalValueLocked: "$2.4M",
      activeUsers: "1,250",
      transactions: "45,678"
    },
    launchDate: "2024年3月15日"
  }
};

const ProjectDetail = () => {
  const { id } = useParams();
  const [hasVoted, setHasVoted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const project = id ? mockProjectData[Number(id) as keyof typeof mockProjectData] : undefined;

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">项目未找到</h1>
          <Link to="/">
            <Button variant="gradient">返回首页</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleVote = () => {
    setHasVoted(!hasVoted);
    // In a real app, this would send a request to the backend
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: project.name,
        text: project.description,
        url: window.location.href,
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>返回项目列表</span>
            </Link>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
                分享
              </Button>
              <Button 
                variant={hasVoted ? "secondary" : "gradient"} 
                onClick={handleVote}
                className="flex items-center gap-2"
              >
                <ArrowUp className="h-4 w-4" />
                {hasVoted ? "已投票" : "投票支持"} ({project.votes + (hasVoted ? 1 : 0)})
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Header */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-4xl font-bold">{project.name}</h1>
              <p className="text-xl text-muted-foreground">{project.description}</p>
            </div>

            {/* Image Gallery */}
            <Card className="bg-card/50 border-border">
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src={project.images[currentImageIndex]} 
                    alt={`${project.name} 截图 ${currentImageIndex + 1}`}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                  {project.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {project.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            index === currentImageIndex ? 'bg-primary' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Project Description */}
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle>项目介绍</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert max-w-none">
                  {project.fullDescription.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-foreground/90 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Team */}
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle>团队成员</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {project.team.map((member, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-background/50">
                      <img 
                        src={member.avatar} 
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-medium">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Stats */}
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle>项目数据</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">总锁定价值</span>
                  <span className="font-medium">{project.stats.totalValueLocked}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">活跃用户</span>
                  <span className="font-medium">{project.stats.activeUsers}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">交易笔数</span>
                  <span className="font-medium">{project.stats.transactions}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">发布日期</span>
                  <span className="font-medium">{project.launchDate}</span>
                </div>
              </CardContent>
            </Card>

            {/* Links */}
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle>相关链接</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a 
                  href={project.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background/70 transition-colors"
                >
                  <span>官方网站</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a 
                  href={project.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background/70 transition-colors"
                >
                  <span>Twitter</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a 
                  href={project.discord} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background/70 transition-colors"
                >
                  <span>Discord</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background/70 transition-colors"
                >
                  <span>GitHub</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button variant="gradient" className="w-full" size="lg">
                <Heart className="h-4 w-4" />
                收藏项目
              </Button>
              <Button variant="outline" className="w-full">
                <Star className="h-4 w-4" />
                添加到观察列表
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;