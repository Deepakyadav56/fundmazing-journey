
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, TrendingUp, Wallet, User } from 'lucide-react';

const BottomNavbar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/dashboard", name: "Home", icon: Home },
    { path: "/explore", name: "Explore", icon: Search },
    { path: "/market-news", name: "Market", icon: TrendingUp },
    { path: "/portfolio", name: "Portfolio", icon: Wallet },
    { path: "/profile", name: "Profile", icon: User },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-nav py-3 px-4 flex justify-around z-50 rounded-t-2xl border-t border-gray-100">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link 
            key={item.path} 
            to={item.path} 
            className="flex flex-col items-center justify-center w-16"
          >
            <div className={`p-2 rounded-full transition-all duration-300 ${
              isActive 
                ? 'bg-fundeasy-accent-bg text-fundeasy-blue' 
                : 'text-gray-400'
            }`}>
              <item.icon size={20} />
            </div>
            <span className={`text-xs mt-1 font-medium transition-colors ${
              isActive ? 'text-fundeasy-blue' : 'text-gray-500'
            }`}>{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNavbar;
