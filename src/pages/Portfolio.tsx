
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDownRight, ArrowUpRight, ChevronDown, ChevronUp, Trash2, MoreHorizontal } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  mockMutualFunds, 
  mockUserInvestments, 
  calculateTotalInvestment,
  calculateCurrentValue,
  calculateReturns
} from '@/utils/mockData';

const Portfolio = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Calculate portfolio metrics
  const totalInvestment = calculateTotalInvestment(mockUserInvestments);
  const currentValue = calculateCurrentValue(mockUserInvestments);
  const returnsPercentage = calculateReturns(totalInvestment, currentValue);
  const absoluteReturns = currentValue - totalInvestment;
  
  // State for expanded investments
  const [expandedInvestments, setExpandedInvestments] = useState<string[]>([]);
  
  const toggleExpand = (id: string) => {
    setExpandedInvestments(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };
  
  return (
    <PageContainer title="Your Portfolio">
      {/* Portfolio Summary */}
      <div className="mb-6">
        <Card className="mb-4">
          <CardContent className="pt-6">
            <h2 className="text-lg font-medium mb-3">Portfolio Summary</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-sm">Total Invested</p>
                <p className="text-xl font-bold">₹{totalInvestment.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Current Value</p>
                <p className="text-xl font-bold">₹{currentValue.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="mt-4 bg-gray-50 p-3 rounded-md flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Total Returns</p>
                <div className="flex items-center">
                  <p className={`text-xl font-bold ${absoluteReturns >= 0 ? 'text-fundeasy-green' : 'text-fundeasy-red'}`}>
                    {absoluteReturns >= 0 ? '+' : '-'}₹{Math.abs(absoluteReturns).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className={`flex items-center ${absoluteReturns >= 0 ? 'text-fundeasy-green' : 'text-fundeasy-red'}`}>
                {absoluteReturns >= 0 ? (
                  <ArrowUpRight size={20} />
                ) : (
                  <ArrowDownRight size={20} />
                )}
                <span className="font-bold text-xl ml-1">
                  {Math.abs(returnsPercentage).toFixed(2)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Investments */}
      <div>
        <h2 className="text-lg font-medium mb-3">Your Investments</h2>
        {mockUserInvestments.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">You don't have any investments yet.</p>
            <Button 
              onClick={() => navigate('/explore')}
              className="bg-fundeasy-green hover:bg-fundeasy-dark-green"
            >
              Explore Funds
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {mockUserInvestments.map(investment => {
              const fund = mockMutualFunds.find(f => f.id === investment.fundId);
              const isExpanded = expandedInvestments.includes(investment.id);
              const returns = investment.currentValue ? investment.currentValue - investment.amount : 0;
              const returnsPercent = investment.amount > 0 ? (returns / investment.amount) * 100 : 0;
              
              if (!fund) return null;
              
              return (
                <Card key={investment.id} className="card-shadow">
                  <CardContent className="p-0">
                    <div 
                      className="p-4 cursor-pointer"
                      onClick={() => toggleExpand(investment.id)}
                    >
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">{fund.name}</h3>
                          <p className="text-xs text-gray-500 mt-1">
                            {investment.investmentType === 'SIP' 
                              ? `SIP · ${investment.sipDetails?.frequency}`
                              : 'One-time Investment'
                            }
                          </p>
                        </div>
                        <div className="flex items-center">
                          {isExpanded ? (
                            <ChevronUp size={20} />
                          ) : (
                            <ChevronDown size={20} />
                          )}
                        </div>
                      </div>
                      
                      <div className="flex justify-between mt-3">
                        <div>
                          <p className="text-xs text-gray-500">Current Value</p>
                          <p className="font-medium">₹{investment.currentValue?.toLocaleString() || 0}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Invested</p>
                          <p className="font-medium">₹{investment.amount.toLocaleString()}</p>
                        </div>
                        <div className={`text-right ${returns >= 0 ? 'text-fundeasy-green' : 'text-fundeasy-red'}`}>
                          <p className="text-xs text-gray-500">Returns</p>
                          <div className="flex items-center justify-end">
                            {returns >= 0 ? (
                              <ArrowUpRight size={14} className="mr-0.5" />
                            ) : (
                              <ArrowDownRight size={14} className="mr-0.5" />
                            )}
                            <p className="font-medium">{Math.abs(returnsPercent).toFixed(2)}%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {isExpanded && (
                      <div className="border-t border-gray-200 p-4">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Units</span>
                            <span className="text-sm">{investment.units.toFixed(3)}</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">NAV</span>
                            <span className="text-sm">₹{fund.navValue.toFixed(2)}</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Investment Date</span>
                            <span className="text-sm">
                              {new Date(investment.investmentDate).toLocaleDateString()}
                            </span>
                          </div>
                          
                          {investment.investmentType === 'SIP' && investment.sipDetails && (
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Next SIP Date</span>
                              <span className="text-sm">
                                {new Date(investment.sipDetails.nextDate).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                          
                          <div className="pt-3 mt-3 border-t border-gray-100 flex justify-between gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="flex-1"
                              onClick={() => navigate(`/fund/${fund.id}`)}
                            >
                              View Fund
                            </Button>
                            
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="flex-1"
                              onClick={() => navigate(`/fund/${fund.id}`)}
                            >
                              Invest More
                            </Button>
                            
                            <RedeemModal
                              investment={investment}
                              fund={fund}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
        
        <Button 
          variant="outline" 
          className="w-full mt-4 border-dashed"
          onClick={() => navigate('/explore')}
        >
          Add New Investment
        </Button>
      </div>
    </PageContainer>
  );
};

interface RedeemModalProps {
  investment: any;
  fund: any;
}

const RedeemModal: React.FC<RedeemModalProps> = ({ investment, fund }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [units, setUnits] = useState(investment.units.toFixed(3));
  const [isProcessing, setIsProcessing] = useState(false);
  
  const maxUnits = investment.units;
  const estimatedAmount = parseFloat(units) * fund.navValue;
  
  const handleRedeem = () => {
    if (parseFloat(units) <= 0 || parseFloat(units) > maxUnits) {
      toast({
        title: "Invalid units",
        description: `Please enter a value between 0 and ${maxUnits}`,
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setOpen(false);
      
      toast({
        title: "Redemption Successful",
        description: `Your redemption request for ${units} units (₹${estimatedAmount.toLocaleString()}) has been submitted.`,
      });
      
      // In a real app, we would update the state/database here
    }, 2000);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="flex-1 text-fundeasy-red border-fundeasy-red border-opacity-20"
        >
          Redeem
        </Button>
      </DialogTrigger>
      
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Redeem Investment</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div>
            <h3 className="text-lg font-medium">{fund.name}</h3>
            <p className="text-sm text-gray-500">
              {investment.investmentType === 'SIP' ? 'SIP Investment' : 'One-time Investment'}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Available Units</p>
              <p className="font-medium">{maxUnits.toFixed(3)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Current NAV</p>
              <p className="font-medium">₹{fund.navValue.toFixed(2)}</p>
            </div>
          </div>
          
          <div>
            <label htmlFor="units" className="block text-sm font-medium mb-1">
              Units to Redeem
            </label>
            <Input
              id="units"
              type="number"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              min={0}
              max={maxUnits}
              step={0.001}
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">Min: 0</span>
              <span className="text-xs text-gray-500">Max: {maxUnits.toFixed(3)}</span>
            </div>
            
            <div className="flex justify-between items-center mt-4 bg-gray-50 p-3 rounded-md">
              <p className="text-sm font-medium">Estimated Amount</p>
              <p className="font-bold">₹{estimatedAmount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}</p>
            </div>
          </div>
          
          {fund.category === 'Equity' && (
            <div className="bg-amber-50 p-3 rounded-md">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-amber-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-amber-900">Exit Load Applicable</p>
                  <p className="text-xs text-amber-800 mt-0.5">
                    1% if redeemed within 1 year of investment
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex gap-3 mt-4">
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          
          <Button 
            onClick={handleRedeem} 
            disabled={isProcessing}
            className="flex-1 bg-fundeasy-green hover:bg-fundeasy-dark-green"
          >
            {isProcessing ? 'Processing...' : 'Confirm Redemption'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Portfolio;
