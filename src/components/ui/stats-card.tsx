
import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: number;
  className?: string;
  icon?: React.ReactNode;
}

const StatsCard = ({
  title,
  value,
  subtitle,
  trend,
  className,
  icon
}: StatsCardProps) => {
  const isPositiveTrend = trend !== undefined && trend >= 0;
  
  return (
    <Card className={cn("stat-card", className)}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-xl font-semibold mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
        {icon && <div className="text-fundeasy-green">{icon}</div>}
      </div>
      
      {trend !== undefined && (
        <div className={`flex items-center mt-2 text-sm ${isPositiveTrend ? 'text-fundeasy-green' : 'text-fundeasy-red'}`}>
          {isPositiveTrend ? (
            <>
              <TrendingUp size={16} className="mr-1" />
              <span>+{trend}%</span>
            </>
          ) : (
            <>
              <TrendingDown size={16} className="mr-1" />
              <span>{trend}%</span>
            </>
          )}
        </div>
      )}
    </Card>
  );
};

export default StatsCard;
