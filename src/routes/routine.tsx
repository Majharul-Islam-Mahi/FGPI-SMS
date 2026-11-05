import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { actions, DEPARTMENTS, useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/routine")({
  component: Routine,
});

function Routine() {
  const { routines, session, students } = useStore();
  const [day, setDay] = useState("Sunday");
  const [time, setTime] = useState("10:00 AM");
  const [subject, setSubject] = useState("");
  const [room, setRoom] = useState("");
  
  const isAdmin = session?.role === "admin" || session?.role === "teacher";
  const myDept = session?.role === "student" ? students.find(s => s.id === session.studentId)?.department : null;
  
  // ফিল্টারিং
  const filteredRoutines = session?.role === "student" 
    ? routines.filter(r => r.department === myDept)
    : routines;

  const addRoutine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !room) return;
    actions.addRoutine({ 
      id: `r${Date.now()}`, department: myDept || "CST", semester: 1, 
      day, time, subject, teacher: session?.name || "Teacher", room 
    });
    setSubject(""); setRoom("");
    toast.success("Routine added!");
  };

  return (
    <AppShell title="Class Routine · ক্লাস রুটিন">
      {isAdmin && (
        <form onSubmit={addRoutine} className="flex gap-2 mb-6">
          <Select value={day} onValueChange={setDay}>
            <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
            <SelectContent>
              {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"].map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
          <Input placeholder="Time (e.g. 10:00 AM)" value={time} onChange={e => setTime(e.target.value)} className="w-32" />
          <Input placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} className="w-48" />
          <Input placeholder="Room No" value={room} onChange={e => setRoom(e.target.value)} className="w-32" />
          <Button type="submit">Add</Button>
        </form>
      )}

      <div className="bg-card border rounded-lg p-6">
        {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"].map(d => (
          <div key={d} className="mb-6">
            <h3 className="font-bold text-lg text-primary mb-3 border-b pb-2">{d}</h3>
            <div className="space-y-2">
              {filteredRoutines.filter(r => r.day === d).length === 0 ? <p className="text-sm text-muted-foreground">No classes</p> : 
                filteredRoutines.filter(r => r.day === d).map(r => (
                  <div key={r.id} className="flex justify-between items-center bg-muted/30 p-3 rounded-md text-sm">
                    <span className="font-semibold text-gold">{r.time}</span>
                    <span>{r.subject}</span>
                    <span>{r.room}</span>
                  </div>
                ))
              }
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}