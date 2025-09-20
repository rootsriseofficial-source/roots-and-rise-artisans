import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, ShoppingBag, TrendingUp, Clock, CheckCircle } from "lucide-react";

const Dashboard = () => {
  // Mock data - in real app, this would come from Supabase
  const stats = {
    totalSales: 2450,
    income: 3240,
    productsSold: 18,
    activeOrders: 5,
    totalProducts: 12,
    completedOrders: 23
  };

  const recentOrders = [
    { id: "ORD-001", product: "Handwoven Basket", amount: 85, status: "pending", date: "2024-01-15" },
    { id: "ORD-002", product: "Ceramic Vase", amount: 120, status: "completed", date: "2024-01-14" },
    { id: "ORD-003", product: "Leather Journal", amount: 45, status: "in-progress", date: "2024-01-13" },
  ];

  const StatCard = ({ title, value, icon: Icon, subtitle, gradient }: any) => (
    <Card className="shadow-medium hover:shadow-strong transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
          </div>
          <div className={`p-3 rounded-full ${gradient}`}>
            <Icon className="text-white" size={24} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="p-6 md:p-8 pb-24 md:pb-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your business overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Income"
          value={`$${stats.income.toLocaleString()}`}
          subtitle="This month"
          icon={DollarSign}
          gradient="bg-gradient-warm"
        />
        
        <StatCard
          title="Products Sold"
          value={stats.productsSold}
          subtitle="This month"
          icon={Package}
          gradient="bg-gradient-craft"
        />
        
        <StatCard
          title="Active Orders"
          value={stats.activeOrders}
          subtitle="Pending fulfillment"
          icon={ShoppingBag}
          gradient="bg-secondary"
        />
        
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          subtitle="In your store"
          icon={TrendingUp}
          gradient="bg-accent"
        />
        
        <StatCard
          title="Completed Orders"
          value={stats.completedOrders}
          subtitle="All time"
          icon={CheckCircle}
          gradient="bg-gradient-craft"
        />
        
        <StatCard
          title="Average Order"
          value={`$${Math.round(stats.income / stats.productsSold)}`}
          subtitle="Per sale"
          icon={DollarSign}
          gradient="bg-gradient-warm"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock size={20} />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{order.product}</p>
                    <p className="text-sm text-muted-foreground">Order #{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${order.amount}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-warm rounded-lg text-white text-center hover:opacity-90 transition-opacity cursor-pointer">
                <Package size={24} className="mx-auto mb-2" />
                <p className="font-medium">Add Product</p>
              </div>
              <div className="p-4 bg-gradient-craft rounded-lg text-white text-center hover:opacity-90 transition-opacity cursor-pointer">
                <TrendingUp size={24} className="mx-auto mb-2" />
                <p className="font-medium">Price Calculator</p>
              </div>
              <div className="p-4 bg-secondary rounded-lg text-white text-center hover:opacity-90 transition-opacity cursor-pointer">
                <ShoppingBag size={24} className="mx-auto mb-2" />
                <p className="font-medium">View Orders</p>
              </div>
              <div className="p-4 bg-accent rounded-lg text-white text-center hover:opacity-90 transition-opacity cursor-pointer">
                <DollarSign size={24} className="mx-auto mb-2" />
                <p className="font-medium">Sales Report</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;