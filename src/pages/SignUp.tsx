import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    craftType: "",
    region: "",
    skill: "",
    description: ""
  });

  const craftTypes = [
    "Pottery & Ceramics",
    "Textiles & Weaving", 
    "Woodworking",
    "Jewelry Making",
    "Metalwork",
    "Leather Crafting",
    "Glass Blowing",
    "Painting & Art",
    "Sculpture",
    "Other"
  ];

  const skillLevels = [
    "Beginner (0-2 years)",
    "Intermediate (3-5 years)",
    "Advanced (6-10 years)",
    "Expert (10+ years)"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically save to Supabase
    // For now, we'll simulate success and redirect
    toast({
      title: "Welcome to Roots&Rise!",
      description: "Your account has been created successfully."
    });
    
    // Simulate redirect to dashboard after signup
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-earth py-8 px-4">
      <div className="container mx-auto max-w-2xl">
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
            <CardTitle className="text-2xl font-bold text-primary">Join Roots&Rise</CardTitle>
            <p className="text-muted-foreground">Create your artisan seller account</p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="region">Region/Location</Label>
                  <Input
                    id="region"
                    value={formData.region}
                    onChange={(e) => handleInputChange("region", e.target.value)}
                    placeholder="City, State/Province, Country"
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Craft Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Craft Information</h3>
                
                <div>
                  <Label htmlFor="craftType">Primary Craft Type *</Label>
                  <Select onValueChange={(value) => handleInputChange("craftType", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select your craft specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      {craftTypes.map((craft) => (
                        <SelectItem key={craft} value={craft}>
                          {craft}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="skill">Skill Level *</Label>
                  <Select onValueChange={(value) => handleInputChange("skill", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      {skillLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">About Your Craft (Optional)</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Tell us about your craft journey and what makes your work unique..."
                    className="mt-1"
                    rows={4}
                  />
                </div>
              </div>

              {/* Account Security */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Account Security</h3>
                
                <div>
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-warm hover:opacity-90 text-white font-semibold h-12"
                size="lg"
              >
                Create My Artisan Account
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-primary hover:underline font-medium"
                >
                  Log in here
                </button>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;