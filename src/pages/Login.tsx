import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from '@/components/Auth/LoginForm';
import { Shield } from 'lucide-react';

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold">SafeGuard</h1>
          </div>
          <p className="text-muted-foreground">
            Emergency Response System
          </p>
        </div>

        {/* Login Tabs */}
        <Tabs defaultValue="citizen" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="citizen">Citizen</TabsTrigger>
            <TabsTrigger value="police">Police</TabsTrigger>
          </TabsList>
          
          <TabsContent value="citizen">
            <LoginForm userType="citizen" />
          </TabsContent>
          
          <TabsContent value="police">
            <LoginForm userType="police" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;