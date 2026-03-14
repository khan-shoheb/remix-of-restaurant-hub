import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Receipt, Search, Download, Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const invoices = [
  { id: "INV-001", customer: "Table 5", items: 4, total: "₹2,340", date: "14 Mar 2026", time: "12:30 PM", method: "UPI", status: "Paid" },
  { id: "INV-002", customer: "Table 12", items: 6, total: "₹4,890", date: "14 Mar 2026", time: "1:15 PM", method: "Card", status: "Paid" },
  { id: "INV-003", customer: "Delivery #45", items: 2, total: "₹980", date: "14 Mar 2026", time: "2:00 PM", method: "Cash", status: "Pending" },
  { id: "INV-004", customer: "Table 3", items: 8, total: "₹6,200", date: "14 Mar 2026", time: "7:30 PM", method: "Card", status: "Paid" },
  { id: "INV-005", customer: "Table 8", items: 3, total: "₹1,560", date: "13 Mar 2026", time: "8:45 PM", method: "UPI", status: "Paid" },
  { id: "INV-006", customer: "Delivery #44", items: 5, total: "₹2,100", date: "13 Mar 2026", time: "6:00 PM", method: "Online", status: "Refunded" },
];

const statusColor: Record<string, string> = {
  Paid: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Refunded: "bg-red-100 text-red-700",
};

export default function Billing() {
  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Receipt className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-display text-foreground">Billing</h1>
              <p className="text-sm text-muted-foreground">Generate and manage invoices</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-1" />Export</Button>
            <Button size="sm"><Plus className="w-4 h-4 mr-1" />New Invoice</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Today's Revenue", value: "₹14,410" },
            { label: "Invoices Today", value: "4" },
            { label: "Avg Bill Size", value: "₹3,603" },
            { label: "Pending", value: "₹980" },
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
            <Input placeholder="Search invoices..." className="pl-9" />
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
                {invoices.map((inv, i) => (
                  <motion.tr key={inv.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 text-sm font-mono font-medium text-primary">{inv.id}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{inv.customer}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{inv.items}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-foreground">{inv.total}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{inv.date} {inv.time}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{inv.method}</td>
                    <td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor[inv.status]}`}>{inv.status}</span></td>
                    <td className="px-4 py-3 text-right"><Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="w-4 h-4" /></Button></td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
