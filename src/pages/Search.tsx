import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, Filter, SlidersHorizontal, Clock, ArrowRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [jurisdiction, setJurisdiction] = useState('');
  const [courtType, setCourtType] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    // Implement actual search logic here
    const mockResults = [
      {
        title: "Smith v. Johnson",
        citation: "123 F.3d 456",
        court: "Supreme Court",
        date: "2024-03-10",
        summary: "Case involving contract interpretation...",
      },
      // Add more mock results
    ];
    setSearchResults(mockResults);
  };

  return (
    <div className="min-h-screen p-8 fade-in">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Legal Search
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Advanced legal research powered by AI. Search across cases, statutes, and legal documents.
          </p>
        </div>

        <div className="glass-card p-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search cases, statutes, or legal documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={handleSearch} className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
              Search
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <Select value={jurisdiction} onValueChange={setJurisdiction}>
              <SelectTrigger>
                <SelectValue placeholder="Select Jurisdiction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="federal">Federal</SelectItem>
                <SelectItem value="state">State</SelectItem>
                <SelectItem value="appellate">Appellate</SelectItem>
              </SelectContent>
            </Select>

            <Select value={courtType} onValueChange={setCourtType}>
              <SelectTrigger>
                <SelectValue placeholder="Court Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="supreme">Supreme Court</SelectItem>
                <SelectItem value="district">District Court</SelectItem>
                <SelectItem value="bankruptcy">Bankruptcy Court</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-year">Last Year</SelectItem>
                <SelectItem value="last-5-years">Last 5 Years</SelectItem>
                <SelectItem value="last-10-years">Last 10 Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4">
          {searchResults.map((result, index) => (
            <div key={index} className="glass-card p-6 hover:scale-[1.02] transition-all cursor-pointer">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{result.title}</h3>
                  <p className="text-sm text-muted-foreground">{result.citation}</p>
                </div>
                <Button variant="ghost" size="icon">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  {result.court}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {new Date(result.date).toLocaleDateString()}
                </div>
              </div>
              <p className="mt-4 text-sm">{result.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
