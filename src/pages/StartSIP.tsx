
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check, ChevronRight, Info, Calendar, AlertCircle } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { mockMutualFunds } from '@/utils/mockData';
import { useToast } from '@/hooks/use-toast';
import confetti from '@/utils/confetti';

const StartSIP = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const fund = mockMutualFunds.find(f => f.id === id);
  
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('500');
  const [frequency, setFrequency] = useState('Monthly');
  const [sipDate, setSipDate] = useState('10');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [bank, setBank] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  if (!fund) {
    return (
      <PageContainer 
        title="Start SIP" 
        showBackButton
      >
        <div className="text-center py-10">
          <p className="text-gray-600">Fund not found. Please try again.</p>
          <Button 
            onClick={() => navigate('/explore')}
            className="mt-4 bg-fundeasy-blue hover:bg-fundeasy-dark-blue"
          >
            Go to Explore
          </Button>
        </div>
      </PageContainer>
    );
  }
  
  const handleContinue = () => {
    if (step === 1) {
      // Validate amount
      if (!amount || parseInt(amount) < 500) {
        toast({
          title: "Invalid amount",
          description: "Minimum SIP amount is ₹500",
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
        confetti();
        
        toast({
          title: "SIP Started Successfully!",
          description: `Your ${frequency.toLowerCase()} SIP of ₹${parseInt(amount).toLocaleString()} has been set up.`,
        });
        
        navigate('/sip-dashboard');
      }, 2000);
    }
  };
  
  return (
    <PageContainer 
      title="Start SIP" 
      showBackButton
    >
      {/* Progress Steps */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  i < step ? 'bg-fundeasy-blue text-white' : 
                  i === step ? 'bg-fundeasy-blue text-white' : 
                  'bg-gray-200 text-gray-600'
                }`}
              >
                {i < step ? <Check size={16} /> : i}
              </div>
              <span className="text-xs text-gray-500">
                {i === 1 ? 'Amount' : i === 2 ? 'Payment' : 'Confirm'}
              </span>
            </div>
          ))}
        </div>
        
        <div className="relative flex justify-between h-0.5 mt-4 mb-8">
          <div className="absolute left-0 right-0 h-0.5 bg-gray-200"></div>
          <div 
            className="absolute left-0 h-0.5 bg-fundeasy-blue transition-all duration-300" 
            style={{ width: `${(step-1) * 50}%` }}
          ></div>
        </div>
      </div>
      
      {/* Fund Info Card */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <PieChart className="text-fundeasy-blue" />
            </div>
            <div>
              <h3 className="font-medium line-clamp-1">{fund.name}</h3>
              <p className="text-sm text-gray-500">{fund.category} • {fund.risk} Risk</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Step Content */}
      {step === 1 && (
        <Card className="mb-6">
          <CardContent className="p-4 space-y-4">
            <div>
              <Label htmlFor="amount" className="text-base font-medium">Investment Amount</Label>
              <div className="relative mt-2">
                <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                <Input
                  id="amount"
                  type="number"
                  className="pl-8"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min={500}
                  step={100}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1 flex items-center">
                <Info size={12} className="inline mr-1" /> Minimum SIP amount: ₹500
              </p>
            </div>
            
            <div className="pt-2">
              <Label htmlFor="frequency" className="text-base font-medium">SIP Frequency</Label>
              <RadioGroup 
                id="frequency" 
                value={frequency} 
                onValueChange={setFrequency}
                className="grid grid-cols-2 gap-4 mt-3"
              >
                <div className="border rounded-lg p-3 flex items-center space-x-2 cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="Monthly" id="monthly" />
                  <Label htmlFor="monthly" className="cursor-pointer">Monthly</Label>
                </div>
                <div className="border rounded-lg p-3 flex items-center space-x-2 cursor-pointer hover:bg-gray-50">
                  <RadioGroupItem value="Quarterly" id="quarterly" />
                  <Label htmlFor="quarterly" className="cursor-pointer">Quarterly</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="pt-2">
              <Label htmlFor="sipDate" className="text-base font-medium">SIP Date</Label>
              <div className="relative mt-2">
                <Calendar size={16} className="absolute left-3 top-2.5 text-gray-500" />
                <select
                  id="sipDate"
                  value={sipDate}
                  onChange={(e) => setSipDate(e.target.value)}
                  className="w-full rounded-md border border-gray-300 pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-fundeasy-blue focus:border-transparent"
                >
                  {[1, 5, 10, 15, 20, 25].map(date => (
                    <option key={date} value={date}>{date}th of every month</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {step === 2 && (
        <Card className="mb-6">
          <CardContent className="p-4 space-y-4">
            <Label className="text-base font-medium">Select Payment Method</Label>
            
            <RadioGroup 
              value={paymentMethod} 
              onValueChange={setPaymentMethod}
              className="space-y-3 mt-2"
            >
              <div className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === 'upi' ? 'border-fundeasy-blue bg-blue-50' : ''}`}>
                <div className="flex items-start">
                  <RadioGroupItem value="upi" id="upi" />
                  <div className="ml-3 flex-grow">
                    <Label htmlFor="upi" className="font-medium cursor-pointer">UPI</Label>
                    <p className="text-sm text-gray-500">Pay using any UPI app</p>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-6 h-6 bg-green-100 rounded-full"></div>
                    <div className="w-6 h-6 bg-blue-100 rounded-full"></div>
                  </div>
                </div>
                
                {paymentMethod === 'upi' && (
                  <div className="mt-3 pl-7">
                    <Label htmlFor="upiId" className="text-sm">UPI ID</Label>
                    <Input
                      id="upiId"
                      placeholder="example@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                )}
              </div>
              
              <div className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === 'netbanking' ? 'border-fundeasy-blue bg-blue-50' : ''}`}>
                <div className="flex items-start">
                  <RadioGroupItem value="netbanking" id="netbanking" />
                  <div className="ml-3 flex-grow">
                    <Label htmlFor="netbanking" className="font-medium cursor-pointer">Net Banking</Label>
                    <p className="text-sm text-gray-500">Pay using your bank account</p>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-6 h-6 bg-gray-100 rounded-full"></div>
                    <div className="w-6 h-6 bg-gray-100 rounded-full"></div>
                  </div>
                </div>
                
                {paymentMethod === 'netbanking' && (
                  <div className="mt-3 pl-7">
                    <Label htmlFor="bank" className="text-sm">Select Bank</Label>
                    <select
                      id="bank"
                      value={bank}
                      onChange={(e) => setBank(e.target.value)}
                      className="w-full rounded-md border border-gray-300 p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-fundeasy-blue focus:border-transparent"
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
            </RadioGroup>
          </CardContent>
        </Card>
      )}
      
      {step === 3 && (
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-4">Investment Summary</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Fund Name</span>
                <span className="font-medium">{fund.name}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Investment Type</span>
                <span className="font-medium">SIP ({frequency})</span>
              </div>
              
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Amount</span>
                <span className="font-medium">₹{parseInt(amount).toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between py-2">
                <span className="text-gray-600">SIP Date</span>
                <span className="font-medium">{sipDate}th of every month</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Payment Method</span>
                <span className="font-medium">
                  {paymentMethod === 'upi' ? `UPI (${upiId})` : `Netbanking (${bank})`}
                </span>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg mt-4 flex">
                <AlertCircle size={18} className="text-fundeasy-blue mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700">
                  By proceeding, you authorize FundEasy to debit ₹{parseInt(amount).toLocaleString()} 
                  from your bank account on the {sipDate}th of every month until cancelled.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Action Button */}
      <div className="mb-6">
        <Button 
          onClick={handleContinue}
          disabled={isProcessing}
          className="w-full bg-fundeasy-blue hover:bg-fundeasy-dark-blue h-12 text-base"
        >
          {isProcessing ? 'Processing...' : step === 3 ? 'Confirm & Start SIP' : 'Continue'}
          {!isProcessing && step !== 3 && <ChevronRight className="ml-1" />}
        </Button>
        
        {step > 1 && (
          <Button
            variant="link"
            onClick={() => setStep(step - 1)}
            className="w-full mt-2 text-gray-600"
          >
            Go Back
          </Button>
        )}
      </div>
      
      {/* Disclaimer */}
      <div className="flex items-center mb-16 bg-gray-50 p-3 rounded-md">
        <AlertCircle size={16} className="text-amber-500 mr-2 flex-shrink-0" />
        <p className="text-xs text-gray-600">
          Mutual fund investments are subject to market risks. Read all scheme related documents carefully before investing.
        </p>
      </div>
    </PageContainer>
  );
};

export default StartSIP;
