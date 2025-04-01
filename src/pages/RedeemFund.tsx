
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Info, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { mockMutualFunds } from '@/utils/mockData';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import confetti from '@/utils/confetti';

const RedeemFund = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const fund = mockMutualFunds.find(f => f.id === id);
  
  // Mock investment data
  const investment = {
    totalUnits: 560.432,
    currentValue: 15600,
    purchaseValue: 14000,
    absReturns: 11.43, // in percentage
    purchaseDate: '15 Jan 2023',
    lastNAV: 27.84,
  };
  
  const [redeemType, setRedeemType] = useState<'units' | 'amount'>('units');
  const [redeemValue, setRedeemValue] = useState('');
  const [redeemAll, setRedeemAll] = useState(false);
  const [bankAccount, setBankAccount] = useState('hdfc');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1);
  
  if (!fund) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="text-center py-10">
          <p className="text-gray-600">Fund not found. Please try again.</p>
          <Button 
            onClick={() => navigate('/portfolio')}
            className="mt-4 bg-fundeasy-blue hover:bg-fundeasy-dark-blue"
          >
            Go to Portfolio
          </Button>
        </div>
      </div>
    );
  }

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value || /^\d*\.?\d*$/.test(value)) {
      setRedeemValue(value);
    }
  };
  
  const handleRedeemAll = (checked: boolean) => {
    setRedeemAll(checked);
    if (checked) {
      setRedeemValue(redeemType === 'units' ? investment.totalUnits.toString() : investment.currentValue.toString());
    } else {
      setRedeemValue('');
    }
  };
  
  const getEstimatedAmount = () => {
    if (!redeemValue) return 0;
    if (redeemType === 'units') {
      return parseFloat(redeemValue) * investment.lastNAV;
    }
    return parseFloat(redeemValue);
  };
  
  const getEstimatedUnits = () => {
    if (!redeemValue) return 0;
    if (redeemType === 'amount') {
      return parseFloat(redeemValue) / investment.lastNAV;
    }
    return parseFloat(redeemValue);
  };
  
  const handleContinue = () => {
    if (step === 1) {
      // Validation
      if (!redeemValue || parseFloat(redeemValue) <= 0) {
        toast({
          title: "Invalid value",
          description: `Please enter a valid ${redeemType === 'units' ? 'number of units' : 'amount'}`,
          variant: "destructive",
        });
        return;
      }
      
      if (redeemType === 'units' && parseFloat(redeemValue) > investment.totalUnits) {
        toast({
          title: "Invalid units",
          description: `You can't redeem more than ${investment.totalUnits} units`,
          variant: "destructive",
        });
        return;
      }
      
      if (redeemType === 'amount' && parseFloat(redeemValue) > investment.currentValue) {
        toast({
          title: "Invalid amount",
          description: `You can't redeem more than ₹${investment.currentValue.toLocaleString()}`,
          variant: "destructive",
        });
        return;
      }
      
      setStep(2);
    } else {
      // Process redemption
      setIsProcessing(true);
      
      setTimeout(() => {
        setIsProcessing(false);
        confetti();
        
        toast({
          title: "Redemption Request Submitted",
          description: "Your redemption request has been successfully submitted. The amount will be credited to your bank account within 2-3 business days.",
        });
        
        navigate('/transactions');
      }, 2000);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center p-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-medium line-clamp-1">Redeem {fund.name}</h1>
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        {/* Fund Info Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{fund.name}</h3>
                <p className="text-sm text-gray-500">{fund.category}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-semibold">₹{investment.currentValue.toLocaleString()}</p>
                <div className="flex items-center justify-end">
                  <span className={`text-sm ${investment.absReturns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {investment.absReturns >= 0 ? '+' : ''}{investment.absReturns}%
                  </span>
                  <span className="text-xs ml-1 text-gray-500">Overall</span>
                </div>
              </div>
            </div>
            
            <Separator className="my-3" />
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-500">Units</p>
                <p className="font-medium">{investment.totalUnits.toFixed(3)}</p>
              </div>
              <div>
                <p className="text-gray-500">Purchase Value</p>
                <p className="font-medium">₹{investment.purchaseValue.toLocaleString()}</p>
              </div>
              <div className="mt-2">
                <p className="text-gray-500">Purchase Date</p>
                <p className="font-medium">{investment.purchaseDate}</p>
              </div>
              <div className="mt-2">
                <p className="text-gray-500">Current NAV</p>
                <p className="font-medium">₹{investment.lastNAV}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {step === 1 ? (
          <>
            {/* Redemption Options */}
            <Card>
              <CardContent className="p-4 space-y-4">
                <div>
                  <Label className="text-base font-medium">How do you want to redeem?</Label>
                  <RadioGroup 
                    value={redeemType} 
                    onValueChange={(value) => {
                      setRedeemType(value as 'units' | 'amount');
                      setRedeemValue('');
                      setRedeemAll(false);
                    }}
                    className="grid grid-cols-2 gap-4 mt-3"
                  >
                    <div className={`border rounded-lg p-3 flex items-center space-x-2 cursor-pointer hover:bg-gray-50 ${redeemType === 'units' ? 'border-fundeasy-blue bg-blue-50' : ''}`}>
                      <RadioGroupItem value="units" id="units" />
                      <Label htmlFor="units" className="cursor-pointer">By Units</Label>
                    </div>
                    <div className={`border rounded-lg p-3 flex items-center space-x-2 cursor-pointer hover:bg-gray-50 ${redeemType === 'amount' ? 'border-fundeasy-blue bg-blue-50' : ''}`}>
                      <RadioGroupItem value="amount" id="amount" />
                      <Label htmlFor="amount" className="cursor-pointer">By Amount</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <div className="flex justify-between">
                    <Label htmlFor="redeemValue" className="text-base font-medium">
                      {redeemType === 'units' ? 'Units to Redeem' : 'Amount to Redeem'}
                    </Label>
                    <div className="flex items-center text-sm">
                      <span className="mr-2">Redeem All</span>
                      <Switch 
                        checked={redeemAll}
                        onCheckedChange={handleRedeemAll}
                      />
                    </div>
                  </div>
                  
                  <div className="relative mt-2">
                    {redeemType === 'amount' && (
                      <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                    )}
                    <Input
                      id="redeemValue"
                      type="text"
                      className={redeemType === 'amount' ? "pl-8" : ""}
                      value={redeemValue}
                      onChange={handleValueChange}
                      placeholder={redeemType === 'units' ? 'Enter units' : 'Enter amount'}
                    />
                  </div>
                  
                  <div className="mt-3 flex justify-between text-sm">
                    <span className="text-gray-500">
                      {redeemType === 'units' ? 'Available Units' : 'Available Amount'}
                    </span>
                    <span className="font-medium">
                      {redeemType === 'units' 
                        ? `${investment.totalUnits.toFixed(3)} units`
                        : `₹${investment.currentValue.toLocaleString()}`
                      }
                    </span>
                  </div>
                </div>
                
                {redeemValue && !isNaN(parseFloat(redeemValue)) && (
                  <div className="p-3 bg-blue-50 rounded-lg space-y-2">
                    <h4 className="font-medium text-sm">Redemption Summary</h4>
                    <div className="flex justify-between text-sm">
                      <span>Units to be redeemed</span>
                      <span className="font-medium">{getEstimatedUnits().toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Estimated amount</span>
                      <span className="font-medium">₹{getEstimatedAmount().toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Bank Account Selection */}
            <Card>
              <CardContent className="p-4">
                <Label className="text-base font-medium">Select Bank Account</Label>
                <RadioGroup 
                  value={bankAccount} 
                  onValueChange={setBankAccount}
                  className="mt-3 space-y-3"
                >
                  {[
                    { id: 'hdfc', name: 'HDFC Bank', number: 'XXXX XXXX 1234' },
                    { id: 'sbi', name: 'State Bank of India', number: 'XXXX XXXX 5678' }
                  ].map(bank => (
                    <div 
                      key={bank.id}
                      className={`border rounded-lg p-3 flex items-center space-x-2 cursor-pointer hover:bg-gray-50 ${
                        bankAccount === bank.id ? 'border-fundeasy-blue bg-blue-50' : ''
                      }`}
                    >
                      <RadioGroupItem value={bank.id} id={bank.id} />
                      <div className="ml-2">
                        <Label htmlFor={bank.id} className="cursor-pointer font-medium">{bank.name}</Label>
                        <p className="text-xs text-gray-500">{bank.number}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          </>
        ) : (
          /* Confirmation Screen */
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-medium mb-4">Redemption Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Fund Name</span>
                  <span className="font-medium">{fund.name}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Units to Redeem</span>
                  <span className="font-medium">{getEstimatedUnits().toFixed(3)}</span>
                </div>
                
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Redemption Amount</span>
                  <span className="font-medium">₹{getEstimatedAmount().toLocaleString()}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Bank Account</span>
                  <span className="font-medium">
                    {bankAccount === 'hdfc' ? 'HDFC Bank' : 'State Bank of India'}
                  </span>
                </div>
                
                <div className="p-3 bg-blue-50 rounded-lg mt-4 flex">
                  <Info size={18} className="text-fundeasy-blue mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-700">
                    The redemption amount will be credited to your bank account within 2-3 business days.
                    Redemption is subject to exit load and applicable taxes as per the scheme details.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Action Button */}
        <Button 
          onClick={handleContinue}
          disabled={isProcessing || (!redeemValue && step === 1)}
          className="w-full bg-fundeasy-blue hover:bg-fundeasy-dark-blue h-12 text-base"
        >
          {isProcessing ? 'Processing...' : step === 1 ? 'Continue' : 'Confirm Redemption'}
        </Button>
        
        {step === 2 && (
          <Button
            variant="link"
            onClick={() => setStep(1)}
            className="w-full mt-2 text-gray-600"
          >
            Go Back
          </Button>
        )}
        
        {/* Tax Note */}
        <div className="flex items-center bg-amber-50 p-3 rounded-md">
          <AlertCircle size={16} className="text-amber-500 mr-2 flex-shrink-0" />
          <p className="text-xs text-gray-700">
            Short-term capital gains (held for less than 1 year) are taxed at 15%. 
            Long-term capital gains above ₹1 lakh are taxed at 10% without indexation benefit.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RedeemFund;
