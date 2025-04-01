
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import {
  FileText,
  User,
  ShieldCheck,
  Banknote,
  Link,
  Calendar,
  Camera,
  ArrowRight,
  ArrowLeft,
  Check,
  AlertTriangle,
  Info
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

const KYCVerification = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [totalSteps] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [showInfoDialog, setShowInfoDialog] = useState(false);

  // Form state
  const [panCard, setPanCard] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [aadhaarOtp, setAadhaarOtp] = useState('');
  const [fullName, setFullName] = useState('John Doe'); // Pre-filled from account
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [addressProof, setAddressProof] = useState('aadhaar');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [bankName, setBankName] = useState('');
  const [taxResidency, setTaxResidency] = useState('india');
  const [isPEP, setIsPEP] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Handle OTP verification for Aadhaar
  const verifyAadhaarOtp = () => {
    if (aadhaarOtp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive",
      });
      return false;
    }
    
    // Simulate OTP verification
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "OTP Verified",
        description: "Your Aadhaar has been verified successfully",
      });
      // Auto-fill data from Aadhaar
      setFullName("John Doe");
      setDateOfBirth("1990-01-01");
      setGender("male");
      setAddress("123 Main Street, Bangalore, Karnataka, 560001");
      return true;
    }, 1500);
    
    return true;
  };

  // PAN verification helper
  const verifyPan = () => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(panCard)) {
      toast({
        title: "Invalid PAN",
        description: "Please enter a valid PAN card number",
        variant: "destructive",
      });
      return false;
    }
    
    // Simulate PAN verification
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "PAN Verified",
        description: "Your PAN card has been verified successfully",
      });
      return true;
    }, 1500);
    
    return true;
  };

  // Bank account verification
  const verifyBankAccount = () => {
    if (!bankAccountNumber || !ifscCode) {
      toast({
        title: "Missing Information",
        description: "Please enter both bank account number and IFSC code",
        variant: "destructive",
      });
      return false;
    }
    
    // Simulate IFSC verification
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setBankName("State Bank of India - Koramangala Branch");
      toast({
        title: "Bank Account Verified",
        description: "Bank details have been verified via penny drop",
      });
      return true;
    }, 1500);
    
    return true;
  };

  // Handle next step
  const handleNext = () => {
    let canProceed = true;
    
    // Validation based on current step
    if (step === 1) {
      // PAN verification step
      canProceed = verifyPan();
    } else if (step === 2) {
      // Aadhaar OTP verification step
      canProceed = verifyAadhaarOtp();
    } else if (step === 4) {
      // Bank Account verification step
      canProceed = verifyBankAccount();
    } else if (step === 5) {
      // FATCA declaration
      if (!termsAccepted) {
        toast({
          title: "Terms Required",
          description: "Please accept the FATCA declaration",
          variant: "destructive",
        });
        canProceed = false;
      }
    } 
    
    if (canProceed) {
      if (step < totalSteps) {
        setStep(step + 1);
      } else {
        // KYC completed
        toast({
          title: "KYC Completed!",
          description: "Your KYC verification has been submitted successfully.",
        });
        // Navigate back to profile page
        navigate('/profile');
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  };
  
  // Helper function to mask Aadhaar number
  const maskAadhaar = (aadhaarNumber) => {
    if (aadhaarNumber.length !== 12) return aadhaarNumber;
    return `XXXX-XXXX-${aadhaarNumber.slice(8)}`;
  };

  return (
    <PageContainer 
      title="KYC Verification" 
      showBackButton
    >
      <div className="pb-20">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round((step / totalSteps) * 100)}% Completed</span>
          </div>
          <Progress value={(step / totalSteps) * 100} className="h-2" />
        </div>
        
        {/* Step Indicator */}
        <div className="mb-6">
          <div className="bg-white rounded-xl p-4 shadow flex items-center">
            {step === 1 && (
              <>
                <div className="h-10 w-10 rounded-full bg-fundeasy-accent-bg text-fundeasy-blue flex items-center justify-center mr-3">
                  <FileText size={20} />
                </div>
                <div>
                  <h2 className="font-semibold">PAN Verification</h2>
                  <p className="text-sm text-gray-500">Verify your PAN details</p>
                </div>
              </>
            )}
            
            {step === 2 && (
              <>
                <div className="h-10 w-10 rounded-full bg-fundeasy-accent-bg text-fundeasy-blue flex items-center justify-center mr-3">
                  <User size={20} />
                </div>
                <div>
                  <h2 className="font-semibold">Aadhaar Verification</h2>
                  <p className="text-sm text-gray-500">Verify via OTP on registered mobile</p>
                </div>
              </>
            )}
            
            {step === 3 && (
              <>
                <div className="h-10 w-10 rounded-full bg-fundeasy-accent-bg text-fundeasy-blue flex items-center justify-center mr-3">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h2 className="font-semibold">Address Verification</h2>
                  <p className="text-sm text-gray-500">Confirm your residential address</p>
                </div>
              </>
            )}
            
            {step === 4 && (
              <>
                <div className="h-10 w-10 rounded-full bg-fundeasy-accent-bg text-fundeasy-blue flex items-center justify-center mr-3">
                  <Banknote size={20} />
                </div>
                <div>
                  <h2 className="font-semibold">Bank Account</h2>
                  <p className="text-sm text-gray-500">Link your bank account</p>
                </div>
              </>
            )}
            
            {step === 5 && (
              <>
                <div className="h-10 w-10 rounded-full bg-fundeasy-accent-bg text-fundeasy-blue flex items-center justify-center mr-3">
                  <FileText size={20} />
                </div>
                <div>
                  <h2 className="font-semibold">FATCA Declaration</h2>
                  <p className="text-sm text-gray-500">Tax residency information</p>
                </div>
              </>
            )}
            
            {step === 6 && (
              <>
                <div className="h-10 w-10 rounded-full bg-fundeasy-accent-bg text-fundeasy-blue flex items-center justify-center mr-3">
                  <Camera size={20} />
                </div>
                <div>
                  <h2 className="font-semibold">Video KYC</h2>
                  <p className="text-sm text-gray-500">Complete verification via video call</p>
                </div>
              </>
            )}
            
            {step === 7 && (
              <>
                <div className="h-10 w-10 rounded-full bg-fundeasy-accent-bg text-fundeasy-blue flex items-center justify-center mr-3">
                  <Link size={20} />
                </div>
                <div>
                  <h2 className="font-semibold">Digital Signature</h2>
                  <p className="text-sm text-gray-500">Sign documents electronically</p>
                </div>
              </>
            )}
            
            {step === 8 && (
              <>
                <div className="h-10 w-10 rounded-full bg-fundeasy-accent-bg text-fundeasy-blue flex items-center justify-center mr-3">
                  <Check size={20} />
                </div>
                <div>
                  <h2 className="font-semibold">KYC Status</h2>
                  <p className="text-sm text-gray-500">Verification status</p>
                </div>
              </>
            )}
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="ml-auto"
              onClick={() => setShowInfoDialog(true)}
            >
              <Info size={18} />
            </Button>
          </div>
        </div>
        
        {/* Step Content */}
        <div className="bg-white rounded-xl p-5 shadow mb-6">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="pan_card">PAN Card Number</Label>
                <div className="mt-1">
                  <Input
                    id="pan_card"
                    type="text"
                    placeholder="Enter PAN (e.g., ABCDE1234F)"
                    value={panCard}
                    onChange={(e) => setPanCard(e.target.value.toUpperCase())}
                    className="uppercase"
                    maxLength={10}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">Your PAN will be used for tax reporting and KYC verification.</p>
              </div>
              
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start">
                <AlertTriangle className="text-amber-500 mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                <p className="text-xs text-amber-800">
                  Please ensure that your PAN card number is entered correctly. Incorrect PAN details may lead to rejection of your KYC application.
                </p>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="aadhaar">Aadhaar Number</Label>
                <div className="mt-1">
                  <Input
                    id="aadhaar"
                    type="text"
                    placeholder="Enter 12-digit Aadhaar number"
                    value={aadhaar}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 12) setAadhaar(value);
                    }}
                    inputMode="numeric"
                    maxLength={12}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Your Aadhaar number will be displayed as {aadhaar.length === 12 ? maskAadhaar(aadhaar) : 'XXXX-XXXX-XXXX'} for security.
                </p>
              </div>
              
              {aadhaar.length === 12 && (
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-sm text-blue-800">
                      OTP has been sent to your Aadhaar-linked mobile number
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="aadhaar_otp">Enter OTP</Label>
                    <div className="mt-2 flex justify-center">
                      <InputOTP
                        maxLength={6}
                        value={aadhaarOtp}
                        onChange={setAadhaarOtp}
                        render={({ slots }) => (
                          <InputOTPGroup>
                            {slots.map((slot, index) => (
                              <InputOTPSlot key={index} {...slot} />
                            ))}
                          </InputOTPGroup>
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="fullName">Full Name (as per Aadhaar)</Label>
                <div className="mt-1">
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <div className="mt-1">
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      readOnly
                      className="bg-gray-50"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <div className="mt-1">
                    <select
                      id="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-fundeasy-blue"
                      readOnly
                      disabled
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="address">Residential Address</Label>
                <div className="mt-1">
                  <Textarea
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={3}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">Address from Aadhaar will be used for communication.</p>
              </div>
              
              <div>
                <Label>Address Proof Document</Label>
                <div className="mt-3 space-y-3">
                  <div className="flex items-center">
                    <input
                      id="address_aadhaar"
                      name="address_proof"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-fundeasy-blue focus:ring-fundeasy-blue"
                      checked={addressProof === 'aadhaar'}
                      onChange={() => setAddressProof('aadhaar')}
                    />
                    <label htmlFor="address_aadhaar" className="ml-3 text-sm text-gray-700">
                      Use Aadhaar Address (Recommended)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="address_other"
                      name="address_proof"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-fundeasy-blue focus:ring-fundeasy-blue"
                      checked={addressProof === 'other'}
                      onChange={() => setAddressProof('other')}
                    />
                    <label htmlFor="address_other" className="ml-3 text-sm text-gray-700">
                      Upload Different Address Proof
                    </label>
                  </div>
                </div>
              </div>
              
              {addressProof === 'other' && (
                <div className="p-4 border border-dashed border-gray-300 rounded-md">
                  <div className="flex flex-col items-center">
                    <FileText className="h-8 w-8 text-gray-400" />
                    <div className="mt-2 text-center">
                      <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-fundeasy-blue hover:text-fundeasy-dark-blue">
                        <span>Upload a document</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="text-xs text-gray-500">
                        Passport, Voter ID, Utility Bill or Bank Statement (Last 3 Months)
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="bankAccountNumber">Bank Account Number</Label>
                <div className="mt-1">
                  <Input
                    id="bankAccountNumber"
                    placeholder="Enter your bank account number"
                    value={bankAccountNumber}
                    onChange={(e) => setBankAccountNumber(e.target.value.replace(/\D/g, ''))}
                    inputMode="numeric"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="ifscCode">IFSC Code</Label>
                <div className="mt-1">
                  <Input
                    id="ifscCode"
                    placeholder="e.g., SBIN0001234"
                    value={ifscCode}
                    onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                    className="uppercase"
                    maxLength={11}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">11-character code that identifies your bank branch.</p>
              </div>
              
              {bankName && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-sm text-green-800">
                    <span className="font-medium">Bank Verified:</span> {bankName}
                  </p>
                </div>
              )}
              
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-md flex items-start">
                <Info className="text-blue-500 mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                <p className="text-xs text-blue-800">
                  We'll verify your bank account with a small deposit (₹1) which will be refunded immediately. This ensures your account is active and valid for transactions.
                </p>
              </div>
              
              <div className="p-4 border border-dashed border-gray-300 rounded-md">
                <div className="flex flex-col items-center">
                  <FileText className="h-8 w-8 text-gray-400" />
                  <div className="mt-2 text-center">
                    <label htmlFor="bank-doc-upload" className="relative cursor-pointer rounded-md font-medium text-fundeasy-blue hover:text-fundeasy-dark-blue">
                      <span>Upload a cancelled cheque or bank statement</span>
                      <input id="bank-doc-upload" name="bank-doc-upload" type="file" className="sr-only" />
                    </label>
                    <p className="text-xs text-gray-500">
                      This will help verify your bank account ownership
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <Label>Tax Residency Status</Label>
                <div className="mt-3 space-y-3">
                  <div className="flex items-center">
                    <input
                      id="tax_india"
                      name="tax_residency"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-fundeasy-blue focus:ring-fundeasy-blue"
                      checked={taxResidency === 'india'}
                      onChange={() => setTaxResidency('india')}
                    />
                    <label htmlFor="tax_india" className="ml-3 text-sm text-gray-700">
                      I am a tax resident of India only
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="tax_other"
                      name="tax_residency"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-fundeasy-blue focus:ring-fundeasy-blue"
                      checked={taxResidency === 'other'}
                      onChange={() => setTaxResidency('other')}
                    />
                    <label htmlFor="tax_other" className="ml-3 text-sm text-gray-700">
                      I am a tax resident of country other than India
                    </label>
                  </div>
                </div>
              </div>
              
              {taxResidency === 'other' && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
                  <p className="text-sm text-amber-800">
                    Additional documentation may be required for non-Indian tax residents. Our team will contact you for the necessary documents.
                  </p>
                </div>
              )}
              
              <div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <Checkbox 
                      id="pep" 
                      checked={isPEP}
                      onCheckedChange={(checked) => setIsPEP(!!checked)}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="pep" className="font-medium text-gray-700">Politically Exposed Person</label>
                    <p className="text-xs text-gray-500">
                      I am a politically exposed person or related to someone who is.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <Checkbox 
                      id="fatca_declaration" 
                      checked={termsAccepted}
                      onCheckedChange={(checked) => setTermsAccepted(!!checked)}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="fatca_declaration" className="font-medium text-gray-700">FATCA Declaration</label>
                    <p className="text-xs text-gray-500">
                      I hereby declare that the information provided is true and correct. I also understand that any willful dishonesty may render for refusal of this application.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {step === 6 && (
            <div className="space-y-6">
              <div className="text-center">
                <Camera className="h-12 w-12 mx-auto text-fundeasy-blue" />
                <h3 className="mt-2 text-lg font-medium">Complete Video KYC</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Video KYC is required for full KYC approval and removing investment limits.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md space-y-3">
                <h4 className="font-medium">Requirements:</h4>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Have your PAN card ready</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Ensure good lighting and clear visibility</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Find a quiet place for the call</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Video call duration: Approx. 2-3 minutes</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col space-y-3">
                <Button
                  onClick={() => {
                    toast({
                      title: "Video KYC Scheduled",
                      description: "Your video KYC has been scheduled for tomorrow between 10 AM - 6 PM.",
                    });
                    setStep(7);
                  }}
                  className="bg-fundeasy-green hover:bg-fundeasy-dark-green"
                >
                  Schedule Video KYC
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setStep(7)}
                >
                  Skip for now (₹50,000 investment limit)
                </Button>
              </div>
            </div>
          )}
          
          {step === 7 && (
            <div className="space-y-6">
              <div className="text-center">
                <Link className="h-12 w-12 mx-auto text-fundeasy-blue" />
                <h3 className="mt-2 text-lg font-medium">Digital Signature</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Sign your KYC documents electronically using Aadhaar e-Sign
                </p>
              </div>
              
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-800">
                  An OTP will be sent to your Aadhaar-linked mobile number for digital signature.
                </p>
              </div>
              
              <div className="flex flex-col space-y-3">
                <Button
                  onClick={() => {
                    toast({
                      title: "Documents Signed",
                      description: "Your KYC documents have been successfully signed.",
                    });
                    setStep(8);
                  }}
                  className="bg-fundeasy-blue hover:bg-fundeasy-dark-blue"
                >
                  Proceed with e-Sign
                </Button>
              </div>
            </div>
          )}
          
          {step === 8 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Check className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="mt-4 text-lg font-medium">KYC Submission Successful</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Your KYC details have been submitted for verification
                </p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:px-6 bg-gray-50">
                  <h3 className="text-sm font-medium text-gray-900">KYC Status</h3>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-amber-100 rounded-full flex items-center justify-center">
                        <Clock className="h-4 w-4 text-amber-600" />
                      </div>
                      <span className="ml-3 font-medium">KYC Status</span>
                    </div>
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                      Pending
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="ml-3 font-medium">Expected Completion</span>
                    </div>
                    <span className="text-sm">
                      Within 24 hours
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Banknote className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="ml-3 font-medium">Current Investment Limit</span>
                    </div>
                    <span className="text-sm">
                      ₹50,000 per AMC
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-md flex items-start">
                <Info className="text-blue-500 mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                <p className="text-xs text-blue-800">
                  You can start investing up to ₹50,000 per AMC while your full KYC verification is pending. Complete Video KYC to remove this limit.
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Bottom Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={isLoading}
          >
            <ArrowLeft className="mr-1" size={16} />
            {step === 1 ? 'Back' : 'Previous'}
          </Button>
          
          {step < totalSteps ? (
            <Button
              onClick={handleNext}
              disabled={isLoading}
              className="bg-fundeasy-blue hover:bg-fundeasy-dark-blue"
            >
              {isLoading ? 'Processing...' : 'Next'}
              {!isLoading && <ArrowRight className="ml-1" size={16} />}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="bg-fundeasy-green hover:bg-fundeasy-dark-green"
            >
              Complete KYC
            </Button>
          )}
        </div>
      </div>
      
      {/* Info Dialog */}
      <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>About KYC Verification</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <p>
              KYC (Know Your Customer) is a mandatory process required by SEBI for all mutual fund investments in India.
            </p>
            <h4 className="font-medium">Why is KYC required?</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>To prevent identity theft and fraud</li>
              <li>To comply with anti-money laundering regulations</li>
              <li>To ensure proper tax compliance</li>
            </ul>
            <h4 className="font-medium">Investment Limits:</h4>
            <p>
              Basic e-KYC: Up to ₹50,000 per AMC per year<br />
              Full KYC with Video Verification: No investment limits
            </p>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-xs text-blue-800">
                Your information is secure and will only be used for KYC verification purposes as per SEBI guidelines.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
};

export default KYCVerification;
