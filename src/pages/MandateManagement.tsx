
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Trash2, AlertCircle, Info, ChevronRight } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

// Mock mandate data
const initialMandates = [
  {
    id: '1',
    bankName: 'HDFC Bank',
    accountNumber: 'XXXX XXXX 1234',
    mandateType: 'NACH',
    amount: 50000,
    status: 'active',
    nextDebit: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
  },
  {
    id: '2',
    bankName: 'ICICI Bank',
    accountNumber: 'XXXX XXXX 5678',
    mandateType: 'E-Mandate',
    amount: 25000,
    status: 'pending',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    id: '3',
    bankName: 'SBI',
    accountNumber: 'XXXX XXXX 9012',
    mandateType: 'UPI',
    amount: 10000,
    status: 'failed',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    failReason: 'Bank authorization failed',
  },
];

const MandateManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mandates, setMandates] = useState(initialMandates);
  const [selectedMandate, setSelectedMandate] = useState<any>(null);
  const [isRevokeDialogOpen, setIsRevokeDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  
  const getMandateStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-fundeasy-green">Active</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-400">Pending</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      case 'revoked':
        return <Badge variant="outline" className="text-gray-500">Revoked</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };
  
  const revokeMandate = () => {
    if (selectedMandate) {
      setMandates(mandates.map(mandate => 
        mandate.id === selectedMandate.id ? { ...mandate, status: 'revoked' } : mandate
      ));
      toast({
        title: "Mandate Revoked",
        description: `The mandate for ${selectedMandate.bankName} has been revoked.`,
      });
    }
    setIsRevokeDialogOpen(false);
  };
  
  const confirmRevokeMandate = (mandate: any) => {
    setSelectedMandate(mandate);
    setIsRevokeDialogOpen(true);
  };
  
  const viewMandateDetails = (mandate: any) => {
    setSelectedMandate(mandate);
    setIsDetailsDialogOpen(true);
  };
  
  return (
    <PageContainer title="Mandates" showBackButton>
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Manage your active mandates for SIP investments
        </p>
      </div>
      
      {mandates.length === 0 ? (
        <Card className="text-center py-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <Calendar size={24} className="text-gray-400" />
            </div>
          </div>
          <h2 className="text-lg font-medium mb-2">No Active Mandates</h2>
          <p className="text-gray-500 mb-4">Start an SIP to create a mandate</p>
          <div className="px-4">
            <Button onClick={() => navigate('/explore')}>Explore Funds</Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {mandates.map((mandate) => (
            <Card key={mandate.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium">
                        {mandate.bankName}
                      </h3>
                      <span className="ml-2">
                        {getMandateStatusBadge(mandate.status)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {mandate.accountNumber}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{mandate.amount.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{mandate.mandateType}</p>
                  </div>
                </div>
                
                {mandate.status === 'active' && (
                  <div className="flex items-center mt-3 text-xs text-gray-500">
                    <Clock size={14} className="mr-1" />
                    <span>Next debit: {mandate.nextDebit.toLocaleDateString()}</span>
                  </div>
                )}
                
                {mandate.status === 'failed' && (
                  <div className="flex items-center mt-3 text-xs text-red-500">
                    <AlertCircle size={14} className="mr-1" />
                    <span>{mandate.failReason}</span>
                  </div>
                )}
              </CardContent>
              <CardFooter className="bg-gray-50 px-4 py-2 flex justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-8"
                  onClick={() => viewMandateDetails(mandate)}
                >
                  View Details
                </Button>
                
                {mandate.status === 'active' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 text-xs h-8"
                    onClick={() => confirmRevokeMandate(mandate)}
                  >
                    Revoke Mandate
                  </Button>
                )}
                
                {mandate.status === 'pending' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 text-xs h-8"
                  >
                    Check Status
                  </Button>
                )}
                
                {mandate.status === 'failed' && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-fundeasy-blue text-xs h-8"
                    onClick={() => navigate('/start-sip')}
                  >
                    Try Again
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      <Card className="mt-6">
        <CardContent className="p-4">
          <div className="flex items-start">
            <Info className="text-fundeasy-blue mt-0.5 mr-2 h-5 w-5 flex-shrink-0" />
            <div className="text-sm text-gray-600">
              <p className="mb-2">About Mandates:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>A mandate authorizes automatic debits from your bank account for SIP investments</li>
                <li>You can revoke mandates anytime before the next debit date</li>
                <li>Revoking a mandate will stop future SIP installments</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Revoke Mandate Dialog */}
      <Dialog open={isRevokeDialogOpen} onOpenChange={setIsRevokeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Revoke Mandate</DialogTitle>
            <DialogDescription>
              Are you sure you want to revoke this mandate? All future SIP installments will be cancelled.
            </DialogDescription>
          </DialogHeader>
          <div className="py-3">
            {selectedMandate && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{selectedMandate.bankName}</p>
                    <p className="text-xs text-gray-500">{selectedMandate.accountNumber}</p>
                  </div>
                  <p className="font-medium">₹{selectedMandate.amount.toLocaleString()}</p>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRevokeDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={revokeMandate}
            >
              Revoke Mandate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* View Mandate Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mandate Details</DialogTitle>
            <DialogDescription>
              Details of your mandate and linked SIPs
            </DialogDescription>
          </DialogHeader>
          {selectedMandate && (
            <div className="space-y-4 py-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-500">Mandate Type</div>
                <div className="font-medium">{selectedMandate.mandateType}</div>
                
                <div className="text-gray-500">Bank</div>
                <div className="font-medium">{selectedMandate.bankName}</div>
                
                <div className="text-gray-500">Account Number</div>
                <div className="font-medium">{selectedMandate.accountNumber}</div>
                
                <div className="text-gray-500">Maximum Amount</div>
                <div className="font-medium">₹{selectedMandate.amount.toLocaleString()}</div>
                
                <div className="text-gray-500">Status</div>
                <div>{getMandateStatusBadge(selectedMandate.status)}</div>
                
                <div className="text-gray-500">Created On</div>
                <div className="font-medium">{selectedMandate.createdAt.toLocaleDateString()}</div>
                
                {selectedMandate.status === 'active' && (
                  <>
                    <div className="text-gray-500">Next Debit Date</div>
                    <div className="font-medium">{selectedMandate.nextDebit.toLocaleDateString()}</div>
                  </>
                )}
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Linked SIPs</h4>
                <Card>
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">HDFC Midcap Opportunities Fund</p>
                        <p className="text-xs text-gray-500">₹5,000 monthly</p>
                      </div>
                      <ChevronRight size={18} className="text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsDetailsDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
};

export default MandateManagement;
