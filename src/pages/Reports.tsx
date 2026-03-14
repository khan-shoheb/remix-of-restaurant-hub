import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const weeklyRevenue = [
  { day: "Mon", revenue: 28000 },
  { day: "Tue", revenue: 32000 },
  { day: "Wed", revenue: 25000 },
  { day: "Thu", revenue: 38000 },
  { day: "Fri", revenue: 45000 },
  { day: "Sat", revenue: 52000 },
  { day: "Sun", revenue: 48000 },
];

const monthlyOrders = [
  { month: "Oct", orders: 420 },
  { month: "Nov", orders: 480 },
  { month: "Dec", orders: 560 },
  { month: "Jan", orders: 510 },
  { month: "Feb", orders: 540 },
  { month: "Mar", orders: 490 },
];

const categoryData = [
  { name: "Main Course", value: 45 },
  { name: "Starters", value: 25 },
  { name: "Drinks", value: 15 },
  { name: "Desserts", value: 10 },
  { name: "Breads", value: 5 },
];

const COLORS = ["hsl(36, 85%, 50%)", "hsl(36, 85%, 65%)", "hsl(36, 60%, 40%)", "hsl(30, 50%, 60%)", "hsl(20, 40%, 70%)"];

export default function Reports() {
  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><BarChart3 className="w-5 h-5 text-primary" /></div>
            <div>
              <h1 className="text-2xl font-bold font-display text-foreground">Reports</h1>
              <p className="text-sm text-muted-foreground">Analytics and performance insights</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Monthly Revenue", value: "₹8,40,000", change: "+12%", up: true, icon: DollarSign },
            { label: "Total Orders", value: "490", change: "-9%", up: false, icon: ShoppingCart },
            { label: "New Customers", value: "42", change: "+18%", up: true, icon: Users },
            { label: "Avg Order", value: "₹1,714", change: "+5%", up: true, icon: TrendingUp },
          ].map((s) => (
            <div key={s.label} className="bg-card rounded-xl p-4 shadow-card border border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{s.label}</p>
                <s.icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-xl font-bold font-display text-foreground">{s.value}</p>
              <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${s.up ? "text-green-600" : "text-destructive"}`}>
                {s.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}{s.change}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div className="bg-card rounded-xl p-5 shadow-card border border-border">
            <h3 className="font-display font-semibold text-foreground mb-4">Weekly Revenue</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(30, 15%, 88%)" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(20, 10%, 45%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(20, 10%, 45%)" />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(30, 15%, 88%)" }} />
                <Bar dataKey="revenue" fill="hsl(36, 85%, 50%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border">
            <h3 className="font-display font-semibold text-foreground mb-4">Monthly Orders Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyOrders}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(30, 15%, 88%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(20, 10%, 45%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(20, 10%, 45%)" />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(30, 15%, 88%)" }} />
                <Line type="monotone" dataKey="orders" stroke="hsl(36, 85%, 50%)" strokeWidth={2} dot={{ fill: "hsl(36, 85%, 50%)" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl p-5 shadow-card border border-border">
            <h3 className="font-display font-semibold text-foreground mb-4">Sales by Category</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="lg:col-span-2 bg-card rounded-xl p-5 shadow-card border border-border">
            <h3 className="font-display font-semibold text-foreground mb-4">Top Selling Items</h3>
            <div className="space-y-3">
              {[
                { name: "Chicken Biryani", orders: 156, revenue: "₹43,680" },
                { name: "Butter Chicken", orders: 134, revenue: "₹42,880" },
                { name: "Paneer Tikka", orders: 112, revenue: "₹24,640" },
                { name: "Dal Makhani", orders: 98, revenue: "₹23,520" },
                { name: "Garlic Naan", orders: 210, revenue: "₹12,600" },
              ].map((item, i) => (
                <div key={item.name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-muted-foreground w-5">#{i + 1}</span>
                    <span className="text-sm font-medium text-foreground">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-muted-foreground">{item.orders} orders</span>
                    <span className="text-sm font-semibold text-foreground">{item.revenue}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
