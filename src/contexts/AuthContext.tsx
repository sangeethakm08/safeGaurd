import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  role: 'citizen' | 'police';
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'citizen' | 'police') => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers = [
  { id: '1', email: 'citizen@demo.com', password: 'demo123', role: 'citizen' as const, name: 'John Doe' },
  { id: '2', email: 'police@demo.com', password: 'demo123', role: 'police' as const, name: 'Officer Smith' },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('safeguard-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: 'citizen' | 'police'): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => 
      u.email === email && 
      u.password === password && 
      u.role === role
    );

    if (foundUser) {
      const userData = { 
        id: foundUser.id, 
        email: foundUser.email, 
        role: foundUser.role, 
        name: foundUser.name 
      };
      setUser(userData);
      localStorage.setItem('safeguard-user', JSON.stringify(userData));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('safeguard-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};