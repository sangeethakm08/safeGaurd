import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, MapPin, Clock, User, CheckCircle, Map } from 'lucide-react';
import { useAlerts } from '@/contexts/AlertContext';

const AlertsMap = () => {
  const { alerts, resolveAlert } = useAlerts();

  const getStatusBadge = (status: string) => {
    return (
      <Badge variant={status === 'active' ? 'destructive' : 'secondary'} className="text-xs">
        {status.toUpperCase()}
      </Badge>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
      {/* Alerts List */}
      <div className="lg:col-span-1 space-y-4 overflow-y-auto">
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Active Alerts ({alerts.filter(a => a.status === 'active').length})
          </h3>
          
          <div className="space-y-3">
            {alerts.length === 0 ? (
              <div className="text-center p-8 text-muted-foreground">
                <AlertTriangle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No alerts at this time.</p>
              </div>
            ) : (
              alerts.map((alert) => (
                <Card
                  key={alert.id}
                  className="p-3 transition-all hover:shadow-md"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{alert.userName}</span>
                    </div>
                    {getStatusBadge(alert.status)}
                  </div>
                  
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{alert.latitude.toFixed(4)}, {alert.longitude.toFixed(4)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{new Date(alert.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <p className="text-xs mt-2 text-muted-foreground">{alert.message}</p>
                  
                  {alert.status === 'active' && (
                    <Button
                      size="sm"
                      variant="secondary"
                      className="w-full mt-3"
                      onClick={() => resolveAlert(alert.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Mark as Resolved
                    </Button>
                  )}
                </Card>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Map */}
      <div className="lg:col-span-2">
        <Card className="p-4 h-full">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-secondary" />
            Emergency Alerts Map
          </h3>
          
          <div className="h-[calc(100%-4rem)] rounded-lg overflow-hidden bg-gradient-to-br from-secondary/10 to-primary/10 flex items-center justify-center border border-border">
            <div className="text-center space-y-4">
              <Map className="h-16 w-16 mx-auto text-muted-foreground" />
              <div>
                <h4 className="text-lg font-semibold">Interactive Emergency Map</h4>
                <p className="text-muted-foreground">
                  {alerts.length === 0 ? 'No alerts to display' : `Showing ${alerts.length} emergency alerts`}
                </p>
                {alerts.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 max-w-2xl">
                    {alerts.map((alert) => (
                      <Card
                        key={alert.id}
                        className="p-3 transition-all hover:shadow-md"
                      >
                        <div className="text-center space-y-2">
                          <div className="flex items-center justify-center gap-1">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">{alert.userName}</span>
                          </div>
                          <div className="flex justify-center">
                            {getStatusBadge(alert.status)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            <div>{alert.latitude.toFixed(2)}, {alert.longitude.toFixed(2)}</div>
                            <div>{new Date(alert.timestamp).toLocaleTimeString()}</div>
                          </div>
                          {alert.status === 'active' && (
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => resolveAlert(alert.id)}
                              className="text-xs px-2 py-1 h-6"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Resolve
                            </Button>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AlertsMap;