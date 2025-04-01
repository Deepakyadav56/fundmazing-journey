
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to dashboard
    navigate('/dashboard');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-fundeasy-light-gray">
      <div className="text-center p-6">
        <div className="w-16 h-16 rounded-full bg-fundeasy-blue mx-auto flex items-center justify-center mb-4">
          <div className="w-8 h-8 rounded-full border-4 border-white animate-pulse"></div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">FundEasy</h1>
        <p className="text-gray-600">Loading your investments...</p>
      </div>
    </div>
  );
};

export default Index;
