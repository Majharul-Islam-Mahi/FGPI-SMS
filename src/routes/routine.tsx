import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { actions, DEPARTMENTS, SEMESTERS, useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/routine")({
  component: Routine,
});

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
const SHIFTS = ["Shift 1 (8 AM - 1 PM)", "Shift 2 (2 PM - 6 PM)"];

function Routine() {
  const { routines, session, students } = useStore();
  const [dept, setDept] = useState("CST");
  const [sem, setSem] = useState("1");
  const [shift, setShift] = useState(SHIFTS[0]);
  const [day, setDay] = useState("Sunday");
  const [time, setTime] = useState("08:00 AM");
  const [subject, setSubject] = useState("");
  const [room, setRoom] = useState("");
  
  const isAdmin = session?.role === "admin" || session?.role === "teacher";
  const me = session?.role === "student" ? students.find(s => s.id === session.studentId) : null;

  // স্টুডেন্ট হলে তার ডিপার্টমেন্ট ও সেমিস্টার অনুযায়ী ফিল্টার হবে
  const filteredRoutines = session?.role === "student" && me
    ? routines.filter(r => r.department === me.department && r.semester === me.semester)
    : routines.filter(r => r.department === dept && r.semester === Number(sem));

  const addRoutine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !room) return toast.error("Subject and Room required!");
    
    actions.addRoutine({ 
      id: `r${Date.now()}`, 
      department: dept, 
      semester: Number(sem), 
      shift, 
      day, 
      time, 
      subject, 
      teacher: session?.name || "Teacher", 
      room 
    });
    setSubject(""); setRoom("");
    toast.success("Routine added!");
  };

  return (
    <AppShell title="Class Routine · ক্লাস রুটিন">
      {isAdmin && (
        <div className="bg-card border p-4 rounded-lg shadow-sm mb-6">
          <h3 className="font-bold mb-3 text-primary">Add New Class</h3>
          <form onSubmit={addRoutine} className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Select value={dept} onValueChange={setDept}>
              <SelectTrigger><SelectValue placeholder="Dept" /></SelectTrigger>
              <SelectContent>
                {DEPARTMENTS.map(d => <SelectItem key={d.code} value={d.code}>{d.code}</SelectItem>)}
              </SelectContent>
            </Select>

            <Select value={sem} onValueChange={setSem}>
              <SelectTrigger><SelectValue placeholder="Semester" /></SelectTrigger>
              <SelectContent>
                {SEMESTERS.map(s => <SelectItem key={s} value={String(s)}>Semester {s}</SelectItem>)}
              </SelectContent>
            </Select>

            <Select value={shift} onValueChange={setShift}>
              <SelectTrigger><SelectValue placeholder="Shift" /></SelectTrigger>
              <SelectContent>
                {SHIFTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>

            <Select value={day} onValueChange={setDay}>
              <SelectTrigger><SelectValue placeholder="Day" /></SelectTrigger>
              <SelectContent>
                {DAYS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>

            <Input placeholder="Time (e.g. 10:00 AM)" value={time} onChange={e => setTime(e.target.value)} />
            <Input placeholder="Subject Name" value={subject} onChange={e => setSubject(e.target.value)} />
            <Input placeholder="Room No (e.g. 302)" value={room} onChange={e => setRoom(e.target.value)} />
            <Button type="submit" className="w-full">Add Class</Button>
          </form>
        </div>
      )}

      {/* রুটিন ডিসপ্লে */}
      <div className="bg-card border rounded-lg p-6 shadow-sm">
        {DAYS.map(d => {
          const dayClasses = filteredRoutines.filter(r => r.day === d);
          return (
            <div key={d} className="mb-8 last:mb-0">
              <h3 className="font-bold text-lg text-primary mb-3 border-b pb-2">{d}</h3>
              {dayClasses.length === 0 ? (
                <p className="text-sm text-muted-foreground italic">No classes scheduled</p>
              ) : (
                <div className="space-y-3">
                  {dayClasses.map(r => (
                    <div key={r.id} className="flex flex-wrap justify-between items-center bg-muted/30 p-3 rounded-md text-sm border border-border/50">
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="font-mono">{r.time}</Badge>
                        <span className="font-semibold">{r.subject}</span>
                      </div>
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <span>{r.teacher}</span>
                        <Badge variant="outline">Room: {r.room}</Badge>
                        <Badge className="bg-gold text-black">{r.shift}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}