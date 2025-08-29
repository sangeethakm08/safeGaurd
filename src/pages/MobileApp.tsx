import Navigation from "@/components/Layout/Navigation";
import PanicButton from "@/components/MobileApp/PanicButton";
import { Card } from "@/components/ui/card";
import { Smartphone, Shield, MapPin } from "lucide-react";

const MobileApp = () => {
  return (
    <>
      <Navigation />
      <div className="pt-16 min-h-screen bg-gradient-to-br from-background to-muted/50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Smartphone className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold">Mobile Safety App</h1>
              </div>
              <p className="text-muted-foreground">
                Your personal safety companion with instant emergency alert system
              </p>
            </div>

            {/* Mobile App Preview */}
            <Card className="p-6 bg-gradient-to-br from-card to-muted/20 shadow-lg">
              <PanicButton />
            </Card>

            {/* Features */}
            <div className="grid grid-cols-1 gap-4 mt-8">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-accent" />
                  <div>
                    <h3 className="font-semibold">24/7 Protection</h3>
                    <p className="text-sm text-muted-foreground">Always connected to emergency services</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-secondary" />
                  <div>
                    <h3 className="font-semibold">GPS Location</h3>
                    <p className="text-sm text-muted-foreground">Automatic location sharing with authorities</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileApp;