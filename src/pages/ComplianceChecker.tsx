
import { useState } from "react";
import { Shield, CheckCircle, AlertTriangle, FileCheck, Scale, Book, ChevronRight, RefreshCw, CheckSquare, XSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const ComplianceChecker = () => {
  const [text, setText] = useState("");
  const [progress, setProgress] = useState(0);
  const [complianceResults, setComplianceResults] = useState<null | {
    passed: string[];
    warnings: string[];
    failed: string[];
    score: number;
  }>(null);
  const [jurisdictionType, setJurisdictionType] = useState("federal");
  const [documentType, setDocumentType] = useState("contract");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const features = [
    {
      icon: FileCheck,
      title: "Document Analysis",
      description: "Advanced scanning of legal documents"
    },
    {
      icon: Scale,
      title: "Regulatory Compliance",
      description: "Check against latest regulations"
    },
    {
      icon: Book,
      title: "Legal Framework",
      description: "Updated legal requirements database"
    },
    {
      icon: Shield,
      title: "Risk Assessment",
      description: "Identify potential compliance risks"
    }
  ];

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
      description: "Analyzing your document for compliance...",
    });

    // Reset previous results
    setComplianceResults(null);
    
    // Simulate progress
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          
          // Simulate compliance results based on document type and jurisdiction
          const results = {
            passed: [
              "Document structure requirements",
              "Required legal clauses",
              "Formatting standards"
            ],
            warnings: [
              documentType === "contract" ? "Data protection review needed" : "Citation format review recommended",
              jurisdictionType === "federal" ? "Consider federal regulation updates from 2024" : "Local jurisdiction specifics may vary"
            ],
            failed: text.length < 100 ? ["Insufficient content for comprehensive analysis"] : [],
            score: text.length < 100 ? 65 : 85
          };
          
          setComplianceResults(results);
          
          toast({
            title: "Analysis Complete",
            description: `Compliance score: ${results.score}%`,
          });
          
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl shadow-md">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <h1 className="page-title">AI Compliance Checker</h1>
        </div>
        <p className="page-description">Ensure legal compliance with AI-powered analysis</p>
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
        <Tabs defaultValue="check" className="space-y-6">
          <TabsList className="bg-white/50 p-1 rounded-lg border border-white/60 shadow-md">
            <TabsTrigger 
              value="check"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-accent/20 data-[state=active]:text-primary"
            >
              <FileCheck className="w-4 h-4 mr-2" />
              Document Check
            </TabsTrigger>
            <TabsTrigger 
              value="history"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-accent/20 data-[state=active]:text-primary"
            >
              <CheckSquare className="w-4 h-4 mr-2" />
              Check History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="check" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label>Jurisdiction</Label>
                  <Select value={jurisdictionType} onValueChange={setJurisdictionType}>
                    <SelectTrigger className="bg-white">
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
                    <SelectTrigger className="bg-white">
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
              </div>
              
              <div>
                <Label className="text-lg font-semibold">Document Content</Label>
                <Textarea
                  placeholder="Paste your legal document here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[180px] bg-white"
                />
              </div>
            </div>
            
            <Button 
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white"
              onClick={handleCheck}
              disabled={isAnalyzing || !text.trim()}
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 mr-2" />
                  Check Compliance
                </>
              )}
            </Button>

            {progress > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Analysis Progress</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            {complianceResults && (
              <div className="space-y-6 mt-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Compliance Report</h3>
                  <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                    <span className="font-bold text-primary text-lg">{complianceResults.score}%</span>
                    <span className="text-sm text-neutral-500">Compliance Score</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Passed Items */}
                  <Card className="bg-green-50/80 border border-green-200">
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
                  
                  {/* Warning Items */}
                  <Card className="bg-yellow-50/80 border border-yellow-200">
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
                  
                  {/* Failed Items */}
                  <Card className={`${complianceResults.failed.length ? 'bg-red-50/80 border border-red-200' : 'bg-green-50/80 border border-green-200'}`}>
                    <CardHeader className="pb-2">
                      <CardTitle className={`${complianceResults.failed.length ? 'text-red-600' : 'text-green-600'} flex items-center text-lg`}>
                        {complianceResults.failed.length ? (
                          <XSquare className="w-5 h-5 mr-2" />
                        ) : (
                          <CheckCircle className="w-5 h-5 mr-2" />
                        )}
                        {complianceResults.failed.length ? 'Failed' : 'No Issues'}
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
                        <p className="text-sm text-green-600">No compliance issues detected</p>
                      )}
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-4">
                  <Button variant="outline" className="bg-white hover:bg-blue-50">
                    Download Full Report
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="history">
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer group border border-neutral-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Privacy Policy Check</h4>
                    <p className="text-sm text-neutral-600">Checked on March 15, 2024</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-600">87% Score</div>
                      <span className="text-xs text-neutral-500">Federal</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer group border border-neutral-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Employment Contract Review</h4>
                    <p className="text-sm text-neutral-600">Checked on March 10, 2024</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-600">75% Score</div>
                      <span className="text-xs text-neutral-500">State</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer group border border-neutral-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Terms of Service Audit</h4>
                    <p className="text-sm text-neutral-600">Checked on March 5, 2024</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-600">92% Score</div>
                      <span className="text-xs text-neutral-500">International</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ComplianceChecker;
