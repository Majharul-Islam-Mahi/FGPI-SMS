import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { actions, DEPARTMENTS, useStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const Route = createFileRoute("/attendance")({ component: Attendance });

const SUBJECTS = ["Mathematics", "Physics", "English", "Programming", "Basic Electricity"];

function Attendance() {
  const { students, attendance, session } = useStore();
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [dept, setDept] = useState("all");
  const [subject, setSubject] = useState(SUBJECTS[0]);

  // ১. স্টুডেন্ট ভিউ: নিজের হাজিরা দেখা
  if (session?.role === "student") {
    const mine = attendance.filter((a) => a.studentId === session.studentId).sort((a, b) => b.date.localeCompare(a.date));
    return (
      <AppShell title="My Attendance · আমার উপস্থিতি">
        <div className="rounded-lg border bg-card shadow-card card-premium">
          <Table>
            <TableHeader>
              <TableRow><TableHead>Date</TableHead><TableHead>Subject</TableHead><TableHead>Status</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {mine.length === 0 && <TableRow><TableCell colSpan={3} className="text-center py-6 text-muted-foreground">No attendance records found.</TableCell></TableRow>}
              {mine.map((a, idx) => (
                <TableRow key={idx}>
                  <TableCell>{a.date}</TableCell>
                  <TableCell className="font-medium">{a.subject}</TableCell>
                  <TableCell>
                    <Badge variant={a.present ? "default" : "destructive"}>
                      {a.present ? "Present" : "Absent"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </AppShell>
    );
  }

  // ২. টিচার/অ্যাডমিন ভিউ
  const list = students.filter((s) => dept === "all" || s.department === dept);
  const isPresent = (id: string) => attendance.find((a) => a.date === date && a.studentId === id && a.subject === subject)?.present ?? false;
  const count = list.filter((s) => isPresent(s.id)).length;

  return (
    <AppShell title="Attendance · উপস্থিতি">
      <div className="flex flex-wrap gap-3 mb-6 items-center bg-card p-4 rounded-lg border shadow-sm">
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-40" />
        
        <Select value={subject} onValueChange={setSubject}>
          <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
          <SelectContent>{SUBJECTS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
        </Select>

        <Select value={dept} onValueChange={setDept}>
          <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {DEPARTMENTS.map((d) => <SelectItem key={d.code} value={d.code}>{d.code}</SelectItem>)}
          </SelectContent>
        </Select>

        <div className="ml-auto text-sm font-medium">
          <b className="text-primary text-lg">{count}</b> / {list.length} Present
        </div>
      </div>

      <div className="rounded-lg border bg-card shadow-card card-premium">
        <Table>
          <TableHeader>
            <TableRow><TableHead>Roll</TableHead><TableHead>Name</TableHead><TableHead>Dept</TableHead><TableHead className="text-right">Present?</TableHead></TableRow>
          </TableHeader>
          <TableBody>
            {list.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-mono">{s.roll}</TableCell>
                <TableCell className="font-medium">{s.name}</TableCell>
                <TableCell>{s.department}</TableCell>
                <TableCell className="text-right">
                  <Switch
                    checked={isPresent(s.id)}
                    onCheckedChange={(v) => actions.setAttendance(date, s.id, subject, v)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AppShell>
  );
}