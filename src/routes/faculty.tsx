import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { actions, useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Briefcase, UserCircle2 } from "lucide-react";

export const Route = createFileRoute("/faculty")({ component: Faculty });
function Faculty() {
  const { faculties } = useStore();
  const [name, setName] = useState("");
  const [dept, setDept] = useState("");
  const [course, setCourse] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    actions.addFaculty({ id: crypto.randomUUID(), name, department: dept, course });
    setName(""); setDept(""); setCourse("");
    toast.success("Faculty added!");
  };

  return (
    <AppShell title="Faculty · শিক্ষক">
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 shadow-sm h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Briefcase className="size-5 text-primary" /> Add Faculty</CardTitle>
            <CardDescription>Register a new teacher.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              <Input placeholder="Teacher Name" value={name} onChange={e => setName(e.target.value)} required />
              <Input placeholder="Department (e.g. CST)" value={dept} onChange={e => setDept(e.target.value)} required />
              <Input placeholder="Assigned Course" value={course} onChange={e => setCourse(e.target.value)} required />
              <Button type="submit" className="w-full">Add Teacher</Button>
            </form>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 shadow-sm">
          <CardHeader><CardTitle>Faculty Directory</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Department</TableHead><TableHead>Course</TableHead></TableRow></TableHeader>
              <TableBody>
                {faculties.length === 0 && <TableRow><TableCell colSpan={3} className="text-center py-6 text-muted-foreground">No teachers added yet.</TableCell></TableRow>}
                {faculties.map(f => (
                  <TableRow key={f.id}>
                    <TableCell className="font-medium flex items-center gap-2"><UserCircle2 className="size-4 text-muted-foreground"/> {f.name}</TableCell>
                    <TableCell>{f.department}</TableCell><TableCell>{f.course}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}