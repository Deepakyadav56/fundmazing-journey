
import React, { ReactNode } from 'react';
import BottomNavbar from './BottomNavbar';

interface PageContainerProps {
  children: ReactNode;
  showNavbar?: boolean;
  title?: string;
}

const PageContainer = ({ 
  children, 
  showNavbar = true, 
  title 
}: PageContainerProps) => {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {title && (
        <div className="bg-white shadow-sm">
          <h1 className="text-xl font-semibold p-4">{title}</h1>
        </div>
      )}
      <div className="p-4 animate-fade-in">
        {children}
      </div>
      {showNavbar && <BottomNavbar />}
    </div>
  );
};

export default PageContainer;
