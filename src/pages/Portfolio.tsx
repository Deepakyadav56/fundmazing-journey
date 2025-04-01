
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, BarChart2, Calendar, PieChart, Target, Eye, Clock, List, TrendingUp } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const Portfolio = () => {
  const navigate = useNavigate();

  // Mock portfolio summary
  const portfolioSummary = {
    totalInvestment: 50000,
    currentValue: 55000,
    returns: 10,
    sipAmount: 7000,
    totalFunds: 4,
    activeSips: 3,
    goalProgress: 65
  };
  
  // Actions to navigate to different screens
  const portfolioActions = [
    {
      icon: <PieChart size={20} />,
      title: "My Investments",
      description: "View your active mutual fund investments",
      action: () => navigate('/investment-history'),
      color: "bg-blue-100 text-fundeasy-blue"
    },
    {
      icon: <Calendar size={20} />,
      title: "SIP Dashboard",
      description: "Manage your systematic investment plans",
      action: () => navigate('/sip-dashboard'),
      color: "bg-green-100 text-green-700"
    },
    {
      icon: <Target size={20} />,
      title: "Goals",
      description: "Track progress towards your financial goals",
      action: () => navigate('/goals'),
      color: "bg-amber-100 text-amber-700"
    },
    {
      icon: <Eye size={20} />,
      title: "Watchlist",
      description: "Monitor funds you're interested in",
      action: () => navigate('/watchlist'),
      color: "bg-purple-100 text-purple-700"
    },
    {
      icon: <List size={20} />,
      title: "Transactions",
      description: "View your investment history",
      action: () => navigate('/transactions'),
      color: "bg-indigo-100 text-indigo-700"
    },
    {
      icon: <BarChart2 size={20} />,
      title: "Compare Funds",
      description: "Compare performance of different funds",
      action: () => navigate('/fund-comparison'),
      color: "bg-pink-100 text-pink-700"
    }
  ];

  return (
    <PageContainer title="Portfolio" showBackButton>
      {/* Portfolio Summary Card */}
      <Card className="mb-6 bg-white border-none shadow-card">
        <CardContent className="p-5">
          <h2 className="text-xl font-bold mb-5">Your Investments</h2>
          
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-500">Current Value</p>
              <p className="text-2xl font-semibold">₹{portfolioSummary.currentValue.toLocaleString()}</p>
            </div>
            
            <div>
              <Badge className="bg-green-100 text-green-700 border-none py-1 px-3 font-medium">
                <TrendingUp size={14} className="mr-1" />
                {portfolioSummary.returns}%
              </Badge>
            </div>
          </div>
          
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Invested</span>
            <span>₹{portfolioSummary.totalInvestment.toLocaleString()}</span>
          </div>
          
          <Progress 
            value={(portfolioSummary.currentValue / portfolioSummary.totalInvestment) * 100}
            className="h-2 mb-5"
            indicatorClassName="bg-fundeasy-blue"
          />
          
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div className="bg-fundeasy-accent-bg rounded-xl p-3">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Monthly SIP</p>
                <Calendar size={16} className="text-fundeasy-blue" />
              </div>
              <p className="text-lg font-semibold mt-1">₹{portfolioSummary.sipAmount.toLocaleString()}</p>
            </div>
            
            <div className="bg-fundeasy-accent-bg rounded-xl p-3">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Goal Progress</p>
                <Target size={16} className="text-fundeasy-blue" />
              </div>
              <p className="text-lg font-semibold mt-1">{portfolioSummary.goalProgress}%</p>
            </div>
          </div>
          
          <Button 
            className="w-full bg-fundeasy-blue hover:bg-fundeasy-light-blue shadow-button"
            onClick={() => navigate('/explore')}
          >
            Invest More
          </Button>
        </CardContent>
      </Card>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="shadow-card border-none">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Active SIPs</p>
              <div className="w-8 h-8 rounded-full bg-fundeasy-accent-bg flex items-center justify-center">
                <Clock size={16} className="text-fundeasy-blue" />
              </div>
            </div>
            <p className="text-xl font-bold mt-2">{portfolioSummary.activeSips}</p>
            <p className="text-xs text-gray-500 mt-1">Next SIP in 5 days</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-card border-none">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Total Funds</p>
              <div className="w-8 h-8 rounded-full bg-fundeasy-accent-bg flex items-center justify-center">
                <PieChart size={16} className="text-fundeasy-blue" />
              </div>
            </div>
            <p className="text-xl font-bold mt-2">{portfolioSummary.totalFunds}</p>
            <p className="text-xs text-gray-500 mt-1">Across categories</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Investment Actions */}
      <h2 className="font-medium text-lg mb-3">Manage Investments</h2>
      <div className="space-y-3 mb-20">
        {portfolioActions.map((action, index) => (
          <Card 
            key={index} 
            className="cursor-pointer hover:shadow-card-hover transition shadow-card border-none"
            onClick={action.action}
          >
            <CardContent className="p-4 flex items-center">
              <div className={`w-10 h-10 rounded-full ${action.color} flex items-center justify-center mr-4`}>
                {action.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{action.title}</h3>
                <p className="text-sm text-gray-500">{action.description}</p>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </CardContent>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
};

export default Portfolio;
