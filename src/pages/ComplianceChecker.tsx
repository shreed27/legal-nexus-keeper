
import { useState } from "react";
import { Shield } from "lucide-react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ComplianceChecker = () => {
  const [text, setText] = useState("");
  const { toast } = useToast();

  const handleCheck = () => {
    toast({
      title: "Compliance Check Started",
      description: "Your document is being analyzed...",
    });
  };

  return (
    <div className="min-h-screen bg-neutral-light">
      <Sidebar />
      <Header />
      
      <main className="ml-64 pt-20 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Shield className="h-8 w-8" />
            <h1 className="text-3xl font-bold text-neutral-dark">🛡️ Compliance Checker</h1>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Verify Legal Compliance</h2>
              <p className="text-neutral-600">
                Paste your legal document to check for compliance with relevant regulations and guidelines.
              </p>
            </div>

            <div className="space-y-4">
              <Textarea
                placeholder="Paste your legal document here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[200px]"
              />
              
              <Button 
                className="w-full"
                onClick={handleCheck}
                disabled={!text.trim()}
              >
                <Shield className="w-4 h-4 mr-2" />
                Check Compliance
              </Button>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Compliance Report</h3>
              <p className="text-sm text-neutral-600">
                Your compliance analysis will appear here
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ComplianceChecker;
