
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Info, ChevronRight, CreditCard, AlertTriangle } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { mockMutualFunds } from '@/utils/mockData';
import { useToast } from '@/hooks/use-toast';

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
    toast({
      title: "Payment Initiated",
      description: `Processing your investment of ₹${totalAmount.toLocaleString()}`
    });
    navigate('/payment-gateway');
  };
  
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
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{fund.name}</h3>
                      <button 
                        onClick={() => handleRemoveItem(item.fundId)}
                        className="text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    <div className="text-sm text-gray-500 mb-3">
                      <span className="inline-block mr-3">{fund.category}</span>
                      <span>{fund.risk} Risk</span>
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
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 flex items-center">
                  <Info size={12} className="mr-1" />
                  Units will be allotted at applicable NAV
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Button 
            onClick={handleCheckout}
            className="w-full bg-fundeasy-green"
            disabled={cartItems.some(item => item.amount < 1000) || totalAmount === 0}
          >
            Proceed to Payment
          </Button>
        </>
      )}
    </PageContainer>
  );
};

export default InvestmentCart;
