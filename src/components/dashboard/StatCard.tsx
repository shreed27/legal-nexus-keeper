
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

const StatCard = ({ title, value, icon: Icon, trend, bgGradient = 'from-primary/10 to-primary/30' }: StatCardProps) => {
  return (
    <div className={`rounded-xl p-6 shadow-lg border border-white/60 bg-gradient-to-br ${bgGradient} backdrop-blur-sm hover:shadow-xl transition-all duration-300 animate-fade-in`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-neutral-600 text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold mt-2 gradient-text">{value}</h3>
          {trend && (
            <p className={`text-sm mt-2 flex items-center ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              <span className="ml-1 text-xs text-neutral-500">vs last month</span>
            </p>
          )}
        </div>
        <div className="p-3 bg-white/70 rounded-lg shadow-md">
          <Icon className="text-primary" size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
