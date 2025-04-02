
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, ArrowUp, ArrowDown, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface PortfolioSummaryProps {
  currentValue: number;
  investedAmount: number;
  xirr: number;
  absoluteReturn: number;
  absoluteReturnPercentage: number;
}

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({
  currentValue,
  investedAmount,
  xirr,
  absoluteReturn,
  absoluteReturnPercentage
}) => {
  const [hideAmounts, setHideAmounts] = useState(false);

  const formatAmount = (amount: number): string => {
    return hideAmounts 
      ? "₹ XXXXX" 
      : new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          maximumFractionDigits: 0,
        }).format(amount);
  };

  return (
    <Card className="border-0 bg-fundeasy-light-green shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-fundeasy-dark-gray">Portfolio Summary</CardTitle>
          <Button variant="ghost" size="icon" onClick={() => setHideAmounts(!hideAmounts)}>
            {hideAmounts ? <EyeOff size={18} /> : <Eye size={18} />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="text-sm text-gray-500 flex items-center gap-1">
              Current Value
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={14} className="cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Total current value of all your investments</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="text-2xl font-bold text-fundeasy-dark-gray">
              {formatAmount(currentValue)}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500 flex items-center gap-1">
                Invested
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info size={14} className="cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Total amount you've invested</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="font-medium">{formatAmount(investedAmount)}</div>
            </div>
            
            <div>
              <div className="text-sm text-gray-500 flex items-center gap-1">
                XIRR
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info size={14} className="cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Extended Internal Rate of Return - your annualized returns</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className={cn(
                "font-medium flex items-center",
                xirr >= 0 ? "text-fundeasy-green" : "text-fundeasy-red"
              )}>
                {xirr >= 0 ? <ArrowUp size={16} className="mr-1" /> : <ArrowDown size={16} className="mr-1" />}
                {xirr}%
              </div>
            </div>
            
            <div>
              <div className="text-sm text-gray-500">Returns</div>
              <div className={cn(
                "font-medium flex items-center",
                absoluteReturn >= 0 ? "text-fundeasy-green" : "text-fundeasy-red"
              )}>
                {absoluteReturn >= 0 ? "+" : ""}{formatAmount(absoluteReturn)}
              </div>
              <Badge variant={absoluteReturnPercentage >= 0 ? "success" : "destructive"} className="mt-1">
                {absoluteReturnPercentage >= 0 ? "+" : ""}{absoluteReturnPercentage.toFixed(2)}%
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioSummary;
