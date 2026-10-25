import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { actions, gradeFor, useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "Results — FGPI SMS" },
      { name: "description", content: "Subject marks, grades and GPA for each student." },
      { property: "og:title", content: "Results — FGPI SMS" },
      { property: "og:description", content: "ফলাফল, গ্রেড ও জিপিএ" },
    ],
  }),
  component: Results,
});

function Results() {
  const { students, results, session } = useStore();
  const isStudent = session?.role === "student";
  const [sid, setSid] = useState("");
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");

  const current = isStudent ? session?.studentId ?? "" : sid || students[0]?.id || "";
  const st = students.find((s) => s.id === current);
  const rows = results.filter((r) => r.studentId === current);
  const gpa = rows.length ? rows.reduce((a, r) => a + gradeFor(r.marks).gp, 0) / rows.length : 0;

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    const m = Number(marks);
    if (!st || !subject || isNaN(m) || m < 0 || m > 100) {
      toast.error("Marks must be 0–100");
      return;
    }
    actions.addResult({
      id: `r${Date.now()}`,
      studentId: st.id,
      subject,
      semester: st.semester,
      marks: m,
    });
    setSubject("");
    setMarks("");
    toast.success("Result added");
  };

  return (
    <AppShell title="Results · ফলাফল">
      {!isStudent && (
        <Select value={current} onValueChange={setSid}>
          <SelectTrigger className="w-80 mb-4"><SelectValue placeholder="Select student" /></SelectTrigger>
          <SelectContent>
            {students.map((s) => (
              <SelectItem key={s.id} value={s.id}>{s.roll} — {s.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {st && (
        <div className="rounded-lg bg-card border shadow-card p-5 mb-4 flex flex-wrap justify-between gap-4 card-premium">
          <div>
            <div className="font-display text-xl font-bold">{st.name}</div>
            <div className="text-sm text-muted-foreground">
              Roll {st.roll} · {st.department} · Semester {st.semester}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">GPA</div>
            <div className="text-3xl font-display font-bold text-primary">{gpa.toFixed(2)}</div>
          </div>
        </div>
      )}

      <div className="rounded-lg border bg-card shadow-card card-premium">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>Marks</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>GP</TableHead>
              {!isStudent && <TableHead />}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => {
              const g = gradeFor(r.marks);
              return (
                <TableRow key={r.id}>
                  <TableCell>{r.subject}</TableCell>
                  <TableCell>{r.marks}</TableCell>
                  <TableCell>
                    <Badge variant={g.grade === "F" ? "destructive" : "secondary"}>{g.grade}</Badge>
                  </TableCell>
                  <TableCell>{g.gp.toFixed(2)}</TableCell>
                  {!isStudent && (
                    <TableCell className="text-right">
                      <Button size="icon" variant="ghost" aria-label="Delete" onClick={() => actions.deleteResult(r.id)}>
                        <Trash2 className="size-4 text-destructive" />
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
            {!rows.length && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">কোনো ফলাফল নেই</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {!isStudent && st && (
        <form onSubmit={add} className="flex flex-wrap gap-3 mt-4">
          <Input placeholder="Subject · বিষয়" value={subject} onChange={(e) => setSubject(e.target.value)} className="w-60" />
          <Input placeholder="Marks (0-100)" type="number" value={marks} onChange={(e) => setMarks(e.target.value)} className="w-40" />
          <Button type="submit">Add result</Button>
        </form>
      )}
    </AppShell>
  );
}