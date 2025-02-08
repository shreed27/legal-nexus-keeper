
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface TemplateGalleryProps {
  onSelectTemplate: (title: string, prompt: string) => void;
}

const TemplateGallery = ({ onSelectTemplate }: TemplateGalleryProps) => {
  const { toast } = useToast();

  const templates = [
    { title: "Service Agreement", description: "Standard service contract template" },
    { title: "NDA", description: "Non-disclosure agreement template" },
    { title: "Employment Contract", description: "Standard employment agreement" },
    { title: "Terms of Service", description: "Website terms of service template" },
    { title: "Privacy Policy", description: "Standard privacy policy template" },
    { title: "Cease & Desist", description: "Legal notice template" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {templates.map((template, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="text-lg">{template.title}</CardTitle>
            <CardDescription>{template.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full" 
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
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TemplateGallery;
