
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import TemplateGallery from "@/components/document-drafting/TemplateGallery";
import DocumentGenerator from "@/components/document-drafting/DocumentGenerator";
import RecentDocuments from "@/components/document-drafting/RecentDocuments";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileEdit } from "lucide-react";

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
    <div className="fade-in">
      <div className="page-header">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FileEdit className="h-6 w-6 text-primary" />
          </div>
          <h1 className="page-title">Document Drafting</h1>
        </div>
        <p className="page-description">Create and edit legal documents with AI assistance</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="generate">Generate</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-8">
          <TemplateGallery onSelectTemplate={handleTemplateSelect} />
          <RecentDocuments />
        </TabsContent>

        <TabsContent value="generate">
          <DocumentGenerator />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DocumentDrafting;
