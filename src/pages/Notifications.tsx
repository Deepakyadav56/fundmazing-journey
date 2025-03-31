
import React from 'react';
import { Bell, ArrowRight, TrendingUp, Wallet, RefreshCw } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { NotificationItem } from '@/types';

// Mock notification data
const mockNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "SIP Investment Successful",
    description: "Your SIP for Axis Bluechip Fund of ₹5,000 was successful",
    time: "2 hours ago",
    read: false,
    type: "transaction"
  },
  {
    id: "2",
    title: "Market Alert",
    description: "Sensex up by 2% today, check your portfolio performance",
    time: "5 hours ago",
    read: false,
    type: "market"
  },
  {
    id: "3",
    title: "SIP Reminder",
    description: "Your next SIP installment for SBI Small Cap Fund is tomorrow",
    time: "1 day ago",
    read: true,
    type: "sip"
  },
  {
    id: "4",
    title: "Redemption Processed",
    description: "Your redemption request for HDFC Corporate Bond Fund is processed",
    time: "2 days ago",
    read: true,
    type: "transaction"
  },
  {
    id: "5",
    title: "New Feature Available",
    description: "Try our new Fund Comparison tool for better investment decisions",
    time: "3 days ago",
    read: true,
    type: "system"
  },
  {
    id: "6",
    title: "RBI Policy Update",
    description: "RBI keeps repo rate unchanged at 4%, what it means for your investments",
    time: "4 days ago",
    read: true,
    type: "market"
  },
];

const Notifications = () => {
  return (
    <PageContainer title="Notifications" showBackButton>
      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
          <TabsTrigger value="transactions" className="flex-1">Transactions</TabsTrigger>
          <TabsTrigger value="sip" className="flex-1">SIP</TabsTrigger>
          <TabsTrigger value="market" className="flex-1">Market</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="space-y-3">
            {mockNotifications.map(notification => (
              <NotificationCard key={notification.id} notification={notification} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="transactions">
          <div className="space-y-3">
            {mockNotifications
              .filter(n => n.type === 'transaction')
              .map(notification => (
                <NotificationCard key={notification.id} notification={notification} />
              ))
            }
          </div>
        </TabsContent>
        
        <TabsContent value="sip">
          <div className="space-y-3">
            {mockNotifications
              .filter(n => n.type === 'sip')
              .map(notification => (
                <NotificationCard key={notification.id} notification={notification} />
              ))
            }
          </div>
        </TabsContent>
        
        <TabsContent value="market">
          <div className="space-y-3">
            {mockNotifications
              .filter(n => n.type === 'market')
              .map(notification => (
                <NotificationCard key={notification.id} notification={notification} />
              ))
            }
          </div>
        </TabsContent>
      </Tabs>
      
      <Button variant="outline" className="w-full">
        Mark All as Read
      </Button>
    </PageContainer>
  );
};

interface NotificationCardProps {
  notification: NotificationItem;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notification }) => {
  const getIcon = () => {
    switch(notification.type) {
      case 'transaction':
        return <Wallet className="text-blue-500" />;
      case 'sip':
        return <RefreshCw className="text-green-500" />;
      case 'market':
        return <TrendingUp className="text-orange-500" />;
      default:
        return <Bell className="text-gray-500" />;
    }
  };
  
  return (
    <Card className={`cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start">
          <div className="w-10 h-10 flex-shrink-0 rounded-full bg-gray-100 flex items-center justify-center">
            {getIcon()}
          </div>
          <div className="ml-3 flex-grow">
            <div className="flex justify-between items-start">
              <h3 className={`font-medium ${!notification.read ? 'text-fundeasy-green' : ''}`}>
                {notification.title}
              </h3>
              <span className="text-xs text-gray-500">{notification.time}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
          </div>
          <div className="ml-2 flex items-center">
            <ArrowRight size={16} className="text-gray-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Notifications;
