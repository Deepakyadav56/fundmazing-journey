
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { MutualFund } from '@/utils/mockData';
import FundLogo from './FundLogo';

interface FundComparisonCardProps {
  fund: MutualFund;
  highlightBetter?: boolean;
}

const FundComparisonCard: React.FC<FundComparisonCardProps> = ({ fund, highlightBetter = false }) => {
  return (
    <Card className={`border ${highlightBetter ? 'border-fundeasy-green' : 'border-gray-200'}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <FundLogo fundName={fund.name} size="sm" />
          <div className="ml-2">
            <CardTitle className="text-base font-medium line-clamp-2">{fund.name}</CardTitle>
            <div className="flex gap-1 mt-1">
              <Badge variant="outline" className="text-xs">{fund.category}</Badge>
              <Badge 
                variant={
                  fund.risk === 'Low' ? 'success' : 
                  fund.risk === 'Moderate' ? 'warning' : 'destructive'
                } 
                className="text-xs"
              >
                {fund.risk} Risk
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-gray-500">NAV</p>
            <p className="font-medium">₹{fund.navValue.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-gray-500">Expense Ratio</p>
            <p className="font-medium">{fund.expenseRatio}%</p>
          </div>
          <div>
            <p className="text-gray-500">AUM</p>
            <p className="font-medium">₹{fund.aum} Cr</p>
          </div>
          <div>
            <p className="text-gray-500">Fund Manager</p>
            <p className="font-medium">{fund.fundManager}</p>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Returns</h4>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>1 Year</span>
                <span className={fund.returns.oneYear >= 0 ? "text-fundeasy-green" : "text-fundeasy-red"}>
                  {fund.returns.oneYear >= 0 ? "+" : ""}{fund.returns.oneYear}%
                </span>
              </div>
              <Progress
                value={Math.abs(fund.returns.oneYear)}
                max={30}
                indicatorClassName={fund.returns.oneYear >= 0 ? "bg-fundeasy-green" : "bg-fundeasy-red"}
              />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>3 Years</span>
                <span className={fund.returns.threeYear >= 0 ? "text-fundeasy-green" : "text-fundeasy-red"}>
                  {fund.returns.threeYear >= 0 ? "+" : ""}{fund.returns.threeYear}%
                </span>
              </div>
              <Progress
                value={Math.abs(fund.returns.threeYear)}
                max={50}
                indicatorClassName={fund.returns.threeYear >= 0 ? "bg-fundeasy-green" : "bg-fundeasy-red"}
              />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>5 Years</span>
                <span className={fund.returns.fiveYear >= 0 ? "text-fundeasy-green" : "text-fundeasy-red"}>
                  {fund.returns.fiveYear >= 0 ? "+" : ""}{fund.returns.fiveYear}%
                </span>
              </div>
              <Progress
                value={Math.abs(fund.returns.fiveYear)}
                max={70}
                indicatorClassName={fund.returns.fiveYear >= 0 ? "bg-fundeasy-green" : "bg-fundeasy-red"}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FundComparisonCard;
