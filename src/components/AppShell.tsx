import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  GraduationCap, LayoutDashboard, Users, CalendarCheck, Award, Building2, Presentation, 
  LogOut, FileText, CreditCard, CalendarDays, FileQuestion, UserPlus, Briefcase, Hotel, 
  Book, Bus, MessageSquare, IdCard, Wallet, BookOpen, Settings, User, ShieldAlert
} from "lucide-react";
import { actions, useStore, type Role } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { LoadingScreen } from "@/components/LoadingScreen";

const NAV_GROUPS = [
  {
    title: "Main",
    items: [
      { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["admin", "teacher", "student"] },
      { to: "/students", label: "Students", icon: Users, roles: ["admin", "teacher"] },
      { to: "/attendance", label: "Attendance", icon: CalendarCheck, roles: ["admin", "teacher", "student"] },
      { to: "/results", label: "Results", icon: Award, roles: ["admin", "teacher", "student"] },
    ],
  },
  {
    title: "Academic",
    items: [
      { to: "/subjects", label: "Subjects", icon: BookOpen, roles: ["admin", "teacher", "student"] },
      { to: "/routine", label: "Routine", icon: CalendarDays, roles: ["admin", "teacher", "student"] },
      { to: "/notices", label: "Notices", icon: FileText, roles: ["admin", "teacher", "student"] },
      { to: "/departments", label: "Departments", icon: Building2, roles: ["admin", "teacher", "student"] },
    ],
  },
  {
    title: "Administration",
    items: [
      { to: "/fees", label: "Fees", icon: CreditCard, roles: ["admin", "teacher", "student"] },
      { to: "/applications", label: "Applications", icon: FileQuestion, roles: ["admin", "teacher", "student"] },
      { to: "/fee-ledger", label: "Fee Ledger", icon: Wallet, roles: ["admin"] },
      { to: "/sms", label: "SMS Alerts", icon: MessageSquare, roles: ["admin", "teacher"] },
      { to: "/teacher-register", label: "Teacher Register", icon: UserPlus, roles: ["admin"] },
    ],
  },
  {
    title: "Campus Services",
    items: [
      { to: "/admission", label: "Admission", icon: UserPlus, roles: ["admin", "teacher"] },
      { to: "/faculty", label: "Faculty", icon: Briefcase, roles: ["admin", "teacher"] },
      { to: "/hostel", label: "Hostel", icon: Hotel, roles: ["admin", "teacher", "student"] },
      { to: "/library", label: "Library", icon: Book, roles: ["admin", "teacher", "student"] },
      { to: "/transport", label: "Transport", icon: Bus, roles: ["admin", "teacher", "student"] },
      { to: "/idcard", label: "ID Card", icon: IdCard, roles: ["admin", "teacher", "student"] },
    ],
  },
  {
    title: "Reports & Portals",
    items: [
      { to: "/student-portal", label: "Student Portal", icon: GraduationCap, roles: ["student"] },
      { to: "/teacher-portal", label: "Teacher Portal", icon: Award, roles: ["teacher", "admin"] },
      { to: "/presentation", label: "Presentation", icon: Presentation, roles: ["admin", "teacher", "student"] },
    ],
  },
  {
    title: "Account",
    items: [
      { to: "/profile", label: "My Profile", icon: User, roles: ["admin", "teacher", "student"] },
      { to: "/settings", label: "Settings", icon: Settings, roles: ["admin"] },
    ],
  },
] as const;

// গোল প্রোফাইল ছবি; ছবি না থাকলে বা লোড না হলে নামের প্রথম অক্ষর দেখায়
function UserAvatar({ url, name }: { url?: string; name: string }) {
  const [failed, setFailed] = useState(false);
  const initial = Array.from(name.trim())[0] ?? "?";

  return (
    <div className="size-10 rounded-full overflow-hidden border-2 border-gold/50 shrink-0 bg-primary/20 flex items-center justify-center">
      {url && !failed ? (
        <img src={url} alt={name} className="size-full object-cover" onError={() => setFailed(true)} />
      ) : (
        <span className="text-gold font-bold uppercase">{initial}</span>
      )}
    </div>
  );
}

export function AppShell({ title, roles, children }: { title: string; roles?: Role[]; children: ReactNode }) {
  const { session, isLoading, admins, teachers, students } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!session) {
        navigate({ to: "/login", replace: true });
      } else if (roles && !roles.includes(session.role)) {
        navigate({ to: "/dashboard", replace: true });
      }
    }
  }, [isLoading, session, roles, navigate]);

  if (isLoading || !session) return <LoadingScreen message="Loading System" />;
  
  const allowed = !roles || roles.includes(session.role);

  // বর্তমান ব্যবহারকারীর রেকর্ড থেকে প্রোফাইল ছবির URL
  const currentUser =
    session.role === "admin"
      ? admins.find((a) => a.id === (session.adminId ?? session.userId))
      : session.role === "teacher"
        ? teachers.find((t) => t.id === (session.teacherId ?? session.userId))
        : students.find((s) => s.id === (session.studentId ?? session.userId));
  const avatarUrl = currentUser?.avatarUrl;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      <aside className="md:w-64 bg-sidebar text-sidebar-foreground md:h-screen flex md:flex-col sticky top-0 shrink-0">
        <Link to="/" className="flex items-center gap-2 p-4 md:p-5 border-b border-sidebar-border">
          <GraduationCap className="size-8 text-sidebar-primary" />
          <div className="leading-tight hidden sm:block">
            <div className="font-display font-bold text-lg">FGPI SMS</div>
            <div className="text-xs opacity-70">ফেনী সরকারি পলিটেকনিক</div>
          </div>
        </Link>
        <nav className="flex md:flex-col gap-1 p-2 md:p-4 overflow-x-auto md:overflow-y-auto flex-1">
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
                    <Link key={idx} to={n.to} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm whitespace-nowrap transition-colors hover:bg-sidebar-accent" activeProps={{ className: "bg-sidebar-accent text-sidebar-primary font-semibold" }}>
                      <n.icon className="size-4 shrink-0" /><span>{n.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>
        <div className="p-3 border-t border-sidebar-border hidden md:block bg-sidebar/50">
          <div className="flex items-center gap-3 mb-3">
            <UserAvatar key={avatarUrl ?? "none"} url={avatarUrl} name={session.name} />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold truncate">{session.name}</div>
              <div className="text-xs opacity-70 capitalize truncate">
                {session.role}
                {session.status && session.status !== "Active" ? ` (${session.status})` : ""}
              </div>
            </div>
          </div>
          <Button size="sm" className="w-full bg-gold text-black hover:bg-gold/90 font-bold shadow-lg" onClick={() => { actions.logout(); navigate({ to: "/login", replace: true }); }}>
            <LogOut className="size-4 mr-2" /> Logout
          </Button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        {/* ⬇️ Read-Only Alert Banner */}
        {session.isReadOnly && (
          <div className="bg-amber-500 text-black px-4 py-2 text-sm font-semibold flex items-center justify-center gap-2 shadow-md">
            <ShieldAlert className="size-4" /> 
            You are in Read-Only Mode. Your account status is "{session.status}". You cannot add, edit, or delete any data.
          </div>
        )}
        
        <div className="p-4 md:p-8 max-w-7xl w-full flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h1>
          </div>
          {allowed ? children : <p className="text-muted-foreground">Access restricted for your role.</p>}
        </div>
      </main>
    </div>
  );
}

export function Stat({ label, value, sub }: { label: string; value: ReactNode; sub?: string }) {
  return (
    <div className="rounded-lg bg-card border p-5 shadow-card card-premium">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="text-3xl font-display font-bold text-primary">{value}</div>
      {sub && <div className="text-xs text-muted-foreground mt-1">{sub}</div>}
    </div>
  );
}