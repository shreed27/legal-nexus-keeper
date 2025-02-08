import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon, Book, Scale, Lightbulb, Database, History, BookOpen, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "../hooks/use-mobile";

const Search = () => {
  const [query, setQuery] = useState("");
  const { toast } = useToast();
  const isMobile = useIsMobile();

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Search Initiated",
      description: "Analyzing legal databases for relevant results...",
    });
  };

  return (
    <div className="min-h-screen bg-neutral-light">
      <Sidebar />
      <Header />
      
      <main className={`transition-all duration-300 ${isMobile ? 'ml-0 px-4' : 'ml-64 px-8'} pt-20`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-primary/10 rounded-xl">
              <SearchIcon className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-neutral-dark">AI Legal Research</h1>
              <p className="text-neutral-600 mt-1">Powerful legal research with AI-driven insights</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/50 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all">
                <CardHeader>
                  <feature.icon className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <Tabs defaultValue="search" className="space-y-6">
              <TabsList className="grid grid-cols-2 w-[400px]">
                <TabsTrigger value="search">Quick Search</TabsTrigger>
                <TabsTrigger value="advanced">Advanced Search</TabsTrigger>
              </TabsList>

              <TabsContent value="search">
                <form onSubmit={handleSearch} className="space-y-6">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter your legal research query..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" disabled={!query.trim()}>
                      <SearchIcon className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="advanced">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Jurisdiction</label>
                      <Input placeholder="Select jurisdiction..." />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Date Range</label>
                      <Input type="date" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Keywords</label>
                    <Input placeholder="Enter keywords..." />
                  </div>
                  <Button className="w-full">
                    Perform Advanced Search
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Recent Searches
                </h2>
                <Button variant="ghost" size="sm">Clear History</Button>
              </div>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer group"
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;
