
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AmountDisplayProps {
  amount: number;
  showCurrency?: boolean;
  className?: string;
  isPositive?: boolean;
  showSign?: boolean;
  hideable?: boolean;
  initiallyHidden?: boolean;
  showDecimal?: boolean;
  compact?: boolean;
}

const AmountDisplay: React.FC<AmountDisplayProps> = ({
  amount,
  showCurrency = true,
  className,
  isPositive = amount >= 0,
  showSign = false,
  hideable = true,
  initiallyHidden = false,
  showDecimal = false,
  compact = false
}) => {
  const [hidden, setHidden] = useState(initiallyHidden);

  const toggleVisibility = () => {
    setHidden(!hidden);
  };

  const formatAmount = () => {
    if (hidden) {
      return "••••••";
    }

    // Format with Indian number system (lakh, crore)
    const formatter = new Intl.NumberFormat('en-IN', {
      style: showCurrency ? 'currency' : 'decimal',
      currency: 'INR',
      minimumFractionDigits: showDecimal ? 2 : 0,
      maximumFractionDigits: showDecimal ? 2 : 0,
      notation: compact ? 'compact' : 'standard'
    });

    const formattedAmount = formatter.format(Math.abs(amount));
    
    const signPrefix = showSign && isPositive ? '+' : showSign && !isPositive ? '-' : '';
    return `${signPrefix}${formattedAmount}`;
  };

  return (
    <div className={cn("flex items-center", className)}>
      <span className={cn(
        "font-medium sf-numerals",
        isPositive ? "text-fundeasy-brand-green" : "text-fundeasy-red",
        !isPositive && !showSign && "text-fundeasy-red"
      )}>
        {formatAmount()}
      </span>
      
      {hideable && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleVisibility}
          className="h-6 w-6 ml-1 hover:bg-transparent"
        >
          {hidden ? (
            <Eye className="h-4 w-4 text-gray-400" />
          ) : (
            <EyeOff className="h-4 w-4 text-gray-400" />
          )}
        </Button>
      )}
    </div>
  );
};

export default AmountDisplay;
