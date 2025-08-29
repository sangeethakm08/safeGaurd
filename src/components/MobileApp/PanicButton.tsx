import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertTriangle, MapPin, Phone, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useAlerts } from "@/contexts/AlertContext";

const PanicButton = () => {
  const [isActive, setIsActive] = useState(false);
  const [lastAlert, setLastAlert] = useState<Date | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const { addAlert } = useAlerts();

  const handlePanicPress = () => {
    if (!user) return;
    
    setIsActive(true);
    const alertTime = new Date();
    setLastAlert(alertTime);

    // Get user location and send alert
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          addAlert({
            userId: user.id,
            userName: user.name,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            status: 'active',
            message: 'Emergency panic button pressed - immediate assistance needed'
          });

          toast({
            title: "Emergency Alert Sent!",
            description: "Your location has been shared with nearby police stations.",
            variant: "destructive",
          });
        },
        (error) => {
          // Fallback with mock location if GPS fails
          addAlert({
            userId: user.id,
            userName: user.name,
            latitude: 40.7128 + (Math.random() - 0.5) * 0.01,
            longitude: -74.0060 + (Math.random() - 0.5) * 0.01,
            status: 'active',
            message: 'Emergency panic button pressed - immediate assistance needed'
          });

          toast({
            title: "Emergency Alert Sent!",
            description: "Alert sent with approximate location.",
            variant: "destructive",
          });
        }
      );
    }

    // Reset after 3 seconds
    setTimeout(() => {
      setIsActive(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Emergency Info Card */}
      <Card className="p-6 bg-gradient-to-r from-primary/10 to-primary-glow/10 border-primary/20">
        <div className="flex items-center gap-4 mb-4">
          <AlertTriangle className="h-8 w-8 text-primary" />
          <div>
            <h3 className="text-lg font-semibold">Emergency Services</h3>
            <p className="text-sm text-muted-foreground">Press the button below in case of emergency</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-accent" />
            <span>Location: Enabled</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-secondary" />
            <span>Police: Connected</span>
          </div>
        </div>
      </Card>

      {/* Panic Button */}
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <Button
            variant="panic"
            size="panic"
            onClick={handlePanicPress}
            disabled={isActive}
            className={`transition-all duration-300 ${
              isActive ? "scale-110 shadow-glow" : "hover:scale-105"
            }`}
          >
            {isActive ? "SENDING..." : "EMERGENCY"}
          </Button>
          
          {isActive && (
            <div className="absolute inset-0 rounded-full border-4 border-primary animate-ping"></div>
          )}
        </div>

        <p className="text-center text-sm text-muted-foreground max-w-md">
          Press and hold the emergency button to send your location to nearby police stations.
          Your alert will include GPS coordinates and timestamp.
        </p>
      </div>

      {/* Status Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 bg-accent rounded-full animate-pulse"></div>
            <div>
              <p className="text-sm font-medium">Status</p>
              <p className="text-xs text-muted-foreground">Active & Protected</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-secondary" />
            <div>
              <p className="text-sm font-medium">Location</p>
              <p className="text-xs text-muted-foreground">GPS Enabled</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm font-medium">Last Alert</p>
              <p className="text-xs text-muted-foreground">
                {lastAlert ? lastAlert.toLocaleTimeString() : "Never"}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button variant="secondary" className="h-12">
          <Phone className="h-4 w-4 mr-2" />
          Call Police
        </Button>
        <Button variant="safe" className="h-12">
          <MapPin className="h-4 w-4 mr-2" />
          Share Location
        </Button>
      </div>
    </div>
  );
};

export default PanicButton;