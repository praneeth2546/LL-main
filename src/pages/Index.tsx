import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Users, MapPin, CheckCircle } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="px-4 py-12 text-center space-y-8">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
              <Shield className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground">LifeLink</h1>
          <p className="text-xl text-muted-foreground max-w-md mx-auto">
            Connecting communities with civic solutions through transparent issue reporting
          </p>
        </div>

        <div className="space-y-4">
          <Link to="/auth">
            <Button size="lg" className="w-full max-w-sm">
              Get Started
            </Button>
          </Link>
          <div className="flex gap-4 justify-center">
            <Link to="/dashboard">
              <Button variant="outline" size="sm">
                <Users className="w-4 h-4 mr-2" />
                Citizen Demo
              </Button>
            </Link>
            <Link to="/authority-dashboard">
              <Button variant="outline" size="sm">
                <Shield className="w-4 h-4 mr-2" />
                Authority Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="px-4 py-8 space-y-6">
        <div className="grid gap-6">
          <div className="flex items-center gap-4 p-4 bg-card rounded-lg border">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Report Issues Instantly</h3>
              <p className="text-sm text-muted-foreground">
                Photo capture with GPS location for precise reporting
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-card rounded-lg border">
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h3 className="font-semibold">Community Engagement</h3>
              <p className="text-sm text-muted-foreground">
                Upvote issues and track real-time status updates
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-card rounded-lg border">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold">Transparent Resolution</h3>
              <p className="text-sm text-muted-foreground">
                Track progress from report to resolution with authorities
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
