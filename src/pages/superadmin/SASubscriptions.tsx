import SuperAdminLayout from "@/components/SuperAdminLayout";
import { motion } from "framer-motion";
import { Search, RefreshCw, AlertTriangle, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const initialSubscriptions = [
  { restaurant: "Demo Restaurant", owner: "Platform Team", plan: "Standard", mrr: "Rs. 24000", status: "Active", expiry: "2026-06-13", risk: "Healthy" },
];

export default function SASubscriptions() {
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
  const [search, setSearch] = useState("");

  const filtered = subscriptions.filter((s) => s.restaurant.toLowerCase().includes(search.toLowerCase()) || s.owner.toLowerCase().includes(search.toLowerCase()));

  const handleRenew = (i: number) => {
    setSubscriptions((prev) => prev.map((s, idx) => idx === i ? { ...s, status: "Active", risk: "Healthy", expiry: "2027-06-13" } : s));
    toast.success(`${subscriptions[i].restaurant} subscription renewed!`);
  };

  const handleGrace = (i: number) => {
    setSubscriptions((prev) => prev.map((s, idx) => idx === i ? { ...s, status: "Grace Period", risk: "At Risk" } : s));
    toast.warning(`${subscriptions[i].restaurant} moved to grace period`);
  };

  const handleSuspend = (i: number) => {
    setSubscriptions((prev) => prev.map((s, idx) => idx === i ? { ...s, status: "Suspended", risk: "Critical" } : s));
    toast.error(`${subscriptions[i].restaurant} suspended`);
  };

  const statCards = [
    { label: "Active", value: subscriptions.filter((s) => s.status === "Active").length.toString(), color: "text-green-600" },
    { label: "Grace Period", value: subscriptions.filter((s) => s.status === "Grace Period").length.toString(), color: "text-yellow-600" },
    { label: "Suspended", value: subscriptions.filter((s) => s.status === "Suspended").length.toString(), color: "text-destructive" },
  ];

  const riskColor: Record<string, string> = { Healthy: "bg-green-100 text-green-700", "At Risk": "bg-yellow-100 text-yellow-700", Critical: "bg-red-100 text-red-700" };
  const statusColor: Record<string, string> = { Active: "text-green-600", "Grace Period": "text-yellow-600", Suspended: "text-destructive" };
  const statusDot: Record<string, string> = { Active: "bg-green-500", "Grace Period": "bg-yellow-500", Suspended: "bg-destructive" };

  return (
    <SuperAdminLayout>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="rounded-2xl bg-gradient-to-r from-sidebar-background to-primary/80 p-8 mb-6 text-primary-foreground flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-display mb-2">Subscription Control Hub</h1>
            <p className="text-primary-foreground/80">Track renewals, recover risky accounts, and automate grace-to-suspend lifecycle.</p>
          </div>
          <div className="bg-primary-foreground/20 text-primary-foreground text-xs rounded-full px-4 py-2 font-medium">
            Churn Risk Today: {subscriptions.filter((s) => s.risk !== "Healthy").length} accounts
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
            <Input placeholder="Search by restaurant or owner" className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
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
              {filtered.map((s, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="px-6 py-4 font-medium text-foreground">{s.restaurant}</td>
                  <td className="px-6 py-4 text-muted-foreground">{s.owner}</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 rounded bg-secondary text-xs font-medium">{s.plan}</span></td>
                  <td className="px-6 py-4 text-foreground">{s.mrr}</td>
                  <td className="px-6 py-4"><span className={`flex items-center gap-1 text-xs font-medium ${statusColor[s.status] || "text-foreground"}`}><span className={`w-1.5 h-1.5 rounded-full ${statusDot[s.status] || "bg-muted"}`} />{s.status}</span></td>
                  <td className="px-6 py-4 text-muted-foreground">{s.expiry}</td>
                  <td className="px-6 py-4"><span className={`px-2 py-1 rounded text-xs font-medium ${riskColor[s.risk] || "bg-muted text-muted-foreground"}`}>{s.risk}</span></td>
                  <td className="px-6 py-4 flex items-center gap-3">
                    <button className="text-primary text-xs font-medium hover:underline flex items-center gap-1" onClick={() => handleRenew(i)}><RefreshCw className="w-3 h-3" />Renew</button>
                    <button className="text-yellow-600 text-xs font-medium hover:underline flex items-center gap-1" onClick={() => handleGrace(i)}><AlertTriangle className="w-3 h-3" />Grace</button>
                    <button className="text-destructive text-xs font-medium hover:underline flex items-center gap-1" onClick={() => handleSuspend(i)}><XCircle className="w-3 h-3" />Suspend</button>
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
