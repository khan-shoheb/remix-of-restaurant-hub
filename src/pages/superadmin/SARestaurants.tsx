import SuperAdminLayout from "@/components/SuperAdminLayout";
import { motion } from "framer-motion";
import { Building2, Search, Plus, ShieldCheck, Edit, XCircle, Power } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

const initialRestaurants = [
  { name: "Demo Restaurant", owner: "Admin", plan: "Standard", health: 84, users: 49, status: "Active" },
  { name: "Shoheb", owner: "Shoheb Khan", plan: "Standard", health: 83, users: 48, status: "Active" },
  { name: "Demo Restaurant", owner: "Admin", plan: "Standard", health: 82, users: 47, status: "Active" },
  { name: "Demo Restaurant", owner: "Platform Team", plan: "Standard", health: 81, users: 46, status: "Active" },
];

export default function SARestaurants() {
  const [restaurants, setRestaurants] = useState(initialRestaurants);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", owner: "", plan: "Standard" });

  const filtered = restaurants.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()) || r.owner.toLowerCase().includes(search.toLowerCase()));

  const handleAdd = () => {
    if (!form.name || !form.owner) { toast.error("Name and owner are required"); return; }
    setRestaurants((prev) => [...prev, { name: form.name, owner: form.owner, plan: form.plan, health: Math.floor(Math.random() * 20) + 70, users: Math.floor(Math.random() * 30) + 10, status: "Active" }]);
    setForm({ name: "", owner: "", plan: "Standard" });
    setOpen(false);
    toast.success(`${form.name} added!`);
  };

  const toggleStatus = (index: number) => {
    setRestaurants((prev) => prev.map((r, i) => i === index ? { ...r, status: r.status === "Active" ? "Inactive" : "Active" } : r));
    toast.success("Status updated");
  };

  const removeRestaurant = (index: number) => {
    const name = restaurants[index].name;
    setRestaurants((prev) => prev.filter((_, i) => i !== index));
    toast.success(`${name} removed`);
  };

  const statCards = [
    { label: "TOTAL", value: restaurants.length.toString(), color: "text-foreground" },
    { label: "ACTIVE", value: restaurants.filter((r) => r.status === "Active").length.toString(), color: "text-green-600" },
    { label: "PREMIUM", value: "0", color: "text-primary" },
    { label: "AT RISK", value: restaurants.filter((r) => r.health < 75).length.toString(), color: "text-destructive" },
  ];

  return (
    <SuperAdminLayout>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="rounded-2xl bg-gradient-to-r from-sidebar-background to-primary/80 p-8 mb-6 text-primary-foreground flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-display mb-2">Restaurant Portfolio</h1>
            <p className="text-primary-foreground/80">Monitor tenant health, growth plan, and activation quality.</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-primary-foreground text-foreground border-0 gap-2"><Plus className="w-4 h-4" /> Add Restaurant</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Add Restaurant</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <div><Label>Restaurant Name *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Restaurant name" /></div>
                <div><Label>Owner *</Label><Input value={form.owner} onChange={(e) => setForm({ ...form, owner: e.target.value })} placeholder="Owner name" /></div>
                <div><Label>Plan</Label>
                  <select className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" value={form.plan} onChange={(e) => setForm({ ...form, plan: e.target.value })}>
                    <option>Standard</option><option>Premium</option><option>Enterprise</option>
                  </select>
                </div>
                <Button className="w-full" onClick={handleAdd}>Add Restaurant</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statCards.map((s) => (
            <div key={s.label} className="bg-card rounded-xl p-5 shadow-card border border-border">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{s.label}</p>
              <p className={`text-3xl font-bold font-display ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search by restaurant, owner, city" className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Restaurant", "Owner", "Plan", "Health", "Users", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-6 py-4 font-medium text-foreground">{r.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{r.owner}</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 rounded bg-secondary text-secondary-foreground text-xs font-medium">{r.plan}</span></td>
                  <td className="px-6 py-4"><span className={`flex items-center gap-1 ${r.health >= 80 ? "text-green-600" : r.health >= 60 ? "text-yellow-600" : "text-destructive"}`}><ShieldCheck className="w-3.5 h-3.5" />{r.health}</span></td>
                  <td className="px-6 py-4 text-muted-foreground">{r.users}</td>
                  <td className="px-6 py-4"><span className={`flex items-center gap-1 text-xs font-medium ${r.status === "Active" ? "text-green-600" : "text-destructive"}`}><span className={`w-1.5 h-1.5 rounded-full ${r.status === "Active" ? "bg-green-500" : "bg-destructive"}`} />{r.status}</span></td>
                  <td className="px-6 py-4 flex items-center gap-3">
                    <button className="text-primary text-xs font-medium hover:underline" onClick={() => toast.info(`Editing ${r.name} — coming soon`)}>Edit</button>
                    <button className="text-muted-foreground text-xs font-medium hover:underline" onClick={() => toggleStatus(i)}>{r.status === "Active" ? "Deactivate" : "Activate"}</button>
                    <button className="text-destructive text-xs font-medium hover:underline" onClick={() => removeRestaurant(i)}>Remove</button>
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
