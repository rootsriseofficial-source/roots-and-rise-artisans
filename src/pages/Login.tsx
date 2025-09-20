import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically authenticate with Supabase
    // For now, we'll simulate success and redirect
    toast({
      title: "Welcome back!",
      description: "You have successfully logged in."
    });
    
    // Simulate redirect to dashboard after login
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-earth flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Button>

        <Card className="shadow-strong">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-primary">Welcome Back</CardTitle>
            <p className="text-muted-foreground">Sign in to your artisan account</p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="mt-1"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-warm hover:opacity-90 text-white font-semibold h-12"
                size="lg"
              >
                Sign In
              </Button>

              <div className="text-center space-y-2">
                <button
                  type="button"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot your password?
                </button>
                
                <p className="text-sm text-muted-foreground">
                  New to Roots&Rise?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/signup")}
                    className="text-primary hover:underline font-medium"
                  >
                    Create an account
                  </button>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;