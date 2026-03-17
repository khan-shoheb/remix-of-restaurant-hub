import SuperAdminLayout from "@/components/SuperAdminLayout";
import { motion } from "framer-motion";
import { Building2, Search, Plus, ShieldCheck, Edit, XCircle, Power } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const restaurants = [
  { name: "Demo Restaurant", owner: "Admin", plan: "Standard", health: 84, users: 49, status: "Active" },
  { name: "Shoheb", owner: "Shoheb Khan", plan: "Standard", health: 83, users: 48, status: "Active" },
  { name: "Demo Restaurant", owner: "Admin", plan: "Standard", health: 82, users: 47, status: "Active" },
  { name: "Demo Restaurant", owner: "Platform Team", plan: "Standard", health: 81, users: 46, status: "Active" },
];

const statCards = [
  { label: "TOTAL", value: "4", color: "text-foreground" },
  { label: "ACTIVE", value: "4", color: "text-green-600" },
  { label: "PREMIUM", value: "0", color: "text-primary" },
  { label: "AT RISK", value: "0", color: "text-destructive" },
];

export default function SARestaurants() {
  const [search, setSearch] = useState("");

  return (
    <SuperAdminLayout>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="rounded-2xl bg-gradient-to-r from-sidebar-background to-primary/80 p-8 mb-6 text-primary-foreground flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-display mb-2">Restaurant Portfolio</h1>
            <p className="text-primary-foreground/80">Monitor tenant health, growth plan, and activation quality.</p>
          </div>
          <Button variant="outline" className="bg-primary-foreground text-foreground border-0 gap-2">
            <Plus className="w-4 h-4" /> Add Restaurant
          </Button>
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
          <select className="rounded-lg border border-input bg-background px-3 text-sm">
            <option>All Plans</option>
          </select>
          <select className="rounded-lg border border-input bg-background px-3 text-sm">
            <option>All Status</option>
          </select>
        </div>

        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Restaurant</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Owner</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Plan</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Health</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Users</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Status</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((r, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-6 py-4 font-medium text-foreground">{r.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{r.owner}</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 rounded bg-secondary text-secondary-foreground text-xs font-medium">{r.plan}</span></td>
                  <td className="px-6 py-4"><span className="flex items-center gap-1 text-green-600"><ShieldCheck className="w-3.5 h-3.5" />{r.health}</span></td>
                  <td className="px-6 py-4 text-muted-foreground">{r.users}</td>
                  <td className="px-6 py-4"><span className="flex items-center gap-1 text-green-600 text-xs font-medium"><span className="w-1.5 h-1.5 rounded-full bg-green-500" />{r.status}</span></td>
                  <td className="px-6 py-4 flex items-center gap-3">
                    <button className="text-primary text-xs font-medium hover:underline">Edit</button>
                    <button className="text-muted-foreground text-xs font-medium hover:underline">Deactivate</button>
                    <button className="text-destructive text-xs font-medium hover:underline">Remove</button>
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
