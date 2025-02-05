export interface Case {
  id: string;
  party_name: string;
  case_number: string;
  court_name: string;
  hearings: Hearing[];
}

export interface Hearing {
  id: string;
  date: string;
  summary: string;
  stage: string;
  amount: number;
}