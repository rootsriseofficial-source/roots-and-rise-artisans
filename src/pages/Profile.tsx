import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Save, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  
  // Mock user data - in real app, this would come from Supabase
  const [profileData, setProfileData] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    region: "Portland, Oregon, USA",
    craftType: "Pottery & Ceramics",
    skill: "Advanced (6-10 years)",
    description: "I've been creating handcrafted pottery for over 8 years, specializing in traditional techniques with modern designs. My pieces are inspired by nature and sustainable living.",
    avatar: ""
  });

  const [isEditing, setIsEditing] = useState(false);

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

  const handleSave = () => {
    // Here you would update in Supabase
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully."
    });
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6 md:p-8 pb-24 md:pb-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground">Manage your artisan profile and account settings</p>
        </div>
        <Button 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={isEditing ? "bg-gradient-warm hover:opacity-90" : ""}
        >
          {isEditing ? (
            <>
              <Save size={18} className="mr-2" />
              Save Changes
            </>
          ) : (
            "Edit Profile"
          )}
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Picture & Basic Info */}
        <Card className="lg:col-span-1 shadow-medium">
          <CardHeader className="text-center">
            <div className="relative mx-auto">
              <Avatar className="w-24 h-24 mx-auto">
                <AvatarImage src={profileData.avatar} />
                <AvatarFallback className="text-2xl bg-gradient-warm text-white">
                  {profileData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button 
                  size="icon" 
                  variant="secondary" 
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                >
                  <Camera size={16} />
                </Button>
              )}
            </div>
            <CardTitle className="mt-4">{profileData.name}</CardTitle>
            <p className="text-muted-foreground">{profileData.craftType}</p>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <User size={16} className="text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Skill Level</p>
                  <p className="text-sm text-muted-foreground">{profileData.skill}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <User size={16} className="text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">{profileData.region}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="region">Region/Location</Label>
                  <Input
                    id="region"
                    value={profileData.region}
                    onChange={(e) => handleInputChange("region", e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Craft Information */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Craft Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="craftType">Primary Craft Type</Label>
                  {isEditing ? (
                    <Select 
                      value={profileData.craftType}
                      onValueChange={(value) => handleInputChange("craftType", value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {craftTypes.map((craft) => (
                          <SelectItem key={craft} value={craft}>
                            {craft}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      value={profileData.craftType}
                      disabled
                      className="mt-1"
                    />
                  )}
                </div>
                
                <div>
                  <Label htmlFor="skill">Skill Level</Label>
                  {isEditing ? (
                    <Select 
                      value={profileData.skill}
                      onValueChange={(value) => handleInputChange("skill", value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {skillLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      value={profileData.skill}
                      disabled
                      className="mt-1"
                    />
                  )}
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">About Your Craft</Label>
                <Textarea
                  id="description"
                  value={profileData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                  rows={4}
                  placeholder="Tell customers about your craft journey and what makes your work unique..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Download My Data
              </Button>
              <Button variant="destructive" className="w-full justify-start">
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;