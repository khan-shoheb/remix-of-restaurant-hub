import SuperAdminLayout from "@/components/SuperAdminLayout";
import { motion } from "framer-motion";
import {
  Monitor,
  Building2,
  ShieldCheck,
  Users,
  ArrowUpRight,
  AlertTriangle,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "Platform MRR", value: "Rs. 30.1L", change: "+12.4%", icon: Monitor, color: "bg-primary/10 text-primary" },
  { label: "Active Restaurants", value: "128 / 142", change: "+4 this month", icon: Building2, color: "bg-accent/10 text-accent" },
  { label: "SLA Resolution", value: "96.2%", change: "-1.1%", icon: ShieldCheck, color: "bg-green-100 text-green-600" },
  { label: "Total Users", value: "8,540", change: "+382", icon: Users, color: "bg-purple-100 text-purple-600" },
];

const alerts = [
  { text: "3 restaurants in payment grace", action: "Review subscriptions", route: "/superadmin-subscriptions", color: "bg-destructive/5 border-destructive/20" },
  { text: "API latency crossed 450ms in West zone", action: "Open platform analytics", route: "/superadmin-analytics", color: "bg-yellow-50 border-yellow-200" },
  { text: "7 unresolved support tickets > 12h", action: "Escalate support queue", route: "/superadmin-support", color: "bg-destructive/5 border-destructive/20" },
];

export default function SuperAdminDashboard() {
  const navigate = useNavigate();

  return (
    <SuperAdminLayout>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="rounded-2xl bg-gradient-to-r from-sidebar-background to-primary/80 p-8 mb-6 text-primary-foreground relative overflow-hidden">
          <div className="flex items-center gap-2 text-xs font-medium bg-primary-foreground/20 w-fit px-3 py-1.5 rounded-full mb-4">
            <Settings className="w-3.5 h-3.5" /> LIVE COMMAND CENTER
          </div>
          <h1 className="text-3xl font-bold font-display mb-2">Super Admin Control Tower</h1>
          <p className="text-primary-foreground/80 max-w-xl">
            Revenue, subscription health, incidents, and tenant performance at one place. Prioritize risks before they impact growth.
          </p>
          <div className="absolute top-4 right-4 flex flex-wrap gap-2 max-w-xs">
            <div className="bg-destructive/80 text-primary-foreground text-xs rounded-lg px-3 py-2 cursor-pointer hover:bg-destructive transition-colors" onClick={() => navigate("/superadmin-support")}>
              <div className="font-semibold">Open Incidents</div><div>7 pending</div>
            </div>
            <div className="bg-primary/60 text-primary-foreground text-xs rounded-lg px-3 py-2 cursor-pointer hover:bg-primary/80 transition-colors" onClick={() => navigate("/superadmin-subscriptions")}>
              <div className="font-semibold">Payment Risk</div><div>3 grace accounts</div>
            </div>
            <div className="bg-green-600/80 text-primary-foreground text-xs rounded-lg px-3 py-2 cursor-pointer hover:bg-green-600 transition-colors" onClick={() => navigate("/superadmin-restaurants")}>
              <div className="font-semibold">Restaurant Health</div><div>89.4 score</div>
            </div>
            <div className="bg-sidebar-background/80 text-primary-foreground text-xs rounded-lg px-3 py-2 cursor-pointer hover:bg-sidebar-background transition-colors" onClick={() => navigate("/superadmin-analytics")}>
              <div className="font-semibold">Analytics Deep Dive</div><div>Open charts</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-card rounded-xl p-5 shadow-card border border-border">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-8 h-8 rounded-lg ${s.color} flex items-center justify-center`}><s.icon className="w-4 h-4" /></div>
                <span className="flex items-center gap-1 text-xs font-medium text-green-600"><ArrowUpRight className="w-3 h-3" /> {s.change}</span>
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{s.label}</p>
              <p className="text-2xl font-bold font-display text-foreground">{s.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-card rounded-xl p-6 shadow-card border border-border">
            <h3 className="font-display font-semibold text-foreground mb-4">Revenue Growth vs Churn Risk</h3>
            <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
              Chart placeholder — connect data for live view
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-foreground">Priority Alerts</h3>
              <AlertTriangle className="w-4 h-4 text-destructive" />
            </div>
            <div className="space-y-3">
              {alerts.map((a, i) => (
                <div key={i} className={`p-3 rounded-lg border ${a.color} cursor-pointer hover:shadow-card transition-shadow`} onClick={() => navigate(a.route)}>
                  <p className="text-sm font-medium text-foreground">{a.text}</p>
                  <p className="text-xs text-primary font-medium mt-1 hover:underline">{a.action}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </SuperAdminLayout>
  );
}
