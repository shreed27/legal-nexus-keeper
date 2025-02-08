
import { useState } from "react";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DocumentPreview from "./DocumentPreview";
import { useToast } from "@/hooks/use-toast";

const DocumentGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [documentType, setDocumentType] = useState("contract");
  const [tone, setTone] = useState("professional");
  const [generatedContent, setGeneratedContent] = useState("");
  const { toast } = useToast();

  const handleDraft = () => {
    toast({
      title: "Starting Document Generation",
      description: "Our AI is crafting your document...",
    });
    
    // Simulate AI generation
    setTimeout(() => {
      const demoContent = `AGREEMENT made this ${new Date().toLocaleDateString()}\n\nThis agreement ("Agreement") is entered into between Party A and Party B...\n\nTerms and Conditions:\n1. Services\n2. Payment\n3. Term`;
      setGeneratedContent(demoContent);
      
      toast({
        title: "Document Generated Successfully",
        description: "Your document is ready for review and editing.",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

      {generatedContent && <DocumentPreview content={generatedContent} />}
    </div>
  );
};

export default DocumentGenerator;
