
import { Bot } from "lucide-react";

const ChatHeader = () => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 mb-8 md:mb-12 animate-fade-in">
      <div className="p-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl backdrop-blur-xl border border-white/10 shadow-xl">
        <Bot className="h-8 w-8 text-primary animate-pulse" />
      </div>
      <div className="text-center md:text-left">
        <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-white via-primary-light to-accent bg-clip-text text-transparent">
          AVENIX.PRO Legal Assistant
        </h1>
        <p className="text-neutral-400 mt-2 text-base md:text-lg">
          Your 24/7 AI-powered legal companion
        </p>
      </div>
    </div>
  );
};

export default ChatHeader;
