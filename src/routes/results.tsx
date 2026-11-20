import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { actions, BTEB_SUBJECTS, gradeFor, useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const Route = createFileRoute("/results")({ component: Results });

function Results() {
  const { students, results, session } = useStore();
  const isStudent = session?.role === "student";
  const [sid, setSid] = useState("");
  const [subject, setSubject] = useState("");
  const [midMarks, setMidMarks] = useState("");
  const [practicalMarks, setPracticalMarks] = useState("");
  const [finalMarks, setFinalMarks] = useState("");

  const current = isStudent ? session?.studentId ?? "" : sid || students[0]?.id || "";
  const st = students.find((s) => s.id === current);
  const rows = results.filter((r) => r.studentId === current);
  const gpa = rows.length ? rows.reduce((a, r) => a + gradeFor(r.marks).gp, 0) / rows.length : 0;

  // স্টুডেন্ট সিলেক্ট হলে সাবজেক্ট লিস্ট লোড হবে
  const availableSubjects = st ? (BTEB_SUBJECTS["2022"][st.department]?.[st.semester] || []) : [];

  useEffect(() => {
    if (availableSubjects.length > 0 && !subject) {
      setSubject(availableSubjects[0].name);
    }
  }, [st?.id, availableSubjects.length]);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    const mid = Number(midMarks) || 0;
    const prac = Number(practicalMarks) || 0;
    const fin = Number(finalMarks) || 0;
    const total = mid + prac + fin;
    if (!st || !subject || total < 0 || total > 100) return toast.error("Invalid marks");
    actions.addResult({ 
      id: `r${Date.now()}`, studentId: st.id, subject, semester: st.semester, marks: total,
      mid_term_marks: mid, practical_marks: prac, final_marks: fin 
    });
    setMidMarks(""); setPracticalMarks(""); setFinalMarks("");
    toast.success("Result added");
  };

  return (
    <AppShell title="Results · ফলাফল">
      {!isStudent && (
        <Select value={current} onValueChange={setSid}>
          <SelectTrigger className="w-80 mb-4"><SelectValue placeholder="Select student" /></SelectTrigger>
          <SelectContent>{students.map((s) => <SelectItem key={s.id} value={s.id}>{s.roll} — {s.name}</SelectItem>)}</SelectContent>
        </Select>
      )}
      {st && (
        <div className="rounded-lg bg-card border shadow-card p-5 mb-4 flex flex-wrap justify-between gap-4 card-premium">
          <div>
            <div className="font-display text-xl font-bold">{st.name}</div>
            <div className="text-sm text-muted-foreground">Roll {st.roll} · {st.department} · Sem {st.semester}</div>
          </div>
          <div className="text-right"><div className="text-sm text-muted-foreground">GPA</div><div className="text-3xl font-display font-bold text-primary">{gpa.toFixed(2)}</div></div>
        </div>
      )}
      <div className="rounded-lg border bg-card shadow-card card-premium">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead><TableHead>Mid</TableHead><TableHead>Practical</TableHead>
              <TableHead>Final</TableHead><TableHead>Total</TableHead><TableHead>Grade</TableHead><TableHead>GP</TableHead>
              {!isStudent && <TableHead />}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => {
              const g = gradeFor(r.marks);
              return (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.subject}</TableCell>
                  <TableCell>{r.mid_term_marks ?? "-"}</TableCell>
                  <TableCell>{r.practical_marks ?? "-"}</TableCell>
                  <TableCell>{r.final_marks ?? "-"}</TableCell>
                  <TableCell className="font-bold">{r.marks}</TableCell>
                  <TableCell><Badge variant={g.grade === "F" ? "destructive" : "secondary"}>{g.grade}</Badge></TableCell>
                  <TableCell>{g.gp.toFixed(2)}</TableCell>
                  {!isStudent && <TableCell className="text-right"><Button size="icon" variant="ghost" onClick={() => actions.deleteResult(r.id)}><Trash2 className="size-4 text-destructive" /></Button></TableCell>}
                </TableRow>
              );
            })}
            {!rows.length && <TableRow><TableCell colSpan={8} className="text-center py-6 text-muted-foreground">No results found.</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>
      {!isStudent && st && availableSubjects.length > 0 && (
        <form onSubmit={add} className="flex flex-wrap gap-3 mt-4 items-end bg-card p-4 rounded-lg border shadow-sm">
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Subject</label>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger className="w-72"><SelectValue /></SelectTrigger>
              <SelectContent>{availableSubjects.map(s => <SelectItem key={s.code} value={s.name}>{s.code} - {s.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div><label className="text-xs text-muted-foreground block mb-1">Mid Term</label><Input type="number" value={midMarks} onChange={e => setMidMarks(e.target.value)} className="w-24" placeholder="20" /></div>
          <div><label className="text-xs text-muted-foreground block mb-1">Practical</label><Input type="number" value={practicalMarks} onChange={e => setPracticalMarks(e.target.value)} className="w-24" placeholder="25" /></div>
          <div><label className="text-xs text-muted-foreground block mb-1">Final</label><Input type="number" value={finalMarks} onChange={e => setFinalMarks(e.target.value)} className="w-24" placeholder="50" /></div>
          <Button type="submit">Add Result</Button>
        </form>
      )}
    </AppShell>
  );
}