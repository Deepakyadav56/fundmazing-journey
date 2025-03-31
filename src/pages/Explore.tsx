
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, TrendingUp, Filter } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { mockMutualFunds, MutualFund } from '@/utils/mockData';

const Explore = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [riskFilter, setRiskFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('returns');

  // Filter and sort funds
  const filteredFunds = mockMutualFunds.filter(fund => {
    let matchesSearch = true;
    let matchesCategory = true;
    let matchesRisk = true;

    if (searchQuery) {
      matchesSearch = fund.name.toLowerCase().includes(searchQuery.toLowerCase());
    }

    if (categoryFilter) {
      matchesCategory = fund.category === categoryFilter;
    }

    if (riskFilter) {
      matchesRisk = fund.risk === riskFilter;
    }

    return matchesSearch && matchesCategory && matchesRisk;
  }).sort((a, b) => {
    if (sortBy === 'returns') {
      return b.returns.oneYear - a.returns.oneYear;
    }
    // Add more sorting options if needed
    return 0;
  });

  const resetFilters = () => {
    setCategoryFilter('');
    setRiskFilter('');
    setSortBy('returns');
  };

  return (
    <PageContainer title="Explore Funds">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search funds..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filter Options */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[140px] text-sm">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="returns">1Y Returns</SelectItem>
            <SelectItem value="aum">Fund Size</SelectItem>
            <SelectItem value="nav">NAV</SelectItem>
          </SelectContent>
        </Select>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="text-sm">
              <Filter className="mr-1 h-4 w-4" /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Funds</SheetTitle>
            </SheetHeader>
            <div className="py-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    <SelectItem value="Equity">Equity</SelectItem>
                    <SelectItem value="Debt">Debt</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Risk Level</label>
                <Select value={riskFilter} onValueChange={setRiskFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Risk Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Risk Levels</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={resetFilters} variant="outline" className="w-full">Reset Filters</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Fund List */}
      <div className="space-y-4">
        {filteredFunds.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No funds match your search criteria.</p>
          </div>
        ) : (
          filteredFunds.map(fund => (
            <FundCard
              key={fund.id}
              fund={fund}
              onClick={() => navigate(`/fund/${fund.id}`)}
            />
          ))
        )}
      </div>
    </PageContainer>
  );
};

interface FundCardProps {
  fund: MutualFund;
  onClick: () => void;
}

const FundCard: React.FC<FundCardProps> = ({ fund, onClick }) => {
  return (
    <Card className="card-shadow hover-scale" onClick={onClick}>
      <CardContent className="p-4">
        <div className="flex justify-between mb-1">
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
        
        <h3 className="font-medium mt-1">{fund.name}</h3>
        
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
      </CardContent>
    </Card>
  );
};

export default Explore;
