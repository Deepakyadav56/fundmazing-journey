
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { ChevronRight, ChevronLeft } from 'lucide-react';

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
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');

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
      
      // Proceed to KYC
      setStep(3);
    } else if (step === 3) {
      // Validate KYC details
      if (!fullName || !panNumber || !accountNumber || !ifscCode) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }
      
      // Simulate KYC verification
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep(4);
      }, 1500);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    // Navigate to dashboard
    toast({
      title: "Welcome to FundEasy!",
      description: "Your account has been successfully created.",
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col p-6">
      <div className="py-6">
        <Progress value={step * 25} className="h-2 bg-gray-200" />
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>Sign Up</span>
          <span>Verify</span>
          <span>KYC</span>
          <span>Complete</span>
        </div>
      </div>
      
      <div className="flex-grow flex flex-col justify-between">
        <div className="animate-fade-in">
          {step === 1 && (
            <>
              <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
              <p className="mb-6 text-gray-600">Enter your phone number or email to get started.</p>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="phoneEmail">Phone Number or Email</Label>
                  <Input 
                    id="phoneEmail"
                    placeholder="Enter phone number or email" 
                    value={phoneEmail}
                    onChange={(e) => setPhoneEmail(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="text-2xl font-bold mb-6">Verify</h1>
              <p className="mb-6 text-gray-600">We've sent a 4-digit code to {phoneEmail}</p>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input 
                    id="otp"
                    placeholder="4-digit code" 
                    maxLength={4}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  />
                </div>
                <button 
                  className="text-fundeasy-green text-sm"
                  onClick={() => {
                    toast({
                      title: "OTP Resent",
                      description: `A new verification code has been sent to ${phoneEmail}`,
                    });
                  }}
                >
                  Resend OTP
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h1 className="text-2xl font-bold mb-6">Complete KYC</h1>
              <p className="mb-6 text-gray-600">We need a few more details to set up your account.</p>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName"
                    placeholder="Enter your full name" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="panNumber">PAN Number</Label>
                  <Input 
                    id="panNumber"
                    placeholder="Enter your PAN number" 
                    value={panNumber}
                    onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                    maxLength={10}
                  />
                </div>
                <div>
                  <Label htmlFor="accountNumber">Bank Account Number</Label>
                  <Input 
                    id="accountNumber"
                    placeholder="Enter your account number" 
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
                  />
                </div>
                <div>
                  <Label htmlFor="ifscCode">IFSC Code</Label>
                  <Input 
                    id="ifscCode"
                    placeholder="Enter bank IFSC code" 
                    value={ifscCode}
                    onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                  />
                </div>
              </div>
            </>
          )}

          {step === 4 && (
            <div className="text-center py-10">
              <div className="w-20 h-20 bg-fundeasy-green rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold mb-4">All Set!</h1>
              <p className="mb-6 text-gray-600">
                Your account has been created and is ready to go. Start investing in mutual funds in just a few clicks!
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-between mt-8">
          {step > 1 && step < 4 && (
            <Button 
              variant="outline" 
              onClick={handleBack}
            >
              <ChevronLeft className="mr-1" size={18} />
              Back
            </Button>
          )}
          {step < 4 ? (
            <Button 
              onClick={handleNext}
              disabled={isLoading}
              className={`${step === 1 ? 'w-full' : ''} bg-fundeasy-green hover:bg-fundeasy-dark-green`}
            >
              {isLoading ? 'Processing...' : 'Next'}
              {!isLoading && <ChevronRight className="ml-1" size={18} />}
            </Button>
          ) : (
            <Button 
              onClick={handleComplete}
              className="w-full bg-fundeasy-green hover:bg-fundeasy-dark-green"
            >
              Start Investing
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
