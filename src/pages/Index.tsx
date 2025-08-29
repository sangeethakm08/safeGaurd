import { Link } from "react-router-dom";
import Navigation from "@/components/Layout/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Smartphone, MapPin, AlertTriangle, Clock, Users } from "lucide-react";
import heroImage from "@/assets/hero-safety.jpg";
import policeDashboardImage from "@/assets/police-dashboard.jpg";

const Index = () => {
  return (
    <>
      <Navigation />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/70"></div>
          </div>
          
          <div className="relative container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                SafeGuard
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl mx-auto">
                Smart Women's Safety Platform - Instant emergency alerts with GPS location sharing to nearby police stations
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button variant="emergency" size="xl" asChild>
                  <Link to="/login">
                    <Smartphone className="mr-2 h-5 w-5" />
                    Get Started
                  </Link>
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <Link to="/login">
                    <Shield className="mr-2 h-5 w-5" />
                    Emergency Services Login
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <Card className="p-6 bg-card/80 backdrop-blur-sm">
                  <AlertTriangle className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="text-2xl font-bold">24/7</h3>
                  <p className="text-muted-foreground">Emergency Response</p>
                </Card>
                <Card className="p-6 bg-card/80 backdrop-blur-sm">
                  <Clock className="h-8 w-8 text-secondary mx-auto mb-2" />
                  <h3 className="text-2xl font-bold">&lt;2min</h3>
                  <p className="text-muted-foreground">Average Response</p>
                </Card>
                <Card className="p-6 bg-card/80 backdrop-blur-sm">
                  <Users className="h-8 w-8 text-accent mx-auto mb-2" />
                  <h3 className="text-2xl font-bold">98%</h3>
                  <p className="text-muted-foreground">Success Rate</p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">How SafeGuard Works</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A comprehensive emergency response system connecting users with law enforcement
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Mobile App */}
              <div>
                <Card className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Smartphone className="h-10 w-10 text-primary" />
                    <h3 className="text-2xl font-bold">Mobile Safety App</h3>
                  </div>
                  <ul className="space-y-4 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-accent mt-0.5" />
                      <span>One-touch emergency panic button</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-secondary mt-0.5" />
                      <span>Automatic GPS location sharing</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-primary mt-0.5" />
                      <span>Real-time alert notifications</span>
                    </li>
                  </ul>
                  <Button variant="emergency" className="mt-6" asChild>
                    <Link to="/login">Get Started</Link>
                  </Button>
                </Card>
              </div>

              {/* Police Dashboard */}
              <div>
                <Card className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Shield className="h-10 w-10 text-secondary" />
                    <h3 className="text-2xl font-bold">Police Dashboard</h3>
                  </div>
                  <div 
                    className="rounded-lg mb-6 h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${policeDashboardImage})` }}
                  ></div>
                  <ul className="space-y-4 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <span>Interactive emergency map with live alerts</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-accent mt-0.5" />
                      <span>Real-time incident management</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-secondary mt-0.5" />
                      <span>Response coordination & tracking</span>
                    </li>
                  </ul>
                  <Button variant="police" className="mt-6" asChild>
                    <Link to="/login">Police Login</Link>
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience the future of emergency response with our comprehensive safety platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="emergency" size="xl" asChild>
                <Link to="/login">
                  <Smartphone className="mr-2 h-5 w-5" />
                  Download App
                </Link>
              </Button>
              <Button variant="outline" size="xl">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Index;
