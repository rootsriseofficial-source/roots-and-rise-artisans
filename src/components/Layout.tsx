import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Home, Package, ShoppingBag, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Products", href: "/products", icon: Package },
    { name: "Orders", href: "/orders", icon: ShoppingBag },
    { name: "Profile", href: "/profile", icon: User },
  ];

  const isActive = (path: string) => location.pathname === path;

  const NavItems = () => (
    <>
      {navigation.map((item) => {
        const Icon = item.icon;
        return (
          <Button
            key={item.name}
            variant={isActive(item.href) ? "default" : "ghost"}
            className="w-full justify-start gap-3 h-12"
            onClick={() => {
              navigate(item.href);
              setIsOpen(false);
            }}
          >
            <Icon size={20} />
            <span>{item.name}</span>
          </Button>
        );
      })}
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="md:hidden bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-primary">Roots&Rise</h1>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <div className="flex flex-col gap-2 mt-6">
              <NavItems />
            </div>
          </SheetContent>
        </Sheet>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 min-h-screen bg-card border-r border-border">
          <div className="p-6">
            <h1 className="text-xl font-bold text-primary mb-8">Roots&Rise</h1>
            <nav className="flex flex-col gap-2">
              <NavItems />
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-2">
        <div className="flex justify-around">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.name}
                variant={isActive(item.href) ? "default" : "ghost"}
                size="sm"
                className="flex flex-col gap-1 h-auto py-2"
                onClick={() => navigate(item.href)}
              >
                <Icon size={18} />
                <span className="text-xs">{item.name}</span>
              </Button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Layout;