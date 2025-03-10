
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search as SearchIcon, 
  Book, 
  Scale, 
  Lightbulb, 
  Database, 
  History, 
  BookOpen, 
  ArrowRight, 
  Filter, 
  Calendar, 
  FileText,
  Bookmark,
  TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("search");
  const [searchResults, setSearchResults] = useState<null | any[]>(null);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const features = [
    {
      icon: Book,
      title: "Case Law Analysis",
      description: "Advanced AI analysis of relevant case law and precedents"
    },
    {
      icon: Scale,
      title: "Legal Citations",
      description: "Automatic citation formatting and verification"
    },
    {
      icon: Lightbulb,
      title: "Smart Insights",
      description: "AI-powered legal research recommendations"
    },
    {
      icon: Database,
      title: "Vast Database",
      description: "Access to millions of legal documents and cases"
    }
  ];

  const recentSearches = [
    "Contract breach remedies in commercial law",
    "Intellectual property rights in digital assets",
    "Employment law recent changes 2024"
  ];

  const mockSearchResults = [
    {
      id: 1,
      title: "Smith v. Johnson (2023)",
      excerpt: "The court held that in cases of breach of contract, the non-breaching party is entitled to damages that would place them in the position they would have been in had the contract been performed.",
      type: "Case Law",
      relevance: 98,
      date: "2023-05-10",
      jurisdiction: "Federal",
      citation: "123 F.3d 456",
      tags: ["Contract Law", "Damages", "Breach of Contract"]
    },
    {
      id: 2,
      title: "Legal Implications of Digital Assets",
      excerpt: "This scholarly article examines the evolving legal framework surrounding digital assets, including NFTs and cryptocurrencies, with a focus on intellectual property rights.",
      type: "Article",
      relevance: 94,
      date: "2024-01-15",
      publisher: "Harvard Law Review",
      tags: ["Digital Assets", "Intellectual Property", "Cryptocurrency"]
    },
    {
      id: 3,
      title: "Wilson v. Tech Innovations Inc.",
      excerpt: "The court established that algorithms created by employees during their employment are generally considered work-for-hire and belong to the employer, absent specific contract provisions.",
      type: "Case Law",
      relevance: 87,
      date: "2022-11-22",
      jurisdiction: "State",
      citation: "789 N.E.2d 123",
      tags: ["IP Law", "Employment Law", "Technology"]
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsSearching(true);
    setSearchResults(null);
    
    toast({
      title: "Search Initiated",
      description: "Analyzing legal databases for relevant results...",
    });

    // Simulate search delay
    setTimeout(() => {
      setSearchResults(mockSearchResults);
      setIsSearching(false);
      setActiveTab("results");
      
      toast({
        title: "Search Complete",
        description: `Found ${mockSearchResults.length} relevant results`,
      });
    }, 1500);
  };

  const handleClearHistory = () => {
    toast({
      title: "History Cleared",
      description: "Your search history has been cleared",
    });
  };

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl shadow-md">
            <SearchIcon className="h-6 w-6 text-primary" />
          </div>
          <h1 className="page-title">AI Legal Research</h1>
        </div>
        <p className="page-description">Powerful legal research with AI-driven insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {features.map((feature, index) => (
          <Card key={index} className="bg-white/50 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all hover:scale-105">
            <CardHeader>
              <feature.icon className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/50 p-1 rounded-lg border border-white/60 shadow-md">
            <TabsTrigger 
              value="search"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-accent/20 data-[state=active]:text-primary"
            >
              <SearchIcon className="w-4 h-4 mr-2" />
              Search
            </TabsTrigger>
            <TabsTrigger 
              value="advanced"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-accent/20 data-[state=active]:text-primary"
            >
              <Filter className="w-4 h-4 mr-2" />
              Advanced Search
            </TabsTrigger>
            {searchResults && (
              <TabsTrigger 
                value="results"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-accent/20 data-[state=active]:text-primary"
              >
                <FileText className="w-4 h-4 mr-2" />
                Results ({searchResults.length})
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="search" className="animate-fade-in">
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Enter your legal research query..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-10 bg-white text-lg py-6"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={!query.trim() || isSearching}
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white"
                >
                  {isSearching ? (
                    <>Searching...</>
                  ) : (
                    <>
                      <SearchIcon className="w-4 h-4 mr-2" />
                      Search
                    </>
                  )}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                <div>
                  <Label className="text-neutral-600 mb-2 block">Source Types</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="cases" defaultChecked />
                      <label htmlFor="cases" className="text-sm font-medium leading-none cursor-pointer">Case Law</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="statutes" defaultChecked />
                      <label htmlFor="statutes" className="text-sm font-medium leading-none cursor-pointer">Statutes & Regulations</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="articles" defaultChecked />
                      <label htmlFor="articles" className="text-sm font-medium leading-none cursor-pointer">Law Review Articles</label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label className="text-neutral-600 mb-2 block">Jurisdiction</Label>
                  <Select defaultValue="all">
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select jurisdiction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Jurisdictions</SelectItem>
                      <SelectItem value="federal">Federal</SelectItem>
                      <SelectItem value="state">State</SelectItem>
                      <SelectItem value="international">International</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-neutral-600 mb-2 block">Time Period</Label>
                  <Select defaultValue="all">
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select time period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="1y">Past Year</SelectItem>
                      <SelectItem value="5y">Past 5 Years</SelectItem>
                      <SelectItem value="10y">Past 10 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>

            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Recent Searches
                </h2>
                <Button variant="ghost" size="sm" onClick={handleClearHistory}>Clear History</Button>
              </div>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-blue-50 transition-colors cursor-pointer group border border-neutral-100"
                    onClick={() => setQuery(search)}
                  >
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-neutral-500" />
                      <span>{search}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="animate-fade-in">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Jurisdiction</Label>
                    <Select defaultValue="federal">
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select jurisdiction" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="federal">Federal</SelectItem>
                        <SelectItem value="state">State</SelectItem>
                        <SelectItem value="local">Local</SelectItem>
                        <SelectItem value="international">International</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Document Type</Label>
                    <Select defaultValue="all">
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select document type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Documents</SelectItem>
                        <SelectItem value="cases">Cases</SelectItem>
                        <SelectItem value="statutes">Statutes</SelectItem>
                        <SelectItem value="regulations">Regulations</SelectItem>
                        <SelectItem value="articles">Law Review Articles</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Date Range</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Input type="date" className="bg-white" />
                      </div>
                      <div>
                        <Input type="date" className="bg-white" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label>Keywords</Label>
                    <Input placeholder="Enter keywords..." className="bg-white" />
                  </div>
                  
                  <div>
                    <Label>Citation</Label>
                    <Input placeholder="Enter citation..." className="bg-white" />
                  </div>
                  
                  <div>
                    <Label>Results Sort Order</Label>
                    <RadioGroup defaultValue="relevance" className="mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="relevance" id="relevance" />
                        <Label htmlFor="relevance">Relevance</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="recent" id="recent" />
                        <Label htmlFor="recent">Most Recent</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cited" id="cited" />
                        <Label htmlFor="cited">Most Cited</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleSearch}
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white"
              >
                <SearchIcon className="w-4 h-4 mr-2" />
                Perform Advanced Search
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="results" className="animate-fade-in">
            {searchResults && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Search Results</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-neutral-500">Sort by:</span>
                    <Select defaultValue="relevance">
                      <SelectTrigger className="bg-white w-40">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="relevance">Relevance</SelectItem>
                        <SelectItem value="recent">Most Recent</SelectItem>
                        <SelectItem value="cited">Most Cited</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {searchResults.map((result) => (
                    <Card key={result.id} className="bg-white hover:shadow-md transition-all cursor-pointer">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="bg-blue-50 text-primary">
                                {result.type}
                              </Badge>
                              {result.relevance && (
                                <div className="flex items-center text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                  {result.relevance}% Match
                                </div>
                              )}
                            </div>
                            <CardTitle className="text-lg text-primary">{result.title}</CardTitle>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Bookmark className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-neutral-500 mt-1">
                          {result.date && (
                            <div className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {new Date(result.date).toLocaleDateString()}
                            </div>
                          )}
                          {result.citation && <div>{result.citation}</div>}
                          {result.jurisdiction && <div>{result.jurisdiction}</div>}
                          {result.publisher && <div>{result.publisher}</div>}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-neutral-700">{result.excerpt}</p>
                        
                        {result.tags && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {result.tags.map((tag, i) => (
                              <Badge key={i} variant="secondary" className="bg-neutral-100 hover:bg-neutral-200">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex justify-end mt-4">
                          <Button variant="outline" size="sm" className="bg-white">
                            View Full Document
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Search;
