
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ChevronRight, Upload, AlertCircle } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Stepper } from '@/components/ui/stepper';
import { useToast } from '@/hooks/use-toast';

const KYCFlow = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [panNumber, setPanNumber] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [address, setAddress] = useState('');
  const [panUploaded, setPanUploaded] = useState(false);
  const [aadhaarUploaded, setAadhaarUploaded] = useState(false);
  const [selfieUploaded, setSelfieUploaded] = useState(false);
  
  const totalSteps = 4;
  
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // KYC completed
      toast({
        title: "KYC Verification Submitted",
        description: "Your KYC details have been submitted for verification.",
      });
      navigate('/dashboard');
    }
  };
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const validatePAN = () => {
    // Basic PAN validation: 5 letters + 4 numbers + 1 letter
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(panNumber)) {
      toast({
        title: "Invalid PAN Format",
        description: "Please enter a valid PAN number",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };
  
  const validateAadhaar = () => {
    // Basic Aadhaar validation: 12 digits
    const aadhaarRegex = /^\d{12}$/;
    if (!aadhaarRegex.test(aadhaarNumber)) {
      toast({
        title: "Invalid Aadhaar Format",
        description: "Please enter a valid 12-digit Aadhaar number",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };
  
  const handleFileUpload = (type: 'pan' | 'aadhaar' | 'selfie') => {
    // Simulate file upload
    toast({
      title: "File Uploaded",
      description: `Your ${type === 'pan' ? 'PAN card' : type === 'aadhaar' ? 'Aadhaar card' : 'selfie'} has been uploaded successfully.`,
    });
    
    if (type === 'pan') setPanUploaded(true);
    else if (type === 'aadhaar') setAadhaarUploaded(true);
    else setSelfieUploaded(true);
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Basic Details</h2>
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-medium">
                Full Name (as per PAN)
              </label>
              <Input id="fullName" placeholder="Enter your full name" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="dob" className="text-sm font-medium">
                Date of Birth
              </label>
              <Input id="dob" type="date" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address
              </label>
              <Input id="email" type="email" placeholder="youremail@example.com" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="mobile" className="text-sm font-medium">
                Mobile Number
              </label>
              <Input id="mobile" placeholder="+91 XXXXX XXXXX" />
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">PAN Verification</h2>
            
            <div className="space-y-2">
              <label htmlFor="panNumber" className="text-sm font-medium">
                PAN Number
              </label>
              <Input 
                id="panNumber" 
                placeholder="ABCDE1234F" 
                value={panNumber}
                onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                maxLength={10}
              />
              <p className="text-xs text-gray-500">Your PAN will be verified instantly</p>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">Upload PAN Card</label>
                {panUploaded && <CheckCircle size={18} className="text-fundeasy-green" />}
              </div>
              <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${panUploaded ? 'border-fundeasy-green bg-green-50' : 'border-gray-300 hover:border-fundeasy-blue'}`}>
                {panUploaded ? (
                  <p className="text-fundeasy-green">PAN Card uploaded successfully</p>
                ) : (
                  <div>
                    <Upload className="mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-400 mt-1">JPG, PNG or PDF (Max 2MB)</p>
                    <Button 
                      onClick={() => handleFileUpload('pan')}
                      variant="outline" 
                      size="sm" 
                      className="mt-3"
                    >
                      Select File
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Aadhaar Verification</h2>
            
            <div className="space-y-2">
              <label htmlFor="aadhaarNumber" className="text-sm font-medium">
                Aadhaar Number
              </label>
              <Input 
                id="aadhaarNumber" 
                placeholder="XXXX XXXX XXXX" 
                value={aadhaarNumber}
                onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, ''))}
                maxLength={12}
              />
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">Upload Aadhaar Card</label>
                {aadhaarUploaded && <CheckCircle size={18} className="text-fundeasy-green" />}
              </div>
              <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${aadhaarUploaded ? 'border-fundeasy-green bg-green-50' : 'border-gray-300 hover:border-fundeasy-blue'}`}>
                {aadhaarUploaded ? (
                  <p className="text-fundeasy-green">Aadhaar Card uploaded successfully</p>
                ) : (
                  <div>
                    <Upload className="mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-400 mt-1">JPG, PNG or PDF (Max 2MB)</p>
                    <Button 
                      onClick={() => handleFileUpload('aadhaar')}
                      variant="outline" 
                      size="sm" 
                      className="mt-3"
                    >
                      Select File
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">Upload Selfie</label>
                {selfieUploaded && <CheckCircle size={18} className="text-fundeasy-green" />}
              </div>
              <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${selfieUploaded ? 'border-fundeasy-green bg-green-50' : 'border-gray-300 hover:border-fundeasy-blue'}`}>
                {selfieUploaded ? (
                  <p className="text-fundeasy-green">Selfie uploaded successfully</p>
                ) : (
                  <div>
                    <Upload className="mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">Take a clear selfie or upload one</p>
                    <p className="text-xs text-gray-400 mt-1">JPG or PNG (Max 2MB)</p>
                    <Button 
                      onClick={() => handleFileUpload('selfie')}
                      variant="outline" 
                      size="sm" 
                      className="mt-3"
                    >
                      Take Selfie
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Address & Bank Details</h2>
            
            <div className="space-y-2">
              <label htmlFor="address" className="text-sm font-medium">
                Address
              </label>
              <Input 
                id="address" 
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="pincode" className="text-sm font-medium">
                PIN Code
              </label>
              <Input id="pincode" placeholder="Enter PIN code" maxLength={6} />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="city" className="text-sm font-medium">
                City
              </label>
              <Input id="city" placeholder="Enter city" />
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Bank Account Details</h3>
              
              <div className="space-y-2">
                <label htmlFor="accountNumber" className="text-sm font-medium">
                  Account Number
                </label>
                <Input id="accountNumber" placeholder="Enter account number" />
              </div>
              
              <div className="space-y-2 mt-2">
                <label htmlFor="ifsc" className="text-sm font-medium">
                  IFSC Code
                </label>
                <Input id="ifsc" placeholder="IFSC Code" />
              </div>
              
              <div className="mt-3 bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Your bank account will be used for all transactions and redemptions</p>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return true; // Basic validation can be added
      case 2:
        return panUploaded && validatePAN();
      case 3:
        return aadhaarUploaded && selfieUploaded && validateAadhaar();
      case 4:
        return address.length > 0; // Basic validation
      default:
        return false;
    }
  };
  
  return (
    <PageContainer title="KYC Verification" showBackButton>
      <div className="mb-6">
        <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-500">Step {currentStep} of {totalSteps}</span>
          <span className="text-xs font-medium">{(currentStep / totalSteps) * 100}% Complete</span>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-4">
          {renderStepContent()}
          
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!isStepComplete()}
              className={currentStep === totalSteps ? "bg-fundeasy-green" : ""}
            >
              {currentStep === totalSteps ? "Complete KYC" : "Continue"}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-6">
        <h3 className="font-medium mb-2">KYC Information</h3>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start">
              <AlertCircle className="text-fundeasy-blue mt-0.5 mr-2 h-5 w-5" />
              <div>
                <p className="text-sm">KYC (Know Your Customer) is mandatory for investing in mutual funds in India as per SEBI regulations.</p>
                <p className="text-sm mt-2">Your details are securely encrypted and shared only with regulatory authorities.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default KYCFlow;
