import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import bannerImage from "@/assets/banner.jpg";
import { Palette, TrendingUp, Users, Package, ShoppingBag } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-earth">
      {/* Hero Section */}
      <section className="relative">
        <div 
          className="h-64 md:h-80 bg-cover bg-center relative overflow-hidden rounded-b-3xl"
          style={{ backgroundImage: `url(${bannerImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-6">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                Roots&Rise
              </h1>
              <p className="text-lg md:text-xl opacity-90 max-w-md mx-auto">
                Empowering artisans to share their craft with the world
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Welcome to Your Artisan Journey
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join our community of skilled artisans and start selling your handcrafted products online. 
            Build your brand, connect with customers, and grow your craft business.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="p-8 text-center shadow-medium hover:shadow-strong transition-all duration-300">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">New Artisan?</h3>
              <p className="text-muted-foreground">
                Create your account and start your journey as a seller on our platform.
              </p>
            </div>
            <Button 
              size="lg" 
              className="w-full bg-gradient-warm hover:opacity-90 text-white font-semibold"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          </Card>

          <Card className="p-8 text-center shadow-medium hover:shadow-strong transition-all duration-300">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-craft rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Returning Seller?</h3>
              <p className="text-muted-foreground">
                Access your dashboard and manage your products, orders, and profile.
              </p>
            </div>
            <Button 
              variant="secondary"
              size="lg" 
              className="w-full font-semibold"
              onClick={() => navigate("/login")}
            >
              Log In
            </Button>
          </Card>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Package className="text-primary" size={24} />
            </div>
            <h3 className="font-semibold mb-2">Showcase Your Craft</h3>
            <p className="text-sm text-muted-foreground">
              Upload photos and create detailed listings for your handmade products
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="text-secondary" size={24} />
            </div>
            <h3 className="font-semibold mb-2">Fair Pricing Tools</h3>
            <p className="text-sm text-muted-foreground">
              Calculate fair prices based on materials and time invested
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="text-accent" size={24} />
            </div>
            <h3 className="font-semibold mb-2">Manage Orders</h3>
            <p className="text-sm text-muted-foreground">
              Track and fulfill orders from your personalized dashboard
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;