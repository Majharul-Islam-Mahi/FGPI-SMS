import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import {
  GraduationCap, LayoutDashboard, Users, CalendarCheck,
  Award, Building2, Presentation, LogOut, FileText, CreditCard,
  CalendarDays, FileQuestion, UserPlus, Briefcase, Hotel, Book, Bus, MessageSquare, IdCard
} from "lucide-react";
import { actions, useStore, type Role } from "@/lib/store";
import { Button } from "@/components/ui/button";

const NAV = [
  { to: "/dashboard", label: "Dashboard", bn: "ড্যাশবোর্ড", icon: LayoutDashboard, roles: ["admin", "teacher", "student"] },
  { to: "/students", label: "Students", bn: "শিক্ষার্থী", icon: Users, roles: ["admin", "teacher"] },
  { to: "/attendance", label: "Attendance", bn: "উপস্থিতি", icon: CalendarCheck, roles: ["admin", "teacher", "student"] },
  { to: "/results", label: "Results", bn: "ফলাফল", icon: Award, roles: ["admin", "teacher", "student"] },
  { to: "/routine", label: "Routine", bn: "রুটিন", icon: CalendarDays, roles: ["admin", "teacher", "student"] },
  { to: "/notices", label: "Notices", bn: "নোটিশ", icon: FileText, roles: ["admin", "teacher", "student"] },
  { to: "/fees", label: "Fees", bn: "ফি", icon: CreditCard, roles: ["admin", "teacher", "student"] },
  { to: "/applications", label: "Applications", bn: "আবেদন", icon: FileQuestion, roles: ["admin", "teacher", "student"] },
  { to: "/departments", label: "Departments", bn: "বিভাগ", icon: Building2, roles: ["admin", "teacher", "student"] },
  
  // ⬇️ নতুন ৭টি আলাদা পেজের লিংক
  { to: "/admission", label: "Admission", bn: "ভর্তি", icon: UserPlus, roles: ["admin", "teacher", "student"] },
  { to: "/faculty", label: "Faculty", bn: "শিক্ষক", icon: Briefcase, roles: ["admin", "teacher", "student"] },
  { to: "/hostel", label: "Hostel", bn: "হোস্টেল", icon: Hotel, roles: ["admin", "teacher", "student"] },
  { to: "/library", label: "Library", bn: "লাইব্রেরি", icon: Book, roles: ["admin", "teacher", "student"] },
  { to: "/transport", label: "Transport", bn: "পরিবহন", icon: Bus, roles: ["admin", "teacher", "student"] },
  { to: "/sms", label: "SMS Alerts", bn: "এসএমএস", icon: MessageSquare, roles: ["admin", "teacher", "student"] },
  { to: "/idcard", label: "ID Card", bn: "আইডি কার্ড", icon: IdCard, roles: ["admin", "teacher", "student"] },
  
  { to: "/presentation", label: "Presentation", bn: "প্রেজেন্টেশন", icon: Presentation, roles: ["admin", "teacher", "student"] },
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
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* ── Sidebar ── */}
      <aside className="md:w-64 bg-sidebar text-sidebar-foreground md:min-h-screen flex md:flex-col">
        <Link to="/" className="flex items-center gap-2 p-4 md:p-5 border-b border-sidebar-border">
          <GraduationCap className="size-8 text-sidebar-primary" />
          <div className="leading-tight hidden sm:block">
            <div className="font-display font-bold">FGPI SMS</div>
            <div className="text-xs opacity-70">ফেনী সরকারি পলিটেকনিক</div>
          </div>
        </Link>

        <nav className="flex md:flex-col gap-1 p-2 md:p-3 overflow-x-auto md:overflow-y-auto flex-1 h-[calc(100vh-140px)]">
          {NAV.filter((n) => (n.roles as readonly string[]).includes(session.role)).map((n, idx) => (
            <Link
              key={idx}
              to={n.to}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm whitespace-nowrap hover:bg-sidebar-accent"
              activeProps={{ className: "bg-sidebar-accent text-sidebar-primary font-semibold" }}
            >
              <n.icon className="size-4" />
              <span>{n.label} <span className="opacity-60 hidden lg:inline">· {n.bn}</span></span>
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-sidebar-border hidden md:block">
          <div className="text-sm font-semibold">{session.name}</div>
          <div className="text-xs opacity-70 capitalize mb-2">{session.role}</div>
          <Button variant="secondary" size="sm" className="w-full" onClick={() => { actions.logout(); navigate({ to: "/login", replace: true }); }}>
            <LogOut className="size-4" /> Logout
          </Button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 p-4 md:p-8 max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
          <Button
            variant="outline"
            size="sm"
            className="md:hidden"
            onClick={() => { actions.logout(); navigate({ to: "/login", replace: true }); }}
          >
            <LogOut className="size-4" />
          </Button>
        </div>
        {allowed ? children : <p className="text-muted-foreground">এই পেজটি আপনার জন্য নয় — access restricted for your role.</p>}
      </main>
    </div>
  );
}

/** Dashboard-এর stat card */
export function Stat({ label, value, sub }: { label: string; value: ReactNode; sub?: string }) {
  return (
    <div className="rounded-lg bg-card p-5 shadow-card border card-premium card-premium-hover">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="text-3xl font-bold font-display text-primary mt-1">{value}</div>
      {sub && <div className="text-xs text-muted-foreground mt-1">{sub}</div>}
    </div>
  );
}