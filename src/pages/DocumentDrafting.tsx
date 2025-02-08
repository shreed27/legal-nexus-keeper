import { Brain, PenTool, SpellCheck, LayoutTemplate, Rocket } from "lucide-react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FeatureCard from "@/components/document-drafting/FeatureCard";
import DocumentGenerator from "@/components/document-drafting/DocumentGenerator";
import TemplateGallery from "@/components/document-drafting/TemplateGallery";
import RecentDocuments from "@/components/document-drafting/RecentDocuments";

const DocumentDrafting = () => {
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
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <Tabs defaultValue="generate" className="space-y-6">
              <TabsList className="grid grid-cols-2 w-[400px]">
                <TabsTrigger value="generate">Generate Document</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
              </TabsList>

              <TabsContent value="generate">
                <DocumentGenerator />
              </TabsContent>

              <TabsContent value="templates">
                <TemplateGallery 
                  onSelectTemplate={(title, prompt) => {
                    // Handle template selection if needed
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
