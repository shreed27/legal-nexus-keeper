
export interface Case {
  id: string;
  user_id: string;
  party_name: string;
  case_number: string;
  court_name: string;
  stage?: string;
  previous_date?: string;
  next_date?: string;
  created_at: string;
  updated_at: string;
  hearings: Hearing[];
}

export interface Hearing {
  id: string;
  case_id: string;
  date: string;
  summary?: string;
  stage: string;
  amount: number;
  created_at: string;
}

export interface Document {
  id: string;
  user_id: string;
  name: string;
  size: number;
  storage_path: string;
  uploaded_at: string;
}
