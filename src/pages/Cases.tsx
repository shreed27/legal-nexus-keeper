
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, Scale } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NewCaseDialog } from "@/components/cases/NewCaseDialog";
import { Case } from "@/types/case";

const Cases = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewCaseDialog, setShowNewCaseDialog] = useState(false);
  const [cases, setCases] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load cases from localStorage
    const storedCases = JSON.parse(localStorage.getItem('cases') || '[]');
    setCases(storedCases);
    setIsLoading(false);
  }, []);

  const handleAddCase = async (newCase: Omit<Case, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'hearings'>) => {
    try {
      const caseToAdd = {
        ...newCase,
        id: crypto.randomUUID(),
        user_id: 'demo-user',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        hearings: []
      };

      setCases(prevCases => [caseToAdd, ...prevCases]);
      
      // Save to localStorage
      const updatedCases = [caseToAdd, ...cases];
      localStorage.setItem('cases', JSON.stringify(updatedCases));

      toast({
        title: "Success",
        description: "New case has been registered successfully",
      });
    } catch (error) {
      console.error('Error adding case:', error);
      toast({
        title: "Error",
        description: "Failed to add case. Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredCases = cases.filter(
    (case_) =>
      case_.party_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      case_.case_number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="page-container fade-in">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl shadow-md">
            <Scale className="h-6 w-6 text-primary" />
          </div>
          <h1 className="page-title">Cases</h1>
        </div>
        <p className="page-description">Manage your legal cases and court hearings</p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search cases..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-full bg-white/80 backdrop-blur-sm"
          />
        </div>
        <Button 
          onClick={() => setShowNewCaseDialog(true)}
          className="w-full md:w-auto bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          New Case
        </Button>
      </div>

      <div className="glass-card rounded-xl overflow-hidden shadow-xl border border-white/60">
        <Table>
          <TableHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-semibold text-neutral-700">Party Name</TableHead>
              <TableHead className="font-semibold text-neutral-700">Case No.</TableHead>
              <TableHead className="font-semibold text-neutral-700">Court</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCases.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-12 text-neutral-600">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <Scale className="h-10 w-10 text-neutral-400" />
                    <p className="text-lg font-medium">No cases found</p>
                    <p className="text-sm text-neutral-500">Create your first case by clicking the "New Case" button</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredCases.map((case_) => (
                <TableRow 
                  key={case_.id}
                  className="cursor-pointer transition-colors hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5"
                >
                  <TableCell className="font-medium">{case_.party_name}</TableCell>
                  <TableCell>{case_.case_number}</TableCell>
                  <TableCell>{case_.court_name}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <NewCaseDialog 
        open={showNewCaseDialog}
        onOpenChange={setShowNewCaseDialog}
        onSuccess={handleAddCase}
      />
    </div>
  );
};

export default Cases;
