
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import TemplateGallery from "@/components/document-drafting/TemplateGallery";
import DocumentGenerator from "@/components/document-drafting/DocumentGenerator";
import RecentDocuments from "@/components/document-drafting/RecentDocuments";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileEdit, Template, FileText } from "lucide-react";

const DocumentDrafting = () => {
  const [activeTab, setActiveTab] = useState("templates");
  const { toast } = useToast();

  const handleTemplateSelect = (title: string, prompt: string) => {
    setActiveTab("generate");
    toast({
      title: "Template Selected",
      description: `Loading the ${title} template...`,
    });
  };

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl shadow-md">
            <FileEdit className="h-6 w-6 text-primary" />
          </div>
          <h1 className="page-title">Document Drafting</h1>
        </div>
        <p className="page-description">Create and edit legal documents with AI assistance</p>
      </div>

      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="space-y-8"
      >
        <TabsList className="bg-white/50 p-1 rounded-lg border border-white/60 shadow-md">
          <TabsTrigger 
            value="templates"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-accent/20 data-[state=active]:text-primary"
          >
            <Template className="w-4 h-4 mr-2" />
            Templates
          </TabsTrigger>
          <TabsTrigger 
            value="generate"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-accent/20 data-[state=active]:text-primary"
          >
            <FileText className="w-4 h-4 mr-2" />
            Generate
          </TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-8 animate-fade-in">
          <TemplateGallery onSelectTemplate={handleTemplateSelect} />
          <RecentDocuments />
        </TabsContent>

        <TabsContent value="generate" className="animate-fade-in">
          <DocumentGenerator />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DocumentDrafting;
