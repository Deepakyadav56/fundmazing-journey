
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

const navigationMenuTriggerStyle = cva(
  "group inline-flex w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
);

interface MainNavigationProps {
  items: {
    title: string;
    href: string;
    description?: string;
  }[];
  className?: string;
}

export function MainNavigationMenu({ items, className }: MainNavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <NavigationMenu className={cn("relative z-10 w-full max-w-full", className)}>
      <NavigationMenuList className="flex w-full space-x-1">
        {items.map((item) => (
          <NavigationMenuItem key={item.href} className="flex-1">
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "cursor-pointer transition-colors",
                isActive(item.href)
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-primary"
              )}
              onClick={() => navigate(item.href)}
            >
              {item.title}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
