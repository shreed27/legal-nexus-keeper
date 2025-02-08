
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Message, UploadedDocument } from "@/types/chat";
import WelcomeMessage from "./WelcomeMessage";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

interface ChatContainerProps {
  messages: Message[];
  documents: UploadedDocument[];
  message: string;
  setMessage: (message: string) => void;
  handleSend: (e: React.FormEvent) => void;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ChatContainer = ({
  messages,
  documents,
  message,
  setMessage,
  handleSend,
  handleFileUpload,
}: ChatContainerProps) => {
  return (
    <div className="glass-morphism rounded-2xl shadow-xl flex flex-col h-[500px] md:h-[700px] animate-fade-in">
      <div className="flex items-center justify-between p-4 md:p-6 border-b border-neutral-200/50">
        <div className="text-sm text-neutral-600">
          {documents.length > 0 ? `${documents.length} document(s) uploaded` : 'No documents uploaded'}
        </div>
        <Button variant="outline" size="sm" className="bg-white/50 border-white/20 hover:bg-white/60" asChild>
          <label className="cursor-pointer">
            <input
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              accept=".txt,.doc,.docx,.pdf"
              multiple
            />
            <Upload className="w-4 h-4 mr-2" />
            Upload Document
          </label>
        </Button>
      </div>

      <div className="p-4 md:p-6 flex-1 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-neutral-200 scrollbar-track-transparent">
        {messages.length === 0 ? (
          <WelcomeMessage />
        ) : (
          messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))
        )}
      </div>

      <ChatInput 
        message={message}
        setMessage={setMessage}
        handleSend={handleSend}
      />
    </div>
  );
};

export default ChatContainer;
