
import { Bot } from "lucide-react";

const WelcomeMessage = () => {
  return (
    <div className="text-center space-y-8 p-8">
      <div className="glow mx-auto w-fit">
        <Bot className="w-16 h-16 text-primary relative z-10 animate-pulse" />
      </div>
      <h2 className="text-3xl font-bold gradient-text">
        Welcome to AVENIX.PRO Legal Assistant
      </h2>
      <div className="glass-card max-w-2xl mx-auto p-8 space-y-4">
        <p className="text-lg text-white/90 leading-relaxed">
          I'm here to help you with legal questions and provide information based on legal regulations and case law. 
          While I can offer general legal information, please note that my responses should not be considered as 
          legal advice. For specific legal advice, always consult with a qualified attorney.
        </p>
        <p className="text-primary-light text-lg font-medium">
          Ask any legal question to get started
        </p>
      </div>
    </div>
  );
};

export default WelcomeMessage;
