import SuperAdminLayout from "@/components/SuperAdminLayout";
import { motion } from "framer-motion";
import { Search, Plus, MessageSquare, Clock, CheckCircle, MoreVertical, Edit, Trash2, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

const initialTickets = [
  { id: "#2", subject: "Menu not syncing", restaurant: "Demo Restaurant", priority: "medium", assignee: "Unassigned", sla: "6h left", status: "in-progress", time: "2026-03-15" },
  { id: "#1", subject: "Payment gateway issue", restaurant: "Demo Restaurant", priority: "medium", assignee: "Unassigned", sla: "6h left", status: "open", time: "2026-03-15" },
];

export default function SASupport() {
  const [tickets, setTickets] = useState(initialTickets);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ subject: "", restaurant: "", priority: "medium" });

  const filtered = tickets.filter((t) => t.subject.toLowerCase().includes(search.toLowerCase()) || t.restaurant.toLowerCase().includes(search.toLowerCase()));

  const statCards = [
    { label: "Open Tickets", value: tickets.filter((t) => t.status === "open").length.toString(), icon: MessageSquare, color: "text-primary" },
    { label: "In Progress", value: tickets.filter((t) => t.status === "in-progress").length.toString(), icon: Clock, color: "text-yellow-600" },
    { label: "Resolved", value: tickets.filter((t) => t.status === "resolved").length.toString(), icon: CheckCircle, color: "text-green-600" },
  ];

  const handleAdd = () => {
    if (!form.subject) { toast.error("Subject is required"); return; }
    setTickets((prev) => [{ id: `#${prev.length + 1}`, subject: form.subject, restaurant: form.restaurant || "Unknown", priority: form.priority, assignee: "Unassigned", sla: "12h left", status: "open", time: new Date().toISOString().split("T")[0] }, ...prev]);
    setForm({ subject: "", restaurant: "", priority: "medium" });
    setOpen(false);
    toast.success("Ticket created!");
  };

  const resolveTicket = (id: string) => {
    setTickets((prev) => prev.map((t) => t.id === id ? { ...t, status: "resolved" } : t));
    toast.success(`Ticket ${id} resolved`);
  };

  const assignTicket = (id: string) => {
    setTickets((prev) => prev.map((t) => t.id === id ? { ...t, assignee: "Support Team", status: "in-progress" } : t));
    toast.success(`Ticket ${id} assigned to Support Team`);
  };

  const deleteTicket = (id: string) => {
    setTickets((prev) => prev.filter((t) => t.id !== id));
    toast.success(`Ticket ${id} deleted`);
  };

  return (
    <SuperAdminLayout>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="rounded-2xl bg-gradient-to-r from-sidebar-background to-primary/80 p-8 mb-6 text-primary-foreground flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-display mb-2">Support Command Desk</h1>
            <p className="text-primary-foreground/80">Track SLA, assign ownership, and resolve tenant issues before escalation.</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-primary-foreground text-foreground border-0 gap-2"><Plus className="w-4 h-4" /> Create Ticket</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Create Support Ticket</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <div><Label>Subject *</Label><Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Issue description" /></div>
                <div><Label>Restaurant</Label><Input value={form.restaurant} onChange={(e) => setForm({ ...form, restaurant: e.target.value })} placeholder="Restaurant name" /></div>
                <div><Label>Priority</Label>
                  <select className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
                    <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="critical">Critical</option>
                  </select>
                </div>
                <Button className="w-full" onClick={handleAdd}>Create Ticket</Button>
              </div>
            </DialogContent>
          </Dialog>
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
            <Input placeholder="Search by subject or restaurant" className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
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
              {filtered.map((t) => (
                <tr key={t.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-6 py-4 font-medium text-foreground">{t.id}</td>
                  <td className="px-6 py-4 text-foreground">{t.subject}</td>
                  <td className="px-6 py-4 text-muted-foreground">{t.restaurant}</td>
                  <td className="px-6 py-4"><span className={`px-2 py-1 rounded text-xs font-medium ${t.priority === "high" || t.priority === "critical" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>{t.priority}</span></td>
                  <td className="px-6 py-4 text-muted-foreground">{t.assignee}</td>
                  <td className="px-6 py-4"><span className="text-xs text-yellow-600 font-medium">⏱ {t.sla}</span></td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${t.status === "open" ? "bg-destructive/10 text-destructive" : t.status === "resolved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{t.status}</span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{t.time}</td>
                  <td className="px-6 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><button><MoreVertical className="w-4 h-4 text-muted-foreground cursor-pointer" /></button></DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {t.assignee === "Unassigned" && <DropdownMenuItem onClick={() => assignTicket(t.id)}><UserPlus className="w-3 h-3 mr-2" />Assign</DropdownMenuItem>}
                        {t.status !== "resolved" && <DropdownMenuItem onClick={() => resolveTicket(t.id)}><CheckCircle className="w-3 h-3 mr-2" />Resolve</DropdownMenuItem>}
                        <DropdownMenuItem className="text-destructive" onClick={() => deleteTicket(t.id)}><Trash2 className="w-3 h-3 mr-2" />Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
