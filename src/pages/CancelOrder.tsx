
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import CancelOrderConfirmation from '@/components/payments/CancelOrderConfirmation';
import { toast } from '@/hooks/use-toast';
import { mockMutualFunds } from '@/utils/mockData';

const CancelOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // In a real app, you would fetch the order details based on the ID
  // For now, we'll use mock data
  const mockOrder = {
    id: id || 'ord123',
    fundId: mockMutualFunds[0].id,
    fundName: mockMutualFunds[0].name,
    amount: 5000,
    investmentType: 'One-time' as const,
    date: new Date()
  };
  
  const handleCancel = () => {
    navigate(-1);
  };
  
  const handleConfirm = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Order cancelled",
        description: "Your investment order has been successfully cancelled.",
      });
      navigate('/dashboard');
    }, 1500);
  };
  
  return (
    <PageContainer title="Cancel Order">
      <div className="flex items-center justify-center py-8">
        <CancelOrderConfirmation 
          orderId={mockOrder.id}
          fundName={mockOrder.fundName}
          amount={mockOrder.amount}
          investmentType={mockOrder.investmentType}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          isLoading={isLoading}
        />
      </div>
    </PageContainer>
  );
};

export default CancelOrder;
