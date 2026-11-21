import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { actions, DEPARTMENTS, DESIGNATIONS, useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Trash2, KeyRound } from "lucide-react";

export const Route = createFileRoute("/teacher-register")({ component: TeacherRegister });

function TeacherRegister() {
  const { teachers } = useStore();
  const [name, setName] = useState("");
  const [dept, setDept] = useState("CST");
  const [designation, setDesignation] = useState("Instructor");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("teacher123");
  const [nextId, setNextId] = useState("T-CST-001");

  useEffect(() => {
    setNextId(actions.generateTeacherId(dept));
  }, [dept, teachers.length]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Name required");
    actions.addTeacher({ id: crypto.randomUUID(), teacherId: nextId, name, department: dept, designation, email, phone, password, isActive: true });
    setName(""); setEmail(""); setPhone("");
    toast.success(`Teacher added with ID: ${nextId}`);
  };

  return (
    <AppShell title="Teacher Registration · শিক্ষক নিবন্ধন" roles={["admin"]}>
      <Card className="mb-6 shadow-sm">
        <CardHeader><CardTitle className="flex items-center gap-2"><UserPlus className="size-5 text-primary" /> Register New Teacher</CardTitle><CardDescription>Teacher ID auto-generates based on department.</CardDescription></CardHeader>
        <CardContent>
          <form onSubmit={submit} className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="space-y-1"><label className="text-xs">Teacher ID (Auto)</label><Input value={nextId} readOnly className="font-mono bg-muted" /></div>
            <div className="space-y-1 col-span-2"><label className="text-xs">Name</label><Input value={name} onChange={(e) => setName(e.target.value)} required /></div>
            <div className="space-y-1"><label className="text-xs">Department</label>
              <Select value={dept} onValueChange={setDept}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{DEPARTMENTS.map((d) => <SelectItem key={d.code} value={d.code}>{d.code}</SelectItem>)}</SelectContent></Select>
            </div>
            <div className="space-y-1"><label className="text-xs">Designation</label>
              <Select value={designation} onValueChange={setDesignation}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{DESIGNATIONS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent></Select>
            </div>
            <div className="space-y-1"><label className="text-xs">Password</label><Input value={password} onChange={(e) => setPassword(e.target.value)} /></div>
            <div className="space-y-1"><label className="text-xs">Email</label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
            <div className="space-y-1"><label className="text-xs">Phone</label><Input value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
            <div className="flex items-end"><Button type="submit" className="w-full">Register</Button></div>
          </form>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader><CardTitle>All Teachers ({teachers.length})</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Name</TableHead><TableHead>Dept</TableHead><TableHead>Designation</TableHead><TableHead>Password</TableHead><TableHead className="text-right">Action</TableHead></TableRow></TableHeader>
            <TableBody>
              {teachers.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-mono text-xs">{t.teacherId}</TableCell>
                  <TableCell className="font-medium">{t.name}</TableCell>
                  <TableCell>{t.department}</TableCell>
                  <TableCell><Badge variant="secondary">{t.designation}</Badge></TableCell>
                  <TableCell className="font-mono text-xs">{t.password}</TableCell>
                  <TableCell className="text-right">
                    <Button size="icon" variant="ghost" onClick={() => {
                      const np = prompt(`New password for ${t.name}:`, "teacher123");
                      if (np) { actions.resetTeacherPassword(t.id, np); toast.success("Password updated"); }
                    }}><KeyRound className="size-4" /></Button>
                    <Button size="icon" variant="ghost" onClick={() => { if (confirm(`Delete ${t.name}?`)) { actions.deleteTeacher(t.id); toast.success("Deleted"); } }}><Trash2 className="size-4 text-destructive" /></Button>
                  </TableCell>
                </TableRow>
              ))}
              {!teachers.length && <TableRow><TableCell colSpan={6} className="text-center py-6 text-muted-foreground">No teachers registered</TableCell></TableRow>}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AppShell>
  );
}