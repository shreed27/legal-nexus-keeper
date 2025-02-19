
import { useState } from "react";
import { Download, Edit, Eye, Save, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface DocumentPreviewProps {
  content: string;
}

const DocumentPreview = ({ content }: DocumentPreviewProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableContent, setEditableContent] = useState(content);
  const { toast } = useToast();

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([editableContent], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `document-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    toast({
      title: "Document Downloaded",
      description: "Your document has been downloaded successfully.",
    });
  };

  const handleSave = () => {
    toast({
      title: "Document Saved",
      description: "Your changes have been saved successfully.",
    });
    setIsEditing(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Legal Document',
        text: editableContent,
      }).then(() => {
        toast({
          title: "Document Shared",
          description: "Your document has been shared successfully.",
        });
      }).catch(console.error);
    } else {
      toast({
        title: "Share Not Available",
        description: "Sharing is not supported on this device.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Generated Document</h3>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? <Eye className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
            {isEditing ? "Preview" : "Edit"}
          </Button>
          {isEditing && (
            <Button variant="outline" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          )}
          <Button variant="outline" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
      {isEditing ? (
        <Textarea
          value={editableContent}
          onChange={(e) => setEditableContent(e.target.value)}
          className="min-h-[400px] font-mono glass-card"
        />
      ) : (
        <div className="bg-neutral-50 p-4 rounded-lg min-h-[400px] whitespace-pre-wrap font-mono glass-card">
          {editableContent}
        </div>
      )}
    </div>
  );
};

export default DocumentPreview;
