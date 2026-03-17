import SuperAdminLayout from "@/components/SuperAdminLayout";
import { motion } from "framer-motion";
import {
  Monitor,
  Building2,
  ShieldCheck,
  Users,
  ArrowUpRight,
  AlertTriangle,
} from "lucide-react";

const stats = [
  { label: "Platform MRR", value: "Rs. 30.1L", change: "+12.4%", icon: Monitor, color: "bg-primary/10 text-primary" },
  { label: "Active Restaurants", value: "128 / 142", change: "+4 this month", icon: Building2, color: "bg-accent/10 text-accent" },
  { label: "SLA Resolution", value: "96.2%", change: "-1.1%", icon: ShieldCheck, color: "bg-green-100 text-green-600" },
  { label: "Total Users", value: "8,540", change: "+382", icon: Users, color: "bg-purple-100 text-purple-600" },
];

const alerts = [
  { text: "3 restaurants in payment grace", action: "Review subscriptions", color: "bg-destructive/5 border-destructive/20" },
  { text: "API latency crossed 450ms in West zone", action: "Open platform analytics", color: "bg-yellow-50 border-yellow-200" },
  { text: "7 unresolved support tickets > 12h", action: "Escalate support queue", color: "bg-destructive/5 border-destructive/20" },
];

export default function SuperAdminDashboard() {
  return (
    <SuperAdminLayout>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        {/* Hero Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-sidebar-background to-primary/80 p-8 mb-6 text-primary-foreground relative overflow-hidden">
          <div className="flex items-center gap-2 text-xs font-medium bg-primary-foreground/20 w-fit px-3 py-1.5 rounded-full mb-4">
            <Settings className="w-3.5 h-3.5" /> LIVE COMMAND CENTER
          </div>
          <h1 className="text-3xl font-bold font-display mb-2">Super Admin Control Tower</h1>
          <p className="text-primary-foreground/80 max-w-xl">
            Revenue, subscription health, incidents, and tenant performance at one place. Prioritize risks before they impact growth.
          </p>
          <div className="absolute top-4 right-4 flex flex-wrap gap-2 max-w-xs">
            <div className="bg-destructive/80 text-primary-foreground text-xs rounded-lg px-3 py-2">
              <div className="font-semibold">Open Incidents</div><div>7 pending</div>
            </div>
            <div className="bg-primary/60 text-primary-foreground text-xs rounded-lg px-3 py-2">
              <div className="font-semibold">Payment Risk</div><div>3 grace accounts</div>
            </div>
            <div className="bg-green-600/80 text-primary-foreground text-xs rounded-lg px-3 py-2">
              <div className="font-semibold">Restaurant Health</div><div>89.4 score</div>
            </div>
            <div className="bg-sidebar-background/80 text-primary-foreground text-xs rounded-lg px-3 py-2">
              <div className="font-semibold">Analytics Deep Dive</div><div>Open charts</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-card rounded-xl p-5 shadow-card border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-8 h-8 rounded-lg ${s.color} flex items-center justify-center`}>
                  <s.icon className="w-4 h-4" />
                </div>
                <span className="flex items-center gap-1 text-xs font-medium text-green-600">
                  <ArrowUpRight className="w-3 h-3" /> {s.change}
                </span>
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{s.label}</p>
              <p className="text-2xl font-bold font-display text-foreground">{s.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Alerts */}
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
                <div key={i} className={`p-3 rounded-lg border ${a.color}`}>
                  <p className="text-sm font-medium text-foreground">{a.text}</p>
                  <p className="text-xs text-primary font-medium mt-1 cursor-pointer hover:underline">{a.action}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </SuperAdminLayout>
  );
}

function Settings(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}
