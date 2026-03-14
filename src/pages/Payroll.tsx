import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Wallet, Search, Download, Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const employees = [
  { id: 1, name: "Rajesh Kumar", role: "Head Chef", salary: "₹45,000", attendance: "26/30", status: "Paid", phone: "9876543210" },
  { id: 2, name: "Priya Sharma", role: "Sous Chef", salary: "₹32,000", attendance: "28/30", status: "Paid", phone: "9876543211" },
  { id: 3, name: "Amit Patel", role: "Waiter", salary: "₹18,000", attendance: "24/30", status: "Pending", phone: "9876543212" },
  { id: 4, name: "Sunita Devi", role: "Cashier", salary: "₹20,000", attendance: "27/30", status: "Paid", phone: "9876543213" },
  { id: 5, name: "Vikram Singh", role: "Delivery Boy", salary: "₹15,000", attendance: "25/30", status: "Pending", phone: "9876543214" },
  { id: 6, name: "Neha Gupta", role: "Manager", salary: "₹55,000", attendance: "29/30", status: "Paid", phone: "9876543215" },
  { id: 7, name: "Ravi Verma", role: "Kitchen Helper", salary: "₹12,000", attendance: "22/30", status: "Overdue", phone: "9876543216" },
  { id: 8, name: "Anita Joshi", role: "Hostess", salary: "₹16,000", attendance: "26/30", status: "Paid", phone: "9876543217" },
];

const statusColor: Record<string, string> = {
  Paid: "bg-green-100 text-green-700 border-green-200",
  Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Overdue: "bg-red-100 text-red-700 border-red-200",
};

export default function Payroll() {
  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-display text-foreground">Payroll</h1>
              <p className="text-sm text-muted-foreground">Manage employee salaries & attendance</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-1" />Export</Button>
            <Button size="sm"><Plus className="w-4 h-4 mr-1" />Add Employee</Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Payroll", value: "₹2,13,000" },
            { label: "Employees", value: "8" },
            { label: "Paid", value: "5" },
            { label: "Pending", value: "3" },
          ].map((s) => (
            <div key={s.label} className="bg-card rounded-xl p-4 shadow-card border border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{s.label}</p>
              <p className="text-xl font-bold font-display text-foreground mt-1">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search employees..." className="pl-9" />
          </div>
        </div>

        {/* Table */}
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
                {employees.map((emp, i) => (
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
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full border font-medium ${statusColor[emp.status]}`}>{emp.status}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="w-4 h-4" /></Button>
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
