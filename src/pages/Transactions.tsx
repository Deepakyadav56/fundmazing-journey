import React, { useState } from 'react';
import { format } from 'date-fns';
import { Search, Filter, Download, ChevronDown, SlidersHorizontal } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { Input } from '@/components/ui/input';
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
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { mockMutualFunds } from '@/utils/mockData';
import QRCode from '@/components/ui/qr-code';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Transaction } from '@/types';

// Mock transactions data
const mockTransactions: Transaction[] = [
  {
    id: 'txn-001',
    type: 'investment',
    fundId: 'fund1',
    amount: 5000,
    units: 4.35,
    date: new Date(2023, 2, 15),
    status: 'completed',
    paymentMethod: 'upi'
  },
  {
    id: 'txn-002',
    type: 'investment',
    fundId: 'fund5',
    amount: 10000,
    units: 8.75,
    date: new Date(2023, 3, 20),
    status: 'completed',
    paymentMethod: 'netbanking'
  },
  {
    id: 'txn-003',
    type: 'redemption',
    fundId: 'fund1',
    amount: 2500,
    units: 2.15,
    date: new Date(2023, 4, 5),
    status: 'completed',
    paymentMethod: 'upi'
  },
  {
    id: 'txn-004',
    type: 'investment',
    fundId: 'fund3',
    amount: 7500,
    units: 6.25,
    date: new Date(2023, 4, 15),
    status: 'pending',
    paymentMethod: 'upi'
  },
  {
    id: 'txn-005',
    type: 'investment',
    fundId: 'fund2',
    amount: 12000,
    units: 10.25,
    date: new Date(2023, 5, 1),
    status: 'completed',
    paymentMethod: 'netbanking'
  },
];

const Transactions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  
  // Filter transactions
  const filteredTransactions = mockTransactions.filter(txn => {
    const matchesSearch = 
      searchQuery === '' || 
      mockMutualFunds.find(f => f.id === txn.fundId)?.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === 'all' || txn.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || txn.status === statusFilter;
    
    // Date filtering logic (simplified)
    let matchesDate = true;
    if (dateFilter === 'lastWeek') {
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      matchesDate = txn.date >= lastWeek;
    } else if (dateFilter === 'lastMonth') {
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      matchesDate = txn.date >= lastMonth;
    } else if (dateFilter === 'last3Months') {
      const last3Months = new Date();
      last3Months.setMonth(last3Months.getMonth() - 3);
      matchesDate = txn.date >= last3Months;
    }
    
    return matchesSearch && matchesType && matchesStatus && matchesDate;
  }).sort((a, b) => b.date.getTime() - a.date.getTime());
  
  return (
    <PageContainer 
      title="Transactions" 
      showBackButton={true}
      headerRight={
        <Button variant="ghost" size="sm">
          <Download size={16} className="mr-1" /> Export
        </Button>
      }
    >
      <div className="mb-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search by fund name..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[130px] text-sm">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="investment">Investment</SelectItem>
              <SelectItem value="redemption">Redemption</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px] text-sm">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-[130px] text-sm">
              <SelectValue placeholder="All Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="lastWeek">Last Week</SelectItem>
              <SelectItem value="lastMonth">Last Month</SelectItem>
              <SelectItem value="last3Months">Last 3 Months</SelectItem>
            </SelectContent>
          </Select>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="text-sm">
                <SlidersHorizontal className="mr-1 h-4 w-4" /> More Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Advanced Filters</SheetTitle>
              </SheetHeader>
              {/* Additional filters would go here */}
              <div className="py-6 space-y-6">
                {/* Custom date range, amount range, etc. */}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      <div className="space-y-3 pb-16">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No transactions found.</p>
          </div>
        ) : (
          filteredTransactions.map((transaction) => {
            const fund = mockMutualFunds.find(f => f.id === transaction.fundId);
            
            return (
              <Dialog key={transaction.id}>
                <DialogTrigger asChild>
                  <div 
                    className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-fundeasy-green hover:shadow-md transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{fund?.name || 'Unknown Fund'}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {transaction.type === 'investment' ? 'Invested' : 'Redeemed'} {transaction.units.toFixed(2)} units
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${transaction.type === 'investment' ? 'text-fundeasy-red' : 'text-fundeasy-green'}`}>
                          {transaction.type === 'investment' ? '-' : '+'} ₹{transaction.amount.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {format(transaction.date, 'dd MMM yyyy')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                        transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                      <span className="text-xs text-gray-500">
                        via {transaction.paymentMethod === 'upi' ? 'UPI' : 'Netbanking'}
                      </span>
                    </div>
                  </div>
                </DialogTrigger>
                
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Transaction Details</DialogTitle>
                  </DialogHeader>
                  
                  <Tabs defaultValue="details" className="mt-4">
                    <TabsList className="grid grid-cols-2">
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="receipt">Receipt</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="details" className="mt-4">
                      <div className="space-y-4">
                        <div className="py-3 border-b">
                          <p className="text-sm text-gray-500">Fund Name</p>
                          <p className="font-medium">{fund?.name || 'Unknown Fund'}</p>
                        </div>
                        
                        <div className="py-3 border-b">
                          <p className="text-sm text-gray-500">Transaction Type</p>
                          <p className="font-medium capitalize">{transaction.type}</p>
                        </div>
                        
                        <div className="py-3 border-b">
                          <p className="text-sm text-gray-500">Amount</p>
                          <p className="font-medium">₹{transaction.amount.toLocaleString()}</p>
                        </div>
                        
                        <div className="py-3 border-b">
                          <p className="text-sm text-gray-500">Units</p>
                          <p className="font-medium">{transaction.units.toFixed(3)}</p>
                        </div>
                        
                        <div className="py-3 border-b">
                          <p className="text-sm text-gray-500">NAV</p>
                          <p className="font-medium">₹{(transaction.amount / transaction.units).toFixed(2)}</p>
                        </div>
                        
                        <div className="py-3 border-b">
                          <p className="text-sm text-gray-500">Date & Time</p>
                          <p className="font-medium">{format(transaction.date, 'dd MMM yyyy, hh:mm a')}</p>
                        </div>
                        
                        <div className="py-3 border-b">
                          <p className="text-sm text-gray-500">Payment Method</p>
                          <p className="font-medium">{transaction.paymentMethod === 'upi' ? 'UPI' : 'Net Banking'}</p>
                        </div>
                        
                        <div className="py-3">
                          <p className="text-sm text-gray-500">Status</p>
                          <p className={`font-medium ${
                            transaction.status === 'completed' ? 'text-green-600' :
                            transaction.status === 'pending' ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="receipt" className="mt-4">
                      <div className="flex flex-col items-center p-4 bg-white rounded-xl">
                        <div className="text-center mb-6">
                          <h3 className="font-semibold text-xl mb-1">
                            {transaction.type === 'investment' ? 'Investment Receipt' : 'Redemption Receipt'}
                          </h3>
                          <p className="text-sm text-gray-500">Transaction ID: {transaction.id}</p>
                          <p className="text-xs text-gray-500 mt-1">{format(transaction.date, 'dd MMM yyyy')}</p>
                        </div>
                        
                        <div className="w-full mb-6">
                          <div className="flex justify-between text-sm py-2">
                            <span className="text-gray-500">Fund</span>
                            <span>{fund?.name}</span>
                          </div>
                          <div className="flex justify-between text-sm py-2">
                            <span className="text-gray-500">Amount</span>
                            <span>₹{transaction.amount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm py-2 border-b">
                            <span className="text-gray-500">Units</span>
                            <span>{transaction.units.toFixed(3)}</span>
                          </div>
                          <div className="flex justify-between text-sm font-medium py-3">
                            <span>Total</span>
                            <span>₹{transaction.amount.toLocaleString()}</span>
                          </div>
                        </div>
                        
                        <QRCode 
                          value={`FundEasy|TXN:${transaction.id}|AMT:${transaction.amount}|DATE:${format(transaction.date, 'yyyy-MM-dd')}`}
                          size={180}
                          className="mb-6"
                        />
                        
                        <div className="mt-4 w-full flex justify-center gap-2">
                          <Button variant="outline" className="flex-1">
                            <Download size={16} className="mr-1" /> Save
                          </Button>
                          <Button className="flex-1 bg-fundeasy-green hover:bg-fundeasy-dark-green">
                            Share
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
            );
          })
        )}
      </div>
    </PageContainer>
  );
};

export default Transactions;
