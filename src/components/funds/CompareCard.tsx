
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Plus, X, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FundLogoImage from './FundLogoImage';

interface CompareCardProps {
  fund?: {
    id: string;
    name: string;
    amc: string;
    returns: {
      oneYear: number;
      threeYear: number;
      fiveYear: number;
    };
    nav: number;
    aum: string;
    risk: string;
    category: string;
    expenseRatio: number;
  };
  onRemove?: () => void;
  onAdd?: () => void;
  isEmpty?: boolean;
}

const CompareCard: React.FC<CompareCardProps> = ({ 
  fund, 
  onRemove, 
  onAdd,
  isEmpty = !fund 
}) => {
  const navigate = useNavigate();
  
  if (isEmpty) {
    return (
      <Card className="h-full border-dashed border-gray-300 hover:border-fundeasy-green hover:bg-fundeasy-light-green/20 transition-colors">
        <CardContent className="h-full flex flex-col items-center justify-center p-4">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-12 w-12 rounded-full border-gray-300 mb-2"
            onClick={onAdd}
          >
            <Plus className="h-6 w-6 text-gray-400" />
          </Button>
          <p className="text-sm text-gray-500">Add fund to compare</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="h-full border border-gray-100 hover:border-fundeasy-green/50 hover:shadow-md transition-all">
      <CardContent className="p-4 relative h-full flex flex-col">
        {onRemove && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 top-2 h-6 w-6 rounded-full"
            onClick={onRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        
        <div className="flex items-center gap-3 mb-3">
          <FundLogoImage fundName={fund.name} />
          <div>
            <h3 className="font-semibold text-fundeasy-dark-gray line-clamp-1">{fund.name}</h3>
            <p className="text-xs text-gray-500">{fund.amc}</p>
          </div>
        </div>
        
        <div className="space-y-3 flex-1">
          <div>
            <p className="text-xs text-gray-500 mb-1">NAV</p>
            <p className="font-medium">₹{fund.nav.toFixed(2)}</p>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <div>
              <p className="text-xs text-gray-500 mb-1">1Y Returns</p>
              <p className={`font-medium ${fund.returns.oneYear >= 0 ? 'text-fundeasy-green' : 'text-red-500'}`}>
                {fund.returns.oneYear >= 0 ? '+' : ''}{fund.returns.oneYear}%
              </p>
            </div>
            
            <div>
              <p className="text-xs text-gray-500 mb-1">3Y Returns</p>
              <p className={`font-medium ${fund.returns.threeYear >= 0 ? 'text-fundeasy-green' : 'text-red-500'}`}>
                {fund.returns.threeYear >= 0 ? '+' : ''}{fund.returns.threeYear}%
              </p>
            </div>
            
            <div>
              <p className="text-xs text-gray-500 mb-1">5Y Returns</p>
              <p className={`font-medium ${fund.returns.fiveYear >= 0 ? 'text-fundeasy-green' : 'text-red-500'}`}>
                {fund.returns.fiveYear >= 0 ? '+' : ''}{fund.returns.fiveYear}%
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-xs text-gray-500 mb-1">Category</p>
              <Badge variant="outline" className="font-normal bg-gray-50">
                {fund.category}
              </Badge>
            </div>
            
            <div>
              <p className="text-xs text-gray-500 mb-1">Risk</p>
              <Badge 
                variant="outline" 
                className={`font-normal ${
                  fund.risk === 'High' ? 'bg-red-50 text-red-700 border-red-200' :
                  fund.risk === 'Moderate' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                  'bg-green-50 text-green-700 border-green-200'
                }`}
              >
                {fund.risk}
              </Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-xs text-gray-500 mb-1">Fund Size</p>
              <p className="text-sm">{fund.aum}</p>
            </div>
            
            <div>
              <p className="text-xs text-gray-500 mb-1">Expense Ratio</p>
              <p className="text-sm">{fund.expenseRatio}%</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-100">
          <Button 
            className="w-full bg-fundeasy-green hover:bg-fundeasy-green/90"
            onClick={() => navigate(`/fund/${fund.id}`)}
          >
            View Fund
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompareCard;
