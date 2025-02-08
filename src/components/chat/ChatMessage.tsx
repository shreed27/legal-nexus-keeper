
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
      <div className="flex items-start max-w-[80%] gap-3">
        {message.sender === 'bot' ? (
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Bot className="h-5 w-5 text-primary" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
            <User className="h-5 w-5 text-neutral-600" />
          </div>
        )}
        <div
          className={`rounded-lg p-4 ${
            message.sender === 'user'
              ? 'bg-primary text-white'
              : 'bg-neutral-100'
          }`}
        >
          <div className="prose">
            {message.content}
          </div>
          <div className="text-xs mt-2 opacity-70">
            {message.timestamp.toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
