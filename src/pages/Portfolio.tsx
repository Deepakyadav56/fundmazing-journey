
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, BarChart2, Calendar, PieChart, Target, Eye, Clock, List } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import StatsCard from '@/components/ui/stats-card';

const Portfolio = () => {
  const navigate = useNavigate();

  // Mock portfolio summary
  const portfolioSummary = {
    totalInvestment: 50000,
    currentValue: 55000,
    returns: 10,
    sipAmount: 7000,
    totalFunds: 4,
    activeSips: 3
  };
  
  // Actions to navigate to different screens
  const portfolioActions = [
    {
      icon: <PieChart size={20} />,
      title: "My Investments",
      description: "View your active mutual fund investments",
      action: () => navigate('/investment-history'),
      color: "bg-blue-50"
    },
    {
      icon: <Calendar size={20} />,
      title: "SIP Dashboard",
      description: "Manage your systematic investment plans",
      action: () => navigate('/sip-dashboard'),
      color: "bg-green-50"
    },
    {
      icon: <Target size={20} />,
      title: "Goals",
      description: "Track progress towards your financial goals",
      action: () => navigate('/goals'),
      color: "bg-amber-50"
    },
    {
      icon: <Eye size={20} />,
      title: "Watchlist",
      description: "Monitor funds you're interested in",
      action: () => navigate('/watchlist'),
      color: "bg-purple-50"
    },
    {
      icon: <List size={20} />,
      title: "Transactions",
      description: "View your investment history",
      action: () => navigate('/transactions'),
      color: "bg-indigo-50"
    },
    {
      icon: <BarChart2 size={20} />,
      title: "Compare Funds",
      description: "Compare performance of different funds",
      action: () => navigate('/fund-comparison'),
      color: "bg-pink-50"
    }
  ];

  return (
    <PageContainer title="Portfolio">
      {/* Portfolio Summary */}
      <Card className="mb-6 bg-gradient-to-br from-green-50 to-blue-50">
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-4">Your Investments</h2>
          
          <div className="grid grid-cols-2 gap-y-4 gap-x-6">
            <div>
              <p className="text-sm text-gray-500">Invested</p>
              <p className="text-xl font-semibold">₹{portfolioSummary.totalInvestment.toLocaleString()}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Current Value</p>
              <p className="text-xl font-semibold">₹{portfolioSummary.currentValue.toLocaleString()}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Returns</p>
              <p className="text-lg font-semibold text-fundeasy-green">
                {portfolioSummary.returns}% 
                <span className="text-xs ml-1">({(portfolioSummary.currentValue - portfolioSummary.totalInvestment).toLocaleString()})</span>
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Monthly SIP</p>
              <p className="text-lg font-semibold">₹{portfolioSummary.sipAmount.toLocaleString()}</p>
            </div>
          </div>
          
          <Button 
            className="w-full mt-4 bg-fundeasy-green hover:bg-fundeasy-dark-green"
            onClick={() => navigate('/explore')}
          >
            Invest More
          </Button>
        </CardContent>
      </Card>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <StatsCard
          title="Active SIPs"
          value={portfolioSummary.activeSips.toString()}
          subtitle="Next SIP in 5 days"
          icon={<Clock size={18} />}
        />
        <StatsCard
          title="Total Funds"
          value={portfolioSummary.totalFunds.toString()}
          subtitle="Across categories"
          icon={<PieChart size={18} />}
        />
      </div>
      
      {/* Investment Actions */}
      <h2 className="font-medium text-lg mb-3">Manage Investments</h2>
      <div className="space-y-3 mb-20">
        {portfolioActions.map((action, index) => (
          <Card 
            key={index} 
            className="cursor-pointer hover:shadow-md transition"
            onClick={action.action}
          >
            <CardContent className="p-4 flex items-center">
              <div className={`${action.color} p-2 rounded-lg mr-4`}>
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
