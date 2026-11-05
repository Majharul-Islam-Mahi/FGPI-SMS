import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import {
  GraduationCap, LayoutDashboard, Users, CalendarCheck,
  Award, Building2, Presentation, LogOut, FileText, CreditCard,
  CalendarDays, FileQuestion, UserPlus, Briefcase, Hotel, Book, Bus, MessageSquare, IdCard
} from "lucide-react";
import { actions, useStore, type Role } from "@/lib/store";
import { Button } from "@/components/ui/button";

// ⬇️ মেনুগুলোকে ক্যাটাগরি অনুযায়ী সাজানো হলো
const NAV_GROUPS = [
  {
    title: "Main",
    items: [
      { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["admin", "teacher", "student"] },
      { to: "/students", label: "Students", icon: Users, roles: ["admin", "teacher"] },
      { to: "/attendance", label: "Attendance", icon: CalendarCheck, roles: ["admin", "teacher", "student"] },
      { to: "/results", label: "Results", icon: Award, roles: ["admin", "teacher", "student"] },
    ]
  },
  {
    title: "Academic & Admin",
    items: [
      { to: "/routine", label: "Routine", icon: CalendarDays, roles: ["admin", "teacher", "student"] },
      { to: "/notices", label: "Notices", icon: FileText, roles: ["admin", "teacher", "student"] },
      { to: "/fees", label: "Fees", icon: CreditCard, roles: ["admin", "teacher", "student"] },
      { to: "/applications", label: "Applications", icon: FileQuestion, roles: ["admin", "teacher", "student"] },
      { to: "/departments", label: "Departments", icon: Building2, roles: ["admin", "teacher", "student"] },
    ]
  },
  {
    title: "Advanced Modules",
    items: [
      { to: "/admission", label: "Admission", icon: UserPlus, roles: ["admin", "teacher", "student"] },
      { to: "/faculty", label: "Faculty", icon: Briefcase, roles: ["admin", "teacher", "student"] },
      { to: "/hostel", label: "Hostel", icon: Hotel, roles: ["admin", "teacher", "student"] },
      { to: "/library", label: "Library", icon: Book, roles: ["admin", "teacher", "student"] },
      { to: "/transport", label: "Transport", icon: Bus, roles: ["admin", "teacher", "student"] },
      { to: "/sms", label: "SMS Alerts", icon: MessageSquare, roles: ["admin", "teacher", "student"] },
      { to: "/idcard", label: "ID Card", icon: IdCard, roles: ["admin", "teacher", "student"] },
    ]
  },
  {
    title: "Presentation",
    items: [
      { to: "/presentation", label: "View Slides", icon: Presentation, roles: ["admin", "teacher", "student"] },
    ]
  }
] as const;

export function AppShell({ title, roles, children }: { title: string; roles?: Role[]; children: ReactNode }) {
  const { session } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      const t = setTimeout(() => {
        if (!localStorage.getItem("fgpi-session")) navigate({ to: "/login" });
      }, 50);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [session, navigate]);

  if (!session) return <div className="min-h-screen grid place-items-center text-muted-foreground">Loading…</div>;
  const allowed = !roles || roles.includes(session.role);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* ── Sidebar ── */}
      <aside className="md:w-64 bg-sidebar text-sidebar-foreground md:h-screen flex md:flex-col sticky top-0 flex-shrink-0">
        <Link to="/" className="flex items-center gap-2 p-4 md:p-5 border-b border-sidebar-border">
          <GraduationCap className="size-8 text-sidebar-primary" />
          <div className="leading-tight hidden sm:block">
            <div className="font-display font-bold text-lg">FGPI SMS</div>
            <div className="text-xs opacity-70">ফেনী সরকারি পলিটেকনিক</div>
          </div>
        </Link>

        <nav className="flex md:flex-col gap-1 p-2 md:p-4 overflow-x-auto md:overflow-y-auto flex-1 custom-scrollbar">
          {NAV_GROUPS.map((group, gIdx) => {
            const allowedItems = group.items.filter((n) => (n.roles as readonly string[]).includes(session.role));
            if (allowedItems.length === 0) return null;

            return (
              <div key={gIdx} className="mb-4">
                <div className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider mb-2 px-3 hidden md:block">
                  {group.title}
                </div>
                <div className="flex md:flex-col gap-1">
                  {allowedItems.map((n, idx) => (
                    <Link
                      key={idx}
                      to={n.to}
                      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm whitespace-nowrap transition-colors hover:bg-sidebar-accent"
                      activeProps={{ className: "bg-sidebar-accent text-sidebar-primary font-semibold" }}
                    >
                      <n.icon className="size-4 shrink-0" />
                      <span>{n.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="p-3 border-t border-sidebar-border hidden md:block bg-sidebar/50">
          <div className="text-sm font-semibold truncate">{session.name}</div>
          <div className="text-xs opacity-70 capitalize mb-3">{session.role}</div>
          <Button variant="outline" size="sm" className="w-full text-sidebar-foreground border-sidebar-border hover:bg-sidebar-accent" onClick={() => { actions.logout(); navigate({ to: "/login", replace: true }); }}>
            <LogOut className="size-4 mr-2" /> Logout
          </Button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 p-4 md:p-8 max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h1>
        </div>
        {allowed ? children : <p className="text-muted-foreground">Access restricted for your role.</p>}
      </main>
    </div>
  );
}

export function Stat({ label, value, sub }: { label: string; value: ReactNode; sub?: string }) {
  return (
    <div className="rounded-lg bg-card p-5 shadow-card border card-premium card-premium-hover">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="text-3xl font-bold font-display text-primary mt-1">{value}</div>
      {sub && <div className="text-xs text-muted-foreground mt-1">{sub}</div>}
    </div>
  );
}