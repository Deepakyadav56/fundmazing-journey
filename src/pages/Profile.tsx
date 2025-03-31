
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  User, 
  Wallet, 
  Shield, 
  FileText, 
  Calculator, 
  Share2,
  HelpCircle, 
  LogOut 
} from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ProfileOption {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
  action: () => void;
  badge?: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
    });
    navigate('/');
  };
  
  const profileOptions: ProfileOption[] = [
    {
      icon: User,
      title: "Personal Information",
      subtitle: "Manage your profile details",
      action: () => toast({ title: "Profile information coming soon" }),
    },
    {
      icon: Shield,
      title: "KYC Information",
      subtitle: "Your KYC is complete",
      action: () => toast({ title: "KYC information coming soon" }),
      badge: "Verified"
    },
    {
      icon: Wallet,
      title: "Bank Accounts",
      subtitle: "Manage your linked accounts",
      action: () => toast({ title: "Bank account management coming soon" }),
    },
    {
      icon: FileText,
      title: "Transaction History",
      subtitle: "View all your past transactions",
      action: () => toast({ title: "Transaction history coming soon" }),
    },
    {
      icon: Calculator,
      title: "SIP Calculator",
      subtitle: "Plan your investments",
      action: () => navigate('/calculator'),
    },
    {
      icon: Share2,
      title: "Refer & Earn",
      subtitle: "Invite friends and earn rewards",
      action: () => toast({ title: "Referral program coming soon" }),
    },
    {
      icon: HelpCircle,
      title: "Help & Support",
      subtitle: "FAQs and contact information",
      action: () => toast({ title: "Help & support coming soon" }),
    },
  ];
  
  return (
    <PageContainer title="Profile">
      <div className="mb-6">
        <Card className="card-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-fundeasy-green rounded-full flex items-center justify-center text-white text-2xl">
                {/* Display first letter of name */}
                J
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold">John Doe</h2>
                <p className="text-gray-500">john.doe@example.com</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-3">
        {profileOptions.map((option, index) => (
          <Card 
            key={index} 
            className="cursor-pointer card-shadow hover-scale"
            onClick={option.action}
          >
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-fundeasy-green">
                  <option.icon size={20} />
                </div>
                <div className="ml-3 flex-grow">
                  <h3 className="font-medium">{option.title}</h3>
                  {option.subtitle && (
                    <p className="text-sm text-gray-500">{option.subtitle}</p>
                  )}
                </div>
                {option.badge ? (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    {option.badge}
                  </span>
                ) : (
                  <ChevronRight size={18} className="text-gray-400" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        
        <Button
          variant="outline"
          className="w-full text-fundeasy-red hover:text-fundeasy-red hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut size={18} className="mr-2" />
          Log Out
        </Button>
      </div>
    </PageContainer>
  );
};

export default Profile;
