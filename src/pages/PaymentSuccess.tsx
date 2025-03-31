
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import confetti from '@/utils/confetti';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const orderDate = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  
  React.useEffect(() => {
    // Trigger confetti effect when the component mounts
    confetti();
  }, []);

  return (
    <PageContainer title="Payment Successful" showBackButton>
      <div className="flex flex-col items-center py-6 mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle size={32} className="text-fundeasy-green" />
        </div>
        <h2 className="text-xl font-semibold mb-1">Investment Successful</h2>
        <p className="text-gray-500">Your order has been placed successfully</p>
      </div>
      
      <Card className="mb-6">
        <CardContent className="p-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-500">Transaction ID</span>
            <span className="font-medium">TXN123456789</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Date & Time</span>
            <span>{orderDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Amount Invested</span>
            <span className="font-medium">₹15,000.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Payment Method</span>
            <span>UPI - PhonePe</span>
          </div>
        </CardContent>
      </Card>
      
      <h3 className="font-medium mb-3">Investment Details</h3>
      
      <Card className="mb-2">
        <CardContent className="p-4">
          <h4 className="font-medium mb-1">Axis Bluechip Fund</h4>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-500">Amount</span>
            <span>₹5,000.00</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Units (approx)</span>
            <span>109.48</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardContent className="p-4">
          <h4 className="font-medium mb-1">HDFC Corporate Bond Fund</h4>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-500">Amount</span>
            <span>₹10,000.00</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Units (approx)</span>
            <span>394.64</span>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-3">
        <Button 
          onClick={() => navigate('/portfolio')}
          className="w-full bg-fundeasy-green"
        >
          Go to Portfolio
        </Button>
        <Button 
          variant="outline"
          onClick={() => navigate('/dashboard')}
          className="w-full"
        >
          Back to Dashboard <ArrowRight size={16} className="ml-1" />
        </Button>
      </div>
    </PageContainer>
  );
};

export default PaymentSuccess;
