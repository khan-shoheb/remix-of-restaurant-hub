import SuperAdminLayout from "@/components/SuperAdminLayout";
import { motion } from "framer-motion";
import { Search, Plus, Shield, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const users = [
  { name: "Shoheb Khan", email: "shoheb@room.com", role: "admin", restaurant: "shoheb", status: "active", policy: "Compliant" },
  { name: "Admin", email: "admin@demo.com", role: "admin", restaurant: "Demo Restaurant", status: "active", policy: "Compliant" },
];

export default function SAUsers() {
  return (
    <SuperAdminLayout>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold font-display text-foreground mb-1">Admin Access Control</h1>
            <p className="text-sm text-muted-foreground">Create and manage restaurant admin accounts with temporary-password workflow.</p>
          </div>
          <Button className="gap-2"><Plus className="w-4 h-4" /> Add Admin</Button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search by name, email, restaurant" className="pl-10" />
        </div>

        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Admin", "Role", "Restaurant", "Status", "Password Policy"].map((h) => (
                  <th key={h} className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase">{h}</th>
                ))}
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-6 py-4">
                    <div className="font-medium text-foreground">{u.name}</div>
                    <div className="text-xs text-primary">{u.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 text-xs font-medium text-primary border border-primary/30 rounded-full px-2 py-0.5 w-fit">
                      <Shield className="w-3 h-3" />{u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{u.restaurant}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-medium">{u.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-medium">{u.policy}</span>
                  </td>
                  <td className="px-6 py-4">
                    <MoreVertical className="w-4 h-4 text-muted-foreground cursor-pointer" />
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
