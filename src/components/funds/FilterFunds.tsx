
import React, { useState } from 'react';
import { X, Filter, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FilterFundsProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
}

interface FilterState {
  sortBy: string;
  categories: string[];
  riskLevels: string[];
  rating: string;
  fundHouses: string[];
  indexOnly: boolean;
  directPlan: boolean;
}

const FilterFunds: React.FC<FilterFundsProps> = ({ isOpen, onClose, onApply }) => {
  const [filters, setFilters] = useState<FilterState>({
    sortBy: 'returns',
    categories: [],
    riskLevels: [],
    rating: '',
    fundHouses: [],
    indexOnly: false,
    directPlan: true,
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSection, setExpandedSection] = useState<string | null>("sortBy");
  
  // Mock data for total funds count
  const totalFunds = 1482;

  // Fund Houses
  const fundHouses = [
    '360 ONE Mutual Fund',
    'Aditya Birla Sun Life Mutual Fund',
    'Axis Mutual Fund',
    'Bajaj Finserv Mutual Fund',
    'Bandhan Mutual Fund',
    'Bank of India Mutual Fund',
    'Baroda BNP Paribas Mutual Fund',
    'Baroda Mutual Fund',
    'Canara Robeco Mutual Fund',
    'DSP Mutual Fund',
    'Edelweiss Mutual Fund',
    'Franklin Templeton Mutual Fund',
    'Groww Mutual Fund',
    'HDFC Mutual Fund',
    'HSBC Mutual Fund',
    'ICICI Prudential Mutual Fund',
    'IDFC Mutual Fund',
    'Invesco Mutual Fund',
    'ITI Mutual Fund',
    'JM Financial Mutual Fund',
    'Kotak Mahindra Mutual Fund',
    'LIC Mutual Fund',
    'Mahindra Manulife Mutual Fund',
    'Mirae Asset Mutual Fund',
    'Motilal Oswal Mutual Fund',
    'Navi Mutual Fund',
    'Nippon India Mutual Fund',
    'PGIM India Mutual Fund',
    'PPFAS Mutual Fund',
    'Quant Mutual Fund',
    'Quantum Mutual Fund',
    'SBI Mutual Fund',
    'Sundaram Mutual Fund',
    'Tata Mutual Fund',
    'Taurus Mutual Fund',
    'Trust Mutual Fund',
    'Union Mutual Fund',
    'UTI Mutual Fund',
    'WhiteOak Capital Mutual Fund'
  ];

  const filteredFundHouses = searchTerm 
    ? fundHouses.filter(house => house.toLowerCase().includes(searchTerm.toLowerCase()))
    : fundHouses;

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };
  
  // Toggle risk level selection
  const toggleRiskLevel = (risk: string) => {
    setFilters(prev => ({
      ...prev,
      riskLevels: prev.riskLevels.includes(risk)
        ? prev.riskLevels.filter(r => r !== risk)
        : [...prev.riskLevels, risk]
    }));
  };
  
  // Toggle fund house selection
  const toggleFundHouse = (house: string) => {
    setFilters(prev => ({
      ...prev,
      fundHouses: prev.fundHouses.includes(house)
        ? prev.fundHouses.filter(h => h !== house)
        : [...prev.fundHouses, house]
    }));
  };

  // Reset all filters
  const handleResetFilters = () => {
    setFilters({
      sortBy: 'returns',
      categories: [],
      riskLevels: [],
      rating: '',
      fundHouses: [],
      indexOnly: false,
      directPlan: true,
    });
    setSearchTerm('');
  };

  // Apply filters and close modal
  const handleApplyFilters = () => {
    onApply(filters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex">
      <div className="bg-white w-full md:w-96 h-full overflow-y-auto">
        <div className="p-4 flex items-center justify-between border-b">
          <div className="flex items-center">
            <Filter size={18} className="mr-2" />
            <h2 className="text-lg font-medium">Filters</h2>
          </div>
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className="mr-2 text-sm font-medium"
              onClick={handleResetFilters}
            >
              Clear all
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X size={18} />
            </Button>
          </div>
        </div>

        <div className="divide-y">
          {/* Sort By Section */}
          <Accordion 
            type="single" 
            collapsible 
            className="w-full"
            value={expandedSection === "sortBy" ? "sortBy" : undefined}
            onValueChange={(value) => setExpandedSection(value || null)}
          >
            <AccordionItem value="sortBy" className="border-none">
              <AccordionTrigger className="py-4 px-4 hover:no-underline">
                <span className="text-base font-medium">Sort By</span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <RadioGroup 
                  value={filters.sortBy} 
                  onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}
                >
                  {[
                    { value: 'returns', label: '1Y Returns' },
                    { value: 'returns3y', label: '3Y Returns' },
                    { value: 'returns5y', label: '5Y Returns' },
                    { value: 'aum', label: 'AUM Size' },
                    { value: 'expense', label: 'Expense Ratio (Low to High)' },
                  ].map((option) => (
                    <div key={option.value} className="flex items-center space-x-2 py-2">
                      <RadioGroupItem value={option.value} id={`sort-${option.value}`} />
                      <Label htmlFor={`sort-${option.value}`}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Category Section */}
          <Accordion 
            type="single" 
            collapsible 
            className="w-full"
            value={expandedSection === "category" ? "category" : undefined}
            onValueChange={(value) => setExpandedSection(value || null)}
          >
            <AccordionItem value="category" className="border-none">
              <AccordionTrigger className="py-4 px-4 hover:no-underline">
                <span className="text-base font-medium">Category</span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="mb-4 flex items-center justify-between">
                  <Label className="text-sm">Index Funds Only</Label>
                  <Switch 
                    checked={filters.indexOnly}
                    onCheckedChange={(checked) => setFilters(prev => ({ ...prev, indexOnly: checked }))}
                  />
                </div>
                <Separator className="my-2" />
                
                {['Equity', 'Debt', 'Hybrid', 'Commodities'].map((category) => (
                  <div key={category} className="flex items-center space-x-2 py-2">
                    <Checkbox 
                      id={`category-${category}`}
                      checked={filters.categories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <Label htmlFor={`category-${category}`}>{category}</Label>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Risk Section */}
          <Accordion 
            type="single" 
            collapsible 
            className="w-full"
            value={expandedSection === "risk" ? "risk" : undefined}
            onValueChange={(value) => setExpandedSection(value || null)}
          >
            <AccordionItem value="risk" className="border-none">
              <AccordionTrigger className="py-4 px-4 hover:no-underline">
                <span className="text-base font-medium">Risk</span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                {[
                  'Low', 
                  'Moderately Low', 
                  'Moderate', 
                  'Moderately High', 
                  'High', 
                  'Very High'
                ].map((risk) => (
                  <div key={risk} className="flex items-center space-x-2 py-2">
                    <Checkbox 
                      id={`risk-${risk}`}
                      checked={filters.riskLevels.includes(risk)}
                      onCheckedChange={() => toggleRiskLevel(risk)}
                    />
                    <Label htmlFor={`risk-${risk}`}>{risk}</Label>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Ratings Section */}
          <Accordion 
            type="single" 
            collapsible 
            className="w-full"
            value={expandedSection === "rating" ? "rating" : undefined}
            onValueChange={(value) => setExpandedSection(value || null)}
          >
            <AccordionItem value="rating" className="border-none">
              <AccordionTrigger className="py-4 px-4 hover:no-underline">
                <span className="text-base font-medium">Ratings</span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <RadioGroup 
                  value={filters.rating} 
                  onValueChange={(value) => setFilters(prev => ({ ...prev, rating: value }))}
                >
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="flex items-center space-x-2 py-2">
                      <RadioGroupItem value={stars.toString()} id={`rating-${stars}`} />
                      <Label htmlFor={`rating-${stars}`}>
                        {stars} {stars === 1 ? 'Star' : 'Stars'}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Fund House Section */}
          <Accordion 
            type="single" 
            collapsible 
            className="w-full"
            value={expandedSection === "fundHouse" ? "fundHouse" : undefined}
            onValueChange={(value) => setExpandedSection(value || null)}
          >
            <AccordionItem value="fundHouse" className="border-none">
              <AccordionTrigger className="py-4 px-4 hover:no-underline">
                <span className="text-base font-medium">Fund House</span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="relative mb-4">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search fund house"
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="max-h-60 overflow-y-auto">
                  {filteredFundHouses.map((house) => (
                    <div key={house} className="flex items-center space-x-2 py-2">
                      <Checkbox 
                        id={`house-${house}`}
                        checked={filters.fundHouses.includes(house)}
                        onCheckedChange={() => toggleFundHouse(house)}
                      />
                      <Label htmlFor={`house-${house}`} className="text-sm">{house}</Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Direct/Regular Plan Toggle */}
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-medium">Plan Type</h3>
                <p className="text-xs text-gray-500">Direct plans have lower expense ratio</p>
              </div>
              <Switch 
                checked={filters.directPlan}
                onCheckedChange={(checked) => setFilters(prev => ({ ...prev, directPlan: checked }))}
              />
            </div>
            <p className="text-xs mt-1">
              {filters.directPlan ? 'Direct Plan' : 'Regular Plan'}
            </p>
          </div>
        </div>

        {/* Apply Filters Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
          <Button 
            className="w-full bg-fundeasy-blue hover:bg-fundeasy-dark-blue"
            onClick={handleApplyFilters}
          >
            View {totalFunds} funds
          </Button>
        </div>
      </div>
      
      {/* Overlay to close when clicked outside on larger screens */}
      <div 
        className="hidden md:block flex-1 h-full" 
        onClick={onClose}
      />
    </div>
  );
};

export default FilterFunds;
