import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, Star, Globe, Code, MessageCircle, Zap, Shield, TrendingUp } from "lucide-react";

// Mock navigation data for Web3 projects
const navigationData = {
  1: {
    id: 1,
    name: "Web3 生态导航",
    description: "发现最新最热的Web3项目和工具",
    categories: [
      {
        name: "DeFi 协议",
        description: "去中心化金融协议和平台",
        icon: TrendingUp,
        links: [
          { name: "Uniswap", url: "https://uniswap.org", description: "领先的去中心化交易所", tags: ["DEX", "AMM"] },
          { name: "Aave", url: "https://aave.com", description: "去中心化借贷协议", tags: ["Lending", "Borrowing"] },
          { name: "Compound", url: "https://compound.finance", description: "算法货币市场协议", tags: ["Lending", "Interest"] },
          { name: "MakerDAO", url: "https://makerdao.com", description: "去中心化稳定币协议", tags: ["Stablecoin", "DAI"] },
          { name: "Curve Finance", url: "https://curve.fi", description: "稳定币交易优化平台", tags: ["Stablecoins", "DEX"] }
        ]
      },
      {
        name: "NFT 市场",
        description: "数字收藏品和NFT交易平台",
        icon: Star,
        links: [
          { name: "OpenSea", url: "https://opensea.io", description: "最大的NFT市场", tags: ["Marketplace", "Trading"] },
          { name: "Blur", url: "https://blur.io", description: "专业NFT交易平台", tags: ["Pro Trading", "Aggregator"] },
          { name: "Magic Eden", url: "https://magiceden.io", description: "Solana生态NFT市场", tags: ["Solana", "Multi-chain"] },
          { name: "Foundation", url: "https://foundation.app", description: "策展式艺术NFT平台", tags: ["Art", "Curated"] },
          { name: "SuperRare", url: "https://superrare.com", description: "数字艺术收藏平台", tags: ["Digital Art", "Collectibles"] }
        ]
      },
      {
        name: "开发工具",
        description: "Web3开发必备工具和服务",
        icon: Code,
        links: [
          { name: "Alchemy", url: "https://alchemy.com", description: "区块链开发平台", tags: ["API", "Infrastructure"] },
          { name: "Infura", url: "https://infura.io", description: "以太坊节点服务", tags: ["Nodes", "Ethereum"] },
          { name: "Hardhat", url: "https://hardhat.org", description: "以太坊开发环境", tags: ["Development", "Testing"] },
          { name: "Truffle", url: "https://trufflesuite.com", description: "智能合约开发框架", tags: ["Smart Contracts", "Testing"] },
          { name: "Remix", url: "https://remix.ethereum.org", description: "在线智能合约IDE", tags: ["IDE", "Online"] }
        ]
      },
      {
        name: "钱包工具",
        description: "数字资产管理和存储解决方案",
        icon: Shield,
        links: [
          { name: "MetaMask", url: "https://metamask.io", description: "最受欢迎的以太坊钱包", tags: ["Browser", "Mobile"] },
          { name: "WalletConnect", url: "https://walletconnect.com", description: "钱包连接协议", tags: ["Protocol", "Integration"] },
          { name: "Coinbase Wallet", url: "https://wallet.coinbase.com", description: "Coinbase自托管钱包", tags: ["Self-custody", "Mobile"] },
          { name: "Trust Wallet", url: "https://trustwallet.com", description: "多链移动钱包", tags: ["Multi-chain", "Mobile"] },
          { name: "Phantom", url: "https://phantom.app", description: "Solana生态钱包", tags: ["Solana", "Browser"] }
        ]
      },
      {
        name: "Layer 2",
        description: "以太坊扩容解决方案",
        icon: Zap,
        links: [
          { name: "Polygon", url: "https://polygon.technology", description: "以太坊扩容平台", tags: ["Scaling", "Sidechain"] },
          { name: "Arbitrum", url: "https://arbitrum.io", description: "乐观型Rollup解决方案", tags: ["Rollup", "Optimistic"] },
          { name: "Optimism", url: "https://optimism.io", description: "以太坊Layer 2网络", tags: ["Rollup", "OP Stack"] },
          { name: "zkSync", url: "https://zksync.io", description: "零知识证明Rollup", tags: ["ZK", "Rollup"] },
          { name: "StarkNet", url: "https://starknet.io", description: "零知识证明Layer 2", tags: ["ZK-STARK", "Cairo"] }
        ]
      },
      {
        name: "社区论坛",
        description: "Web3社区讨论和学习平台",
        icon: MessageCircle,
        links: [
          { name: "Mirror", url: "https://mirror.xyz", description: "去中心化内容发布平台", tags: ["Writing", "Publishing"] },
          { name: "Farcaster", url: "https://farcaster.xyz", description: "去中心化社交协议", tags: ["Social", "Protocol"] },
          { name: "Lens Protocol", url: "https://lens.xyz", description: "Web3社交媒体协议", tags: ["Social Graph", "NFT"] },
          { name: "CyberConnect", url: "https://cyberconnect.me", description: "去中心化社交网络", tags: ["Social", "Identity"] },
          { name: "Discord", url: "https://discord.com", description: "最大的Web3社区平台", tags: ["Chat", "Community"] }
        ]
      }
    ]
  }
};

const ProjectDetail = () => {
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(0);

  const project = id ? navigationData[Number(id) as keyof typeof navigationData] : undefined;

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">导航站未找到</h1>
          <Link to="/">
            <Button variant="default">返回首页</Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentCategory = project.categories[selectedCategory];

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
                收藏导航
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            {project.name}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {project.description}
          </p>
        </div>

        <div className="flex gap-8">
          {/* Category Sidebar */}
          <div className="w-64 space-y-2">
            <h3 className="font-semibold text-lg mb-4">分类导航</h3>
            {project.categories.map((category, index) => {
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

            {/* Links Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentCategory.links.map((link, index) => (
                <Card key={index} className="group hover:border-primary/50 transition-all duration-200 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Globe className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                            {link.name}
                          </h3>
                        </div>
                      </div>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {link.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {link.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
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
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        访问网站
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
                  <h4 className="font-semibold">当前分类统计</h4>
                  <p className="text-muted-foreground text-sm">
                    共收录 {currentCategory.links.length} 个优质项目
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {currentCategory.links.length}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    项目
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

export default ProjectDetail;