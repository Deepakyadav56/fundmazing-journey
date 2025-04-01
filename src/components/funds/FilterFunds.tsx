
import React, { useState } from 'react';
import { X, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface FilterFundsProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
}

interface FilterState {
  riskLevel: string[];
  category: string[];
  amcList: string[];
  returnPeriod: string;
  expenseRatio: [number, number];
  fundSize: string;
  fundType: string;
  rating: number;
  sortBy: string;
}

const FilterFunds: React.FC<FilterFundsProps> = ({ isOpen, onClose, onApply }) => {
  const [filters, setFilters] = useState<FilterState>({
    riskLevel: [],
    category: [],
    amcList: [],
    returnPeriod: '1y',
    expenseRatio: [0, 2.5],
    fundSize: 'all',
    fundType: 'direct',
    rating: 0,
    sortBy: 'returns'
  });

  const handleRiskLevelChange = (risk: string) => {
    setFilters(prev => {
      const newRiskLevel = prev.riskLevel.includes(risk)
        ? prev.riskLevel.filter(item => item !== risk)
        : [...prev.riskLevel, risk];
      return { ...prev, riskLevel: newRiskLevel };
    });
  };

  const handleCategoryChange = (category: string) => {
    setFilters(prev => {
      const newCategory = prev.category.includes(category)
        ? prev.category.filter(item => item !== category)
        : [...prev.category, category];
      return { ...prev, category: newCategory };
    });
  };

  const handleAmcChange = (amc: string) => {
    setFilters(prev => {
      const newAmcList = prev.amcList.includes(amc)
        ? prev.amcList.filter(item => item !== amc)
        : [...prev.amcList, amc];
      return { ...prev, amcList: newAmcList };
    });
  };

  const handleApplyFilters = () => {
    onApply(filters);
    onClose();
  };

  const handleResetFilters = () => {
    setFilters({
      riskLevel: [],
      category: [],
      amcList: [],
      returnPeriod: '1y',
      expenseRatio: [0, 2.5],
      fundSize: 'all',
      fundType: 'direct',
      rating: 0,
      sortBy: 'returns'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-white rounded-t-xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 z-10 bg-white flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <Filter size={18} className="mr-2" />
            <h2 className="text-lg font-medium">Filters</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        <div className="p-4 space-y-6 pb-20">
          {/* Sort By */}
          <div>
            <Label className="text-base font-medium">Sort By</Label>
            <RadioGroup 
              value={filters.sortBy} 
              onValueChange={value => setFilters(prev => ({ ...prev, sortBy: value }))}
              className="grid grid-cols-2 gap-3 mt-3"
            >
              {[
                { value: 'returns', label: 'Returns' },
                { value: 'rating', label: 'Rating' },
                { value: 'expenseRatio', label: 'Expense Ratio' },
                { value: 'fundSize', label: 'Fund Size' }
              ].map(option => (
                <div 
                  key={option.value}
                  className={`border rounded-lg p-3 flex items-center cursor-pointer hover:bg-gray-50 ${
                    filters.sortBy === option.value ? 'border-fundeasy-blue bg-blue-50' : ''
                  }`}
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="cursor-pointer ml-2">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Separator />

          {/* Risk Level */}
          <div>
            <Label className="text-base font-medium">Risk Level</Label>
            <div className="mt-2 space-y-2">
              {['Low', 'Moderate', 'High'].map(risk => (
                <div key={risk} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`risk-${risk}`}
                    checked={filters.riskLevel.includes(risk)}
                    onCheckedChange={() => handleRiskLevelChange(risk)}
                  />
                  <Label htmlFor={`risk-${risk}`} className="cursor-pointer">
                    {risk}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Fund Categories */}
          <Collapsible className="w-full">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Fund Category</Label>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                  <ChevronDown size={18} />
                </Button>
              </CollapsibleTrigger>
            </div>
            
            <CollapsibleContent className="mt-2 space-y-2">
              {[
                'Equity: Large Cap', 'Equity: Mid Cap', 'Equity: Small Cap',
                'Equity: Multi Cap', 'Equity: ELSS', 'Hybrid: Aggressive',
                'Hybrid: Conservative', 'Debt: Short Term', 'Debt: Corporate Bond',
                'Index Funds', 'Sectoral / Thematic'
              ].map(category => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category}`}
                    checked={filters.category.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <Label htmlFor={`category-${category}`} className="cursor-pointer">
                    {category}
                  </Label>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Separator />

          {/* AMCs */}
          <Collapsible className="w-full">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Fund House (AMC)</Label>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                  <ChevronDown size={18} />
                </Button>
              </CollapsibleTrigger>
            </div>
            
            <CollapsibleContent className="mt-2 space-y-2">
              {[
                'SBI Mutual Fund', 'HDFC Mutual Fund', 'ICICI Prudential Mutual Fund',
                'Nippon India Mutual Fund', 'Axis Mutual Fund', 'Aditya Birla Sun Life Mutual Fund',
                'UTI Mutual Fund', 'DSP Mutual Fund', 'Kotak Mahindra Mutual Fund'
              ].map(amc => (
                <div key={amc} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`amc-${amc}`}
                    checked={filters.amcList.includes(amc)}
                    onCheckedChange={() => handleAmcChange(amc)}
                  />
                  <Label htmlFor={`amc-${amc}`} className="cursor-pointer">
                    {amc}
                  </Label>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Separator />

          {/* Return Period */}
          <div>
            <Label className="text-base font-medium">Return Period</Label>
            <RadioGroup 
              value={filters.returnPeriod} 
              onValueChange={value => setFilters(prev => ({ ...prev, returnPeriod: value }))}
              className="grid grid-cols-4 gap-3 mt-3"
            >
              {[
                { value: '1m', label: '1M' },
                { value: '6m', label: '6M' },
                { value: '1y', label: '1Y' },
                { value: '3y', label: '3Y' },
                { value: '5y', label: '5Y' }
              ].map(period => (
                <div 
                  key={period.value}
                  className={`border rounded-lg p-2 flex justify-center items-center cursor-pointer hover:bg-gray-50 ${
                    filters.returnPeriod === period.value ? 'border-fundeasy-blue bg-blue-50 text-fundeasy-blue' : ''
                  }`}
                >
                  <Label htmlFor={period.value} className="cursor-pointer text-sm">
                    {period.label}
                  </Label>
                  <RadioGroupItem value={period.value} id={period.value} className="hidden" />
                </div>
              ))}
            </RadioGroup>
          </div>

          <Separator />

          {/* Expense Ratio */}
          <div>
            <div className="flex justify-between">
              <Label className="text-base font-medium">Expense Ratio</Label>
              <span className="text-sm">
                {filters.expenseRatio[0]}% - {filters.expenseRatio[1]}%
              </span>
            </div>
            <div className="py-6 px-2">
              <Slider 
                value={filters.expenseRatio}
                min={0}
                max={2.5}
                step={0.1}
                onValueChange={(value) => setFilters(prev => ({ ...prev, expenseRatio: value as [number, number] }))}
              />
            </div>
          </div>

          <Separator />

          {/* Fund Size */}
          <div>
            <Label className="text-base font-medium">Fund Size (AUM)</Label>
            <RadioGroup 
              value={filters.fundSize} 
              onValueChange={value => setFilters(prev => ({ ...prev, fundSize: value }))}
              className="space-y-2 mt-2"
            >
              {[
                { value: 'all', label: 'All Sizes' },
                { value: 'small', label: 'Less than ₹500 Cr' },
                { value: 'medium', label: '₹500 Cr - ₹5000 Cr' },
                { value: 'large', label: 'Above ₹5000 Cr' }
              ].map(size => (
                <div key={size.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={size.value} id={`size-${size.value}`} />
                  <Label htmlFor={`size-${size.value}`} className="cursor-pointer">
                    {size.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Separator />

          {/* Fund Type */}
          <div>
            <Label className="text-base font-medium">Fund Type</Label>
            <RadioGroup 
              value={filters.fundType} 
              onValueChange={value => setFilters(prev => ({ ...prev, fundType: value }))}
              className="grid grid-cols-2 gap-3 mt-3"
            >
              <div 
                className={`border rounded-lg p-3 flex items-center cursor-pointer hover:bg-gray-50 ${
                  filters.fundType === 'direct' ? 'border-fundeasy-blue bg-blue-50' : ''
                }`}
              >
                <RadioGroupItem value="direct" id="direct" />
                <div className="ml-2">
                  <Label htmlFor="direct" className="cursor-pointer font-medium">Direct</Label>
                  <p className="text-xs text-gray-500">Lower expense ratio</p>
                </div>
              </div>
              <div 
                className={`border rounded-lg p-3 flex items-center cursor-pointer hover:bg-gray-50 ${
                  filters.fundType === 'regular' ? 'border-fundeasy-blue bg-blue-50' : ''
                }`}
              >
                <RadioGroupItem value="regular" id="regular" />
                <div className="ml-2">
                  <Label htmlFor="regular" className="cursor-pointer font-medium">Regular</Label>
                  <p className="text-xs text-gray-500">Higher expense ratio</p>
                </div>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex gap-4">
          <Button 
            variant="outline" 
            className="flex-1 border-gray-300"
            onClick={handleResetFilters}
          >
            Reset All
          </Button>
          
          <Button 
            onClick={handleApplyFilters}
            className="flex-1 bg-fundeasy-blue hover:bg-fundeasy-dark-blue"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterFunds;
