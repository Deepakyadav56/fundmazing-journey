
import React from 'react';
import { cn } from '@/lib/utils';

interface FundLogoImageProps {
  fundName: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const FundLogoImage: React.FC<FundLogoImageProps> = ({
  fundName,
  size = 'md',
  className
}) => {
  // Generate a consistent background color based on the fund name
  const getColorClass = (name: string) => {
    const colors = [
      'bg-gradient-to-br from-blue-400 to-blue-600',
      'bg-gradient-to-br from-green-400 to-green-600', 
      'bg-gradient-to-br from-amber-400 to-amber-600',
      'bg-gradient-to-br from-purple-400 to-purple-600',
      'bg-gradient-to-br from-red-400 to-red-600',
      'bg-gradient-to-br from-indigo-400 to-indigo-600',
      'bg-gradient-to-br from-pink-400 to-pink-600',
      'bg-gradient-to-br from-emerald-400 to-emerald-600',
    ];
    
    // Use a simple hash function to get a consistent index
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };
  
  const getInitials = (name: string) => {
    // Split by spaces or hyphens
    const words = name.split(/[\s-]+/);
    
    // Take first letters (max 2)
    let initials = '';
    for (let i = 0; i < Math.min(2, words.length); i++) {
      if (words[i].length > 0) {
        initials += words[i][0].toUpperCase();
      }
    }
    
    return initials;
  };
  
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg'
  };
  
  const initials = getInitials(fundName);
  const colorClass = getColorClass(fundName);
  
  return (
    <div 
      className={cn(
        'rounded-full flex items-center justify-center text-white font-semibold shadow-sm',
        colorClass,
        sizeClasses[size],
        className
      )}
    >
      {initials}
    </div>
  );
};

export default FundLogoImage;
