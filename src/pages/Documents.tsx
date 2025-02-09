
import { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { Button } from "@/components/ui/button";
import { Upload, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PricingModal from "@/components/pricing/PricingModal";
import { useIsMobile } from "../hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Document } from "@/types/case";

const MAX_STORAGE_GB = 5;
const MAX_STORAGE_BYTES = MAX_STORAGE_GB * 1024 * 1024 * 1024;

const Documents = () => {
  const [usedStorage, setUsedStorage] = useState(0);
  const [files, setFiles] = useState<Document[]>([]);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    checkAuth();
    fetchDocuments();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/auth');
    }
  };

  const fetchDocuments = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }

      const { data: documents, error } = await supabase
        .from('documents')
        .select('*')
        .order('uploaded_at', { ascending: false });

      if (error) throw error;

      setFiles(documents || []);
      
      // Calculate used storage
      const totalSize = (documents || []).reduce((acc, doc) => acc + doc.size, 0);
      setUsedStorage(totalSize);
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast({
        title: "Error",
        description: "Failed to load documents. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (!uploadedFiles?.length) return;

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/auth');
      return;
    }

    const totalSize = Array.from(uploadedFiles).reduce((acc, file) => acc + file.size, 0);
    const newTotalSize = usedStorage + totalSize;

    if (newTotalSize > MAX_STORAGE_BYTES) {
      setShowPricingModal(true);
      return;
    }

    for (const file of uploadedFiles) {
      try {
        const fileExt = file.name.split('.').pop();
        const filePath = `${session.user.id}/${crypto.randomUUID()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('documents')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { error: dbError } = await supabase
          .from('documents')
          .insert({
            name: file.name,
            size: file.size,
            storage_path: filePath,
            user_id: session.user.id
          });

        if (dbError) throw dbError;

        toast({
          title: "Success",
          description: `${file.name} uploaded successfully`,
        });
      } catch (error) {
        console.error('Error uploading file:', error);
        toast({
          title: "Error",
          description: `Failed to upload ${file.name}`,
          variant: "destructive",
        });
      }
    }

    fetchDocuments();
    event.target.value = '';
  };

  const handleDeleteFile = async (fileId: string) => {
    try {
      const fileToDelete = files.find(f => f.id === fileId);
      if (!fileToDelete) return;

      const { error: storageError } = await supabase.storage
        .from('documents')
        .remove([fileToDelete.storage_path]);

      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from('documents')
        .delete()
        .eq('id', fileId);

      if (dbError) throw dbError;

      setFiles(files.filter(f => f.id !== fileId));
      setUsedStorage(prev => prev - fileToDelete.size);

      toast({
        title: "File deleted",
        description: `${fileToDelete.name} has been removed`,
      });
    } catch (error) {
      console.error('Error deleting file:', error);
      toast({
        title: "Error",
        description: "Failed to delete file. Please try again.",
        variant: "destructive",
      });
    }
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-light">
        <Sidebar />
        <Header />
        <main className={`transition-all duration-300 ${isMobile ? 'ml-0 px-4' : 'ml-64 px-8'} pt-20`}>
          <div className="flex items-center justify-center h-[60vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </main>
      </div>
    );
  }

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
                          {formatBytes(file.size)} • Uploaded {formatDate(file.uploaded_at)}
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
