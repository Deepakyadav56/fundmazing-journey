
import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ArrowRight, Calendar, Eye, EyeOff, Filter, TrendingUp } from 'lucide-react';
import { SIPInvestment } from '@/types';
import FundLogo from '@/components/funds/FundLogo';
import { mockMutualFunds } from '@/utils/mockData';
import AmountDisplay from '@/components/common/AmountDisplay';
import { useNavigate } from 'react-router-dom';

// Mock SIP performance data
const mockSIPPerformance = [
  { month: 'Jan', investment: 5000, value: 5200 },
  { month: 'Feb', investment: 10000, value: 10100 },
  { month: 'Mar', investment: 15000, value: 15500 },
  { month: 'Apr', investment: 20000, value: 20800 },
  { month: 'May', investment: 25000, value: 26200 },
  { month: 'Jun', investment: 30000, value: 31000 },
  { month: 'Jul', investment: 35000, value: 36500 },
  { month: 'Aug', investment: 40000, value: 42000 },
  { month: 'Sep', investment: 45000, value: 47500 },
  { month: 'Oct', investment: 50000, value: 53000 },
  { month: 'Nov', investment: 55000, value: 58500 },
  { month: 'Dec', investment: 60000, value: 64200 },
];

// Mock SIP investments
const mockSIPs: SIPInvestment[] = [
  {
    id: "sip1",
    fundId: "fund1",
    amount: 5000,
    frequency: "monthly",
    startDate: new Date(2023, 0, 15),
    nextDate: new Date(2023, 1, 15),
    status: "active",
    totalInvested: 60000,
    currentValue: 64200
  },
  {
    id: "sip2",
    fundId: "fund2",
    amount: 3000,
    frequency: "monthly",
    startDate: new Date(2023, 2, 10),
    nextDate: new Date(2023, 3, 10),
    status: "active",
    totalInvested: 30000,
    currentValue: 31500
  },
  {
    id: "sip3",
    fundId: "fund3",
    amount: 10000,
    frequency: "quarterly",
    startDate: new Date(2023, 0, 5),
    nextDate: new Date(2023, 3, 5),
    status: "active",
    totalInvested: 40000,
    currentValue: 42800
  },
];

const SIPPerformance = () => {
  const navigate = useNavigate();
  const [selectedSIP, setSelectedSIP] = useState<string>(mockSIPs[0].id);
  const [hideAmounts, setHideAmounts] = useState(false);
  const [period, setPeriod] = useState<string>("1y");
  
  const sip = mockSIPs.find(s => s.id === selectedSIP) || mockSIPs[0];
  const fund = mockMutualFunds.find(f => f.id === sip.fundId) || mockMutualFunds[0];
  
  const returns = sip.currentValue - sip.totalInvested;
  const returnsPercentage = (returns / sip.totalInvested) * 100;
  
  // Calculate cost average
  const costAverage = sip.totalInvested / (12 * (sip.frequency === "monthly" ? 1 : sip.frequency === "quarterly" ? 3 : 6));
  
  return (
    <PageContainer title="SIP Performance">
      {/* SIP Selector */}
      <div className="flex items-center justify-between mb-4">
        <Select value={selectedSIP} onValueChange={setSelectedSIP}>
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Select SIP" />
          </SelectTrigger>
          <SelectContent>
            {mockSIPs.map(sip => {
              const fund = mockMutualFunds.find(f => f.id === sip.fundId);
              return (
                <SelectItem key={sip.id} value={sip.id}>
                  {fund?.name || "Unknown Fund"} - ₹{sip.amount}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setHideAmounts(!hideAmounts)}
        >
          {hideAmounts ? <EyeOff size={18} /> : <Eye size={18} />}
        </Button>
      </div>
      
      {/* SIP Overview Card */}
      <Card className="mb-6 glass-card">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <FundLogo fundName={fund.name} />
            <div>
              <h2 className="font-semibold">{fund.name}</h2>
              <div className="text-sm text-gray-500 flex items-center">
                <Calendar size={14} className="mr-1" /> 
                {sip.frequency === "monthly" ? "Monthly" : 
                 sip.frequency === "quarterly" ? "Quarterly" : "Bi-annually"} - 
                ₹{hideAmounts ? "XXXX" : sip.amount.toLocaleString('en-IN')}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-y-4 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">Total Invested</p>
              <p className="text-lg font-semibold sf-numerals">
                {hideAmounts ? "₹XXXXX" : new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                  maximumFractionDigits: 0,
                }).format(sip.totalInvested)}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Current Value</p>
              <p className="text-lg font-semibold sf-numerals">
                {hideAmounts ? "₹XXXXX" : new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                  maximumFractionDigits: 0,
                }).format(sip.currentValue)}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Returns</p>
              <AmountDisplay 
                amount={returns}
                showSign={true}
                hideable={false}
                initiallyHidden={hideAmounts}
                className="text-lg font-semibold"
              />
              <span className={`text-xs ${returns >= 0 ? 'text-fundeasy-brand-green' : 'text-fundeasy-red'}`}>
                {hideAmounts ? 'XX%' : `${returns >= 0 ? '+' : ''}${returnsPercentage.toFixed(2)}%`}
              </span>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Cost Average</p>
              <p className="text-lg font-semibold sf-numerals">
                {hideAmounts ? "₹XXXXX" : new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                  maximumFractionDigits: 2,
                }).format(costAverage)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Performance Chart */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Performance Analysis</h2>
          
          <div className="space-x-2">
            <Button 
              variant={period === "3m" ? "default" : "outline"} 
              size="sm"
              onClick={() => setPeriod("3m")}
              className={period === "3m" ? "bg-fundeasy-brand-green" : ""}
            >
              3M
            </Button>
            <Button 
              variant={period === "6m" ? "default" : "outline"} 
              size="sm"
              onClick={() => setPeriod("6m")}
              className={period === "6m" ? "bg-fundeasy-brand-green" : ""}
            >
              6M
            </Button>
            <Button 
              variant={period === "1y" ? "default" : "outline"} 
              size="sm"
              onClick={() => setPeriod("1y")}
              className={period === "1y" ? "bg-fundeasy-brand-green" : ""}
            >
              1Y
            </Button>
            <Button 
              variant={period === "all" ? "default" : "outline"} 
              size="sm"
              onClick={() => setPeriod("all")}
              className={period === "all" ? "bg-fundeasy-brand-green" : ""}
            >
              All
            </Button>
          </div>
        </div>
        
        <Card className="p-4">
          <Tabs defaultValue="chart">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="chart" className="flex-1">Chart View</TabsTrigger>
              <TabsTrigger value="table" className="flex-1">Table View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="chart">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={mockSIPPerformance}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value}`, '']} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="investment" 
                    name="Total Investment" 
                    stroke="#232323" 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    name="Current Value" 
                    stroke="#22ad78" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="table">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 px-4 text-left">Month</th>
                      <th className="py-2 px-4 text-right">Investment</th>
                      <th className="py-2 px-4 text-right">Value</th>
                      <th className="py-2 px-4 text-right">Growth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockSIPPerformance.map((entry, i) => {
                      const growth = entry.value - entry.investment;
                      const growthPct = (growth / entry.investment) * 100;
                      
                      return (
                        <tr key={i} className="border-b">
                          <td className="py-2 px-4">{entry.month}</td>
                          <td className="py-2 px-4 text-right sf-numerals">
                            {hideAmounts ? "₹XXXXX" : `₹${entry.investment.toLocaleString('en-IN')}`}
                          </td>
                          <td className="py-2 px-4 text-right sf-numerals">
                            {hideAmounts ? "₹XXXXX" : `₹${entry.value.toLocaleString('en-IN')}`}
                          </td>
                          <td className={`py-2 px-4 text-right sf-numerals ${growth >= 0 ? 'text-fundeasy-brand-green' : 'text-fundeasy-red'}`}>
                            {hideAmounts ? "XX%" : `${growth >= 0 ? '+' : ''}${growthPct.toFixed(2)}%`}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
      
      {/* SIP Management Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-20">
        <Button 
          onClick={() => navigate(`/manage-sip/${sip.id}`)}
          className="bg-fundeasy-brand-green"
        >
          Manage SIP
        </Button>
        
        <Button 
          variant="outline" 
          onClick={() => navigate(`/fund/${fund.id}`)}
        >
          View Fund Details
        </Button>
      </div>
    </PageContainer>
  );
};

export default SIPPerformance;
