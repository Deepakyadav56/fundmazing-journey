
import React from 'react';
import { cn } from '@/lib/utils';
import { Building } from 'lucide-react';

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
      'bg-red-100',
      'bg-blue-100',
      'bg-green-100', 
      'bg-yellow-100',
      'bg-purple-100',
      'bg-pink-100',
      'bg-indigo-100',
      'bg-emerald-100',
    ];
    
    // Use a simple hash function to get a consistent index
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };
  
  const getInitials = (name: string) => {
    // For specific AMCs, return their first letter
    const knownAMCs = ['HDFC', 'SBI', 'ICICI', 'Axis', 'Kotak', 'Nippon', 'Aditya', 'Mirae'];
    
    for (const amc of knownAMCs) {
      if (name.includes(amc)) {
        return amc[0];
      }
    }
    
    // Default: Split by spaces or hyphens
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
        'rounded-full flex items-center justify-center text-black font-medium shadow-sm',
        colorClass,
        sizeClasses[size],
        className
      )}
    >
      <Building className="h-4 w-4" />
    </div>
  );
};

export default FundLogoImage;
