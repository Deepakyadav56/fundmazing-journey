
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Wallet, LineChart, TrendingUp, ShieldCheck } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-fundeasy-green to-[#1a8b5f] p-6">
      <div className="pt-20">
        <h1 className="text-4xl font-bold text-white mb-2">FundEasy</h1>
        <p className="text-white/80 text-lg">Your mutual fund investment journey begins here</p>
      </div>
      
      <div className="flex-grow flex flex-col justify-center mt-10 mb-20">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center p-3">
              <div className="bg-white/20 rounded-full p-3 mb-2">
                <Wallet className="h-8 w-8 text-white" />
              </div>
              <p className="text-white text-center text-sm">Start with just ₹100</p>
            </div>
            <div className="flex flex-col items-center p-3">
              <div className="bg-white/20 rounded-full p-3 mb-2">
                <LineChart className="h-8 w-8 text-white" />
              </div>
              <p className="text-white text-center text-sm">Track performance easily</p>
            </div>
            <div className="flex flex-col items-center p-3">
              <div className="bg-white/20 rounded-full p-3 mb-2">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <p className="text-white text-center text-sm">Grow your wealth</p>
            </div>
            <div className="flex flex-col items-center p-3">
              <div className="bg-white/20 rounded-full p-3 mb-2">
                <ShieldCheck className="h-8 w-8 text-white" />
              </div>
              <p className="text-white text-center text-sm">100% Secure</p>
            </div>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-4">
          Invest in Mutual Funds, Made Simple
        </h2>
        <ul className="space-y-4 mb-8">
          {[
            "Simple, hassle-free investing",
            "Track performance in real-time",
            "Start with just ₹100",
            "Curated selection of top funds"
          ].map((feature, index) => (
            <li key={index} className="flex items-center text-white">
              <span className="mr-2 bg-white text-fundeasy-green rounded-full w-5 h-5 flex items-center justify-center text-xs">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      
      <Button 
        onClick={() => navigate('/onboarding')} 
        className="w-full py-6 text-lg hover-scale bg-white text-fundeasy-green font-semibold"
      >
        Get Started
        <ArrowRight className="ml-2" size={20} />
      </Button>
    </div>
  );
};

export default Welcome;
