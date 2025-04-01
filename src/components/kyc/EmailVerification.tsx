
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Mail } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

interface EmailVerificationProps {
  onVerified: (email: string) => void;
  initialEmail?: string;
}

const EmailVerification = ({ onVerified, initialEmail = '' }: EmailVerificationProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState(initialEmail);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  const handleSendOtp = () => {
    if (!validateEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsOtpSent(true);
    toast({
      title: "OTP Sent",
      description: `A verification code has been sent to ${email}`,
    });
  };
  
  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive",
      });
      return;
    }
    
    setIsVerifying(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      setIsVerifying(false);
      toast({
        title: "Email Verified",
        description: "Your email has been verified successfully",
      });
      onVerified(email);
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="mx-auto w-12 h-12 bg-fundeasy-accent-bg rounded-full flex items-center justify-center text-fundeasy-blue mb-4">
          <Mail size={24} />
        </div>
        <h2 className="text-xl font-bold">Verify Your Email</h2>
        <p className="text-sm text-gray-500 mt-1">We need to verify your email address</p>
      </div>
      
      <div>
        <Label htmlFor="email">Email Address</Label>
        <div className="mt-1">
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isOtpSent}
          />
        </div>
      </div>
      
      {!isOtpSent ? (
        <Button
          onClick={handleSendOtp}
          className="w-full bg-fundeasy-blue hover:bg-fundeasy-dark-blue"
        >
          Send Verification Code
        </Button>
      ) : (
        <div className="space-y-6">
          <div>
            <Label htmlFor="otp">Verification Code</Label>
            <p className="text-sm text-gray-500 mb-2">Enter the 6-digit code sent to {email}</p>
            <div className="flex justify-center my-2">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={setOtp}
                render={({ slots }) => (
                  <InputOTPGroup>
                    {slots.map((slot, index) => (
                      <InputOTPSlot key={index} {...slot} />
                    ))}
                  </InputOTPGroup>
                )}
              />
            </div>
            <div className="text-center mt-2">
              <button 
                onClick={handleSendOtp}
                className="text-fundeasy-blue text-sm"
              >
                Resend Code
              </button>
            </div>
          </div>
          
          <Button
            onClick={handleVerifyOtp}
            className="w-full bg-fundeasy-blue hover:bg-fundeasy-dark-blue"
            disabled={isVerifying}
          >
            {isVerifying ? "Verifying..." : "Verify Email"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmailVerification;
