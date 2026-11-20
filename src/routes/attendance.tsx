import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { actions, BTEB_SUBJECTS, DEPARTMENTS, SEMESTERS, useStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const Route = createFileRoute("/attendance")({ component: Attendance });

function Attendance() {
  const { students, attendance, session } = useStore();
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [dept, setDept] = useState("CST");
  const [sem, setSem] = useState("1");

  const subjects = BTEB_SUBJECTS["2022"][dept]?.[Number(sem)] || [];
  const [subject, setSubject] = useState(subjects[0]?.name || "");

  // স্টুডেন্ট ভিউ
  if (session?.role === "student") {
    const mine = attendance.filter((a) => a.studentId === session.studentId).sort((a, b) => b.date.localeCompare(a.date));
    return (
      <AppShell title="My Attendance · আমার উপস্থিতি">
        <div className="rounded-lg border bg-card shadow-card card-premium">
          <Table>
            <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Subject</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
            <TableBody>
              {mine.map((a, idx) => (
                <TableRow key={idx}>
                  <TableCell>{a.date}</TableCell>
                  <TableCell className="font-medium">{a.subject}</TableCell>
                  <TableCell><Badge variant={a.present ? "default" : "destructive"}>{a.present ? "Present" : "Absent"}</Badge></TableCell>
                </TableRow>
              ))}
              {mine.length === 0 && <TableRow><TableCell colSpan={3} className="text-center py-6 text-muted-foreground">No records found.</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      </AppShell>
    );
  }

  const list = students.filter((s) => s.department === dept && s.semester === Number(sem));
  const isPresent = (id: string) => attendance.find((a) => a.date === date && a.studentId === id && a.subject === subject)?.present ?? false;
  const count = list.filter((s) => isPresent(s.id)).length;

  const handleDeptChange = (v: string) => {
    setDept(v);
    const newSubjects = BTEB_SUBJECTS["2022"][v]?.[Number(sem)] || [];
    setSubject(newSubjects[0]?.name || "");
  };

  const handleSemChange = (v: string) => {
    setSem(v);
    const newSubjects = BTEB_SUBJECTS["2022"][dept]?.[Number(v)] || [];
    setSubject(newSubjects[0]?.name || "");
  };

  return (
    <AppShell title="Attendance · উপস্থিতি">
      <div className="flex flex-wrap gap-3 mb-6 items-center bg-card p-4 rounded-lg border shadow-sm">
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-40" />
        <Select value={dept} onValueChange={handleDeptChange}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>{DEPARTMENTS.map((d) => <SelectItem key={d.code} value={d.code}>{d.code}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={sem} onValueChange={handleSemChange}>
          <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
          <SelectContent>{SEMESTERS.map((s) => <SelectItem key={s} value={String(s)}>Sem {s}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={subject} onValueChange={setSubject}>
          <SelectTrigger className="w-64"><SelectValue placeholder="Select Subject" /></SelectTrigger>
          <SelectContent>
            {subjects.map((s) => <SelectItem key={s.code} value={s.name}>{s.code} - {s.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <div className="ml-auto text-sm font-medium"><b className="text-primary text-lg">{count}</b> / {list.length} Present</div>
      </div>
      <div className="rounded-lg border bg-card shadow-card card-premium">
        <Table>
          <TableHeader><TableRow><TableHead>Roll</TableHead><TableHead>Name</TableHead><TableHead className="text-right">Present?</TableHead></TableRow></TableHeader>
          <TableBody>
            {list.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-mono">{s.roll}</TableCell>
                <TableCell className="font-medium">{s.name}</TableCell>
                <TableCell className="text-right"><Switch checked={isPresent(s.id)} onCheckedChange={(v) => actions.setAttendance(date, s.id, subject, v)} /></TableCell>
              </TableRow>
            ))}
            {list.length === 0 && <TableRow><TableCell colSpan={3} className="text-center py-6 text-muted-foreground">No students in this Dept/Sem</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>
    </AppShell>
  );
}