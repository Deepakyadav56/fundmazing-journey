
import React, { ReactNode } from 'react';
import BottomNavbar from './BottomNavbar';
import { ArrowLeft } from 'lucide-react';
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
  headerRight
}: PageContainerProps) => {
  const navigate = useNavigate();
  
  return (
    <div className={cn("min-h-screen bg-gradient-to-b from-fundeasy-light-green to-white pb-16", className)}>
      {(title || showBackButton) && (
        <div className={cn("sticky top-0 z-10 bg-white/90 backdrop-blur-md shadow-sm", headerClassName)}>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              {showBackButton && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => navigate(-1)}
                >
                  <ArrowLeft size={18} />
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
      <div className={cn("p-4 animate-fade-in", contentClassName)}>
        {children}
      </div>
      {showNavbar && <BottomNavbar />}
    </div>
  );
};

export default PageContainer;
