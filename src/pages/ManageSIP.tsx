
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, PieChart, ArrowUpRight, AlertCircle, Pause, Play, Edit, Trash2 } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockMutualFunds } from '@/utils/mockData';
import { useToast } from '@/hooks/use-toast';

const ManageSIP = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Mock SIP data
  const sipData = {
    id: id || "sip1",
    fundId: "fund1",
    amount: 5000,
    frequency: "Monthly",
    startDate: "10 Jan 2023",
    nextDate: "10 Aug 2023",
    status: "active",
    totalInvested: 40000,
    currentValue: 42500,
    returns: 6.25,
    paymentMethod: "Auto-debit",
    bank: "HDFC Bank",
    accountNumber: "XXXX1234"
  };
  
  const fund = mockMutualFunds.find(f => f.id === sipData.fundId);
  
  const [isModifySIPOpen, setIsModifySIPOpen] = useState(false);
  const [isSkipSIPOpen, setIsSkipSIPOpen] = useState(false);
  const [isPauseSIPOpen, setIsPauseSIPOpen] = useState(false);
  const [isTerminateSIPOpen, setIsTerminateSIPOpen] = useState(false);
  
  const [modifiedAmount, setModifiedAmount] = useState(sipData.amount.toString());
  const [pauseDuration, setPauseDuration] = useState("3");
  const [skipDate, setSkipDate] = useState(sipData.nextDate);
  
  const handleModifySIP = () => {
    toast({
      title: "SIP Modified",
      description: `Your SIP amount has been updated to ₹${modifiedAmount}`,
    });
    setIsModifySIPOpen(false);
  };
  
  const handleSkipSIP = () => {
    toast({
      title: "SIP Installment Skipped",
      description: `Your SIP installment for ${skipDate} has been skipped`,
    });
    setIsSkipSIPOpen(false);
  };
  
  const handlePauseSIP = () => {
    toast({
      title: "SIP Paused",
      description: `Your SIP has been paused for ${pauseDuration} months`,
    });
    setIsPauseSIPOpen(false);
  };
  
  const handleTerminateSIP = () => {
    toast({
      title: "SIP Terminated",
      description: "Your SIP has been terminated successfully",
    });
    navigate('/sip-dashboard');
  };
  
  if (!fund) {
    return (
      <PageContainer title="Manage SIP" showBackButton>
        <div className="text-center py-10">
          <p className="text-gray-600">SIP not found. Please try again.</p>
          <Button 
            onClick={() => navigate('/sip-dashboard')}
            className="mt-4 bg-fundeasy-green hover:bg-fundeasy-dark-green"
          >
            Back to SIP Dashboard
          </Button>
        </div>
      </PageContainer>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center p-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/sip-dashboard')}
            className="mr-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-medium line-clamp-1">Manage SIP</h1>
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        {/* SIP Summary Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h2 className="font-medium line-clamp-2">{fund.name}</h2>
                <p className="text-sm text-gray-500">{fund.category} • {fund.risk} Risk</p>
              </div>
              <Badge className={`${sipData.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {sipData.status === 'active' ? 'Active' : 'Paused'}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-sm text-gray-500">Monthly SIP Amount</p>
                <p className="font-semibold">₹{sipData.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Next SIP Date</p>
                <p className="font-semibold flex items-center">
                  <Calendar size={14} className="mr-1 text-fundeasy-green" />
                  {sipData.nextDate}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">SIP Start Date</p>
                <p className="font-semibold">{sipData.startDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Frequency</p>
                <p className="font-semibold">{sipData.frequency}</p>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Total Invested</p>
                <p className="font-semibold">₹{sipData.totalInvested.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Current Value</p>
                <p className="font-semibold">₹{sipData.currentValue.toLocaleString()}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Returns</p>
                <p className={`font-semibold flex items-center ${sipData.returns >= 0 ? 'text-fundeasy-green' : 'text-red-500'}`}>
                  <ArrowUpRight size={14} className={`mr-1 ${sipData.returns < 0 ? 'rotate-180' : ''}`} />
                  {sipData.returns}% 
                  <span className="text-xs text-gray-500 ml-1">
                    (₹{(sipData.currentValue - sipData.totalInvested).toLocaleString()})
                  </span>
                </p>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div>
              <p className="text-sm text-gray-500">Payment Method</p>
              <p className="font-semibold">{sipData.paymentMethod} • {sipData.bank} (A/C: {sipData.accountNumber})</p>
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <Button 
                onClick={() => navigate(`/fund/${sipData.fundId}`)}
                variant="outline" 
                className="w-full"
              >
                <PieChart size={16} className="mr-2" />
                View Fund Details
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* SIP Management Options */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-3">Manage Your SIP</h3>
            
            <div className="space-y-3">
              {/* Modify SIP */}
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Modify SIP</h4>
                    <p className="text-sm text-gray-500">Change SIP amount</p>
                  </div>
                  <DialogTrigger asChild onClick={() => setIsModifySIPOpen(true)}>
                    <Button size="sm">
                      <Edit size={16} className="mr-1" />
                      Modify
                    </Button>
                  </DialogTrigger>
                </div>
              </div>
              
              {/* Skip Next Installment */}
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Skip Next Installment</h4>
                    <p className="text-sm text-gray-500">Skip your upcoming SIP payment</p>
                  </div>
                  <DialogTrigger asChild onClick={() => setIsSkipSIPOpen(true)}>
                    <Button size="sm" variant="outline">
                      Skip
                    </Button>
                  </DialogTrigger>
                </div>
              </div>
              
              {/* Pause SIP */}
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Pause SIP</h4>
                    <p className="text-sm text-gray-500">Temporarily pause your SIP</p>
                  </div>
                  <DialogTrigger asChild onClick={() => setIsPauseSIPOpen(true)}>
                    <Button size="sm" variant="outline">
                      <Pause size={16} className="mr-1" />
                      Pause
                    </Button>
                  </DialogTrigger>
                </div>
              </div>
              
              {/* Terminate SIP */}
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-red-500">Terminate SIP</h4>
                    <p className="text-sm text-gray-500">Permanently stop your SIP</p>
                  </div>
                  <DialogTrigger asChild onClick={() => setIsTerminateSIPOpen(true)}>
                    <Button size="sm" variant="destructive">
                      <Trash2 size={16} className="mr-1" />
                      Terminate
                    </Button>
                  </DialogTrigger>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Transaction History Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">SIP Transaction History</h3>
              <Button 
                variant="link" 
                className="h-auto p-0 text-fundeasy-green"
                onClick={() => navigate('/transactions')}
              >
                View All
              </Button>
            </div>
            
            {/* Mock transaction history */}
            {[
              { date: "10 Jul 2023", status: "Processed", amount: 5000 },
              { date: "10 Jun 2023", status: "Processed", amount: 5000 },
              { date: "10 May 2023", status: "Processed", amount: 5000 }
            ].map((transaction, index) => (
              <div key={index} className={`py-3 ${index > 0 ? 'border-t' : ''}`}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{transaction.date}</p>
                    <p className="text-xs text-green-600">{transaction.status}</p>
                  </div>
                  <p className="font-medium">₹{transaction.amount.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        
        {/* Disclaimer */}
        <div className="flex items-center bg-amber-50 p-3 rounded-md">
          <AlertCircle size={16} className="text-amber-500 mr-2 flex-shrink-0" />
          <p className="text-xs text-gray-700">
            Mutual fund investments are subject to market risks. Read all scheme related documents carefully before investing.
          </p>
        </div>
      </div>
      
      {/* Modify SIP Dialog */}
      <Dialog open={isModifySIPOpen} onOpenChange={setIsModifySIPOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modify SIP</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="sip-amount" className="mb-2 block">New SIP Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
              <Input
                id="sip-amount"
                type="text"
                className="pl-8"
                value={modifiedAmount}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  setModifiedAmount(value);
                }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Minimum SIP amount is ₹500</p>
            
            <div className="flex items-center bg-blue-50 p-3 rounded-md mt-4">
              <AlertCircle size={16} className="text-blue-500 mr-2 flex-shrink-0" />
              <p className="text-xs text-gray-700">
                The new SIP amount will be effective from your next SIP date ({sipData.nextDate}).
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModifySIPOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleModifySIP}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Skip SIP Dialog */}
      <Dialog open={isSkipSIPOpen} onOpenChange={setIsSkipSIPOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Skip Next SIP Installment</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-600 mb-4">
              You are about to skip your next SIP installment of ₹{sipData.amount.toLocaleString()} scheduled for {skipDate}.
            </p>
            
            <div className="flex items-center bg-amber-50 p-3 rounded-md">
              <AlertCircle size={16} className="text-amber-500 mr-2 flex-shrink-0" />
              <p className="text-xs text-gray-700">
                Skipping SIP installments may impact your long-term financial goals. This action can't be undone.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSkipSIPOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSkipSIP}>
              Confirm Skip
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Pause SIP Dialog */}
      <Dialog open={isPauseSIPOpen} onOpenChange={setIsPauseSIPOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pause SIP</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="pause-duration" className="mb-2 block">Pause Duration</Label>
            <Select value={pauseDuration} onValueChange={setPauseDuration}>
              <SelectTrigger id="pause-duration">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Month</SelectItem>
                <SelectItem value="3">3 Months</SelectItem>
                <SelectItem value="6">6 Months</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex items-center bg-amber-50 p-3 rounded-md mt-4">
              <AlertCircle size={16} className="text-amber-500 mr-2 flex-shrink-0" />
              <p className="text-xs text-gray-700">
                Pausing your SIP may impact your long-term financial goals. You can resume your SIP anytime.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPauseSIPOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePauseSIP}>
              Pause SIP
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Terminate SIP Dialog */}
      <Dialog open={isTerminateSIPOpen} onOpenChange={setIsTerminateSIPOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-500">Terminate SIP</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-600 mb-4">
              You are about to permanently terminate your SIP of ₹{sipData.amount.toLocaleString()} in {fund.name}.
            </p>
            
            <div className="flex items-center bg-red-50 p-3 rounded-md">
              <AlertCircle size={16} className="text-red-500 mr-2 flex-shrink-0" />
              <p className="text-xs text-gray-700">
                <strong>Warning:</strong> Terminating your SIP will stop all future investments in this fund. This action cannot be undone. Your existing investment will remain invested until you redeem it.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTerminateSIPOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleTerminateSIP}>
              Terminate SIP
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageSIP;
