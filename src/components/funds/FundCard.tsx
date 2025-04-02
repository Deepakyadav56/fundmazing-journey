
import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { MutualFund } from '@/utils/mockData';
import FundLogo from './FundLogo';

interface FundCardProps {
  fund: MutualFund;
  onClick: () => void;
}

const FundCard: React.FC<FundCardProps> = ({ fund, onClick }) => {
  return (
    <Card className="card-shadow hover-scale" onClick={onClick}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3 mb-2">
          <FundLogo fundName={fund.name} />
          
          <div className="flex-1">
            <h3 className="font-medium line-clamp-2">{fund.name}</h3>
            <div className="flex flex-wrap gap-1 mt-1">
              <span className={`text-xs px-2 py-0.5 rounded ${
                fund.risk === 'Low' ? 'bg-green-100 text-green-800' : 
                fund.risk === 'Moderate' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-red-100 text-red-800'
              }`}>
                {fund.risk} Risk
              </span>
              <span className="text-xs px-2 py-0.5 bg-gray-100 rounded">
                {fund.category}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <div>
            <p className="text-xs text-gray-500">NAV</p>
            <p className="font-medium">₹{fund.navValue.toFixed(2)}</p>
          </div>
          
          <div>
            <p className="text-xs text-gray-500">AUM</p>
            <p className="font-medium">₹{fund.aum} Cr.</p>
          </div>
          
          <div className="text-right">
            <p className="text-xs text-gray-500">1Y Returns</p>
            <div className="flex items-center text-fundeasy-green">
              <TrendingUp size={14} className="mr-0.5" />
              <p className="font-medium">{fund.returns.oneYear}%</p>
            </div>
          </div>
        </div>

        {/* Performance over time */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>1Y</span>
            <span>3Y</span>
            <span>5Y</span>
          </div>
          <div className="flex space-x-1">
            <Progress 
              value={fund.returns.oneYear} 
              className="h-1" 
              indicatorClassName={fund.returns.oneYear > 0 ? "bg-fundeasy-green" : "bg-fundeasy-red"}
            />
            <Progress 
              value={fund.returns.threeYear} 
              className="h-1" 
              indicatorClassName={fund.returns.threeYear > 0 ? "bg-fundeasy-green" : "bg-fundeasy-red"}
            />
            <Progress 
              value={fund.returns.fiveYear} 
              className="h-1" 
              indicatorClassName={fund.returns.fiveYear > 0 ? "bg-fundeasy-green" : "bg-fundeasy-red"}
            />
          </div>
          <div className="flex items-center justify-between text-xs font-medium mt-1">
            <span>{fund.returns.oneYear}%</span>
            <span>{fund.returns.threeYear}%</span>
            <span>{fund.returns.fiveYear}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FundCard;
