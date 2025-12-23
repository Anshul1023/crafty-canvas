import { 
  LayoutDashboard, 
  Receipt, 
  CalendarClock, 
  PieChart, 
  Settings, 
  LogOut,
  Wallet,
  TrendingUp,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Expenses", href: "/expenses", icon: Receipt },
  { name: "Bills", href: "/bills", icon: CalendarClock },
  { name: "Analytics", href: "/analytics", icon: PieChart },
  { name: "Budgets", href: "/budgets", icon: TrendingUp },
];

const bottomNavigation = [
  { name: "Settings", href: "/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    await signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/auth");
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-sidebar border-r border-sidebar-border min-h-screen">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-sidebar-border">
        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
          <Wallet className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-bold text-sidebar-foreground text-lg">ExpenseFlow</h1>
          <p className="text-xs text-sidebar-foreground/60">Smart Finance</p>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        <p className="px-3 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider mb-4">
          Menu
        </p>
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-primary/20"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
              {item.name === "Bills" && (
                <span className="ml-auto bg-warning text-warning-foreground text-xs px-2 py-0.5 rounded-full font-semibold">
                  3
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="px-4 py-6 border-t border-sidebar-border space-y-1">
        {user && (
          <div className="px-3 py-2 mb-2">
            <p className="text-xs text-sidebar-foreground/50 truncate">{user.email}</p>
          </div>
        )}
        {bottomNavigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200"
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </Link>
        ))}
        {user ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-all duration-200 w-full"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        ) : (
          <Link
            to="/auth"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-primary hover:bg-primary/10 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            Login
          </Link>
        )}
      </div>
    </aside>
  );
}
