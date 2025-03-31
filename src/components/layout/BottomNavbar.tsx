
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, PieChart, User, TrendingUp } from 'lucide-react';

const BottomNavbar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/dashboard", name: "Home", icon: Home },
    { path: "/explore", name: "Explore", icon: Search },
    { path: "/market-news", name: "Market", icon: TrendingUp },
    { path: "/portfolio", name: "Portfolio", icon: PieChart },
    { path: "/profile", name: "Profile", icon: User },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 glass-effect py-2 px-4 flex justify-around z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link 
            key={item.path} 
            to={item.path} 
            className={`flex flex-col items-center justify-center w-16 ${
              isActive 
                ? 'text-fundeasy-green font-medium' 
                : 'text-gray-500'
            }`}
          >
            <div className={`relative ${isActive ? 'animate-bounce-subtle' : ''}`}>
              <div className={`p-1.5 rounded-full ${isActive ? 'bg-green-100' : ''}`}>
                <item.icon size={20} />
              </div>
              {isActive && (
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-fundeasy-green rounded-full" />
              )}
            </div>
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNavbar;
