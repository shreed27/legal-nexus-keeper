
import { useState } from "react";
import { Brain, Zap, MessageCircle, LayoutDashboard, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Message, Feature, UploadedDocument } from "@/types/chat";
import { generateResponse } from "@/utils/chatUtils";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatContainer from "@/components/chat/ChatContainer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
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

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl shadow-md">
            <Bot className="h-6 w-6 text-primary" />
          </div>
          <h1 className="page-title">Legal Assistant</h1>
        </div>
        <p className="page-description">AI-powered legal assistance and document analysis</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {features.map((feature, index) => (
          <Card key={index} className="bg-white/50 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all hover:scale-105">
            <CardHeader>
              <feature.icon className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <ChatHeader />
      
      <ChatContainer
        messages={messages}
        documents={documents}
        message={message}
        setMessage={setMessage}
        handleSend={handleSend}
        handleFileUpload={handleFileUpload}
      />
    </div>
  );
};

export default Chatbot;
