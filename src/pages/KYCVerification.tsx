
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, Circle, ArrowRight, 
  Upload, Camera, FileText, AlertTriangle 
} from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

enum KYCStep {
  PERSONAL_INFO = 'PERSONAL_INFO',
  PAN_VERIFICATION = 'PAN_VERIFICATION',
  ADDRESS_PROOF = 'ADDRESS_PROOF',
  BANK_ACCOUNT = 'BANK_ACCOUNT',
  REVIEW = 'REVIEW',
}

const KYCVerification = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<KYCStep>(KYCStep.PERSONAL_INFO);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    mobile: '',
    email: '',
    panNumber: '',
    address: '',
    pincode: '',
    city: '',
    state: '',
    bankAccount: '',
    ifsc: '',
    bankName: '',
  });
  
  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleNextStep = () => {
    switch (currentStep) {
      case KYCStep.PERSONAL_INFO:
        setCurrentStep(KYCStep.PAN_VERIFICATION);
        break;
      case KYCStep.PAN_VERIFICATION:
        setCurrentStep(KYCStep.ADDRESS_PROOF);
        break;
      case KYCStep.ADDRESS_PROOF:
        setCurrentStep(KYCStep.BANK_ACCOUNT);
        break;
      case KYCStep.BANK_ACCOUNT:
        setCurrentStep(KYCStep.REVIEW);
        break;
      case KYCStep.REVIEW:
        handleSubmit();
        break;
    }
  };
  
  const handleSubmit = () => {
    toast({
      title: "KYC Submitted Successfully",
      description: "Your KYC has been submitted for verification."
    });
    navigate('/profile');
  };
  
  const isStepComplete = (step: KYCStep) => {
    switch (step) {
      case KYCStep.PERSONAL_INFO:
        return formData.name && formData.dob && formData.mobile && formData.email;
      case KYCStep.PAN_VERIFICATION:
        return formData.panNumber && formData.panNumber.length === 10;
      case KYCStep.ADDRESS_PROOF:
        return formData.address && formData.pincode && formData.city && formData.state;
      case KYCStep.BANK_ACCOUNT:
        return formData.bankAccount && formData.ifsc && formData.bankName;
      case KYCStep.REVIEW:
        return true;
    }
  };
  
  return (
    <PageContainer title="KYC Verification" showBackButton>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-6">
          <StepIndicator 
            number={1} 
            title="Personal Info" 
            isActive={currentStep === KYCStep.PERSONAL_INFO} 
            isCompleted={currentStep !== KYCStep.PERSONAL_INFO}
          />
          <div className="h-0.5 flex-grow bg-gray-200 mx-1"></div>
          <StepIndicator 
            number={2} 
            title="PAN" 
            isActive={currentStep === KYCStep.PAN_VERIFICATION} 
            isCompleted={currentStep !== KYCStep.PERSONAL_INFO && currentStep !== KYCStep.PAN_VERIFICATION}
          />
          <div className="h-0.5 flex-grow bg-gray-200 mx-1"></div>
          <StepIndicator 
            number={3} 
            title="Address" 
            isActive={currentStep === KYCStep.ADDRESS_PROOF} 
            isCompleted={currentStep !== KYCStep.PERSONAL_INFO && currentStep !== KYCStep.PAN_VERIFICATION && currentStep !== KYCStep.ADDRESS_PROOF}
          />
          <div className="h-0.5 flex-grow bg-gray-200 mx-1"></div>
          <StepIndicator 
            number={4} 
            title="Bank" 
            isActive={currentStep === KYCStep.BANK_ACCOUNT} 
            isCompleted={currentStep === KYCStep.REVIEW}
          />
        </div>
        
        {currentStep === KYCStep.PERSONAL_INFO && (
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Full Name (as per PAN)</label>
                <Input 
                  id="name" 
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="dob" className="text-sm font-medium">Date of Birth</label>
                <Input 
                  id="dob" 
                  type="date"
                  value={formData.dob}
                  onChange={(e) => handleInputChange('dob', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="mobile" className="text-sm font-medium">Mobile Number</label>
                <Input 
                  id="mobile" 
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange('mobile', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                <Input 
                  id="email" 
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        )}
        
        {currentStep === KYCStep.PAN_VERIFICATION && (
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <label htmlFor="pan" className="text-sm font-medium">PAN Number</label>
                <Input 
                  id="pan"
                  placeholder="ABCDE1234F" 
                  value={formData.panNumber}
                  onChange={(e) => handleInputChange('panNumber', e.target.value.toUpperCase())}
                  maxLength={10}
                />
                <p className="text-xs text-gray-500">Enter your 10-digit PAN number</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Upload PAN Card</label>
                <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg text-center">
                  <div className="flex justify-center mb-2">
                    <Upload className="text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-400">JPG, PNG or PDF (Max 5MB)</p>
                  <input type="file" className="hidden" id="pan-upload" />
                  <Button 
                    variant="outline" 
                    className="mt-3 text-sm"
                    onClick={() => document.getElementById('pan-upload')?.click()}
                  >
                    <Camera size={14} className="mr-1" /> Upload
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {currentStep === KYCStep.ADDRESS_PROOF && (
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-medium">Address</label>
                <Input 
                  id="address" 
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="pincode" className="text-sm font-medium">Pincode</label>
                <Input 
                  id="pincode" 
                  value={formData.pincode}
                  onChange={(e) => handleInputChange('pincode', e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="city" className="text-sm font-medium">City</label>
                  <Input 
                    id="city" 
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="state" className="text-sm font-medium">State</label>
                  <Input 
                    id="state" 
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Upload Address Proof</label>
                <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg text-center">
                  <div className="flex justify-center mb-2">
                    <FileText className="text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Upload address proof document</p>
                  <p className="text-xs text-gray-400">Aadhaar, Passport, Driving License, etc.</p>
                  <input type="file" className="hidden" id="address-upload" />
                  <Button 
                    variant="outline" 
                    className="mt-3 text-sm"
                    onClick={() => document.getElementById('address-upload')?.click()}
                  >
                    <Upload size={14} className="mr-1" /> Upload Document
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {currentStep === KYCStep.BANK_ACCOUNT && (
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <label htmlFor="account" className="text-sm font-medium">Bank Account Number</label>
                <Input 
                  id="account" 
                  value={formData.bankAccount}
                  onChange={(e) => handleInputChange('bankAccount', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="ifsc" className="text-sm font-medium">IFSC Code</label>
                <Input 
                  id="ifsc" 
                  value={formData.ifsc}
                  onChange={(e) => handleInputChange('ifsc', e.target.value.toUpperCase())}
                />
                <p className="text-xs text-gray-500">e.g. SBIN0001234</p>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="bank-name" className="text-sm font-medium">Bank Name</label>
                <Input 
                  id="bank-name" 
                  value={formData.bankName}
                  onChange={(e) => handleInputChange('bankName', e.target.value)}
                />
              </div>
              
              <div className="p-3 bg-yellow-50 rounded-lg flex items-start space-x-2">
                <AlertTriangle size={16} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-yellow-800">
                  Ensure that you add a bank account that is in your name. The name on your bank account should match with your KYC details.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
        
        {currentStep === KYCStep.REVIEW && (
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-center py-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={32} className="text-fundeasy-green" />
                </div>
              </div>
              
              <h3 className="text-center font-medium">Review Your KYC Details</h3>
              <p className="text-center text-sm text-gray-500">Please review all details before final submission</p>
              
              <div className="space-y-3 pt-2">
                <div>
                  <h4 className="text-sm font-medium">Personal Information</h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1 text-sm">
                    <div className="text-gray-500">Full Name</div>
                    <div>{formData.name}</div>
                    <div className="text-gray-500">Date of Birth</div>
                    <div>{formData.dob}</div>
                    <div className="text-gray-500">Mobile Number</div>
                    <div>{formData.mobile}</div>
                    <div className="text-gray-500">Email</div>
                    <div>{formData.email}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium">PAN Details</h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1 text-sm">
                    <div className="text-gray-500">PAN Number</div>
                    <div>{formData.panNumber}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium">Address Information</h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1 text-sm">
                    <div className="text-gray-500">Address</div>
                    <div>{formData.address}</div>
                    <div className="text-gray-500">City</div>
                    <div>{formData.city}</div>
                    <div className="text-gray-500">State</div>
                    <div>{formData.state}</div>
                    <div className="text-gray-500">Pincode</div>
                    <div>{formData.pincode}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium">Bank Details</h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1 text-sm">
                    <div className="text-gray-500">Bank Name</div>
                    <div>{formData.bankName}</div>
                    <div className="text-gray-500">Account Number</div>
                    <div>{formData.bankAccount}</div>
                    <div className="text-gray-500">IFSC Code</div>
                    <div>{formData.ifsc}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <Button 
        onClick={handleNextStep}
        className="w-full bg-fundeasy-green"
        disabled={!isStepComplete(currentStep)}
      >
        {currentStep === KYCStep.REVIEW ? 'Submit KYC' : 'Continue'} <ArrowRight size={16} className="ml-1" />
      </Button>
    </PageContainer>
  );
};

interface StepIndicatorProps {
  number: number;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ number, title, isActive, isCompleted }) => {
  return (
    <div className="flex flex-col items-center">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        isCompleted ? 'bg-fundeasy-green text-white' : 
        isActive ? 'bg-green-100 text-fundeasy-green border border-fundeasy-green' : 
        'bg-gray-100 text-gray-500'
      }`}>
        {isCompleted ? (
          <CheckCircle2 size={16} />
        ) : (
          number
        )}
      </div>
      <span className={`text-xs mt-1 ${isActive || isCompleted ? 'text-fundeasy-green' : 'text-gray-500'}`}>
        {title}
      </span>
    </div>
  );
};

export default KYCVerification;
