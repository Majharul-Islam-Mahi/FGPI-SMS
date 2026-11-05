import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { actions, useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MessageSquare, Send, Bell } from "lucide-react";

export const Route = createFileRoute("/sms")({ component: Sms });
function Sms() {
  const { smsAlerts } = useStore();
  const [target, setTarget] = useState("All Students");
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    actions.addSms({ id: crypto.randomUUID(), target, message, date: new Date().toLocaleString() });
    setMessage("");
    toast.success("SMS Sent!");
  };

  return (
    <AppShell title="SMS Alerts · এসএমএস">
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-sm h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Send className="size-5 text-primary" /> Compose Alert</CardTitle>
            <CardDescription>Send instant messages to students or guardians.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              <Input placeholder="Target (e.g., All Students)" value={target} onChange={e => setTarget(e.target.value)} required />
              <textarea className="w-full border border-input p-3 rounded-md h-32 bg-transparent text-sm focus:ring-1 focus:ring-primary outline-none" placeholder="Type your message here..." value={message} onChange={e => setMessage(e.target.value)} required />
              <Button type="submit" className="w-full">Send Alert</Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h3 className="font-bold text-lg flex items-center gap-2"><Bell className="size-5" /> Message History</h3>
          {smsAlerts.length === 0 && <p className="text-muted-foreground">No messages sent yet.</p>}
          {smsAlerts.map(s => (
            <Card key={s.id} className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm font-bold text-primary flex items-center gap-2"><MessageSquare className="size-4"/> To: {s.target}</div>
                  <div className="text-xs text-muted-foreground">{s.date}</div>
                </div>
                <p className="text-sm mt-2">{s.message}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}