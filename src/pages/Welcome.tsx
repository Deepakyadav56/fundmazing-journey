
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen justify-between bg-fundeasy-green p-6">
      <div className="pt-20">
        <h1 className="text-4xl font-bold text-white mb-2">FundEasy</h1>
        <p className="text-white/80 text-lg">Your mutual fund investment journey begins here</p>
      </div>
      
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-6">
            Invest in Mutual Funds, Made Simple
          </h2>
          <ul className="space-y-4">
            {[
              "Simple, hassle-free investing",
              "Track performance in real-time",
              "Start with just ₹500",
              "Curated selection of top funds"
            ].map((feature, index) => (
              <li key={index} className="flex items-center text-white">
                <span className="mr-2 bg-white text-fundeasy-green rounded-full w-5 h-5 flex items-center justify-center text-xs">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <Button 
            onClick={() => navigate('/onboarding')} 
            className="w-full py-6 text-lg hover-scale bg-white text-fundeasy-green"
          >
            Get Started
            <ArrowRight className="ml-2" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
