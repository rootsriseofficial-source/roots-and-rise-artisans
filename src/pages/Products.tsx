import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Upload, Calculator, DollarSign, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Products = () => {
  const { toast } = useToast();
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showPriceCalculator, setShowPriceCalculator] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    availability: "available"
  });

  const [priceCalc, setPriceCalc] = useState({
    materials: "",
    timeHours: "",
    hourlyRate: "25",
    overhead: "20"
  });

  // Mock products data
  const products = [
    {
      id: 1,
      name: "Handwoven Basket",
      category: "Home Decor",
      description: "Beautiful handwoven basket made from natural materials",
      price: 85,
      availability: "available",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Ceramic Vase",
      category: "Pottery",
      description: "Elegant ceramic vase with traditional patterns",
      price: 120,
      availability: "available",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Leather Journal",
      category: "Accessories",
      description: "Handcrafted leather journal with vintage binding",
      price: 45,
      availability: "out-of-stock",
      image: "/placeholder.svg"
    }
  ];

  const categories = [
    "Pottery & Ceramics",
    "Textiles & Weaving",
    "Woodworking",
    "Jewelry",
    "Leather Goods",
    "Home Decor",
    "Accessories",
    "Art & Paintings"
  ];

  const handleAddProduct = () => {
    // Here you would save to Supabase
    toast({
      title: "Product Added",
      description: `${newProduct.name} has been added to your store.`
    });
    setNewProduct({ name: "", category: "", description: "", price: "", availability: "available" });
    setShowAddProduct(false);
  };

  const calculatePrice = () => {
    const materials = parseFloat(priceCalc.materials) || 0;
    const hours = parseFloat(priceCalc.timeHours) || 0;
    const hourlyRate = parseFloat(priceCalc.hourlyRate) || 25;
    const overheadPercent = parseFloat(priceCalc.overhead) || 20;
    
    const laborCost = hours * hourlyRate;
    const subtotal = materials + laborCost;
    const overhead = subtotal * (overheadPercent / 100);
    const recommendedPrice = subtotal + overhead;
    
    return {
      materials,
      laborCost,
      overhead,
      recommendedPrice: Math.ceil(recommendedPrice)
    };
  };

  const priceBreakdown = calculatePrice();

  return (
    <div className="p-6 md:p-8 pb-24 md:pb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground">Manage your product listings and inventory</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={showPriceCalculator} onOpenChange={setShowPriceCalculator}>
            <DialogTrigger asChild>
              <Button variant="secondary" className="gap-2">
                <Calculator size={18} />
                Price Calculator
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Fair Price Calculator</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="materials">Material Costs ($)</Label>
                  <Input
                    id="materials"
                    type="number"
                    value={priceCalc.materials}
                    onChange={(e) => setPriceCalc(prev => ({ ...prev, materials: e.target.value }))}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="timeHours">Time Spent (hours)</Label>
                  <Input
                    id="timeHours"
                    type="number"
                    value={priceCalc.timeHours}
                    onChange={(e) => setPriceCalc(prev => ({ ...prev, timeHours: e.target.value }))}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    value={priceCalc.hourlyRate}
                    onChange={(e) => setPriceCalc(prev => ({ ...prev, hourlyRate: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="overhead">Overhead (%)</Label>
                  <Input
                    id="overhead"
                    type="number"
                    value={priceCalc.overhead}
                    onChange={(e) => setPriceCalc(prev => ({ ...prev, overhead: e.target.value }))}
                  />
                </div>
                
                <div className="bg-gradient-earth p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Price Breakdown:</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Materials:</span>
                      <span>${priceBreakdown.materials.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Labor:</span>
                      <span>${priceBreakdown.laborCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Overhead:</span>
                      <span>${priceBreakdown.overhead.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold border-t pt-1">
                      <span>Recommended Price:</span>
                      <span>${priceBreakdown.recommendedPrice}</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full"
                  onClick={() => {
                    setNewProduct(prev => ({ ...prev, price: priceBreakdown.recommendedPrice.toString() }));
                    setShowPriceCalculator(false);
                    setShowAddProduct(true);
                  }}
                >
                  Use This Price
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog open={showAddProduct} onOpenChange={setShowAddProduct}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-warm hover:opacity-90 gap-2">
                <Plus size={18} />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter product name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select onValueChange={(value) => setNewProduct(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your product..."
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="price">Price ($) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="0.00"
                  />
                </div>
                
                <div>
                  <Label htmlFor="availability">Availability</Label>
                  <Select onValueChange={(value) => setNewProduct(prev => ({ ...prev, availability: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                      <SelectItem value="made-to-order">Made to Order</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Product Images</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="mx-auto mb-2 text-muted-foreground" size={24} />
                    <p className="text-sm text-muted-foreground">Click to upload images</p>
                  </div>
                </div>
                
                <Button onClick={handleAddProduct} className="w-full bg-gradient-warm hover:opacity-90">
                  Add Product
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="shadow-medium hover:shadow-strong transition-all duration-300">
            <div className="aspect-square bg-muted rounded-t-lg flex items-center justify-center">
              <Package className="text-muted-foreground" size={48} />
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold truncate">{product.name}</h3>
                <Badge variant="secondary" className="text-xs">
                  {product.category}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {product.description}
              </p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-bold">${product.price}</p>
                  <Badge 
                    variant={product.availability === 'available' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {product.availability}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {products.length === 0 && (
        <Card className="p-12 text-center">
          <Package className="mx-auto mb-4 text-muted-foreground" size={48} />
          <h3 className="text-lg font-semibold mb-2">No products yet</h3>
          <p className="text-muted-foreground mb-4">
            Start by adding your first product to your store
          </p>
          <Button onClick={() => setShowAddProduct(true)} className="bg-gradient-warm hover:opacity-90">
            Add Your First Product
          </Button>
        </Card>
      )}
    </div>
  );
};

export default Products;