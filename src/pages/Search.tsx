import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import PricingModal from "@/components/pricing/PricingModal";

const MONTHLY_SEARCH_LIMIT = 3;

const Search = () => {
  const [searchCount, setSearchCount] = useState(0);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [query, setQuery] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    const storedMonth = localStorage.getItem("searchMonth");
    const storedCount = localStorage.getItem("searchCount");

    if (storedMonth && parseInt(storedMonth) !== currentMonth) {
      // Reset count for new month
      setSearchCount(0);
      localStorage.setItem("searchMonth", currentMonth.toString());
      localStorage.setItem("searchCount", "0");
    } else if (storedCount) {
      setSearchCount(parseInt(storedCount));
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchCount >= MONTHLY_SEARCH_LIMIT) {
      setShowPricingModal(true);
      return;
    }

    const newCount = searchCount + 1;
    setSearchCount(newCount);
    localStorage.setItem("searchCount", newCount.toString());
    localStorage.setItem("searchMonth", new Date().getMonth().toString());

    // Perform search logic here
    toast({
      title: "Search performed",
      description: `${MONTHLY_SEARCH_LIMIT - newCount} searches remaining this month`,
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
              {MONTHLY_SEARCH_LIMIT - searchCount} searches remaining this month
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

      <PricingModal
        isOpen={showPricingModal}
        onClose={() => setShowPricingModal(false)}
        feature="AI Legal Research"
      />
    </div>
  );
};

export default Search;