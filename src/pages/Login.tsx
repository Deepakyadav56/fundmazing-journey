
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  
  // Login states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Register states
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerMobile, setRegisterMobile] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive"
      });
      return;
    }
    
    // Mock login - in a real app, you'd call an API
    toast({
      title: "Login Successful",
      description: "Welcome back to FundEasy!"
    });
    navigate('/dashboard');
  };
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation
    if (!registerEmail || !registerMobile || !registerPassword) {
      toast({
        title: "Error",
        description: "Please fill all fields to register",
        variant: "destructive"
      });
      return;
    }
    
    // Mock registration - in a real app, you'd call an API
    toast({
      title: "Registration Successful",
      description: "Please complete your KYC to start investing"
    });
    navigate('/onboarding');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 bg-white shadow-sm">
        <div 
          className="font-bold text-xl text-fundeasy-green cursor-pointer max-w-md mx-auto"
          onClick={() => navigate('/')}
        >
          FundEasy
        </div>
      </header>
      
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password">Password</Label>
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-xs text-fundeasy-green"
                        onClick={() => navigate('/forgot-password')}
                      >
                        Forgot Password?
                      </Button>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </Button>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-fundeasy-green hover:bg-fundeasy-dark-green"
                  >
                    Login <ArrowRight className="ml-2" size={16} />
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="your@email.com"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-mobile">Mobile Number</Label>
                    <Input
                      id="register-mobile"
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={registerMobile}
                      onChange={(e) => setRegisterMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Create Password</Label>
                    <div className="relative">
                      <Input
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="terms" 
                        className="rounded border-gray-300 text-fundeasy-green focus:ring-fundeasy-green"
                        required
                      />
                      <Label htmlFor="terms" className="text-sm font-normal">
                        I agree to the <a href="#" className="text-fundeasy-green">Terms & Conditions</a> and <a href="#" className="text-fundeasy-green">Privacy Policy</a>
                      </Label>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-fundeasy-green hover:bg-fundeasy-dark-green"
                  >
                    Register <ArrowRight className="ml-2" size={16} />
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      <footer className="bg-white py-4 px-6 border-t">
        <div className="max-w-md mx-auto text-center text-sm text-gray-500">
          <p>Mutual fund investments are subject to market risks. Read all scheme related documents carefully.</p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
