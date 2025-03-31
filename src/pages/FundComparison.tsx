
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, X, Plus, PlusCircle, BarChart2, TrendingUp } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { mockMutualFunds } from '@/utils/mockData';
import { MutualFund } from '@/types';

const FundComparison = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFunds, setSelectedFunds] = useState<MutualFund[]>([]);
  const [isSelectingFunds, setIsSelectingFunds] = useState(false);

  // Filter funds based on search query
  const filteredFunds = mockMutualFunds.filter(fund => {
    return fund.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Handle fund selection
  const handleFundSelect = (fund: MutualFund) => {
    if (selectedFunds.length >= 3) {
      // Limit to 3 funds for comparison
      return;
    }
    if (!selectedFunds.some(f => f.id === fund.id)) {
      setSelectedFunds([...selectedFunds, fund]);
    }
    if (selectedFunds.length === 2) {
      setIsSelectingFunds(false);
    }
  };

  const handleRemoveFund = (fundId: string) => {
    setSelectedFunds(selectedFunds.filter(fund => fund.id !== fundId));
  };

  // Prepare data for comparison charts
  const returnsData = [
    { name: '1Y Returns', ...selectedFunds.reduce((acc, fund) => ({ ...acc, [fund.name]: fund.returns.oneYear }), {}) },
    { name: '3Y Returns', ...selectedFunds.reduce((acc, fund) => ({ ...acc, [fund.name]: fund.returns.threeYear }), {}) },
    { name: '5Y Returns', ...selectedFunds.reduce((acc, fund) => ({ ...acc, [fund.name]: fund.returns.fiveYear }), {}) },
  ];

  const riskData = selectedFunds.map(fund => ({
    name: fund.name,
    risk: fund.risk === 'Low' ? 2 : fund.risk === 'Moderate' ? 5 : 8,
    expenseRatio: fund.expenseRatio,
    aum: fund.aum
  }));

  // Generate random historical NAV data for demo
  const generateHistoricalData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map((month, index) => {
      const data: any = { name: month };
      selectedFunds.forEach(fund => {
        // Random value between 95 and 115 with progressive growth
        const startValue = 100;
        const growthFactor = 1 + (fund.returns.oneYear / 100 / 12);
        data[fund.name] = Math.round((startValue * Math.pow(growthFactor, index)) * 100) / 100;
      });
      return data;
    });
  };

  const historicalNavData = generateHistoricalData();

  // Custom colors for funds
  const fundColors = ['#00C853', '#2196F3', '#FFC107'];

  return (
    <PageContainer title="Compare Funds" showBackButton>
      {isSelectingFunds ? (
        <div className="animated-fade-in">
          <div className="mb-4">
            <Input
              placeholder="Search funds..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-2"
            />
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedFunds.map(fund => (
                <div 
                  key={fund.id} 
                  className="bg-gray-100 px-2 py-1 rounded-full text-xs flex items-center"
                >
                  {fund.name.length > 20 ? fund.name.substring(0, 20) + '...' : fund.name}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 ml-1 p-0"
                    onClick={() => handleRemoveFund(fund.id)}
                  >
                    <X size={12} />
                  </Button>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mb-4">
              {selectedFunds.length === 0 
                ? "Select up to 3 funds to compare" 
                : `Selected ${selectedFunds.length}/3 funds`}
            </p>
          </div>

          <div className="space-y-2 mb-4">
            {filteredFunds.slice(0, 10).map(fund => (
              <Card 
                key={fund.id} 
                className={`hover:bg-gray-50 transition cursor-pointer ${
                  selectedFunds.some(f => f.id === fund.id) ? 'border-fundeasy-green' : ''
                }`}
                onClick={() => handleFundSelect(fund)}
              >
                <CardContent className="p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-sm line-clamp-2">{fund.name}</p>
                      <p className="text-xs text-gray-500">{fund.category} • {fund.risk} Risk</p>
                    </div>
                    {selectedFunds.some(f => f.id === fund.id) ? (
                      <div className="h-5 w-5 bg-fundeasy-green rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    ) : (
                      <PlusCircle size={18} className="text-gray-400" />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={() => setIsSelectingFunds(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-fundeasy-green hover:bg-fundeasy-dark-green"
              onClick={() => setIsSelectingFunds(false)}
              disabled={selectedFunds.length < 2}
            >
              Compare ({selectedFunds.length})
            </Button>
          </div>
        </div>
      ) : (
        <div className="animated-fade-in">
          {selectedFunds.length < 2 ? (
            <div className="flex flex-col items-center justify-center py-10">
              <BarChart2 size={48} className="text-gray-300 mb-4" />
              <p className="text-gray-500 mb-6">Select at least 2 funds to compare</p>
              <Button 
                className="bg-fundeasy-green hover:bg-fundeasy-dark-green"
                onClick={() => setIsSelectingFunds(true)}
              >
                <Plus size={16} className="mr-1" /> Select Funds
              </Button>
            </div>
          ) : (
            <>
              <div className="flex justify-between mb-6">
                <div>
                  <h2 className="font-medium">Comparing {selectedFunds.length} Funds</h2>
                  <p className="text-xs text-gray-500">See how these funds perform against each other</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsSelectingFunds(true)}
                >
                  <Plus size={14} className="mr-1" /> Edit
                </Button>
              </div>

              <div className="space-y-2 mb-6">
                {selectedFunds.map((fund, index) => (
                  <Card key={fund.id} className="hover:shadow-sm transition">
                    <CardContent className="p-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div 
                            className="h-3 w-3 rounded-full mr-2" 
                            style={{ backgroundColor: fundColors[index % fundColors.length] }}
                          ></div>
                          <div>
                            <p className="font-medium text-sm">{fund.name}</p>
                            <p className="text-xs text-gray-500">{fund.category} • {fund.risk} Risk</p>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0"
                          onClick={() => navigate(`/fund/${fund.id}`)}
                        >
                          <ChevronRight size={16} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Tabs defaultValue="returns">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="returns">Returns</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>
                
                <TabsContent value="returns" className="animated-fade-in">
                  <Card className="mb-6">
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-4">Returns Comparison (%)</h3>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={returnsData}
                            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                          >
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            {selectedFunds.map((fund, index) => (
                              <Bar 
                                key={fund.id} 
                                dataKey={fund.name} 
                                fill={fundColors[index % fundColors.length]} 
                              />
                            ))}
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="performance" className="animated-fade-in">
                  <Card className="mb-6">
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-4">NAV History (1 Year)</h3>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={historicalNavData}
                            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                          >
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            {selectedFunds.map((fund, index) => (
                              <Line 
                                key={fund.id} 
                                type="monotone" 
                                dataKey={fund.name} 
                                stroke={fundColors[index % fundColors.length]} 
                                strokeWidth={2}
                                dot={false}
                              />
                            ))}
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="details" className="animated-fade-in">
                  <Card>
                    <CardContent className="p-0">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="text-left p-3 border-b">Fund Details</th>
                            {selectedFunds.map(fund => (
                              <th key={fund.id} className="text-left p-3 border-b">
                                <span className="line-clamp-2">{fund.name}</span>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="p-3 border-b">Category</td>
                            {selectedFunds.map(fund => (
                              <td key={fund.id} className="p-3 border-b">{fund.category}</td>
                            ))}
                          </tr>
                          <tr>
                            <td className="p-3 border-b">Risk Level</td>
                            {selectedFunds.map(fund => (
                              <td key={fund.id} className="p-3 border-b">{fund.risk}</td>
                            ))}
                          </tr>
                          <tr>
                            <td className="p-3 border-b">NAV</td>
                            {selectedFunds.map(fund => (
                              <td key={fund.id} className="p-3 border-b">₹{fund.navValue.toFixed(2)}</td>
                            ))}
                          </tr>
                          <tr>
                            <td className="p-3 border-b">1Y Returns</td>
                            {selectedFunds.map(fund => (
                              <td key={fund.id} className="p-3 border-b text-fundeasy-green">
                                {fund.returns.oneYear}%
                              </td>
                            ))}
                          </tr>
                          <tr>
                            <td className="p-3 border-b">3Y Returns</td>
                            {selectedFunds.map(fund => (
                              <td key={fund.id} className="p-3 border-b text-fundeasy-green">
                                {fund.returns.threeYear}%
                              </td>
                            ))}
                          </tr>
                          <tr>
                            <td className="p-3 border-b">Expense Ratio</td>
                            {selectedFunds.map(fund => (
                              <td key={fund.id} className="p-3 border-b">{fund.expenseRatio}%</td>
                            ))}
                          </tr>
                          <tr>
                            <td className="p-3 border-b">Fund Size</td>
                            {selectedFunds.map(fund => (
                              <td key={fund.id} className="p-3 border-b">₹{fund.aum} Cr</td>
                            ))}
                          </tr>
                          <tr>
                            <td className="p-3 border-b">Fund Manager</td>
                            {selectedFunds.map(fund => (
                              <td key={fund.id} className="p-3 border-b">{fund.fundManager}</td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </CardContent>
                  </Card>
                  
                  <div className="mt-8 mb-16 flex justify-center">
                    <Button 
                      variant="outline"
                      onClick={() => setIsSelectingFunds(true)}
                    >
                      Compare Different Funds
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      )}
    </PageContainer>
  );
};

export default FundComparison;
