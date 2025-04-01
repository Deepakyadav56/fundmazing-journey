
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, TrendingUp, ChevronRight, AlertCircle, PieChart } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockMutualFunds } from '@/utils/mockData';

const FundDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const fund = mockMutualFunds.find(f => f.id === id);
  
  if (!fund) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium">Fund not found</p>
          <Button 
            variant="link" 
            onClick={() => navigate('/explore')}
            className="mt-4"
          >
            Go to Explore
          </Button>
        </div>
      </div>
    );
  }

  const chartData = [
    { name: 'Jan', value: 100 },
    { name: 'Feb', value: 102 },
    { name: 'Mar', value: 104 },
    { name: 'Apr', value: 101 },
    { name: 'May', value: 103 },
    { name: 'Jun', value: 105 },
    { name: 'Jul', value: 107 },
    { name: 'Aug', value: 110 },
    { name: 'Sep', value: 112 },
    { name: 'Oct', value: 115 },
    { name: 'Nov', value: 113 },
    { name: 'Dec', value: fund.returns.oneYear + 100 },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center p-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-medium ml-2 line-clamp-1">{fund.name}</h1>
        </div>
        
        <div className="px-4 pb-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold">₹{fund.navValue.toFixed(2)}</p>
              <span className="text-xs text-gray-500">NAV as of today</span>
            </div>
            <div className="flex items-center text-fundeasy-blue">
              <TrendingUp size={20} className="mr-1" />
              <span className="font-medium">{fund.returns.oneYear}%</span>
              <span className="text-xs ml-1">1Y</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Performance Chart */}
      <Card className="mx-4 mt-4">
        <CardContent className="pt-6">
          <h3 className="font-medium mb-4">Fund Performance</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[95, 'dataMax + 5']} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#2A5BFF" 
                  strokeWidth={2} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { period: '1Y', return: fund.returns.oneYear },
              { period: '3Y', return: fund.returns.threeYear },
              { period: '5Y', return: fund.returns.fiveYear }
            ].map(item => (
              <div key={item.period}>
                <p className="text-xs text-gray-500">{item.period} Returns</p>
                <p className="font-medium text-fundeasy-blue">{item.return}%</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Fund Details */}
      <div className="px-4 mt-6">
        <Tabs defaultValue="overview">
          <TabsList className="w-full">
            <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
            <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">About the Fund</h3>
                    <p className="text-sm text-gray-600 mt-1">{fund.description}</p>
                  </div>
                  
                  <div className="flex justify-between">
                    <div>
                      <p className="text-xs text-gray-500">Fund Category</p>
                      <p className="font-medium">{fund.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Risk Level</p>
                      <p className={`font-medium ${
                        fund.risk === 'Low' ? 'text-green-600' : 
                        fund.risk === 'Moderate' ? 'text-yellow-600' : 
                        'text-red-600'
                      }`}>
                        {fund.risk}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <div>
                      <p className="text-xs text-gray-500">Expense Ratio</p>
                      <p className="font-medium">{fund.expenseRatio}%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Fund Size</p>
                      <p className="font-medium">₹{fund.aum} Cr.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-4">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Fund Manager</h3>
                    <p className="text-sm mt-1">{fund.fundManager}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Min. Investment</h3>
                    <p className="text-sm mt-1">₹500 (SIP) / ₹5,000 (Lumpsum)</p>
                  </div>
                  
                  <div className="flex items-center">
                    <AlertCircle size={16} className="text-amber-500 mr-2" />
                    <p className="text-xs text-gray-600">
                      Mutual fund investments are subject to market risks. Read all scheme related documents carefully.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="details" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Asset Allocation</h3>
                    <div className="mt-2 bg-gray-200 rounded-full h-4 overflow-hidden">
                      {fund.category === 'Equity' ? (
                        <>
                          <div className="bg-fundeasy-blue h-4" style={{ width: '85%' }}></div>
                          <div className="flex justify-between text-xs mt-1">
                            <span>Equity: 85%</span>
                            <span>Debt: 15%</span>
                          </div>
                        </>
                      ) : fund.category === 'Debt' ? (
                        <>
                          <div className="bg-fundeasy-blue h-4" style={{ width: '10%' }}></div>
                          <div className="flex justify-between text-xs mt-1">
                            <span>Equity: 10%</span>
                            <span>Debt: 90%</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="bg-fundeasy-blue h-4" style={{ width: '60%' }}></div>
                          <div className="flex justify-between text-xs mt-1">
                            <span>Equity: 60%</span>
                            <span>Debt: 40%</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <h3 className="font-medium mb-3">Top Holdings</h3>
                    <div className="space-y-2">
                      {fund.category !== 'Debt' && [
                        { name: "HDFC Bank Ltd", percentage: "8.5%" },
                        { name: "Reliance Industries Ltd", percentage: "7.2%" },
                        { name: "Infosys Ltd", percentage: "5.8%" },
                        { name: "ICICI Bank Ltd", percentage: "5.1%" },
                        { name: "Tata Consultancy Services Ltd", percentage: "4.7%" }
                      ].map((holding, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <p>{holding.name}</p>
                          <p>{holding.percentage}</p>
                        </div>
                      ))}
                      
                      {fund.category === 'Debt' && [
                        { name: "Government Securities", percentage: "45.2%" },
                        { name: "AAA Bonds", percentage: "32.8%" },
                        { name: "Treasury Bills", percentage: "12.5%" },
                        { name: "AA+ Bonds", percentage: "5.8%" },
                        { name: "Cash & Equivalents", percentage: "3.7%" }
                      ].map((holding, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <p>{holding.name}</p>
                          <p>{holding.percentage}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Investment Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex gap-4">
        <Button 
          onClick={() => navigate(`/start-sip/${id}`)}
          className="flex-1 bg-fundeasy-blue hover:bg-fundeasy-dark-blue h-12"
        >
          Start SIP
        </Button>
        
        <Button 
          variant="outline"
          onClick={() => navigate(`/cart?fund=${id}&type=lumpsum`)}
          className="flex-1 h-12 border-fundeasy-blue text-fundeasy-blue"
        >
          Invest One-time
        </Button>
      </div>
    </div>
  );
};

export default FundDetails;
