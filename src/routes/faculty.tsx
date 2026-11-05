import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { actions, useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
      <form onSubmit={submit} className="flex flex-col md:flex-row gap-3 mb-6 bg-card p-4 rounded-lg border shadow-sm">
        <Input placeholder="Teacher Name" value={name} onChange={e => setName(e.target.value)} required />
        <Input placeholder="Department (e.g. CST)" value={dept} onChange={e => setDept(e.target.value)} required />
        <Input placeholder="Assigned Course" value={course} onChange={e => setCourse(e.target.value)} required />
        <Button type="submit">Add</Button>
      </form>
      <div className="border rounded-lg bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Department</TableHead><TableHead>Course</TableHead></TableRow></TableHeader>
          <TableBody>
            {faculties.map(f => (
              <TableRow key={f.id}><TableCell>{f.name}</TableCell><TableCell>{f.department}</TableCell><TableCell>{f.course}</TableCell></TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AppShell>
  );
}