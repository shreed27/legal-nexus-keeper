import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChartContainer, ChartLegend, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

interface CaseDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  caseData: any;
}

export function CaseDetailDialog({ open, onOpenChange, caseData }: CaseDetailDialogProps) {
  const chartData = [
    { name: "Initial", amount: caseData?.amount_charged || 0 },
    { name: "Current", amount: caseData?.amount_charged * 1.2 || 0 }, // Example calculation
  ];

  const chartConfig = {
    amount: {
      label: "Amount",
      theme: {
        light: "#4f46e5",
        dark: "#818cf8",
      },
    },
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Case Details - {caseData?.party_name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-6 space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-muted-foreground">Case Information</h3>
              <p><span className="font-medium">Case Number:</span> {caseData?.case_number}</p>
              <p><span className="font-medium">Court:</span> {caseData?.court_name}</p>
              <p><span className="font-medium">Stage:</span> {caseData?.stage}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-muted-foreground">Dates</h3>
              <p><span className="font-medium">Previous Date:</span> {caseData?.previous_date}</p>
              <p><span className="font-medium">Next Date:</span> {caseData?.next_date}</p>
              <p><span className="font-medium">Hearings:</span> {caseData?.hearings_count}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-muted-foreground">Financial Analysis</h3>
            <div className="h-[300px] w-full">
              <ChartContainer config={chartConfig}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip />
                  <Bar dataKey="amount" fill="var(--color-amount)" />
                </BarChart>
              </ChartContainer>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-muted-foreground">Notes</h3>
            <p className="text-sm text-muted-foreground">
              This case has been active for {caseData?.hearings_count} hearings.
              The current stage is {caseData?.stage}.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}