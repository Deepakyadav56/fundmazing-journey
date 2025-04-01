
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { ChevronRight, ChevronLeft, ArrowRight, Check, AlertTriangle } from 'lucide-react';
import MobileVerification from '@/components/kyc/MobileVerification';
import EmailVerification from '@/components/kyc/EmailVerification';

const Onboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const handleMobileVerified = (verifiedMobile: string) => {
    setMobileNumber(verifiedMobile);
    setStep(3);
  };

  const handleEmailVerified = (verifiedEmail: string) => {
    setEmail(verifiedEmail);
    setStep(4);
  };

  const handleNext = () => {
    if (step === 1) {
      // Basic info validation
      if (!fullName) {
        toast({
          title: "Missing Information",
          description: "Please enter your full name",
          variant: "destructive",
        });
        return;
      }
      setStep(2);
    } else if (step === 4) {
      // Password validation
      if (!password || password.length < 8) {
        toast({
          title: "Invalid Password",
          description: "Password must be at least 8 characters long",
          variant: "destructive",
        });
        return;
      }
      
      if (password !== confirmPassword) {
        toast({
          title: "Passwords Don't Match",
          description: "Please ensure both passwords match",
          variant: "destructive",
        });
        return;
      }
      
      setStep(5);
    } else if (step === 5) {
      // Terms and privacy validation
      if (!termsAccepted || !privacyAccepted) {
        toast({
          title: "Terms & Privacy Required",
          description: "Please accept both the terms and privacy policy to continue",
          variant: "destructive",
        });
        return;
      }
      
      // Complete registration
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep(6);
      }, 1500);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    // Navigate to KYC verification
    toast({
      title: "Account Created Successfully!",
      description: "Let's complete your KYC verification now.",
    });
    navigate('/kyc-verification');
  };

  return (
    <div className="min-h-screen flex flex-col p-6">
      <div className="py-6">
        <Progress value={step === 6 ? 100 : (step / 5) * 100} className="h-2 bg-gray-200" />
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>Sign Up</span>
          <span>Verify</span>
          <span>Create Account</span>
          <span>Complete</span>
        </div>
      </div>
      
      <div className="flex-grow flex flex-col justify-between">
        <div className="animate-fade-in">
          {step === 1 && (
            <>
              <h1 className="text-2xl font-bold mb-6">Create Account</h1>
              <p className="mb-6 text-gray-600">Let's get started with your FundEasy account.</p>
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
              </div>
            </>
          )}

          {step === 2 && (
            <MobileVerification onVerified={handleMobileVerified} />
          )}

          {step === 3 && (
            <EmailVerification onVerified={handleEmailVerified} />
          )}

          {step === 4 && (
            <>
              <h1 className="text-2xl font-bold mb-6">Create Password</h1>
              <p className="mb-6 text-gray-600">Choose a secure password for your account.</p>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password"
                    type="password" 
                    placeholder="Create a secure password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Password must be at least 8 characters long
                  </p>
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input 
                    id="confirmPassword"
                    type="password" 
                    placeholder="Re-enter your password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {step === 5 && (
            <>
              <h1 className="text-2xl font-bold mb-6">Terms & Consent</h1>
              <p className="mb-6 text-gray-600">Please review and accept our terms and privacy policy.</p>
              
              <div className="space-y-6">
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-md flex items-start">
                  <AlertTriangle className="text-amber-500 mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                  <p className="text-xs text-amber-800">
                    By creating an account, you'll need to complete KYC verification as per SEBI guidelines before you can invest in mutual funds.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <Checkbox 
                        id="terms" 
                        checked={termsAccepted}
                        onCheckedChange={(checked) => setTermsAccepted(!!checked)}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="font-medium text-gray-700">Terms of Service</label>
                      <p className="text-gray-500">
                        I agree to the <a href="#" className="text-fundeasy-blue hover:underline">Terms of Service</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <Checkbox 
                        id="privacy" 
                        checked={privacyAccepted}
                        onCheckedChange={(checked) => setPrivacyAccepted(!!checked)}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="privacy" className="font-medium text-gray-700">Privacy Policy</label>
                      <p className="text-gray-500">
                        I agree to the <a href="#" className="text-fundeasy-blue hover:underline">Privacy Policy</a> and consent to the collection and processing of my personal data.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {step === 6 && (
            <div className="text-center py-10">
              <div className="w-20 h-20 bg-fundeasy-green rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-2xl font-bold mb-4">Account Created!</h1>
              <p className="mb-6 text-gray-600">
                Your account has been created successfully. Now let's complete your KYC verification to start investing in mutual funds.
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-between mt-8">
          {step > 1 && step < 6 && (
            <Button 
              variant="outline" 
              onClick={handleBack}
            >
              <ChevronLeft className="mr-1" size={18} />
              Back
            </Button>
          )}
          
          {step === 1 || step === 4 || step === 5 ? (
            <Button 
              onClick={handleNext}
              disabled={isLoading}
              className={`${step === 1 ? 'w-full' : ''} bg-fundeasy-blue hover:bg-fundeasy-dark-blue`}
            >
              {isLoading ? 'Processing...' : 'Next'}
              {!isLoading && <ChevronRight className="ml-1" size={18} />}
            </Button>
          ) : step === 6 ? (
            <Button 
              onClick={handleComplete}
              className="w-full bg-fundeasy-green hover:bg-fundeasy-dark-green"
            >
              Complete KYC Verification
              <ArrowRight className="ml-1" size={18} />
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
