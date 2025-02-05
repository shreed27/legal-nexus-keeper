import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { supabase } from "@/lib/supabase";

const newCaseSchema = z.object({
  party_name: z.string().min(1, "Party name is required"),
  court_name: z.string().min(1, "Court name is required"),
  case_number: z.string().min(1, "Case number is required"),
  previous_date: z.string().min(1, "Previous date is required"),
  next_date: z.string().min(1, "Next date is required"),
  stage: z.string().min(1, "Stage is required"),
  amount_charged: z.string().min(1, "Amount is required"),
});

type NewCaseForm = z.infer<typeof newCaseSchema>;

interface NewCaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function NewCaseDialog({ open, onOpenChange, onSuccess }: NewCaseDialogProps) {
  const { toast } = useToast();
  const form = useForm<NewCaseForm>({
    resolver: zodResolver(newCaseSchema),
    defaultValues: {
      party_name: "",
      court_name: "",
      case_number: "",
      previous_date: "",
      next_date: "",
      stage: "",
      amount_charged: "",
    },
  });

  const onSubmit = async (data: NewCaseForm) => {
    try {
      const { error } = await supabase.from("cases").insert([
        {
          ...data,
          amount_charged: parseFloat(data.amount_charged),
          hearings_count: 1, // Initial hearing count
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "New case has been added successfully",
      });
      
      form.reset();
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Error adding new case:", error);
      toast({
        title: "Error",
        description: "Failed to add new case. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Case</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="party_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Party Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter party name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="court_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Court Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter court name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="case_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Case Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter case number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="previous_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Previous Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="next_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Next Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stage</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter case stage" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount_charged"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount Charged</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter amount" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Add Case
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}