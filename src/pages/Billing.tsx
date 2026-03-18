import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Receipt, Search, Download, Plus, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

const initialInvoices = [
  { id: "INV-001", customer: "Table 5", items: 4, total: "₹2,340", date: "14 Mar 2026", time: "12:30 PM", method: "UPI", status: "Paid" },
  { id: "INV-002", customer: "Table 12", items: 6, total: "₹4,890", date: "14 Mar 2026", time: "1:15 PM", method: "Card", status: "Paid" },
  { id: "INV-003", customer: "Delivery #45", items: 2, total: "₹980", date: "14 Mar 2026", time: "2:00 PM", method: "Cash", status: "Pending" },
  { id: "INV-004", customer: "Table 3", items: 8, total: "₹6,200", date: "14 Mar 2026", time: "7:30 PM", method: "Card", status: "Paid" },
  { id: "INV-005", customer: "Table 8", items: 3, total: "₹1,560", date: "13 Mar 2026", time: "8:45 PM", method: "UPI", status: "Paid" },
  { id: "INV-006", customer: "Delivery #44", items: 5, total: "₹2,100", date: "13 Mar 2026", time: "6:00 PM", method: "Online", status: "Refunded" },
];

const statusColor: Record<string, string> = { Paid: "bg-green-100 text-green-700", Pending: "bg-yellow-100 text-yellow-700", Refunded: "bg-red-100 text-red-700" };

export default function Billing() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [search, setSearch] = useState("");
  const [viewInv, setViewInv] = useState<typeof initialInvoices[0] | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({ customer: "", items: "", total: "", method: "Cash" });

  const filtered = invoices.filter((inv) => inv.id.toLowerCase().includes(search.toLowerCase()) || inv.customer.toLowerCase().includes(search.toLowerCase()));

  const handleExport = () => {
    const csv = "ID,Customer,Items,Total,Date,Method,Status\n" + invoices.map((i) => `${i.id},${i.customer},${i.items},${i.total},${i.date},${i.method},${i.status}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "invoices.csv"; a.click();
    toast.success("Invoices exported!");
  };

  const handleAdd = () => {
    if (!form.customer || !form.total) { toast.error("Customer and total are required"); return; }
    const newInv = { id: `INV-${String(invoices.length + 1).padStart(3, "0")}`, customer: form.customer, items: parseInt(form.items) || 1, total: `₹${form.total}`, date: "18 Mar 2026", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), method: form.method, status: "Pending" };
    setInvoices((prev) => [newInv, ...prev]);
    setForm({ customer: "", items: "", total: "", method: "Cash" });
    setAddOpen(false);
    toast.success("Invoice created!");
  };

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Receipt className="w-5 h-5 text-primary" /></div>
            <div>
              <h1 className="text-2xl font-bold font-display text-foreground">Billing</h1>
              <p className="text-sm text-muted-foreground">Generate and manage invoices</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleExport}><Download className="w-4 h-4 mr-1" />Export</Button>
            <Dialog open={addOpen} onOpenChange={setAddOpen}>
              <DialogTrigger asChild><Button size="sm"><Plus className="w-4 h-4 mr-1" />New Invoice</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>New Invoice</DialogTitle></DialogHeader>
                <div className="space-y-3">
                  <div><Label>Customer *</Label><Input value={form.customer} onChange={(e) => setForm({ ...form, customer: e.target.value })} placeholder="e.g. Table 5" /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><Label>Items</Label><Input type="number" value={form.items} onChange={(e) => setForm({ ...form, items: e.target.value })} /></div>
                    <div><Label>Total (₹) *</Label><Input type="number" value={form.total} onChange={(e) => setForm({ ...form, total: e.target.value })} /></div>
                  </div>
                  <div><Label>Payment Method</Label>
                    <select className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })}>
                      <option>Cash</option><option>UPI</option><option>Card</option><option>Online</option>
                    </select>
                  </div>
                  <Button className="w-full" onClick={handleAdd}>Create Invoice</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Today's Revenue", value: "₹14,410" }, { label: "Invoices Today", value: invoices.length.toString() },
            { label: "Avg Bill Size", value: "₹3,603" }, { label: "Pending", value: invoices.filter((i) => i.status === "Pending").length.toString() },
          ].map((s) => (
            <div key={s.label} className="bg-card rounded-xl p-4 shadow-card border border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{s.label}</p>
              <p className="text-xl font-bold font-display text-foreground mt-1">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search invoices..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  {["Invoice", "Customer", "Items", "Total", "Date", "Payment", "Status", ""].map((h) => (
                    <th key={h} className={`${h === "" ? "text-right" : "text-left"} px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((inv, i) => (
                  <motion.tr key={inv.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 text-sm font-mono font-medium text-primary">{inv.id}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{inv.customer}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{inv.items}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-foreground">{inv.total}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{inv.date} {inv.time}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{inv.method}</td>
                    <td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor[inv.status]}`}>{inv.status}</span></td>
                    <td className="px-4 py-3 text-right"><Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setViewInv(inv)}><Eye className="w-4 h-4" /></Button></td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Dialog open={!!viewInv} onOpenChange={() => setViewInv(null)}>
          <DialogContent>
            <DialogHeader><DialogTitle>Invoice {viewInv?.id}</DialogTitle></DialogHeader>
            {viewInv && (
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Customer</span><span className="font-medium">{viewInv.customer}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Items</span><span>{viewInv.items}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Total</span><span className="font-bold text-lg">{viewInv.total}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span>{viewInv.date} {viewInv.time}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Payment</span><span>{viewInv.method}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Status</span><span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[viewInv.status]}`}>{viewInv.status}</span></div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </motion.div>
    </DashboardLayout>
  );
}
