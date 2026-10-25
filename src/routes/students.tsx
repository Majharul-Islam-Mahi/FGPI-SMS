import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { actions, DEPARTMENTS, SEMESTERS, useStore, type Student } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const Route = createFileRoute("/students")({
  head: () => ({
    meta: [
      { title: "Students — FGPI SMS" },
      { name: "description", content: "Add, edit and delete student records by department and semester." },
      { property: "og:title", content: "Students — FGPI SMS" },
      { property: "og:description", content: "শিক্ষার্থী তালিকা — যোগ, সম্পাদনা ও মুছুন" },
    ],
  }),
  component: Students,
});

const empty = (): Student => ({
  id: "", roll: "", name: "", department: "CST",
  semester: 1, session: "2025-26", phone: "", gender: "Male",
});

function Students() {
  const { students, session } = useStore();
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("all");
  const [sem, setSem] = useState("all");
  const [edit, setEdit] = useState<Student | null>(null);
  const canEdit = session?.role === "admin";

  const list = students.filter(
    (s) =>
      (dept === "all" || s.department === dept) &&
      (sem === "all" || s.semester === +sem) &&
      (s.name.toLowerCase().includes(q.toLowerCase()) || s.roll.includes(q)),
  );

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!edit) return;
    if (students.some((s) => s.roll === edit.roll && s.id !== edit.id)) {
      toast.error("এই রোল আগে থেকেই আছে — roll already exists");
      return;
    }
    actions.saveStudent({ ...edit, id: edit.id || `s${Date.now()}` });
    toast.success(edit.id ? "Student updated" : "Student added");
    setEdit(null);
  };

  return (
    <AppShell title="Students · শিক্ষার্থী" roles={["admin", "teacher"]}>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <Input
          placeholder="Search name / roll…"
          value={q} onChange={(e) => setQ(e.target.value)}
          className="max-w-xs"
        />
        <Select value={dept} onValueChange={setDept}>
          <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All departments</SelectItem>
            {DEPARTMENTS.map((d) => <SelectItem key={d.code} value={d.code}>{d.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={sem} onValueChange={setSem}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All semesters</SelectItem>
            {SEMESTERS.map((s) => <SelectItem key={s} value={String(s)}>Semester {s}</SelectItem>)}
          </SelectContent>
        </Select>
        {canEdit && (
          <Button onClick={() => setEdit(empty())} className="ml-auto">
            <Plus className="size-4" /> Add Student
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card shadow-card overflow-x-auto card-premium">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Roll</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Sem</TableHead>
              <TableHead>Session</TableHead>
              <TableHead>Phone</TableHead>
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
                {canEdit && (
                  <TableCell className="text-right whitespace-nowrap">
                    <Button size="icon" variant="ghost" onClick={() => setEdit(s)} aria-label="Edit">
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      size="icon" variant="ghost" aria-label="Delete"
                      onClick={() => {
                        if (confirm(`Delete ${s.name}?`)) {
                          actions.deleteStudent(s.id);
                          toast.success("Deleted");
                        }
                      }}
                    >
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
            {!list.length && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                  কোনো শিক্ষার্থী পাওয়া যায়নি
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add / Edit dialog */}
      <Dialog open={!!edit} onOpenChange={(o) => !o && setEdit(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{edit?.id ? "Edit Student" : "Add Student · নতুন শিক্ষার্থী"}</DialogTitle>
          </DialogHeader>
          {edit && (
            <form onSubmit={save} className="grid grid-cols-2 gap-3">
              <div className="col-span-2 space-y-1">
                <Label>Name</Label>
                <Input required value={edit.name} onChange={(e) => setEdit({ ...edit, name: e.target.value })} />
              </div>
              <div className="space-y-1">
                <Label>Roll</Label>
                <Input required value={edit.roll} onChange={(e) => setEdit({ ...edit, roll: e.target.value })} />
              </div>
              <div className="space-y-1">
                <Label>Session</Label>
                <Input required value={edit.session} onChange={(e) => setEdit({ ...edit, session: e.target.value })} />
              </div>
              <div className="col-span-2 space-y-1">
                <Label>Department</Label>
                <Select value={edit.department} onValueChange={(v) => setEdit({ ...edit, department: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map((d) => <SelectItem key={d.code} value={d.code}>{d.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Semester</Label>
                <Select value={String(edit.semester)} onValueChange={(v) => setEdit({ ...edit, semester: +v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {SEMESTERS.map((s) => <SelectItem key={s} value={String(s)}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Gender</Label>
                <Select value={edit.gender} onValueChange={(v) => setEdit({ ...edit, gender: v as Student["gender"] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-1">
                <Label>Phone</Label>
                <Input value={edit.phone} onChange={(e) => setEdit({ ...edit, phone: e.target.value })} />
              </div>
              <Button type="submit" className="col-span-2">Save · সংরক্ষণ</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}