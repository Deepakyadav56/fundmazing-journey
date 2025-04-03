
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Calendar, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SIPInvestment } from '@/types';
import FundLogo from '../funds/FundLogo';
import { mockMutualFunds } from '@/utils/mockData';

interface CancelSIPConfirmationProps {
  sip: SIPInvestment;
  onCancel: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

const CancelSIPConfirmation: React.FC<CancelSIPConfirmationProps> = ({
  sip,
  onCancel,
  onConfirm,
  isLoading = false
}) => {
  const fund = mockMutualFunds.find(f => f.id === sip.fundId) || mockMutualFunds[0];
  
  const formatFrequency = (freq: string): string => {
    switch(freq) {
      case 'daily': return 'Daily';
      case 'weekly': return 'Weekly';
      case 'monthly': return 'Monthly';
      case 'quarterly': return 'Quarterly';
      default: return freq;
    }
  };
  
  return (
    <Card className="max-w-md w-full mx-auto">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-4 w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
          <AlertCircle size={32} className="text-fundeasy-red" />
        </div>
        <CardTitle>Cancel SIP?</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3 border-b pb-4">
          <FundLogo fundName={fund.name} />
          <div>
            <h3 className="font-medium">{fund.name}</h3>
            <p className="text-sm text-gray-500">{fund.category}</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard size={16} className="text-gray-500" />
              <span className="text-sm text-gray-600">SIP Amount</span>
            </div>
            <span className="font-medium sf-numerals">₹{sip.amount.toLocaleString('en-IN')}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-gray-500" />
              <span className="text-sm text-gray-600">Frequency</span>
            </div>
            <span className="font-medium">{formatFrequency(sip.frequency)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-gray-500" />
              <span className="text-sm text-gray-600">Next Due Date</span>
            </div>
            <span className="font-medium">{sip.nextDate.toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="p-4 bg-amber-50 rounded-lg text-sm">
          <h4 className="font-medium text-amber-800 mb-1">Important Note</h4>
          <ul className="list-disc list-inside text-xs space-y-1 text-gray-700">
            <li>Cancelling this SIP will stop all future installments.</li>
            <li>Your existing investments will remain in the fund.</li>
            <li>This action cannot be undone.</li>
          </ul>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-3 pt-2">
        <Button 
          variant="destructive" 
          onClick={onConfirm} 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Yes, Cancel SIP'}
        </Button>
        
        <Button 
          variant="outline" 
          onClick={onCancel}
          className="w-full"
          disabled={isLoading}
        >
          No, Keep My SIP
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CancelSIPConfirmation;
