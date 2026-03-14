import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { ChefHat, Clock, AlertCircle, CheckCircle2, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type KitchenStatus = "New" | "Preparing" | "Ready";

interface KitchenOrder {
  id: string;
  table: string;
  items: { name: string; qty: number; note?: string }[];
  time: string;
  elapsed: string;
  status: KitchenStatus;
  priority: boolean;
}

const kitchenOrders: KitchenOrder[] = [
  { id: "K-101", table: "Table 5", items: [{ name: "Butter Chicken", qty: 2 }, { name: "Naan", qty: 4, note: "Extra butter" }, { name: "Lassi", qty: 2 }], time: "12:30 PM", elapsed: "18 min", status: "Preparing", priority: false },
  { id: "K-102", table: "Table 3", items: [{ name: "Biryani", qty: 3, note: "Extra spicy" }, { name: "Raita", qty: 3 }], time: "12:45 PM", elapsed: "8 min", status: "New", priority: true },
  { id: "K-103", table: "Delivery #45", items: [{ name: "Paneer Tikka", qty: 1 }, { name: "Dal Makhani", qty: 1 }, { name: "Rice", qty: 1 }], time: "1:00 PM", elapsed: "5 min", status: "New", priority: false },
  { id: "K-104", table: "Table 12", items: [{ name: "Tandoori Chicken", qty: 2 }, { name: "Garlic Naan", qty: 4 }], time: "12:15 PM", elapsed: "25 min", status: "Ready", priority: false },
  { id: "K-105", table: "Takeaway", items: [{ name: "Masala Dosa", qty: 2 }, { name: "Coffee", qty: 2 }], time: "1:15 PM", elapsed: "3 min", status: "New", priority: false },
  { id: "K-106", table: "Table 8", items: [{ name: "Fish Tikka", qty: 2 }, { name: "Biryani", qty: 1 }, { name: "Naan", qty: 2 }], time: "12:40 PM", elapsed: "15 min", status: "Preparing", priority: true },
];

const statusCols: { label: KitchenStatus; icon: React.ElementType; color: string; headerBg: string }[] = [
  { label: "New", icon: AlertCircle, color: "border-t-blue-500", headerBg: "bg-blue-50" },
  { label: "Preparing", icon: Timer, color: "border-t-primary", headerBg: "bg-primary/5" },
  { label: "Ready", icon: CheckCircle2, color: "border-t-green-500", headerBg: "bg-green-50" },
];

export default function KitchenDisplay() {
  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><ChefHat className="w-5 h-5 text-primary" /></div>
            <div>
              <h1 className="text-2xl font-bold font-display text-foreground">Kitchen Display</h1>
              <p className="text-sm text-muted-foreground">Real-time order tracking for kitchen</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>Auto-refreshes every 30s</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {statusCols.map((col) => {
            const orders = kitchenOrders.filter((o) => o.status === col.label);
            return (
              <div key={col.label} className={`rounded-xl border border-border border-t-4 ${col.color} bg-card shadow-card`}>
                <div className={`px-4 py-3 flex items-center justify-between ${col.headerBg} rounded-t-lg`}>
                  <div className="flex items-center gap-2">
                    <col.icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-semibold text-foreground">{col.label}</span>
                  </div>
                  <Badge variant="secondary">{orders.length}</Badge>
                </div>
                <div className="p-3 space-y-3">
                  {orders.map((order, i) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`bg-background rounded-lg p-3 border ${order.priority ? "border-destructive/50 ring-1 ring-destructive/20" : "border-border"}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-primary">{order.id}</span>
                          {order.priority && <span className="text-[9px] px-1 py-0.5 rounded bg-destructive/10 text-destructive font-bold uppercase">Rush</span>}
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {order.elapsed}
                        </div>
                      </div>
                      <p className="text-xs font-medium text-foreground mb-2">{order.table}</p>
                      <div className="space-y-1 mb-3">
                        {order.items.map((item, ii) => (
                          <div key={ii} className="flex items-start justify-between text-xs">
                            <span className="text-foreground">{item.qty}× {item.name}</span>
                            {item.note && <span className="text-primary text-[10px] italic ml-2">{item.note}</span>}
                          </div>
                        ))}
                      </div>
                      {col.label === "New" && <Button size="sm" className="w-full h-7 text-xs">Start Preparing</Button>}
                      {col.label === "Preparing" && <Button size="sm" className="w-full h-7 text-xs" variant="outline">Mark Ready</Button>}
                      {col.label === "Ready" && <Button size="sm" className="w-full h-7 text-xs" variant="secondary">Served ✓</Button>}
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
