import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, Bell, Shield, Globe, Palette, Database, Clock } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

const settingsItems = [
  { icon: Bell, title: "Push Notifications", description: "Receive order and reservation alerts", defaultOn: true },
  { icon: Shield, title: "Two-Factor Authentication", description: "Add extra security to your account", defaultOn: false },
  { icon: Globe, title: "Online Ordering", description: "Accept orders from website & apps", defaultOn: true },
  { icon: Palette, title: "Dark Mode", description: "Switch to dark theme interface", defaultOn: false },
  { icon: Database, title: "Auto Backup", description: "Daily automatic data backup", defaultOn: true },
  { icon: Clock, title: "Auto Logout", description: "Logout after 30 minutes of inactivity", defaultOn: false },
];

export default function Settings() {
  const [toggles, setToggles] = useState(settingsItems.map((s) => s.defaultOn));

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <SettingsIcon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-display text-foreground">Settings</h1>
            <p className="text-sm text-muted-foreground">Manage your restaurant preferences</p>
          </div>
        </div>

        <div className="space-y-4 max-w-2xl">
          {settingsItems.map((item, i) => (
            <div key={item.title} className="bg-card rounded-xl p-5 shadow-card border border-border flex items-center justify-between">
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
    </DashboardLayout>
  );
}
