import SuperAdminLayout from "@/components/SuperAdminLayout";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, TrendingDown, Percent } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const monthlyData = [
  { month: "Jan", revenue: 12000 }, { month: "Feb", revenue: 18000 }, { month: "Mar", revenue: 24000 },
  { month: "Apr", revenue: 21000 }, { month: "May", revenue: 30000 }, { month: "Jun", revenue: 28000 },
  { month: "Jul", revenue: 27000 }, { month: "Aug", revenue: 25000 }, { month: "Sep", revenue: 22000 },
  { month: "Oct", revenue: 26000 }, { month: "Nov", revenue: 27000 }, { month: "Dec", revenue: 29000 },
];

const stats = [
  { label: "Total Revenue", value: "₹3,16,000", icon: DollarSign, color: "bg-green-100 text-green-600" },
  { label: "This Month", value: "₹58,000", icon: TrendingUp, color: "bg-blue-100 text-blue-600" },
  { label: "Expenses", value: "₹33,000", icon: TrendingDown, color: "bg-yellow-100 text-yellow-600" },
  { label: "Profit Margin", value: "43%", icon: Percent, color: "bg-purple-100 text-purple-600" },
];

export default function SARevenue() {
  return (
    <SuperAdminLayout>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold font-display text-foreground mb-1">Revenue</h1>
        <p className="text-sm text-muted-foreground mb-6">Financial overview and analytics</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((s) => (
            <div key={s.label} className="bg-card rounded-xl p-6 shadow-card border border-border text-center">
              <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center mx-auto mb-3`}>
                <s.icon className="w-6 h-6" />
              </div>
              <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
              <p className="text-2xl font-bold font-display text-foreground">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-xl p-6 shadow-card border border-border">
          <h3 className="font-display font-semibold text-foreground mb-4">📊 Monthly Revenue Chart</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip />
              <Bar dataKey="revenue" fill="hsl(300, 80%, 55%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </SuperAdminLayout>
  );
}
