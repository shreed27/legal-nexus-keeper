
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface Feature {
  icon: any;
  title: string;
  description: string;
}
