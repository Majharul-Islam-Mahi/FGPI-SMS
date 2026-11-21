import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Pencil, Plus, Trash2, Users, GraduationCap } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { EmptyState } from "@/components/EmptyState";
import { actions, DEPARTMENTS, SEMESTERS, SESSIONS, useStore, type Student } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/students")({ component: Students });

const empty = (): Student => ({
  id: "", roll: "", name: "", department: "CST", semester: 1, session: "2025-26", phone: "", gender: "Male", password: "student123", status: "Active", address: ""
});

function Students() {
  const { students, session } = useStore();
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("all");
  const [sem, setSem] = useState("all");
  const [edit, setEdit] = useState<Student | null>(null);
  const canEdit = session?.role === "admin" && !session?.isReadOnly;

  const list = students.filter(
    (s) =>
      (dept === "all" || s.department === dept) &&
      (sem === "all" || s.semester === +sem) &&
      (s.name.toLowerCase().includes(q.toLowerCase()) || s.roll.includes(q)),
  );

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!edit) return;
    if (!edit.name.trim() || !edit.roll.trim()) return toast.error("Name and Roll required");
    if (edit.phone && !/^01[3-9]\d{8}$/.test(edit.phone)) return toast.error("Invalid Phone (e.g. 01712345678)");
    if (students.some((s) => s.roll === edit.roll && s.session === edit.session && s.id !== edit.id)) return toast.error("Duplicate Roll in this session");
    
    actions.saveStudent({ ...edit, id: edit.id || crypto.randomUUID() });
    toast.success(edit.id ? "Student updated" : "Student added");
    setEdit(null);
  };

  const getStatusColor = (status?: string) => {
    if (status === "Graduated") return "default";
    if (status === "Dropped") return "destructive";
    return "secondary";
  };

  return (
    <AppShell title="Students · শিক্ষার্থী" roles={["admin", "teacher"]}>
      <div className="flex flex-wrap gap-3 mb-4 items-center">
        <Input placeholder="Search name / roll…" value={q} onChange={(e) => setQ(e.target.value)} className="max-w-xs" />
        <Select value={dept} onValueChange={setDept}>
          <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="all">All departments</SelectItem>{DEPARTMENTS.map((d) => <SelectItem key={d.code} value={d.code}>{d.name}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={sem} onValueChange={setSem}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="all">All semesters</SelectItem>{SEMESTERS.map((s) => <SelectItem key={s} value={String(s)}>Semester {s}</SelectItem>)}</SelectContent>
        </Select>
        {canEdit && <Button onClick={() => setEdit(empty())} className="ml-auto"><Plus className="size-4" /> Add Student</Button>}
      </div>

      <div className="rounded-lg border bg-card shadow-card overflow-x-auto card-premium">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Roll</TableHead><TableHead>Name</TableHead><TableHead>Department</TableHead>
              <TableHead>Sem</TableHead><TableHead>Session</TableHead><TableHead>Phone</TableHead><TableHead>Status</TableHead>
              {canEdit && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-mono">{s.roll}</TableCell>
                <TableCell className="font-medium">{s.name}</TableCell>
                <TableCell>{s.department}</TableCell>
                <TableCell>{s.semester}</TableCell>
                <TableCell>{s.session}</TableCell>
                <TableCell>{s.phone}</TableCell>
                <TableCell><Badge variant={getStatusColor(s.status)}>{s.status || "Active"}</Badge></TableCell>
                {canEdit && (
                  <TableCell className="text-right whitespace-nowrap">
                    <Button size="icon" variant="ghost" onClick={() => setEdit(s)} title="Edit"><Pencil className="size-4" /></Button>
                    {s.status === "Active" && (
                      <Button size="icon" variant="ghost" className="text-primary" title="Mark as Graduated" onClick={() => {
                        if (confirm(`Mark ${s.name} as Graduated?`)) {
                          actions.saveStudent({ ...s, status: "Graduated" });
                          toast.success("Student Graduated");
                        }
                      }}><GraduationCap className="size-4" /></Button>
                    )}
                    <Button size="icon" variant="ghost" onClick={() => { if (confirm(`Delete ${s.name}?`)) { actions.deleteStudent(s.id); toast.success("Deleted"); } }} title="Delete"><Trash2 className="size-4 text-destructive" /></Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
            {!list.length && (
              <TableRow><TableCell colSpan={canEdit ? 8 : 7} className="p-0"><EmptyState icon={Users} title="No Students Found" description="Add a student or adjust filters." /></TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!edit} onOpenChange={(o) => !o && setEdit(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{edit?.id ? "Edit Student" : "Add Student"}</DialogTitle></DialogHeader>
          {edit && (
            <form onSubmit={save} className="grid grid-cols-2 gap-3">
              <div className="col-span-2 space-y-1"><Label>Name</Label><Input required value={edit.name} onChange={(e) => setEdit({ ...edit, name: e.target.value })} /></div>
              <div className="space-y-1"><Label>Roll</Label><Input required value={edit.roll} onChange={(e) => setEdit({ ...edit, roll: e.target.value })} /></div>
              <div className="space-y-1"><Label>Session</Label>
                <Select value={edit.session} onValueChange={(v) => setEdit({ ...edit, session: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{SESSIONS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-1"><Label>Department</Label>
                <Select value={edit.department} onValueChange={(v) => setEdit({ ...edit, department: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{DEPARTMENTS.map((d) => <SelectItem key={d.code} value={d.code}>{d.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1"><Label>Semester</Label>
                <Select value={String(edit.semester)} onValueChange={(v) => setEdit({ ...edit, semester: +v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{SEMESTERS.map((s) => <SelectItem key={s} value={String(s)}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1"><Label>Gender</Label>
                <Select value={edit.gender} onValueChange={(v) => setEdit({ ...edit, gender: v as "Male" | "Female" })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="Male">Male</SelectItem><SelectItem value="Female">Female</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-1"><Label>Phone</Label><Input value={edit.phone} onChange={(e) => setEdit({ ...edit, phone: e.target.value })} placeholder="017xxxxxxxx" /></div>
              <div className="col-span-2 space-y-1"><Label>Address</Label><Input value={edit.address || ""} onChange={(e) => setEdit({ ...edit, address: e.target.value })} placeholder="Village, Upazila, District" /></div>
              <div className="space-y-1"><Label>Status</Label>
                <Select value={edit.status || "Active"} onValueChange={(v) => setEdit({ ...edit, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="Active">Active</SelectItem><SelectItem value="Graduated">Graduated</SelectItem><SelectItem value="Dropped">Dropped</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="space-y-1"><Label>Password</Label><Input value={edit.password} onChange={(e) => setEdit({ ...edit, password: e.target.value })} /></div>
              <Button type="submit" className="col-span-2 mt-2">Save Student</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}