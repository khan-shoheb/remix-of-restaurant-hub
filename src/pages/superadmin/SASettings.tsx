import SuperAdminLayout from "@/components/SuperAdminLayout";
import { motion } from "framer-motion";
import { Shield, Bell, Database } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

const settingsItems = [
  { icon: Database, title: "Auto Backups", description: "Daily backups for restaurant data", defaultOn: true },
  { icon: Shield, title: "Two-Factor Authentication", description: "Extra layer of account security", defaultOn: false },
  { icon: Bell, title: "Notifications", description: "Configure email and push notifications", defaultOn: true },
];

export default function SASettings() {
  const [toggles, setToggles] = useState(settingsItems.map((s) => s.defaultOn));

  return (
    <SuperAdminLayout>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold font-display text-foreground mb-1">System Settings</h1>
        <p className="text-sm text-muted-foreground mb-6">Configure platform-wide settings</p>

        <div className="space-y-4 max-w-2xl">
          {settingsItems.map((item, i) => (
            <div key={item.title} className="bg-card rounded-xl p-6 shadow-card border border-border flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
              <Switch
                checked={toggles[i]}
                onCheckedChange={(checked) => {
                  const next = [...toggles];
                  next[i] = checked;
                  setToggles(next);
                }}
              />
            </div>
          ))}
        </div>
      </motion.div>
    </SuperAdminLayout>
  );
}
