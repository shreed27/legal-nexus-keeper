
import { Scale, Briefcase, Clock, Calendar } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const Dashboard = () => {
  const [documentCount, setDocumentCount] = useState(0);
  const [caseStats, setCaseStats] = useState({
    totalCases: 0,
    pendingHearings: 0,
    upcomingHearings: 0
  });
  const isMobile = useIsMobile();

  useEffect(() => {
    const storedFiles = localStorage.getItem('storedFiles');
    if (storedFiles) {
      setDocumentCount(JSON.parse(storedFiles).length);
    }

    const storedCases = JSON.parse(localStorage.getItem('cases') || '[]');
    const today = new Date();
    const upcomingHearings = storedCases.reduce((count: number, case_: any) => {
      const nextDate = new Date(case_.next_date);
      return nextDate > today ? count + 1 : count;
    }, 0);

    setCaseStats({
      totalCases: storedCases.length,
      pendingHearings: storedCases.reduce((count: number, case_: any) => 
        count + (case_.hearings?.length || 0), 0),
      upcomingHearings
    });
  }, []);

  const stats = [
    { 
      title: 'Active Cases', 
      value: caseStats.totalCases, 
      icon: Scale, 
      trend: { value: 12, isPositive: true } 
    },
    { 
      title: 'Documents', 
      value: documentCount, 
      icon: Briefcase 
    },
    { 
      title: 'Total Hearings', 
      value: caseStats.pendingHearings, 
      icon: Clock 
    },
    { 
      title: 'Upcoming Hearings', 
      value: caseStats.upcomingHearings, 
      icon: Calendar 
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-light">
      <Sidebar />
      <Header />
      
      <main className={`transition-all duration-300 ${isMobile ? 'ml-0' : 'ml-64'} pt-20 p-4 md:p-8`}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-neutral-dark mb-8 animate-fade-in">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
            <div className="glass-card p-6 animate-fade-in">
              <h2 className="text-xl font-bold mb-4">Recent Cases</h2>
              <div className="space-y-4">
                {JSON.parse(localStorage.getItem('cases') || '[]')
                  .slice(0, 3)
                  .map((case_: any, i: number) => (
                    <div key={i} className="p-4 glass-card hover:bg-white/50 transition-colors">
                      <h3 className="font-medium">{case_.party_name}</h3>
                      <p className="text-sm text-neutral-600 mt-1">Case #{case_.case_number}</p>
                    </div>
                  ))}
              </div>
            </div>

            <div className="glass-card p-6 animate-fade-in">
              <h2 className="text-xl font-bold mb-4">Upcoming Hearings</h2>
              <div className="space-y-4">
                {JSON.parse(localStorage.getItem('cases') || '[]')
                  .filter((case_: any) => new Date(case_.next_date) > new Date())
                  .slice(0, 3)
                  .map((case_: any, i: number) => (
                    <div key={i} className="p-4 glass-card hover:bg-white/50 transition-colors">
                      <h3 className="font-medium">{case_.party_name}</h3>
                      <p className="text-sm text-neutral-600 mt-1">Next Hearing: {case_.next_date}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
