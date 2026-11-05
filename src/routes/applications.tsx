import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { actions, useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/applications")({
  component: Applications,
});

function Applications() {
  const { applications, session, students } = useStore();
  const [type, setType] = useState("Sick Leave");
  const [reason, setReason] = useState("");
  
  const isStudent = session?.role === "student";
  const myApps = isStudent ? applications.filter(a => a.studentId === session.studentId) : applications;
  const me = isStudent ? students.find(s => s.id === session.studentId) : null;

  const submitApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason || !me) return;
    actions.addApplication({ 
      id: `a${Date.now()}`, studentId: me.id, type, reason, 
      status: "pending", date: new Date().toISOString().split("T")[0] 
    });
    setReason("");
    toast.success("Application submitted!");
  };

  return (
    <AppShell title="Applications · আবেদন">
      {isStudent && (
        <form onSubmit={submitApp} className="flex gap-2 mb-6">
          <Input placeholder="Type (e.g. Sick Leave)" value={type} onChange={e => setType(e.target.value)} className="w-48" />
          <Input placeholder="Reason" value={reason} onChange={e => setReason(e.target.value)} className="flex-1" />
          <Button type="submit">Submit</Button>
        </form>
      )}

      <div className="space-y-4">
        {myApps.map(a => (
          <div key={a.id} className="bg-card border p-4 rounded-lg flex justify-between items-center shadow-sm">
            <div>
              <div className="font-bold">{a.type}</div>
              <div className="text-sm text-muted-foreground">{a.reason}</div>
              <div className="text-xs text-muted-foreground mt-1">{a.date}</div>
            </div>
            <div className="flex gap-2 items-center">
              <Badge variant={a.status === "approved" ? "default" : a.status === "rejected" ? "destructive" : "secondary"}>
                {a.status.toUpperCase()}
              </Badge>
              {!isStudent && a.status === "pending" && (
                <>
                  <Button size="sm" onClick={() => { actions.updateApplicationStatus(a.id, "approved"); toast.success("Approved!"); }}>Approve</Button>
                  <Button size="sm" variant="destructive" onClick={() => { actions.updateApplicationStatus(a.id, "rejected"); toast.error("Rejected!"); }}>Reject</Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}