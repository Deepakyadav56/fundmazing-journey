
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavigationItem {
  name: string;
  path: string;
}

const TopNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navigationItems: NavigationItem[] = [
    { name: 'Explore', path: '/explore' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'SIPs', path: '/sip-dashboard' },
    { name: 'Watchlist', path: '/watchlist' },
  ];

  return (
    <div className="flex overflow-x-auto scrollbar-none py-2 border-b">
      {navigationItems.map((item) => (
        <button
          key={item.name}
          onClick={() => navigate(item.path)}
          className={cn(
            'px-4 py-1 whitespace-nowrap transition-colors text-sm font-medium',
            currentPath === item.path
              ? 'text-fundeasy-blue border-b-2 border-fundeasy-blue'
              : 'text-gray-600'
          )}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default TopNavigation;
