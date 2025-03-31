
import React, { useState } from 'react';
import { format, addYears } from 'date-fns';
import { PlusCircle, TrendingUp, Calendar, Edit, Trash2 } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Goal } from '@/types';

// Mock goals data
const mockGoals: Goal[] = [
  {
    id: 'goal-1',
    name: 'Dream Home',
    targetAmount: 5000000,
    currentAmount: 1200000,
    targetDate: addYears(new Date(), 7),
    createdAt: new Date(2022, 5, 10),
  },
  {
    id: 'goal-2',
    name: 'World Trip',
    targetAmount: 1000000,
    currentAmount: 450000,
    targetDate: addYears(new Date(), 2),
    createdAt: new Date(2023, 1, 15),
  },
  {
    id: 'goal-3',
    name: 'Children Education',
    targetAmount: 2500000,
    currentAmount: 350000,
    targetDate: addYears(new Date(), 10),
    createdAt: new Date(2023, 8, 5),
  },
];

const Goals = () => {
  const { toast } = useToast();
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: 0,
    targetYears: 5,
  });
  const [editGoal, setEditGoal] = useState<Goal | null>(null);
  const [deleteGoalId, setDeleteGoalId] = useState<string | null>(null);
  
  const handleAddGoal = () => {
    if (!newGoal.name || newGoal.targetAmount <= 0) {
      toast({
        title: "Invalid input",
        description: "Please enter a name and a valid target amount.",
        variant: "destructive",
      });
      return;
    }
    
    const goal: Goal = {
      id: `goal-${goals.length + 1}-${Date.now()}`,
      name: newGoal.name,
      targetAmount: newGoal.targetAmount,
      currentAmount: 0,
      targetDate: addYears(new Date(), newGoal.targetYears),
      createdAt: new Date(),
    };
    
    setGoals([...goals, goal]);
    setNewGoal({ name: '', targetAmount: 0, targetYears: 5 });
    
    toast({
      title: "Goal created",
      description: `Your "${goal.name}" goal has been created.`,
    });
  };
  
  const handleUpdateGoal = () => {
    if (!editGoal) return;
    
    setGoals(goals.map(g => g.id === editGoal.id ? editGoal : g));
    setEditGoal(null);
    
    toast({
      title: "Goal updated",
      description: `Your "${editGoal.name}" goal has been updated.`,
    });
  };
  
  const handleDeleteGoal = () => {
    if (!deleteGoalId) return;
    
    const goalToDelete = goals.find(g => g.id === deleteGoalId);
    setGoals(goals.filter(g => g.id !== deleteGoalId));
    setDeleteGoalId(null);
    
    toast({
      title: "Goal deleted",
      description: `Your "${goalToDelete?.name}" goal has been deleted.`,
    });
  };
  
  return (
    <PageContainer title="Investment Goals" showBackButton>
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">Track your financial goals and progress</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-fundeasy-green hover:bg-fundeasy-dark-green">
              <PlusCircle size={16} className="mr-1" /> New Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Goal</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-medium">Goal Name</label>
                <Input
                  placeholder="e.g. Dream Home, World Trip"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                  className="mt-1"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Target Amount (₹)</label>
                <Input
                  type="number"
                  placeholder="e.g. 1000000"
                  value={newGoal.targetAmount || ''}
                  onChange={(e) => setNewGoal({...newGoal, targetAmount: Number(e.target.value)})}
                  className="mt-1"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Target Years</label>
                <Input
                  type="number"
                  placeholder="e.g. 5"
                  value={newGoal.targetYears}
                  onChange={(e) => setNewGoal({...newGoal, targetYears: Number(e.target.value)})}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Target Date: {format(addYears(new Date(), newGoal.targetYears), 'MMM dd, yyyy')}
                </p>
              </div>
              
              {newGoal.targetAmount > 0 && newGoal.targetYears > 0 && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium">Monthly SIP Required</p>
                  <p className="text-lg font-semibold text-fundeasy-green">
                    ₹{Math.round(newGoal.targetAmount / (newGoal.targetYears * 12)).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    Based on 12% annual returns
                  </p>
                </div>
              )}
            </div>
            
            <DialogFooter className="mt-6">
              <Button 
                variant="outline"
                onClick={() => setNewGoal({ name: '', targetAmount: 0, targetYears: 5 })}
              >
                Cancel
              </Button>
              <Button 
                className="bg-fundeasy-green hover:bg-fundeasy-dark-green"
                onClick={handleAddGoal}
              >
                Create Goal
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="space-y-4 mt-6">
        {goals.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">You haven't set any goals yet.</p>
            <p className="text-sm text-gray-500 mt-2">Click "New Goal" to start planning your financial future.</p>
          </div>
        ) : (
          goals.map((goal) => {
            const progress = Math.round((goal.currentAmount / goal.targetAmount) * 100);
            const yearsLeft = Math.round((goal.targetDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 365));
            
            return (
              <Card key={goal.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{goal.name}</h3>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <Calendar size={14} className="mr-1" />
                        <span>Target: {format(goal.targetDate, 'MMM yyyy')}</span>
                        <span className="mx-1">•</span>
                        <span>{yearsLeft} {yearsLeft === 1 ? 'year' : 'years'} left</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => setEditGoal(goal)}
                          >
                            <Edit size={15} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Goal</DialogTitle>
                          </DialogHeader>
                          
                          {editGoal && (
                            <div className="space-y-4 mt-4">
                              <div>
                                <label className="text-sm font-medium">Goal Name</label>
                                <Input
                                  value={editGoal.name}
                                  onChange={(e) => setEditGoal({...editGoal, name: e.target.value})}
                                  className="mt-1"
                                />
                              </div>
                              
                              <div>
                                <label className="text-sm font-medium">Target Amount (₹)</label>
                                <Input
                                  type="number"
                                  value={editGoal.targetAmount}
                                  onChange={(e) => setEditGoal({...editGoal, targetAmount: Number(e.target.value)})}
                                  className="mt-1"
                                />
                              </div>
                              
                              <div>
                                <label className="text-sm font-medium">Current Amount (₹)</label>
                                <Input
                                  type="number"
                                  value={editGoal.currentAmount}
                                  onChange={(e) => setEditGoal({...editGoal, currentAmount: Number(e.target.value)})}
                                  className="mt-1"
                                />
                              </div>
                              
                              <div>
                                <label className="text-sm font-medium">Target Date</label>
                                <Input
                                  type="date"
                                  value={format(editGoal.targetDate, 'yyyy-MM-dd')}
                                  onChange={(e) => setEditGoal({
                                    ...editGoal, 
                                    targetDate: e.target.value ? new Date(e.target.value) : editGoal.targetDate
                                  })}
                                  className="mt-1"
                                />
                              </div>
                            </div>
                          )}
                          
                          <DialogFooter className="mt-6">
                            <Button 
                              variant="outline"
                              onClick={() => setEditGoal(null)}
                            >
                              Cancel
                            </Button>
                            <Button 
                              className="bg-fundeasy-green hover:bg-fundeasy-dark-green"
                              onClick={handleUpdateGoal}
                            >
                              Update Goal
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8 rounded-full text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => setDeleteGoalId(goal.id)}
                          >
                            <Trash2 size={15} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Goal</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete your "{goal.name}" goal? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={handleDeleteGoal}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span className="font-medium">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    
                    <div className="flex justify-between mt-3">
                      <div>
                        <p className="text-xs text-gray-500">Current</p>
                        <p className="font-medium">₹{goal.currentAmount.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Target</p>
                        <p className="font-medium">₹{goal.targetAmount.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Monthly SIP needed</p>
                        <p className="font-medium">₹{Math.round(
                          (goal.targetAmount - goal.currentAmount) / 
                          (yearsLeft * 12)
                        ).toLocaleString()}</p>
                      </div>
                      <Button size="sm" className="bg-fundeasy-green hover:bg-fundeasy-dark-green">
                        <TrendingUp size={14} className="mr-1" /> Start SIP
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </PageContainer>
  );
};

export default Goals;
