
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  ChevronRight, 
  ChevronLeft, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  CreditCard, 
  Building, 
  CheckCircle,
  Camera
} from 'lucide-react';

const Onboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [phoneEmail, setPhoneEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [fullName, setFullName] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [bankName, setBankName] = useState('');

  const [panUploaded, setPanUploaded] = useState(false);
  const [aadhaarUploaded, setAadhaarUploaded] = useState(false);
  const [selfieUploaded, setSelfieUploaded] = useState(false);

  // Total steps increased to match the expanded KYC flow
  const totalSteps = 5;

  const handleNext = () => {
    if (step === 1) {
      // Validate phone/email
      if (!phoneEmail) {
        toast({
          title: "Error",
          description: "Please enter your phone number or email",
          variant: "destructive",
        });
        return;
      }
      
      // Simulate OTP send
      toast({
        title: "OTP Sent",
        description: `A verification code has been sent to ${phoneEmail}`,
      });
      setStep(2);
    } else if (step === 2) {
      // Validate OTP
      if (!otp || otp.length !== 4) {
        toast({
          title: "Error",
          description: "Please enter a valid 4-digit OTP",
          variant: "destructive",
        });
        return;
      }
      
      // Proceed to personal details
      setStep(3);
    } else if (step === 3) {
      // Validate personal details
      if (!fullName || !dob) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }
      
      // Proceed to document verification
      setStep(4);
    } else if (step === 4) {
      // Validate KYC documents
      if (!panNumber || !aadhaarNumber) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }
      
      // Simulate document verification
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep(5);
      }, 1500);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    // Validate bank account details
    if (!accountNumber || !ifscCode || !bankName) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Simulate bank verification
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to dashboard after successful onboarding
      toast({
        title: "Welcome to FundEasy!",
        description: "Your account has been successfully created and verified.",
      });
      navigate('/dashboard');
    }, 1500);
  };

  const handleFileUpload = (type: 'pan' | 'aadhaar' | 'selfie') => {
    // Simulate file upload
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Document Uploaded",
        description: `Your ${type === 'pan' ? 'PAN card' : type === 'aadhaar' ? 'Aadhaar card' : 'selfie'} has been uploaded successfully.`,
      });
      
      if (type === 'pan') setPanUploaded(true);
      else if (type === 'aadhaar') setAadhaarUploaded(true);
      else setSelfieUploaded(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f0f4ff] to-white p-6">
      <div className="py-6">
        <Progress 
          value={(step / totalSteps) * 100} 
          className="h-2 bg-gray-200" 
          indicatorClassName="bg-[#9b87f5]" 
        />
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>Sign Up</span>
          <span>Verify</span>
          <span>Personal</span>
          <span>KYC</span>
          <span>Bank</span>
        </div>
      </div>
      
      <div className="flex-grow flex flex-col justify-between">
        <div className="animate-fade-in">
          {step === 1 && (
            <>
              <h1 className="text-2xl font-bold mb-6 text-[#221F26]">Get Started</h1>
              <p className="mb-6 text-gray-600">Enter your phone number or email to create your account.</p>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="phoneEmail" className="text-gray-700">Phone Number or Email</Label>
                  <div className="flex mt-1">
                    <div className="bg-[#D3E4FD] p-3 rounded-l-md flex items-center">
                      {phoneEmail.includes('@') ? <Mail size={20} className="text-[#9b87f5]" /> : <Phone size={20} className="text-[#9b87f5]" />}
                    </div>
                    <Input 
                      id="phoneEmail"
                      className="rounded-l-none focus-visible:ring-[#9b87f5]"
                      placeholder="Enter phone number or email" 
                      value={phoneEmail}
                      onChange={(e) => setPhoneEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="bg-[#D3E4FD]/30 rounded-lg p-4 mt-4">
                  <p className="text-sm text-gray-600">
                    By continuing, you agree to our <a href="#" className="text-[#9b87f5] font-medium">Terms of Service</a> and <a href="#" className="text-[#9b87f5] font-medium">Privacy Policy</a>
                  </p>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="text-2xl font-bold mb-6 text-[#221F26]">Verify Your Account</h1>
              <p className="mb-6 text-gray-600">We've sent a 4-digit code to {phoneEmail}</p>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="otp" className="text-gray-700">Enter OTP</Label>
                  <Input 
                    id="otp"
                    className="text-center text-2xl tracking-widest focus-visible:ring-[#9b87f5]"
                    placeholder="• • • •" 
                    maxLength={4}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <button 
                    className="text-[#9b87f5]"
                    onClick={() => {
                      toast({
                        title: "OTP Resent",
                        description: `A new verification code has been sent to ${phoneEmail}`,
                      });
                    }}
                  >
                    Resend OTP
                  </button>
                  <p className="text-gray-500">Valid for 10:00 minutes</p>
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h1 className="text-2xl font-bold mb-6 text-[#221F26]">Personal Details</h1>
              <p className="mb-6 text-gray-600">Please enter your personal information</p>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName" className="text-gray-700">Full Name (as per PAN)</Label>
                  <div className="flex mt-1">
                    <div className="bg-[#D3E4FD] p-3 rounded-l-md">
                      <User size={20} className="text-[#9b87f5]" />
                    </div>
                    <Input 
                      id="fullName"
                      className="rounded-l-none focus-visible:ring-[#9b87f5]"
                      placeholder="Enter your full name" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="dob" className="text-gray-700">Date of Birth</Label>
                  <Input 
                    id="dob"
                    className="focus-visible:ring-[#9b87f5]"
                    type="date" 
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>
                
                <div className="bg-[#D3E4FD]/30 rounded-lg p-4 mt-4">
                  <p className="text-sm text-gray-600">
                    Your details will be verified with your KYC documents in the next step.
                  </p>
                </div>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h1 className="text-2xl font-bold mb-6 text-[#221F26]">KYC Verification</h1>
              <p className="mb-6 text-gray-600">Please provide your identity documents for KYC verification</p>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="panNumber" className="text-gray-700">PAN Number</Label>
                  <div className="flex mt-1">
                    <div className="bg-[#D3E4FD] p-3 rounded-l-md">
                      <FileText size={20} className="text-[#9b87f5]" />
                    </div>
                    <Input 
                      id="panNumber"
                      className="rounded-l-none focus-visible:ring-[#9b87f5]"
                      placeholder="ABCDE1234F" 
                      value={panNumber}
                      onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                      maxLength={10}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="aadhaarNumber" className="text-gray-700">Aadhaar Number</Label>
                  <Input 
                    id="aadhaarNumber"
                    className="focus-visible:ring-[#9b87f5]"
                    placeholder="XXXX XXXX XXXX" 
                    value={aadhaarNumber}
                    onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, ''))}
                    maxLength={12}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center transition-all ${panUploaded ? 'bg-[#D3E4FD]/30 border-[#9b87f5]' : 'border-gray-300 hover:border-[#9b87f5]'}`}>
                    {panUploaded ? (
                      <>
                        <CheckCircle size={24} className="text-[#9b87f5] mb-2" />
                        <p className="text-sm font-medium text-center">PAN Card Uploaded</p>
                      </>
                    ) : (
                      <>
                        <Button 
                          type="button"
                          variant="ghost"
                          className="h-12 w-12 rounded-full bg-[#D3E4FD]"
                          onClick={() => handleFileUpload('pan')}
                        >
                          <Camera size={20} className="text-[#9b87f5]" />
                        </Button>
                        <p className="text-xs text-gray-500 mt-2 text-center">Upload PAN Card</p>
                      </>
                    )}
                  </div>
                  
                  <div className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center transition-all ${aadhaarUploaded ? 'bg-[#D3E4FD]/30 border-[#9b87f5]' : 'border-gray-300 hover:border-[#9b87f5]'}`}>
                    {aadhaarUploaded ? (
                      <>
                        <CheckCircle size={24} className="text-[#9b87f5] mb-2" />
                        <p className="text-sm font-medium text-center">Aadhaar Card Uploaded</p>
                      </>
                    ) : (
                      <>
                        <Button 
                          type="button"
                          variant="ghost"
                          className="h-12 w-12 rounded-full bg-[#D3E4FD]"
                          onClick={() => handleFileUpload('aadhaar')}
                        >
                          <Camera size={20} className="text-[#9b87f5]" />
                        </Button>
                        <p className="text-xs text-gray-500 mt-2 text-center">Upload Aadhaar Card</p>
                      </>
                    )}
                  </div>
                </div>
                
                <div className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center transition-all ${selfieUploaded ? 'bg-[#D3E4FD]/30 border-[#9b87f5]' : 'border-gray-300 hover:border-[#9b87f5]'}`}>
                  {selfieUploaded ? (
                    <>
                      <CheckCircle size={24} className="text-[#9b87f5] mb-2" />
                      <p className="text-sm font-medium text-center">Selfie Uploaded</p>
                    </>
                  ) : (
                    <>
                      <Button 
                        type="button"
                        variant="ghost"
                        className="h-12 w-12 rounded-full bg-[#D3E4FD]"
                        onClick={() => handleFileUpload('selfie')}
                      >
                        <Camera size={20} className="text-[#9b87f5]" />
                      </Button>
                      <p className="text-xs text-gray-500 mt-2 text-center">Take a Selfie</p>
                    </>
                  )}
                </div>
              </div>
            </>
          )}

          {step === 5 && (
            <>
              <h1 className="text-2xl font-bold mb-6 text-[#221F26]">Bank Account Details</h1>
              <p className="mb-6 text-gray-600">Link your bank account for seamless transactions</p>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="accountNumber" className="text-gray-700">Account Number</Label>
                  <div className="flex mt-1">
                    <div className="bg-[#D3E4FD] p-3 rounded-l-md">
                      <CreditCard size={20} className="text-[#9b87f5]" />
                    </div>
                    <Input 
                      id="accountNumber"
                      className="rounded-l-none focus-visible:ring-[#9b87f5]"
                      placeholder="Enter your account number" 
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="ifscCode" className="text-gray-700">IFSC Code</Label>
                  <div className="flex mt-1">
                    <div className="bg-[#D3E4FD] p-3 rounded-l-md">
                      <Building size={20} className="text-[#9b87f5]" />
                    </div>
                    <Input 
                      id="ifscCode"
                      className="rounded-l-none focus-visible:ring-[#9b87f5]"
                      placeholder="Enter bank IFSC code" 
                      value={ifscCode}
                      onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="bankName" className="text-gray-700">Bank Name</Label>
                  <Input 
                    id="bankName"
                    className="focus-visible:ring-[#9b87f5]"
                    placeholder="Enter your bank name" 
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                  />
                </div>
                
                <div className="bg-[#D3E4FD]/30 rounded-lg p-4 mt-4">
                  <p className="text-sm text-gray-600">
                    Your bank account will be used for all transactions with FundEasy. Ensure that the account is in your name and matches your KYC details.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-between mt-8">
          {step > 1 && (
            <Button 
              variant="outline" 
              onClick={handleBack}
              disabled={isLoading}
              className="border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10"
            >
              <ChevronLeft className="mr-1" size={18} />
              Back
            </Button>
          )}
          
          {step < totalSteps ? (
            <Button 
              onClick={handleNext}
              disabled={isLoading}
              className={`${step === 1 && 'w-full'} bg-[#9b87f5] hover:bg-[#8a76e4]`}
            >
              {isLoading ? 'Processing...' : 'Continue'}
              {!isLoading && <ChevronRight className="ml-1" size={18} />}
            </Button>
          ) : (
            <Button 
              onClick={handleComplete}
              disabled={isLoading}
              className="bg-[#9b87f5] hover:bg-[#8a76e4]"
            >
              {isLoading ? 'Processing...' : 'Complete Setup'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
