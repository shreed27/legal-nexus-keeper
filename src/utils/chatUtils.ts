
export const generateResponse = (userMessage: string): string => {
  if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
    return "Hello! I'm your AVENIX.PRO Legal Assistant. How can I help you with your legal questions today?";
  }
  
  // Check if the message is about legal topics
  if (!userMessage.toLowerCase().includes('law') && 
      !userMessage.toLowerCase().includes('legal') && 
      !userMessage.toLowerCase().includes('court') && 
      !userMessage.toLowerCase().includes('rights') &&
      !userMessage.toLowerCase().includes('contract') &&
      !userMessage.toLowerCase().includes('case')) {
    return "I'm your AVENIX.PRO Legal Assistant. I specialize in legal matters. Could you please rephrase your question in a legal context?";
  }
  
  // Default legal response
  return "Based on your legal question, here's my analysis: [Legal response would be generated here]. Please note that this is general legal information and not legal advice. For specific legal advice, please consult with a qualified attorney.";
};
