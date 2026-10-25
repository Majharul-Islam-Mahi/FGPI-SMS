import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { GraduationCap } from "lucide-react";
import { toast } from "sonner";
import { actions, type Role } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — FGPI Student Management System" },
      { name: "description", content: "Admin, teacher and student login for the FGPI Student Management System." },
      { property: "og:title", content: "Login — FGPI SMS" },
      { property: "og:description", content: "লগইন করুন — Admin, Teacher, Student" },
    ],
  }),
  component: Login,
});

const HINTS: Record<Role, string> = {
  admin: "Demo: admin / admin123",
  teacher: "Demo: teacher / teacher123",
  student: "Demo: Roll 510100 / 1234",
};

function Login() {
  const [role, setRole] = useState<Role>("admin");
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const s = actions.login(role, u, p);
    if (!s) { toast.error("ভুল তথ্য — invalid username or password"); return; }
    toast.success(`Welcome, ${s.name}`);
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen grid place-items-center bg-hero p-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-xl bg-card p-8 shadow-card space-y-5">
        <Link to="/" className="flex items-center gap-2 text-primary font-display font-bold text-xl">
          <GraduationCap className="size-7" /> FGPI SMS
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Login · লগইন</h1>
          <p className="text-sm text-muted-foreground">Feni Govt Polytechnic Institute</p>
        </div>
        <Tabs value={role} onValueChange={(v) => setRole(v as Role)}>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="admin">Admin</TabsTrigger>
            <TabsTrigger value="teacher">Teacher</TabsTrigger>
            <TabsTrigger value="student">Student</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="space-y-2">
          <Label htmlFor="u">{role === "student" ? "Roll number · রোল" : "Username"}</Label>
          <Input id="u" value={u} onChange={(e) => setU(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="p">Password · পাসওয়ার্ড</Label>
          <Input id="p" type="password" value={p} onChange={(e) => setP(e.target.value)} required />
        </div>
        <Button type="submit" className="w-full">Login</Button>
        <p className="text-xs text-muted-foreground text-center">{HINTS[role]}</p>
      </form>
    </div>
  );
}