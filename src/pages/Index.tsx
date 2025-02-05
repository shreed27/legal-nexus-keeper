import { Scale, Briefcase, Clock, Calendar } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [documentCount, setDocumentCount] = useState(0);

  useEffect(() => {
    const storedFiles = localStorage.getItem('storedFiles');
    if (storedFiles) {
      setDocumentCount(JSON.parse(storedFiles).length);
    }
  }, []);

  const stats = [
    { title: 'Active Cases', value: 24, icon: Scale, trend: { value: 12, isPositive: true } },
    { title: 'Documents', value: documentCount, icon: Briefcase },
    { title: 'Pending Tasks', value: 8, icon: Clock },
    { title: 'Upcoming Hearings', value: 3, icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-neutral-light">
      <Sidebar />
      <Header />
      
      <main className="ml-64 pt-20 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-neutral-dark mb-8 animate-fade-in">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100 animate-fade-in">
              <h2 className="text-xl font-bold mb-4">Recent Cases</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="p-4 border border-neutral-100 rounded-lg hover:bg-neutral-50 transition-colors">
                    <h3 className="font-medium">Case #{2024001 + i}</h3>
                    <p className="text-sm text-neutral-600 mt-1">Last updated 2 hours ago</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100 animate-fade-in">
              <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="p-4 border border-neutral-100 rounded-lg hover:bg-neutral-50 transition-colors">
                    <h3 className="font-medium">Client Meeting</h3>
                    <p className="text-sm text-neutral-600 mt-1">Tomorrow at 10:00 AM</p>
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