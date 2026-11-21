import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { GraduationCap } from "lucide-react";
import { toast } from "sonner";
import { actions, DEPARTMENTS, SESSIONS, type Role } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const [role, setRole] = useState<Role>("admin");
  const [password, setPassword] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [teacherDept, setTeacherDept] = useState("CST");
  const [teacherId, setTeacherId] = useState("");
  const [studentDept, setStudentDept] = useState("CST");
  const [studentRoll, setStudentRoll] = useState("");
  const [studentSession, setStudentSession] = useState("2023-24");
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    let s = null;
    if (role === "admin") s = actions.loginAdmin(adminCode, password);
    if (role === "teacher") s = actions.loginTeacher(teacherDept, teacherId, password);
    if (role === "student") s = actions.loginStudent(studentDept, studentRoll, studentSession, password);
    if (!s) return toast.error("ভুল তথ্য — invalid credentials");
    toast.success(`Welcome, ${s.name}`);
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen grid place-items-center bg-hero p-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-xl bg-card p-8 shadow-card space-y-4">
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

        {role === "admin" && (
          <div className="space-y-1">
            <Label>Admin Code</Label>
            <Input placeholder="ADMIN-001" value={adminCode} onChange={(e) => setAdminCode(e.target.value)} required />
            <p className="text-xs text-muted-foreground">Try: ADMIN-001 / admin123</p>
          </div>
        )}

        {role === "teacher" && (
          <>
            <div className="space-y-1">
              <Label>Department</Label>
              <Select value={teacherDept} onValueChange={setTeacherDept}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{DEPARTMENTS.map((d) => <SelectItem key={d.code} value={d.code}>{d.code} - {d.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Teacher ID</Label>
              <Input placeholder="T-CST-001" value={teacherId} onChange={(e) => setTeacherId(e.target.value)} required />
            </div>
          </>
        )}

        {role === "student" && (
          <>
            <div className="space-y-1">
              <Label>Department</Label>
              <Select value={studentDept} onValueChange={setStudentDept}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{DEPARTMENTS.map((d) => <SelectItem key={d.code} value={d.code}>{d.code}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label>Roll</Label>
                <Input placeholder="510100" value={studentRoll} onChange={(e) => setStudentRoll(e.target.value)} required />
              </div>
              <div className="space-y-1">
                <Label>Session</Label>
                <Select value={studentSession} onValueChange={setStudentSession}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{SESSIONS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
          </>
        )}

        <div className="space-y-1">
          <Label>Password</Label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <Button type="submit" className="w-full">Login</Button>
      </form>
    </div>
  );
}