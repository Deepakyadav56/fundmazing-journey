
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BarChart2, Calculator, TrendingUp, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { calculateSIPReturns } from '@/utils/mockData';
import { Progress } from '@/components/ui/progress';

const SIPCalculator = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'sip' | 'lumpsum'>('sip');
  
  // SIP Calculator state
  const [sipAmount, setSipAmount] = useState(5000);
  const [sipYears, setSipYears] = useState(10);
  const [sipRate, setSipRate] = useState(12);
  const [sipResult, setSipResult] = useState(0);
  
  // Lumpsum Calculator state
  const [lumpsumAmount, setLumpsumAmount] = useState(100000);
  const [lumpsumYears, setLumpsumYears] = useState(5);
  const [lumpsumRate, setLumpsumRate] = useState(10);
  const [lumpsumResult, setLumpsumResult] = useState(0);
  
  // Calculate SIP returns
  useEffect(() => {
    setSipResult(calculateSIPReturns(sipAmount, sipYears, sipRate));
  }, [sipAmount, sipYears, sipRate]);
  
  // Calculate Lumpsum returns
  useEffect(() => {
    const result = lumpsumAmount * Math.pow((1 + lumpsumRate / 100), lumpsumYears);
    setLumpsumResult(Math.round(result));
  }, [lumpsumAmount, lumpsumYears, lumpsumRate]);
  
  // Handle input changes with validation
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<number>>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setter(value ? parseInt(value) : 0);
  };
  
  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} Lac`;
    } else {
      return `₹${amount.toLocaleString()}`;
    }
  };
  
  // Calculate percentages for chart
  const totalInvestedSIP = sipAmount * sipYears * 12;
  const wealthGainedSIP = sipResult - totalInvestedSIP;
  
  const totalInvestedLumpsum = lumpsumAmount;
  const wealthGainedLumpsum = lumpsumResult - totalInvestedLumpsum;
  
  const getBreakupData = (isLumpsum = false) => {
    const current = new Date();
    const data = [];
    const amount = isLumpsum ? lumpsumAmount : sipAmount;
    const rate = isLumpsum ? lumpsumRate : sipRate;
    const years = isLumpsum ? lumpsumYears : sipYears;
    
    for (let i = 0; i <= years; i++) {
      const year = current.getFullYear() + i;
      let value;
      
      if (isLumpsum) {
        value = amount * Math.pow((1 + rate / 100), i);
      } else {
        value = calculateSIPReturns(amount, i, rate);
      }
      
      data.push({
        year,
        value: Math.round(value),
        invested: isLumpsum ? amount : amount * 12 * i,
      });
    }
    
    return data;
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center p-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-medium">Investment Calculator</h1>
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'sip' | 'lumpsum')} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="sip" className="data-[state=active]:bg-fundeasy-green data-[state=active]:text-white">SIP Calculator</TabsTrigger>
            <TabsTrigger value="lumpsum" className="data-[state=active]:bg-fundeasy-green data-[state=active]:text-white">Lumpsum Calculator</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sip">
            <Card>
              <CardContent className="pt-6 space-y-6">
                {/* Monthly Investment */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="sipAmount">Monthly Investment</Label>
                    <div className="relative">
                      <span className="absolute left-2 top-2.5 text-gray-500">₹</span>
                      <Input
                        id="sipAmount"
                        type="text"
                        value={sipAmount}
                        onChange={(e) => handleAmountChange(e, setSipAmount)}
                        className="w-28 pl-7 pr-3 text-right"
                      />
                    </div>
                  </div>
                  <Slider
                    value={[sipAmount]}
                    max={100000}
                    min={500}
                    step={500}
                    onValueChange={(value) => setSipAmount(value[0])}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>₹500</span>
                    <span>₹100,000</span>
                  </div>
                </div>
                
                {/* Investment Period */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="sipYears">Investment Period</Label>
                    <div className="flex items-center gap-1">
                      <Input
                        id="sipYears"
                        type="text"
                        value={sipYears}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, '');
                          setSipYears(value ? parseInt(value) : 0);
                        }}
                        className="w-16 text-right"
                      />
                      <span className="text-gray-500">years</span>
                    </div>
                  </div>
                  <Slider
                    value={[sipYears]}
                    max={30}
                    min={1}
                    step={1}
                    onValueChange={(value) => setSipYears(value[0])}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1 yr</span>
                    <span>30 yrs</span>
                  </div>
                </div>
                
                {/* Expected Return Rate */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="sipRate">Expected Return Rate</Label>
                    <div className="flex items-center gap-1">
                      <Input
                        id="sipRate"
                        type="text"
                        value={sipRate}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9.]/g, '');
                          setSipRate(value ? parseFloat(value) : 0);
                        }}
                        className="w-16 text-right"
                      />
                      <span className="text-gray-500">% p.a.</span>
                    </div>
                  </div>
                  <Slider
                    value={[sipRate]}
                    max={20}
                    min={1}
                    step={0.5}
                    onValueChange={(value) => setSipRate(value[0])}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1%</span>
                    <span>20%</span>
                  </div>
                </div>
              </CardContent>
              <Separator />
              <CardContent className="pt-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-sm text-gray-500 mb-1">Invested Amount</h3>
                    <p className="text-lg font-bold">{formatCurrency(totalInvestedSIP)}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-sm text-gray-500 mb-1">Estimated Returns</h3>
                    <p className="text-lg font-bold text-fundeasy-green">{formatCurrency(wealthGainedSIP)}</p>
                  </div>
                  <div className="p-4 bg-fundeasy-green/10 rounded-lg">
                    <h3 className="text-sm text-gray-500 mb-1">Total Value</h3>
                    <p className="text-2xl font-bold text-fundeasy-green">{formatCurrency(sipResult)}</p>
                  </div>
                </div>
                
                {/* Breakup Chart */}
                <div className="mt-6">
                  <h3 className="font-medium mb-3">Investment Breakup</h3>
                  <div className="h-6 w-full rounded-full overflow-hidden bg-gray-200">
                    <div className="h-full bg-fundeasy-green" style={{ width: `${(totalInvestedSIP / sipResult) * 100}%` }}></div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-fundeasy-green mr-2"></div>
                      <span className="text-xs">Invested ({Math.round((totalInvestedSIP / sipResult) * 100)}%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-gray-200 mr-2"></div>
                      <span className="text-xs">Returns ({Math.round((wealthGainedSIP / sipResult) * 100)}%)</span>
                    </div>
                  </div>
                </div>
                
                {/* Year-wise Breakdown */}
                <div className="mt-6">
                  <h3 className="font-medium mb-3">Year-wise Breakdown</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Year</th>
                          <th className="text-right py-2">Invested</th>
                          <th className="text-right py-2">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getBreakupData().map((item, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-2">{item.year}</td>
                            <td className="text-right">{formatCurrency(item.invested)}</td>
                            <td className="text-right font-medium">{formatCurrency(item.value)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="lumpsum">
            <Card>
              <CardContent className="pt-6 space-y-6">
                {/* One-time Investment */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="lumpsumAmount">One-time Investment</Label>
                    <div className="relative">
                      <span className="absolute left-2 top-2.5 text-gray-500">₹</span>
                      <Input
                        id="lumpsumAmount"
                        type="text"
                        value={lumpsumAmount}
                        onChange={(e) => handleAmountChange(e, setLumpsumAmount)}
                        className="w-28 pl-7 pr-3 text-right"
                      />
                    </div>
                  </div>
                  <Slider
                    value={[lumpsumAmount]}
                    max={10000000}
                    min={1000}
                    step={1000}
                    onValueChange={(value) => setLumpsumAmount(value[0])}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>₹1,000</span>
                    <span>₹1 Cr</span>
                  </div>
                </div>
                
                {/* Investment Period */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="lumpsumYears">Investment Period</Label>
                    <div className="flex items-center gap-1">
                      <Input
                        id="lumpsumYears"
                        type="text"
                        value={lumpsumYears}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, '');
                          setLumpsumYears(value ? parseInt(value) : 0);
                        }}
                        className="w-16 text-right"
                      />
                      <span className="text-gray-500">years</span>
                    </div>
                  </div>
                  <Slider
                    value={[lumpsumYears]}
                    max={30}
                    min={1}
                    step={1}
                    onValueChange={(value) => setLumpsumYears(value[0])}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1 yr</span>
                    <span>30 yrs</span>
                  </div>
                </div>
                
                {/* Expected Return Rate */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="lumpsumRate">Expected Return Rate</Label>
                    <div className="flex items-center gap-1">
                      <Input
                        id="lumpsumRate"
                        type="text"
                        value={lumpsumRate}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9.]/g, '');
                          setLumpsumRate(value ? parseFloat(value) : 0);
                        }}
                        className="w-16 text-right"
                      />
                      <span className="text-gray-500">% p.a.</span>
                    </div>
                  </div>
                  <Slider
                    value={[lumpsumRate]}
                    max={20}
                    min={1}
                    step={0.5}
                    onValueChange={(value) => setLumpsumRate(value[0])}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1%</span>
                    <span>20%</span>
                  </div>
                </div>
              </CardContent>
              <Separator />
              <CardContent className="pt-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-sm text-gray-500 mb-1">Invested Amount</h3>
                    <p className="text-lg font-bold">{formatCurrency(totalInvestedLumpsum)}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-sm text-gray-500 mb-1">Estimated Returns</h3>
                    <p className="text-lg font-bold text-fundeasy-green">{formatCurrency(wealthGainedLumpsum)}</p>
                  </div>
                  <div className="p-4 bg-fundeasy-green/10 rounded-lg">
                    <h3 className="text-sm text-gray-500 mb-1">Total Value</h3>
                    <p className="text-2xl font-bold text-fundeasy-green">{formatCurrency(lumpsumResult)}</p>
                  </div>
                </div>
                
                {/* Breakup Chart */}
                <div className="mt-6">
                  <h3 className="font-medium mb-3">Investment Breakup</h3>
                  <div className="h-6 w-full rounded-full overflow-hidden bg-gray-200">
                    <div className="h-full bg-fundeasy-green" style={{ width: `${(totalInvestedLumpsum / lumpsumResult) * 100}%` }}></div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-fundeasy-green mr-2"></div>
                      <span className="text-xs">Invested ({Math.round((totalInvestedLumpsum / lumpsumResult) * 100)}%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-gray-200 mr-2"></div>
                      <span className="text-xs">Returns ({Math.round((wealthGainedLumpsum / lumpsumResult) * 100)}%)</span>
                    </div>
                  </div>
                </div>
                
                {/* Year-wise Breakdown */}
                <div className="mt-6">
                  <h3 className="font-medium mb-3">Year-wise Breakdown</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Year</th>
                          <th className="text-right py-2">Invested</th>
                          <th className="text-right py-2">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getBreakupData(true).map((item, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-2">{item.year}</td>
                            <td className="text-right">{formatCurrency(item.invested)}</td>
                            <td className="text-right font-medium">{formatCurrency(item.value)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex items-center bg-blue-50 p-3 rounded-md">
          <Info size={16} className="text-blue-500 mr-2 flex-shrink-0" />
          <div className="text-xs text-gray-700">
            <p className="font-medium">Note:</p>
            <p>This calculator provides an estimate based on regular monthly investments. Actual returns may vary based on market conditions, fund performance, and expenses.</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="w-1/2"
            onClick={() => navigate('/calculator')}
          >
            <Calculator size={16} className="mr-2" />
            More Calculators
          </Button>
          <Button 
            className="w-1/2 bg-fundeasy-green hover:bg-fundeasy-dark-green"
            onClick={() => navigate('/explore')}
          >
            <TrendingUp size={16} className="mr-2" />
            Start Investing
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SIPCalculator;
