
import React from 'react';
import { Card, CardContent } from './card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | React.ReactNode;
  subtitle?: string;
  trend?: number;
  icon?: React.ReactNode;
  className?: string;
}

const StatsCard = ({
  title,
  value,
  subtitle,
  trend,
  icon,
  className
}: StatsCardProps) => {
  return (
    <Card className={cn("shadow-card border-none", className)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          {icon && <div className="text-gray-500">{icon}</div>}
        </div>
        
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xl font-bold">{value}</div>
            {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
          </div>
          
          {trend !== undefined && (
            <div className={`flex items-center ${trend >= 0 ? 'text-green-600' : 'text-red-500'}`}>
              {trend >= 0 ? (
                <ArrowUpRight size={16} className="mr-1" />
              ) : (
                <ArrowDownRight size={16} className="mr-1" />
              )}
              <span className="text-sm font-medium">{Math.abs(trend)}%</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
