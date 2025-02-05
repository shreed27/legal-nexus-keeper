import { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const MONTHLY_SEARCH_LIMIT = 3;

const Search = () => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchesLeft, setSearchesLeft] = useState(MONTHLY_SEARCH_LIMIT);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, this would be fetched from the backend
    const currentMonth = new Date().getMonth();
    const lastMonth = localStorage.getItem('lastSearchMonth');
    const searches = localStorage.getItem('searchesUsed');
    
    if (lastMonth && parseInt(lastMonth) !== currentMonth) {
      setSearchesLeft(MONTHLY_SEARCH_LIMIT);
      localStorage.setItem('searchesUsed', '0');
    } else if (searches) {
      setSearchesLeft(MONTHLY_SEARCH_LIMIT - parseInt(searches));
    }
    
    localStorage.setItem('lastSearchMonth', currentMonth.toString());
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: "Search query required",
        description: "Please enter a search term",
        variant: "destructive",
      });
      return;
    }

    if (searchesLeft <= 0) {
      toast({
        title: "Monthly limit reached",
        description: "You have used all your searches for this month",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    try {
      // TODO: Implement actual AI search functionality
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const usedSearches = MONTHLY_SEARCH_LIMIT - searchesLeft + 1;
      localStorage.setItem('searchesUsed', usedSearches.toString());
      setSearchesLeft(prev => prev - 1);
      
      toast({
        title: "Search completed",
        description: `You have ${searchesLeft - 1} searches left this month`,
      });
    } catch (error) {
      toast({
        title: "Search failed",
        description: "An error occurred while searching",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-light">
      <Sidebar />
      <Header />
      
      <main className="ml-64 pt-20 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-neutral-dark">Legal Search</h1>
            <div className="text-sm text-neutral-600">
              {searchesLeft} searches remaining this month
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex gap-4 mb-8">
              <Input
                placeholder="Search legal cases, documents, and precedents..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSearch} disabled={isSearching || searchesLeft <= 0}>
                <SearchIcon className="mr-2 h-4 w-4" />
                {isSearching ? "Searching..." : "Search"}
              </Button>
            </div>

            <div className="min-h-[400px] flex items-center justify-center text-neutral-500">
              {searchesLeft <= 0 ? (
                "You have reached your monthly search limit"
              ) : (
                "Enter a search query to find relevant legal information"
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;