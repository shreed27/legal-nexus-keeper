
import { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { Button } from "@/components/ui/button";
import { Upload, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PricingModal from "@/components/pricing/PricingModal";
import { useIsMobile } from "../hooks/use-mobile";

interface StoredFile {
  id: string;
  name: string;
  size: number;
  uploadDate: string;
}

const MAX_STORAGE_GB = 5;
const MAX_STORAGE_BYTES = MAX_STORAGE_GB * 1024 * 1024 * 1024;

const Documents = () => {
  const [usedStorage, setUsedStorage] = useState(0);
  const [files, setFiles] = useState<StoredFile[]>([]);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  useEffect(() => {
    const storedFiles = localStorage.getItem('storedFiles');
    const storedUsage = localStorage.getItem('storageUsed');
    
    if (storedFiles) {
      setFiles(JSON.parse(storedFiles));
    }
    if (storedUsage) {
      setUsedStorage(parseInt(storedUsage));
    }
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (!uploadedFiles?.length) return;

    const totalSize = Array.from(uploadedFiles).reduce((acc, file) => acc + file.size, 0);
    const newTotalSize = usedStorage + totalSize;

    if (newTotalSize > MAX_STORAGE_BYTES) {
      setShowPricingModal(true);
      return;
    }

    const newFiles = Array.from(uploadedFiles).map(file => ({
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      uploadDate: new Date().toISOString(),
    }));

    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    setUsedStorage(newTotalSize);
    
    localStorage.setItem('storedFiles', JSON.stringify(updatedFiles));
    localStorage.setItem('storageUsed', newTotalSize.toString());
    
    toast({
      title: "Files uploaded successfully",
      description: `${uploadedFiles.length} files uploaded`,
    });

    event.target.value = '';
  };

  const handleDeleteFile = (fileId: string) => {
    const fileToDelete = files.find(f => f.id === fileId);
    if (!fileToDelete) return;

    const updatedFiles = files.filter(f => f.id !== fileId);
    const newUsedStorage = usedStorage - fileToDelete.size;

    setFiles(updatedFiles);
    setUsedStorage(newUsedStorage);

    localStorage.setItem('storedFiles', JSON.stringify(updatedFiles));
    localStorage.setItem('storageUsed', newUsedStorage.toString());

    toast({
      title: "File deleted",
      description: `${fileToDelete.name} has been removed`,
    });
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const usedPercentage = (usedStorage / MAX_STORAGE_BYTES) * 100;

  return (
    <div className="min-h-screen bg-neutral-light">
      <Sidebar />
      <Header />
      
      <main className={`transition-all duration-300 ${isMobile ? 'ml-0 px-4' : 'ml-64 px-8'} pt-20`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-dark">Document Storage</h1>
            <div className="text-sm text-neutral-600 bg-white/50 px-4 py-2 rounded-lg">
              {formatBytes(usedStorage)} used of {MAX_STORAGE_GB}GB
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-sm">
            <div className="mb-6">
              <div className="h-2 bg-neutral-100 rounded-full">
                <div
                  className="h-2 bg-primary rounded-full transition-all"
                  style={{ width: `${usedPercentage}%` }}
                />
              </div>
            </div>

            <div className="flex flex-col items-center justify-center border-2 border-dashed border-neutral-200 rounded-xl p-6 md:p-8">
              <div className="text-center max-w-md">
                <Upload className="mx-auto h-10 w-10 md:h-12 md:w-12 text-neutral-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">Upload Documents</h3>
                <p className="text-sm text-neutral-600 mb-4">
                  Drag and drop your files here or click to browse
                </p>
                <Button asChild className="w-full md:w-auto">
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
              {files.length === 0 ? (
                <div className="text-sm text-neutral-500 text-center py-8 bg-neutral-50 rounded-lg">
                  No documents uploaded yet
                </div>
              ) : (
                <div className="space-y-3">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
                    >
                      <div>
                        <h4 className="font-medium text-sm md:text-base">{file.name}</h4>
                        <p className="text-xs md:text-sm text-neutral-600">
                          {formatBytes(file.size)} • Uploaded {formatDate(file.uploadDate)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteFile(file.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 md:h-5 md:w-5" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <PricingModal 
        isOpen={showPricingModal}
        onClose={() => setShowPricingModal(false)}
        feature="More Storage"
      />
    </div>
  );
};

export default Documents;
