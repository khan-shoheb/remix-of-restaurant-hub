import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/menu-management" element={<MenuManagement />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/crm" element={<CRM />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/recipe-management" element={<RecipeManagement />} />
          <Route path="/table-management" element={<TableManagement />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/pos" element={<POS />} />
          <Route path="/kitchen-display" element={<KitchenDisplay />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
