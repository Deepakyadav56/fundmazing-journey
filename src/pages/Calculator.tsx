
import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { calculateSIPReturns } from '@/utils/mockData';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Label,
} from 'recharts';

const Calculator = () => {
  const navigate = useNavigate();
  
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [years, setYears] = useState(10);
  const [returnRate, setReturnRate] = useState(12);
  const [futureValue, setFutureValue] = useState(0);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalReturns, setTotalReturns] = useState(0);
  
  useEffect(() => {
    const calculatedAmount = calculateSIPReturns(monthlyInvestment, years, returnRate);
    const invested = monthlyInvestment * 12 * years;
    
    setFutureValue(calculatedAmount);
    setTotalInvestment(invested);
    setTotalReturns(calculatedAmount - invested);
  }, [monthlyInvestment, years, returnRate]);
  
  const handleMonthlyInvestmentChange = (value: string) => {
    const amount = parseInt(value) || 0;
    setMonthlyInvestment(amount);
  };
  
  const data = [
    { name: "Invested", value: totalInvestment },
    { name: "Returns", value: totalReturns }
  ];
  
  const COLORS = ['#00C853', '#66FFA6'];
  
  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center p-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-medium ml-2">SIP Calculator</h1>
        </div>
      </div>
      
      <div className="p-4 space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">
                Monthly Investment (₹)
              </label>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMonthlyInvestment(Math.max(500, monthlyInvestment - 500))}
                >
                  -
                </Button>
                <Input
                  type="number"
                  value={monthlyInvestment}
                  onChange={(e) => handleMonthlyInvestmentChange(e.target.value)}
                  min={500}
                  step={500}
                  className="text-center"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMonthlyInvestment(monthlyInvestment + 500)}
                >
                  +
                </Button>
              </div>
              <Slider
                defaultValue={[5000]}
                max={100000}
                min={500}
                step={500}
                value={[monthlyInvestment]}
                onValueChange={(value) => setMonthlyInvestment(value[0])}
                className="mt-4"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹500</span>
                <span>₹50,000</span>
                <span>₹100,000</span>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">
                Time Period (Years)
              </label>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setYears(Math.max(1, years - 1))}
                >
                  -
                </Button>
                <Input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(parseInt(e.target.value) || 1)}
                  min={1}
                  max={30}
                  className="text-center"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setYears(Math.min(30, years + 1))}
                >
                  +
                </Button>
              </div>
              <Slider
                defaultValue={[10]}
                max={30}
                min={1}
                step={1}
                value={[years]}
                onValueChange={(value) => setYears(value[0])}
                className="mt-4"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 Year</span>
                <span>15 Years</span>
                <span>30 Years</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Expected Return Rate (% p.a.)
              </label>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setReturnRate(Math.max(1, returnRate - 1))}
                >
                  -
                </Button>
                <Input
                  type="number"
                  value={returnRate}
                  onChange={(e) => setReturnRate(parseInt(e.target.value) || 1)}
                  min={1}
                  max={30}
                  className="text-center"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setReturnRate(Math.min(30, returnRate + 1))}
                >
                  +
                </Button>
              </div>
              <Slider
                defaultValue={[12]}
                max={30}
                min={1}
                step={0.5}
                value={[returnRate]}
                onValueChange={(value) => setReturnRate(value[0])}
                className="mt-4"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1%</span>
                <span>15%</span>
                <span>30%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Results</h3>
            
            <div className="h-[200px] mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    <Label
                      value={`₹${futureValue.toLocaleString()}`}
                      position="center"
                      className="text-lg font-bold"
                    />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-fundeasy-green rounded-full mr-2"></div>
                  <span className="text-sm">Invested Amount</span>
                </div>
                <p className="font-bold ml-5">₹{totalInvestment.toLocaleString()}</p>
              </div>
              <div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-fundeasy-light-green rounded-full mr-2"></div>
                  <span className="text-sm">Estimated Returns</span>
                </div>
                <p className="font-bold ml-5">₹{totalReturns.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="font-medium mb-2">Total Value</h4>
              <p className="text-2xl font-bold text-fundeasy-green">₹{futureValue.toLocaleString()}</p>
            </div>
            
            <div className="mt-6 bg-gray-50 p-3 rounded-md">
              <p className="text-xs text-gray-500">
                Disclaimer: The values shown are for illustration purposes only. Actual returns may vary based on market conditions and fund performance.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Button 
          onClick={() => navigate('/explore')}
          className="w-full bg-fundeasy-green hover:bg-fundeasy-dark-green"
        >
          Start Investing
        </Button>
      </div>
    </div>
  );
};

export default Calculator;
