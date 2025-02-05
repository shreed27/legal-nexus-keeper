import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ChartContainer, ChartLegend, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { ArrowLeft } from "lucide-react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

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
  const [newHearing, setNewHearing] = useState<Hearing>({
    date: "",
    summary: "",
    stage: "",
    amount: 0,
  });

  // For demo purposes, we'll use static data
  // In a real app, you would fetch this based on the ID
  const caseData = {
    id,
    party_name: "John Doe",
    case_number: "123/2024",
    court_name: "Supreme Court",
    previous_date: "2024-02-01",
    next_date: "2024-03-15",
    stage: "Hearing",
    hearings: [
      {
        date: "2024-01-15",
        summary: "Initial hearing",
        stage: "Opening",
        amount: 5000,
      },
      {
        date: "2024-02-01",
        summary: "Evidence presentation",
        stage: "Ongoing",
        amount: 7500,
      },
    ],
  };

  const handleAddHearing = () => {
    if (!newHearing.date || !newHearing.summary || !newHearing.stage || !newHearing.amount) {
      toast({
        title: "Error",
        description: "Please fill all hearing details",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would update this in your backend
    caseData.hearings.push(newHearing);
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

  const chartData = caseData.hearings.map((hearing) => ({
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
    <div className="min-h-screen bg-neutral-light">
      <Sidebar />
      <Header />
      
      <main className="ml-64 pt-20 p-8">
        <div className="max-w-7xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/cases')}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cases
          </Button>

          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-neutral-dark mb-2">
                {caseData.party_name}
              </h1>
              <p className="text-muted-foreground">
                Case Number: {caseData.case_number}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-muted-foreground">Case Information</h3>
                <p><span className="font-medium">Court:</span> {caseData.court_name}</p>
                <p><span className="font-medium">Stage:</span> {caseData.stage}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-muted-foreground">Dates</h3>
                <p><span className="font-medium">Previous Date:</span> {caseData.previous_date}</p>
                <p><span className="font-medium">Next Date:</span> {caseData.next_date}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-muted-foreground">Add New Hearing</h3>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="date"
                  value={newHearing.date}
                  onChange={(e) => setNewHearing({ ...newHearing, date: e.target.value })}
                  placeholder="Hearing Date"
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
              </div>
              <Button onClick={handleAddHearing}>Add Hearing</Button>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-muted-foreground">Hearing History</h3>
              <div className="space-y-4">
                {caseData.hearings.map((hearing, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-white">
                    <p><span className="font-medium">Date:</span> {hearing.date}</p>
                    <p><span className="font-medium">Stage:</span> {hearing.stage}</p>
                    <p><span className="font-medium">Amount:</span> ₹{hearing.amount}</p>
                    <p><span className="font-medium">Summary:</span> {hearing.summary}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-muted-foreground">Financial Analysis</h3>
              <div className="h-[300px] w-full bg-white p-4 rounded-lg">
                <ChartContainer config={chartConfig}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip />
                    <Bar dataKey="amount" fill="var(--color-amount)" />
                  </BarChart>
                </ChartContainer>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CaseDetails;