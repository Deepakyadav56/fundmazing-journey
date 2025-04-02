
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, ArrowUpRight, Calendar, ChevronRight, Bell, Filter, Zap, Calculator } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import StatsCard from '@/components/ui/stats-card';
import { mockMutualFunds } from '@/utils/mockData';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const Dashboard = () => {
  const navigate = useNavigate();
  const userName = "Priya"; // This would come from user context in a real app
  
  // Time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };
  
  // Get top 3 trending funds
  const trendingFunds = mockMutualFunds
    .sort((a, b) => b.returns.oneYear - a.returns.oneYear)
    .slice(0, 3);
  
  // Mocked portfolio data
  const portfolioData = {
    totalInvestment: 45000,
    currentValue: 47250,
    returns: {
      value: 2250,
      percentage: 5.0
    },
    sip: {
      active: 3,
      monthly: 5000,
      nextDate: "10 Aug"
    },
    goals: {
      count: 2,
      nearestGoal: "House Down Payment",
      progress: 65
    }
  };
  
  // Mocked market indices
  const marketIndices = [
    { name: "NIFTY 50", value: "22,474.05", change: "+0.24%", trending: true },
    { name: "SENSEX", value: "73,667.90", change: "+0.18%", trending: true },
    { name: "BANK NIFTY", value: "48,012.15", change: "-0.12%", trending: false }
  ];
  
  // Mocked news items
  const newsItems = [
    {
      id: "1",
      title: "RBI keeps repo rate unchanged at 6.5%",
      date: "3 hrs ago",
      source: "Economic Times"
    },
    {
      id: "2",
      title: "SIP investments cross ₹20,000 crore mark in June",
      date: "8 hrs ago",
      source: "Financial Express"
    }
  ];
  
  // Mocked notifications
  const notifications = [
    {
      id: "1",
      title: "SIP Payment Successful",
      description: "Your SIP payment of ₹2,000 was processed successfully",
      time: "Today, 10:30 AM",
      read: false
    },
    {
      id: "2",
      title: "New Fund Recommendation",
      description: "Based on your risk profile, we recommend checking out HDFC Small Cap Fund",
      time: "Yesterday, 5:45 PM",
      read: true
    },
    {
      id: "3",
      title: "Market Update",
      description: "Markets hit an all-time high. Check your portfolio performance",
      time: "2 days ago",
      read: true
    }
  ];
  
  return (
    <PageContainer 
      showBackButton={false}
      headerClassName="px-0 py-0"
      contentClassName="p-0"
    >
      {/* Custom Header */}
      <div className="bg-fundeasy-green text-white px-4 pt-12 pb-6 rounded-b-3xl shadow-md">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold">{getGreeting()}, {userName}!</h2>
            <p className="text-white/80 text-sm">Welcome to your financial dashboard</p>
          </div>
          
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="h-9 w-9 p-0 text-white relative">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="p-3 border-b">
                  <h3 className="font-medium">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-auto">
                  {notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`p-3 border-b last:border-b-0 hover:bg-slate-50 ${!notification.read ? 'bg-green-50' : ''}`}
                    >
                      <p className="font-medium text-sm">{notification.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{notification.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t text-center">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full text-sm"
                    onClick={() => navigate('/notifications')}
                  >
                    View All
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            
            <Button 
              variant="ghost"
              size="icon"
              className="text-white"
              onClick={() => navigate('/profile')}
            >
              <Filter size={20} />
            </Button>
          </div>
        </div>
        
        {/* Portfolio Summary */}
        <Card className="bg-white/10 backdrop-blur-sm border-none shadow-inner">
          <CardContent className="p-3">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-sm">Portfolio Value</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 text-xs text-white/90 p-0"
                onClick={() => navigate('/portfolio')}
              >
                View Details
                <ArrowUpRight size={14} className="ml-1" />
              </Button>
            </div>
            
            <div className="flex justify-between items-end">
              <div>
                <p className="text-2xl font-bold">₹{portfolioData.currentValue.toLocaleString()}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={`${portfolioData.returns.percentage >= 0 ? 'bg-green-600' : 'bg-red-500'} text-white`}>
                    <TrendingUp size={12} className="mr-1" />
                    {portfolioData.returns.percentage}%
                  </Badge>
                  <span className="text-xs text-white/80">
                    {portfolioData.returns.percentage >= 0 ? '+' : ''}
                    ₹{portfolioData.returns.value.toLocaleString()}
                  </span>
                </div>
              </div>
              
              <Button 
                size="sm" 
                onClick={() => navigate('/explore')}
                className="bg-white text-fundeasy-green hover:bg-white/90 px-6"
              >
                Invest
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Content */}
      <div className="px-4 mt-6">
        {/* SIP Summary */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2 hide-scrollbar">
          <Card className="min-w-[45%] flex-1 bg-blue-50 border-blue-100 cursor-pointer" onClick={() => navigate('/sip-dashboard')}>
            <CardContent className="p-3">
              <h3 className="text-sm font-medium text-blue-800">Active SIPs</h3>
              <div className="flex justify-between items-center mt-1">
                <p className="text-xl font-bold">{portfolioData.sip.active}</p>
                <Calendar size={18} className="text-blue-600" />
              </div>
              <p className="text-xs text-blue-700 mt-1">
                Next SIP: {portfolioData.sip.nextDate}
              </p>
            </CardContent>
          </Card>
          
          <Card className="min-w-[45%] flex-1 bg-amber-50 border-amber-100 cursor-pointer" onClick={() => navigate('/goals')}>
            <CardContent className="p-3">
              <h3 className="text-sm font-medium text-amber-800">Goals</h3>
              <div className="flex justify-between items-center mt-1">
                <p className="text-xl font-bold">{portfolioData.goals.count}</p>
                <Zap size={18} className="text-amber-600" />
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-xs text-amber-700 mb-1">
                  <span>{portfolioData.goals.nearestGoal}</span>
                  <span>{portfolioData.goals.progress}%</span>
                </div>
                <Progress 
                  value={portfolioData.goals.progress} 
                  className="h-1.5 bg-amber-200" 
                  indicatorClassName="bg-amber-500"
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
          <div className="grid grid-cols-3 gap-2">
            <Card 
              className="cursor-pointer hover:shadow-sm transition-shadow"
              onClick={() => navigate('/sip-calculator')}
            >
              <CardContent className="p-2 flex flex-col items-center justify-center text-center">
                <Calculator size={20} className="text-fundeasy-blue mb-1" />
                <span className="text-xs">SIP Calculator</span>
              </CardContent>
            </Card>
            <Card 
              className="cursor-pointer hover:shadow-sm transition-shadow"
              onClick={() => navigate('/watchlist')}
            >
              <CardContent className="p-2 flex flex-col items-center justify-center text-center">
                <TrendingUp size={20} className="text-fundeasy-green mb-1" />
                <span className="text-xs">Watchlist</span>
              </CardContent>
            </Card>
            <Card 
              className="cursor-pointer hover:shadow-sm transition-shadow"
              onClick={() => navigate('/transactions')}
            >
              <CardContent className="p-2 flex flex-col items-center justify-center text-center">
                <Calendar size={20} className="text-fundeasy-red mb-1" />
                <span className="text-xs">Transactions</span>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Market Indices */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Market Indices</h2>
          <div className="grid grid-cols-3 gap-2">
            {marketIndices.map((index, i) => (
              <Card key={i} className="bg-gray-50">
                <CardContent className="p-3">
                  <h3 className="text-xs font-medium text-gray-500">{index.name}</h3>
                  <p className="text-sm font-bold mt-1">{index.value}</p>
                  <p className={`text-xs mt-1 ${index.trending ? 'text-green-600' : 'text-red-500'}`}>
                    {index.change}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Trending Funds */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Trending Funds</h2>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-fundeasy-green"
              onClick={() => navigate('/explore')}
            >
              View All
              <ChevronRight size={16} />
            </Button>
          </div>
          
          <div className="space-y-3">
            {trendingFunds.map((fund) => (
              <Card 
                key={fund.id} 
                className="fund-card cursor-pointer"
                onClick={() => navigate(`/fund/${fund.id}`)}
              >
                <CardContent className="p-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium line-clamp-1">{fund.name}</p>
                      <p className="text-xs text-gray-500">{fund.category} • {fund.risk} Risk</p>
                      
                      <div className="flex items-center gap-4 mt-2">
                        <div>
                          <p className="text-xs text-gray-500">1Y Returns</p>
                          <p className={`font-medium ${fund.returns.oneYear >= 0 ? 'text-fundeasy-green' : 'text-red-500'}`}>
                            {fund.returns.oneYear}%
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-xs text-gray-500">3Y Returns</p>
                          <p className={`font-medium ${fund.returns.threeYear >= 0 ? 'text-fundeasy-green' : 'text-red-500'}`}>
                            {fund.returns.threeYear}%
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <Badge className={`mb-2 ${fund.trending ? 'bg-orange-100 text-orange-800 hover:bg-orange-100' : 'bg-blue-100 text-blue-800 hover:bg-blue-100'}`}>
                        {fund.trending ? 'Trending' : 'Popular'}
                      </Badge>
                      <Button 
                        size="sm" 
                        className="bg-fundeasy-green hover:bg-fundeasy-dark-green text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/start-sip/${fund.id}`);
                        }}
                      >
                        Invest
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Market News */}
        <div className="mb-20">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Market News</h2>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-fundeasy-green"
              onClick={() => navigate('/market-news')}
            >
              More News
              <ChevronRight size={16} />
            </Button>
          </div>
          
          <div className="space-y-3">
            {newsItems.map((news) => (
              <Card 
                key={news.id} 
                className="cursor-pointer hover:shadow-md transition"
                onClick={() => navigate(`/news/${news.id}`)}
              >
                <CardContent className="p-3">
                  <h3 className="font-medium">{news.title}</h3>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-xs text-gray-500">{news.source}</span>
                    <span className="h-1 w-1 bg-gray-400 rounded-full"></span>
                    <span className="text-xs text-gray-500">{news.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
