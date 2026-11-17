import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { EmptyState } from "@/components/EmptyState";
import { actions, useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileQuestion } from "lucide-react";

export const Route = createFileRoute("/applications")({ component: Applications });

function Applications() {
  const { applications, session, students } = useStore();
  const [type, setType] = useState("Sick Leave");
  const [reason, setReason] = useState("");
  const isStudent = session?.role === "student";
  const me = isStudent ? students.find((s) => s.id === session.studentId) : null;
  const myApps = isStudent
    ? applications.filter((a) => a.studentId === session.studentId)
    : applications;

  const submitApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason || !me) {
      toast.error("Please write a reason!");
      return;
    }
    actions.addApplication({
      id: crypto.randomUUID(),
      studentId: me.id,
      type,
      reason,
      status: "pending",
      date: new Date().toISOString().slice(0, 10),
    });
    setReason("");
    toast.success("Application submitted!");
  };

  return (
    <AppShell title="Applications · আবেদন">
      {isStudent && (
        <div className="bg-card border p-5 rounded-lg shadow-sm mb-6">
          <h3 className="font-bold mb-3 text-primary">Submit New Application</h3>
          <form onSubmit={submitApp} className="flex flex-col md:flex-row gap-3">
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                <SelectItem value="Personal Leave">Personal Leave</SelectItem>
                <SelectItem value="Transcript Request">Transcript Request</SelectItem>
                <SelectItem value="Certificate Request">Certificate Request</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Write your reason here..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="flex-1"
              required
            />
            <Button type="submit">Submit</Button>
          </form>
        </div>
      )}
      {myApps.length === 0 ? (
        <EmptyState
          icon={FileQuestion}
          title="No Applications Found"
          description="Any requests will appear here."
        />
      ) : (
        <div className="space-y-4">
          {myApps.map((a) => (
            <div
              key={a.id}
              className="bg-card border p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm"
            >
              <div>
                <div className="font-bold text-lg">{a.type}</div>
                <div className="text-sm text-gray-600 mt-1">{a.reason}</div>
                <div className="text-xs text-muted-foreground mt-2">Date: {a.date}</div>
              </div>
              <div className="flex gap-2 items-center">
                <Badge
                  variant={
                    a.status === "approved"
                      ? "default"
                      : a.status === "rejected"
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {a.status.toUpperCase()}
                </Badge>
                {!isStudent && a.status === "pending" && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => {
                        actions.updateApplicationStatus(a.id, "approved");
                        toast.success("Approved!");
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        actions.updateApplicationStatus(a.id, "rejected");
                        toast.error("Rejected!");
                      }}
                    >
                      Reject
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </AppShell>
  );
}
