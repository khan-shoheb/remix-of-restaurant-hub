import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Users, Search, Plus, Phone, Mail, Star, MoreHorizontal, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

const initialCustomers = [
  { id: 1, name: "Arjun Mehta", phone: "9876500001", email: "arjun@mail.com", visits: 24, spent: "₹18,400", lastVisit: "14 Mar", rating: 5, type: "Regular" },
  { id: 2, name: "Kavita Reddy", phone: "9876500002", email: "kavita@mail.com", visits: 12, spent: "₹9,200", lastVisit: "13 Mar", rating: 4, type: "Regular" },
  { id: 3, name: "Mohit Agarwal", phone: "9876500003", email: "mohit@mail.com", visits: 45, spent: "₹52,000", lastVisit: "14 Mar", rating: 5, type: "VIP" },
  { id: 4, name: "Sneha Iyer", phone: "9876500004", email: "sneha@mail.com", visits: 3, spent: "₹2,800", lastVisit: "10 Mar", rating: 3, type: "New" },
  { id: 5, name: "Deepak Jain", phone: "9876500005", email: "deepak@mail.com", visits: 31, spent: "₹28,600", lastVisit: "12 Mar", rating: 5, type: "VIP" },
  { id: 6, name: "Ritu Sharma", phone: "9876500006", email: "ritu@mail.com", visits: 8, spent: "₹6,400", lastVisit: "9 Mar", rating: 4, type: "Regular" },
  { id: 7, name: "Suresh Nair", phone: "9876500007", email: "suresh@mail.com", visits: 1, spent: "₹1,200", lastVisit: "14 Mar", rating: 0, type: "New" },
];

const typeColor: Record<string, string> = { VIP: "bg-primary/10 text-primary", Regular: "bg-secondary text-secondary-foreground", New: "bg-green-100 text-green-700" };

export default function CRM() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", type: "New" });

  const filtered = customers.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search));

  const handleAdd = () => {
    if (!form.name || !form.phone) { toast.error("Name and phone are required"); return; }
    setCustomers((prev) => [...prev, { id: Date.now(), name: form.name, phone: form.phone, email: form.email, visits: 0, spent: "₹0", lastVisit: "Today", rating: 0, type: form.type }]);
    setForm({ name: "", phone: "", email: "", type: "New" });
    setOpen(false);
    toast.success(`${form.name} added as customer`);
  };

  const handleDelete = (id: number, name: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    toast.success(`${name} removed`);
  };

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Users className="w-5 h-5 text-primary" /></div>
            <div>
              <h1 className="text-2xl font-bold font-display text-foreground">CRM</h1>
              <p className="text-sm text-muted-foreground">Customer relationships & feedback</p>
            </div>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button size="sm"><Plus className="w-4 h-4 mr-1" />Add Customer</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Add Customer</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <div><Label>Name *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Customer name" /></div>
                <div><Label>Phone *</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone number" /></div>
                <div><Label>Email</Label><Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email address" /></div>
                <div><Label>Type</Label>
                  <select className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                    <option>New</option><option>Regular</option><option>VIP</option>
                  </select>
                </div>
                <Button className="w-full" onClick={handleAdd}>Add Customer</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          {[{ label: "Total Customers", value: customers.length.toString() }, { label: "VIP", value: customers.filter((c) => c.type === "VIP").length.toString() }, { label: "New This Month", value: customers.filter((c) => c.type === "New").length.toString() }, { label: "Total Revenue", value: "₹1,18,600" }].map((s) => (
            <div key={s.label} className="bg-card rounded-xl p-4 shadow-card border border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{s.label}</p>
              <p className="text-xl font-bold font-display text-foreground mt-1">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search customers..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }} className="bg-card rounded-xl p-5 shadow-card border border-border hover:shadow-elevated transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">{c.name.charAt(0)}</div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{c.name}</h3>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${typeColor[c.type]}`}>{c.type}</span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="w-4 h-4" /></Button></DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => toast.info(`Editing ${c.name} — coming soon`)}><Edit className="w-3 h-3 mr-2" />Edit</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(c.id, c.name)}><Trash2 className="w-3 h-3 mr-2" />Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="space-y-1.5 text-xs text-muted-foreground mb-3">
                <div className="flex items-center gap-2"><Phone className="w-3 h-3" />{c.phone}</div>
                <div className="flex items-center gap-2"><Mail className="w-3 h-3" />{c.email}</div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div>
                  <span className="text-xs text-muted-foreground">{c.visits} visits</span>
                  <span className="text-xs text-muted-foreground ml-3">Spent: {c.spent}</span>
                </div>
                <div className="flex">{Array.from({ length: 5 }).map((_, si) => <Star key={si} className={`w-3 h-3 ${si < c.rating ? "fill-primary text-primary" : "text-muted"}`} />)}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
