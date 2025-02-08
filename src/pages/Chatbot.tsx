import { useState } from "react";
import { Bot, Send, Brain, Zap, MessageCircle, LayoutDashboard, Upload, Menu } from "lucide-react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Message, Feature, UploadedDocument } from "@/types/chat";
import { generateResponse } from "@/utils/chatUtils";
import FeatureCard from "@/components/chat/FeatureCard";
import WelcomeMessage from "@/components/chat/WelcomeMessage";
import ChatMessage from "@/components/chat/ChatMessage";
import { useIsMobile } from "@/hooks/use-mobile";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const features: Feature[] = [
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
      title: "Document Analysis",
      description: "Upload and analyze legal documents"
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const newDocument: UploadedDocument = {
          id: crypto.randomUUID(),
          name: file.name,
          content: content,
          uploadDate: new Date(),
        };
        
        setDocuments(prev => [...prev, newDocument]);
        
        const systemMessage: Message = {
          id: crypto.randomUUID(),
          content: `Document "${file.name}" has been uploaded successfully. You can now ask questions about it.`,
          sender: 'bot',
          timestamp: new Date(),
          documentRef: newDocument.id
        };
        
        setMessages(prev => [...prev, systemMessage]);
      };
      reader.readAsText(file);
    });

    toast({
      title: "Document Upload",
      description: "Processing your document...",
    });

    event.target.value = '';
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
    
    setTimeout(() => {
      const botResponse: Message = {
        id: crypto.randomUUID(),
        content: generateResponse(message, documents),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    toast({
      title: "Processing Query",
      description: "Analyzing your request...",
    });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-[#1a1d21] text-white">
      {isMobile ? (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-primary/10 rounded-lg"
        >
          <Menu className="h-6 w-6 text-white" />
        </button>
      ) : null}
      
      <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
        <Sidebar />
      </div>
      <Header />
      
      <main className={`transition-all duration-300 ${isMobile ? 'ml-0' : 'md:ml-64'} pt-20 p-4 md:p-8`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Bot className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">AVENIX.PRO Legal Assistant</h1>
              <p className="text-neutral-400 mt-1">Your 24/7 AI-powered legal companion</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} />
            ))}
          </div>

          <div className="bg-[#282c34]/80 backdrop-blur-sm rounded-xl shadow-xl flex flex-col h-[500px] md:h-[600px] border border-white/10">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="text-sm text-neutral-400">
                {documents.length > 0 ? `${documents.length} document(s) uploaded` : 'No documents uploaded'}
              </div>
              <Button variant="outline" size="sm" className="bg-white/5 border-white/20 hover:bg-white/10" asChild>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept=".txt,.doc,.docx,.pdf"
                    multiple
                  />
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Document
                </label>
              </Button>
            </div>

            <div className="p-4 md:p-6 flex-1 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.length === 0 ? (
                <WelcomeMessage />
              ) : (
                messages.map((msg) => (
                  <ChatMessage key={msg.id} message={msg} />
                ))
              )}
            </div>

            <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-white/5">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask about your legal documents or any legal question..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-neutral-500"
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
