import SuperAdminLayout from "@/components/SuperAdminLayout";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const monthlyData = [
  { month: "Jan", sales: 1200, orders: 200 }, { month: "Feb", sales: 1800, orders: 400 },
  { month: "Mar", sales: 2400, orders: 500 }, { month: "Apr", sales: 2100, orders: 600 },
  { month: "May", sales: 3000, orders: 700 }, { month: "Jun", sales: 2900, orders: 650 },
  { month: "Jul", sales: 2800, orders: 600 }, { month: "Aug", sales: 2600, orders: 550 },
  { month: "Sep", sales: 2400, orders: 500 }, { month: "Oct", sales: 2700, orders: 580 },
  { month: "Nov", sales: 2800, orders: 620 }, { month: "Dec", sales: 3100, orders: 700 },
];

const stats = [
  { label: "Total Sales", value: "Rs. 32K", color: "text-blue-600", bg: "bg-blue-100" },
  { label: "Total Orders", value: "6,100", color: "text-yellow-600", bg: "bg-yellow-100" },
  { label: "Avg. Order Value", value: "Rs. 52", color: "text-green-600", bg: "bg-green-100" },
  { label: "Top Month", value: "May", color: "text-purple-600", bg: "bg-purple-100" },
];

export default function SAAnalytics() {
  return (
    <SuperAdminLayout>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold font-display text-foreground mb-1">Analytics</h1>
        <p className="text-sm text-muted-foreground mb-6">Sales, orders, and performance overview</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((s) => (
            <div key={s.label} className="bg-card rounded-xl p-6 shadow-card border border-border text-center">
              <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center mx-auto mb-3`}>
                <BarChart3 className={`w-6 h-6 ${s.color}`} />
              </div>
              <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
              <p className={`text-2xl font-bold font-display ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-xl p-6 shadow-card border border-border">
          <h3 className="font-display font-semibold text-foreground mb-4">📈 Sales & Orders Trend</h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="hsl(220, 70%, 50%)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="orders" stroke="hsl(140, 60%, 40%)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </SuperAdminLayout>
  );
}
