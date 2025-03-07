
import { Scale, Briefcase, Clock, Calendar, Activity, TrendingUp, Users } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
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
      trend: { value: 12, isPositive: true },
      bgGradient: 'from-primary/10 to-primary/20' 
    },
    { 
      title: 'Documents', 
      value: documentCount, 
      icon: Briefcase,
      bgGradient: 'from-secondary/10 to-secondary/20'
    },
    { 
      title: 'Total Hearings', 
      value: caseStats.pendingHearings, 
      icon: Clock,
      bgGradient: 'from-accent/10 to-accent/20'
    },
    { 
      title: 'Upcoming Hearings', 
      value: caseStats.upcomingHearings, 
      icon: Calendar,
      bgGradient: 'from-purple-400/10 to-purple-400/20'
    },
  ];

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl shadow-md">
            <Scale className="h-6 w-6 text-primary" />
          </div>
          <h1 className="page-title">Dashboard Overview</h1>
        </div>
        <p className="page-description">Monitor your legal practice performance and activity</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="glass-card p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold gradient-text">Recent Cases</h2>
            <div className="p-2 bg-primary/10 rounded-full">
              <Activity className="h-5 w-5 text-primary" />
            </div>
          </div>
          <div className="space-y-3">
            {JSON.parse(localStorage.getItem('cases') || '[]')
              .slice(0, 3)
              .map((case_: any, i: number) => (
                <div 
                  key={i} 
                  className="p-4 glass-card hover:bg-gradient-to-r hover:from-white hover:to-blue-50 transition-colors cursor-pointer"
                >
                  <h3 className="font-medium text-base">{case_.party_name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-neutral-500">Case #{case_.case_number}</p>
                    <div className="px-3 py-1 bg-primary/10 rounded-full text-xs text-primary font-medium">Active</div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="glass-card p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold gradient-text">Upcoming Hearings</h2>
            <div className="p-2 bg-accent/10 rounded-full">
              <TrendingUp className="h-5 w-5 text-accent" />
            </div>
          </div>
          <div className="space-y-3">
            {JSON.parse(localStorage.getItem('cases') || '[]')
              .filter((case_: any) => new Date(case_.next_date) > new Date())
              .slice(0, 3)
              .map((case_: any, i: number) => (
                <div 
                  key={i} 
                  className="p-4 glass-card hover:bg-gradient-to-r hover:from-white hover:to-blue-50 transition-colors cursor-pointer"
                >
                  <h3 className="font-medium text-base">{case_.party_name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-neutral-500">
                      <Clock className="h-3 w-3 inline mr-1" />
                      {new Date(case_.next_date).toLocaleDateString()}
                    </p>
                    <div className="px-3 py-1 bg-accent/10 rounded-full text-xs text-accent font-medium">Upcoming</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        
        <div className="glass-card p-6 animate-fade-in lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold gradient-text">Team Activity</h2>
            <div className="p-2 bg-secondary/10 rounded-full">
              <Users className="h-5 w-5 text-secondary" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 glass-card">
              <h3 className="text-sm font-medium text-neutral-500 mb-1">Documents Created</h3>
              <div className="text-2xl font-bold">24</div>
              <div className="text-xs text-green-500 mt-2">↑ 8% from last week</div>
            </div>
            
            <div className="p-4 glass-card">
              <h3 className="text-sm font-medium text-neutral-500 mb-1">Cases Assigned</h3>
              <div className="text-2xl font-bold">7</div>
              <div className="text-xs text-green-500 mt-2">↑ 12% from last week</div>
            </div>
            
            <div className="p-4 glass-card">
              <h3 className="text-sm font-medium text-neutral-500 mb-1">Hearings Attended</h3>
              <div className="text-2xl font-bold">12</div>
              <div className="text-xs text-red-500 mt-2">↓ 3% from last week</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
