import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Monitor, Search, Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";

const menuCategories = ["Starters", "Main Course", "Breads", "Drinks", "Desserts"];

const posMenu = [
  { id: 1, name: "Butter Chicken", price: 320, cat: "Main Course" },
  { id: 2, name: "Paneer Tikka", price: 220, cat: "Starters" },
  { id: 3, name: "Dal Makhani", price: 240, cat: "Main Course" },
  { id: 4, name: "Chicken Biryani", price: 280, cat: "Main Course" },
  { id: 5, name: "Garlic Naan", price: 60, cat: "Breads" },
  { id: 6, name: "Butter Naan", price: 50, cat: "Breads" },
  { id: 7, name: "Tandoori Roti", price: 30, cat: "Breads" },
  { id: 8, name: "Mango Lassi", price: 120, cat: "Drinks" },
  { id: 9, name: "Cold Coffee", price: 150, cat: "Drinks" },
  { id: 10, name: "Gulab Jamun", price: 100, cat: "Desserts" },
  { id: 11, name: "Rasmalai", price: 130, cat: "Desserts" },
  { id: 12, name: "Tandoori Chicken", price: 350, cat: "Starters" },
  { id: 13, name: "Masala Dosa", price: 180, cat: "Main Course" },
  { id: 14, name: "Fish Tikka", price: 290, cat: "Starters" },
  { id: 15, name: "Plain Rice", price: 80, cat: "Main Course" },
  { id: 16, name: "Raita", price: 60, cat: "Main Course" },
];

interface CartItem { id: number; name: string; price: number; qty: number; }

export default function POS() {
  const [activeCat, setActiveCat] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");
  const [payOpen, setPayOpen] = useState(false);
  const [payMethod, setPayMethod] = useState<string>("");

  const filtered = posMenu.filter((m) => (activeCat === "All" || m.cat === activeCat) && m.name.toLowerCase().includes(search.toLowerCase()));

  const addToCart = (item: typeof posMenu[0]) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) return prev.map((c) => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { id: item.id, name: item.name, price: item.price, qty: 1 }];
    });
    toast.success(`${item.name} added`);
  };

  const updateQty = (id: number, delta: number) => {
    setCart((prev) => prev.map((c) => c.id === id ? { ...c, qty: Math.max(0, c.qty + delta) } : c).filter((c) => c.qty > 0));
  };

  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const tax = Math.round(total * 0.05);
  const grandTotal = total + tax;

  const handlePay = () => {
    if (!payMethod) { toast.error("Select a payment method"); return; }
    toast.success(`Payment of ₹${grandTotal} received via ${payMethod}!`);
    setCart([]);
    setPayOpen(false);
    setPayMethod("");
  };

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Monitor className="w-5 h-5 text-primary" /></div>
          <div>
            <h1 className="text-2xl font-bold font-display text-foreground">POS System</h1>
            <p className="text-sm text-muted-foreground">Quick billing terminal</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search menu..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            </div>
            <div className="flex gap-1.5 mb-4 flex-wrap">
              {["All", ...menuCategories].map((cat) => (
                <button key={cat} onClick={() => setActiveCat(cat)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCat === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-primary/10"}`}>{cat}</button>
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {filtered.map((item) => (
                <button key={item.id} onClick={() => addToCart(item)} className="bg-card rounded-lg p-3 shadow-card border border-border hover:border-primary hover:shadow-elevated transition-all text-left">
                  <p className="text-xs font-semibold text-foreground truncate">{item.name}</p>
                  <p className="text-sm font-bold text-primary mt-1">₹{item.price}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl shadow-card border border-border p-4 flex flex-col h-fit lg:sticky lg:top-4">
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-border">
              <h3 className="font-display font-semibold text-foreground flex items-center gap-2"><ShoppingCart className="w-4 h-4" />Current Order</h3>
              <Badge variant="secondary">{cart.length} items</Badge>
            </div>

            {cart.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No items added yet</p>
            ) : (
              <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="text-xs font-medium text-foreground">{item.name}</p>
                      <p className="text-[10px] text-muted-foreground">₹{item.price} × {item.qty}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 rounded bg-secondary flex items-center justify-center hover:bg-destructive/10 transition-colors"><Minus className="w-3 h-3" /></button>
                      <span className="w-6 text-center text-xs font-bold">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 rounded bg-secondary flex items-center justify-center hover:bg-primary/10 transition-colors"><Plus className="w-3 h-3" /></button>
                      <button onClick={() => updateQty(item.id, -item.qty)} className="w-6 h-6 rounded flex items-center justify-center text-destructive hover:bg-destructive/10 transition-colors ml-1"><Trash2 className="w-3 h-3" /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-1.5 pt-3 border-t border-border text-xs">
              <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>₹{total}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>GST (5%)</span><span>₹{tax}</span></div>
              <div className="flex justify-between text-base font-bold text-foreground font-display pt-2 border-t border-border"><span>Total</span><span>₹{grandTotal}</span></div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <Button variant="outline" size="sm" onClick={() => { setCart([]); toast.info("Cart cleared"); }}>Clear</Button>
              <Button size="sm" disabled={cart.length === 0} onClick={() => setPayOpen(true)}>Pay ₹{grandTotal}</Button>
            </div>
          </div>
        </div>

        <Dialog open={payOpen} onOpenChange={setPayOpen}>
          <DialogContent>
            <DialogHeader><DialogTitle>Complete Payment — ₹{grandTotal}</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">{cart.length} items • Subtotal ₹{total} + GST ₹{tax}</p>
              <div className="grid grid-cols-2 gap-2">
                {["Cash", "UPI", "Card", "Online"].map((m) => (
                  <button key={m} onClick={() => setPayMethod(m)} className={`p-3 rounded-lg border text-sm font-medium transition-colors ${payMethod === m ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:border-primary"}`}>{m}</button>
                ))}
              </div>
              <Button className="w-full" onClick={handlePay} disabled={!payMethod}>Confirm Payment</Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    </DashboardLayout>
  );
}
