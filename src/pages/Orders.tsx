import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Package, CheckCircle, Eye, MessageCircle, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Orders = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");

  // Mock orders data
  const orders = [
    {
      id: "ORD-001",
      customer: "Sarah Johnson",
      product: "Handwoven Basket",
      amount: 85,
      status: "pending",
      date: "2024-01-15",
      email: "sarah@example.com",
      address: "123 Main St, Portland, OR",
      notes: "Please ensure careful packaging for gift wrapping"
    },
    {
      id: "ORD-002",
      customer: "Michael Chen",
      product: "Ceramic Vase",
      amount: 120,
      status: "in-progress",
      date: "2024-01-14",
      email: "michael@example.com",
      address: "456 Oak Ave, Seattle, WA",
      notes: "Rush order for anniversary"
    },
    {
      id: "ORD-003",
      customer: "Emma Davis",
      product: "Leather Journal",
      amount: 45,
      status: "completed",
      date: "2024-01-13",
      email: "emma@example.com",
      address: "789 Pine St, San Francisco, CA",
      notes: ""
    },
    {
      id: "ORD-004",
      customer: "David Wilson",
      product: "Wooden Bowl Set",
      amount: 150,
      status: "shipped",
      date: "2024-01-12",
      email: "david@example.com",
      address: "321 Elm St, Denver, CO",
      notes: "Customer requested walnut finish"
    },
    {
      id: "ORD-005",
      customer: "Lisa Brown",
      product: "Silver Pendant",
      amount: 75,
      status: "completed",
      date: "2024-01-11",
      email: "lisa@example.com",
      address: "654 Maple Dr, Austin, TX",
      notes: ""
    }
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return { 
          color: 'bg-yellow-100 text-yellow-800',
          icon: Clock,
          label: 'Pending'
        };
      case 'in-progress':
        return { 
          color: 'bg-blue-100 text-blue-800',
          icon: Package,
          label: 'In Progress'
        };
      case 'shipped':
        return { 
          color: 'bg-purple-100 text-purple-800',
          icon: Package,
          label: 'Shipped'
        };
      case 'completed':
        return { 
          color: 'bg-green-100 text-green-800',
          icon: CheckCircle,
          label: 'Completed'
        };
      default:
        return { 
          color: 'bg-gray-100 text-gray-800',
          icon: Clock,
          label: 'Unknown'
        };
    }
  };

  const filterOrders = (status: string) => {
    if (status === 'all') return orders;
    return orders.filter(order => order.status === status);
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    // Here you would update in Supabase
    toast({
      title: "Order Updated",
      description: `Order ${orderId} status changed to ${newStatus}.`
    });
  };

  const OrderCard = ({ order }: { order: any }) => {
    const statusInfo = getStatusInfo(order.status);
    const StatusIcon = statusInfo.icon;

    return (
      <Card className="shadow-medium hover:shadow-strong transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-semibold">Order #{order.id}</h3>
                <Badge className={statusInfo.color}>
                  <StatusIcon size={12} className="mr-1" />
                  {statusInfo.label}
                </Badge>
              </div>
              
              <div className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                <p><span className="font-medium">Customer:</span> {order.customer}</p>
                <p><span className="font-medium">Product:</span> {order.product}</p>
                <p><span className="font-medium">Amount:</span> ${order.amount}</p>
                <p><span className="font-medium">Date:</span> {order.date}</p>
              </div>
              
              {order.notes && (
                <p className="text-sm bg-muted/50 p-2 rounded mt-2">
                  <span className="font-medium">Notes:</span> {order.notes}
                </p>
              )}
            </div>
            
            <div className="flex flex-col gap-2 min-w-[140px]">
              <Select
                defaultValue={order.status}
                onValueChange={(value) => updateOrderStatus(order.id, value)}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                  <Eye size={14} />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                  <MessageCircle size={14} />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="p-6 md:p-8 pb-24 md:pb-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground">Track and manage your customer orders</p>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-yellow-600">{filterOrders('pending').length}</p>
          <p className="text-sm text-muted-foreground">Pending</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{filterOrders('in-progress').length}</p>
          <p className="text-sm text-muted-foreground">In Progress</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-purple-600">{filterOrders('shipped').length}</p>
          <p className="text-sm text-muted-foreground">Shipped</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{filterOrders('completed').length}</p>
          <p className="text-sm text-muted-foreground">Completed</p>
        </Card>
      </div>

      {/* Orders Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {filterOrders('pending').map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-4">
          {filterOrders('in-progress').map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </TabsContent>

        <TabsContent value="shipped" className="space-y-4">
          {filterOrders('shipped').map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {filterOrders('completed').map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </TabsContent>
      </Tabs>

      {orders.length === 0 && (
        <Card className="p-12 text-center">
          <ShoppingBag className="mx-auto mb-4 text-muted-foreground" size={48} />
          <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
          <p className="text-muted-foreground">
            Orders will appear here when customers start purchasing your products
          </p>
        </Card>
      )}
    </div>
  );
};

export default Orders;