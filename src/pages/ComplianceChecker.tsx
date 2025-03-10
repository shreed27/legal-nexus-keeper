import { useState, useEffect } from "react";
import { Shield, CheckCircle, AlertTriangle, FileCheck, Scale, Book, ChevronRight, RefreshCw, CheckSquare, XSquare, FileText, Database, Zap, BarChart4, Brain, GanttChartSquare, Lightbulb, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

const SAMPLE_REGULATIONS = [
  {
    id: "reg-1",
    title: "Federal Rule 37 Amendment",
    date: "2024-05-12",
    description: "Changes to discovery protocols in federal cases",
    impact: "High",
    category: "Litigation"
  },
  {
    id: "reg-2",
    title: "Data Privacy Act Revision",
    date: "2024-04-28",
    description: "New requirements for handling client data",
    impact: "Critical",
    category: "Privacy"
  },
  {
    id: "reg-3",
    title: "Corporate Transparency Update",
    date: "2024-03-15",
    description: "Additional disclosure requirements for corporate entities",
    impact: "Medium",
    category: "Corporate"
  },
  {
    id: "reg-4",
    title: "Employment Law Update 2024",
    date: "2024-05-01",
    description: "Changes to workplace regulations affecting contracts",
    impact: "Medium",
    category: "Employment"
  }
];

const COMPLIANCE_HISTORY = [
  {
    id: "check-1",
    title: "Privacy Policy Compliance Check",
    date: "2024-05-10",
    score: 87,
    jurisdiction: "Federal",
    documentType: "Policy",
    issues: 3
  },
  {
    id: "check-2",
    title: "Employment Contract Review",
    date: "2024-05-05",
    score: 75,
    jurisdiction: "State",
    documentType: "Contract",
    issues: 6
  },
  {
    id: "check-3",
    title: "Terms of Service Audit",
    date: "2024-04-28",
    score: 92,
    jurisdiction: "International",
    documentType: "Terms",
    issues: 1
  },
  {
    id: "check-4",
    title: "Data Handling Protocol Assessment",
    date: "2024-04-15",
    score: 84,
    jurisdiction: "Federal",
    documentType: "Protocol",
    issues: 4
  },
  {
    id: "check-5",
    title: "Corporate Bylaw Review",
    date: "2024-04-10",
    score: 95,
    jurisdiction: "State",
    documentType: "Corporate",
    issues: 0
  }
];

const LEGAL_TEMPLATES = [
  {
    id: "template-1",
    title: "GDPR-Compliant Privacy Policy",
    category: "Privacy",
    complianceScore: 98,
    lastUpdated: "2024-05-01"
  },
  {
    id: "template-2",
    title: "Employee Confidentiality Agreement",
    category: "Employment",
    complianceScore: 95,
    lastUpdated: "2024-04-15"
  },
  {
    id: "template-3",
    title: "Website Terms of Service",
    category: "Web",
    complianceScore: 92,
    lastUpdated: "2024-04-22"
  },
  {
    id: "template-4",
    title: "Client Service Agreement",
    category: "Contract",
    complianceScore: 90,
    lastUpdated: "2024-03-30"
  }
];

type ClauseStatus = "good" | "warning" | "critical";

interface RelevantClause {
  section: string;
  content: string;
  status: ClauseStatus;
}

interface ComplianceResult {
  passed: string[];
  warnings: string[];
  failed: string[];
  score: number;
  relevantClauses: RelevantClause[];
  suggestedFixes: string[];
  complianceScore: { category: string; score: number }[];
}

const ComplianceChecker = () => {
  const [text, setText] = useState("");
  const [progress, setProgress] = useState(0);
  const [complianceResults, setComplianceResults] = useState<ComplianceResult | null>(null);
  const [jurisdictionType, setJurisdictionType] = useState("federal");
  const [documentType, setDocumentType] = useState("contract");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAssistLevel, setAiAssistLevel] = useState(70);
  const [activeTab, setActiveTab] = useState("check");
  const [searchTerm, setSearchTerm] = useState("");
  const [regulations, setRegulations] = useState(SAMPLE_REGULATIONS);
  const [complianceHistory, setComplianceHistory] = useState(COMPLIANCE_HISTORY);
  const { toast } = useToast();

  const filteredHistory = complianceHistory.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.documentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.jurisdiction.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const features = [
    {
      icon: Brain,
      title: "AI Legal Analysis",
      description: "Neural network-powered document compliance scanning"
    },
    {
      icon: Shield,
      title: "Risk Assessment",
      description: "Predictive risk analysis and remediation"
    },
    {
      icon: Database,
      title: "Regulatory Database",
      description: "Real-time regulatory updates across jurisdictions"
    },
    {
      icon: Zap,
      title: "Smart Remediation",
      description: "AI-generated fixes for compliance issues"
    }
  ];

  const advancedFeatures = [
    {
      icon: GanttChartSquare,
      title: "Compliance Timeline",
      description: "Historical compliance tracking and forecasting"
    },
    {
      icon: BarChart4,
      title: "Analytics Dashboard",
      description: "Visual data insights for compliance trends"
    },
    {
      icon: Lightbulb,
      title: "Predictive Analysis",
      description: "AI forecasting of regulatory impacts"
    },
    {
      icon: FileText,
      title: "Template Library",
      description: "Pre-approved compliant document templates"
    }
  ];

  useEffect(() => {
    if (!text) {
      setText("This Employment Agreement (\"Agreement\") is entered into as of [Date], by and between [Employer Name], with its principal place of business at [Address] (\"Employer\"), and [Employee Name], residing at [Address] (\"Employee\").\n\nWHEREAS, Employer desires to engage Employee to perform certain services for Employer, and Employee desires to perform such services, on the terms and conditions set forth in this Agreement.\n\nNOW, THEREFORE, in consideration of the mutual covenants and agreements contained herein, the parties agree as follows:");
    }
  }, []);

  const handleCheck = () => {
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter document text to analyze",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    toast({
      title: "Compliance Check Started",
      description: "Analyzing your document with neural network algorithms...",
    });

    setComplianceResults(null);
    
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          
          const results: ComplianceResult = {
            passed: [
              "Document structure requirements",
              "Required legal clauses",
              "Formatting standards",
              "Signature provisions",
              "Title and headings format"
            ],
            warnings: [
              documentType === "contract" ? "Data protection provisions need updating (GDPR)" : "Citation format recommended updates",
              jurisdictionType === "federal" ? "Consider federal regulation updates from 2024" : "Local jurisdiction specifics may vary",
              "Arbitration clause could be strengthened",
              "Consider adding force majeure provisions"
            ],
            failed: text.length < 500 ? ["Insufficient content for comprehensive analysis", "Missing required legal disclaimers"] : [],
            score: text.length < 500 ? 65 : 85,
            relevantClauses: [
              {
                section: "Section 3.2: Data Protection",
                content: "Company shall maintain appropriate safeguards...",
                status: "warning" as ClauseStatus
              },
              {
                section: "Section 5.1: Termination",
                content: "This agreement may be terminated by either party...",
                status: "good" as ClauseStatus
              },
              {
                section: "Section 7: Governing Law",
                content: "This Agreement shall be governed by the laws of...",
                status: "good" as ClauseStatus
              },
              {
                section: "Section 9: Confidentiality",
                content: "Employee agrees to maintain confidentiality...",
                status: text.includes("confidentiality") ? "good" as ClauseStatus : "critical" as ClauseStatus
              }
            ],
            suggestedFixes: [
              "Update data protection clause to reference current regulations",
              "Add specific jurisdiction reference to governing law section",
              "Include more detailed arbitration provisions",
              "Add digital signature compliance statement"
            ],
            complianceScore: [
              { category: "Legal Structure", score: 92 },
              { category: "Regulatory Compliance", score: 78 },
              { category: "Risk Mitigation", score: 85 },
              { category: "Clarity", score: 90 }
            ]
          };
          
          setComplianceResults(results);
          
          const newCheck = {
            id: `check-${complianceHistory.length + 1}`,
            title: documentType === "contract" ? "Employment Contract Review" : 
                  documentType === "pleading" ? "Legal Pleading Assessment" :
                  documentType === "brief" ? "Legal Brief Evaluation" : "Agreement Analysis",
            date: new Date().toISOString().split('T')[0],
            score: results.score,
            jurisdiction: jurisdictionType,
            documentType: documentType,
            issues: results.warnings.length + results.failed.length
          };
          
          setComplianceHistory([newCheck, ...complianceHistory]);
          
          toast({
            title: "Analysis Complete",
            description: `Compliance score: ${results.score}%. AI enhancement level: ${aiAssistLevel}%`,
          });
          
          return 100;
        }
        return prev + 4;
      });
    }, 100);
  };

  return (
    <div className="page-container fade-in">
      <div className="page-header mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl shadow-md animate-pulse">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <h1 className="page-title text-4xl">AVENIX Compliance Engine</h1>
        </div>
        <p className="page-description text-lg">Advanced AI-powered legal compliance analysis and risk mitigation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {features.map((feature, index) => (
          <Card key={index} className="bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all hover:translate-y-[-5px] hover:scale-[1.02] duration-300">
            <CardHeader>
              <div className="rounded-full p-2 bg-gradient-to-br from-primary/20 to-accent/20 w-12 h-12 flex items-center justify-center mb-2">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {advancedFeatures.map((feature, index) => (
          <Card key={index} className="bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all hover:translate-y-[-5px] hover:scale-[1.02] duration-300">
            <CardHeader>
              <div className="rounded-full p-2 bg-gradient-to-br from-primary/20 to-accent/20 w-12 h-12 flex items-center justify-center mb-2">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="glass-morphism rounded-xl p-6 shadow-2xl mb-8 border border-white/50">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/50 p-1 rounded-lg border border-white/60 shadow-md w-full grid grid-cols-3">
            <TabsTrigger 
              value="check"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-accent/20 data-[state=active]:text-primary transition duration-200"
            >
              <FileCheck className="w-4 h-4 mr-2" />
              Document Analysis
            </TabsTrigger>
            <TabsTrigger 
              value="updates"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-accent/20 data-[state=active]:text-primary transition duration-200"
            >
              <Zap className="w-4 h-4 mr-2" />
              Regulatory Updates
            </TabsTrigger>
            <TabsTrigger 
              value="history"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-accent/20 data-[state=active]:text-primary transition duration-200"
            >
              <CheckSquare className="w-4 h-4 mr-2" />
              Compliance History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="check" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 space-y-4">
                <Card className="border-none shadow-lg bg-white/70 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <GanttChartSquare className="h-5 w-5 mr-2 text-primary" />
                      Document Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Jurisdiction</Label>
                      <Select value={jurisdictionType} onValueChange={setJurisdictionType}>
                        <SelectTrigger className="bg-white border border-gray-200">
                          <SelectValue placeholder="Select jurisdiction" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="federal">Federal</SelectItem>
                          <SelectItem value="state">State</SelectItem>
                          <SelectItem value="international">International</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>Document Type</Label>
                      <Select value={documentType} onValueChange={setDocumentType}>
                        <SelectTrigger className="bg-white border border-gray-200">
                          <SelectValue placeholder="Select document type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="pleading">Legal Pleading</SelectItem>
                          <SelectItem value="brief">Legal Brief</SelectItem>
                          <SelectItem value="agreement">Agreement</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>AI Enhancement Level: {aiAssistLevel}%</Label>
                      <Slider 
                        value={[aiAssistLevel]} 
                        onValueChange={(values) => setAiAssistLevel(values[0])} 
                        max={100} 
                        step={1}
                        className="py-2"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Standard</span>
                        <span>Enhanced</span>
                        <span>Quantum</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Button 
                        className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white"
                        onClick={handleCheck}
                        disabled={isAnalyzing || !text.trim()}
                      >
                        {isAnalyzing ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Neural Analysis
                          </>
                        ) : (
                          <>
                            <Shield className="w-4 h-4 mr-2" />
                            Check Compliance
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {LEGAL_TEMPLATES.length > 0 && (
                  <Card className="border-none shadow-lg bg-white/70 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-primary" />
                        Compliant Templates
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {LEGAL_TEMPLATES.map(template => (
                        <div key={template.id} className="flex items-center justify-between p-2 border border-gray-100 rounded-lg hover:bg-blue-50 cursor-pointer transition-all duration-200">
                          <div>
                            <p className="font-medium text-sm">{template.title}</p>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <span className="mr-2">{template.category}</span>
                              <span>Updated: {template.lastUpdated}</span>
                            </div>
                          </div>
                          <div className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600">
                            {template.complianceScore}%
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </div>
              
              <div className="lg:col-span-2">
                <Card className="border-none shadow-lg h-full bg-white/70 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-primary" />
                      Document Content
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Paste your legal document here..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="min-h-[280px] bg-white border border-gray-200 mb-4"
                    />

                    {progress > 0 && (
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span>AI Analysis Progress</span>
                          <span>{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {complianceResults && (
              <div className="space-y-6 mt-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Neural Compliance Report</h3>
                  <div className="flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 px-4 py-2 rounded-full shadow-md">
                    <div className="flex items-center justify-center bg-primary/20 rounded-full w-10 h-10">
                      <span className="font-bold text-primary text-lg">{complianceResults.score}%</span>
                    </div>
                    <span className="text-sm text-neutral-600">Compliance Score</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-gradient-to-br from-green-50/80 to-white/80 border border-green-200 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-green-600 flex items-center text-lg">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Passed
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {complianceResults.passed.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-yellow-50/80 to-white/80 border border-yellow-200 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-yellow-600 flex items-center text-lg">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        Warnings
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {complianceResults.warnings.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className={`bg-gradient-to-br ${complianceResults.failed.length ? 'from-red-50/80 to-white/80 border border-red-200' : 'from-green-50/80 to-white/80 border border-green-200'} shadow-lg hover:shadow-xl transition-all duration-300`}>
                    <CardHeader className="pb-2">
                      <CardTitle className={`${complianceResults.failed.length ? 'text-red-600' : 'text-green-600'} flex items-center text-lg`}>
                        {complianceResults.failed.length ? (
                          <XSquare className="w-5 h-5 mr-2" />
                        ) : (
                          <CheckCircle className="w-5 h-5 mr-2" />
                        )}
                        {complianceResults.failed.length ? 'Failed' : 'No Critical Issues'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {complianceResults.failed.length ? (
                        <ul className="space-y-2">
                          {complianceResults.failed.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <XSquare className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                              <span className="text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-green-600">No critical compliance issues detected</p>
                      )}
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-white/70 backdrop-blur-sm border-none shadow-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-primary" />
                      Clause Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {complianceResults.relevantClauses.map((clause, i) => (
                        <div 
                          key={i} 
                          className={`p-3 rounded-lg border ${
                            clause.status === 'good' ? 'border-green-200 bg-green-50/50' : 
                            clause.status === 'warning' ? 'border-yellow-200 bg-yellow-50/50' : 
                            'border-red-200 bg-red-50/50'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {clause.status === 'good' ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : clause.status === 'warning' ? (
                              <AlertTriangle className="w-4 h-4 text-yellow-500" />
                            ) : (
                              <XSquare className="w-4 h-4 text-red-500" />
                            )}
                            <span className="font-medium text-sm">{clause.section}</span>
                          </div>
                          <p className="text-xs text-gray-600 pl-6">{clause.content}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/70 backdrop-blur-sm border-none shadow-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-primary" />
                      AI-Suggested Improvements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {complianceResults.suggestedFixes.map((fix, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Zap className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <span className="text-sm">{fix}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white/70 backdrop-blur-sm border-none shadow-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <BarChart4 className="w-5 h-5 mr-2 text-primary" />
                      Compliance Score Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {complianceResults.complianceScore.map((score, i) => (
                        <div key={i} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{score.category}</span>
                            <span className="font-medium">{score.score}%</span>
                          </div>
                          <Progress 
                            value={score.score} 
                            className="h-2"
                            indicatorClassName={
                              score.score >= 90 ? "bg-green-500" :
                              score.score >= 75 ? "bg-blue-500" :
                              score.score >= 60 ? "bg-yellow-500" : "bg-red-500"
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-4 mt-6">
                  <Button variant="outline" className="bg-white hover:bg-blue-50">
                    <FileText className="w-4 h-4 mr-2" />
                    Download Full Report
                  </Button>
                  <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white">
                    <Zap className="w-4 h-4 mr-2" />
                    Apply AI Fixes
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="updates" className="animate-fade-in">
            <Card className="bg-white/70 backdrop-blur-sm border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-primary" />
                  Latest Regulatory Updates
                </CardTitle>
                <CardDescription>
                  Stay informed about the latest legal and regulatory changes that might affect your documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {regulations.map(reg => (
                    <div 
                      key={reg.id} 
                      className="p-4 border border-gray-100 rounded-lg hover:border-primary/20 hover:bg-blue-50/30 transition-all cursor-pointer group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold group-hover:text-primary transition-colors">{reg.title}</h4>
                        <div className={`
                          text-xs px-2 py-0.5 rounded-full
                          ${reg.impact === 'Critical' ? 'bg-red-100 text-red-600' : 
                            reg.impact === 'High' ? 'bg-orange-100 text-orange-600' : 
                            'bg-blue-100 text-blue-600'}
                        `}>
                          {reg.impact} Impact
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{reg.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{reg.date}</span>
                          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                          <span>{reg.category}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="text-xs p-1 h-auto">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="animate-fade-in">
            <Card className="bg-white/70 backdrop-blur-sm border-none shadow-lg mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <CheckSquare className="w-5 h-5 mr-2 text-primary" />
                  Compliance Check History
                </CardTitle>
                <CardDescription>
                  Review and track your document compliance history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search compliance history..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-4 bg-white pl-10"
                  />
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                </div>
                
                <div className="space-y-4">
                  {filteredHistory.length === 0 ? (
                    <p className="text-center py-4 text-muted-foreground">No results found</p>
                  ) : (
                    filteredHistory.map((item) => (
                      <div key={item.id} className="bg-white p-4 rounded-lg hover:bg-blue-50/50 transition-colors cursor-pointer group border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium group-hover:text-primary transition-colors">{item.title}</h4>
                            <p className="text-sm text-neutral-600">Checked on {item.date}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className={`
                                text-xs px-2 py-0.5 rounded-full
                                ${item.score >= 90 ? 'bg-green-100 text-green-600' : 
                                  item.score >= 75 ? 'bg-blue-100 text-blue-600' : 
                                  item.score >= 60 ? 'bg-yellow-100 text-yellow-600' : 
                                  'bg-red-100 text-red-600'}
                              `}>
                                {item.score}% Score
                              </div>
                              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">{item.jurisdiction}</span>
                              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">{item.documentType}</span>
                              {item.issues > 0 ? (
                                <span className="text-xs bg-yellow-100 px-2 py-0.5 rounded-full text-yellow-600">{item.issues} issues</span>
                              ) : (
                                <span className="text-xs bg-green-100 px-2 py-0.5 rounded-full text-green-600">No issues</span>
                              )}
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ComplianceChecker;
