import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type Role = "admin" | "superadmin";

interface User {
  email: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => string | null;
  logout: () => void;
}

const CREDENTIALS: { email: string; password: string; role: Role }[] = [
  { email: "admin@demo.com", password: "admin123", role: "admin" },
  { email: "superadmin@restrohub.local", password: "super123", role: "superadmin" },
];

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): string | null => {
    const match = CREDENTIALS.find(
      (c) => c.email === email && c.password === password
    );
    if (!match) return "Invalid email or password";
    setUser({ email: match.email, role: match.role });
    return null;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
