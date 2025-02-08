
import { useState } from "react";
import { FileText, PenTool, SpellCheck, TextQuote, LayoutTemplate, Rocket, Award, Brain } from "lucide-react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const DocumentDrafting = () => {
  const [prompt, setPrompt] = useState("");
  const [documentType, setDocumentType] = useState("contract");
  const [tone, setTone] = useState("professional");
  const { toast } = useToast();

  const handleDraft = () => {
    toast({
      title: "Starting Document Generation",
      description: "Our AI is crafting your document...",
    });
  };

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Drafting",
      description: "Advanced language models craft precise legal documents"
    },
    {
      icon: SpellCheck,
      title: "Legal Proofreading",
      description: "Automatic review for legal accuracy and compliance"
    },
    {
      icon: LayoutTemplate,
      title: "Smart Templates",
      description: "Industry-standard templates for various document types"
    },
    {
      icon: Rocket,
      title: "Quick Generation",
      description: "Generate documents in minutes, not hours"
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-light">
      <Sidebar />
      <Header />
      
      <main className="ml-64 pt-20 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-primary/10 rounded-xl">
              <PenTool className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-neutral-dark">AI Document Drafting</h1>
              <p className="text-neutral-600 mt-1">Create professional legal documents in minutes</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <Tabs defaultValue="generate" className="space-y-6">
              <TabsList className="grid grid-cols-2 w-[400px]">
                <TabsTrigger value="generate">Generate Document</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
              </TabsList>

              <TabsContent value="generate" className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Document Type</Label>
                      <Select value={documentType} onValueChange={setDocumentType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select document type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="contract">Contract Agreement</SelectItem>
                          <SelectItem value="letter">Legal Letter</SelectItem>
                          <SelectItem value="motion">Court Motion</SelectItem>
                          <SelectItem value="brief">Legal Brief</SelectItem>
                          <SelectItem value="memo">Legal Memorandum</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Tone & Style</Label>
                      <Select value={tone} onValueChange={setTone}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select tone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="formal">Highly Formal</SelectItem>
                          <SelectItem value="simplified">Plain Language</SelectItem>
                          <SelectItem value="assertive">Assertive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Document Requirements</Label>
                    <Textarea
                      placeholder="Describe your document requirements (e.g., 'Draft a service agreement between a software company and a client for a 12-month contract...')"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="min-h-[200px]"
                    />
                  </div>
                </div>
                
                <Button 
                  className="w-full"
                  onClick={handleDraft}
                  disabled={!prompt.trim()}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Document
                </Button>
              </TabsContent>

              <TabsContent value="templates" className="grid grid-cols-3 gap-4">
                {[
                  { title: "Service Agreement", description: "Standard service contract template" },
                  { title: "NDA", description: "Non-disclosure agreement template" },
                  { title: "Employment Contract", description: "Standard employment agreement" },
                  { title: "Terms of Service", description: "Website terms of service template" },
                  { title: "Privacy Policy", description: "Standard privacy policy template" },
                  { title: "Cease & Desist", description: "Legal notice template" }
                ].map((template, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-lg">{template.title}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        <FileText className="w-4 h-4 mr-2" />
                        Use Template
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>

            <div className="mt-8 pt-8 border-t">
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">Recent Documents</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Service Agreement - Draft", date: "2 hours ago" },
                  { title: "Employment Contract", date: "Yesterday" },
                ].map((doc, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base">{doc.title}</CardTitle>
                          <CardDescription>{doc.date}</CardDescription>
                        </div>
                        <Button variant="ghost" size="icon">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DocumentDrafting;
