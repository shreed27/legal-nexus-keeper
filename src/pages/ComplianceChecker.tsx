import { useState } from "react";
import { Shield, CheckCircle, AlertTriangle, FileCheck, Scale, Book, ChevronRight } from "lucide-react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "../hooks/use-mobile";

const ComplianceChecker = () => {
  const [text, setText] = useState("");
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  const isMobile = useIsMobile();

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
    toast({
      title: "Compliance Check Started",
      description: "Analyzing your document for compliance...",
    });

    // Simulate progress
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
      <Sidebar />
      <Header />
      
      <main className={`transition-all duration-300 ${isMobile ? 'ml-0 px-4' : 'ml-64 px-8'} pt-20`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-neutral-dark">AI Compliance Checker</h1>
              <p className="text-neutral-600 mt-1">Ensure legal compliance with AI-powered analysis</p>
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
            <Tabs defaultValue="check" className="space-y-6">
              <TabsList className="grid grid-cols-2 w-[400px]">
                <TabsTrigger value="check">Document Check</TabsTrigger>
                <TabsTrigger value="history">Check History</TabsTrigger>
              </TabsList>

              <TabsContent value="check">
                <div className="space-y-6">
                  <div>
                    <label className="text-lg font-semibold mb-2 block">Document Content</label>
                    <Textarea
                      placeholder="Paste your legal document here..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="min-h-[200px]"
                    />
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={handleCheck}
                    disabled={!text.trim()}
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Check Compliance
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

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      Compliance Report
                    </h3>
                    <div className="space-y-2">
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="font-medium">GDPR Compliance</span>
                        </div>
                      </div>
                      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-500" />
                          <span className="font-medium">Data Protection Review Needed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="history">
                <div className="space-y-4">
                  <div className="bg-neutral-50 p-4 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer group">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Privacy Policy Check</h4>
                        <p className="text-sm text-neutral-600">Checked on March 15, 2024</p>
                      </div>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ComplianceChecker;
