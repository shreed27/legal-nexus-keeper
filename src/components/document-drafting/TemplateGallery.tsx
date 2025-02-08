
import { FileText, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

interface TemplateGalleryProps {
  onSelectTemplate: (title: string, prompt: string) => void;
}

const TemplateGallery = ({ onSelectTemplate }: TemplateGalleryProps) => {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [previewContent, setPreviewContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const templates = [
    {
      title: "Service Agreement",
      description: "Standard service contract template",
      preview: "This Service Agreement (the 'Agreement') is entered into as of [DATE] between [SERVICE PROVIDER NAME] ('Provider') and [CLIENT NAME] ('Client')..."
    },
    {
      title: "NDA",
      description: "Non-disclosure agreement template",
      preview: "This Non-Disclosure Agreement ('Agreement') is made between [PARTY A] ('Disclosing Party') and [PARTY B] ('Receiving Party')..."
    },
    {
      title: "Employment Contract",
      description: "Standard employment agreement",
      preview: "This Employment Agreement is made between [EMPLOYER NAME] ('Employer') and [EMPLOYEE NAME] ('Employee')..."
    },
    {
      title: "Terms of Service",
      description: "Website terms of service template",
      preview: "Welcome to [WEBSITE NAME]. By accessing our website, you agree to these terms of service..."
    },
    {
      title: "Privacy Policy",
      description: "Standard privacy policy template",
      preview: "This Privacy Policy describes how [COMPANY NAME] collects, uses, and shares your personal information..."
    },
    {
      title: "Cease & Desist",
      description: "Legal notice template",
      preview: "NOTICE TO CEASE AND DESIST\n\nTo: [RECIPIENT NAME]\nFrom: [SENDER NAME]\n\nRe: Demand to Cease and Desist..."
    },
    {
      title: "Partnership Agreement",
      description: "Business partnership contract",
      preview: "This Partnership Agreement is made between [PARTNER A] and [PARTNER B], collectively referred to as 'Partners'..."
    },
    {
      title: "Real Estate Purchase",
      description: "Property purchase agreement",
      preview: "This Real Estate Purchase Agreement ('Agreement') is made between [SELLER] ('Seller') and [BUYER] ('Buyer')..."
    },
    {
      title: "Intellectual Property License",
      description: "IP licensing agreement",
      preview: "This Intellectual Property License Agreement is made between [LICENSOR] ('Licensor') and [LICENSEE] ('Licensee')..."
    },
    {
      title: "Settlement Agreement",
      description: "Legal dispute settlement",
      preview: "This Settlement Agreement and Release is made between [PARTY A] and [PARTY B] to resolve all claims..."
    },
    {
      title: "Consulting Agreement",
      description: "Professional consulting contract",
      preview: "This Consulting Agreement is entered into by and between [CONSULTANT NAME] and [CLIENT NAME]..."
    },
    {
      title: "Power of Attorney",
      description: "Legal authorization document",
      preview: "KNOW ALL PERSONS BY THESE PRESENTS: That I, [PRINCIPAL NAME], hereby appoint [AGENT NAME] as my Attorney-in-Fact..."
    }
  ];

  const handlePreview = (template: typeof templates[0]) => {
    setSelectedTemplate(template.title);
    setPreviewContent(template.preview);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((template, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer animate-fade-in">
            <CardHeader>
              <CardTitle className="text-lg">{template.title}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1" 
                onClick={() => {
                  onSelectTemplate(template.title.toLowerCase(), `Generate a ${template.title} document`);
                  toast({
                    title: "Template Selected",
                    description: `${template.title} template has been loaded.`,
                  });
                }}
              >
                <FileText className="w-4 h-4 mr-2" />
                Use Template
              </Button>
              <Button
                variant="secondary"
                onClick={() => handlePreview(template)}
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedTemplate} onOpenChange={() => setSelectedTemplate(null)}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>{selectedTemplate} Preview</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col h-full">
            {isEditing ? (
              <Textarea
                value={previewContent}
                onChange={(e) => setPreviewContent(e.target.value)}
                className="flex-1 min-h-[500px] font-mono text-sm"
              />
            ) : (
              <div className="flex-1 overflow-auto whitespace-pre-wrap font-mono text-sm bg-neutral-50 p-4 rounded-lg">
                {previewContent}
              </div>
            )}
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Preview" : "Edit"}
              </Button>
              <Button
                onClick={() => {
                  if (selectedTemplate) {
                    onSelectTemplate(
                      selectedTemplate.toLowerCase(),
                      previewContent
                    );
                    setSelectedTemplate(null);
                    toast({
                      title: "Template Selected",
                      description: `${selectedTemplate} template has been loaded with your edits.`,
                    });
                  }
                }}
              >
                Use Template
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TemplateGallery;
