
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CalendarIcon, ArrowRight, AlertCircle } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import FundLogo from '../funds/FundLogo';
import { MutualFund } from '@/utils/mockData';

interface SIPFlowProps {
  fund: MutualFund;
  onComplete: (sipDetails: SIPDetails) => void;
  onCancel: () => void;
}

export interface SIPDetails {
  amount: number;
  frequency: 'Monthly' | 'Quarterly' | 'Biannually';
  startDate: Date | null;
  duration: string;
}

const SIPFlow: React.FC<SIPFlowProps> = ({ fund, onComplete, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [sipDetails, setSipDetails] = useState<SIPDetails>({
    amount: 500,
    frequency: 'Monthly',
    startDate: null,
    duration: 'Until Cancelled'
  });
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseInt(e.target.value, 10);
    setSipDetails(prev => ({ ...prev, amount: isNaN(amount) ? 0 : amount }));
  };
  
  const handleFrequencyChange = (value: 'Monthly' | 'Quarterly' | 'Biannually') => {
    setSipDetails(prev => ({ ...prev, frequency: value }));
  };
  
  const handleDateChange = (date: Date | null) => {
    setSipDetails(prev => ({ ...prev, startDate: date }));
  };
  
  const handleDurationChange = (value: string) => {
    setSipDetails(prev => ({ ...prev, duration: value }));
  };
  
  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };
  
  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  const handleSubmit = () => {
    onComplete(sipDetails);
  };

  const predefinedAmounts = [500, 1000, 2500, 5000, 10000];

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex items-center mb-6">
          <FundLogo fundName={fund.name} size="sm" />
          <div className="ml-3">
            <h3 className="font-medium text-sm">{fund.name}</h3>
            <p className="text-xs text-gray-500">{fund.category}</p>
          </div>
        </div>

        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <Label htmlFor="sip-amount">SIP Amount</Label>
              <Input
                id="sip-amount"
                type="number"
                value={sipDetails.amount}
                onChange={handleAmountChange}
                min={100}
                className="mt-1"
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {predefinedAmounts.map(amount => (
                  <Button
                    key={amount}
                    type="button"
                    variant={sipDetails.amount === amount ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSipDetails(prev => ({ ...prev, amount }))}
                  >
                    ₹{amount}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Minimum SIP amount is ₹100
              </p>
            </div>

            <div>
              <Label>SIP Frequency</Label>
              <RadioGroup
                value={sipDetails.frequency}
                onValueChange={(value) => handleFrequencyChange(value as 'Monthly' | 'Quarterly' | 'Biannually')}
                className="flex gap-4 mt-2"
              >
                <div className="flex items-center">
                  <RadioGroupItem value="Monthly" id="monthly" />
                  <Label htmlFor="monthly" className="ml-2">Monthly</Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem value="Quarterly" id="quarterly" />
                  <Label htmlFor="quarterly" className="ml-2">Quarterly</Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem value="Biannually" id="biannually" />
                  <Label htmlFor="biannually" className="ml-2">Biannually</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={onCancel}>Cancel</Button>
              <Button onClick={nextStep}>
                Next <ArrowRight size={16} className="ml-1" />
              </Button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <Label>SIP Start Date</Label>
              <div className="mt-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !sipDetails.startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {sipDetails.startDate ? format(sipDetails.startDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={sipDetails.startDate || undefined}
                      onSelect={handleDateChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div>
              <Label>SIP Duration</Label>
              <RadioGroup
                value={sipDetails.duration}
                onValueChange={handleDurationChange}
                className="mt-2 space-y-3"
              >
                <div className="flex items-center">
                  <RadioGroupItem value="Until Cancelled" id="until-cancelled" />
                  <Label htmlFor="until-cancelled" className="ml-2">Until Cancelled</Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem value="1 Year" id="1year" />
                  <Label htmlFor="1year" className="ml-2">1 Year</Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem value="3 Years" id="3years" />
                  <Label htmlFor="3years" className="ml-2">3 Years</Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem value="5 Years" id="5years" />
                  <Label htmlFor="5years" className="ml-2">5 Years</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="bg-fundeasy-light-gray p-3 rounded-md flex items-start">
              <AlertCircle size={18} className="text-fundeasy-green mt-0.5 mr-2" />
              <p className="text-xs">
                Your SIP will be processed on the selected date each {sipDetails.frequency.toLowerCase()}. You can modify or cancel your SIP anytime.
              </p>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>Back</Button>
              <Button onClick={handleSubmit}>
                Start SIP
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SIPFlow;
