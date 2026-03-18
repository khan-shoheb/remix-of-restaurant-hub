import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  DollarSign,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "Today's Revenue", value: "₹42,850", change: "+12.5%", up: true, icon: DollarSign },
  { label: "Active Orders", value: "23", change: "+3", up: true, icon: ShoppingCart },
  { label: "Guests Today", value: "156", change: "-8%", up: false, icon: Users },
  { label: "Avg Order Value", value: "₹1,245", change: "+5.2%", up: true, icon: TrendingUp },
];

const quickActionRoutes: Record<string, string> = {
  "New Order": "/pos",
  "Add Reservation": "/reservation",
  "View Reports": "/reports",
  "Manage Menu": "/menu",
};

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-2xl font-bold font-display text-foreground mb-1">Dashboard</h1>
        <p className="text-sm text-muted-foreground mb-6">Welcome back, Admin. Here's what's happening today.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-card rounded-xl p-5 shadow-card border border-border group hover:shadow-elevated transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{s.label}</span>
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <s.icon className="w-4 h-4 text-primary" />
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground font-display">{s.value}</div>
              <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${s.up ? "text-green-600" : "text-destructive"}`}>
                {s.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {s.change} from yesterday
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-card rounded-xl p-6 shadow-card border border-border">
            <h3 className="font-display font-semibold text-foreground mb-4">Recent Orders</h3>
            <div className="space-y-3">
              {["Table 5 - ₹2,340", "Table 12 - ₹1,890", "Delivery #45 - ₹980", "Table 3 - ₹3,200"].map((order, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0 cursor-pointer hover:bg-muted/30 rounded px-2 transition-colors" onClick={() => navigate("/orders")}>
                  <span className="text-sm text-foreground">{order}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">Active</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-card border border-border">
            <h3 className="font-display font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(quickActionRoutes).map(([action, route]) => (
                <button
                  key={action}
                  onClick={() => navigate(route)}
                  className="p-3 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
