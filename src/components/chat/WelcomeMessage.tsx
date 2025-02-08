
import { Bot } from "lucide-react";

const WelcomeMessage = () => {
  return (
    <div className="text-center space-y-8 p-8">
      <div className="glow mx-auto w-fit">
        <Bot className="w-16 h-16 text-primary relative z-10 animate-pulse" />
      </div>
      <h2 className="text-3xl font-bold gradient-text">
        AI Legal Assistant
      </h2>
      <div className="glass-card max-w-2xl mx-auto p-8">
        <p className="text-primary-light text-lg font-medium">
          Start your conversation
        </p>
      </div>
    </div>
  );
};

export default WelcomeMessage;
