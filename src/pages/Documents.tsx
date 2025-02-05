import { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { Button } from "@/components/ui/button";
import { Upload, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const MAX_STORAGE_GB = 5;
const MAX_STORAGE_BYTES = MAX_STORAGE_GB * 1024 * 1024 * 1024;

const Documents = () => {
  const [usedStorage, setUsedStorage] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, this would be fetched from the backend
    const storedUsage = localStorage.getItem('storageUsed');
    if (storedUsage) {
      setUsedStorage(parseInt(storedUsage));
    }
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) return;

    const totalSize = Array.from(files).reduce((acc, file) => acc + file.size, 0);
    const newTotalSize = usedStorage + totalSize;

    if (newTotalSize > MAX_STORAGE_BYTES) {
      toast({
        title: "Storage limit exceeded",
        description: `You have ${formatBytes(MAX_STORAGE_BYTES - usedStorage)} storage remaining`,
        variant: "destructive",
      });
      return;
    }

    // TODO: Implement actual file upload functionality
    setUsedStorage(newTotalSize);
    localStorage.setItem('storageUsed', newTotalSize.toString());
    
    toast({
      title: "Files uploaded successfully",
      description: `${files.length} files uploaded`,
    });
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const usedPercentage = (usedStorage / MAX_STORAGE_BYTES) * 100;

  return (
    <div className="min-h-screen bg-neutral-light">
      <Sidebar />
      <Header />
      
      <main className="ml-64 pt-20 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-neutral-dark">Document Storage</h1>
            <div className="text-sm text-neutral-600">
              {formatBytes(usedStorage)} used of {MAX_STORAGE_GB}GB
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="mb-6">
              <div className="h-2 bg-neutral-100 rounded-full">
                <div
                  className="h-2 bg-primary rounded-full transition-all"
                  style={{ width: `${usedPercentage}%` }}
                />
              </div>
            </div>

            <div className="flex justify-center items-center border-2 border-dashed border-neutral-200 rounded-xl p-8">
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-neutral-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">Upload Documents</h3>
                <p className="text-sm text-neutral-600 mb-4">
                  Drag and drop your files here or click to browse
                </p>
                <Button asChild>
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileUpload}
                      disabled={usedStorage >= MAX_STORAGE_BYTES}
                    />
                    Browse Files
                  </label>
                </Button>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Recent Documents</h3>
              <div className="text-sm text-neutral-500 text-center py-8">
                No documents uploaded yet
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Documents;