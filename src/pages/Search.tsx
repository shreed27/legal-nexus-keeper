import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

const Search = () => {
  const [query, setQuery] = useState("");
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Perform search logic here
    toast({
      title: "Search performed",
      description: "Your search has been processed",
    });
  };

  return (
    <div className="min-h-screen bg-neutral-light">
      <Sidebar />
      <Header />
      
      <main className="ml-64 pt-20 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-neutral-dark mb-2">AI Legal Research</h1>
            <p className="text-neutral-600">
              Search through legal documents and get AI-powered insights
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter your legal research query..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" disabled={!query.trim()}>
                  <SearchIcon className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </form>

            <div className="mt-8">
              <h2 className="text-lg font-medium mb-4">Search History</h2>
              <div className="text-sm text-neutral-600">
                Your recent searches will appear here
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;
