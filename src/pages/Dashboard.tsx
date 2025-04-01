
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, ArrowRight, Calendar, ChevronRight, Bell, Filter, Zap, CreditCard, Wallet, ArrowUpRight, DollarSign, PieChart } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import StatsCard from '@/components/ui/stats-card';
import { mockMutualFunds } from '@/utils/mockData';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar } from '@/components/ui/avatar';

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

  // Quick actions
  const quickActions = [
    { name: "Top Up", icon: <CreditCard size={20} />, path: "/explore" },
    { name: "Transfer", icon: <ArrowRight size={20} />, path: "/profile" },
    { name: "Request", icon: <Wallet size={20} />, path: "/goals" },
    { name: "Scan", icon: <Zap size={20} />, path: "/calculator" }
  ];
  
  return (
    <PageContainer 
      showBackButton={false}
      headerClassName="px-0 py-0"
      contentClassName="p-0"
    >
      {/* Custom Header */}
      <div className="bg-fundeasy-blue text-white px-4 pt-16 pb-8 rounded-b-[32px] shadow-lg">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold">{getGreeting()}, {userName}</h2>
            <p className="text-white/80 text-sm mt-1">Welcome back to your investments</p>
          </div>
          
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="h-9 w-9 p-0 text-white relative bg-white/10 rounded-full">
                  <Bell size={18} />
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
                      className={`p-3 border-b last:border-b-0 hover:bg-slate-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                    >
                      <p className="font-medium text-sm">{notification.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{notification.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t text-center">
                  <Button variant="ghost" size="sm" className="w-full text-sm">View All</Button>
                </div>
              </PopoverContent>
            </Popover>
            
            <Avatar className="h-9 w-9 bg-white/10 text-white border-2 border-white/30">
              <span className="text-sm">P</span>
            </Avatar>
          </div>
        </div>
        
        {/* Portfolio Summary */}
        <Card className="bg-white/10 backdrop-blur-sm border-none shadow-inner">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-sm text-white/90">Portfolio Balance</h3>
              <Button variant="ghost" size="sm" className="h-7 text-xs text-white/90 p-0 hover:bg-white/10"
                onClick={() => navigate('/portfolio')}
              >
                View Details
                <ArrowRight size={14} className="ml-1" />
              </Button>
            </div>
            
            <div className="flex justify-between items-end">
              <div>
                <p className="text-3xl font-bold">₹{portfolioData.currentValue.toLocaleString()}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className={`${portfolioData.returns.percentage >= 0 ? 'bg-green-600/80' : 'bg-red-500/80'} text-white border-none`}>
                    <TrendingUp size={12} className="mr-1" />
                    {portfolioData.returns.percentage}%
                  </Badge>
                  <span className="text-xs text-white/90">
                    {portfolioData.returns.percentage >= 0 ? '+' : ''}
                    ₹{portfolioData.returns.value.toLocaleString()}
                  </span>
                </div>
              </div>
              
              <Button 
                size="sm" 
                onClick={() => navigate('/explore')}
                className="bg-white text-fundeasy-blue hover:bg-white/90 px-6 rounded-full shadow-button"
              >
                Invest
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Actions */}
      <div className="px-4 -mt-5 mb-5">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="grid grid-cols-4 gap-2">
              {quickActions.map((action, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center"
                  onClick={() => navigate(action.path)}
                >
                  <div className="w-12 h-12 rounded-full bg-fundeasy-accent-bg flex items-center justify-center text-fundeasy-blue mb-1">
                    {action.icon}
                  </div>
                  <span className="text-xs font-medium">{action.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Content */}
      <div className="px-4 mt-6">
        {/* SIP Summary */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2 hide-scrollbar">
          <Card className="min-w-[45%] flex-1 bg-gradient-to-br from-blue-50 to-blue-100 border-none shadow-card">
            <CardContent className="p-3">
              <h3 className="text-sm font-medium text-blue-900">Active SIPs</h3>
              <div className="flex justify-between items-center mt-2">
                <p className="text-xl font-bold text-fundeasy-blue">{portfolioData.sip.active}</p>
                <div className="w-9 h-9 rounded-full bg-blue-200/60 flex items-center justify-center">
                  <Calendar size={18} className="text-fundeasy-blue" />
                </div>
              </div>
              <p className="text-xs text-blue-700 mt-2">
                Next SIP: {portfolioData.sip.nextDate}
              </p>
            </CardContent>
          </Card>
          
          <Card className="min-w-[45%] flex-1 bg-gradient-to-br from-amber-50 to-amber-100 border-none shadow-card">
            <CardContent className="p-3">
              <h3 className="text-sm font-medium text-amber-900">Goals</h3>
              <div className="flex justify-between items-center mt-2">
                <p className="text-xl font-bold text-amber-600">{portfolioData.goals.count}</p>
                <div className="w-9 h-9 rounded-full bg-amber-200/60 flex items-center justify-center">
                  <Zap size={18} className="text-amber-600" />
                </div>
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-xs text-amber-700 mb-1">
                  <span>{portfolioData.goals.nearestGoal}</span>
                  <span>{portfolioData.goals.progress}%</span>
                </div>
                <Progress value={portfolioData.goals.progress} className="h-1.5 bg-amber-200" indicatorClassName="bg-amber-500" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Market Indices */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Market Indices</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-fundeasy-blue p-0 h-auto" 
              onClick={() => navigate('/market-news')}
            >
              More <ChevronRight size={14} className="ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {marketIndices.map((index, i) => (
              <Card key={i} className="shadow-card">
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
              className="text-fundeasy-blue p-0 h-auto"
              onClick={() => navigate('/explore')}
            >
              View All <ChevronRight size={14} className="ml-1" />
            </Button>
          </div>
          
          <div className="space-y-3">
            {trendingFunds.map((fund) => (
              <Card 
                key={fund.id} 
                className="fund-card cursor-pointer border-none shadow-card hover:shadow-card-hover"
                onClick={() => navigate(`/fund/${fund.id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-fundeasy-accent-bg flex items-center justify-center">
                          <PieChart size={18} className="text-fundeasy-blue" />
                        </div>
                        <div>
                          <p className="font-medium line-clamp-1">{fund.name}</p>
                          <p className="text-xs text-gray-500">{fund.category} • {fund.risk} Risk</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-5 mt-3">
                        <div>
                          <p className="text-xs text-gray-500">1Y Returns</p>
                          <p className={`font-medium ${fund.returns.oneYear >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                            {fund.returns.oneYear}%
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-xs text-gray-500">3Y Returns</p>
                          <p className={`font-medium ${fund.returns.threeYear >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                            {fund.returns.threeYear}%
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-xs text-gray-500">5Y Returns</p>
                          <p className={`font-medium ${fund.returns.fiveYear >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                            {fund.returns.fiveYear}%
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <Badge className={`mb-2 ${fund.trending ? 'bg-amber-100 text-amber-800 hover:bg-amber-100' : 'bg-blue-100 text-blue-800 hover:bg-blue-100'}`}>
                        {fund.trending ? 'Trending' : 'Popular'}
                      </Badge>
                      <Button 
                        size="sm" 
                        className="mt-2 bg-fundeasy-blue hover:bg-fundeasy-light-blue text-white shadow-button rounded-full"
                      >
                        Invest
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Button
            className="w-full mt-3 bg-fundeasy-accent-bg text-fundeasy-blue hover:bg-blue-100"
            variant="outline"
            onClick={() => navigate('/explore')}
          >
            Explore More Funds
          </Button>
        </div>
        
        {/* Market News */}
        <div className="mb-20">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Market News</h2>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-fundeasy-blue p-0 h-auto"
              onClick={() => navigate('/market-news')}
            >
              More News <ChevronRight size={14} className="ml-1" />
            </Button>
          </div>
          
          <div className="space-y-3">
            {newsItems.map((news) => (
              <Card 
                key={news.id} 
                className="cursor-pointer hover:shadow-card-hover transition shadow-card border-none"
                onClick={() => navigate(`/news/${news.id}`)}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-fundeasy-accent-bg flex items-center justify-center flex-shrink-0">
                    <DollarSign size={18} className="text-fundeasy-blue" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{news.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">{news.source}</span>
                      <span className="h-1 w-1 bg-gray-300 rounded-full"></span>
                      <span className="text-xs text-gray-500">{news.date}</span>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
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
