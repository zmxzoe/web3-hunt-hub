import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, Star, Globe, Code, MessageCircle, Zap, Shield, TrendingUp, Users, Calendar, Github } from "lucide-react";

// Mock project data based on form fields
const projectData = {
  1: {
    id: 1,
    name: "Uniswap",
    briefDescription: "A leading decentralized exchange protocol built on Ethereum that enables automated token trading through liquidity pools.",
    websiteUrl: "https://uniswap.org",
    socialLink: "https://twitter.com/Uniswap",
    logo: "/placeholder.svg",
    category: "DeFi (Decentralized Finance)",
    projectStage: "Live",
    functionality: "Uniswap allows users to swap ERC-20 tokens directly from their wallets without intermediaries. Core features include automated market making (AMM), liquidity provision rewards, governance through UNI tokens, and multi-version protocol support. The platform enables permissionless token listing and provides price discovery through constant product formulas.",
    tags: ["DEX", "AMM", "Liquidity", "Governance"],
    launchDate: "2020-05-05",
    teamSize: "50+",
    github: "https://github.com/Uniswap",
    discord: "https://discord.gg/uniswap",
    telegram: "https://t.me/uniswap"
  }
};

const ProjectDetail = () => {
  const { id } = useParams();

  const project = id ? projectData[Number(id) as keyof typeof projectData] : undefined;

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">项目未找到</h1>
          <Link to="/">
            <Button variant="default">返回首页</Button>
          </Link>
        </div>
      </div>
    );
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Live": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Beta": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "Alpha": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "Idea": return "bg-gray-500/10 text-gray-500 border-gray-500/20";
      default: return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>返回首页</span>
            </Link>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Star className="h-4 w-4 mr-2" />
                收藏项目
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Project Header */}
        <div className="mb-8">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-primary/10 rounded-xl flex items-center justify-center border border-border">
              <img src={project.logo} alt={project.name} className="w-16 h-16 rounded-lg object-cover" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-4xl font-bold">{project.name}</h1>
                <Badge className={`px-3 py-1 ${getStageColor(project.projectStage)}`}>
                  {project.projectStage}
                </Badge>
              </div>
              
              <p className="text-xl text-muted-foreground mb-4 leading-relaxed">
                {project.briefDescription}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center gap-4">
                <Button asChild>
                  <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-4 w-4 mr-2" />
                    访问网站
                  </a>
                </Button>
                
                <Button variant="outline" asChild>
                  <a href={project.socialLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    社交媒体
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  项目详情
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">项目分类</h4>
                  <Badge variant="outline" className="text-sm">
                    {project.category}
                  </Badge>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">核心功能</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.functionality}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="h-5 w-5" />
                  相关链接
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a 
                    href={project.websiteUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors group"
                  >
                    <Globe className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium group-hover:text-primary transition-colors">官方网站</div>
                      <div className="text-sm text-muted-foreground">访问主网站</div>
                    </div>
                  </a>
                  
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors group"
                  >
                    <Github className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium group-hover:text-primary transition-colors">GitHub</div>
                      <div className="text-sm text-muted-foreground">查看源代码</div>
                    </div>
                  </a>
                  
                  <a 
                    href={project.discord} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors group"
                  >
                    <MessageCircle className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium group-hover:text-primary transition-colors">Discord</div>
                      <div className="text-sm text-muted-foreground">加入社区</div>
                    </div>
                  </a>
                  
                  <a 
                    href={project.socialLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors group"
                  >
                    <ExternalLink className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium group-hover:text-primary transition-colors">社交媒体</div>
                      <div className="text-sm text-muted-foreground">关注最新动态</div>
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">项目信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">项目阶段</span>
                  <Badge className={`${getStageColor(project.projectStage)}`}>
                    {project.projectStage}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">分类</span>
                  <span className="font-medium text-sm">{project.category}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">团队规模</span>
                  <span className="font-medium">{project.teamSize}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">上线时间</span>
                  <span className="font-medium">{project.launchDate}</span>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">项目标签</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">快速操作</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" asChild>
                  <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-4 w-4 mr-2" />
                    访问项目
                  </a>
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Star className="h-4 w-4 mr-2" />
                  收藏项目
                </Button>
                
                <Button variant="outline" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  分享项目
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;