import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Grid3X3 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type TableStatus = "Available" | "Occupied" | "Reserved" | "Cleaning";

interface TableInfo {
  id: number; name: string; seats: number; status: TableStatus;
  guests?: number; server?: string; since?: string;
}

const initialTables: TableInfo[] = [
  { id: 1, name: "T-1", seats: 2, status: "Available" },
  { id: 2, name: "T-2", seats: 2, status: "Occupied", guests: 2, server: "Amit", since: "12:30 PM" },
  { id: 3, name: "T-3", seats: 4, status: "Occupied", guests: 4, server: "Amit", since: "1:00 PM" },
  { id: 4, name: "T-4", seats: 4, status: "Available" },
  { id: 5, name: "T-5", seats: 4, status: "Occupied", guests: 3, server: "Anita", since: "12:15 PM" },
  { id: 6, name: "T-6", seats: 6, status: "Reserved", since: "2:00 PM" },
  { id: 7, name: "T-7", seats: 6, status: "Available" },
  { id: 8, name: "T-8", seats: 8, status: "Occupied", guests: 6, server: "Anita", since: "1:30 PM" },
  { id: 9, name: "T-9", seats: 2, status: "Cleaning" },
  { id: 10, name: "T-10", seats: 4, status: "Available" },
  { id: 11, name: "T-11", seats: 4, status: "Reserved", since: "3:00 PM" },
  { id: 12, name: "T-12", seats: 8, status: "Occupied", guests: 8, server: "Amit", since: "12:45 PM" },
  { id: 13, name: "T-13", seats: 2, status: "Available" },
  { id: 14, name: "T-14", seats: 6, status: "Cleaning" },
  { id: 15, name: "T-15", seats: 4, status: "Available" },
  { id: 16, name: "T-16", seats: 2, status: "Occupied", guests: 2, server: "Anita", since: "1:45 PM" },
];

const statusStyles: Record<TableStatus, { bg: string; border: string; text: string; dot: string }> = {
  Available: { bg: "bg-green-50", border: "border-green-300", text: "text-green-700", dot: "bg-green-500" },
  Occupied: { bg: "bg-primary/5", border: "border-primary/40", text: "text-primary", dot: "bg-primary" },
  Reserved: { bg: "bg-blue-50", border: "border-blue-300", text: "text-blue-700", dot: "bg-blue-500" },
  Cleaning: { bg: "bg-muted", border: "border-border", text: "text-muted-foreground", dot: "bg-muted-foreground" },
};

const nextStatusMap: Record<TableStatus, TableStatus> = {
  Available: "Occupied",
  Occupied: "Cleaning",
  Cleaning: "Available",
  Reserved: "Occupied",
};

export default function TableManagement() {
  const [tables, setTables] = useState(initialTables);

  const cycleStatus = (id: number) => {
    setTables((prev) => prev.map((t) => {
      if (t.id !== id) return t;
      const next = nextStatusMap[t.status];
      const updates: Partial<TableInfo> = { status: next };
      if (next === "Occupied") { updates.guests = Math.floor(Math.random() * t.seats) + 1; updates.server = "Staff"; updates.since = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); }
      if (next === "Cleaning" || next === "Available") { updates.guests = undefined; updates.server = undefined; updates.since = next === "Available" ? undefined : t.since; }
      return { ...t, ...updates };
    }));
    const table = tables.find((t) => t.id === id);
    const next = table ? nextStatusMap[table.status] : "";
    toast.success(`${table?.name} → ${next}`);
  };

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Grid3X3 className="w-5 h-5 text-primary" /></div>
            <div>
              <h1 className="text-2xl font-bold font-display text-foreground">Table Management</h1>
              <p className="text-sm text-muted-foreground">Click a table to cycle its status</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          {(Object.keys(statusStyles) as TableStatus[]).map((s) => (
            <div key={s} className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className={`w-2.5 h-2.5 rounded-full ${statusStyles[s].dot}`} />
              {s} ({tables.filter((t) => t.status === s).length})
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {tables.map((table, i) => {
            const st = statusStyles[table.status];
            return (
              <motion.div key={table.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }}
                onClick={() => cycleStatus(table.id)}
                className={`${st.bg} ${st.border} border-2 rounded-xl p-4 cursor-pointer hover:shadow-elevated transition-all text-center active:scale-95`}>
                <div className={`text-lg font-bold font-display ${st.text}`}>{table.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{table.seats} seats</div>
                <div className={`flex items-center justify-center gap-1 mt-2 text-[10px] font-medium ${st.text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />{table.status}
                </div>
                {table.status === "Occupied" && (
                  <div className="mt-2 space-y-0.5 text-[10px] text-muted-foreground">
                    <div>{table.guests}/{table.seats} guests</div>
                    <div>{table.server}</div>
                    <div>Since {table.since}</div>
                  </div>
                )}
                {table.status === "Reserved" && table.since && (
                  <div className="mt-2 text-[10px] text-muted-foreground">At {table.since}</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
