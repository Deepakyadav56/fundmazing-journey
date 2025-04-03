import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Car, Home, Graduation, Heart, Briefcase, Trash2, Calendar, Target, Edit, CheckCircle } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Goal } from '@/types';

// Mock goals
const initialGoals: Goal[] = [
  {
    id: '1',
    name: 'Dream Home',
    targetAmount: 5000000,
    currentAmount: 1250000,
    targetDate: new Date(2030, 0, 1),
    createdAt: new Date(2022, 3, 10),
  },
  {
    id: '2',
    name: 'Child Education',
    targetAmount: 2000000,
    currentAmount: 500000,
    targetDate: new Date(2028, 5, 1),
    createdAt: new Date(2021, 7, 15),
  },
];

// Pre-defined goal templates
const goalTemplates = [
  { 
    id: 'home',
    name: 'Buy a Home',
    icon: <Home className="h-5 w-5" />,
    color: 'bg-blue-100 text-blue-600',
    suggestedAmount: 5000000,
    suggestedYears: 7,
  },
  { 
    id: 'car',
    name: 'Buy a Car',
    icon: <Car className="h-5 w-5" />,
    color: 'bg-green-100 text-green-600',
    suggestedAmount: 1000000,
    suggestedYears: 3,
  },
  { 
    id: 'education',
    name: 'Child Education',
    icon: <Graduation className="h-5 w-5" />,
    color: 'bg-yellow-100 text-yellow-600',
    suggestedAmount: 2000000,
    suggestedYears: 5,
  },
  { 
    id: 'retirement',
    name: 'Retirement',
    icon: <Heart className="h-5 w-5" />,
    color: 'bg-red-100 text-red-600',
    suggestedAmount: 10000000,
    suggestedYears: 20,
  },
  { 
    id: 'wedding',
    name: 'Wedding',
    icon: <Heart className="h-5 w-5" />,
    color: 'bg-purple-100 text-purple-600',
    suggestedAmount: 1500000,
    suggestedYears: 4,
  },
  { 
    id: 'vacation',
    name: 'Vacation',
    icon: <Briefcase className="h-5 w-5" />,
    color: 'bg-indigo-100 text-indigo-600',
    suggestedAmount: 300000,
    suggestedYears: 1,
  },
];

const GoalBasedInvesting = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: 0,
    targetDate: '',
  });
  
  const handleTemplateSelect = (templateId: string) => {
    const template = goalTemplates.find(t => t.id === templateId);
    if (template) {
      const targetDate = new Date();
      targetDate.setFullYear(targetDate.getFullYear() + template.suggestedYears);
      
      setSelectedTemplate(templateId);
      setNewGoal({
        name: template.name,
        targetAmount: template.suggestedAmount,
        targetDate: targetDate.toISOString().slice(0, 10),
      });
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewGoal({
      ...newGoal,
      [name]: name === 'targetAmount' ? Number(value) : value,
    });
  };
  
  const addGoal = () => {
    // Validation
    if (!newGoal.name || !newGoal.targetAmount || !newGoal.targetDate) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    
    const newGoalObj: Goal = {
      id: Date.now().toString(),
      name: newGoal.name,
      targetAmount: newGoal.targetAmount,
      currentAmount: 0,
      targetDate: new Date(newGoal.targetDate),
      createdAt: new Date(),
    };
    
    setGoals([...goals, newGoalObj]);
    setIsAddingGoal(false);
    setSelectedTemplate(null);
    setNewGoal({
      name: '',
      targetAmount: 0,
      targetDate: '',
    });
    
    toast({
      title: "Goal Created",
      description: `Your goal "${newGoal.name}" has been created successfully`,
    });
  };
  
  const deleteGoal = (goalId: string) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
    toast({
      title: "Goal Deleted",
      description: "Your goal has been deleted successfully",
    });
  };
  
  const calculateProgress = (goal: Goal) => {
    return (goal.currentAmount / goal.targetAmount) * 100;
  };
  
  const getTimeRemaining = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    
    if (years > 0) {
      return `${years} ${years === 1 ? 'year' : 'years'} ${months} ${months === 1 ? 'month' : 'months'}`;
    }
    return `${months} ${months === 1 ? 'month' : 'months'}`;
  };
  
  const getGoalIcon = (goalName: string) => {
    const template = goalTemplates.find(t => t.name === goalName);
    if (template) {
      return (
        <div className={`w-10 h-10 rounded-full ${template.color} flex items-center justify-center`}>
          {template.icon}
        </div>
      );
    }
    
    // Default icon
    return (
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
        <Target className="h-5 w-5 text-gray-600" />
      </div>
    );
  };
  
  return (
    <PageContainer title="Financial Goals" showBackButton>
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Create and track your financial goals with customized investment plans
        </p>
      </div>
      
      {goals.length === 0 ? (
        <Card className="text-center py-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <Target size={24} className="text-gray-400" />
            </div>
          </div>
          <h2 className="text-lg font-medium mb-2">No Goals Yet</h2>
          <p className="text-gray-500 mb-4">Create a financial goal to get personalized recommendations</p>
          <div className="px-4">
            <Button onClick={() => setIsAddingGoal(true)}>Create Goal</Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-4 mb-6">
          {goals.map((goal) => (
            <Card key={goal.id}>
              <CardContent className="p-4">
                <div className="flex gap-3">
                  {getGoalIcon(goal.name)}
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{goal.name}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                          <Calendar size={12} className="inline mr-1" />
                          {goal.targetDate.toLocaleDateString()} 
                          <span className="ml-1">({getTimeRemaining(goal.targetDate)} left)</span>
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 p-1 h-auto"
                        onClick={() => deleteGoal(goal.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Progress</span>
                        <span className="font-medium">{calculateProgress(goal).toFixed(1)}%</span>
                      </div>
                      <Progress value={calculateProgress(goal)} className="h-2" />
                    </div>
                    
                    <div className="flex justify-between mt-3 text-sm">
                      <div>
                        <p className="text-gray-500">Current</p>
                        <p className="font-medium">₹{goal.currentAmount.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-500">Target</p>
                        <p className="font-medium">₹{goal.targetAmount.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="bg-fundeasy-light-green rounded-md p-2 mt-3 text-xs">
                      <p className="font-medium text-fundeasy-green">Monthly SIP needed: ₹15,000</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 px-4 py-2 flex justify-between items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-8"
                  onClick={() => navigate('/goal-details/' + goal.id)}
                >
                  View Details
                </Button>
                <Button 
                  variant="shaded"
                  size="sm"
                  className="text-xs h-8"
                  onClick={() => navigate('/goal-invest/' + goal.id)}
                >
                  Invest for this Goal
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      <Button 
        className="w-full mb-8"
        onClick={() => setIsAddingGoal(true)}
      >
        <Plus size={16} className="mr-1" /> Create New Goal
      </Button>
      
      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium mb-2">Why Create Financial Goals?</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-start">
              <div className="w-5 h-5 rounded-full bg-fundeasy-light-green flex items-center justify-center mr-2 mt-0.5">
                <CheckCircle className="h-3 w-3 text-fundeasy-green" />
              </div>
              <span>Get personalized fund recommendations for each goal</span>
            </li>
            <li className="flex items-start">
              <div className="w-5 h-5 rounded-full bg-fundeasy-light-green flex items-center justify-center mr-2 mt-0.5">
                <CheckCircle className="h-3 w-3 text-fundeasy-green" />
              </div>
              <span>Track progress and stay motivated</span>
            </li>
            <li className="flex items-start">
              <div className="w-5 h-5 rounded-full bg-fundeasy-light-green flex items-center justify-center mr-2 mt-0.5">
                <CheckCircle className="h-3 w-3 text-fundeasy-green" />
              </div>
              <span>Create an investment plan with the right time horizon</span>
            </li>
          </ul>
        </CardContent>
      </Card>
      
      {/* Add Goal Sheet */}
      <Sheet open={isAddingGoal} onOpenChange={setIsAddingGoal}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Create New Goal</SheetTitle>
          </SheetHeader>
          
          <div className="space-y-6 py-6">
            <div>
              <h3 className="text-sm font-medium mb-3">Choose a goal template</h3>
              <RadioGroup
                value={selectedTemplate || ""}
                onValueChange={handleTemplateSelect}
                className="grid grid-cols-2 gap-2"
              >
                {goalTemplates.map((template) => (
                  <div
                    key={template.id}
                    className={`flex flex-col items-center border rounded-lg p-3 cursor-pointer transition-colors ${
                      selectedTemplate === template.id
                        ? "border-fundeasy-blue bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    <RadioGroupItem
                      value={template.id}
                      id={`template-${template.id}`}
                      className="sr-only"
                    />
                    <div className={`w-10 h-10 rounded-full ${template.color} flex items-center justify-center mb-1`}>
                      {template.icon}
                    </div>
                    <Label htmlFor={`template-${template.id}`} className="text-xs text-center cursor-pointer">
                      {template.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Goal Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={newGoal.name}
                  onChange={handleInputChange}
                  placeholder="Enter goal name" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="targetAmount">Target Amount (₹)</Label>
                <Input 
                  id="targetAmount" 
                  name="targetAmount" 
                  type="number"
                  value={newGoal.targetAmount || ''}
                  onChange={handleInputChange}
                  placeholder="Enter target amount" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="targetDate">Target Date</Label>
                <Input 
                  id="targetDate" 
                  name="targetDate" 
                  type="date"
                  value={newGoal.targetDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().slice(0, 10)}
                />
              </div>
            </div>
          </div>
          
          <SheetFooter>
            <Button variant="outline" onClick={() => setIsAddingGoal(false)}>
              Cancel
            </Button>
            <Button onClick={addGoal}>
              Create Goal
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </PageContainer>
  );
};

export default GoalBasedInvesting;
