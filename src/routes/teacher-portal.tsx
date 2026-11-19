import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useStore, actions } from "@/lib/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { CalendarClock, ClipboardCheck, PenTool, BarChart3 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/teacher-portal")({ component: TeacherPortal });

function TeacherPortal() {
  const { session, students, routines, attendance, results } = useStore();
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  // মক ডেটা (BTEB রেজাল্ট)
  const btebAnalysis = { total: 50, pass: 42, fail: 8, aPlus: 5, a: 12 };

  return (
    <AppShell title="Teacher Portal · শিক্ষক পোর্টাল" roles={["teacher", "admin"]}>
      <Tabs defaultValue="routine">
        <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent mb-6">
          <TabsTrigger value="routine"><CalendarClock className="size-4 mr-2"/> Today's Routine</TabsTrigger>
          <TabsTrigger value="attendance"><ClipboardCheck className="size-4 mr-2"/> Take Attendance</TabsTrigger>
          <TabsTrigger value="marks"><PenTool className="size-4 mr-2"/> Add Marks</TabsTrigger>
          <TabsTrigger value="bteb"><BarChart3 className="size-4 mr-2"/> BTEB Result Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="routine">
          <Card>
            <CardHeader><CardTitle>My Classes for Today</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {routines.map(r => (
                  <div key={r.id} className="flex justify-between items-center p-4 border rounded-lg bg-card shadow-sm border-l-4 border-l-primary">
                    <div>
                      <p className="font-bold">{r.subject}</p>
                      <p className="text-sm text-muted-foreground">Dept: {r.department} | Sem: {r.semester} | Room: {r.room}</p>
                    </div>
                    <Badge className="text-lg">{r.time}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance">
          <Card>
            <CardHeader><CardTitle>Attendance Sheet - {selectedSubject} ({date})</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Roll</TableHead><TableHead>Name</TableHead><TableHead className="text-right">Present?</TableHead></TableRow></TableHeader>
                <TableBody>
                  {students.map(s => {
                    const isPresent = attendance.find(a => a.date === date && a.studentId === s.id && a.subject === selectedSubject)?.present ?? false;
                    return (
                      <TableRow key={s.id}>
                        <TableCell>{s.roll}</TableCell>
                        <TableCell>{s.name}</TableCell>
                        <TableCell className="text-right">
                          <Switch checked={isPresent} onCheckedChange={(v) => actions.setAttendance(date, s.id, selectedSubject, v)} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marks">
          <Card>
            <CardHeader><CardTitle>Add Practical & Mid-term Marks</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">This section allows teachers to input subject-wise marks.</p>
              {/* Mock UI for marks entry */}
              <div className="border p-4 rounded-lg bg-muted/20 space-y-4">
                 <div className="grid grid-cols-3 gap-4">
                   <div className="space-y-1"><label className="text-xs">Subject</label><input className="w-full p-2 border rounded" value={selectedSubject} readOnly /></div>
                   <div className="space-y-1"><label className="text-xs">Student Roll</label><input className="w-full p-2 border rounded" placeholder="510100" /></div>
                   <div className="space-y-1"><label className="text-xs">Marks (Mid/Practical)</label><input className="w-full p-2 border rounded" placeholder="25" /></div>
                 </div>
                 <Button>Save Marks</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bteb">
          <Card>
            <CardHeader><CardTitle>BTEB Result Published - {selectedSubject}</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="p-4 border rounded-lg text-center bg-primary/5"><p className="text-xs text-muted-foreground">Total</p><p className="text-2xl font-bold">{btebAnalysis.total}</p></div>
                <div className="p-4 border rounded-lg text-center bg-green-50"><p className="text-xs text-green-600">Pass</p><p className="text-2xl font-bold text-green-600">{btebAnalysis.pass}</p></div>
                <div className="p-4 border rounded-lg text-center bg-red-50"><p className="text-xs text-red-600">Fail</p><p className="text-2xl font-bold text-red-600">{btebAnalysis.fail}</p></div>
                <div className="p-4 border rounded-lg text-center bg-gold/10"><p className="text-xs text-gold">A+</p><p className="text-2xl font-bold text-gold">{btebAnalysis.aPlus}</p></div>
              </div>
              <p className="text-sm text-center text-muted-foreground">Result data auto-synced from BTEB portal based on Roll numbers.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}