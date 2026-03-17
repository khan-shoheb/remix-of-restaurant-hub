import {
  LayoutDashboard,
  Building2,
  CreditCard,
  BarChart3,
  Users,
  TrendingUp,
  Settings,
  HeadphonesIcon,
  LogOut,
  UtensilsCrossed,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/superadmin-dashboard", icon: LayoutDashboard },
  { title: "Restaurants", url: "/superadmin-restaurants", icon: Building2 },
  { title: "Subscriptions", url: "/superadmin-subscriptions", icon: CreditCard },
  { title: "Revenue", url: "/superadmin-revenue", icon: TrendingUp },
  { title: "Users", url: "/superadmin-users", icon: Users },
  { title: "Analytics", url: "/superadmin-analytics", icon: BarChart3 },
  { title: "System Settings", url: "/superadmin-settings", icon: Settings },
  { title: "Support", url: "/superadmin-support", icon: HeadphonesIcon },
];

export function SuperAdminSidebar() {
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
        <div className="flex items-center gap-3 px-4 pb-4 border-b border-sidebar-border mb-2">
          <div className="w-9 h-9 rounded-lg bg-destructive flex items-center justify-center shrink-0">
            <UtensilsCrossed className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-sm font-bold text-destructive tracking-wide font-display">
                Super Admin
              </h2>
              <p className="text-[10px] text-sidebar-foreground uppercase tracking-widest">
                Control Panel
              </p>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    tooltip={item.title}
                  >
                    <NavLink
                      to={item.url}
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
              tooltip="Logout"
              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <button className="w-full flex items-center gap-2" onClick={handleLogout}>
                <LogOut className="w-4 h-4 shrink-0" />
                {!collapsed && <span>Logout</span>}
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
