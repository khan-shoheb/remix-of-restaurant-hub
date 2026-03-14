import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { UtensilsCrossed, Plus, Search, Edit, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const categories = ["All", "Starters", "Main Course", "Breads", "Drinks", "Desserts"];

const menuItems = [
  { id: 1, name: "Butter Chicken", category: "Main Course", price: "₹320", rating: 4.8, available: true, veg: false },
  { id: 2, name: "Paneer Tikka", category: "Starters", price: "₹220", rating: 4.6, available: true, veg: true },
  { id: 3, name: "Dal Makhani", category: "Main Course", price: "₹240", rating: 4.7, available: true, veg: true },
  { id: 4, name: "Chicken Biryani", category: "Main Course", price: "₹280", rating: 4.9, available: true, veg: false },
  { id: 5, name: "Garlic Naan", category: "Breads", price: "₹60", rating: 4.5, available: true, veg: true },
  { id: 6, name: "Mango Lassi", category: "Drinks", price: "₹120", rating: 4.4, available: false, veg: true },
  { id: 7, name: "Gulab Jamun", category: "Desserts", price: "₹100", rating: 4.6, available: true, veg: true },
  { id: 8, name: "Tandoori Chicken", category: "Starters", price: "₹350", rating: 4.7, available: true, veg: false },
  { id: 9, name: "Masala Dosa", category: "Main Course", price: "₹180", rating: 4.3, available: true, veg: true },
  { id: 10, name: "Cold Coffee", category: "Drinks", price: "₹150", rating: 4.2, available: true, veg: true },
  { id: 11, name: "Rasmalai", category: "Desserts", price: "₹130", rating: 4.8, available: true, veg: true },
  { id: 12, name: "Fish Tikka", category: "Starters", price: "₹290", rating: 4.5, available: false, veg: false },
];

export default function MenuManagement() {
  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-display text-foreground">Menu Management</h1>
              <p className="text-sm text-muted-foreground">Create and manage your restaurant menu</p>
            </div>
          </div>
          <Button size="sm"><Plus className="w-4 h-4 mr-1" />Add Item</Button>
        </div>

        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search menu items..." className="pl-9" />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {categories.map((cat, i) => (
              <button key={cat} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${i === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-primary/10"}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {menuItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              className="bg-card rounded-xl shadow-card border border-border overflow-hidden group hover:shadow-elevated transition-shadow"
            >
              <div className="h-32 bg-gradient-to-br from-primary/5 to-primary/15 flex items-center justify-center relative">
                <UtensilsCrossed className="w-10 h-10 text-primary/30" />
                <div className="absolute top-2 left-2">
                  <span className={`w-3 h-3 rounded-full inline-block ${item.veg ? "bg-green-500" : "bg-red-500"}`} />
                </div>
                {!item.available && (
                  <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
                    <Badge variant="secondary">Unavailable</Badge>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="text-sm font-semibold text-foreground">{item.name}</h3>
                  <span className="text-sm font-bold text-primary">{item.price}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{item.category}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-primary text-primary" />
                    <span className="text-xs font-medium text-foreground">{item.rating}</span>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-7 w-7"><Edit className="w-3 h-3" /></Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive"><Trash2 className="w-3 h-3" /></Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
