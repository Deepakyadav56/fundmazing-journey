
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Info, Shield, CheckCircle2, AlertTriangle } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

const RiskProfiling = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const totalQuestions = 5;
  
  // Risk profiling questions
  const questions = [
    {
      id: 1,
      question: "What is your investment timeframe?",
      options: [
        { value: 1, label: "Less than 1 year" },
        { value: 2, label: "1-3 years" },
        { value: 3, label: "3-7 years" },
        { value: 4, label: "More than 7 years" },
      ],
    },
    {
      id: 2,
      question: "How would you react if your investments dropped by 20% in a month?",
      options: [
        { value: 1, label: "Sell everything immediately" },
        { value: 2, label: "Sell some investments" },
        { value: 3, label: "Hold and wait for recovery" },
        { value: 4, label: "Buy more at lower prices" },
      ],
    },
    {
      id: 3,
      question: "What is your primary investment goal?",
      options: [
        { value: 1, label: "Preserving capital with minimal risk" },
        { value: 2, label: "Generating stable income" },
        { value: 3, label: "Balanced growth and income" },
        { value: 4, label: "Maximizing long-term growth" },
      ],
    },
    {
      id: 4,
      question: "What percentage of your monthly income can you invest?",
      options: [
        { value: 1, label: "Less than 10%" },
        { value: 2, label: "10-20%" },
        { value: 3, label: "20-30%" },
        { value: 4, label: "More than 30%" },
      ],
    },
    {
      id: 5,
      question: "Which investment option do you prefer?",
      options: [
        { value: 1, label: "Fixed deposits with guaranteed returns" },
        { value: 2, label: "Debt funds with relatively stable returns" },
        { value: 3, label: "Balanced funds with moderate risk" },
        { value: 4, label: "Equity funds with potential for high returns" },
      ],
    },
  ];
  
  const handleAnswerSelect = (answer: number) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
  };
  
  const handleNext = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateRiskProfile();
    }
  };
  
  const handleBack = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const calculateRiskProfile = () => {
    // Calculate risk score based on answers
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
    const maxPossibleScore = totalQuestions * 4; // 4 is the max score per question
    const riskPercentage = (totalScore / maxPossibleScore) * 100;
    
    let riskProfile;
    let description;
    let recommendedFunds;
    
    if (riskPercentage < 25) {
      riskProfile = "Conservative";
      description = "You prefer stability and are uncomfortable with market volatility.";
      recommendedFunds = ["Liquid Funds", "Ultra Short Duration Funds", "Corporate Bond Funds"];
    } else if (riskPercentage < 50) {
      riskProfile = "Moderate Conservative";
      description = "You prioritize preservation of capital but are open to some growth opportunities.";
      recommendedFunds = ["Short Duration Funds", "Banking & PSU Funds", "Conservative Hybrid Funds"];
    } else if (riskPercentage < 75) {
      riskProfile = "Moderate Aggressive";
      description = "You're comfortable with market fluctuations and aim for growth.";
      recommendedFunds = ["Balanced Advantage Funds", "Large Cap Funds", "Multi Cap Funds"];
    } else {
      riskProfile = "Aggressive";
      description = "You prioritize growth and can handle significant market volatility.";
      recommendedFunds = ["Mid & Small Cap Funds", "Thematic/Sectoral Funds", "Focused Equity Funds"];
    }
    
    // Show results
    navigate('/risk-results', { 
      state: { 
        riskProfile,
        riskPercentage,
        description,
        recommendedFunds
      } 
    });
  };
  
  const currentQuestionData = questions.find(q => q.id === currentQuestion);
  
  return (
    <PageContainer title="Risk Profiling" showBackButton>
      <div className="mb-6">
        <Progress value={(currentQuestion / totalQuestions) * 100} className="h-2" />
        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-500">Question {currentQuestion} of {totalQuestions}</span>
          <span className="text-xs font-medium">{(currentQuestion / totalQuestions) * 100}% Complete</span>
        </div>
      </div>
      
      {currentQuestionData && (
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-medium mb-4">{currentQuestionData.question}</h2>
            
            <RadioGroup
              value={answers[currentQuestion]?.toString()}
              onValueChange={(value) => handleAnswerSelect(parseInt(value))}
              className="space-y-3"
            >
              {currentQuestionData.options.map((option) => (
                <div
                  key={option.value}
                  className={`flex items-center space-x-2 border rounded-lg p-3 transition-colors cursor-pointer ${
                    answers[currentQuestion] === option.value
                      ? "border-fundeasy-green bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleAnswerSelect(option.value)}
                >
                  <RadioGroupItem value={option.value.toString()} id={`option-${option.value}`} />
                  <Label htmlFor={`option-${option.value}`} className="cursor-pointer flex-1">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentQuestion === 1}
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!answers[currentQuestion]}
              >
                {currentQuestion === totalQuestions ? "View Results" : "Continue"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="mt-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start">
              <Info className="text-fundeasy-blue mt-0.5 mr-2 h-5 w-5" />
              <p className="text-sm">This risk profiling will help us recommend mutual funds that align with your investment goals and risk tolerance.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default RiskProfiling;
