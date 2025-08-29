import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Shield, Phone } from 'lucide-react';

interface LoginFormProps {
  userType: 'citizen' | 'police';
}

const LoginForm: React.FC<LoginFormProps> = ({ userType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await login(email, password, userType);
    
    if (success) {
      toast({
        title: "Login successful",
        description: `Welcome back!`,
      });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    }
  };

  const demoCredentials = userType === 'citizen' 
    ? { email: 'citizen@demo.com', password: 'demo123' }
    : { email: 'police@demo.com', password: 'demo123' };

  return (
    <Card className="w-full max-w-md mx-auto p-6">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          {userType === 'citizen' ? (
            <Phone className="h-8 w-8 text-primary" />
          ) : (
            <Shield className="h-8 w-8 text-secondary" />
          )}
          <h2 className="text-2xl font-bold">
            {userType === 'citizen' ? 'Citizen Login' : 'Police Login'}
          </h2>
        </div>
        <p className="text-muted-foreground">
          {userType === 'citizen' 
            ? 'Access your personal safety app' 
            : 'Access the emergency response dashboard'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
          variant={userType === 'citizen' ? 'default' : 'secondary'}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <p className="text-sm font-medium mb-2">Demo Credentials:</p>
        <p className="text-xs text-muted-foreground">
          Email: {demoCredentials.email}<br />
          Password: {demoCredentials.password}
        </p>
      </div>
    </Card>
  );
};

export default LoginForm;