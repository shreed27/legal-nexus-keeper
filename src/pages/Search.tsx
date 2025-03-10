
import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, Filter, SlidersHorizontal, Clock, ArrowRight, BookOpen, Building2, Gavel, Scale, FileText, User, MapPin, Calendar, BarChart4, MessagesSquare, Bookmark, Minus, Plus, X, ChevronDown, ChevronUp, Brain } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

// Sample case results data
const SAMPLE_CASES = [
  {
    id: "case-1",
    title: "Smith v. Johnson",
    citation: "598 F.3d 456",
    court: "U.S. Supreme Court",
    date: "2024-03-10",
    summary: "Major case establishing new precedent for contract interpretation under federal law. The Court ruled that ambiguous terms should be interpreted in accordance with industry standards.",
    relevance: 98,
    jurisdiction: "Federal",
    tags: ["Contract Law", "Statutory Interpretation", "Precedent"],
    citedBy: 128
  },
  {
    id: "case-2",
    title: "United States v. GlobalTech Corp.",
    citation: "823 F.2d 782",
    court: "9th Circuit Court of Appeals",
    date: "2023-11-05",
    summary: "Corporate compliance case establishing standards for regulatory oversight in the technology sector. Significant implications for data privacy framework.",
    relevance: 87,
    jurisdiction: "Federal",
    tags: ["Corporate Law", "Regulatory Compliance", "Technology"],
    citedBy: 56
  },
  {
    id: "case-3",
    title: "California Public Interest Group v. TechGiant Inc.",
    citation: "89 Cal.App.5th 774",
    court: "California Court of Appeal",
    date: "2024-01-22",
    summary: "Landmark state case concerning consumer protection in digital services and platforms. Establishes heightened duty of care for user data.",
    relevance: 92,
    jurisdiction: "State",
    tags: ["Consumer Protection", "Digital Privacy", "State Law"],
    citedBy: 42
  },
  {
    id: "case-4",
    title: "Harmon Group LLC v. Metropolitan Financial",
    citation: "267 F.Supp.3d 982",
    court: "U.S. District Court",
    date: "2023-09-18",
    summary: "Complex financial services case addressing fiduciary duties in investment advisory relationships and disclosure requirements in securities transactions.",
    relevance: 78,
    jurisdiction: "Federal",
    tags: ["Financial Services", "Securities", "Fiduciary Duty"],
    citedBy: 23
  },
  {
    id: "case-5",
    title: "Martinez v. City of Westlake",
    citation: "734 N.E.2d 1092",
    court: "State Supreme Court",
    date: "2023-08-04",
    summary: "Municipal liability case establishing standards for government immunity in infrastructure maintenance. Created three-part test for municipal negligence claims.",
    relevance: 73,
    jurisdiction: "State",
    tags: ["Municipal Law", "Government Immunity", "Negligence"],
    citedBy: 31
  }
];

// Sample statute results data
const SAMPLE_STATUTES = [
  {
    id: "stat-1",
    title: "Federal Data Privacy Act of 2023",
    citation: "15 U.S.C. §§ 6501-6506",
    jurisdiction: "Federal",
    enacted: "2023-05-15",
    summary: "Comprehensive federal legislation establishing data privacy rights and corporate obligations regarding consumer data collection and processing.",
    relevance: 96,
    category: "Privacy Law",
    sections: ["Definitions", "Consumer Rights", "Corporate Obligations", "Enforcement"]
  },
  {
    id: "stat-2",
    title: "California Consumer Financial Protection Law",
    citation: "Cal. Fin. Code §§ 90000-90024",
    jurisdiction: "California",
    enacted: "2021-01-01",
    summary: "State legislation providing enhanced consumer protections in financial services beyond federal requirements. Includes special provisions for digital financial products.",
    relevance: 89,
    category: "Financial Regulation",
    sections: ["Scope", "Prohibited Practices", "Enforcement", "Remedies"]
  },
  {
    id: "stat-3",
    title: "Corporate Transparency Act",
    citation: "31 U.S.C. §§ 5336",
    jurisdiction: "Federal",
    enacted: "2021-01-01",
    summary: "Requires corporations and LLCs to report beneficial ownership information to FinCEN to prevent illicit use of shell companies.",
    relevance: 82,
    category: "Corporate Law",
    sections: ["Reporting Requirements", "Beneficial Owner Definition", "Penalties", "Exceptions"]
  },
  {
    id: "stat-4",
    title: "New York SHIELD Act",
    citation: "N.Y. Gen. Bus. Law § 899-aa, 899-bb",
    jurisdiction: "New York",
    enacted: "2020-03-21",
    summary: "State cybersecurity law requiring businesses with New York residents' private information to implement data security programs and breach notification protocols.",
    relevance: 85,
    category: "Cybersecurity",
    sections: ["Data Security Requirements", "Breach Notification", "Penalties", "Safe Harbors"]
  }
];

// Sample legal article data
const SAMPLE_ARTICLES = [
  {
    id: "art-1",
    title: "The Evolution of Data Privacy Law: Federal and State Approaches",
    author: "Jennifer R. Williams, J.D.",
    journal: "Harvard Law Review",
    date: "2024-02-15",
    summary: "Comparative analysis of federal and state approaches to data privacy regulation, with focus on CCPA, GDPR influences, and emerging federal framework.",
    relevance: 93,
    topics: ["Data Privacy", "Comparative Law", "Regulatory Frameworks"],
    citations: 24
  },
  {
    id: "art-2",
    title: "Corporate Liability Standards in the Age of AI",
    author: "Michael T. Chen, Ph.D., J.D.",
    journal: "Stanford Technology Law Review",
    date: "2023-11-28",
    summary: "Exploration of emerging liability standards for corporations deploying AI systems, including regulatory gaps and proposed governance frameworks.",
    relevance: 90,
    topics: ["Artificial Intelligence", "Corporate Liability", "Technology Law"],
    citations: 31
  },
  {
    id: "art-3",
    title: "Climate Change Litigation: New Theories of Recovery",
    author: "Sarah J. Martinez, LL.M.",
    journal: "Environmental Law Quarterly",
    date: "2024-01-10",
    summary: "Analysis of novel legal theories being employed in climate litigation against corporate entities, including public nuisance and consumer protection claims.",
    relevance: 85,
    topics: ["Environmental Law", "Climate Litigation", "Corporate Liability"],
    citations: 18
  }
];

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [jurisdiction, setJurisdiction] = useState('');
  const [courtType, setCourtType] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [contentType, setContentType] = useState('cases');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [relevanceRange, setRelevanceRange] = useState([70, 100]);
  const [dateRangeYears, setDateRangeYears] = useState([2020, 2024]);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [searchConfidence, setSearchConfidence] = useState(0);
  const [advancedMode, setAdvancedMode] = useState(false);
  const [isAiAnalysisEnabled, setIsAiAnalysisEnabled] = useState(true);

  // Jurisdictions filter options
  const jurisdictions = [
    { id: "federal", label: "Federal" },
    { id: "state", label: "State" },
    { id: "international", label: "International" },
    { id: "california", label: "California" },
    { id: "new-york", label: "New York" },
    { id: "texas", label: "Texas" },
    { id: "florida", label: "Florida" }
  ];

  // Topic filters
  const topicFilters = [
    { id: "corporate", label: "Corporate Law", checked: false },
    { id: "contract", label: "Contract Law", checked: false },
    { id: "ip", label: "Intellectual Property", checked: false },
    { id: "data-privacy", label: "Data Privacy", checked: false },
    { id: "employment", label: "Employment Law", checked: false },
    { id: "environmental", label: "Environmental Law", checked: false },
    { id: "regulatory", label: "Regulatory Compliance", checked: false }
  ];

  // Court filters
  const courtFilters = [
    { id: "supreme", label: "Supreme Court", checked: false },
    { id: "appellate", label: "Appellate Courts", checked: false },
    { id: "district", label: "District Courts", checked: false },
    { id: "state-supreme", label: "State Supreme Courts", checked: false },
    { id: "state-appellate", label: "State Appellate Courts", checked: false },
    { id: "administrative", label: "Administrative Tribunals", checked: false }
  ];

  // Load example data on component mount
  useEffect(() => {
    if (searchQuery === '') {
      // Pre-fill with example search term
      setSearchQuery('data privacy corporate compliance');
    }
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchResults([]);
    setSearchConfidence(0);
    
    // Simulate search progress
    const confidenceInterval = setInterval(() => {
      setSearchConfidence(prev => {
        if (prev >= 100) {
          clearInterval(confidenceInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    // Simulate a search request with delay
    setTimeout(() => {
      let results;
      switch (contentType) {
        case 'statutes':
          results = SAMPLE_STATUTES;
          break;
        case 'articles':
          results = SAMPLE_ARTICLES;
          break;
        case 'cases':
        default:
          results = SAMPLE_CASES;
          break;
      }
      
      // Filter by jurisdiction if selected
      if (jurisdiction) {
        results = results.filter((result: any) => 
          result.jurisdiction.toLowerCase() === jurisdiction.toLowerCase()
        );
      }

      // Filter by date range if selected
      if (dateRange) {
        const currentYear = new Date().getFullYear();
        let yearCutoff;
        
        switch (dateRange) {
          case 'last-year':
            yearCutoff = currentYear - 1;
            break;
          case 'last-5-years':
            yearCutoff = currentYear - 5;
            break;
          case 'last-10-years':
            yearCutoff = currentYear - 10;
            break;
          default:
            yearCutoff = 0;
        }
        
        if (yearCutoff > 0) {
          results = results.filter((result: any) => {
            const resultYear = new Date(result.date || result.enacted).getFullYear();
            return resultYear >= yearCutoff;
          });
        }
      }

      setSearchResults(results);
      setIsSearching(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 fade-in">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            AVENIX.PRO Legal Intelligence
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            AI-powered legal research across cases, statutes, and legal scholarship with neural network analysis.
          </p>
        </div>

        <Card className="neo-glass border-none p-6 shadow-2xl">
          <div className="flex flex-col gap-4">
            <div className="relative flex gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <SearchIcon className="text-muted-foreground" size={18} />
                </div>
                <Input
                  type="text"
                  placeholder="Search legal concepts, cases, statutes, or regulations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 shadow-sm bg-white border-transparent focus:border-primary/30 h-12 text-base backdrop-blur-sm"
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                {searchQuery && (
                  <button 
                    className="absolute inset-y-0 right-3 flex items-center"
                    onClick={() => setSearchQuery('')}
                  >
                    <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
              <Button 
                onClick={handleSearch} 
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-md group transition-all"
              >
                <span className="mr-2 transition-transform duration-300 group-hover:scale-110">Search</span>
                <SearchIcon size={18} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setFiltersVisible(!filtersVisible)}
                className="hidden sm:flex items-center justify-center h-12 w-12 bg-white/70 backdrop-blur-sm hover:bg-white/90 border-transparent shadow-sm"
              >
                <Filter size={18} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setAdvancedMode(!advancedMode)}
                className="hidden sm:flex items-center justify-center h-12 w-12 bg-white/70 backdrop-blur-sm hover:bg-white/90 border-transparent shadow-sm"
                title={advancedMode ? "Switch to standard mode" : "Switch to advanced mode"}
              >
                <Brain size={18} className={advancedMode ? "text-primary" : "text-gray-500"} />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <Tabs value={contentType} onValueChange={setContentType} className="w-full sm:w-auto">
                <TabsList className="grid grid-cols-3 bg-white/50 p-1 h-9">
                  <TabsTrigger value="cases" className="text-xs px-3 py-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-accent/20 data-[state=active]:text-primary">
                    <Gavel className="h-3 w-3 mr-1" />
                    Cases
                  </TabsTrigger>
                  <TabsTrigger value="statutes" className="text-xs px-3 py-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-accent/20 data-[state=active]:text-primary">
                    <Scale className="h-3 w-3 mr-1" />
                    Statutes
                  </TabsTrigger>
                  <TabsTrigger value="articles" className="text-xs px-3 py-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-accent/20 data-[state=active]:text-primary">
                    <BookOpen className="h-3 w-3 mr-1" />
                    Articles
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex flex-wrap gap-2 ml-auto">
                {isAiAnalysisEnabled ? (
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30 cursor-pointer" onClick={() => setIsAiAnalysisEnabled(!isAiAnalysisEnabled)}>
                    <Brain className="h-3 w-3 mr-1" />
                    AI Analysis On
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-gray-500 hover:bg-gray-100 cursor-pointer" onClick={() => setIsAiAnalysisEnabled(!isAiAnalysisEnabled)}>
                    <Brain className="h-3 w-3 mr-1" />
                    AI Analysis Off
                  </Badge>
                )}
                
                {advancedMode && (
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                    Advanced Mode
                  </Badge>
                )}
              </div>
            </div>

            {filtersVisible && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white/50 p-4 rounded-lg animate-fade-in mt-2">
                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-primary" />
                    Jurisdiction
                  </h3>
                  <Select value={jurisdiction} onValueChange={setJurisdiction}>
                    <SelectTrigger className="bg-white border-gray-200">
                      <SelectValue placeholder="Select Jurisdiction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Jurisdictions</SelectItem>
                      {jurisdictions.map(j => (
                        <SelectItem key={j.id} value={j.id}>{j.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center">
                    <Building2 className="h-4 w-4 mr-1 text-primary" />
                    Court Type
                  </h3>
                  <Select value={courtType} onValueChange={setCourtType}>
                    <SelectTrigger className="bg-white border-gray-200">
                      <SelectValue placeholder="Court Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Courts</SelectItem>
                      <SelectItem value="supreme">Supreme Court</SelectItem>
                      <SelectItem value="appellate">Appellate Courts</SelectItem>
                      <SelectItem value="district">District Courts</SelectItem>
                      <SelectItem value="state">State Courts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-primary" />
                    Date Range
                  </h3>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger className="bg-white border-gray-200">
                      <SelectValue placeholder="Date Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any Time</SelectItem>
                      <SelectItem value="last-year">Last Year</SelectItem>
                      <SelectItem value="last-5-years">Last 5 Years</SelectItem>
                      <SelectItem value="last-10-years">Last 10 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {advancedMode && (
                  <>
                    <div className="md:col-span-2">
                      <h3 className="text-sm font-medium mb-2 flex items-center">
                        <BarChart4 className="h-4 w-4 mr-1 text-primary" />
                        Relevance Range
                      </h3>
                      <div className="px-3">
                        <Slider 
                          value={relevanceRange} 
                          onValueChange={setRelevanceRange} 
                          min={0} 
                          max={100} 
                          step={1}
                          className="mb-1"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{relevanceRange[0]}%</span>
                          <span>{relevanceRange[1]}%</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2 flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-primary" />
                        Year Range
                      </h3>
                      <div className="px-3">
                        <Slider 
                          value={dateRangeYears} 
                          onValueChange={setDateRangeYears} 
                          min={1950} 
                          max={2024} 
                          step={1}
                          className="mb-1"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{dateRangeYears[0]}</span>
                          <span>{dateRangeYears[1]}</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {advancedMode && (
              <div className="bg-white/50 p-4 rounded-lg animate-fade-in mt-2">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="topics" className="border-b-0">
                    <AccordionTrigger className="py-2 text-sm font-medium">
                      <div className="flex items-center">
                        <MessagesSquare className="h-4 w-4 mr-2 text-primary" />
                        Topic Filters
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 py-2">
                        {topicFilters.map(topic => (
                          <div key={topic.id} className="flex items-center space-x-2">
                            <Checkbox id={`topic-${topic.id}`} />
                            <Label htmlFor={`topic-${topic.id}`} className="text-sm">{topic.label}</Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="courts" className="border-b-0">
                    <AccordionTrigger className="py-2 text-sm font-medium">
                      <div className="flex items-center">
                        <Building2 className="h-4 w-4 mr-2 text-primary" />
                        Court Filters
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-2">
                        {courtFilters.map(court => (
                          <div key={court.id} className="flex items-center space-x-2">
                            <Checkbox id={`court-${court.id}`} />
                            <Label htmlFor={`court-${court.id}`} className="text-sm">{court.label}</Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="search-options" className="border-b-0">
                    <AccordionTrigger className="py-2 text-sm font-medium">
                      <div className="flex items-center">
                        <SlidersHorizontal className="h-4 w-4 mr-2 text-primary" />
                        Advanced Search Options
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="exact-match" />
                          <Label htmlFor="exact-match" className="text-sm">Exact Match</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="include-concurrences" />
                          <Label htmlFor="include-concurrences" className="text-sm">Include Concurrences</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="include-dissents" />
                          <Label htmlFor="include-dissents" className="text-sm">Include Dissents</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="overturned" />
                          <Label htmlFor="overturned" className="text-sm">Include Overturned</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="cited-by" defaultChecked />
                          <Label htmlFor="cited-by" className="text-sm">Sort by Citations</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="semantic-search" defaultChecked />
                          <Label htmlFor="semantic-search" className="text-sm">Semantic Search</Label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}
          </div>
        </Card>

        {isSearching && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Analyzing results with neural network...
              </div>
              <div className="text-sm font-medium">
                <span className="text-primary">{searchConfidence}%</span> confidence
              </div>
            </div>
            <Progress value={searchConfidence} className="h-1 bg-gray-100" />
            
            <div className="space-y-3">
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="bg-white/50 backdrop-blur-sm rounded-lg p-5 animate-pulse border border-gray-100 shadow-sm">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-100 rounded w-1/4 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-100 rounded w-full"></div>
                    <div className="h-3 bg-gray-100 rounded w-full"></div>
                    <div className="h-3 bg-gray-100 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!isSearching && searchResults.length > 0 && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex justify-between items-center">
              <div className="text-lg font-medium">
                Results for "{searchQuery}"
              </div>
              <div className="text-sm text-muted-foreground">
                {searchResults.length} results • Sorted by relevance
              </div>
            </div>

            <div className="grid gap-4">
              {contentType === 'cases' && searchResults.map((result: any) => (
                <Card 
                  key={result.id} 
                  className="hover:shadow-lg transition-all duration-300 border-none shadow-md bg-white/70 backdrop-blur-sm hover:translate-y-[-2px]"
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div>
                        <CardTitle className="text-lg hover:text-primary cursor-pointer transition-colors">{result.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{result.citation}</p>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Bookmark className="h-4 w-4 text-gray-400 hover:text-primary" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Save to library</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm">{result.summary}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        {result.court}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(result.date).toLocaleDateString()}
                      </div>
                      {result.citedBy && (
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Cited {result.citedBy} times
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {result.tags?.map((tag: string, idx: number) => (
                        <Badge key={idx} variant="outline" className="bg-gray-50 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {isAiAnalysisEnabled && (
                      <div className="rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 p-3 border border-primary/10">
                        <div className="flex items-center gap-2 text-sm font-medium text-primary mb-2">
                          <Brain className="h-4 w-4" />
                          AI Analysis
                        </div>
                        <p className="text-sm text-gray-600">
                          This case establishes important precedent for contract interpretation in technology contexts. 
                          It has been cited extensively in recent litigation around ambiguous terms in digital agreements.
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="text-xs font-medium">Relevance:</div>
                          <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full" 
                              style={{ width: `${result.relevance}%` }}
                            ></div>
                          </div>
                          <div className="text-xs font-medium">{result.relevance}%</div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="border-t border-gray-100 pt-3 justify-end">
                    <Button variant="outline" size="sm" className="text-xs bg-white">
                      View Full Case
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}

              {contentType === 'statutes' && searchResults.map((result: any) => (
                <Card 
                  key={result.id} 
                  className="hover:shadow-lg transition-all duration-300 border-none shadow-md bg-white/70 backdrop-blur-sm hover:translate-y-[-2px]"
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div>
                        <CardTitle className="text-lg hover:text-primary cursor-pointer transition-colors">{result.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{result.citation}</p>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Bookmark className="h-4 w-4 text-gray-400 hover:text-primary" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Save to library</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm">{result.summary}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {result.jurisdiction}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Enacted: {new Date(result.enacted).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        {result.category}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="text-xs font-medium mr-2">Key Sections:</div>
                      {result.sections?.map((section: string, idx: number) => (
                        <Badge key={idx} variant="outline" className="bg-gray-50 text-xs">
                          {section}
                        </Badge>
                      ))}
                    </div>

                    {isAiAnalysisEnabled && (
                      <div className="rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 p-3 border border-primary/10">
                        <div className="flex items-center gap-2 text-sm font-medium text-primary mb-2">
                          <Brain className="h-4 w-4" />
                          AI Analysis
                        </div>
                        <p className="text-sm text-gray-600">
                          This statute introduced significant compliance requirements for organizations. 
                          Key provisions focus on {result.category.toLowerCase()} standards that affect most client scenarios.
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="text-xs font-medium">Relevance:</div>
                          <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full" 
                              style={{ width: `${result.relevance}%` }}
                            ></div>
                          </div>
                          <div className="text-xs font-medium">{result.relevance}%</div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="border-t border-gray-100 pt-3 justify-end">
                    <Button variant="outline" size="sm" className="text-xs bg-white">
                      View Full Text
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}

              {contentType === 'articles' && searchResults.map((result: any) => (
                <Card 
                  key={result.id} 
                  className="hover:shadow-lg transition-all duration-300 border-none shadow-md bg-white/70 backdrop-blur-sm hover:translate-y-[-2px]"
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div>
                        <CardTitle className="text-lg hover:text-primary cursor-pointer transition-colors">{result.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{result.journal}</p>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Bookmark className="h-4 w-4 text-gray-400 hover:text-primary" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Save to library</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm">{result.summary}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {result.author}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(result.date).toLocaleDateString()}
                      </div>
                      {result.citations && (
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Cited {result.citations} times
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {result.topics?.map((topic: string, idx: number) => (
                        <Badge key={idx} variant="outline" className="bg-gray-50 text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>

                    {isAiAnalysisEnabled && (
                      <div className="rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 p-3 border border-primary/10">
                        <div className="flex items-center gap-2 text-sm font-medium text-primary mb-2">
                          <Brain className="h-4 w-4" />
                          AI Analysis
                        </div>
                        <p className="text-sm text-gray-600">
                          This article provides valuable insights on emerging legal trends in {result.topics[0].toLowerCase()}.
                          The author is a recognized authority with several cited publications in the field.
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="text-xs font-medium">Relevance:</div>
                          <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full" 
                              style={{ width: `${result.relevance}%` }}
                            ></div>
                          </div>
                          <div className="text-xs font-medium">{result.relevance}%</div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="border-t border-gray-100 pt-3 justify-end">
                    <Button variant="outline" size="sm" className="text-xs bg-white">
                      View Full Article
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
