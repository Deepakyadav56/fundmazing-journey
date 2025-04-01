
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-fundeasy-blue to-fundeasy-light-blue">
      {/* Hero Section */}
      <div className="pt-12 px-6 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">FundEasy</h1>
        <p className="text-white/80 text-lg mb-8">Your wealth partner in your pocket!</p>
        
        <div className="relative mx-auto max-w-md">
          <img 
            src="/lovable-uploads/faf8b1cf-e729-4629-90d0-683e4533cb79.png" 
            alt="FundEasy App Preview" 
            className="mx-auto rounded-2xl shadow-2xl"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl flex items-end">
            <div className="p-6 text-left w-full">
              <h2 className="text-2xl font-bold text-white mb-2">
                Simplify Your Investments
              </h2>
              <p className="text-white/90 mb-4">
                Discover your ideal mutual funds effortlessly with FundEasy
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="px-6 py-10">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
          <h3 className="text-xl font-semibold mb-4">Why FundEasy?</h3>
          
          <div className="space-y-4">
            {[
              "Simplified mutual fund investing",
              "Start with just ₹500",
              "Track performance in real-time",
              "Expert fund recommendations"
            ].map((feature, index) => (
              <div key={index} className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3">
                  <span className="text-white">✓</span>
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="px-6 pb-10 fixed bottom-0 left-0 right-0">
        <Button 
          onClick={() => navigate('/welcome')} 
          className="w-full py-6 text-lg shadow-lg bg-white text-fundeasy-blue hover:bg-white/90"
        >
          Get Started
          <ArrowRight className="ml-2" size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Index;
