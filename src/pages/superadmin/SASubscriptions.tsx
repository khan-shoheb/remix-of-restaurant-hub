import SuperAdminLayout from "@/components/SuperAdminLayout";
import { motion } from "framer-motion";
import { Search, ShieldCheck, RefreshCw, AlertTriangle, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

const subscriptions = [
  { restaurant: "Demo Restaurant", owner: "Platform Team", plan: "Standard", mrr: "Rs. 24000", status: "Active", expiry: "2026-06-13", risk: "Healthy" },
];

const statCards = [
  { label: "Active", value: "1", color: "text-green-600" },
  { label: "Grace Period", value: "0", color: "text-yellow-600" },
  { label: "Suspended", value: "0", color: "text-destructive" },
];

export default function SASubscriptions() {
  return (
    <SuperAdminLayout>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="rounded-2xl bg-gradient-to-r from-sidebar-background to-primary/80 p-8 mb-6 text-primary-foreground flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-display mb-2">Subscription Control Hub</h1>
            <p className="text-primary-foreground/80">Track renewals, recover risky accounts, and automate grace-to-suspend lifecycle.</p>
          </div>
          <div className="bg-primary-foreground/20 text-primary-foreground text-xs rounded-full px-4 py-2 font-medium">
            Churn Risk Today: 0 accounts
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {statCards.map((s) => (
            <div key={s.label} className="bg-card rounded-xl p-5 shadow-card border border-border">
              <p className={`text-xs font-medium uppercase tracking-wide ${s.color}`}>{s.label}</p>
              <p className={`text-3xl font-bold font-display ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search by restaurant or owner" className="pl-10" />
          </div>
          <select className="rounded-lg border border-input bg-background px-3 text-sm"><option>All Status</option></select>
        </div>

        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Restaurant", "Owner", "Plan", "MRR", "Status", "Expiry", "Risk", "Actions"].map((h) => (
                  <th key={h} className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((s, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="px-6 py-4 font-medium text-foreground">{s.restaurant}</td>
                  <td className="px-6 py-4 text-muted-foreground">{s.owner}</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 rounded bg-secondary text-xs font-medium">{s.plan}</span></td>
                  <td className="px-6 py-4 text-foreground">{s.mrr}</td>
                  <td className="px-6 py-4"><span className="flex items-center gap-1 text-green-600 text-xs font-medium"><span className="w-1.5 h-1.5 rounded-full bg-green-500" />{s.status}</span></td>
                  <td className="px-6 py-4 text-muted-foreground">{s.expiry}</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-medium">{s.risk}</span></td>
                  <td className="px-6 py-4 flex items-center gap-3">
                    <button className="text-primary text-xs font-medium hover:underline flex items-center gap-1"><RefreshCw className="w-3 h-3" />Renew</button>
                    <button className="text-yellow-600 text-xs font-medium hover:underline flex items-center gap-1"><AlertTriangle className="w-3 h-3" />Grace</button>
                    <button className="text-destructive text-xs font-medium hover:underline flex items-center gap-1"><XCircle className="w-3 h-3" />Suspend</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </SuperAdminLayout>
  );
}
