
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  handleSend: (e: React.FormEvent) => void;
}

const ChatInput = ({ message, setMessage, handleSend }: ChatInputProps) => {
  return (
    <form onSubmit={handleSend} className="p-4 md:p-6 border-t border-white/10 bg-white/5 backdrop-blur-xl">
      <div className="flex gap-3">
        <Input
          placeholder="Ask about your legal documents or any legal question..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-neutral-500 focus:ring-primary/50"
        />
        <Button 
          type="submit" 
          disabled={!message.trim()}
          className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity px-6"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;
