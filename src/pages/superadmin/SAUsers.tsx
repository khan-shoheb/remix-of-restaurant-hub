import SuperAdminLayout from "@/components/SuperAdminLayout";
import { motion } from "framer-motion";
import { Search, Plus, Shield, MoreVertical, Edit, Trash2, KeyRound } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

const initialUsers = [
  { id: 1, name: "Shoheb Khan", email: "shoheb@room.com", role: "admin", restaurant: "shoheb", status: "active", policy: "Compliant" },
  { id: 2, name: "Admin", email: "admin@demo.com", role: "admin", restaurant: "Demo Restaurant", status: "active", policy: "Compliant" },
];

export default function SAUsers() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", restaurant: "" });

  const filtered = users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  const handleAdd = () => {
    if (!form.name || !form.email) { toast.error("Name and email are required"); return; }
    setUsers((prev) => [...prev, { id: Date.now(), name: form.name, email: form.email, role: "admin", restaurant: form.restaurant || "Unassigned", status: "active", policy: "Pending" }]);
    setForm({ name: "", email: "", restaurant: "" });
    setOpen(false);
    toast.success(`Admin ${form.name} created with temporary password`);
  };

  const handleDelete = (id: number, name: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    toast.success(`${name} removed`);
  };

  const resetPassword = (name: string) => {
    toast.success(`Password reset email sent to ${name}`);
  };

  return (
    <SuperAdminLayout>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold font-display text-foreground mb-1">Admin Access Control</h1>
            <p className="text-sm text-muted-foreground">Create and manage restaurant admin accounts with temporary-password workflow.</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button className="gap-2"><Plus className="w-4 h-4" /> Add Admin</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Add Admin</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <div><Label>Name *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Admin name" /></div>
                <div><Label>Email *</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email address" /></div>
                <div><Label>Restaurant</Label><Input value={form.restaurant} onChange={(e) => setForm({ ...form, restaurant: e.target.value })} placeholder="Assigned restaurant" /></div>
                <Button className="w-full" onClick={handleAdd}>Create Admin</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search by name, email, restaurant" className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
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
              {filtered.map((u) => (
                <tr key={u.id} className="border-b border-border last:border-0 hover:bg-muted/30">
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
                    <span className={`px-2 py-1 rounded text-xs font-medium ${u.policy === "Compliant" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{u.policy}</span>
                  </td>
                  <td className="px-6 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><button><MoreVertical className="w-4 h-4 text-muted-foreground cursor-pointer" /></button></DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => toast.info(`Editing ${u.name} — coming soon`)}><Edit className="w-3 h-3 mr-2" />Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => resetPassword(u.name)}><KeyRound className="w-3 h-3 mr-2" />Reset Password</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(u.id, u.name)}><Trash2 className="w-3 h-3 mr-2" />Remove</DropdownMenuItem>
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
