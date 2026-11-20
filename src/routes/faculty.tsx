import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { EmptyState } from "@/components/EmptyState";
import { actions, DEPARTMENTS, useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Briefcase, UserCircle2, Trash2 } from "lucide-react";

export const Route = createFileRoute("/faculty")({ component: Faculty });

const DESIGNATIONS = [
  "Instructor & Department Head",
  "Instructor",
  "Jr-Instructor",
  "Lab Assistant",
];

function Faculty() {
  const { faculties } = useStore();
  const [teacherId, setTeacherId] = useState("");
  const [name, setName] = useState("");
  const [dept, setDept] = useState("CST");
  const [course, setCourse] = useState("");
  const [designation, setDesignation] = useState(DESIGNATIONS[1]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherId || !name) return toast.error("Teacher ID and Name required");
    actions.addFaculty({ 
      id: crypto.randomUUID(), teacherId, name, department: dept, 
      course, designation 
    });
    setTeacherId(""); setName(""); setCourse("");
    toast.success("Teacher added!");
  };

  const getDesignationColor = (d?: string) => {
    if (d?.includes("Head")) return "default";
    if (d === "Instructor") return "secondary";
    if (d === "Jr-Instructor") return "outline";
    return "secondary";
  };

  return (
    <AppShell title="Faculty · শিক্ষক">
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 shadow-sm h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Briefcase className="size-5 text-primary" /> Add Teacher</CardTitle>
            <CardDescription>Register a new teacher.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-3">
              <Input placeholder="Teacher ID (e.g. T-1001)" value={teacherId} onChange={e => setTeacherId(e.target.value)} required />
              <Input placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required />
              <Select value={dept} onValueChange={setDept}>
                <SelectTrigger><SelectValue placeholder="Department" /></SelectTrigger>
                <SelectContent>{DEPARTMENTS.map(d => <SelectItem key={d.code} value={d.code}>{d.code}</SelectItem>)}</SelectContent>
              </Select>
              <Select value={designation} onValueChange={setDesignation}>
                <SelectTrigger><SelectValue placeholder="Designation" /></SelectTrigger>
                <SelectContent>{DESIGNATIONS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
              </Select>
              <Input placeholder="Assigned Course (optional)" value={course} onChange={e => setCourse(e.target.value)} />
              <Button type="submit" className="w-full">Add Teacher</Button>
            </form>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 shadow-sm">
          <CardHeader><CardTitle>Faculty Directory ({faculties.length})</CardTitle></CardHeader>
          <CardContent>
            {faculties.length === 0 ? (
              <EmptyState icon={UserCircle2} title="No Teachers Added" description="Add faculty members to assign courses." />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Dept</TableHead>
                    <TableHead>Designation</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {faculties.map(f => (
                    <TableRow key={f.id}>
                      <TableCell className="font-mono text-xs">{f.teacherId || "-"}</TableCell>
                      <TableCell className="font-medium flex items-center gap-2">
                        <UserCircle2 className="size-4 text-muted-foreground" /> {f.name}
                      </TableCell>
                      <TableCell>{f.department}</TableCell>
                      <TableCell>
                        <Badge variant={getDesignationColor(f.designation)} className="text-xs">
                          {f.designation || "Instructor"}
                        </Badge>
                      </TableCell>
                      <TableCell>{f.course || "-"}</TableCell>
                      <TableCell className="text-right">
                        <Button size="icon" variant="ghost" onClick={() => {
                          if (confirm(`Delete ${f.name}?`)) {
                            actions.deleteFaculty(f.id);
                            toast.success("Teacher deleted");
                          }
                        }}>
                          <Trash2 className="size-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}