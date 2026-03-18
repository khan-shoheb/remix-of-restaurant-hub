import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { CalendarCheck, Plus, Search, Phone, Clock, Users, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

const initialReservations = [
  { id: 1, name: "Mohit Agarwal", phone: "9876500003", guests: 4, date: "14 Mar 2026", time: "7:00 PM", table: "T-6", status: "Confirmed", note: "Anniversary dinner" },
  { id: 2, name: "Sneha Iyer", phone: "9876500004", guests: 2, date: "14 Mar 2026", time: "8:00 PM", table: "T-1", status: "Pending", note: "" },
  { id: 3, name: "Arjun Mehta", phone: "9876500001", guests: 6, date: "14 Mar 2026", time: "8:30 PM", table: "T-7", status: "Confirmed", note: "Birthday party" },
  { id: 4, name: "Kavita Reddy", phone: "9876500002", guests: 4, date: "15 Mar 2026", time: "1:00 PM", table: "T-11", status: "Confirmed", note: "" },
  { id: 5, name: "Deepak Jain", phone: "9876500005", guests: 8, date: "15 Mar 2026", time: "7:30 PM", table: "T-8", status: "Pending", note: "Corporate dinner" },
  { id: 6, name: "Ritu Sharma", phone: "9876500006", guests: 2, date: "15 Mar 2026", time: "8:00 PM", table: "T-4", status: "Cancelled", note: "" },
];

const statusColor: Record<string, string> = {
  Confirmed: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function Reservation() {
  const [reservations, setReservations] = useState(initialReservations);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", guests: "2", date: "", time: "", table: "", note: "" });

  const filtered = reservations.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()) || r.phone.includes(search));

  const handleConfirm = (id: number) => {
    setReservations((prev) => prev.map((r) => r.id === id ? { ...r, status: "Confirmed" } : r));
    toast.success("Reservation confirmed!");
  };

  const handleCancel = (id: number) => {
    setReservations((prev) => prev.map((r) => r.id === id ? { ...r, status: "Cancelled" } : r));
    toast.error("Reservation cancelled");
  };

  const handleAdd = () => {
    if (!form.name || !form.phone || !form.date || !form.time) {
      toast.error("Please fill all required fields");
      return;
    }
    const newRes = {
      id: Date.now(),
      name: form.name,
      phone: form.phone,
      guests: parseInt(form.guests) || 2,
      date: form.date,
      time: form.time,
      table: form.table || "TBD",
      status: "Pending",
      note: form.note,
    };
    setReservations((prev) => [newRes, ...prev]);
    setForm({ name: "", phone: "", guests: "2", date: "", time: "", table: "", note: "" });
    setOpen(false);
    toast.success("Reservation added successfully!");
  };

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><CalendarCheck className="w-5 h-5 text-primary" /></div>
            <div>
              <h1 className="text-2xl font-bold font-display text-foreground">Reservations</h1>
              <p className="text-sm text-muted-foreground">Manage table bookings and reservations</p>
            </div>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm"><Plus className="w-4 h-4 mr-1" />New Reservation</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>New Reservation</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <div><Label>Name *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Guest name" /></div>
                <div><Label>Phone *</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone number" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Date *</Label><Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></div>
                  <div><Label>Time *</Label><Input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} /></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Guests</Label><Input type="number" value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} /></div>
                  <div><Label>Table</Label><Input value={form.table} onChange={(e) => setForm({ ...form, table: e.target.value })} placeholder="e.g. T-5" /></div>
                </div>
                <div><Label>Note</Label><Input value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Special request" /></div>
                <Button className="w-full" onClick={handleAdd}>Add Reservation</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {[
            { label: "Today's Bookings", value: reservations.filter((r) => r.status !== "Cancelled").length.toString() },
            { label: "Pending", value: reservations.filter((r) => r.status === "Pending").length.toString() },
            { label: "Total Guests Expected", value: reservations.filter((r) => r.status !== "Cancelled").reduce((s, r) => s + r.guests, 0).toString() },
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
            <Input placeholder="Search reservations..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="space-y-3">
          {filtered.map((r, i) => (
            <motion.div key={r.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="bg-card rounded-xl p-4 shadow-card border border-border hover:shadow-elevated transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">{r.name.charAt(0)}</div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{r.name}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{r.phone}</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" />{r.guests} guests</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor[r.status]}`}>{r.status}</span>
                  {r.status === "Pending" && (
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-green-600" onClick={() => handleConfirm(r.id)}><Check className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => handleCancel(r.id)}><X className="w-4 h-4" /></Button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{r.date} at {r.time}</span>
                <span>Table: {r.table}</span>
                {r.note && <span className="text-primary font-medium">{r.note}</span>}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
