import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Phone, MapPin, Menu, X, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Shield className="h-8 w-8 text-primary" />
            SafeGuard
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {!user && (
              <>
                <Link
                  to="/"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive("/") ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/login"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive("/login") ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  Login
                </Link>
              </>
            )}
            
            {user && (
              <>
                {user.role === 'citizen' && (
                  <Link
                    to="/mobile-app"
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive("/mobile-app") ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    Mobile App
                  </Link>
                )}
                
                {user.role === 'police' && (
                  <Link
                    to="/police-dashboard"
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive("/police-dashboard") ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    Police Dashboard
                  </Link>
                )}
                
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4" />
                  <span>{user.name}</span>
                </div>
                
                <Button variant="ghost" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </>
            )}
            
            <Button variant="emergency" size="sm">
              Emergency: 911
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {!user && (
                <>
                  <Link
                    to="/"
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive("/")
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-primary hover:bg-muted"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    to="/login"
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive("/login")
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-primary hover:bg-muted"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                </>
              )}
              
              {user && (
                <>
                  {user.role === 'citizen' && (
                    <Link
                      to="/mobile-app"
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        isActive("/mobile-app")
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:text-primary hover:bg-muted"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      Mobile App
                    </Link>
                  )}
                  
                  {user.role === 'police' && (
                    <Link
                      to="/police-dashboard"
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        isActive("/police-dashboard")
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:text-primary hover:bg-muted"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      Police Dashboard
                    </Link>
                  )}
                  
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    Logged in as: {user.name}
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mx-3 mb-2" 
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </Button>
                </>
              )}
              
              <div className="px-3 py-2">
                <Button variant="emergency" size="sm" className="w-full">
                  Emergency: 911
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;