
import { Bot } from "lucide-react";

const WelcomeMessage = () => {
  return (
    <div className="text-center text-neutral-600 mt-8 space-y-4">
      <Bot className="w-16 h-16 mx-auto mb-4 text-primary animate-pulse" />
      <h2 className="text-2xl font-semibold mb-2">Welcome to AVENIX.PRO Legal Assistant</h2>
      <p className="text-lg max-w-2xl mx-auto">
        I'm here to help you with legal questions and provide information based on legal regulations and case law. 
        While I can offer general legal information, please note that my responses should not be considered as 
        legal advice. For specific legal advice, always consult with a qualified attorney.
      </p>
      <p className="text-neutral-500">Ask any legal question to get started</p>
    </div>
  );
};

export default WelcomeMessage;
