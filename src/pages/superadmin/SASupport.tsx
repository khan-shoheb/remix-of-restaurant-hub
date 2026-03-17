import SuperAdminLayout from "@/components/SuperAdminLayout";
import { motion } from "framer-motion";
import { Search, Plus, MessageSquare, Clock, CheckCircle, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const tickets = [
  { id: "#2", subject: "Menu not syncing", restaurant: "Demo Restaurant", priority: "medium", assignee: "Unassigned", sla: "6h left", status: "in-progress", time: "2026-03-15" },
  { id: "#1", subject: "Payment gateway issue", restaurant: "Demo Restaurant", priority: "medium", assignee: "Unassigned", sla: "6h left", status: "open", time: "2026-03-15" },
];

const statCards = [
  { label: "Open Tickets", value: "1", icon: MessageSquare, color: "text-primary" },
  { label: "In Progress", value: "1", icon: Clock, color: "text-yellow-600" },
  { label: "Resolved", value: "0", icon: CheckCircle, color: "text-green-600" },
];

export default function SASupport() {
  return (
    <SuperAdminLayout>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="rounded-2xl bg-gradient-to-r from-sidebar-background to-primary/80 p-8 mb-6 text-primary-foreground flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-display mb-2">Support Command Desk</h1>
            <p className="text-primary-foreground/80">Track SLA, assign ownership, and resolve tenant issues before escalation.</p>
          </div>
          <Button variant="outline" className="bg-primary-foreground text-foreground border-0 gap-2">
            <Plus className="w-4 h-4" /> Create Ticket
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {statCards.map((s) => (
            <div key={s.label} className="bg-card rounded-xl p-5 shadow-card border border-border flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                <p className={`text-3xl font-bold font-display ${s.color}`}>{s.value}</p>
              </div>
              <s.icon className={`w-6 h-6 ${s.color}`} />
            </div>
          ))}
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search by subject or restaurant" className="pl-10" />
          </div>
          <select className="rounded-lg border border-input bg-background px-3 text-sm"><option>All Status</option></select>
        </div>

        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Ticket", "Subject", "Restaurant", "Priority", "Assignee", "SLA", "Status", "Time"].map((h) => (
                  <th key={h} className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">{h}</th>
                ))}
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-6 py-4 font-medium text-foreground">{t.id}</td>
                  <td className="px-6 py-4 text-foreground">{t.subject}</td>
                  <td className="px-6 py-4 text-muted-foreground">{t.restaurant}</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs font-medium">{t.priority}</span></td>
                  <td className="px-6 py-4 text-muted-foreground">{t.assignee}</td>
                  <td className="px-6 py-4"><span className="text-xs text-yellow-600 font-medium">⏱ {t.sla}</span></td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${t.status === "open" ? "bg-destructive/10 text-destructive" : "bg-yellow-100 text-yellow-700"}`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{t.time}</td>
                  <td className="px-6 py-4"><MoreVertical className="w-4 h-4 text-muted-foreground cursor-pointer" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </SuperAdminLayout>
  );
}
