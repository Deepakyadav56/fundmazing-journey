import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, TrendingUp, ChevronRight, AlertCircle } from 'lucide-react';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { mockMutualFunds } from '@/utils/mockData';
import { MutualFund } from '@/types'; // Import the MutualFund type

const FundDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
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
            <div className="flex items-center text-fundeasy-green">
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
                  stroke="#00C853" 
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
                <p className="font-medium text-fundeasy-green">{item.return}%</p>
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
                          <div className="bg-fundeasy-green h-4" style={{ width: '85%' }}></div>
                          <div className="flex justify-between text-xs mt-1">
                            <span>Equity: 85%</span>
                            <span>Debt: 15%</span>
                          </div>
                        </>
                      ) : fund.category === 'Debt' ? (
                        <>
                          <div className="bg-fundeasy-green h-4" style={{ width: '10%' }}></div>
                          <div className="flex justify-between text-xs mt-1">
                            <span>Equity: 10%</span>
                            <span>Debt: 90%</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="bg-fundeasy-green h-4" style={{ width: '60%' }}></div>
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
        <InvestmentModal 
          fund={fund} 
          type="sip" 
          buttonText="Start SIP"
        />
        <InvestmentModal 
          fund={fund} 
          type="lumpsum"
          buttonText="Invest One-time" 
          variant="outline"
        />
      </div>
    </div>
  );
};

interface InvestmentModalProps {
  fund: MutualFund;
  type: 'sip' | 'lumpsum';
  buttonText: string;
  variant?: 'default' | 'outline';
}

const InvestmentModal: React.FC<InvestmentModalProps> = ({ 
  fund, 
  type, 
  buttonText,
  variant = 'default'
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(type === 'sip' ? '500' : '5000');
  const [frequency, setFrequency] = useState('Monthly');
  const [sipDate, setSipDate] = useState('10');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [bank, setBank] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleContinue = () => {
    if (step === 1) {
      // Validate amount
      if (!amount || parseInt(amount) < (type === 'sip' ? 500 : 5000)) {
        toast({
          title: "Invalid amount",
          description: `Minimum investment is ₹${type === 'sip' ? '500' : '5,000'}`,
          variant: "destructive",
        });
        return;
      }
      
      setStep(2);
    } else if (step === 2) {
      // Validate payment details
      if (paymentMethod === 'upi' && !upiId) {
        toast({
          title: "UPI ID required",
          description: "Please enter your UPI ID",
          variant: "destructive",
        });
        return;
      }
      
      if (paymentMethod === 'netbanking' && !bank) {
        toast({
          title: "Bank selection required",
          description: "Please select your bank",
          variant: "destructive",
        });
        return;
      }
      
      setStep(3);
    } else if (step === 3) {
      // Process payment
      setIsProcessing(true);
      
      setTimeout(() => {
        setIsProcessing(false);
        setOpen(false);
        
        toast({
          title: "Investment Successful!",
          description: `Your ${type === 'sip' ? 'SIP' : 'one-time'} investment of ₹${parseInt(amount).toLocaleString()} is being processed.`,
        });
        
        navigate('/portfolio');
      }, 2000);
    }
  };
  
  const handleReset = () => {
    setStep(1);
    setAmount(type === 'sip' ? '500' : '5000');
    setFrequency('Monthly');
    setSipDate('10');
    setPaymentMethod('upi');
    setUpiId('');
    setBank('');
    setIsProcessing(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) handleReset();
    }}>
      <DialogTrigger asChild>
        <Button 
          variant={variant} 
          className={`flex-1 ${variant === 'default' ? 'bg-fundeasy-green hover:bg-fundeasy-dark-green' : ''}`}
        >
          {buttonText}
        </Button>
      </DialogTrigger>
      
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {step === 1 ? (
              type === 'sip' ? 'Start SIP' : 'One-time Investment'
            ) : step === 2 ? (
              'Payment Method'
            ) : (
              'Confirm Investment'
            )}
          </DialogTitle>
        </DialogHeader>
        
        <div>
          {step === 1 && (
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5">₹</span>
                  <Input
                    id="amount"
                    type="number"
                    className="pl-8"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min={type === 'sip' ? 500 : 5000}
                    step={type === 'sip' ? 100 : 1000}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Minimum {type === 'sip' ? 'SIP' : 'investment'}: ₹{type === 'sip' ? '500' : '5,000'}
                </p>
              </div>
              
              {type === 'sip' && (
                <>
                  <div>
                    <Label htmlFor="frequency">Frequency</Label>
                    <RadioGroup 
                      id="frequency" 
                      value={frequency} 
                      onValueChange={setFrequency}
                      className="flex gap-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Monthly" id="monthly" />
                        <Label htmlFor="monthly">Monthly</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Quarterly" id="quarterly" />
                        <Label htmlFor="quarterly">Quarterly</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div>
                    <Label htmlFor="sipDate">SIP Date</Label>
                    <select
                      id="sipDate"
                      value={sipDate}
                      onChange={(e) => setSipDate(e.target.value)}
                      className="w-full rounded-md border border-gray-300 p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-fundeasy-green"
                    >
                      {[1, 5, 10, 15, 20, 25].map(date => (
                        <option key={date} value={date}>{date}th of every month</option>
                      ))}
                    </select>
                  </div>
                </>
              )}
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-4 mt-4">
              <div>
                <Label>Select Payment Method</Label>
                <RadioGroup 
                  value={paymentMethod} 
                  onValueChange={setPaymentMethod}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2 border rounded-md p-3 mb-2">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi">UPI</Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-3">
                    <RadioGroupItem value="netbanking" id="netbanking" />
                    <Label htmlFor="netbanking">Netbanking</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {paymentMethod === 'upi' && (
                <div>
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input
                    id="upiId"
                    placeholder="example@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                </div>
              )}
              
              {paymentMethod === 'netbanking' && (
                <div>
                  <Label htmlFor="bank">Select Bank</Label>
                  <select
                    id="bank"
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                    className="w-full rounded-md border border-gray-300 p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-fundeasy-green"
                  >
                    <option value="">Select a bank</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="axis">Axis Bank</option>
                  </select>
                </div>
              )}
            </div>
          )}
          
          {step === 3 && (
            <div className="mt-4">
              <div className="bg-gray-50 rounded-md p-4">
                <h3 className="text-lg font-medium mb-4">Investment Summary</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fund Name</span>
                    <span className="font-medium">{fund.name}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Investment Type</span>
                    <span className="font-medium">
                      {type === 'sip' ? `SIP (${frequency})` : 'One-time'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount</span>
                    <span className="font-medium">₹{parseInt(amount).toLocaleString()}</span>
                  </div>
                  
                  {type === 'sip' && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">SIP Date</span>
                      <span className="font-medium">{sipDate}th of every month</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method</span>
                    <span className="font-medium">
                      {paymentMethod === 'upi' ? `UPI (${upiId})` : `Netbanking (${bank})`}
                    </span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <p className="text-xs text-gray-500">
                      By confirming, you agree to the scheme information document and fund policies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex gap-3 mt-4">
          {step > 1 && step < 3 && (
            <Button 
              variant="outline" 
              onClick={() => setStep(step - 1)}
              className="flex-1"
            >
              Back
            </Button>
          )}
          
          <Button 
            onClick={handleContinue} 
            disabled={isProcessing}
            className="flex-1 bg-fundeasy-green hover:bg-fundeasy-dark-green"
          >
            {isProcessing ? 
              'Processing...' : 
              step === 3 ? 
                'Confirm' : 
                'Continue'
            }
            {!isProcessing && step !== 3 && <ChevronRight size={16} className="ml-1" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FundDetails;
