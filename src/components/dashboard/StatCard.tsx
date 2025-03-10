
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  bgGradient?: string;
}

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  bgGradient = 'from-primary/10 to-primary/30' 
}: StatCardProps) => {
  return (
    <div className={`rounded-xl p-6 shadow-lg border border-white/80 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 animate-fade-in relative overflow-hidden group`}>
      {/* Background gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
      
      {/* Icon in background (decorative) */}
      <div className="absolute right-0 bottom-0 opacity-5 transform translate-x-1/4 translate-y-1/4">
        <Icon size={100} />
      </div>
      
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="text-neutral-600 text-sm font-medium">{title}</p>
          <h3 className="text-4xl font-bold mt-2 text-neutral-900">{value}</h3>
          {trend && (
            <p className={`text-sm mt-2 flex items-center ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              <span className="ml-1 text-xs text-neutral-500">vs last month</span>
            </p>
          )}
        </div>
        <div className="p-3 bg-gradient-to-br from-white/80 to-blue-50/80 rounded-lg shadow-md border border-white/60">
          <Icon className="text-primary" size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
