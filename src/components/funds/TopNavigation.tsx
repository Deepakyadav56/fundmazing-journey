
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavigationItem {
  name: string;
  path: string;
  badge?: number;
}

const TopNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navigationItems: NavigationItem[] = [
    { name: 'Explore', path: '/explore' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'SIPs', path: '/sip-dashboard', badge: 3 },
    { name: 'Watchlist', path: '/watchlist', badge: 4 },
  ];

  return (
    <div className="flex overflow-x-auto scrollbar-none border-b sticky top-0 bg-fundeasy-light-gray z-10">
      <div className="flex w-full">
        {navigationItems.map((item) => (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className={cn(
              'px-4 py-3 whitespace-nowrap transition-colors text-sm font-medium flex-1 relative',
              currentPath === item.path
                ? 'text-fundeasy-green'
                : 'text-fundeasy-dark-gray'
            )}
          >
            {item.name}
            {item.badge && (
              <span className="absolute top-1 right-2 bg-fundeasy-red text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                {item.badge}
              </span>
            )}
            {currentPath === item.path && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-fundeasy-green" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopNavigation;
