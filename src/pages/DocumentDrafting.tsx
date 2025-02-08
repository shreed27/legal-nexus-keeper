
import { useState } from "react";
import { FileText } from "lucide-react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const DocumentDrafting = () => {
  const [prompt, setPrompt] = useState("");
  const { toast } = useToast();

  const handleDraft = () => {
    toast({
      title: "Document Generation Started",
      description: "Your document is being generated...",
    });
  };

  return (
    <div className="min-h-screen bg-neutral-light">
      <Sidebar />
      <Header />
      
      <main className="ml-64 pt-20 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <FileText className="h-8 w-8" />
            <h1 className="text-3xl font-bold text-neutral-dark">AI Document Drafting</h1>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Create Legal Documents</h2>
              <p className="text-neutral-600">
                Describe the document you need, and our AI will help draft it for you.
              </p>
            </div>

            <div className="space-y-4">
              <Textarea
                placeholder="Describe the document you need (e.g., 'Draft a cease and desist letter for unauthorized use of intellectual property...')"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[200px]"
              />
              
              <Button 
                className="w-full"
                onClick={handleDraft}
                disabled={!prompt.trim()}
              >
                <FileText className="w-4 h-4 mr-2" />
                Generate Document
              </Button>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Recent Drafts</h3>
              <p className="text-sm text-neutral-600">
                Your recent document drafts will appear here
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DocumentDrafting;
