
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info, TrendingUp, TrendingDown, Eye, EyeOff } from 'lucide-react';
import FundLogoImage from '@/components/funds/FundLogoImage';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface InvestmentSummaryCardProps {
  fundName: string;
  investedAmount: number;
  currentValue: number;
  returns: number;
  returnsPercentage: number;
  units: number;
  lastUpdated: string;
  showDetails?: boolean;
  toggleDetails?: () => void;
}

const InvestmentSummaryCard: React.FC<InvestmentSummaryCardProps> = ({
  fundName,
  investedAmount,
  currentValue,
  returns,
  returnsPercentage,
  units,
  lastUpdated,
  showDetails = true,
  toggleDetails
}) => {
  const navigate = useNavigate();
  const isPositiveReturn = returns >= 0;
  
  return (
    <Card className="overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <FundLogoImage fundName={fundName} />
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-fundeasy-dark-gray line-clamp-1">{fundName}</h3>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
              <div>
                <p className="text-xs text-gray-500">Current Value</p>
                <div className="flex items-center">
                  <p className="font-medium text-fundeasy-dark-gray">
                    {showDetails 
                      ? `₹${currentValue.toLocaleString()}`
                      : '₹••••••'
                    }
                  </p>
                  
                  {toggleDetails && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 ml-1 hover:bg-transparent"
                      onClick={toggleDetails}
                    >
                      {showDetails ? (
                        <EyeOff size={14} className="text-gray-400" />
                      ) : (
                        <Eye size={14} className="text-gray-400" />
                      )}
                    </Button>
                  )}
                </div>
              </div>
              
              <div>
                <p className="text-xs text-gray-500">Returns</p>
                <p className={`font-medium ${isPositiveReturn ? 'text-fundeasy-green' : 'text-red-500'}`}>
                  {showDetails ? (
                    <>
                      {isPositiveReturn ? '+' : ''}₹{Math.abs(returns).toLocaleString()} 
                      <span className="ml-1">
                        ({isPositiveReturn ? '+' : ''}{returnsPercentage.toFixed(2)}%)
                      </span>
                    </>
                  ) : (
                    <>
                      {returnsPercentage.toFixed(2)}%
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
          
          {isPositiveReturn ? (
            <TrendingUp className="text-fundeasy-green" />
          ) : (
            <TrendingDown className="text-red-500" />
          )}
        </div>
        
        <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100 text-xs">
          <div className="flex items-center">
            <p className="text-gray-500">
              {showDetails ? (
                <>Invested: ₹{investedAmount.toLocaleString()}</>
              ) : (
                <>Invested: ₹••••••</>
              )}
            </p>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-4 w-4 hover:bg-transparent">
                    <Info size={12} className="text-gray-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Total amount invested so far</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <p className="text-gray-500">Last updated: {lastUpdated}</p>
        </div>
        
        <div className="flex justify-end gap-2 mt-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 border-fundeasy-medium-gray"
            onClick={() => navigate(`/fund-analysis/${fundName}`)}
          >
            Details
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="h-8 bg-fundeasy-green"
            onClick={() => navigate(`/start-sip/${fundName}`)}
          >
            Invest More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentSummaryCard;
