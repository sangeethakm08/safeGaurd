import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Alert {
  id: string;
  userId: string;
  userName: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  status: 'active' | 'resolved';
  message?: string;
}

interface AlertContextType {
  alerts: Alert[];
  addAlert: (alert: Omit<Alert, 'id' | 'timestamp'>) => void;
  resolveAlert: (alertId: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    // Load alerts from localStorage on mount
    const storedAlerts = localStorage.getItem('safeguard-alerts');
    if (storedAlerts) {
      setAlerts(JSON.parse(storedAlerts));
    }
  }, []);

  useEffect(() => {
    // Save alerts to localStorage whenever alerts change
    localStorage.setItem('safeguard-alerts', JSON.stringify(alerts));
  }, [alerts]);

  const addAlert = (alertData: Omit<Alert, 'id' | 'timestamp'>) => {
    const newAlert: Alert = {
      ...alertData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    
    setAlerts(prev => [newAlert, ...prev]);
  };

  const resolveAlert = (alertId: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, status: 'resolved' as const }
          : alert
      )
    );
  };

  return (
    <AlertContext.Provider value={{ alerts, addAlert, resolveAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlerts = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlerts must be used within an AlertProvider');
  }
  return context;
};