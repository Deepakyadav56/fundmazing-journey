
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Bell, 
  Bookmark, 
  ChevronRight, 
  TrendingUp 
} from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  mockMutualFunds, 
  mockUserInvestments, 
  mockMarketNews,
  calculateTotalInvestment,
  calculateCurrentValue,
  calculateReturns
} from '@/utils/mockData';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Calculate portfolio metrics
  const totalInvestment = calculateTotalInvestment(mockUserInvestments);
  const currentValue = calculateCurrentValue(mockUserInvestments);
  const returnsPercentage = calculateReturns(totalInvestment, currentValue);
  const absoluteReturns = currentValue - totalInvestment;
  
  // Get trending funds (sort by 1Y returns)
  const trendingFunds = [...mockMutualFunds]
    .sort((a, b) => b.returns.oneYear - a.returns.oneYear)
    .slice(0, 5);
  
  return (
    <PageContainer>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome to FundEasy</h1>
          <p className="text-gray-500">Track your investments and market trends</p>
        </div>
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
      </div>
      
      {/* Portfolio Summary */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-3">Your Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="card-shadow">
            <CardContent className="pt-6">
              <p className="text-gray-500 text-sm">Total Invested</p>
              <p className="text-2xl font-bold">₹{totalInvestment.toLocaleString()}</p>
            </CardContent>
          </Card>
          
          <Card className="card-shadow">
            <CardContent className="pt-6">
              <p className="text-gray-500 text-sm">Current Value</p>
              <p className="text-2xl font-bold">₹{currentValue.toLocaleString()}</p>
            </CardContent>
          </Card>
          
          <Card className="card-shadow">
            <CardContent className="pt-6">
              <p className="text-gray-500 text-sm">Returns</p>
              <div className="flex items-center">
                <p className={`text-2xl font-bold ${absoluteReturns >= 0 ? 'text-fundeasy-green' : 'text-fundeasy-red'}`}>
                  {absoluteReturns >= 0 ? '+' : '-'}₹{Math.abs(absoluteReturns).toLocaleString()}
                </p>
                <span className={`ml-2 flex items-center text-sm ${absoluteReturns >= 0 ? 'text-fundeasy-green' : 'text-fundeasy-red'}`}>
                  {absoluteReturns >= 0 ? (
                    <ArrowUpRight size={14} />
                  ) : (
                    <ArrowDownRight size={14} />
                  )}
                  {Math.abs(returnsPercentage).toFixed(2)}%
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full mt-3 border-dashed border-gray-300"
          onClick={() => navigate('/portfolio')}
        >
          View Portfolio Details
          <ChevronRight size={16} className="ml-1" />
        </Button>
      </div>
      
      {/* Trending Funds */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-medium">Trending Funds</h2>
          <Button 
            variant="ghost" 
            className="text-xs text-fundeasy-green p-0"
            onClick={() => navigate('/explore')}
          >
            View All <ChevronRight size={14} />
          </Button>
        </div>
        
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-4">
            {trendingFunds.map(fund => (
              <Card 
                key={fund.id} 
                className="min-w-[280px] card-shadow hover-scale"
                onClick={() => navigate(`/fund/${fund.id}`)}
              >
                <CardContent className="pt-6">
                  <div className="flex justify-between mb-2">
                    <span className={`text-xs px-2 py-1 rounded ${
                      fund.risk === 'Low' ? 'bg-green-100 text-green-800' : 
                      fund.risk === 'Moderate' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {fund.risk} Risk
                    </span>
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                      {fund.category}
                    </span>
                  </div>
                  
                  <h3 className="font-medium line-clamp-2 h-12">{fund.name}</h3>
                  
                  <div className="flex items-center mt-2 text-fundeasy-green">
                    <TrendingUp size={16} className="mr-1" />
                    <span className="font-bold">{fund.returns.oneYear}%</span>
                    <span className="text-xs text-gray-500 ml-1">1Y Returns</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {/* Market Insights */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-3">Market Insights</h2>
        <div className="space-y-4">
          {mockMarketNews.map(news => (
            <Card key={news.id} className="card-shadow">
              <CardContent className="pt-6">
                <p className="text-xs text-gray-500">{new Date(news.date).toLocaleDateString()}</p>
                <h3 className="font-medium mt-1">{news.headline}</h3>
                <p className="text-sm text-gray-600 mt-1">{news.summary}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Goals */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-medium">Your Investment Goals</h2>
          <Button 
            variant="ghost" 
            className="text-xs text-fundeasy-green p-0"
          >
            Add Goal <ChevronRight size={14} />
          </Button>
        </div>
        
        <Card className="mb-4 card-shadow">
          <CardContent className="pt-6">
            <div className="flex justify-between mb-2">
              <div>
                <div className="flex items-center">
                  <Bookmark size={16} className="mr-2 text-fundeasy-green" />
                  <h3 className="font-medium">New Car</h3>
                </div>
                <p className="text-sm text-gray-500">Target: ₹10,00,000</p>
              </div>
              <span className="text-fundeasy-green font-medium">20%</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div 
                className="bg-fundeasy-green h-2 rounded-full" 
                style={{ width: '20%' }}
              ></div>
            </div>
            
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Current: ₹2,00,000</span>
              <span>2 Years Left</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
