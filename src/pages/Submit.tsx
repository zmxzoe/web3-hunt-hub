import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Upload, Link as LinkIcon, Tag, Users, Calendar, Globe } from "lucide-react";

const categories = [
  "DeFi", "NFT", "GameFi", "DAO", "Infrastructure", "Metaverse", 
  "Social", "Analytics", "Education", "Tools", "Trading", "Identity"
];

const stages = [
  "概念阶段", "开发中", "测试网", "主网上线", "成熟产品"
];

const Submit = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    fullDescription: "",
    website: "",
    twitter: "",
    discord: "",
    telegram: "",
    github: "",
    whitepaper: "",
    category: "",
    stage: "",
    tags: "",
    teamSize: "",
    fundingRaised: "",
    launchDate: "",
    email: "",
    contactName: "",
    agreeToTerms: false,
    allowCommunity: false
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 模拟提交过程
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("提交的数据:", formData);
    console.log("上传的图片:", imageFiles);
    
    // 这里可以添加实际的提交逻辑
    alert("项目提交成功！我们将在24小时内审核您的项目。");
    
    setIsSubmitting(false);
  };

  const isFormValid = formData.name && formData.description && formData.website && 
                     formData.category && formData.email && formData.agreeToTerms;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>返回首页</span>
            </Link>
            
            <div className="text-center">
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                提交项目到 Web3Hunt
              </h1>
            </div>
            
            <div className="w-20"></div> {/* Spacer for center alignment */}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">分享您的 Web3 项目</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            向 Web3 社区展示您的创新项目，获得用户反馈和社区支持。
            所有提交的项目将在24小时内进行审核。
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 基本信息 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                基本信息
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">项目名称 *</label>
                  <Input
                    placeholder="输入项目名称"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">项目分类 *</label>
                  <Select onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择项目分类" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">简短描述 *</label>
                <Textarea
                  placeholder="用一句话描述您的项目（建议50-100字）"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="h-20"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">详细介绍</label>
                <Textarea
                  placeholder="详细介绍您的项目功能、技术特点、解决的问题等"
                  value={formData.fullDescription}
                  onChange={(e) => handleInputChange("fullDescription", e.target.value)}
                  className="h-32"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">项目阶段</label>
                  <Select onValueChange={(value) => handleInputChange("stage", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择项目阶段" />
                    </SelectTrigger>
                    <SelectContent>
                      {stages.map((stage) => (
                        <SelectItem key={stage} value={stage}>
                          {stage}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">预计/实际上线时间</label>
                  <Input
                    type="date"
                    value={formData.launchDate}
                    onChange={(e) => handleInputChange("launchDate", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">项目标签</label>
                <Input
                  placeholder="用逗号分隔的标签，如：DEX, AMM, Ethereum"
                  value={formData.tags}
                  onChange={(e) => handleInputChange("tags", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  建议添加3-5个相关标签，有助于用户发现您的项目
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 链接信息 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5" />
                项目链接
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">官方网站 *</label>
                  <Input
                    placeholder="https://yourproject.com"
                    value={formData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">GitHub</label>
                  <Input
                    placeholder="https://github.com/yourproject"
                    value={formData.github}
                    onChange={(e) => handleInputChange("github", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Twitter</label>
                  <Input
                    placeholder="https://twitter.com/yourproject"
                    value={formData.twitter}
                    onChange={(e) => handleInputChange("twitter", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Discord</label>
                  <Input
                    placeholder="https://discord.gg/yourproject"
                    value={formData.discord}
                    onChange={(e) => handleInputChange("discord", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Telegram</label>
                  <Input
                    placeholder="https://t.me/yourproject"
                    value={formData.telegram}
                    onChange={(e) => handleInputChange("telegram", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">白皮书</label>
                  <Input
                    placeholder="白皮书链接"
                    value={formData.whitepaper}
                    onChange={(e) => handleInputChange("whitepaper", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 团队信息 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                团队与项目信息
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">团队规模</label>
                  <Select onValueChange={(value) => handleInputChange("teamSize", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择团队规模" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-5">1-5人</SelectItem>
                      <SelectItem value="6-10">6-10人</SelectItem>
                      <SelectItem value="11-20">11-20人</SelectItem>
                      <SelectItem value="20+">20人以上</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">融资情况</label>
                  <Select onValueChange={(value) => handleInputChange("fundingRaised", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择融资情况" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">暂未融资</SelectItem>
                      <SelectItem value="angel">天使轮</SelectItem>
                      <SelectItem value="seed">种子轮</SelectItem>
                      <SelectItem value="series-a">A轮</SelectItem>
                      <SelectItem value="series-b">B轮及以上</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 媒体资料 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                媒体资料
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">项目截图/Logo</label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    点击上传或拖拽文件到此处
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer text-primary hover:underline text-sm"
                  >
                    选择文件
                  </label>
                  <p className="text-xs text-muted-foreground mt-2">
                    支持 PNG, JPG, JPEG 格式，最多5张图片
                  </p>
                </div>
                {imageFiles.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {imageFiles.map((file, index) => (
                      <Badge key={index} variant="outline">
                        {file.name}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 联系信息 */}
          <Card>
            <CardHeader>
              <CardTitle>联系信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">联系人姓名 *</label>
                  <Input
                    placeholder="您的姓名"
                    value={formData.contactName}
                    onChange={(e) => handleInputChange("contactName", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">邮箱地址 *</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 协议确认 */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked)}
                  />
                  <label htmlFor="terms" className="text-sm leading-relaxed">
                    我同意 <span className="text-primary cursor-pointer hover:underline">服务条款</span> 和 
                    <span className="text-primary cursor-pointer hover:underline ml-1">隐私政策</span>，
                    并确认提交的信息真实有效。*
                  </label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="community"
                    checked={formData.allowCommunity}
                    onCheckedChange={(checked) => handleInputChange("allowCommunity", checked)}
                  />
                  <label htmlFor="community" className="text-sm text-muted-foreground">
                    允许 Web3Hunt 社区成员就我的项目进行讨论和反馈
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 提交按钮 */}
          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              size="lg"
              className="px-12"
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? "提交中..." : "提交项目"}
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            提交后我们将在24小时内审核您的项目，审核通过后将自动发布到首页
          </p>
        </form>
      </div>
    </div>
  );
};

export default Submit;