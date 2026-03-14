import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { BookOpen, Plus, Search, Clock, Users as UsersIcon, Edit, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const recipes = [
  { id: 1, name: "Butter Chicken", category: "Main Course", prepTime: "45 min", serves: 4, ingredients: 12, cost: "₹120", selling: "₹320", chef: "Rajesh" },
  { id: 2, name: "Paneer Tikka", category: "Starters", prepTime: "30 min", serves: 2, ingredients: 8, cost: "₹85", selling: "₹220", chef: "Priya" },
  { id: 3, name: "Dal Makhani", category: "Main Course", prepTime: "60 min", serves: 4, ingredients: 10, cost: "₹60", selling: "₹240", chef: "Rajesh" },
  { id: 4, name: "Chicken Biryani", category: "Main Course", prepTime: "50 min", serves: 3, ingredients: 15, cost: "₹110", selling: "₹280", chef: "Rajesh" },
  { id: 5, name: "Gulab Jamun", category: "Desserts", prepTime: "40 min", serves: 6, ingredients: 6, cost: "₹30", selling: "₹100", chef: "Priya" },
  { id: 6, name: "Masala Dosa", category: "Main Course", prepTime: "25 min", serves: 1, ingredients: 7, cost: "₹45", selling: "₹180", chef: "Rajesh" },
  { id: 7, name: "Tandoori Chicken", category: "Starters", prepTime: "35 min", serves: 2, ingredients: 11, cost: "₹130", selling: "₹350", chef: "Rajesh" },
  { id: 8, name: "Mango Lassi", category: "Drinks", prepTime: "5 min", serves: 1, ingredients: 4, cost: "₹25", selling: "₹120", chef: "Priya" },
];

export default function RecipeManagement() {
  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><BookOpen className="w-5 h-5 text-primary" /></div>
            <div>
              <h1 className="text-2xl font-bold font-display text-foreground">Recipe Management</h1>
              <p className="text-sm text-muted-foreground">Manage recipes, ingredients & costing</p>
            </div>
          </div>
          <Button size="sm"><Plus className="w-4 h-4 mr-1" />Add Recipe</Button>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search recipes..." className="pl-9" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {recipes.map((r, i) => {
            const margin = Math.round(((parseInt(r.selling.replace(/[₹,]/g, "")) - parseInt(r.cost.replace(/[₹,]/g, ""))) / parseInt(r.selling.replace(/[₹,]/g, ""))) * 100);
            return (
              <motion.div key={r.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="bg-card rounded-xl shadow-card border border-border overflow-hidden hover:shadow-elevated transition-shadow group">
                <div className="h-28 bg-gradient-to-br from-primary/5 to-primary/15 flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-primary/30" />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-sm font-semibold text-foreground">{r.name}</h3>
                    <Badge variant="secondary" className="text-[10px]">{r.category}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">by Chef {r.chef}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    <div className="flex items-center gap-1 text-muted-foreground"><Clock className="w-3 h-3" />{r.prepTime}</div>
                    <div className="flex items-center gap-1 text-muted-foreground"><UsersIcon className="w-3 h-3" />Serves {r.serves}</div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="text-xs">
                      <span className="text-muted-foreground">Cost: {r.cost}</span>
                      <span className="ml-2 text-foreground font-semibold">Sell: {r.selling}</span>
                    </div>
                    <span className="text-xs font-bold text-green-600">{margin}%</span>
                  </div>
                  <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" className="h-7 text-xs flex-1"><Eye className="w-3 h-3 mr-1" />View</Button>
                    <Button variant="ghost" size="sm" className="h-7 text-xs flex-1"><Edit className="w-3 h-3 mr-1" />Edit</Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
