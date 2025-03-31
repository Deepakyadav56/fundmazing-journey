
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, CheckCircle2, ChevronRight, 
  Smartphone, Landmark, Wallet, ArrowRight 
} from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const PaymentGateway = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handlePayment = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment Successful",
        description: "Your investment has been processed successfully!"
      });
      navigate('/payment-success');
    }, 2000);
  };
  
  return (
    <PageContainer title="Payment" showBackButton>
      <div className="mb-6">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">Order Summary</h3>
            <div className="flex justify-between items-center mb-1">
              <span className="text-gray-500">Total Investment</span>
              <span className="font-medium">₹15,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Funds</span>
              <span className="text-sm">2 items</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <h3 className="font-medium mb-3">Select Payment Method</h3>
      
      <Tabs defaultValue="upi" className="mb-6">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="upi" className="flex-1">
            <span className="flex items-center">
              <Smartphone size={16} className="mr-2" /> UPI
            </span>
          </TabsTrigger>
          <TabsTrigger value="netbanking" className="flex-1">
            <span className="flex items-center">
              <Landmark size={16} className="mr-2" /> Net Banking
            </span>
          </TabsTrigger>
          <TabsTrigger value="cards" className="flex-1">
            <span className="flex items-center">
              <CreditCard size={16} className="mr-2" /> Cards
            </span>
          </TabsTrigger>
          <TabsTrigger value="wallet" className="flex-1">
            <span className="flex items-center">
              <Wallet size={16} className="mr-2" /> Wallet
            </span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upi">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="upi-id">
                Enter UPI ID
              </label>
              <div className="flex">
                <Input id="upi-id" placeholder="username@upi" className="flex-grow" />
                <Button className="ml-2 bg-fundeasy-green">Verify</Button>
              </div>
              <p className="text-xs text-gray-500">e.g. mobilenumber@upi, username@bank</p>
            </div>
            
            <div className="pt-4">
              <h4 className="text-sm font-medium mb-2">Popular UPI Apps</h4>
              <div className="grid grid-cols-3 gap-2">
                <UpiOption name="Google Pay" iconColor="#4285F4" isSelected={false} />
                <UpiOption name="PhonePe" iconColor="#5F259F" isSelected={true} />
                <UpiOption name="Paytm" iconColor="#00BAF2" isSelected={false} />
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="netbanking">
          <div className="space-y-4">
            <h4 className="text-sm font-medium mb-2">Popular Banks</h4>
            <div className="space-y-2">
              <BankOption name="State Bank of India" isSelected={true} />
              <BankOption name="HDFC Bank" isSelected={false} />
              <BankOption name="ICICI Bank" isSelected={false} />
              <BankOption name="Axis Bank" isSelected={false} />
              <BankOption name="Kotak Mahindra Bank" isSelected={false} />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="cards">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="card-number">
                Card Number
              </label>
              <Input id="card-number" placeholder="XXXX XXXX XXXX XXXX" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="expiry">
                  Expiry Date
                </label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="cvv">
                  CVV
                </label>
                <Input id="cvv" placeholder="XXX" type="password" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="card-name">
                Name on Card
              </label>
              <Input id="card-name" placeholder="Enter name" />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="wallet">
          <div className="space-y-4">
            <h4 className="text-sm font-medium mb-2">Select Wallet</h4>
            <div className="grid grid-cols-2 gap-2">
              <WalletOption name="Paytm" isSelected={true} />
              <WalletOption name="Amazon Pay" isSelected={false} />
              <WalletOption name="PhonePe" isSelected={false} />
              <WalletOption name="MobiKwik" isSelected={false} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <Button 
        className="w-full bg-fundeasy-green"
        onClick={handlePayment}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <span className="flex items-center">
            <span className="animate-spin mr-2">◌</span> Processing...
          </span>
        ) : (
          <span className="flex items-center">
            Pay ₹15,000 <ArrowRight size={16} className="ml-2" />
          </span>
        )}
      </Button>
    </PageContainer>
  );
};

interface UpiOptionProps {
  name: string;
  iconColor: string;
  isSelected: boolean;
}

const UpiOption: React.FC<UpiOptionProps> = ({ name, iconColor, isSelected }) => {
  return (
    <div className={`
      border p-3 rounded-md text-center cursor-pointer hover:bg-gray-50
      ${isSelected ? 'border-fundeasy-green bg-green-50' : 'border-gray-200'}
    `}>
      <div className="w-8 h-8 mx-auto mb-1 rounded-full" style={{ backgroundColor: iconColor }}></div>
      <p className="text-xs">{name}</p>
      {isSelected && (
        <CheckCircle2 size={14} className="mx-auto mt-1 text-fundeasy-green" />
      )}
    </div>
  );
};

interface BankOptionProps {
  name: string;
  isSelected: boolean;
}

const BankOption: React.FC<BankOptionProps> = ({ name, isSelected }) => {
  return (
    <div className={`
      border p-3 rounded-md flex justify-between items-center cursor-pointer hover:bg-gray-50
      ${isSelected ? 'border-fundeasy-green bg-green-50' : 'border-gray-200'}
    `}>
      <div className="flex items-center">
        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold">
          {name.charAt(0)}
        </div>
        <p className="ml-3 text-sm">{name}</p>
      </div>
      {isSelected ? (
        <CheckCircle2 size={18} className="text-fundeasy-green" />
      ) : (
        <ChevronRight size={18} className="text-gray-400" />
      )}
    </div>
  );
};

interface WalletOptionProps {
  name: string;
  isSelected: boolean;
}

const WalletOption: React.FC<WalletOptionProps> = ({ name, isSelected }) => {
  return (
    <div className={`
      border p-3 rounded-md text-center cursor-pointer hover:bg-gray-50
      ${isSelected ? 'border-fundeasy-green bg-green-50' : 'border-gray-200'}
    `}>
      <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-gray-100 flex items-center justify-center">
        <Wallet size={18} />
      </div>
      <p className="text-sm">{name}</p>
      {isSelected && (
        <CheckCircle2 size={14} className="mx-auto mt-1 text-fundeasy-green" />
      )}
    </div>
  );
};

export default PaymentGateway;
