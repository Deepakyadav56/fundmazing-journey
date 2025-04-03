
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, TrendingUp, Filter, ChevronRight, Info } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { Progress } from '@/components/ui/progress';
import FilterFunds from '@/components/funds/FilterFunds';
import TopNavigation from '@/components/funds/TopNavigation';
import { mockMutualFunds, MutualFund } from '@/utils/mockData';
import FundCard from '@/components/funds/FundCard';
import FundLogo from '@/components/funds/FundLogo';

const Explore = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [riskFilter, setRiskFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('returns');
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

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
    return 0;
  });

  // Collections for quick filters with improved icons that match the design
  const collections = [
    { 
      name: 'High Return', 
      icon: <div className="text-lg w-8 h-8 mx-auto flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-500">
          <path d="M3 3v18h18" />
          <path d="m19 9-5 5-4-4-4 4" />
        </svg>
      </div>, 
      color: 'bg-red-50 text-red-800' 
    },
    { 
      name: 'SIP with ₹500', 
      icon: <div className="text-lg w-8 h-8 mx-auto flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500">
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
      </div>, 
      color: 'bg-green-50 text-green-800' 
    },
    { 
      name: 'Tax Saving', 
      icon: <div className="text-lg w-8 h-8 mx-auto flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-yellow-500">
          <path d="M20.9 16.7c.6-.6.6-1.5 0-2.1a2 2 0 0 0-2.7-.2 1 1 0 0 0-.3.2l-3.8 3.8-3.8-3.8c-.6-.6-1.5-.6-2.1 0s-.6 1.5 0 2.1l4.8 4.8c.6.6 1.5.6 2.1 0Z" />
          <path d="M20.9 7.3c.6-.6.6-1.5 0-2.1s-1.5-.6-2.1 0L14 9.9 9.2 5.1c-.6-.6-1.5-.6-2.1 0s-.6 1.5 0 2.1l4.8 4.8c.6.6 1.5.6 2.1 0Z" />
        </svg>
      </div>, 
      color: 'bg-yellow-50 text-yellow-800' 
    },
    { 
      name: 'Large Cap', 
      icon: <div className="text-lg w-8 h-8 mx-auto flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500">
          <rect x="2" y="3" width="20" height="18" rx="2" />
          <path d="M8 7v10" />
          <path d="M12 7v10" />
          <path d="M16 7v10" />
        </svg>
      </div>, 
      color: 'bg-blue-50 text-blue-800' 
    },
    { 
      name: 'Mid Cap', 
      icon: <div className="text-lg w-8 h-8 mx-auto flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-500">
          <rect x="2" y="3" width="20" height="18" rx="2" />
          <path d="M8 10v3" />
          <path d="M12 7v9" />
          <path d="M16 10v3" />
        </svg>
      </div>, 
      color: 'bg-purple-50 text-purple-800' 
    },
    { 
      name: 'Small Cap', 
      icon: <div className="text-lg w-8 h-8 mx-auto flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-orange-500">
          <path d="M2 10h20" />
          <path d="M2 14h20" />
          <path d="M6 22V2" />
          <path d="M18 22V2" />
        </svg>
      </div>, 
      color: 'bg-orange-50 text-orange-800' 
    },
  ];

  // Featured AMCs
  const featuredAMCs = [
    { name: 'FundEasy Value Fund', returns: '14.22%', category: 'Value', logo: '📊' },
    { name: 'FundEasy Large Cap Fund', returns: '12.09%', category: 'Large Cap', logo: '📊' },
  ];

  // Popular funds - fix the type error by properly structuring the data
  const popularFunds = mockMutualFunds.slice(0, 4);

  const resetFilters = () => {
    setCategoryFilter('');
    setRiskFilter('');
    setSortBy('returns');
    setSearchQuery('');
  };

  const handleFilterApply = (filters: any) => {
    setCategoryFilter(filters.category[0] || '');
    setRiskFilter(filters.riskLevel[0] || '');
    setSortBy(filters.sortBy || 'returns');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="px-4 pt-4 pb-0">
          <h1 className="text-xl font-bold mb-2">Mutual Funds</h1>
          <TopNavigation />
        </div>
      </div>

      <div className="px-4 pt-4">
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
        
        <Tabs 
          defaultValue="all" 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full"
        >
          <TabsList className="w-full mb-2 overflow-x-auto flex">
            <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
            <TabsTrigger value="equity" className="flex-1">Equity</TabsTrigger>
            <TabsTrigger value="debt" className="flex-1">Debt</TabsTrigger>
            <TabsTrigger value="hybrid" className="flex-1">Hybrid</TabsTrigger>
            <TabsTrigger value="index" className="flex-1">Index</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Filter Options */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
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

          <Button 
            variant="outline" 
            size="sm" 
            className="text-sm"
            onClick={() => setShowFilterSheet(true)}
          >
            <Filter className="mr-1 h-4 w-4" /> Filters
          </Button>
        </div>

        {/* Collections */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <h2 className="font-medium">Collections</h2>
            <Button variant="link" size="sm" className="text-fundeasy-blue p-0">
              View All
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {collections.map((collection, idx) => (
              <Card key={idx} className="hover:shadow-md transition-all cursor-pointer">
                <CardContent className="p-3 text-center">
                  {collection.icon}
                  <p className="text-xs font-medium mt-1">{collection.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Funds by FundEasy */}
        <div className="mb-6">
          <Card className="border-fundeasy-green border-l-4">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-medium flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-fundeasy-blue to-fundeasy-green flex items-center justify-center text-white mr-2">
                    F
                  </div>
                  Funds by FundEasy
                </h2>
              </div>
              
              <div className="space-y-4">
                {featuredAMCs.map((fund, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FundLogo fundName={fund.name} className="mr-3" />
                      <div>
                        <p className="font-medium">{fund.name}</p>
                        <p className="text-xs text-gray-500">{fund.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-fundeasy-green">{fund.returns}</p>
                      <p className="text-xs text-gray-500">3Y Returns</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-4 text-sm border-t pt-3">
                <Button variant="ghost" size="sm" className="text-gray-500 p-1 h-auto">
                  Import funds
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-500 p-1 h-auto">
                  NFOs
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-500 p-1 h-auto"
                  onClick={() => navigate('/sip-calculator')}
                >
                  SIP Calculator
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-500 p-1 h-auto"
                  onClick={() => navigate('/fund-comparison')}  
                >
                  Compare funds
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Popular Funds */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <h2 className="font-medium">Popular Funds</h2>
            <Button variant="link" size="sm" className="text-fundeasy-blue p-0">
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {popularFunds.map((fund) => (
              <FundCard
                key={fund.id}
                fund={fund}
                onClick={() => navigate(`/fund/${fund.id}`)}
              />
            ))}
          </div>
        </div>

        {/* All Mutual Funds */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-medium">All Mutual Funds</h2>
            <Badge variant="outline" className="text-xs">1,482</Badge>
          </div>
          
          <div className="space-y-3">
            {filteredFunds.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">No funds match your search criteria.</p>
                <Button variant="link" onClick={resetFilters}>Reset Filters</Button>
              </div>
            ) : (
              filteredFunds.slice(0, 10).map(fund => (
                <FundCard
                  key={fund.id}
                  fund={fund}
                  onClick={() => navigate(`/fund/${fund.id}`)}
                />
              ))
            )}
            
            {filteredFunds.length > 10 && (
              <Button 
                variant="outline" 
                className="w-full mt-2" 
                onClick={() => navigate('/explore')}
              >
                View All {filteredFunds.length} Funds
              </Button>
            )}
          </div>
        </div>

        {/* Filter Sheet */}
        <FilterFunds 
          isOpen={showFilterSheet} 
          onClose={() => setShowFilterSheet(false)}
          onApply={handleFilterApply}
        />
      </div>
    </div>
  );
};

export default Explore;
