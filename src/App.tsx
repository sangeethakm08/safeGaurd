import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient},
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AlertProvider } from "@/contexts/AlertContext";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import MobileApp from "./pages/MobileApp";
import PoliceDashboard from "./pages/PoliceDashboard";  
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to={user.role === 'citizen' ? '/mobile-app' : '/police-dashboard'} replace /> : <Login />} />
      <Route path="/" element={user ? <Navigate to={user.role === 'citizen' ? '/mobile-app' : '/police-dashboard'} replace /> : <Index />} />
      <Route 
        path="/mobile-app" 
        element={
          <ProtectedRoute allowedRoles={['citizen']}>
            <MobileApp />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/police-dashboard" 
        element={
          <ProtectedRoute allowedRoles={['police']}>
            <PoliceDashboard />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <AlertProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AlertProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
