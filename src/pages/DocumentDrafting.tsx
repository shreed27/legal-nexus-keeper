
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import TemplateGallery from "@/components/document-drafting/TemplateGallery";
import DocumentGenerator from "@/components/document-drafting/DocumentGenerator";
import RecentDocuments from "@/components/document-drafting/RecentDocuments";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    <div className="max-w-7xl mx-auto fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Document Drafting</h1>
        <p className="text-gray-600">Create and edit legal documents with AI assistance</p>
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
