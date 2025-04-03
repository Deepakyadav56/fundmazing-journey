
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CancelOrderConfirmationProps {
  orderId: string;
  fundName: string;
  amount: number;
  onCancel: () => void;
  onConfirm: () => void;
  investmentType: 'SIP' | 'One-time';
  isLoading?: boolean;
}

const CancelOrderConfirmation: React.FC<CancelOrderConfirmationProps> = ({
  orderId,
  fundName,
  amount,
  onCancel,
  onConfirm,
  investmentType,
  isLoading = false
}) => {
  return (
    <Card className="max-w-md w-full mx-auto">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-4 w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
          <AlertCircle size={32} className="text-fundeasy-red" />
        </div>
        <CardTitle>Cancel Order?</CardTitle>
      </CardHeader>
      
      <CardContent className="text-center space-y-4">
        <p className="text-gray-600">
          Are you sure you want to cancel your {investmentType.toLowerCase()} investment in:
        </p>
        
        <div className="font-medium text-lg">{fundName}</div>
        
        <p className="text-lg font-medium sf-numerals">
          {new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
          }).format(amount)}
        </p>
        
        <p className="text-sm text-gray-500">
          Order ID: {orderId}
        </p>
        
        <div className="p-3 bg-amber-50 rounded-lg text-sm text-amber-800">
          This action cannot be undone. Your order will be cancelled permanently.
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-3 pt-2">
        <Button 
          variant="destructive" 
          onClick={onConfirm} 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Yes, Cancel Order'}
        </Button>
        
        <Button 
          variant="outline" 
          onClick={onCancel}
          className="w-full"
          disabled={isLoading}
        >
          No, Keep My Order
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CancelOrderConfirmation;
