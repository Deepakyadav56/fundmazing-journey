
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Phone } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

interface MobileVerificationProps {
  onVerified: (mobile: string) => void;
  initialMobile?: string;
}

const MobileVerification = ({ onVerified, initialMobile = '' }: MobileVerificationProps) => {
  const { toast } = useToast();
  const [mobile, setMobile] = useState(initialMobile);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  
  const validateMobile = (mobile: string) => {
    return /^[6-9]\d{9}$/.test(mobile); // Basic validation for Indian mobile numbers
  };
  
  const handleSendOtp = () => {
    if (!validateMobile(mobile)) {
      toast({
        title: "Invalid Mobile Number",
        description: "Please enter a valid 10-digit mobile number",
        variant: "destructive",
      });
      return;
    }
    
    setIsOtpSent(true);
    toast({
      title: "OTP Sent",
      description: `A verification code has been sent to ${mobile}`,
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
        title: "Mobile Verified",
        description: "Your mobile number has been verified successfully",
      });
      onVerified(mobile);
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="mx-auto w-12 h-12 bg-fundeasy-accent-bg rounded-full flex items-center justify-center text-fundeasy-blue mb-4">
          <Phone size={24} />
        </div>
        <h2 className="text-xl font-bold">Verify Your Mobile</h2>
        <p className="text-sm text-gray-500 mt-1">We need to verify your mobile number</p>
      </div>
      
      <div>
        <Label htmlFor="mobile">Mobile Number</Label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500">+91</span>
          </div>
          <Input
            id="mobile"
            type="tel"
            className="pl-12"
            placeholder="Enter 10-digit mobile number"
            value={mobile}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              if (value.length <= 10) setMobile(value);
            }}
            maxLength={10}
            disabled={isOtpSent}
            inputMode="numeric"
          />
        </div>
      </div>
      
      {!isOtpSent ? (
        <Button
          onClick={handleSendOtp}
          className="w-full bg-fundeasy-blue hover:bg-fundeasy-dark-blue"
          disabled={mobile.length !== 10}
        >
          Send Verification Code
        </Button>
      ) : (
        <div className="space-y-6">
          <div>
            <Label htmlFor="otp">Verification Code</Label>
            <p className="text-sm text-gray-500 mb-2">Enter the 6-digit code sent to +91 {mobile}</p>
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
            {isVerifying ? "Verifying..." : "Verify Mobile"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default MobileVerification;
