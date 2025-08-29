import Navigation from "@/components/Layout/Navigation";
import AlertsMap from "@/components/Police/AlertsMap";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, Users, Clock } from "lucide-react";

const PoliceDashboard = () => {
  return (
    <>
      <Navigation />
      <div className="pt-16 min-h-screen bg-gradient-to-br from-background to-muted/50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-secondary" />
              <h1 className="text-3xl font-bold">Police Emergency Dashboard</h1>
              <Badge variant="secondary" className="ml-auto bg-gradient-to-r from-secondary to-blue-600 text-secondary-foreground">
                Live System
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Real-time emergency alert monitoring and response coordination
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Alerts</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-secondary" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Response Time</p>
                  <p className="text-2xl font-bold">3.2m</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-accent" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Resolved Today</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Units Available</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Dashboard */}
          <AlertsMap />
        </div>
      </div>
    </>
  );
};

export default PoliceDashboard;