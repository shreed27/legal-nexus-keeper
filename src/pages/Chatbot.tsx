
import { useState } from "react";
import { Bot, Send, Brain, Zap, MessageCircle, LayoutDashboard } from "lucide-react";
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
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: crypto.randomUUID(),
        content: "I understand your legal query. Based on current regulations and case law, here's my analysis...",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    toast({
      title: "Message Sent",
      description: "Processing your legal query...",
    });
  };

  return (
    <div className="min-h-screen bg-neutral-light">
      <Sidebar />
      <Header />
      
      <main className="ml-64 pt-20 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Bot className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-neutral-dark">AI Legal Assistant</h1>
              <p className="text-neutral-600 mt-1">Your 24/7 AI-powered legal companion</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/50 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all">
                <CardHeader>
                  <feature.icon className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg flex flex-col h-[600px]">
            <div className="p-6 flex-1 overflow-y-auto space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-neutral-600 mt-8">
                  <Bot className="w-12 h-12 mx-auto mb-4 text-neutral-400" />
                  <p className="text-lg font-medium mb-2">Welcome to Your Legal AI Assistant</p>
                  <p className="text-sm">Ask any legal question to get started</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`rounded-lg p-4 max-w-[80%] ${
                        msg.sender === 'user'
                          ? 'bg-primary text-white'
                          : 'bg-neutral-100'
                      }`}
                    >
                      {msg.content}
                      <div className="text-xs mt-1 opacity-70">
                        {msg.timestamp.toLocaleTimeString()}
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
                <Button type="submit" disabled={!message.trim()}>
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
