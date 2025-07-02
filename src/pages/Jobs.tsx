import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin, Clock, DollarSign, ExternalLink, Briefcase, Users, Code, Zap } from "lucide-react";

const jobCategories = ["All", "Engineering", "Design", "Product", "Marketing", "Business", "Research"];
const jobTypes = ["All", "Full-time", "Part-time", "Contract", "Remote"];
const experienceLevels = ["All", "Entry", "Mid", "Senior", "Lead"];

const jobs = [
  {
    id: 1,
    title: "Senior Blockchain Developer",
    company: "DefiLabs",
    location: "Remote",
    type: "Full-time",
    salary: "$120k - $180k",
    experience: "Senior",
    category: "Engineering",
    description: "Build the next generation of DeFi protocols using Solidity and Web3 technologies.",
    tags: ["Solidity", "Web3", "DeFi", "Smart Contracts"],
    logo: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=64&h=64&fit=crop",
    postedDate: "2 days ago",
    featured: true
  },
  {
    id: 2,
    title: "Web3 Product Designer",
    company: "MetaVerse Inc",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$100k - $140k",
    experience: "Mid",
    category: "Design",
    description: "Design intuitive user experiences for our metaverse platform and NFT marketplace.",
    tags: ["UI/UX", "NFT", "Metaverse", "Figma"],
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=64&h=64&fit=crop",
    postedDate: "1 week ago",
    featured: false
  },
  {
    id: 3,
    title: "Smart Contract Auditor",
    company: "SecureChain",
    location: "Remote",
    type: "Contract",
    salary: "$150 - $200/hour",
    experience: "Senior",
    category: "Engineering",
    description: "Conduct security audits for smart contracts and DeFi protocols.",
    tags: ["Security", "Audit", "Solidity", "DeFi"],
    logo: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=64&h=64&fit=crop",
    postedDate: "3 days ago",
    featured: true
  },
  {
    id: 4,
    title: "Web3 Marketing Manager",
    company: "CryptoGrowth",
    location: "New York, NY",
    type: "Full-time",
    salary: "$80k - $120k",
    experience: "Mid",
    category: "Marketing",
    description: "Lead marketing campaigns for Web3 startups and crypto projects.",
    tags: ["Marketing", "Crypto", "Community", "Growth"],
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=64&h=64&fit=crop",
    postedDate: "5 days ago",
    featured: false
  },
  {
    id: 5,
    title: "DevRel Engineer",
    company: "Web3API",
    location: "Remote",
    type: "Full-time",
    salary: "$110k - $150k",
    experience: "Mid",
    category: "Engineering",
    description: "Build developer tools and create educational content for our API platform.",
    tags: ["DevRel", "API", "Documentation", "Community"],
    logo: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=64&h=64&fit=crop",
    postedDate: "1 week ago",
    featured: false
  },
  {
    id: 6,
    title: "Tokenomics Researcher",
    company: "DeFi Research Lab",
    location: "Remote",
    type: "Full-time",
    salary: "$90k - $130k",
    experience: "Senior",
    category: "Research",
    description: "Research and design token economic models for DeFi protocols.",
    tags: ["Tokenomics", "Research", "Economics", "DeFi"],
    logo: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=64&h=64&fit=crop",
    postedDate: "4 days ago",
    featured: false
  }
];

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedExperience, setSelectedExperience] = useState("All");

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || job.category === selectedCategory;
    const matchesType = selectedType === "All" || job.type === selectedType;
    const matchesExperience = selectedExperience === "All" || job.experience === selectedExperience;
    
    return matchesSearch && matchesCategory && matchesType && matchesExperience;
  });

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
                  placeholder="Search jobs..." 
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
              <Button variant="ghost" className="text-foreground/80" asChild>
                <Link to="/resources">Resources</Link>
              </Button>
              <Button variant="ghost" className="text-primary font-medium" asChild>
                <Link to="/jobs">Jobs</Link>
              </Button>
            </nav>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">Post a Job</Button>
              <Button variant="default" size="sm">Sign in</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Web3 Jobs
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find your dream job in the Web3 space. Join the future of the internet.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Categories */}
          <div>
            <label className="text-sm font-medium mb-2 block">Category</label>
            <div className="flex flex-wrap gap-2">
              {jobCategories.map((category) => (
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

          {/* Job Type and Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Job Type</label>
              <div className="flex flex-wrap gap-2">
                {jobTypes.map((type) => (
                  <Badge
                    key={type}
                    variant={selectedType === type ? "default" : "secondary"}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setSelectedType(type)}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Experience Level</label>
              <div className="flex flex-wrap gap-2">
                {experienceLevels.map((level) => (
                  <Badge
                    key={level}
                    variant={selectedExperience === level ? "default" : "secondary"}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setSelectedExperience(level)}
                  >
                    {level}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Job Results Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold">
            {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
          </h2>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="group hover:border-primary/50 transition-all duration-200 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Company Logo */}
                  <img 
                    src={job.logo} 
                    alt={job.company}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  
                  {/* Job Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                            {job.title}
                          </h3>
                          {job.featured && (
                            <Badge variant="default" className="text-xs">
                              <Zap className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        <p className="text-primary font-medium mb-1">{job.company}</p>
                      </div>
                      <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Apply
                      </Button>
                    </div>

                    <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                      {job.description}
                    </p>

                    {/* Job Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        {job.type}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {job.salary}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {job.experience}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {job.postedDate}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline">
            Load More Jobs
          </Button>
        </div>

        {/* Empty State */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              No jobs found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or check back later for new opportunities
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 text-center bg-card border border-border rounded-lg p-8">
          <h3 className="text-xl font-semibold mb-2">Looking to hire?</h3>
          <p className="text-muted-foreground mb-4">
            Post your Web3 job and reach thousands of qualified candidates
          </p>
          <Button variant="default">
            Post a Job
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Jobs;