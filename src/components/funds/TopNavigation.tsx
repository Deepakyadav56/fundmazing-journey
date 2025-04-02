
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
    <div className="flex overflow-x-auto scrollbar-none border-b">
      <div className="flex w-full">
        {navigationItems.map((item) => (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className={cn(
              'px-4 py-2 whitespace-nowrap transition-colors text-sm font-medium flex-1',
              currentPath === item.path
                ? 'text-fundeasy-blue border-b-2 border-fundeasy-blue'
                : 'text-gray-600'
            )}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopNavigation;
