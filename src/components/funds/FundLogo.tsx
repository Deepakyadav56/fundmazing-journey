
import React from 'react';
import { Bank, LineChart, Wallet, TrendingUp, BarChart3 } from 'lucide-react';

interface FundLogoProps {
  fundName: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const FundLogo: React.FC<FundLogoProps> = ({ fundName, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  // Map fund names to their respective logos or colors
  // In a production app, this would use actual logo images from a CDN
  const fundToLogo: Record<string, { icon: React.ReactNode; bgColor: string }> = {
    'HDFC': { 
      icon: <Bank size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} />, 
      bgColor: 'bg-blue-100' 
    },
    'SBI': { 
      icon: <Bank size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} />, 
      bgColor: 'bg-blue-100' 
    },
    'ICICI': { 
      icon: <Bank size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} />, 
      bgColor: 'bg-rose-100' 
    },
    'Axis': { 
      icon: <Bank size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} />, 
      bgColor: 'bg-purple-100' 
    },
    'Kotak': { 
      icon: <Bank size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} />, 
      bgColor: 'bg-red-100' 
    },
    'Aditya Birla': { 
      icon: <Bank size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} />, 
      bgColor: 'bg-green-100' 
    },
    'Nippon': { 
      icon: <TrendingUp size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} />, 
      bgColor: 'bg-yellow-100' 
    },
    'Mirae': { 
      icon: <LineChart size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} />, 
      bgColor: 'bg-indigo-100' 
    },
    'FundEasy': { 
      icon: <Wallet size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} />, 
      bgColor: 'bg-gradient-to-r from-fundeasy-blue to-fundeasy-green' 
    }
  };

  // Find the matching logo based on the fund name
  const findLogo = () => {
    const key = Object.keys(fundToLogo).find(key => fundName.includes(key));
    return key ? fundToLogo[key] : { 
      icon: <BarChart3 size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} />, 
      bgColor: 'bg-gray-100' 
    };
  };

  const { icon, bgColor } = findLogo();

  return (
    <div className={`rounded-full flex items-center justify-center text-gray-700 ${bgColor} ${sizeClasses[size]} ${className}`}>
      {icon}
    </div>
  );
};

export default FundLogo;
