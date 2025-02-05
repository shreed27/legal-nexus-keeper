import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NewCaseDialog } from "@/components/cases/NewCaseDialog";

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
  const [selectedParty, setSelectedParty] = useState<string | null>(null);
  const [showPartyStats, setShowPartyStats] = useState(false);
  const [showNewCaseDialog, setShowNewCaseDialog] = useState(false);
  const [cases, setCases] = useState<Case[]>([]);

  const handleDelete = (id: string) => {
    setCases(cases.filter(case_ => case_.id !== id));
    toast({
      title: "Case deleted",
      description: "The case has been successfully deleted.",
    });
  };

  const handleAddCase = (newCase: Case) => {
    setCases([newCase, ...cases]);
  };

  const filteredCases = cases.filter(
    (case_) =>
      case_.party_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      case_.case_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      case_.court_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPartyStats = (partyName: string) => {
    const partyCases = cases.filter((case_) => case_.party_name === partyName);
    return {
      totalCases: partyCases.length,
      totalAmount: partyCases.reduce((sum, case_) => sum + case_.amount_charged, 0),
      totalHearings: partyCases.reduce((sum, case_) => sum + case_.hearings_count, 0),
    };
  };

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

          <div className="bg-white rounded-lg shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Party Name</TableHead>
                  <TableHead>Court</TableHead>
                  <TableHead>Case No.</TableHead>
                  <TableHead>Previous Date</TableHead>
                  <TableHead>Next Date</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCases.map((case_) => (
                  <TableRow key={case_.id}>
                    <TableCell>
                      <button
                        onClick={() => {
                          setSelectedParty(case_.party_name);
                          setShowPartyStats(true);
                        }}
                        className="text-primary hover:underline"
                      >
                        {case_.party_name}
                      </button>
                    </TableCell>
                    <TableCell>{case_.court_name}</TableCell>
                    <TableCell>{case_.case_number}</TableCell>
                    <TableCell>{case_.previous_date}</TableCell>
                    <TableCell>{case_.next_date}</TableCell>
                    <TableCell>{case_.stage}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(case_.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>

      <Dialog open={showPartyStats} onOpenChange={setShowPartyStats}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Party Statistics</DialogTitle>
          </DialogHeader>
          {selectedParty && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{selectedParty}</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Cases</p>
                  <p className="text-2xl font-bold">{getPartyStats(selectedParty).totalCases}</p>
                </div>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-2xl font-bold">₹{getPartyStats(selectedParty).totalAmount}</p>
                </div>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Hearings</p>
                  <p className="text-2xl font-bold">{getPartyStats(selectedParty).totalHearings}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <NewCaseDialog 
        open={showNewCaseDialog}
        onOpenChange={setShowNewCaseDialog}
        onSuccess={handleAddCase}
      />
    </div>
  );
};

export default Cases;