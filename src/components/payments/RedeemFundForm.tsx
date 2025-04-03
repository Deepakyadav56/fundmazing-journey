
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Check, ArrowRight, AlertCircle } from 'lucide-react';
import { MutualFund } from '@/types';
import FundLogo from '@/components/funds/FundLogo';

interface RedeemFundFormProps {
  fund: MutualFund;
  investedAmount: number;
  currentValue: number;
  units: number;
  onComplete: (amount: number, isFullRedemption: boolean, units: number) => void;
  onCancel: () => void;
}

const RedeemFundForm: React.FC<RedeemFundFormProps> = ({ 
  fund, 
  investedAmount,
  currentValue,
  units,
  onComplete, 
  onCancel 
}) => {
  const [redeemType, setRedeemType] = useState<'full' | 'partial'>('full');
  const [amount, setAmount] = useState<number>(currentValue);
  const [redeemUnits, setRedeemUnits] = useState<number>(units);
  const [redeemBy, setRedeemBy] = useState<'amount' | 'units'>('amount');
  
  const handleRedeemTypeChange = (value: 'full' | 'partial') => {
    setRedeemType(value);
    if (value === 'full') {
      setAmount(currentValue);
      setRedeemUnits(units);
    } else {
      setAmount(Math.round(currentValue * 0.5));
      setRedeemUnits(Math.round(units * 0.5 * 100) / 100);
    }
  };
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    const validValue = isNaN(value) ? 0 : Math.min(value, currentValue);
    setAmount(validValue);
    
    // Calculate equivalent units
    if (fund.navValue > 0) {
      setRedeemUnits(Math.round((validValue / fund.navValue) * 100) / 100);
    }
  };
  
  const handleUnitsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    const validValue = isNaN(value) ? 0 : Math.min(value, units);
    setRedeemUnits(validValue);
    
    // Calculate equivalent amount
    setAmount(Math.round(validValue * fund.navValue * 100) / 100);
  };
  
  const handleSubmit = () => {
    onComplete(amount, redeemType === 'full', redeemUnits);
  };

  return (
    <Card className="max-w-md w-full mx-auto">
      <CardHeader>
        <div className="flex items-center">
          <FundLogo fundName={fund.name} />
          <div className="ml-3">
            <CardTitle className="text-lg">{fund.name}</CardTitle>
            <p className="text-sm text-gray-500">{fund.category}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Investment Details */}
        <div className="bg-[#deebc7]/30 p-4 rounded-lg space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Current Value</span>
            <span className="font-medium sf-numerals">
              ₹{currentValue.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Total Units</span>
            <span className="font-medium sf-numerals">{units.toFixed(3)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">NAV</span>
            <span className="font-medium sf-numerals">₹{fund.navValue.toFixed(2)}</span>
          </div>
        </div>
        
        {/* Redemption Type Selection */}
        <div>
          <Label>How much do you want to redeem?</Label>
          <RadioGroup
            value={redeemType}
            onValueChange={(value) => handleRedeemTypeChange(value as 'full' | 'partial')}
            className="mt-2 space-y-3"
          >
            <div className="flex items-center space-x-2 border rounded-lg p-3">
              <RadioGroupItem value="full" id="full" />
              <Label htmlFor="full" className="flex-1 cursor-pointer">Full Redemption</Label>
              <span className="text-sm text-gray-500 sf-numerals">₹{currentValue.toLocaleString('en-IN')}</span>
            </div>
            
            <div className="flex items-center space-x-2 border rounded-lg p-3">
              <RadioGroupItem value="partial" id="partial" />
              <Label htmlFor="partial" className="cursor-pointer">Partial Redemption</Label>
            </div>
          </RadioGroup>
        </div>
        
        {/* Partial Redemption Options */}
        {redeemType === 'partial' && (
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Button 
                variant={redeemBy === 'amount' ? "default" : "outline"} 
                size="sm"
                onClick={() => setRedeemBy('amount')}
                className={redeemBy === 'amount' ? "bg-fundeasy-brand-green" : ""}
              >
                By Amount
              </Button>
              <Button 
                variant={redeemBy === 'units' ? "default" : "outline"} 
                size="sm"
                onClick={() => setRedeemBy('units')}
                className={redeemBy === 'units' ? "bg-fundeasy-brand-green" : ""}
              >
                By Units
              </Button>
            </div>
            
            {redeemBy === 'amount' ? (
              <div>
                <Label htmlFor="redeem-amount">Enter Amount</Label>
                <Input
                  id="redeem-amount"
                  type="number"
                  min={100}
                  max={currentValue}
                  value={amount}
                  onChange={handleAmountChange}
                  className="mt-1"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Min: ₹100</span>
                  <span>Max: ₹{currentValue.toLocaleString('en-IN')}</span>
                </div>
                <div className="mt-2 text-sm">
                  <span className="text-gray-500">Equivalent Units: </span>
                  <span className="font-medium">{redeemUnits.toFixed(3)}</span>
                </div>
              </div>
            ) : (
              <div>
                <Label htmlFor="redeem-units">Enter Units</Label>
                <Input
                  id="redeem-units"
                  type="number"
                  min={0.001}
                  max={units}
                  step={0.001}
                  value={redeemUnits}
                  onChange={handleUnitsChange}
                  className="mt-1"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Min: 0.001</span>
                  <span>Max: {units.toFixed(3)}</span>
                </div>
                <div className="mt-2 text-sm">
                  <span className="text-gray-500">Equivalent Amount: </span>
                  <span className="font-medium sf-numerals">₹{amount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Important Information */}
        <div className="p-3 bg-amber-50 rounded-lg flex gap-2">
          <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
          <div className="text-xs text-amber-800">
            <p className="font-medium mb-1">Important Information</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Redemptions are processed within 2-3 business days.</li>
              <li>Exit load may apply as per the fund's terms and conditions.</li>
              <li>The final redemption amount may vary based on the NAV on the processing date.</li>
            </ul>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit}
          className="bg-fundeasy-brand-green"
          disabled={amount <= 0 || amount > currentValue}
        >
          Proceed <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RedeemFundForm;
