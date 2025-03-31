
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Filter, ChevronDown, Download, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
  SheetClose,
  SheetFooter,
} from '@/components/ui/sheet';
import { mockMutualFunds } from '@/utils/mockData';
import { Transaction } from '@/types';

// Mock transaction data
const mockTransactions: Transaction[] = [
  {
    id: "txn1",
    type: 'investment',
    fundId: "fund1",
    amount: 5000,
    units: 145.78,
    date: new Date('2023-08-15'),
    status: 'completed',
    paymentMethod: 'upi'
  },
  {
    id: "txn2",
    type: 'investment',
    fundId: "fund2",
    amount: 2000,
    units: 87.32,
    date: new Date('2023-08-10'),
    status: 'completed',
    paymentMethod: 'netbanking'
  },
  {
    id: "txn3",
    type: 'redemption',
    fundId: "fund3",
    amount: 10000,
    units: 312.45,
    date: new Date('2023-07-28'),
    status: 'completed',
    paymentMethod: 'upi'
  },
  {
    id: "txn4",
    type: 'investment',
    fundId: "fund5",
    amount: 1000,
    units: 24.15,
    date: new Date('2023-07-22'),
    status: 'completed',
    paymentMethod: 'upi'
  },
  {
    id: "txn5",
    type: 'investment',
    fundId: "fund1",
    amount: 5000,
    units: 149.25,
    date: new Date('2023-07-15'),
    status: 'completed',
    paymentMethod: 'upi'
  },
  {
    id: "txn6",
    type: 'investment',
    fundId: "fund2",
    amount: 2000,
    units: 88.76,
    date: new Date('2023-07-10'),
    status: 'completed',
    paymentMethod: 'netbanking'
  },
  {
    id: "txn7",
    type: 'redemption',
    fundId: "fund4",
    amount: 8000,
    units: 200.45,
    date: new Date('2023-06-28'),
    status: 'pending',
    paymentMethod: 'upi'
  },
  {
    id: "txn8",
    type: 'investment',
    fundId: "fund3",
    amount: 3000,
    units: 94.32,
    date: new Date('2023-06-15'),
    status: 'failed',
    paymentMethod: 'netbanking'
  }
];

const InvestmentHistory = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('date');
  
  // Filter transactions
  const filteredTransactions = mockTransactions.filter(txn => {
    let matchesSearch = true;
    let matchesType = true;
    let matchesStatus = true;
    let matchesDate = true;
    
    // Get fund details
    const fund = mockMutualFunds.find(f => f.id === txn.fundId);
    
    if (searchQuery) {
      matchesSearch = fund 
        ? fund.name.toLowerCase().includes(searchQuery.toLowerCase())
        : false;
    }
    
    if (typeFilter) {
      matchesType = txn.type === typeFilter;
    }
    
    if (statusFilter) {
      matchesStatus = txn.status === statusFilter;
    }
    
    if (dateFilter) {
      const now = new Date();
      const txnDate = new Date(txn.date);
      
      if (dateFilter === '30days') {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(now.getDate() - 30);
        matchesDate = txnDate >= thirtyDaysAgo;
      } else if (dateFilter === '90days') {
        const ninetyDaysAgo = new Date();
        ninetyDaysAgo.setDate(now.getDate() - 90);
        matchesDate = txnDate >= ninetyDaysAgo;
      } else if (dateFilter === '1year') {
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(now.getFullYear() - 1);
        matchesDate = txnDate >= oneYearAgo;
      }
    }
    
    return matchesSearch && matchesType && matchesStatus && matchesDate;
  });
  
  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === 'amount') {
      return b.amount - a.amount;
    } else if (sortBy === 'units') {
      return b.units - a.units;
    }
    
    // Default sort by date
    return b.date.getTime() - a.date.getTime();
  });
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };
  
  // Reset all filters
  const resetFilters = () => {
    setTypeFilter('');
    setStatusFilter('');
    setDateFilter('');
    setSortBy('date');
  };

  // Calculate total investment and redemption amounts
  const totalInvestment = mockTransactions
    .filter(txn => txn.type === 'investment' && txn.status === 'completed')
    .reduce((sum, txn) => sum + txn.amount, 0);
    
  const totalRedemption = mockTransactions
    .filter(txn => txn.type === 'redemption' && txn.status === 'completed')
    .reduce((sum, txn) => sum + txn.amount, 0);
  
  return (
    <PageContainer 
      title="Investment History" 
      showBackButton
      headerRight={
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0"
          onClick={() => {/* Download functionality would be added here */}}
        >
          <Download size={18} />
        </Button>
      }
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Card>
          <CardContent className="p-3">
            <p className="text-xs text-gray-500">Total Investment</p>
            <p className="text-lg font-semibold text-fundeasy-green">₹{totalInvestment.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <p className="text-xs text-gray-500">Total Redemption</p>
            <p className="text-lg font-semibold text-amber-500">₹{totalRedemption.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Filters Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="relative flex-1 max-w-sm">
          <Input
            placeholder="Search fund..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-8"
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[130px] h-9 text-xs">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="amount">Amount</SelectItem>
              <SelectItem value="units">Units</SelectItem>
            </SelectContent>
          </Select>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Filter size={14} className="mr-1" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Transactions</SheetTitle>
              </SheetHeader>
              
              <div className="py-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Transaction Type</label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Types</SelectItem>
                      <SelectItem value="investment">Investment</SelectItem>
                      <SelectItem value="redemption">Redemption</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Range</label>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Time</SelectItem>
                      <SelectItem value="30days">Last 30 Days</SelectItem>
                      <SelectItem value="90days">Last 90 Days</SelectItem>
                      <SelectItem value="1year">Last 1 Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <SheetFooter className="flex justify-between sm:justify-between">
                <SheetClose asChild>
                  <Button variant="outline" onClick={resetFilters}>Reset</Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button className="bg-fundeasy-green hover:bg-fundeasy-dark-green">Apply</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {/* Applied Filters */}
      {(typeFilter || statusFilter || dateFilter) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {typeFilter && (
            <Badge variant="outline" className="flex items-center gap-1">
              Type: {typeFilter === 'investment' ? 'Investment' : 'Redemption'}
              <button 
                className="ml-1 hover:bg-gray-100 rounded-full"
                onClick={() => setTypeFilter('')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </Badge>
          )}
          
          {statusFilter && (
            <Badge variant="outline" className="flex items-center gap-1">
              Status: {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
              <button 
                className="ml-1 hover:bg-gray-100 rounded-full"
                onClick={() => setStatusFilter('')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </Badge>
          )}
          
          {dateFilter && (
            <Badge variant="outline" className="flex items-center gap-1">
              Period: {dateFilter === '30days' ? 'Last 30 Days' : dateFilter === '90days' ? 'Last 90 Days' : 'Last 1 Year'}
              <button 
                className="ml-1 hover:bg-gray-100 rounded-full"
                onClick={() => setDateFilter('')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </Badge>
          )}
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 text-xs"
            onClick={resetFilters}
          >
            Clear All
          </Button>
        </div>
      )}
      
      {/* Transaction List */}
      <div className="space-y-4 mb-20">
        {sortedTransactions.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Calendar size={40} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">No transactions found</p>
            <p className="text-xs text-gray-400">Try adjusting your filters</p>
          </div>
        ) : (
          <>
            {/* Group transactions by month */}
            {Object.entries(
              sortedTransactions.reduce((groups: {[key: string]: Transaction[]}, transaction) => {
                const month = new Date(transaction.date).toLocaleString('default', { month: 'long', year: 'numeric' });
                if (!groups[month]) {
                  groups[month] = [];
                }
                groups[month].push(transaction);
                return groups;
              }, {})
            ).map(([month, transactions]) => (
              <div key={month} className="mb-6">
                <h3 className="text-sm font-medium text-gray-600 mb-2">{month}</h3>
                <div className="space-y-2">
                  {transactions.map(transaction => {
                    const fund = mockMutualFunds.find(f => f.id === transaction.fundId);
                    
                    return (
                      <Card key={transaction.id} className="hover:shadow-sm transition">
                        <CardContent className="p-3">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <div className="flex items-center">
                                  <Badge className={`
                                    ${transaction.type === 'investment' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'} 
                                    mr-2 font-normal
                                  `}>
                                    {transaction.type === 'investment' ? 'Buy' : 'Redeem'}
                                  </Badge>
                                  <span className="text-xs text-gray-500">{formatDate(transaction.date)}</span>
                                </div>
                                <Badge className={`
                                  font-normal
                                  ${transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                    transaction.status === 'pending' ? 'bg-blue-100 text-blue-800' : 
                                    'bg-red-100 text-red-800'}
                                `}>
                                  {transaction.status === 'completed' ? (
                                    <CheckCircle size={12} className="mr-1" />
                                  ) : transaction.status === 'pending' ? (
                                    <Clock size={12} className="mr-1" />
                                  ) : (
                                    <AlertCircle size={12} className="mr-1" />
                                  )}
                                  {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                </Badge>
                              </div>
                              
                              <p className="font-medium mt-2">
                                {fund?.name || 'Unknown Fund'}
                              </p>
                              
                              <div className="flex justify-between mt-2">
                                <div>
                                  <p className="text-xs text-gray-500">Amount</p>
                                  <p className={`font-medium ${transaction.type === 'investment' ? 'text-fundeasy-green' : 'text-amber-600'}`}>
                                    {transaction.type === 'investment' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                                  </p>
                                </div>
                                
                                <div className="text-center">
                                  <p className="text-xs text-gray-500">Units</p>
                                  <p className="font-medium">{transaction.units.toFixed(2)}</p>
                                </div>
                                
                                <div className="text-right">
                                  <p className="text-xs text-gray-500">Payment</p>
                                  <p className="font-medium capitalize">
                                    {transaction.paymentMethod === 'upi' ? 'UPI' : 'Netbanking'}
                                  </p>
                                </div>
                              </div>
                            </div>
                            
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => {/* View transaction details */}}
                            >
                              <ChevronDown size={16} className="text-gray-400" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </PageContainer>
  );
};

export default InvestmentHistory;
