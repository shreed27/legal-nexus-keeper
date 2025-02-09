
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search } from "lucide-react";
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
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";

const Cases = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewCaseDialog, setShowNewCaseDialog] = useState(false);
  const [cases, setCases] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    checkAuth();
    fetchCases();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/auth');
    }
  };

  const fetchCases = async () => {
    try {
      const { data: casesData, error: casesError } = await supabase
        .from('cases')
        .select(`
          *,
          hearings (*)
        `)
        .order('created_at', { ascending: false });

      if (casesError) throw casesError;

      setCases(casesData || []);
    } catch (error) {
      console.error('Error fetching cases:', error);
      toast({
        title: "Error",
        description: "Failed to load cases. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCase = async (newCase: Omit<Case, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'hearings'>) => {
    try {
      const { data, error } = await supabase
        .from('cases')
        .insert([newCase])
        .select()
        .single();

      if (error) throw error;

      setCases([{ ...data, hearings: [] }, ...cases]);
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

  const handleCaseClick = (caseData: Case) => {
    navigate(`/cases/${caseData.id}`);
  };

  const filteredCases = cases.filter(
    (case_) =>
      case_.party_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      case_.case_number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-light">
        <Sidebar />
        <Header />
        <main className={`transition-all duration-300 ${isMobile ? 'ml-0 px-4' : 'ml-64 px-8'} pt-20`}>
          <div className="flex items-center justify-center h-[60vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-light">
      <Sidebar />
      <Header />
      
      <main className={`transition-all duration-300 ${isMobile ? 'ml-0 px-4' : 'ml-64 px-8'} pt-20`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-dark">Cases</h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search cases..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 w-full bg-white/80 backdrop-blur-sm"
                />
              </div>
              <Button 
                onClick={() => setShowNewCaseDialog(true)}
                className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:opacity-90"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                New Case
              </Button>
            </div>
          </div>

          <div className="glass-card rounded-xl overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Party Name</TableHead>
                  <TableHead className="font-semibold">Case No.</TableHead>
                  <TableHead className="font-semibold">Court</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCases.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8 text-neutral-600">
                      No cases found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCases.map((case_) => (
                    <TableRow 
                      key={case_.id}
                      className="cursor-pointer hover:bg-white/50 transition-colors"
                      onClick={() => handleCaseClick(case_)}
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
        </div>
      </main>

      <NewCaseDialog 
        open={showNewCaseDialog}
        onOpenChange={setShowNewCaseDialog}
        onSuccess={handleAddCase}
      />
    </div>
  );
};

export default Cases;
