
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PaymentConfirmationProps {
  isSuccess: boolean;
  amount: number;
  transactionId?: string;
  fundName: string;
  investmentType: 'SIP' | 'One-time';
  date: Date;
}

const PaymentConfirmation: React.FC<PaymentConfirmationProps> = ({
  isSuccess,
  amount,
  transactionId,
  fundName,
  investmentType,
  date
}) => {
  const navigate = useNavigate();

  const goToPortfolio = () => {
    navigate('/dashboard');
  };

  const tryAgain = () => {
    window.history.back();
  };

  return (
    <Card className="max-w-lg w-full mx-auto">
      <CardHeader className={`${isSuccess ? 'bg-fundeasy-green' : 'bg-fundeasy-red'} text-white text-center py-8 rounded-t-lg`}>
        <div className="mx-auto mb-4 w-16 h-16 bg-white rounded-full flex items-center justify-center">
          {isSuccess ? (
            <Check size={32} className="text-fundeasy-green" />
          ) : (
            <AlertCircle size={32} className="text-fundeasy-red" />
          )}
        </div>
        <CardTitle className="text-2xl font-bold">
          {isSuccess ? 'Payment Successful!' : 'Payment Failed'}
        </CardTitle>
        {isSuccess && transactionId && (
          <p className="text-white/80 mt-2 text-sm">Transaction ID: {transactionId}</p>
        )}
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h3 className="text-sm text-gray-500">Amount</h3>
            <p className="text-xl font-medium">₹{amount.toLocaleString()}</p>
          </div>

          <div className="flex justify-between pb-2">
            <div>
              <h3 className="text-sm text-gray-500">Fund Name</h3>
              <p className="font-medium">{fundName}</p>
            </div>
            <div className="text-right">
              <h3 className="text-sm text-gray-500">Type</h3>
              <p className="font-medium">{investmentType}</p>
            </div>
          </div>

          <div className="flex justify-between pb-2">
            <div>
              <h3 className="text-sm text-gray-500">Date</h3>
              <p className="font-medium">{date.toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <h3 className="text-sm text-gray-500">Time</h3>
              <p className="font-medium">{date.toLocaleTimeString()}</p>
            </div>
          </div>

          {!isSuccess && (
            <div className="bg-red-50 p-4 rounded-md">
              <h3 className="text-sm font-medium text-fundeasy-red flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                Payment Error
              </h3>
              <p className="text-xs text-gray-700 mt-1">
                Your payment could not be processed. Please check your payment details and try again.
              </p>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-3 pt-2">
        {isSuccess ? (
          <>
            <Button onClick={goToPortfolio} className="w-full bg-fundeasy-green">
              View Portfolio
            </Button>
            <Button variant="outline" onClick={() => navigate('/explore')}>
              Explore More Funds
            </Button>
          </>
        ) : (
          <>
            <Button onClick={tryAgain} className="w-full">
              Try Again
            </Button>
            <Button variant="outline" onClick={() => navigate('/help')}>
              Contact Support
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default PaymentConfirmation;
