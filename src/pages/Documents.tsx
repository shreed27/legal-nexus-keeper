
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileUp, Search, Filter, SortDesc } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Document {
  id: string;
  title: string;
  type: string;
  lastModified: string;
  size: string;
}

const Documents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  // Mock documents data
  const documents: Document[] = [
    {
      id: "1",
      title: "Contract Agreement v2.1",
      type: "Legal Contract",
      lastModified: "2024-02-19",
      size: "1.2 MB"
    },
    {
      id: "2",
      title: "NDA Template",
      type: "Template",
      lastModified: "2024-02-18",
      size: "524 KB"
    },
    {
      id: "3",
      title: "Client Meeting Notes",
      type: "Notes",
      lastModified: "2024-02-17",
      size: "256 KB"
    }
  ];

  const handleUpload = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Document upload functionality will be available shortly.",
    });
  };

  const filteredDocs = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Documents</h1>
          <p className="text-gray-600">Manage and organize your legal documents</p>
        </div>
        <Button onClick={handleUpload} className="bg-primary hover:bg-primary/90">
          <FileUp className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <SortDesc className="mr-2 h-4 w-4" />
            Sort
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map((doc) => (
          <Card key={doc.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>{doc.title}</CardTitle>
              <CardDescription>{doc.type}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Last modified: {doc.lastModified}</span>
                <span>{doc.size}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Documents;
