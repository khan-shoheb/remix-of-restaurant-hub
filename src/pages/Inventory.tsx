import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Package, Search, Plus, AlertTriangle, TrendingDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

const items = [
  { id: 1, name: "Basmati Rice", category: "Grains", stock: 45, unit: "kg", min: 20, max: 100, price: "₹80/kg", lastOrder: "10 Mar" },
  { id: 2, name: "Chicken", category: "Meat", stock: 12, unit: "kg", min: 15, max: 50, price: "₹220/kg", lastOrder: "13 Mar" },
  { id: 3, name: "Paneer", category: "Dairy", stock: 8, unit: "kg", min: 10, max: 30, price: "₹320/kg", lastOrder: "12 Mar" },
  { id: 4, name: "Cooking Oil", category: "Oil", stock: 30, unit: "L", min: 15, max: 50, price: "₹150/L", lastOrder: "8 Mar" },
  { id: 5, name: "Onions", category: "Vegetables", stock: 25, unit: "kg", min: 20, max: 80, price: "₹40/kg", lastOrder: "13 Mar" },
  { id: 6, name: "Tomatoes", category: "Vegetables", stock: 5, unit: "kg", min: 15, max: 60, price: "₹60/kg", lastOrder: "11 Mar" },
  { id: 7, name: "Flour (Atta)", category: "Grains", stock: 35, unit: "kg", min: 20, max: 80, price: "₹45/kg", lastOrder: "9 Mar" },
  { id: 8, name: "Butter", category: "Dairy", stock: 6, unit: "kg", min: 5, max: 20, price: "₹500/kg", lastOrder: "12 Mar" },
  { id: 9, name: "Cream", category: "Dairy", stock: 3, unit: "L", min: 5, max: 15, price: "₹250/L", lastOrder: "13 Mar" },
  { id: 10, name: "Spice Mix", category: "Spices", stock: 4, unit: "kg", min: 3, max: 10, price: "₹600/kg", lastOrder: "7 Mar" },
];

export default function Inventory() {
  const lowStock = items.filter((i) => i.stock < i.min);
  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-display text-foreground">Inventory</h1>
              <p className="text-sm text-muted-foreground">Track stock levels and manage supplies</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-1" />Export</Button>
            <Button size="sm"><Plus className="w-4 h-4 mr-1" />Add Item</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-card rounded-xl p-4 shadow-card border border-border">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Total Items</p>
            <p className="text-xl font-bold font-display text-foreground mt-1">{items.length}</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-border">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Categories</p>
            <p className="text-xl font-bold font-display text-foreground mt-1">6</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-destructive/30">
            <div className="flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-destructive" />
              <p className="text-xs text-destructive uppercase tracking-wide">Low Stock</p>
            </div>
            <p className="text-xl font-bold font-display text-destructive mt-1">{lowStock.length}</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-border">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Total Value</p>
            <p className="text-xl font-bold font-display text-foreground mt-1">₹48,500</p>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search inventory..." className="pl-9" />
          </div>
        </div>

        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  {["Item", "Category", "Stock", "Level", "Unit Price", "Last Order"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => {
                  const pct = Math.round((item.stock / item.max) * 100);
                  const isLow = item.stock < item.min;
                  return (
                    <motion.tr key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {isLow && <TrendingDown className="w-3 h-3 text-destructive" />}
                          <span className={`text-sm font-medium ${isLow ? "text-destructive" : "text-foreground"}`}>{item.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{item.category}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-foreground">{item.stock} {item.unit}</td>
                      <td className="px-4 py-3 w-40">
                        <Progress value={pct} className={`h-2 ${isLow ? "[&>div]:bg-destructive" : ""}`} />
                        <span className="text-[10px] text-muted-foreground">{pct}% of {item.max}{item.unit}</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{item.price}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{item.lastOrder}</td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
