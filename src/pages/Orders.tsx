import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { ShoppingCart, Search, Filter, Clock, CheckCircle2, XCircle, Truck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";

const initialOrders = [
  { id: "ORD-101", type: "Dine-in", table: "Table 5", items: ["Butter Chicken x2", "Naan x4", "Lassi x2"], total: "₹1,340", time: "12:30 PM", status: "Preparing" },
  { id: "ORD-102", type: "Dine-in", table: "Table 12", items: ["Biryani x3", "Raita x3"], total: "₹1,140", time: "12:45 PM", status: "Served" },
  { id: "ORD-103", type: "Delivery", table: "Sec 45, Noida", items: ["Paneer Tikka x1", "Dal Makhani x1", "Rice x1"], total: "₹680", time: "1:00 PM", status: "Out for Delivery" },
  { id: "ORD-104", type: "Dine-in", table: "Table 3", items: ["Tandoori Chicken x2", "Butter Naan x4"], total: "₹940", time: "1:15 PM", status: "New" },
  { id: "ORD-105", type: "Takeaway", table: "Counter", items: ["Masala Dosa x2", "Coffee x2"], total: "₹660", time: "1:30 PM", status: "Ready" },
  { id: "ORD-106", type: "Delivery", table: "MG Road", items: ["Fish Tikka x2", "Biryani x1"], total: "₹860", time: "2:00 PM", status: "Cancelled" },
];

const statusConfig: Record<string, { color: string; icon: React.ElementType }> = {
  New: { color: "bg-blue-100 text-blue-700", icon: Clock },
  Preparing: { color: "bg-yellow-100 text-yellow-700", icon: Clock },
  Ready: { color: "bg-green-100 text-green-700", icon: CheckCircle2 },
  Served: { color: "bg-green-100 text-green-700", icon: CheckCircle2 },
  "Out for Delivery": { color: "bg-purple-100 text-purple-700", icon: Truck },
  Cancelled: { color: "bg-red-100 text-red-700", icon: XCircle },
};

const allStatuses = ["All", "New", "Preparing", "Ready", "Served", "Out for Delivery", "Cancelled"];

export default function Orders() {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showFilter, setShowFilter] = useState(false);

  const filtered = orders.filter((o) =>
    (filterStatus === "All" || o.status === filterStatus) &&
    (o.id.toLowerCase().includes(search.toLowerCase()) || o.table.toLowerCase().includes(search.toLowerCase()))
  );

  const handleStatusChange = (id: string, newStatus: string) => {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status: newStatus } : o));
    toast.success(`Order ${id} marked as ${newStatus}`);
  };

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-display text-foreground">Orders</h1>
              <p className="text-sm text-muted-foreground">View and manage all orders</p>
            </div>
          </div>
          <Button size="sm" onClick={() => setShowFilter(!showFilter)}>
            <Filter className="w-4 h-4 mr-1" />Filter
          </Button>
        </div>

        {showFilter && (
          <div className="flex gap-2 mb-4 flex-wrap">
            {allStatuses.map((s) => (
              <button key={s} onClick={() => setFilterStatus(s)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${filterStatus === s ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-primary/10"}`}>{s}</button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Active Orders", value: orders.filter((o) => !["Served", "Cancelled"].includes(o.status)).length.toString() },
            { label: "Completed Today", value: orders.filter((o) => o.status === "Served").length.toString() },
            { label: "Cancelled", value: orders.filter((o) => o.status === "Cancelled").length.toString() },
            { label: "Avg Prep Time", value: "22 min" },
          ].map((s) => (
            <div key={s.label} className="bg-card rounded-xl p-4 shadow-card border border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{s.label}</p>
              <p className="text-xl font-bold font-display text-foreground mt-1">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search orders..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="space-y-3">
          {filtered.map((order, i) => {
            const st = statusConfig[order.status];
            const StIcon = st.icon;
            return (
              <motion.div key={order.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="bg-card rounded-xl p-4 shadow-card border border-border hover:shadow-elevated transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono font-bold text-primary">{order.id}</span>
                    <Badge variant="secondary" className="text-xs">{order.type}</Badge>
                    <span className="text-xs text-muted-foreground">{order.table}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{order.time}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1 ${st.color}`}>
                      <StIcon className="w-3 h-3" />{order.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {order.items.map((item) => (
                      <span key={item} className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground">{item}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    {order.status === "New" && <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => handleStatusChange(order.id, "Preparing")}>Start Preparing</Button>}
                    {order.status === "Preparing" && <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => handleStatusChange(order.id, "Ready")}>Mark Ready</Button>}
                    {order.status === "Ready" && <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => handleStatusChange(order.id, "Served")}>Mark Served</Button>}
                    {!["Served", "Cancelled"].includes(order.status) && <Button size="sm" variant="ghost" className="h-7 text-xs text-destructive" onClick={() => handleStatusChange(order.id, "Cancelled")}>Cancel</Button>}
                    <span className="text-lg font-bold font-display text-foreground">{order.total}</span>
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
