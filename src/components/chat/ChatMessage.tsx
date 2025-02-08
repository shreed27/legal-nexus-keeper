
import { Bot, User } from "lucide-react";
import { Message } from "@/types/chat";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div
      className={`flex ${
        message.sender === 'user' ? 'justify-end' : 'justify-start'
      } fade-in`}
    >
      <div className="flex items-start max-w-[85%] md:max-w-[80%] gap-4">
        {message.sender === 'bot' ? (
          <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center flex-shrink-0">
            <Bot className="h-6 w-6 text-primary" />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center flex-shrink-0">
            <User className="h-6 w-6 text-white/80" />
          </div>
        )}
        <div
          className={`rounded-xl p-4 ${
            message.sender === 'user'
              ? 'bg-gradient-to-br from-primary/90 to-accent/90 text-white'
              : 'glass-card text-white/90'
          }`}
        >
          <div className="prose prose-invert max-w-none">
            {message.content}
          </div>
          <div className="text-xs mt-3 opacity-50">
            {message.timestamp.toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
