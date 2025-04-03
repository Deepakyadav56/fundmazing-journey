
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, PieChart, User, TrendingUp, Bell } from 'lucide-react';

const BottomNavbar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/dashboard", name: "Home", icon: Home },
    { path: "/explore", name: "Explore", icon: Search },
    { path: "/market-news", name: "Market", icon: TrendingUp },
    { path: "/notifications", name: "Alerts", icon: Bell },
    { path: "/profile", name: "Profile", icon: User },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 glass-effect py-2.5 px-2 flex justify-around items-center z-50 border-t border-gray-100">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link 
            key={item.path} 
            to={item.path} 
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg ${
              isActive 
                ? 'text-fundeasy-green' 
                : 'text-gray-400'
            }`}
          >
            <div className={`relative mb-1 ${
              isActive ? 'animate-pulse-subtle' : ''
            }`}>
              <div className={`p-1 rounded-full ${
                isActive ? 'bg-fundeasy-light-green' : ''
              }`}>
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
              </div>
              {isActive && (
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-fundeasy-green rounded-full" />
              )}
            </div>
            <span className={`text-xs ${
              isActive ? 'font-medium' : ''
            }`}>{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNavbar;
