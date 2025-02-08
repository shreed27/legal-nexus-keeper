
import { useState } from "react";
import { Bot, Send, Brain, Zap, MessageCircle, LayoutDashboard, User } from "lucide-react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const { toast } = useToast();

  const features = [
    {
      icon: Brain,
      title: "Legal AI Brain",
      description: "Advanced legal knowledge processing"
    },
    {
      icon: Zap,
      title: "Instant Responses",
      description: "Real-time legal assistance"
    },
    {
      icon: MessageCircle,
      title: "Natural Dialogue",
      description: "Human-like conversation flow"
    },
    {
      icon: LayoutDashboard,
      title: "Context Aware",
      description: "Maintains conversation context"
    }
  ];

  const generateResponse = (userMessage: string) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    // Check if the message is about the assistant's identity
    if (lowerCaseMessage.includes('who') || 
        lowerCaseMessage.includes('what are you') || 
        lowerCaseMessage.includes('your name') ||
        lowerCaseMessage.includes('about you')) {
      return "I'm your AVENIX.PRO Legal Assistant to help you. I specialize in providing legal information and assistance. How can I help you with your legal questions today?";
    }
    
    // For non-legal questions
    if (!lowerCaseMessage.includes('law') && 
        !lowerCaseMessage.includes('legal') && 
        !lowerCaseMessage.includes('court') && 
        !lowerCaseMessage.includes('rights') &&
        !lowerCaseMessage.includes('contract') &&
        !lowerCaseMessage.includes('case')) {
      return "I'm your AVENIX.PRO Legal Assistant. I'm designed to help specifically with legal questions. Could you please rephrase your question in a legal context?";
    }
    
    // Default legal response
    return "Based on the legal context of your question, here's my analysis: [Legal response would be generated here]. Please note that this is general legal information and not legal advice. For specific legal advice, please consult with a qualified attorney.";
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      content: message,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage("");
    
    // Generate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: crypto.randomUUID(),
        content: generateResponse(message),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    toast({
      title: "Processing Query",
      description: "Analyzing your legal question...",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100">
      <Sidebar />
      <Header />
      
      <main className="ml-64 pt-20 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Bot className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-neutral-dark">AVENIX.PRO Legal Assistant</h1>
              <p className="text-neutral-600 mt-1">Your 24/7 AI-powered legal companion</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {features.map((feature, index) => (
              <Card key={index} className="glass-card hover-scale">
                <CardHeader>
                  <feature.icon className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg flex flex-col h-[600px] border border-neutral-200">
            <div className="p-6 flex-1 overflow-y-auto space-y-4">
              {messages.length === 0 ? (
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
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === 'user' ? 'justify-end' : 'justify-start'
                    } fade-in`}
                  >
                    <div className="flex items-start max-w-[80%] gap-3">
                      {msg.sender === 'bot' ? (
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
                          msg.sender === 'user'
                            ? 'bg-primary text-white'
                            : 'bg-neutral-100'
                        }`}
                      >
                        <div className="prose">
                          {msg.content}
                        </div>
                        <div className="text-xs mt-2 opacity-70">
                          {msg.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleSend} className="p-4 border-t bg-white/50">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask your legal question..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  type="submit" 
                  disabled={!message.trim()}
                  className="bg-primary hover:bg-primary-dark transition-colors"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chatbot;
