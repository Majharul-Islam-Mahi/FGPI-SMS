import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { BTEB_SUBJECTS, DEPARTMENTS, SEMESTERS } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";

export const Route = createFileRoute("/subjects")({ component: SubjectsPage });

function SubjectsPage() {
  const [regulation, setRegulation] = useState<"2016" | "2022">("2022");
  const [dept, setDept] = useState("CST");
  const [sem, setSem] = useState("1");

  const subjects = BTEB_SUBJECTS[regulation]?.[dept]?.[Number(sem)] || [];

  return (
    <AppShell title="Subjects · বিষয় তালিকা">
      <div className="flex flex-wrap gap-3 mb-6 bg-card p-4 rounded-lg border shadow-sm">
        <Select value={regulation} onValueChange={(v) => setRegulation(v as "2016" | "2022")}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="2016">2016 Regulation</SelectItem>
            <SelectItem value="2022">2022 Regulation</SelectItem>
          </SelectContent>
        </Select>

        <Select value={dept} onValueChange={setDept}>
          <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
          <SelectContent>
            {DEPARTMENTS.map((d) => <SelectItem key={d.code} value={d.code}>{d.name}</SelectItem>)}
          </SelectContent>
        </Select>

        <Select value={sem} onValueChange={setSem}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            {SEMESTERS.map((s) => <SelectItem key={s} value={String(s)}>Semester {s}</SelectItem>)}
          </SelectContent>
        </Select>

        <div className="ml-auto flex items-center gap-2 text-sm">
          <Badge>{subjects.length} Subjects</Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BookOpen className="size-5 text-primary" /> {regulation} Regulation · {dept} · Semester {sem}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow><TableHead className="w-32">Subject Code</TableHead><TableHead>Subject Name</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {subjects.length === 0 && (
                <TableRow><TableCell colSpan={2} className="text-center py-6 text-muted-foreground">No subjects found</TableCell></TableRow>
              )}
              {subjects.map((s) => (
                <TableRow key={s.code}>
                  <TableCell className="font-mono text-primary font-semibold">{s.code}</TableCell>
                  <TableCell>{s.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AppShell>
  );
}