import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Search = () => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: "Search query required",
        description: "Please enter a search term",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    // TODO: Implement actual search functionality
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSearching(false);
  };

  return (
    <div className="min-h-screen bg-neutral-light">
      <Sidebar />
      <Header />
      
      <main className="ml-64 pt-20 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-neutral-dark mb-8">Legal Search</h1>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex gap-4 mb-8">
              <Input
                placeholder="Search legal cases, documents, and precedents..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSearch} disabled={isSearching}>
                <SearchIcon className="mr-2 h-4 w-4" />
                {isSearching ? "Searching..." : "Search"}
              </Button>
            </div>

            <div className="min-h-[400px] flex items-center justify-center text-neutral-500">
              Enter a search query to find relevant legal information
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;