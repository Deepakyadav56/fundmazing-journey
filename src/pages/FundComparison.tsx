
import React, { useState } from 'react';
import { ArrowLeft, X, Search, TrendingUp, TrendingDown, Info, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { mockMutualFunds, MutualFund } from '@/utils/mockData';

const FundComparison = () => {
  const navigate = useNavigate();
  const [selectedFunds, setSelectedFunds] = useState<string[]>(['fund1', 'fund3']);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFundSelector, setShowFundSelector] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('1y');
  
  const filteredFunds = mockMutualFunds.filter(fund => 
    fund.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const selectedFundObjects = mockMutualFunds.filter(fund => 
    selectedFunds.includes(fund.id)
  );
  
  const addFund = (fundId: string) => {
    if (selectedFunds.length < 3 && !selectedFunds.includes(fundId)) {
      setSelectedFunds([...selectedFunds, fundId]);
    }
    setShowFundSelector(false);
    setSearchQuery('');
  };
  
  const removeFund = (fundId: string) => {
    setSelectedFunds(selectedFunds.filter(id => id !== fundId));
  };
  
  const renderReturnValue = (fund: MutualFund) => {
    switch (selectedPeriod) {
      case '1y':
        return fund.returns.oneYear;
      case '3y':
        return fund.returns.threeYear;
      case '5y':
        return fund.returns.fiveYear;
      default:
        return fund.returns.oneYear;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
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
          <h1 className="text-lg font-medium ml-2">Compare Funds</h1>
        </div>
      </div>
      
      {/* Selected Funds */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-3 gap-2 mb-6">
          {selectedFundObjects.map(fund => (
            <Card key={fund.id} className="card-shadow relative">
              <button 
                className="absolute top-1 right-1 text-gray-400 z-10"
                onClick={() => removeFund(fund.id)}
              >
                <X size={16} />
              </button>
              <CardContent className="p-3">
                <h3 className="text-sm font-medium line-clamp-2 min-h-[40px]">{fund.name}</h3>
                <div className="text-xs text-gray-500 mb-2">{fund.category}</div>
                <div className="flex items-center text-fundeasy-green">
                  <TrendingUp size={14} className="mr-0.5" />
                  <span className="font-medium">{fund.returns.oneYear}%</span>
                </div>
                <div className="text-xs text-gray-500">1Y Returns</div>
              </CardContent>
            </Card>
          ))}
          
          {selectedFunds.length < 3 && (
            <Card 
              className="card-shadow flex items-center justify-center cursor-pointer"
              onClick={() => setShowFundSelector(true)}
            >
              <CardContent className="p-3 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                  <Plus size={16} />
                </div>
                <span className="text-xs text-gray-500">Add Fund</span>
              </CardContent>
            </Card>
          )}
        </div>
        
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-full mb-4">
            <SelectValue placeholder="Select comparison period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1y">1 Year Returns</SelectItem>
            <SelectItem value="3y">3 Year Returns</SelectItem>
            <SelectItem value="5y">5 Year Returns</SelectItem>
          </SelectContent>
        </Select>
      
        <Tabs defaultValue="returns">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="returns" className="flex-1">Returns</TabsTrigger>
            <TabsTrigger value="risk" className="flex-1">Risk</TabsTrigger>
            <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="returns">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-4">Returns Comparison</h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                      <span>1Y Returns</span>
                      <span>Performance</span>
                    </div>
                    
                    {selectedFundObjects.map(fund => (
                      <div key={fund.id} className="flex items-center mb-2">
                        <div className="w-24 text-sm line-clamp-1 mr-2">{fund.name.split(' ')[0]}</div>
                        <Progress 
                          value={fund.returns.oneYear} 
                          max={30}
                          className="flex-1 h-6" 
                          indicatorClassName="bg-fundeasy-blue flex items-center justify-end pr-2"
                        />
                        <div className="w-12 text-sm text-right ml-2">{fund.returns.oneYear}%</div>
                      </div>
                    ))}
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                      <span>3Y Returns</span>
                      <span>Performance</span>
                    </div>
                    
                    {selectedFundObjects.map(fund => (
                      <div key={fund.id} className="flex items-center mb-2">
                        <div className="w-24 text-sm line-clamp-1 mr-2">{fund.name.split(' ')[0]}</div>
                        <Progress 
                          value={fund.returns.threeYear} 
                          max={30}
                          className="flex-1 h-6" 
                          indicatorClassName="bg-fundeasy-blue flex items-center justify-end pr-2"
                        />
                        <div className="w-12 text-sm text-right ml-2">{fund.returns.threeYear}%</div>
                      </div>
                    ))}
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                      <span>5Y Returns</span>
                      <span>Performance</span>
                    </div>
                    
                    {selectedFundObjects.map(fund => (
                      <div key={fund.id} className="flex items-center mb-2">
                        <div className="w-24 text-sm line-clamp-1 mr-2">{fund.name.split(' ')[0]}</div>
                        <Progress 
                          value={fund.returns.fiveYear} 
                          max={30}
                          className="flex-1 h-6" 
                          indicatorClassName="bg-fundeasy-blue flex items-center justify-end pr-2"
                        />
                        <div className="w-12 text-sm text-right ml-2">{fund.returns.fiveYear}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="risk">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-4">Risk Analysis</h3>
                
                <div className="space-y-4">
                  {selectedFundObjects.map(fund => (
                    <div key={fund.id} className="border-b pb-4">
                      <h4 className="font-medium mb-2">{fund.name}</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Risk Level</p>
                          <p className={`font-medium ${
                            fund.risk === 'Low' ? 'text-green-600' : 
                            fund.risk === 'Moderate' ? 'text-yellow-600' : 
                            'text-red-600'
                          }`}>{fund.risk}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Volatility</p>
                          <p className="font-medium">{
                            fund.risk === 'Low' ? 'Low' : 
                            fund.risk === 'Moderate' ? 'Medium' : 
                            'High'
                          }</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Beta</p>
                          <p className="font-medium">{
                            fund.risk === 'Low' ? '0.75' : 
                            fund.risk === 'Moderate' ? '0.95' : 
                            '1.15'
                          }</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Standard Deviation</p>
                          <p className="font-medium">{
                            fund.risk === 'Low' ? '8.2%' : 
                            fund.risk === 'Moderate' ? '12.5%' : 
                            '16.8%'
                          }</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="details">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-4">Fund Details</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left text-sm pb-2 font-medium">Detail</th>
                        {selectedFundObjects.map(fund => (
                          <th key={fund.id} className="text-left text-sm pb-2 font-medium">
                            {fund.name.split(' ')[0]}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 text-sm">Category</td>
                        {selectedFundObjects.map(fund => (
                          <td key={fund.id} className="py-2 text-sm">{fund.category}</td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-sm">Risk Level</td>
                        {selectedFundObjects.map(fund => (
                          <td key={fund.id} className="py-2 text-sm">{fund.risk}</td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-sm">AUM</td>
                        {selectedFundObjects.map(fund => (
                          <td key={fund.id} className="py-2 text-sm">₹{fund.aum} Cr.</td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-sm">Expense Ratio</td>
                        {selectedFundObjects.map(fund => (
                          <td key={fund.id} className="py-2 text-sm">{fund.expenseRatio}%</td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-sm">Fund Manager</td>
                        {selectedFundObjects.map(fund => (
                          <td key={fund.id} className="py-2 text-sm">{fund.fundManager}</td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-sm">Min. SIP</td>
                        {selectedFundObjects.map(fund => (
                          <td key={fund.id} className="py-2 text-sm">₹500</td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-sm">Min. Lumpsum</td>
                        {selectedFundObjects.map(fund => (
                          <td key={fund.id} className="py-2 text-sm">₹5,000</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Fund Selector Modal */}
      {showFundSelector && (
        <div className="fixed inset-0 bg-black/50 z-50 flex flex-col">
          <div className="bg-white rounded-t-xl mt-auto max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b sticky top-0 bg-white z-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Select a Fund</h2>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => {
                    setShowFundSelector(false);
                    setSearchQuery('');
                  }}
                >
                  <X size={20} />
                </Button>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search funds..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="p-4">
              {filteredFunds.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">No funds match your search.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredFunds.map(fund => (
                    <Card 
                      key={fund.id} 
                      className={`cursor-pointer ${selectedFunds.includes(fund.id) ? 'border-fundeasy-blue' : ''}`}
                      onClick={() => addFund(fund.id)}
                    >
                      <CardContent className="p-3">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium line-clamp-1">{fund.name}</h4>
                            <div className="text-xs text-gray-500">{fund.category}</div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center text-fundeasy-green">
                              <TrendingUp size={14} className="mr-0.5" />
                              <span className="font-medium">{fund.returns.oneYear}%</span>
                            </div>
                            <div className="text-xs text-gray-500">1Y Returns</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Plus icon component to avoid importing an extra Lucide icon
const Plus = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

export default FundComparison;
