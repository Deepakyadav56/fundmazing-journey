
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Search, Info, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CompareCard from './CompareCard';
import { mockMutualFunds } from '@/utils/mockData';
import FundLogoImage from './FundLogoImage';
import { Input } from '@/components/ui/input';
import { MutualFund } from '@/types';

interface FundComparisonDetailsProps {
  initialFunds?: MutualFund[];
}

const FundComparisonDetails: React.FC<FundComparisonDetailsProps> = ({
  initialFunds = []
}) => {
  const navigate = useNavigate();
  const [funds, setFunds] = useState<MutualFund[]>(initialFunds.length ? initialFunds : [mockMutualFunds[0]]);
  const [showFundSelector, setShowFundSelector] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const maxFunds = 3;
  const canAddMoreFunds = funds.length < maxFunds;
  
  const handleAddFund = () => {
    setShowFundSelector(true);
  };
  
  const handleRemoveFund = (index: number) => {
    setFunds(funds.filter((_, i) => i !== index));
  };
  
  const handleSelectFund = (fund: MutualFund) => {
    if (funds.some(f => f.id === fund.id)) return;
    
    setFunds([...funds, fund]);
    setShowFundSelector(false);
    setSearchQuery('');
  };
  
  const filteredFunds = mockMutualFunds
    .filter(fund => !funds.some(f => f.id === fund.id))
    .filter(fund => 
      fund.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      fund.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
  const parameterList = [
    { name: 'Returns', tabs: ['1Y', '3Y', '5Y'] },
    { name: 'Risk Measures', tabs: ['Standard Deviation', 'Beta', 'Sharpe Ratio'] },
    { name: 'Portfolio', tabs: ['Top Holdings', 'Sector Allocation'] },
    { name: 'Fees & Ratings', tabs: ['Expense Ratio', 'Fund Manager', 'Rating'] },
  ];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {funds.map((fund, index) => (
          <CompareCard 
            key={fund.id} 
            fund={{
              id: fund.id,
              name: fund.name,
              amc: fund.category, // Using category as AMC since MutualFund doesn't have amc
              returns: fund.returns,
              nav: fund.navValue, // Using navValue as nav
              aum: fund.aum.toString(), // Converting aum to string
              risk: fund.risk,
              category: fund.category,
              expenseRatio: fund.expenseRatio
            }}
            onRemove={() => handleRemoveFund(index)}
          />
        ))}
        
        {canAddMoreFunds && (
          <CompareCard 
            isEmpty 
            onAdd={handleAddFund}
          />
        )}
      </div>
      
      {funds.length > 1 && (
        <>
          {parameterList.map((parameter, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  {parameter.name}
                  <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                    <Info size={14} />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue={parameter.tabs[0]}>
                  <TabsList className="mb-4">
                    {parameter.tabs.map(tab => (
                      <TabsTrigger key={tab} value={tab}>{tab}</TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {parameter.tabs.map(tab => (
                    <TabsContent key={tab} value={tab} className="pt-2">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {funds.map(fund => (
                          <div key={fund.id} className="border rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <FundLogoImage fundName={fund.name} size="sm" />
                              <p className="font-medium text-sm">{fund.name}</p>
                            </div>
                            
                            {parameter.name === 'Returns' && (
                              <div className="flex items-end gap-2">
                                <span className={`text-xl font-semibold ${
                                  tab === '1Y' ? (fund.returns.oneYear >= 0 ? 'text-fundeasy-green' : 'text-red-500') :
                                  tab === '3Y' ? (fund.returns.threeYear >= 0 ? 'text-fundeasy-green' : 'text-red-500') :
                                  (fund.returns.fiveYear >= 0 ? 'text-fundeasy-green' : 'text-red-500')
                                }`}>
                                  {tab === '1Y' ? fund.returns.oneYear :
                                   tab === '3Y' ? fund.returns.threeYear :
                                   fund.returns.fiveYear}%
                                </span>
                                <span className="text-gray-500 text-sm">CAGR</span>
                              </div>
                            )}
                            
                            {parameter.name === 'Risk Measures' && (
                              <div>
                                {tab === 'Standard Deviation' && (
                                  <span className="text-xl font-semibold">
                                    {(Math.random() * 10).toFixed(2)}%
                                  </span>
                                )}
                                {tab === 'Beta' && (
                                  <span className="text-xl font-semibold">
                                    {(0.5 + Math.random()).toFixed(2)}
                                  </span>
                                )}
                                {tab === 'Sharpe Ratio' && (
                                  <span className="text-xl font-semibold">
                                    {(Math.random() * 2 + 0.5).toFixed(2)}
                                  </span>
                                )}
                              </div>
                            )}
                            
                            {parameter.name === 'Portfolio' && (
                              <div>
                                {tab === 'Top Holdings' && (
                                  <ul className="space-y-2 text-sm">
                                    <li className="flex justify-between">
                                      <span>HDFC Bank</span>
                                      <span>{(Math.random() * 10).toFixed(2)}%</span>
                                    </li>
                                    <li className="flex justify-between">
                                      <span>Reliance Industries</span>
                                      <span>{(Math.random() * 8).toFixed(2)}%</span>
                                    </li>
                                    <li className="flex justify-between">
                                      <span>Infosys</span>
                                      <span>{(Math.random() * 6).toFixed(2)}%</span>
                                    </li>
                                  </ul>
                                )}
                                {tab === 'Sector Allocation' && (
                                  <ul className="space-y-2 text-sm">
                                    <li className="flex justify-between">
                                      <span>Financial Services</span>
                                      <span>{(Math.random() * 30 + 15).toFixed(2)}%</span>
                                    </li>
                                    <li className="flex justify-between">
                                      <span>Technology</span>
                                      <span>{(Math.random() * 20 + 10).toFixed(2)}%</span>
                                    </li>
                                    <li className="flex justify-between">
                                      <span>Consumer Goods</span>
                                      <span>{(Math.random() * 15 + 5).toFixed(2)}%</span>
                                    </li>
                                  </ul>
                                )}
                              </div>
                            )}
                            
                            {parameter.name === 'Fees & Ratings' && (
                              <div>
                                {tab === 'Expense Ratio' && (
                                  <span className="text-xl font-semibold">
                                    {fund.expenseRatio}%
                                  </span>
                                )}
                                {tab === 'Fund Manager' && (
                                  <span className="text-base">
                                    {fund.fundManager}
                                  </span>
                                )}
                                {tab === 'Rating' && (
                                  <div className="flex">
                                    {'★'.repeat(Math.floor(Math.random() * 2) + 4)}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          ))}
          
          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              className="border-fundeasy-medium-gray"
              onClick={() => navigate('/explore')}
            >
              Back to Explore
            </Button>
            <Button className="bg-fundeasy-green">
              Download Comparison
            </Button>
          </div>
        </>
      )}
      
      <Dialog open={showFundSelector} onOpenChange={setShowFundSelector}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Fund to Compare</DialogTitle>
            <DialogDescription>
              Select a fund to add to your comparison
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                placeholder="Search funds..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="max-h-[300px] overflow-y-auto space-y-2">
              {filteredFunds.length === 0 ? (
                <p className="text-center py-8 text-gray-500">No funds found</p>
              ) : (
                filteredFunds.map(fund => (
                  <div 
                    key={fund.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-fundeasy-light-green/10 hover:border-fundeasy-green cursor-pointer"
                    onClick={() => handleSelectFund(fund)}
                  >
                    <div className="flex items-center gap-3">
                      <FundLogoImage fundName={fund.name} size="sm" />
                      <div>
                        <p className="font-medium">{fund.name}</p>
                        <p className="text-xs text-gray-500">{fund.category} • {fund.risk}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${fund.returns.oneYear >= 0 ? 'text-fundeasy-green' : 'text-red-500'}`}>
                        {fund.returns.oneYear >= 0 ? '+' : ''}{fund.returns.oneYear}%
                      </p>
                      <p className="text-xs text-gray-500">1Y Returns</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FundComparisonDetails;
