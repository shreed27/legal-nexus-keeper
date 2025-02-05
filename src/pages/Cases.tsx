import { useState } from "react";
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
import { CaseDetailDialog } from "@/components/cases/CaseDetailDialog";

interface Case {
  id: string;
  case_number: string;
  party_name: string;
  court_name: string;
  previous_date: string;
  next_date: string;
  stage: string;
  amount_charged: number;
  hearings_count: number;
}

const Cases = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewCaseDialog, setShowNewCaseDialog] = useState(false);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [cases, setCases] = useState<Case[]>([]);

  const handleAddCase = (newCase: Case) => {
    setCases([newCase, ...cases]);
    toast({
      title: "Success",
      description: "New case has been registered successfully",
    });
  };

  const handleCaseClick = (caseData: Case) => {
    setSelectedCase(caseData);
    setShowDetailDialog(true);
  };

  const filteredCases = cases.filter(
    (case_) =>
      case_.party_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      case_.case_number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-neutral-light">
      <Sidebar />
      <Header />
      
      <main className="ml-64 pt-20 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-neutral-dark">Cases</h1>
            <div className="flex gap-4">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search cases..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Button onClick={() => setShowNewCaseDialog(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Case
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Party Name</TableHead>
                  <TableHead>Case No.</TableHead>
                  <TableHead>Court</TableHead>
                  <TableHead>Next Date</TableHead>
                  <TableHead>Stage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCases.map((case_) => (
                  <TableRow 
                    key={case_.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleCaseClick(case_)}
                  >
                    <TableCell className="font-medium">{case_.party_name}</TableCell>
                    <TableCell>{case_.case_number}</TableCell>
                    <TableCell>{case_.court_name}</TableCell>
                    <TableCell>{case_.next_date}</TableCell>
                    <TableCell>{case_.stage}</TableCell>
                  </TableRow>
                ))}
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

      <CaseDetailDialog
        open={showDetailDialog}
        onOpenChange={setShowDetailDialog}
        caseData={selectedCase}
      />
    </div>
  );
};

export default Cases;