
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { PaymentConfirmation } from '@/components/payments/PaymentConfirmation';

const PaymentFailure = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // In a real app, this data would come from the payment gateway
  // For now, we'll use mock data or data passed through location state
  const paymentData = location.state?.paymentData || {
    amount: 5000,
    fundName: "HDFC Top 100 Fund",
    investmentType: "One-time",
    date: new Date(),
    errorCode: "PAYMENT_FAILED",
    errorMessage: "Your payment could not be processed. Please try again."
  };
  
  return (
    <PageContainer title="Payment Failed">
      <div className="flex items-center justify-center py-4">
        <PaymentConfirmation
          isSuccess={false}
          amount={paymentData.amount}
          fundName={paymentData.fundName}
          investmentType={paymentData.investmentType}
          date={paymentData.date}
          errorMessage={paymentData.errorMessage}
        />
      </div>
    </PageContainer>
  );
};

export default PaymentFailure;
