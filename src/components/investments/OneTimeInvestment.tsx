
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { MutualFund } from '@/utils/mockData';
import FundLogo from '../funds/FundLogo';

interface OneTimeInvestmentProps {
  fund: MutualFund;
  onComplete: (amount: number) => void;
  onCancel: () => void;
}

const OneTimeInvestment: React.FC<OneTimeInvestmentProps> = ({ fund, onComplete, onCancel }) => {
  const [amount, setAmount] = useState<number>(1000);
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setAmount(isNaN(value) ? 0 : value);
  };
  
  const predefinedAmounts = [1000, 5000, 10000, 25000, 50000];

  return (
    <Card className="max-w-md w-full mx-auto">
      <CardHeader className="border-b">
        <div className="flex items-center">
          <FundLogo fundName={fund.name} />
          <div className="ml-3">
            <CardTitle className="text-lg">{fund.name}</CardTitle>
            <p className="text-sm text-gray-500">{fund.category}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 pt-6">
        <div>
          <h3 className="text-sm font-medium mb-2">Enter investment amount</h3>
          <Input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            min={100}
            className="text-lg sf-numerals"
            placeholder="Enter amount"
          />
          
          <div className="mt-3 flex flex-wrap gap-2">
            {predefinedAmounts.map(amt => (
              <Button
                key={amt}
                type="button"
                variant={amount === amt ? "mint" : "outline"}
                size="sm"
                onClick={() => setAmount(amt)}
                className={amount === amt ? "" : "border-gray-300"}
              >
                ₹{amt.toLocaleString()}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="p-3 bg-[#deebc7]/30 rounded-md flex gap-2">
          <AlertCircle className="h-5 w-5 text-fundeasy-brand-green shrink-0 mt-0.5" />
          <div className="text-xs">
            <p>Minimum investment amount is ₹100.</p>
            <p className="mt-1">Your investment will be processed within 24 hours.</p>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-4">
          <div className="flex justify-between text-sm">
            <span>NAV (as of today)</span>
            <span className="sf-numerals">₹{fund.navValue.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span>Estimated units</span>
            <span className="sf-numerals">{(amount / fund.navValue).toFixed(3)}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-4 border-t">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          onClick={() => onComplete(amount)}
          className="bg-fundeasy-brand-black"
          size="pill"
        >
          Proceed <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OneTimeInvestment;
