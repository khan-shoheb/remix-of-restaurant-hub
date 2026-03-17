import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Login from "./pages/Login";
import Index from "./pages/Index";
import Payroll from "./pages/Payroll";
import Billing from "./pages/Billing";
import Tasks from "./pages/Tasks";
import MenuManagement from "./pages/MenuManagement";
import Orders from "./pages/Orders";
import Inventory from "./pages/Inventory";
import CRM from "./pages/CRM";
import Reports from "./pages/Reports";
import RecipeManagement from "./pages/RecipeManagement";
import TableManagement from "./pages/TableManagement";
import Reservation from "./pages/Reservation";
import POS from "./pages/POS";
import KitchenDisplay from "./pages/KitchenDisplay";
import Delivery from "./pages/Delivery";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import SADashboard from "./pages/superadmin/SADashboard";
import SARestaurants from "./pages/superadmin/SARestaurants";
import SASubscriptions from "./pages/superadmin/SASubscriptions";
import SARevenue from "./pages/superadmin/SARevenue";
import SAUsers from "./pages/superadmin/SAUsers";
import SAAnalytics from "./pages/superadmin/SAAnalytics";
import SASettings from "./pages/superadmin/SASettings";
import SASupport from "./pages/superadmin/SASupport";

const queryClient = new QueryClient();

function ProtectedRoute({ children, role }: { children: React.ReactNode; role?: "admin" | "superadmin" }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to={user.role === "superadmin" ? "/superadmin-dashboard" : "/"} replace />;
  return <>{children}</>;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to={user.role === "superadmin" ? "/superadmin-dashboard" : "/"} replace /> : <Login />} />

      {/* Admin routes */}
      <Route path="/" element={<ProtectedRoute role="admin"><Index /></ProtectedRoute>} />
      <Route path="/payroll" element={<ProtectedRoute role="admin"><Payroll /></ProtectedRoute>} />
      <Route path="/billing" element={<ProtectedRoute role="admin"><Billing /></ProtectedRoute>} />
      <Route path="/tasks" element={<ProtectedRoute role="admin"><Tasks /></ProtectedRoute>} />
      <Route path="/menu-management" element={<ProtectedRoute role="admin"><MenuManagement /></ProtectedRoute>} />
      <Route path="/orders" element={<ProtectedRoute role="admin"><Orders /></ProtectedRoute>} />
      <Route path="/inventory" element={<ProtectedRoute role="admin"><Inventory /></ProtectedRoute>} />
      <Route path="/crm" element={<ProtectedRoute role="admin"><CRM /></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute role="admin"><Reports /></ProtectedRoute>} />
      <Route path="/recipe-management" element={<ProtectedRoute role="admin"><RecipeManagement /></ProtectedRoute>} />
      <Route path="/table-management" element={<ProtectedRoute role="admin"><TableManagement /></ProtectedRoute>} />
      <Route path="/reservation" element={<ProtectedRoute role="admin"><Reservation /></ProtectedRoute>} />
      <Route path="/pos" element={<ProtectedRoute role="admin"><POS /></ProtectedRoute>} />
      <Route path="/kitchen-display" element={<ProtectedRoute role="admin"><KitchenDisplay /></ProtectedRoute>} />
      <Route path="/delivery" element={<ProtectedRoute role="admin"><Delivery /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute role="admin"><Settings /></ProtectedRoute>} />

      {/* Super Admin routes */}
      <Route path="/superadmin-dashboard" element={<ProtectedRoute role="superadmin"><SADashboard /></ProtectedRoute>} />
      <Route path="/superadmin-restaurants" element={<ProtectedRoute role="superadmin"><SARestaurants /></ProtectedRoute>} />
      <Route path="/superadmin-subscriptions" element={<ProtectedRoute role="superadmin"><SASubscriptions /></ProtectedRoute>} />
      <Route path="/superadmin-revenue" element={<ProtectedRoute role="superadmin"><SARevenue /></ProtectedRoute>} />
      <Route path="/superadmin-users" element={<ProtectedRoute role="superadmin"><SAUsers /></ProtectedRoute>} />
      <Route path="/superadmin-analytics" element={<ProtectedRoute role="superadmin"><SAAnalytics /></ProtectedRoute>} />
      <Route path="/superadmin-settings" element={<ProtectedRoute role="superadmin"><SASettings /></ProtectedRoute>} />
      <Route path="/superadmin-support" element={<ProtectedRoute role="superadmin"><SASupport /></ProtectedRoute>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
