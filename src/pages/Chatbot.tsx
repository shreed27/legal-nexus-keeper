
import { useState } from "react";
import { Brain, Zap, MessageCircle, LayoutDashboard, Menu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Message, Feature, UploadedDocument } from "@/types/chat";
import { generateResponse } from "@/utils/chatUtils";
import { useIsMobile } from "@/hooks/use-mobile";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import Features from "@/components/chat/Features";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatContainer from "@/components/chat/ChatContainer";

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
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 glass-card rounded-lg"
        >
          <Menu className="h-6 w-6 text-neutral-600" />
        </button>
      )}
      
      <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
        <Sidebar />
      </div>
      <Header />
      
      <main className={`transition-all duration-300 ${isMobile ? 'ml-0 px-4' : 'md:ml-64 px-8'} pt-16 md:pt-20`}>
        <div className="max-w-6xl mx-auto">
          <ChatHeader />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {features.map((feature, index) => (
              <div key={index} className="glass-card p-4 hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm gradient-text">{feature.title}</h3>
                </div>
                <p className="text-xs text-neutral-600">{feature.description}</p>
              </div>
            ))}
          </div>
          <ChatContainer
            messages={messages}
            documents={documents}
            message={message}
            setMessage={setMessage}
            handleSend={handleSend}
            handleFileUpload={handleFileUpload}
          />
        </div>
      </main>
    </div>
  );
};

export default Chatbot;
