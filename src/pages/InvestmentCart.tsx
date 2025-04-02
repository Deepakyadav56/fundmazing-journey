
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Info, ChevronRight, CreditCard, AlertTriangle, Calendar, CheckCircle2 } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { mockMutualFunds } from '@/utils/mockData';
import { useToast } from '@/hooks/use-toast';
import FundLogo from '@/components/funds/FundLogo';
import { cn } from '@/lib/utils';

// Sample cart items
const initialCartItems = [
  { fundId: "fund1", amount: 5000 },
  { fundId: "fund3", amount: 10000 },
];

const InvestmentCart = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [investmentType, setInvestmentType] = useState<'ONE_TIME' | 'SIP'>('ONE_TIME');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'netbanking' | 'card' | ''>('');
  
  const getFundDetails = (fundId: string) => {
    return mockMutualFunds.find(fund => fund.id === fundId);
  };
  
  const handleAmountChange = (fundId: string, amount: string) => {
    const newAmount = parseInt(amount) || 0;
    setCartItems(items => 
      items.map(item => 
        item.fundId === fundId ? { ...item, amount: newAmount } : item
      )
    );
  };
  
  const handleRemoveItem = (fundId: string) => {
    setCartItems(items => items.filter(item => item.fundId !== fundId));
  };
  
  const totalAmount = cartItems.reduce((sum, item) => sum + item.amount, 0);
  
  const handleCheckout = () => {
    if (!paymentMethod) {
      toast({
        title: "Please select a payment method",
        description: "Choose a payment method to continue",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Payment Initiated",
      description: `Processing your ${investmentType === 'SIP' ? 'SIP' : 'one-time'} investment of ₹${totalAmount.toLocaleString()}`
    });
    navigate('/payment-gateway');
  };
  
  const PaymentMethod = ({ 
    type, 
    title, 
    description, 
    icon 
  }: { 
    type: 'upi' | 'netbanking' | 'card', 
    title: string, 
    description: string,
    icon: React.ReactNode
  }) => (
    <Card 
      className={cn(
        "mb-3 cursor-pointer hover:border-fundeasy-blue transition-colors",
        paymentMethod === type ? "border-fundeasy-blue" : ""
      )}
      onClick={() => setPaymentMethod(type)}
    >
      <CardContent className="p-4 flex items-start">
        <div className="mr-3">{icon}</div>
        <div className="flex-1">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <div className="w-6 h-6 rounded-full border flex items-center justify-center">
          {paymentMethod === type && (
            <div className="w-3 h-3 rounded-full bg-fundeasy-blue"></div>
          )}
        </div>
      </CardContent>
    </Card>
  );
  
  return (
    <PageContainer title="Investment Cart" showBackButton>
      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
              <CreditCard size={32} className="text-gray-400" />
            </div>
          </div>
          <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add funds to your cart to continue</p>
          <Button onClick={() => navigate('/explore')}>
            Explore Funds
          </Button>
        </div>
      ) : (
        <>
          <div className="flex gap-2 mb-4">
            <Button 
              variant={investmentType === 'ONE_TIME' ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => setInvestmentType('ONE_TIME')}
            >
              One-time
            </Button>
            <Button 
              variant={investmentType === 'SIP' ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => setInvestmentType('SIP')}
            >
              Monthly SIP
            </Button>
          </div>
          
          {/* Cart Items */}
          <div className="space-y-4 mb-6">
            {cartItems.map(item => {
              const fund = getFundDetails(item.fundId);
              if (!fund) return null;
              
              return (
                <Card key={item.fundId} className="card-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <FundLogo fundName={fund.name} />
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{fund.name}</h3>
                          <button 
                            onClick={() => handleRemoveItem(item.fundId)}
                            className="text-red-500"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        
                        <div className="text-sm text-gray-500 mt-1">
                          <span className="inline-block mr-3">{fund.category}</span>
                          <span>{fund.risk} Risk</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-2">₹</span>
                      <Input 
                        type="number"
                        value={item.amount}
                        onChange={(e) => handleAmountChange(item.fundId, e.target.value)}
                        className="w-32"
                      />
                      
                      {investmentType === 'SIP' && (
                        <span className="ml-2 text-sm text-gray-500">/month</span>
                      )}
                      
                      {investmentType === 'SIP' && (
                        <div className="ml-4 flex items-center text-sm text-gray-500">
                          <Calendar size={14} className="mr-1" />
                          <span>5th of every month</span>
                        </div>
                      )}
                    </div>
                    
                    {item.amount < 1000 && (
                      <p className="text-xs text-fundeasy-red mt-1 flex items-center">
                        <AlertTriangle size={12} className="mr-1" />
                        Minimum investment is ₹1,000
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-500">Total Investment</span>
                <span className="font-medium">₹{totalAmount.toLocaleString()}</span>
              </div>
              
              {investmentType === 'SIP' && (
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-500">SIP Duration</span>
                  <span className="font-medium">Until Cancelled</span>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 flex items-center">
                  <Info size={12} className="mr-1" />
                  Units will be allotted at applicable NAV
                </span>
              </div>
            </CardContent>
          </Card>
          
          {/* Payment Methods */}
          <h3 className="font-medium mb-3">Select Payment Method</h3>
          
          <PaymentMethod 
            type="upi" 
            title="UPI" 
            description="Pay using any UPI app" 
            icon={<div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">U</div>}
          />
          
          <PaymentMethod 
            type="netbanking" 
            title="Net Banking" 
            description="Pay using your bank account" 
            icon={<div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">N</div>}
          />
          
          <PaymentMethod 
            type="card" 
            title="Credit/Debit Card" 
            description="Pay using your card" 
            icon={<div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">C</div>}
          />
          
          <div className="my-4 flex items-center">
            <CheckCircle2 size={16} className="text-fundeasy-green mr-2" />
            <p className="text-xs text-gray-500">
              By proceeding, you accept the Terms and Conditions and confirm that you are at least 18 years old.
            </p>
          </div>
          
          <Button 
            onClick={handleCheckout}
            className="w-full bg-fundeasy-green"
            disabled={cartItems.some(item => item.amount < 1000) || totalAmount === 0 || !paymentMethod}
          >
            Proceed to Payment
          </Button>
        </>
      )}
    </PageContainer>
  );
};

export default InvestmentCart;
