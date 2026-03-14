import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Truck, Search, Phone, MapPin, Clock, Package, CheckCircle2, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

type DeliveryStatus = "Preparing" | "Picked Up" | "On the Way" | "Delivered" | "Cancelled";

interface DeliveryOrder {
  id: string;
  customer: string;
  phone: string;
  address: string;
  items: number;
  total: string;
  rider: string;
  riderPhone: string;
  status: DeliveryStatus;
  orderTime: string;
  estimatedTime: string;
  progress: number;
}

const deliveries: DeliveryOrder[] = [
  { id: "DEL-045", customer: "Rahul Verma", phone: "9876501001", address: "Sec 45, Block C, Noida", items: 3, total: "₹980", rider: "Vikram", riderPhone: "9876543214", status: "On the Way", orderTime: "1:00 PM", estimatedTime: "1:35 PM", progress: 70 },
  { id: "DEL-046", customer: "Meena Das", phone: "9876501002", address: "MG Road, Near Metro Station", items: 5, total: "₹2,100", rider: "Sanjay", riderPhone: "9876501010", status: "Picked Up", orderTime: "1:15 PM", estimatedTime: "1:55 PM", progress: 40 },
  { id: "DEL-047", customer: "Karan Malhotra", phone: "9876501003", address: "DLF Phase 3, Gurgaon", items: 2, total: "₹560", rider: "-", riderPhone: "-", status: "Preparing", orderTime: "1:30 PM", estimatedTime: "2:15 PM", progress: 15 },
  { id: "DEL-048", customer: "Pooja Singh", phone: "9876501004", address: "Saket, New Delhi", items: 4, total: "₹1,450", rider: "Vikram", riderPhone: "9876543214", status: "Delivered", orderTime: "12:00 PM", estimatedTime: "12:40 PM", progress: 100 },
  { id: "DEL-049", customer: "Anil Kumar", phone: "9876501005", address: "Vasant Kunj, D Block", items: 1, total: "₹280", rider: "-", riderPhone: "-", status: "Cancelled", orderTime: "12:30 PM", estimatedTime: "-", progress: 0 },
  { id: "DEL-050", customer: "Nisha Patel", phone: "9876501006", address: "Greater Kailash II", items: 6, total: "₹3,200", rider: "Sanjay", riderPhone: "9876501010", status: "On the Way", orderTime: "1:10 PM", estimatedTime: "1:50 PM", progress: 60 },
];

const statusColor: Record<DeliveryStatus, string> = {
  Preparing: "bg-yellow-100 text-yellow-700",
  "Picked Up": "bg-blue-100 text-blue-700",
  "On the Way": "bg-purple-100 text-purple-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function Delivery() {
  const active = deliveries.filter((d) => !["Delivered", "Cancelled"].includes(d.status));
  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Truck className="w-5 h-5 text-primary" /></div>
            <div>
              <h1 className="text-2xl font-bold font-display text-foreground">Delivery Management</h1>
              <p className="text-sm text-muted-foreground">Track and manage delivery orders</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Active Deliveries", value: active.length.toString() },
            { label: "Completed Today", value: "12" },
            { label: "Avg Delivery Time", value: "32 min" },
            { label: "Active Riders", value: "2" },
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
            <Input placeholder="Search deliveries..." className="pl-9" />
          </div>
        </div>

        <div className="space-y-3">
          {deliveries.map((d, i) => (
            <motion.div key={d.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="bg-card rounded-xl p-4 shadow-card border border-border hover:shadow-elevated transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono font-bold text-primary">{d.id}</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor[d.status]}`}>{d.status}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>ETA: {d.estimatedTime}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{d.customer.charAt(0)}</div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{d.customer}</p>
                      <p className="text-[10px] text-muted-foreground flex items-center gap-1"><Phone className="w-2.5 h-2.5" />{d.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3 mt-0.5 shrink-0" />
                    <span>{d.address}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground"><Package className="w-3 h-3 inline mr-1" />{d.items} items</span>
                    <span className="font-bold text-foreground">{d.total}</span>
                  </div>
                  {d.rider !== "-" && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Navigation className="w-3 h-3" />
                      <span>Rider: <strong className="text-foreground">{d.rider}</strong> ({d.riderPhone})</span>
                    </div>
                  )}
                  {d.status !== "Cancelled" && d.status !== "Delivered" && (
                    <div>
                      <Progress value={d.progress} className="h-1.5" />
                      <span className="text-[10px] text-muted-foreground">{d.progress}% complete</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
