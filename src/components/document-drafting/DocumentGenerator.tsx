
import { useState } from "react";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import DocumentPreview from "./DocumentPreview";

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
    
    // Simulate AI generation - in a real app, this would call an API
    setTimeout(() => {
      let demoContent = prompt;
      
      // If no custom prompt is provided, generate a sample document
      if (!prompt.trim()) {
        demoContent = `AGREEMENT made this ${new Date().toLocaleDateString()}\n\n`;
        demoContent += `This ${documentType.toLowerCase()} ("Agreement") is entered into between [PARTY A] and [PARTY B]...\n\n`;
        demoContent += `WHEREAS, the parties wish to enter into this Agreement for the purpose of [PURPOSE];\n\n`;
        demoContent += `NOW, THEREFORE, in consideration of the mutual covenants contained herein, the parties agree as follows:\n\n`;
        demoContent += `1. Definitions\n`;
        demoContent += `2. Term and Termination\n`;
        demoContent += `3. Rights and Obligations\n`;
        demoContent += `4. Compensation\n`;
        demoContent += `5. Confidentiality\n`;
        demoContent += `6. Governing Law\n`;
        demoContent += `7. Entire Agreement\n\n`;
        demoContent += `IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first above written.\n\n`;
        demoContent += `[PARTY A]\n___________________\n\n`;
        demoContent += `[PARTY B]\n___________________`;
      }
      
      setGeneratedContent(demoContent);

      // Save the generated document
      const newDocument = {
        id: crypto.randomUUID(),
        title: `${documentType.charAt(0).toUpperCase() + documentType.slice(1)} - Draft`,
        content: demoContent,
        timestamp: new Date().toISOString(),
        type: documentType,
      };

      const existingDocs = JSON.parse(localStorage.getItem('generatedDocuments') || '[]');
      localStorage.setItem('generatedDocuments', JSON.stringify([newDocument, ...existingDocs]));
      
      // Trigger storage event for RecentDocuments to update
      window.dispatchEvent(new Event('storage'));
      
      toast({
        title: "Document Generated Successfully",
        description: "Your document has been saved and is ready for use.",
      });
    }, 2000);
  };

  // Update prompt when called from TemplateGallery
  useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const templateContent = urlParams.get('template');
    if (templateContent) {
      setPrompt(decodeURIComponent(templateContent));
      // Clean up the URL
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  return (
    <div id="document-generator" className="space-y-6">
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
                <SelectItem value="pleading">Legal Pleading</SelectItem>
                <SelectItem value="affidavit">Affidavit</SelectItem>
                <SelectItem value="settlement">Settlement Agreement</SelectItem>
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
                <SelectItem value="conciliatory">Conciliatory</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <Label>Document Requirements or Template Content</Label>
          <Textarea
            placeholder="Enter your document requirements or paste template content here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[200px]"
          />
        </div>
      </div>
      
      <Button 
        className="w-full"
        onClick={handleDraft}
      >
        <FileText className="w-4 h-4 mr-2" />
        Generate Document
      </Button>

      {generatedContent && (
        <DocumentPreview content={generatedContent} />
      )}
    </div>
  );
};

export default DocumentGenerator;
