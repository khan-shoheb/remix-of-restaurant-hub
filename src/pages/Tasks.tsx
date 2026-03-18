import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { ListTodo, Plus, Clock, CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

interface Task {
  id: number; title: string; assignee: string;
  priority: "High" | "Medium" | "Low"; status: "Todo" | "In Progress" | "Done"; due: string;
}

const initialTasks: Task[] = [
  { id: 1, title: "Restock vegetables from market", assignee: "Amit", priority: "High", status: "In Progress", due: "Today" },
  { id: 2, title: "Clean deep fryer", assignee: "Ravi", priority: "Medium", status: "Todo", due: "Today" },
  { id: 3, title: "Update lunch menu specials", assignee: "Priya", priority: "High", status: "Done", due: "Today" },
  { id: 4, title: "Fix AC in dining area", assignee: "Vikram", priority: "High", status: "In Progress", due: "Tomorrow" },
  { id: 5, title: "Inventory check - dry goods", assignee: "Sunita", priority: "Medium", status: "Todo", due: "Tomorrow" },
  { id: 6, title: "Train new waiter", assignee: "Neha", priority: "Low", status: "In Progress", due: "This Week" },
  { id: 7, title: "Order new uniforms", assignee: "Neha", priority: "Low", status: "Todo", due: "This Week" },
  { id: 8, title: "Prepare weekend special menu", assignee: "Rajesh", priority: "High", status: "Done", due: "Today" },
  { id: 9, title: "Clean exhaust filters", assignee: "Ravi", priority: "Medium", status: "Done", due: "Yesterday" },
];

const priorityColor: Record<string, string> = { High: "bg-red-100 text-red-700", Medium: "bg-yellow-100 text-yellow-700", Low: "bg-blue-100 text-blue-700" };
const columns = ["Todo", "In Progress", "Done"] as const;
const colIcons = { Todo: Circle, "In Progress": Clock, Done: CheckCircle2 };
const colColors = { Todo: "border-t-muted-foreground", "In Progress": "border-t-primary", Done: "border-t-green-500" };

export default function Tasks() {
  const [tasks, setTasks] = useState(initialTasks);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", assignee: "", priority: "Medium" as Task["priority"], due: "Today" });

  const handleAdd = () => {
    if (!form.title) { toast.error("Title is required"); return; }
    setTasks((prev) => [...prev, { id: Date.now(), title: form.title, assignee: form.assignee || "Unassigned", priority: form.priority, status: "Todo", due: form.due }]);
    setForm({ title: "", assignee: "", priority: "Medium", due: "Today" });
    setOpen(false);
    toast.success("Task added!");
  };

  const moveTask = (id: number, newStatus: Task["status"]) => {
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, status: newStatus } : t));
    toast.success(`Task moved to ${newStatus}`);
  };

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><ListTodo className="w-5 h-5 text-primary" /></div>
            <div>
              <h1 className="text-2xl font-bold font-display text-foreground">Tasks</h1>
              <p className="text-sm text-muted-foreground">Manage daily operations and assignments</p>
            </div>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button size="sm"><Plus className="w-4 h-4 mr-1" />Add Task</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Add Task</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <div><Label>Title *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Task title" /></div>
                <div><Label>Assignee</Label><Input value={form.assignee} onChange={(e) => setForm({ ...form, assignee: e.target.value })} placeholder="Assigned to" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Priority</Label>
                    <select className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value as Task["priority"] })}>
                      <option>High</option><option>Medium</option><option>Low</option>
                    </select>
                  </div>
                  <div><Label>Due</Label><Input value={form.due} onChange={(e) => setForm({ ...form, due: e.target.value })} placeholder="e.g. Today" /></div>
                </div>
                <Button className="w-full" onClick={handleAdd}>Add Task</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {columns.map((col) => {
            const Icon = colIcons[col];
            const colTasks = tasks.filter((t) => t.status === col);
            return (
              <div key={col} className={`bg-card rounded-xl shadow-card border border-border border-t-4 ${colColors[col]}`}>
                <div className="px-4 py-3 flex items-center justify-between border-b border-border">
                  <div className="flex items-center gap-2"><Icon className="w-4 h-4 text-muted-foreground" /><span className="text-sm font-semibold text-foreground">{col}</span></div>
                  <Badge variant="secondary" className="text-xs">{colTasks.length}</Badge>
                </div>
                <div className="p-3 space-y-3">
                  {colTasks.map((task, i) => (
                    <motion.div key={task.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                      className="bg-background rounded-lg p-3 border border-border hover:shadow-card transition-shadow">
                      <p className="text-sm font-medium text-foreground mb-2">{task.title}</p>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">{task.assignee.charAt(0)}</div>
                          <span className="text-xs text-muted-foreground">{task.assignee}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${priorityColor[task.priority]}`}>{task.priority}</span>
                          <span className="text-[10px] text-muted-foreground">{task.due}</span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {col !== "Todo" && <Button size="sm" variant="ghost" className="h-6 text-[10px] flex-1" onClick={() => moveTask(task.id, col === "Done" ? "In Progress" : "Todo")}>← Back</Button>}
                        {col !== "Done" && <Button size="sm" variant="ghost" className="h-6 text-[10px] flex-1" onClick={() => moveTask(task.id, col === "Todo" ? "In Progress" : "Done")}>Next →</Button>}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
