
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Plus, Filter, ArrowUpRight, Pause, PlayCircle, AlertCircle, ChevronRight } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import StatsCard from '@/components/ui/stats-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { mockMutualFunds } from '@/utils/mockData';
import { SIPInvestment } from '@/types';

// Mock SIP data
const mockSIPs: SIPInvestment[] = [
  {
    id: "sip1",
    fundId: "fund1",
    amount: 5000,
    frequency: 'monthly',
    startDate: new Date('2023-01-10'),
    nextDate: new Date('2023-09-10'),
    status: 'active',
    totalInvested: 40000,
    currentValue: 42500
  },
  {
    id: "sip2",
    fundId: "fund2",
    amount: 2000,
    frequency: 'monthly',
    startDate: new Date('2023-03-15'),
    nextDate: new Date('2023-09-15'),
    status: 'active',
    totalInvested: 12000,
    currentValue: 12800
  },
  {
    id: "sip3",
    fundId: "fund3",
    amount: 10000,
    frequency: 'quarterly',
    startDate: new Date('2023-02-01'),
    nextDate: new Date('2023-11-01'),
    status: 'paused',
    totalInvested: 30000,
    currentValue: 31200
  }
];

const SIPDashboard = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<string>('date');
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [selectedSIP, setSelectedSIP] = useState<SIPInvestment | null>(null);

  const totalInvestedAmount = mockSIPs.reduce((sum, sip) => sum + sip.totalInvested, 0);
  const totalCurrentValue = mockSIPs.reduce((sum, sip) => sum + sip.currentValue, 0);
  const totalGain = totalCurrentValue - totalInvestedAmount;
  const totalGainPercentage = ((totalGain / totalInvestedAmount) * 100).toFixed(2);
  
  const sortedSIPs = [...mockSIPs].sort((a, b) => {
    if (sortBy === 'amount') {
      return b.amount - a.amount;
    } else if (sortBy === 'value') {
      return b.currentValue - a.currentValue;
    } else if (sortBy === 'returns') {
      const returnA = (a.currentValue - a.totalInvested) / a.totalInvested;
      const returnB = (b.currentValue - b.totalInvested) / b.totalInvested;
      return returnB - returnA;
    }
    // Default sort by next payment date
    return a.nextDate.getTime() - b.nextDate.getTime();
  });

  const handlePauseResume = (sip: SIPInvestment) => {
    setSelectedSIP(sip);
    setShowStatusDialog(true);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  const getDaysUntilNextPayment = (date: Date) => {
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <PageContainer 
      title="SIP Dashboard" 
      showBackButton 
      headerRight={
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => navigate('/investment-history')}
          className="text-xs bg-fundeasy-accent-bg text-fundeasy-blue border-none"
        >
          History
        </Button>
      }
    >
      {/* Summary Cards */}
      <Card className="mb-6 bg-white shadow-card border-none">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">SIP Summary</h2>
            <div className="text-sm text-fundeasy-blue">Total: ₹{totalInvestedAmount.toLocaleString()}</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Current Value</p>
              <p className="text-xl font-semibold">₹{totalCurrentValue.toLocaleString()}</p>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-gray-500">Returns</p>
              <div className={`flex items-center justify-end ${parseFloat(totalGainPercentage) >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                <ArrowUpRight size={16} className={`mr-1 ${parseFloat(totalGainPercentage) < 0 ? 'rotate-180' : ''}`} />
                <p className="text-lg font-semibold">{totalGainPercentage}%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sort Options */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Your SIPs</h2>
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[120px] text-sm h-9 bg-fundeasy-light-gray border-none">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Next Date</SelectItem>
              <SelectItem value="amount">Amount</SelectItem>
              <SelectItem value="value">Value</SelectItem>
              <SelectItem value="returns">Returns</SelectItem>
            </SelectContent>
          </Select>
          
          <Button size="sm" variant="outline" className="h-9 bg-fundeasy-light-gray border-none">
            <Filter size={14} className="mr-1" /> Filter
          </Button>
        </div>
      </div>

      {/* SIP List */}
      <div className="space-y-4">
        {sortedSIPs.length === 0 ? (
          <div className="text-center py-10 bg-fundeasy-light-gray rounded-lg">
            <p className="text-gray-500 mb-4">You haven't set up any SIPs yet.</p>
            <Button 
              onClick={() => navigate('/explore')}
              className="bg-fundeasy-blue hover:bg-fundeasy-light-blue shadow-button"
            >
              <Plus size={16} className="mr-1" /> Start a SIP
            </Button>
          </div>
        ) : (
          sortedSIPs.map((sip) => {
            const fund = mockMutualFunds.find(f => f.id === sip.fundId);
            const gain = sip.currentValue - sip.totalInvested;
            const gainPercentage = ((gain / sip.totalInvested) * 100).toFixed(2);
            const daysUntilNext = getDaysUntilNextPayment(sip.nextDate);
            
            return (
              <Card key={sip.id} className="shadow-card border-none">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        sip.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {sip.status === 'active' ? 'Active' : 'Paused'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {sip.frequency.charAt(0).toUpperCase() + sip.frequency.slice(1)}
                      </span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => handlePauseResume(sip)}
                    >
                      {sip.status === 'active' ? 
                        <Pause size={16} className="text-gray-500" /> : 
                        <PlayCircle size={16} className="text-fundeasy-blue" />
                      }
                    </Button>
                  </div>
                  
                  <h3 className="font-medium mt-1 line-clamp-1">{fund?.name}</h3>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <p className="text-xs text-gray-500">Monthly SIP</p>
                      <p className="font-medium">₹{sip.amount.toLocaleString()}</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Next Date</p>
                      <p className={`font-medium ${daysUntilNext <= 7 ? 'text-amber-600' : ''}`}>
                        {formatDate(sip.nextDate)}
                        {daysUntilNext <= 7 && (
                          <span className="text-xs ml-1">({daysUntilNext}d)</span>
                        )}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Returns</p>
                      <div className={`flex items-center ${gain >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                        <ArrowUpRight size={14} className={`mr-0.5 ${gain < 0 ? 'rotate-180' : ''}`} />
                        <p className="font-medium">{gainPercentage}%</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500">Total Invested</p>
                      <p className="text-sm">₹{sip.totalInvested.toLocaleString()}</p>
                    </div>
                    
                    <Button 
                      variant="link" 
                      className="text-fundeasy-blue p-0 h-auto text-sm"
                      onClick={() => navigate(`/fund/${sip.fundId}`)}
                    >
                      View Fund <ChevronRight size={14} className="ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
      
      {/* Fixed Add Button */}
      <div className="fixed bottom-20 right-4">
        <Button 
          className="h-14 w-14 rounded-full shadow-lg bg-fundeasy-blue hover:bg-fundeasy-light-blue shadow-button"
          onClick={() => navigate('/explore')}
        >
          <Plus size={24} />
        </Button>
      </div>

      {/* Pause/Resume SIP Dialog */}
      <AlertDialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {selectedSIP?.status === 'active' ? 'Pause SIP' : 'Resume SIP'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {selectedSIP?.status === 'active' 
                ? 'Are you sure you want to pause this SIP? No amount will be debited until you resume it.'
                : 'Are you sure you want to resume this SIP? The amount will be debited on the next SIP date.'
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-fundeasy-blue hover:bg-fundeasy-light-blue rounded-full shadow-button">
              {selectedSIP?.status === 'active' ? 'Yes, Pause SIP' : 'Yes, Resume SIP'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Disclaimer */}
      <div className="flex items-center mt-8 mb-16 bg-fundeasy-accent-bg p-3 rounded-md">
        <AlertCircle size={16} className="text-fundeasy-blue mr-2 flex-shrink-0" />
        <p className="text-xs text-gray-600">
          SIP investments are subject to market risks. Read all scheme related documents carefully before investing.
        </p>
      </div>
    </PageContainer>
  );
};

export default SIPDashboard;
