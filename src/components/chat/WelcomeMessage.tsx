
import { Bot } from "lucide-react";

const WelcomeMessage = () => {
  return (
    <div className="text-center text-neutral-400 mt-8 space-y-4">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
        <Bot className="w-12 md:w-16 h-12 md:h-16 mx-auto mb-4 text-primary relative z-10 animate-pulse" />
      </div>
      <h2 className="text-xl md:text-2xl font-semibold mb-2 bg-gradient-to-r from-white via-primary-light to-white bg-clip-text text-transparent">
        Welcome to AVENIX.PRO Legal Assistant
      </h2>
      <p className="text-base md:text-lg max-w-2xl mx-auto bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
        I'm here to help you with legal questions and provide information based on legal regulations and case law. 
        While I can offer general legal information, please note that my responses should not be considered as 
        legal advice. For specific legal advice, always consult with a qualified attorney.
      </p>
      <p className="text-primary-light">Ask any legal question to get started</p>
    </div>
  );
};

export default WelcomeMessage;
