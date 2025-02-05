import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Cases = () => {
  const { toast } = useToast();

  const { data: cases, isLoading } = useQuery({
    queryKey: ["cases"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cases")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        toast({
          title: "Error fetching cases",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      return data;
    },
  });

  return (
    <div className="min-h-screen bg-neutral-light">
      <Sidebar />
      <Header />
      
      <main className="ml-64 pt-20 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-neutral-dark">Cases</h1>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Case
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-white rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {cases?.map((case_) => (
                <div
                  key={case_.id}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-lg">{case_.title}</h3>
                  <p className="text-neutral-600 mt-2">Case #{case_.case_number}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-neutral-500">
                      Client: {case_.client_name}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      case_.status === "Active" ? "bg-green-100 text-green-800" :
                      case_.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {case_.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Cases;