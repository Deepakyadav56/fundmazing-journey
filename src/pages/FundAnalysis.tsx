
import React from 'react';
import { useParams } from 'react-router-dom';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts';
import { ArrowUpRight, Info } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { mockMutualFunds } from '@/utils/mockData';

// Mock performance data
const performanceData = [
  { month: 'Jan', fundReturn: 1.2, benchmarkReturn: 0.8 },
  { month: 'Feb', fundReturn: -0.5, benchmarkReturn: -0.9 },
  { month: 'Mar', fundReturn: 2.1, benchmarkReturn: 1.7 },
  { month: 'Apr', fundReturn: 1.8, benchmarkReturn: 1.5 },
  { month: 'May', fundReturn: -0.2, benchmarkReturn: -0.4 },
  { month: 'Jun', fundReturn: 3.2, benchmarkReturn: 2.8 },
  { month: 'Jul', fundReturn: 1.5, benchmarkReturn: 1.2 },
  { month: 'Aug', fundReturn: 2.6, benchmarkReturn: 2.1 },
  { month: 'Sep', fundReturn: -0.8, benchmarkReturn: -1.2 },
  { month: 'Oct', fundReturn: 1.9, benchmarkReturn: 1.5 },
  { month: 'Nov', fundReturn: 2.3, benchmarkReturn: 1.9 },
  { month: 'Dec', fundReturn: 1.7, benchmarkReturn: 1.4 },
];

const portfolioData = [
  { name: 'Financial Services', value: 32 },
  { name: 'Technology', value: 24 },
  { name: 'Consumer Goods', value: 18 },
  { name: 'Healthcare', value: 14 },
  { name: 'Others', value: 12 },
];

const FundAnalysis = () => {
  const { id } = useParams<{ id: string }>();
  const fund = mockMutualFunds.find(f => f.id === id);
  
  if (!fund) {
    return (
      <PageContainer title="Fund Not Found" showBackButton>
        <div className="text-center py-10">
          <p className="text-gray-500">The requested fund could not be found.</p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Fund Analysis" showBackButton>
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <FundLogo fundName={fund.name} size="lg" />
            
            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-1">{fund.name}</h2>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline" className="bg-gray-50">
                  {fund.category}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={
                    fund.risk === 'Low' ? 'bg-green-50 text-green-700' :
                    fund.risk === 'Moderate' ? 'bg-yellow-50 text-yellow-700' :
                    'bg-red-50 text-red-700'
                  }
                >
                  {fund.risk} Risk
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-baseline mt-4">
            <div>
              <p className="text-2xl font-bold">₹{fund.navValue.toFixed(2)}</p>
              <p className="text-sm text-green-600 flex items-center">
                <ArrowUpRight size={14} className="mr-0.5" />
                {fund.returns.oneYear}% (1Y)
              </p>
            </div>
            <Button className="bg-fundeasy-green">Invest Now</Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="performance" className="mb-6">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="performance" className="flex-1">Performance</TabsTrigger>
          <TabsTrigger value="portfolio" className="flex-1">Portfolio</TabsTrigger>
          <TabsTrigger value="details" className="flex-1">Fund Details</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-medium mb-2">Historical Performance</h3>
              <div className="text-sm text-gray-500 mb-4">
                <div className="flex justify-between mb-2">
                  <span>1Y Return: {fund.returns.oneYear}%</span>
                  <span>3Y Return: {fund.returns.threeYear}%</span>
                </div>
                <div className="flex justify-between">
                  <span>5Y Return: {fund.returns.fiveYear}%</span>
                  <span>Since Inception: {(fund.returns.fiveYear * 1.2).toFixed(1)}%</span>
                </div>
              </div>
              
              <div className="h-64 w-full">
                <ResponsiveContainer>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="fundReturn" 
                      stroke="#22c55e" 
                      name="Fund" 
                      strokeWidth={2}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="benchmarkReturn" 
                      stroke="#94a3b8" 
                      name="Benchmark" 
                      strokeWidth={2} 
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex justify-between mt-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-fundeasy-green rounded-full mr-1"></div>
                  <span>Fund</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-400 rounded-full mr-1"></div>
                  <span>Benchmark</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="portfolio">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-medium mb-4">Sector Allocation</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer>
                  <BarChart data={portfolioData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#22c55e" name="Allocation %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-2">Top Holdings</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>HDFC Bank</span>
                    <span>8.2%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Reliance Industries</span>
                    <span>7.5%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Infosys</span>
                    <span>5.9%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>TCS</span>
                    <span>5.2%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>ICICI Bank</span>
                    <span>4.8%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="details">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-medium mb-2">Fund Details</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Fund Manager</h4>
                  <p>{fund.fundManager}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Category</h4>
                  <p>{fund.category}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Risk Level</h4>
                  <p>{fund.risk}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">AUM</h4>
                  <p>₹{fund.aum} Crores</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Expense Ratio</h4>
                  <p>{fund.expenseRatio}%</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">NAV as on Date</h4>
                  <p>{new Date().toLocaleDateString()}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Fund Description</h4>
                  <p className="text-sm">{fund.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default FundAnalysis;
