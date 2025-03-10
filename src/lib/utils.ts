
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string): string {
  if (!date) return "";
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Generate example cases for the app
export function generateExampleCases(count = 10) {
  const caseTypes = ['Civil', 'Criminal', 'Family', 'Corporate', 'Intellectual Property', 'Real Estate'];
  const courts = ['Supreme Court', 'High Court', 'District Court', 'Federal Court', 'Appellate Court'];
  const jurisdictions = ['Federal', 'State', 'Local', 'International'];
  const statusOptions = ['active', 'pending', 'closed'];
  const parties = [
    'Smith v. Johnson Corp',
    'United States v. Williams',
    'Taylor Enterprises v. Davis Holdings',
    'Brown Family Trust v. City of Springfield',
    'Rodriguez & Partners v. Global Tech Inc',
    'Wilson Estate v. Memorial Hospital',
    'Anderson v. Pacific Insurance',
    'Miller Construction v. Thompson Developers',
    'Clark v. Lewis Manufacturing',
    'Evans Media v. National Broadcasting',
    'Martinez v. State of California',
    'Johnson & Sons v. Phillips Automotive',
    'Wright v. University Medical Center',
    'Turner Industries v. Environmental Protection Agency',
    'Harris v. Metropolitan Transit Authority'
  ];

  const cases = [];
  
  for (let i = 0; i < count; i++) {
    const caseType = caseTypes[Math.floor(Math.random() * caseTypes.length)];
    const court = courts[Math.floor(Math.random() * courts.length)];
    const jurisdiction = jurisdictions[Math.floor(Math.random() * jurisdictions.length)];
    const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
    const createdDate = new Date();
    createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 365));
    
    const filingDate = new Date(createdDate);
    filingDate.setDate(filingDate.getDate() + Math.floor(Math.random() * 14));
    
    const nextHearingDate = new Date();
    nextHearingDate.setDate(nextHearingDate.getDate() + Math.floor(Math.random() * 30) + 1);
    
    const previousHearingDate = new Date();
    previousHearingDate.setDate(previousHearingDate.getDate() - Math.floor(Math.random() * 60));
    
    const hearingsCount = Math.floor(Math.random() * 8) + 1;
    const hearings = [];
    
    for (let j = 0; j < hearingsCount; j++) {
      const hearingDate = new Date(previousHearingDate);
      hearingDate.setDate(hearingDate.getDate() + Math.floor(Math.random() * 15) + 1);
      
      hearings.push({
        date: hearingDate.toISOString().split('T')[0],
        summary: `Hearing ${j + 1} - ${['Motion filed', 'Discovery', 'Testimony', 'Cross-examination', 'Evidence presentation', 'Closing arguments'][Math.floor(Math.random() * 6)]}`,
        stage: ['Initial', 'Discovery', 'Pre-trial', 'Trial', 'Post-trial', 'Appeal'][Math.floor(Math.random() * 6)],
        amount: Math.floor(Math.random() * 5000) + 500,
      });
    }
    
    cases.push({
      id: crypto.randomUUID(),
      user_id: 'demo-user',
      party_name: parties[Math.floor(Math.random() * parties.length)],
      case_number: `${caseType.substring(0, 3).toUpperCase()}-${new Date().getFullYear()}-${1000 + i}`,
      court_name: court,
      jurisdiction: jurisdiction,
      case_type: caseType,
      filing_date: filingDate.toISOString().split('T')[0],
      status: status,
      next_date: nextHearingDate.toISOString().split('T')[0],
      previous_date: previousHearingDate.toISOString().split('T')[0],
      created_at: createdDate.toISOString(),
      updated_at: new Date().toISOString(),
      hearings: hearings
    });
  }
  
  return cases;
}

// Generate example documents for the app
export function generateExampleDocuments(count = 15) {
  const documentTypes = ['Contract', 'Pleading', 'Motion', 'Brief', 'Affidavit', 'Order', 'Judgment', 'Settlement'];
  const fileTypes = ['PDF', 'DOCX', 'DOC', 'TXT'];
  const caseIds = JSON.parse(localStorage.getItem('cases') || '[]').map((c: any) => c.id);
  
  const documents = [];
  
  for (let i = 0; i < count; i++) {
    const createdDate = new Date();
    createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 180));
    
    const docType = documentTypes[Math.floor(Math.random() * documentTypes.length)];
    const fileType = fileTypes[Math.floor(Math.random() * fileTypes.length)];
    
    documents.push({
      id: crypto.randomUUID(),
      name: `${docType} - ${i + 1}.${fileType.toLowerCase()}`,
      type: docType,
      size: Math.floor(Math.random() * 5000) + 100 + 'KB',
      case_id: caseIds.length > 0 ? caseIds[Math.floor(Math.random() * caseIds.length)] : '',
      created_at: createdDate.toISOString(),
      updated_at: new Date().toISOString(),
      url: '#',
    });
  }
  
  return documents;
}
