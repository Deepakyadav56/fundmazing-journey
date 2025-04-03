
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, CreditCard, Trash2, AlertCircle, CheckCircle } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

// Mock bank accounts
const initialBanks = [
  {
    id: '1',
    bankName: 'HDFC Bank',
    accountNumber: 'XXXX XXXX 1234',
    ifsc: 'HDFC0001234',
    isPrimary: true,
    verified: true,
  },
  {
    id: '2',
    bankName: 'ICICI Bank',
    accountNumber: 'XXXX XXXX 5678',
    ifsc: 'ICIC0005678',
    isPrimary: false,
    verified: true,
  },
];

const BankAccounts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bankAccounts, setBankAccounts] = useState(initialBanks);
  const [isAddingBank, setIsAddingBank] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<string | null>(null);
  
  // New bank account form state
  const [newBank, setNewBank] = useState({
    bankName: '',
    accountNumber: '',
    ifsc: '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBank({
      ...newBank,
      [name]: value,
    });
  };
  
  const addBankAccount = () => {
    // Validation
    if (!newBank.bankName || !newBank.accountNumber || !newBank.ifsc) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would be an API call
    // For now, we'll just add it to the state
    const newAccount = {
      id: Date.now().toString(),
      bankName: newBank.bankName,
      accountNumber: newBank.accountNumber,
      ifsc: newBank.ifsc,
      isPrimary: bankAccounts.length === 0,
      verified: false,
    };
    
    setBankAccounts([...bankAccounts, newAccount]);
    setNewBank({ bankName: '', accountNumber: '', ifsc: '' });
    setIsAddingBank(false);
    
    toast({
      title: "Bank Account Added",
      description: "Your bank account has been added successfully and is pending verification",
    });
  };
  
  const confirmDeleteAccount = (accountId: string) => {
    setAccountToDelete(accountId);
    setDeleteConfirmOpen(true);
  };
  
  const deleteAccount = () => {
    if (accountToDelete) {
      const account = bankAccounts.find(acc => acc.id === accountToDelete);
      if (account?.isPrimary) {
        toast({
          title: "Cannot Delete Primary Account",
          description: "Please set another account as primary first",
          variant: "destructive",
        });
      } else {
        setBankAccounts(bankAccounts.filter(acc => acc.id !== accountToDelete));
        toast({
          title: "Bank Account Removed",
          description: "Your bank account has been removed successfully",
        });
      }
    }
    setDeleteConfirmOpen(false);
    setAccountToDelete(null);
  };
  
  const setAsPrimary = (accountId: string) => {
    setBankAccounts(
      bankAccounts.map(acc => ({
        ...acc,
        isPrimary: acc.id === accountId,
      }))
    );
    toast({
      title: "Primary Account Updated",
      description: "Your primary bank account has been updated",
    });
  };
  
  return (
    <PageContainer title="Bank Accounts" showBackButton>
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Manage your bank accounts for mutual fund investments and redemptions
        </p>
      </div>
      
      {bankAccounts.length === 0 ? (
        <Card className="text-center py-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <CreditCard size={24} className="text-gray-400" />
            </div>
          </div>
          <h2 className="text-lg font-medium mb-2">No Bank Accounts Added</h2>
          <p className="text-gray-500 mb-4">Add a bank account to start investing</p>
          <div className="px-4">
            <Button onClick={() => setIsAddingBank(true)}>Add Bank Account</Button>
          </div>
        </Card>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {bankAccounts.map((account) => (
              <Card key={account.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium">
                          {account.bankName}
                        </h3>
                        {account.isPrimary && (
                          <span className="ml-2 bg-fundeasy-light-green text-fundeasy-green text-xs px-2 py-0.5 rounded-full">
                            Primary
                          </span>
                        )}
                        {account.verified ? (
                          <span className="ml-2 text-fundeasy-green text-xs flex items-center">
                            <CheckCircle size={12} className="mr-0.5" /> Verified
                          </span>
                        ) : (
                          <span className="ml-2 text-yellow-500 text-xs flex items-center">
                            <AlertCircle size={12} className="mr-0.5" /> Pending
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {account.accountNumber}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        IFSC: {account.ifsc}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 p-1 h-auto"
                      onClick={() => confirmDeleteAccount(account.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </CardContent>
                {!account.isPrimary && (
                  <CardFooter className="px-4 py-2 bg-gray-50 flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setAsPrimary(account.id)}
                      className="text-xs h-8"
                    >
                      Set as Primary
                    </Button>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
          
          <Button 
            className="w-full mb-8"
            onClick={() => setIsAddingBank(true)}
          >
            <Plus size={16} className="mr-1" /> Add Another Bank Account
          </Button>
        </>
      )}
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-start">
            <AlertCircle className="text-fundeasy-blue mt-0.5 mr-2 h-5 w-5 flex-shrink-0" />
            <div className="text-sm text-gray-600">
              <p className="mb-2">Your bank account details are used for:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Investing in mutual funds</li>
                <li>Redeeming your investments</li>
                <li>Receiving dividends</li>
              </ul>
              <p className="mt-2">Only Indian bank accounts with your name are accepted as per SEBI guidelines.</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Add Bank Sheet */}
      <Sheet open={isAddingBank} onOpenChange={setIsAddingBank}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add Bank Account</SheetTitle>
            <SheetDescription>
              Add your bank account details for investments and redemptions
            </SheetDescription>
          </SheetHeader>
          
          <div className="space-y-4 py-6">
            <div className="space-y-2">
              <Label htmlFor="bankName">Bank Name</Label>
              <Input 
                id="bankName" 
                name="bankName" 
                value={newBank.bankName}
                onChange={handleInputChange}
                placeholder="Enter bank name" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input 
                id="accountNumber" 
                name="accountNumber" 
                value={newBank.accountNumber}
                onChange={handleInputChange}
                placeholder="Enter account number" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ifsc">IFSC Code</Label>
              <Input 
                id="ifsc" 
                name="ifsc" 
                value={newBank.ifsc}
                onChange={handleInputChange}
                placeholder="Enter IFSC code" 
              />
            </div>
            
            <div className="bg-yellow-50 p-3 rounded-lg mt-4">
              <p className="text-sm text-yellow-700 flex items-start">
                <AlertCircle size={16} className="mr-1.5 mt-0.5 flex-shrink-0" />
                Please ensure the account is in your name. We'll verify this account with a small test transaction.
              </p>
            </div>
          </div>
          
          <SheetFooter>
            <Button variant="outline" onClick={() => setIsAddingBank(false)}>
              Cancel
            </Button>
            <Button onClick={addBankAccount}>
              Add Account
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Bank Account</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this bank account? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={deleteAccount}
            >
              Remove Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
};

export default BankAccounts;
