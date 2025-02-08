
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  documentRef?: string;
}

export interface Feature {
  icon: any;
  title: string;
  description: string;
}

export interface Document {
  id: string;
  name: string;
  content: string;
  uploadDate: Date;
}
