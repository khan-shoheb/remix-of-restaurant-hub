import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Wallet, Search, Download, Plus, MoreHorizontal, Edit, Trash2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

const initialEmployees = [
  { id: 1, name: "Rajesh Kumar", role: "Head Chef", salary: "₹45,000", attendance: "26/30", status: "Paid", phone: "9876543210" },
  { id: 2, name: "Priya Sharma", role: "Sous Chef", salary: "₹32,000", attendance: "28/30", status: "Paid", phone: "9876543211" },
  { id: 3, name: "Amit Patel", role: "Waiter", salary: "₹18,000", attendance: "24/30", status: "Pending", phone: "9876543212" },
  { id: 4, name: "Sunita Devi", role: "Cashier", salary: "₹20,000", attendance: "27/30", status: "Paid", phone: "9876543213" },
  { id: 5, name: "Vikram Singh", role: "Delivery Boy", salary: "₹15,000", attendance: "25/30", status: "Pending", phone: "9876543214" },
  { id: 6, name: "Neha Gupta", role: "Manager", salary: "₹55,000", attendance: "29/30", status: "Paid", phone: "9876543215" },
  { id: 7, name: "Ravi Verma", role: "Kitchen Helper", salary: "₹12,000", attendance: "22/30", status: "Overdue", phone: "9876543216" },
  { id: 8, name: "Anita Joshi", role: "Hostess", salary: "₹16,000", attendance: "26/30", status: "Paid", phone: "9876543217" },
];

const statusColor: Record<string, string> = { Paid: "bg-green-100 text-green-700 border-green-200", Pending: "bg-yellow-100 text-yellow-700 border-yellow-200", Overdue: "bg-red-100 text-red-700 border-red-200" };

export default function Payroll() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", salary: "", phone: "" });

  const filtered = employees.filter((e) => e.name.toLowerCase().includes(search.toLowerCase()));

  const handleAdd = () => {
    if (!form.name || !form.salary) { toast.error("Name and salary are required"); return; }
    setEmployees((prev) => [...prev, { id: Date.now(), name: form.name, role: form.role || "Staff", salary: `₹${form.salary}`, attendance: "0/30", status: "Pending", phone: form.phone }]);
    setForm({ name: "", role: "", salary: "", phone: "" });
    setOpen(false);
    toast.success(`${form.name} added to payroll`);
  };

  const markPaid = (id: number) => {
    setEmployees((prev) => prev.map((e) => e.id === id ? { ...e, status: "Paid" } : e));
    toast.success("Salary marked as paid");
  };

  const handleDelete = (id: number, name: string) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
    toast.success(`${name} removed from payroll`);
  };

  const handleExport = () => {
    const csv = "Name,Role,Phone,Attendance,Salary,Status\n" + employees.map((e) => `${e.name},${e.role},${e.phone},${e.attendance},${e.salary},${e.status}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "payroll.csv"; a.click();
    toast.success("Payroll exported!");
  };

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Wallet className="w-5 h-5 text-primary" /></div>
            <div>
              <h1 className="text-2xl font-bold font-display text-foreground">Payroll</h1>
              <p className="text-sm text-muted-foreground">Manage employee salaries & attendance</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleExport}><Download className="w-4 h-4 mr-1" />Export</Button>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild><Button size="sm"><Plus className="w-4 h-4 mr-1" />Add Employee</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Add Employee</DialogTitle></DialogHeader>
                <div className="space-y-3">
                  <div><Label>Name *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Employee name" /></div>
                  <div><Label>Role</Label><Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="e.g. Waiter" /></div>
                  <div><Label>Salary (₹) *</Label><Input type="number" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} /></div>
                  <div><Label>Phone</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
                  <Button className="w-full" onClick={handleAdd}>Add Employee</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Payroll", value: "₹2,13,000" }, { label: "Employees", value: employees.length.toString() },
            { label: "Paid", value: employees.filter((e) => e.status === "Paid").length.toString() },
            { label: "Pending", value: employees.filter((e) => e.status !== "Paid").length.toString() },
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
            <Input placeholder="Search employees..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">Employee</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">Role</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">Phone</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">Attendance</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">Salary</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">Status</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((emp, i) => (
                  <motion.tr key={emp.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{emp.name.charAt(0)}</div>
                        <span className="text-sm font-medium text-foreground">{emp.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{emp.role}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{emp.phone}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{emp.attendance}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-foreground">{emp.salary}</td>
                    <td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded-full border font-medium ${statusColor[emp.status]}`}>{emp.status}</span></td>
                    <td className="px-4 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="w-4 h-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {emp.status !== "Paid" && <DropdownMenuItem onClick={() => markPaid(emp.id)}><CheckCircle className="w-3 h-3 mr-2" />Mark Paid</DropdownMenuItem>}
                          <DropdownMenuItem onClick={() => toast.info(`Editing ${emp.name} — coming soon`)}><Edit className="w-3 h-3 mr-2" />Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(emp.id, emp.name)}><Trash2 className="w-3 h-3 mr-2" />Remove</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
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
