
import React, { ReactNode } from 'react';
import BottomNavbar from './BottomNavbar';
import { ArrowLeft, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: ReactNode;
  showNavbar?: boolean;
  title?: string;
  showBackButton?: boolean;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
  headerClassName?: string;
  headerRight?: ReactNode;
  scrollable?: boolean;
}

const PageContainer = ({ 
  children, 
  showNavbar = true, 
  title,
  showBackButton = false,
  className,
  titleClassName,
  contentClassName,
  headerClassName,
  headerRight,
  scrollable = true,
}: PageContainerProps) => {
  const navigate = useNavigate();
  
  return (
    <div className={cn("flex flex-col min-h-screen bg-gradient-to-b from-fundeasy-light-green to-white", className)}>
      {(title || showBackButton) && (
        <div className={cn("sticky top-0 z-10 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100", headerClassName)}>
          <div className="flex items-center justify-between py-3 px-4">
            <div className="flex items-center gap-2">
              {showBackButton && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-9 w-9 rounded-full bg-fundeasy-light-gray hover:bg-fundeasy-medium-gray"
                  onClick={() => navigate(-1)}
                >
                  <ChevronLeft size={20} className="text-fundeasy-dark-gray" />
                </Button>
              )}
              {title && (
                <h1 className={cn("text-xl font-semibold text-fundeasy-dark-gray", titleClassName)}>{title}</h1>
              )}
            </div>
            {headerRight && (
              <div className="flex items-center">
                {headerRight}
              </div>
            )}
          </div>
        </div>
      )}
      <div 
        className={cn(
          "flex-1 p-4 animate-fade-in", 
          scrollable ? "overflow-y-auto" : "", 
          contentClassName
        )}
      >
        {children}
      </div>
      {showNavbar && <BottomNavbar />}
    </div>
  );
};

export default PageContainer;
