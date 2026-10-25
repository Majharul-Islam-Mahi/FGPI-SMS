import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { actions, DEPARTMENTS, useStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const Route = createFileRoute("/attendance")({
  head: () => ({
    meta: [
      { title: "Attendance — FGPI SMS" },
      { name: "description", content: "Take and view daily student attendance." },
      { property: "og:title", content: "Attendance — FGPI SMS" },
      { property: "og:description", content: "দৈনিক উপস্থিতি গ্রহণ ও দেখা" },
    ],
  }),
  component: Attendance,
});

function Attendance() {
  const { students, attendance, session } = useStore();
  const [date, setDate] = useState("2026-10-22");
  const [dept, setDept] = useState("all");

  /* ── Student view ── */
  if (session?.role === "student") {
    const mine = attendance
      .filter((a) => a.studentId === session.studentId)
      .sort((a, b) => b.date.localeCompare(a.date));

    return (
      <AppShell title="My Attendance · আমার উপস্থিতি">
        <div className="rounded-lg border bg-card shadow-card card-premium">
          <Table>
            <TableHeader>
              <TableRow><TableHead>Date</TableHead><TableHead>Status</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {mine.map((a) => (
                <TableRow key={a.date}>
                  <TableCell>{a.date}</TableCell>
                  <TableCell>
                    <Badge variant={a.present ? "default" : "destructive"}>
                      {a.present ? "Present · উপস্থিত" : "Absent · অনুপস্থিত"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {!mine.length && (
                <TableRow><TableCell colSpan={2} className="text-center py-6 text-muted-foreground">কোনো রেকর্ড নেই</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </AppShell>
    );
  }

  /* ── Teacher / Admin view ── */
  const list = students.filter((s) => dept === "all" || s.department === dept);
  const isPresent = (id: string) =>
    attendance.find((a) => a.date === date && a.studentId === id)?.present ?? false;
  const count = list.filter((s) => isPresent(s.id)).length;

  return (
    <AppShell title="Attendance · উপস্থিতি">
      <div className="flex flex-wrap gap-3 mb-4 items-center">
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-48" />
        <Select value={dept} onValueChange={setDept}>
          <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All departments</SelectItem>
            {DEPARTMENTS.map((d) => <SelectItem key={d.code} value={d.code}>{d.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <div className="ml-auto text-sm">
          <b className="text-primary">{count}</b> / {list.length} present
        </div>
      </div>
      <div className="rounded-lg border bg-card shadow-card card-premium">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Roll</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Dept</TableHead>
              <TableHead className="text-right">Present?</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-mono">{s.roll}</TableCell>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.department}</TableCell>
                <TableCell className="text-right">
                  <Switch
                    checked={isPresent(s.id)}
                    onCheckedChange={(v) => actions.setAttendance(date, s.id, v)}
                    aria-label={`Present ${s.name}`}
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