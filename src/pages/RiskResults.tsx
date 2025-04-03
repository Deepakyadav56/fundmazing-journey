
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LineChart, Shield, CheckCircle, ArrowRight } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const RiskResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    riskProfile = "Moderate", 
    riskPercentage = 60,
    description = "You're comfortable with market fluctuations and aim for growth.", 
    recommendedFunds = ["Balanced Advantage Funds", "Large Cap Funds", "Multi Cap Funds"] 
  } = location.state || {};
  
  const getRiskColor = () => {
    if (riskPercentage < 25) return "bg-green-500";
    if (riskPercentage < 50) return "bg-blue-500";
    if (riskPercentage < 75) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  const getRiskIcon = () => {
    if (riskPercentage < 25) return <Shield className="h-6 w-6 text-green-500" />;
    if (riskPercentage < 50) return <Shield className="h-6 w-6 text-blue-500" />;
    if (riskPercentage < 75) return <LineChart className="h-6 w-6 text-yellow-500" />;
    return <LineChart className="h-6 w-6 text-red-500" />;
  };
  
  return (
    <PageContainer title="Your Risk Profile" showBackButton>
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">{riskProfile}</h2>
              <p className="text-sm text-gray-500">Your Investment Profile</p>
            </div>
            <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
              {getRiskIcon()}
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-xs">Conservative</span>
              <span className="text-xs">Aggressive</span>
            </div>
            <Progress value={riskPercentage} className="h-2" indicatorClassName={getRiskColor()} />
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-sm">{description}</p>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Recommended Fund Categories:</h3>
            <div className="space-y-2">
              {recommendedFunds.map((fund, index) => (
                <div key={index} className="flex items-center p-2 bg-fundeasy-light-green rounded-md">
                  <CheckCircle size={16} className="text-fundeasy-green mr-2" />
                  <span>{fund}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 bg-gray-50 flex justify-between items-center">
          <div>
            <p className="text-sm font-medium">Get personalized recommendations</p>
          </div>
          <Button onClick={() => navigate('/explore')} className="bg-fundeasy-green">
            View Funds <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
      
      <div className="space-y-4 mb-8">
        <h3 className="font-medium">Understanding Your Risk Profile</h3>
        
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-2">What this means</h4>
            <p className="text-sm text-gray-700">
              Your risk profile is determined based on factors like your investment timeframe, 
              financial goals, and comfort level with market fluctuations. This helps us recommend
              funds that align with your preferences.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-2">Next Steps</h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-center">
                <CheckCircle size={16} className="text-fundeasy-green mr-2" />
                Explore recommended funds in our catalog
              </li>
              <li className="flex items-center">
                <CheckCircle size={16} className="text-fundeasy-green mr-2" />
                Diversify your investments across categories
              </li>
              <li className="flex items-center">
                <CheckCircle size={16} className="text-fundeasy-green mr-2" />
                Set up SIP for consistent investing
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex gap-3">
        <Button onClick={() => navigate('/dashboard')} variant="outline" className="flex-1">
          Go to Dashboard
        </Button>
        <Button onClick={() => navigate('/explore')} className="flex-1 bg-fundeasy-green">
          Explore Funds
        </Button>
      </div>
    </PageContainer>
  );
};

export default RiskResults;
