
import React from 'react';
import { Bell } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationBadgeProps {
  notifications: Notification[];
  onRead?: (id: string) => void;
  onClearAll?: () => void;
}

const NotificationBadge = ({ 
  notifications,
  onRead,
  onClearAll 
}: NotificationBadgeProps) => {
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center text-[10px] bg-fundeasy-red text-white rounded-full">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-medium">Notifications</h3>
          {notifications.length > 0 && (
            <Button variant="ghost" size="sm" onClick={onClearAll}>
              Clear all
            </Button>
          )}
        </div>
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <p>No notifications</p>
          </div>
        ) : (
          <ScrollArea className="h-[300px]">
            <div className="divide-y">
              {notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-3 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-green-50' : ''}`}
                  onClick={() => onRead?.(notification.id)}
                >
                  <div className="flex justify-between">
                    <p className={`font-medium ${!notification.read ? 'text-fundeasy-green' : ''}`}>
                      {notification.title}
                    </p>
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBadge;
