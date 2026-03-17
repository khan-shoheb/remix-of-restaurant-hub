import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Wallet,
  Receipt,
  ListTodo,
  UtensilsCrossed,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  BookOpen,
  Grid3X3,
  CalendarCheck,
  Monitor,
  ChefHat,
  Truck,
  LogOut,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Payroll", url: "/payroll", icon: Wallet },
  { title: "Billing", url: "/billing", icon: Receipt },
  { title: "Tasks", url: "/tasks", icon: ListTodo },
  { title: "Menu Management", url: "/menu-management", icon: UtensilsCrossed },
  { title: "Orders", url: "/orders", icon: ShoppingCart },
  { title: "Inventory", url: "/inventory", icon: Package },
  { title: "CRM", url: "/crm", icon: Users },
  { title: "Reports", url: "/reports", icon: BarChart3 },
  { title: "Recipe Management", url: "/recipe-management", icon: BookOpen },
  { title: "Table Management", url: "/table-management", icon: Grid3X3 },
  { title: "Reservation", url: "/reservation", icon: CalendarCheck },
  { title: "POS System", url: "/pos", icon: Monitor },
  { title: "Kitchen Display", url: "/kitchen-display", icon: ChefHat },
  { title: "Delivery Management", url: "/delivery", icon: Truck },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarContent className="pt-4">
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 pb-4 border-b border-sidebar-border mb-2">
          <div className="w-9 h-9 rounded-lg bg-sidebar-primary flex items-center justify-center shrink-0">
            <UtensilsCrossed className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-sm font-bold text-sidebar-accent-foreground tracking-wide font-display">
                RestroHub
              </h2>
              <p className="text-[10px] text-sidebar-foreground uppercase tracking-widest">
                Management
              </p>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-sidebar-foreground/50 font-body">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      item.url === "/"
                        ? location.pathname === "/"
                        : location.pathname.startsWith(item.url)
                    }
                    tooltip={item.title}
                  >
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="transition-all duration-200"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground"
                    >
                      <item.icon className="w-4 h-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Admin Logout"
              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <button className="w-full flex items-center gap-2" onClick={() => alert("Logged out!")}>
                <LogOut className="w-4 h-4 shrink-0" />
                {!collapsed && <span>Admin Logout</span>}
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
