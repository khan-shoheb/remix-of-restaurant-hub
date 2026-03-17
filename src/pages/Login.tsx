import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { UtensilsCrossed, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = login(email, password);
    if (err) {
      setError(err);
    } else {
      // Role-based redirect handled by App.tsx
      if (email.includes("superadmin")) {
        navigate("/superadmin-dashboard");
      } else {
        navigate("/");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-card rounded-2xl shadow-elevated border border-border p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mb-4">
              <UtensilsCrossed className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold font-display text-foreground">RestroHub</h1>
            <p className="text-sm text-muted-foreground mt-1">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive font-medium">{error}</p>
            )}

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground text-center mb-3">Demo Credentials</p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-secondary rounded-lg p-3">
                <p className="font-semibold text-foreground mb-1">Admin</p>
                <p className="text-muted-foreground">admin@demo.com</p>
                <p className="text-muted-foreground">admin123</p>
              </div>
              <div className="bg-secondary rounded-lg p-3">
                <p className="font-semibold text-foreground mb-1">Super Admin</p>
                <p className="text-muted-foreground">superadmin@restrohub.local</p>
                <p className="text-muted-foreground">super123</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
