
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, PieChart, User } from 'lucide-react';

const BottomNavbar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/dashboard", name: "Home", icon: Home },
    { path: "/explore", name: "Explore", icon: Search },
    { path: "/portfolio", name: "Portfolio", icon: PieChart },
    { path: "/profile", name: "Profile", icon: User },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 flex justify-around z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link 
            key={item.path} 
            to={item.path} 
            className={`flex flex-col items-center justify-center w-16 ${
              isActive ? 'text-fundeasy-green' : 'text-gray-500'
            }`}
          >
            <item.icon size={20} />
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNavbar;
