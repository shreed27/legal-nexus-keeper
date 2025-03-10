
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ChartContainer, ChartLegend, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { ArrowLeft, CalendarDays, Gavel, Clock, Trash2, FileText } from "lucide-react";
import { CaseHearing } from "@/components/cases/CaseHearing";
import { CaseTimeline } from "@/components/cases/CaseTimeline";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Hearing {
  date: string;
  summary: string;
  stage: string;
  amount: number;
}

const CaseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [caseData, setCaseData] = useState<any>(null);
  const [newHearing, setNewHearing] = useState<Hearing>({
    date: "",
    summary: "",
    stage: "",
    amount: 0,
  });

  useEffect(() => {
    const storedCases = JSON.parse(localStorage.getItem('cases') || '[]');
    const currentCase = storedCases.find((c: any) => c.id === id);
    if (currentCase) {
      setCaseData(currentCase);
    } else {
      navigate('/cases');
    }
  }, [id, navigate]);

  const handleAddHearing = () => {
    if (!newHearing.date || !newHearing.summary || !newHearing.stage || !newHearing.amount) {
      toast({
        title: "Error",
        description: "Please fill all hearing details",
        variant: "destructive",
      });
      return;
    }

    const updatedCase = {
      ...caseData,
      hearings: [...(caseData.hearings || []), newHearing],
    };

    const storedCases = JSON.parse(localStorage.getItem('cases') || '[]');
    const updatedCases = storedCases.map((c: any) => 
      c.id === id ? updatedCase : c
    );

    localStorage.setItem('cases', JSON.stringify(updatedCases));
    setCaseData(updatedCase);
    setNewHearing({
      date: "",
      summary: "",
      stage: "",
      amount: 0,
    });
    toast({
      title: "Success",
      description: "Hearing details added successfully",
    });
  };

  const handleDeleteCase = () => {
    const storedCases = JSON.parse(localStorage.getItem('cases') || '[]');
    const updatedCases = storedCases.filter((c: any) => c.id !== id);
    localStorage.setItem('cases', JSON.stringify(updatedCases));
    toast({
      title: "Success",
      description: "Case deleted successfully",
    });
    navigate('/cases');
  };

  if (!caseData) return null;

  const chartData = (caseData.hearings || []).map((hearing: Hearing) => ({
    date: hearing.date,
    amount: hearing.amount,
  }));

  const chartConfig = {
    amount: {
      label: "Amount per Hearing",
      theme: {
        light: "#4f46e5",
        dark: "#818cf8",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
      <main className="ml-64 pt-20 p-8">
        <div className="max-w-7xl mx-auto space-y-8 fade-in">
          <div className="flex justify-between items-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/cases')}
              className="hover:scale-105 transition-all"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Cases
            </Button>
            <Button 
              variant="destructive"
              onClick={() => setShowDeleteDialog(true)}
              className="hover:scale-105 transition-all"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Case
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              <div className="glass-card p-6">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {caseData.party_name}
                </h1>
                <p className="text-muted-foreground mt-2">
                  Case Number: {caseData.case_number}
                </p>
                
                <div className="grid grid-cols-2 gap-6 mt-6">
                  <div className="flex items-center gap-3">
                    <Gavel className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Court</p>
                      <p className="font-medium">{caseData.court_name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Stage</p>
                      <p className="font-medium">{caseData.stage}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CalendarDays className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Previous Date</p>
                      <p className="font-medium">{caseData.previous_date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Next Date</p>
                      <p className="font-medium">{caseData.next_date}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold mb-4">Case Timeline</h3>
                <CaseTimeline hearings={caseData.hearings || []} />
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold mb-4">Add New Hearing</h3>
                <div className="space-y-4">
                  <Input
                    type="date"
                    value={newHearing.date}
                    onChange={(e) => setNewHearing({ ...newHearing, date: e.target.value })}
                    className="w-full"
                  />
                  <Input
                    type="text"
                    value={newHearing.stage}
                    onChange={(e) => setNewHearing({ ...newHearing, stage: e.target.value })}
                    placeholder="Stage"
                  />
                  <Input
                    type="number"
                    value={newHearing.amount}
                    onChange={(e) => setNewHearing({ ...newHearing, amount: Number(e.target.value) })}
                    placeholder="Amount"
                  />
                  <Input
                    type="text"
                    value={newHearing.summary}
                    onChange={(e) => setNewHearing({ ...newHearing, summary: e.target.value })}
                    placeholder="Summary"
                  />
                  <Button 
                    onClick={handleAddHearing}
                    className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  >
                    Add Hearing
                  </Button>
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold mb-4">Financial Analysis</h3>
                <div className="h-[300px]">
                  <ChartContainer>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ChartTooltip />
                      <Bar dataKey="amount" fill="var(--primary)" />
                    </BarChart>
                  </ChartContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the case
              and all its associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCase}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CaseDetails;
