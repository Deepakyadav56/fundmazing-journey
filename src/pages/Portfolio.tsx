
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, BarChart2, Calendar, PieChart, 
  Target, Eye, Clock, List, EyeOff, Info, TrendingUp,
  ArrowUp, ArrowDown, HelpCircle, FilterX
} from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import StatsCard from '@/components/ui/stats-card';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import FundLogo from '@/components/funds/FundLogo';
import { mockMutualFunds, mockUserInvestments } from '@/utils/mockData';

const Portfolio = () => {
  const navigate = useNavigate();
  const [hidePortfolio, setHidePortfolio] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Mock portfolio summary
  const portfolioSummary = {
    totalInvestment: 50000,
    currentValue: 55000,
    returns: 10,
    absoluteReturns: 5000,
    sipAmount: 7000,
    totalFunds: 4,
    activeSips: 3,
    xirr: 12.8 // XIRR (Extended Internal Rate of Return)
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

  // Sample portfolio holdings for visualization
  const holdings = mockUserInvestments.map(investment => {
    const fund = mockMutualFunds.find(f => f.id === investment.fundId);
    return {
      ...investment,
      fundName: fund?.name || "Unknown Fund",
      returnPercentage: ((investment.currentValue || 0) - investment.amount) / investment.amount * 100,
      returnAmount: (investment.currentValue || 0) - investment.amount
    };
  });

  return (
    <PageContainer title="Portfolio">
      {/* Portfolio Summary */}
      <Card className="mb-6 bg-gradient-to-br from-green-50 to-blue-50">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Your Investments</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setHidePortfolio(!hidePortfolio)}
              className="h-8 w-8"
            >
              {hidePortfolio ? <EyeOff size={18} /> : <Eye size={18} />}
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-y-4 gap-x-6">
            <div>
              <p className="text-sm text-gray-500">Invested</p>
              <p className="text-xl font-semibold">
                {hidePortfolio ? '••••••' : `₹${portfolioSummary.totalInvestment.toLocaleString()}`}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Current Value</p>
              <p className="text-xl font-semibold">
                {hidePortfolio ? '••••••' : `₹${portfolioSummary.currentValue.toLocaleString()}`}
              </p>
            </div>
            
            <div>
              <div className="flex items-center gap-1">
                <p className="text-sm text-gray-500">Returns</p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" className="h-4 w-4 p-0">
                        <Info size={12} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Absolute returns on your investments</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-lg font-semibold text-fundeasy-green">
                {hidePortfolio ? '••••••' : (
                  <>
                    {portfolioSummary.returns}% 
                    <span className="text-xs ml-1">
                      (₹{portfolioSummary.absoluteReturns.toLocaleString()})
                    </span>
                  </>
                )}
              </p>
            </div>
            
            <div>
              <div className="flex items-center gap-1">
                <p className="text-sm text-gray-500">XIRR</p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" className="h-4 w-4 p-0">
                        <Info size={12} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Extended Internal Rate of Return</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-lg font-semibold text-fundeasy-green">
                {hidePortfolio ? '••••••' : `${portfolioSummary.xirr}%`}
              </p>
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
          value={hidePortfolio ? "••" : portfolioSummary.activeSips.toString()}
          subtitle="Next SIP in 5 days"
          icon={<Clock size={18} />}
        />
        <StatsCard
          title="Total Funds"
          value={hidePortfolio ? "••" : portfolioSummary.totalFunds.toString()}
          subtitle="Across categories"
          icon={<PieChart size={18} />}
        />
      </div>
      
      {/* Portfolio Holdings */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-medium text-lg">Your Holdings</h2>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs h-8"
            onClick={() => navigate('/investment-history')}
          >
            View All
          </Button>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full mb-4">
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
            <TabsTrigger value="equity" className="flex-1">Equity</TabsTrigger>
            <TabsTrigger value="debt" className="flex-1">Debt</TabsTrigger>
            <TabsTrigger value="hybrid" className="flex-1">Hybrid</TabsTrigger>
          </TabsList>
        </Tabs>

        {holdings.length === 0 ? (
          <Card className="p-6 text-center">
            <FilterX size={48} className="mx-auto text-gray-300 mb-2" />
            <p className="text-gray-500">No investments found</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {holdings.map((holding, index) => (
              <Card key={index} className="card-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <FundLogo fundName={holding.fundName} />
                    
                    <div className="flex-1">
                      <h3 className="font-medium line-clamp-2">{holding.fundName}</h3>
                      <div className="flex text-xs text-gray-500 mt-1">
                        <span className="mr-2">
                          {holding.investmentType === 'SIP' ? 'SIP' : 'Lumpsum'} 
                        </span>
                        <span>
                          {new Date(holding.investmentDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-baseline mt-3">
                    <div>
                      <p className="text-xs text-gray-500">Invested</p>
                      <p className="font-medium">
                        {hidePortfolio ? '••••••' : `₹${holding.amount.toLocaleString()}`}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Current Value</p>
                      <p className="font-medium">
                        {hidePortfolio ? '••••••' : `₹${holding.currentValue?.toLocaleString()}`}
                      </p>
                    </div>
                  </div>

                  <div className="mt-2">
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-500">Returns</p>
                      <div className={`flex items-center text-xs ${holding.returnPercentage >= 0 ? 'text-fundeasy-green' : 'text-fundeasy-red'}`}>
                        {holding.returnPercentage >= 0 ? (
                          <ArrowUp size={12} className="mr-0.5" />
                        ) : (
                          <ArrowDown size={12} className="mr-0.5" />
                        )}
                        <span className="font-medium">
                          {hidePortfolio ? '••••' : `${Math.abs(holding.returnPercentage).toFixed(2)}%`}
                        </span>
                      </div>
                    </div>
                    
                    <Progress 
                      value={50 + (holding.returnPercentage / 2)} 
                      className="h-1 mt-1" 
                      indicatorClassName={holding.returnPercentage >= 0 ? "bg-fundeasy-green" : "bg-fundeasy-red"}
                    />
                  </div>
                  
                  <div className="flex justify-end mt-3">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs text-fundeasy-blue"
                      onClick={() => navigate(`/fund/${holding.fundId}`)}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
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
