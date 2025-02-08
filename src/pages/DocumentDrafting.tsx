import { Brain, PenTool, SpellCheck, LayoutTemplate, Rocket } from "lucide-react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FeatureCard from "@/components/document-drafting/FeatureCard";
import DocumentGenerator from "@/components/document-drafting/DocumentGenerator";
import TemplateGallery from "@/components/document-drafting/TemplateGallery";
import RecentDocuments from "@/components/document-drafting/RecentDocuments";
import { useState } from "react";
import { useIsMobile } from "../hooks/use-mobile";

const DocumentDrafting = () => {
  const [activeTab, setActiveTab] = useState("generate");
  const isMobile = useIsMobile();
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
      
      <main className={`transition-all duration-300 ${isMobile ? 'ml-0 px-4' : 'ml-64 px-8'} pt-20`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-xl">
              <PenTool className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-neutral-dark">AI Document Drafting</h1>
              <p className="text-neutral-600 mt-1 text-sm md:text-base">Create professional legal documents in minutes</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="glass-card p-4 hover:scale-102 transition-all duration-300 rounded-xl"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm gradient-text">{feature.title}</h3>
                </div>
                <p className="text-xs text-neutral-600">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="glass-card rounded-xl p-4 md:p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="w-full md:w-[400px] grid grid-cols-2">
                <TabsTrigger value="generate">Generate Document</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
              </TabsList>

              <TabsContent value="generate">
                <DocumentGenerator />
              </TabsContent>

              <TabsContent value="templates">
                <TemplateGallery 
                  onSelectTemplate={(title, prompt) => {
                    setActiveTab("generate");
                  }} 
                />
              </TabsContent>
            </Tabs>

            <RecentDocuments />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DocumentDrafting;
