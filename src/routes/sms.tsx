import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { actions, useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
      <form onSubmit={submit} className="space-y-3 mb-6 bg-card p-4 rounded-lg border max-w-lg">
        <Input placeholder="Target (e.g., All Students)" value={target} onChange={e => setTarget(e.target.value)} required />
        <textarea className="w-full border p-3 rounded-md h-24 bg-transparent" placeholder="Message..." value={message} onChange={e => setMessage(e.target.value)} required />
        <Button type="submit" className="w-full">Send Alert</Button>
      </form>
      <div className="space-y-3">
        {smsAlerts.map(s => (
          <div key={s.id} className="p-4 border rounded-lg bg-card">
            <div className="text-sm font-bold text-primary">To: {s.target}</div>
            <div className="text-sm mt-1">{s.message}</div>
            <div className="text-xs text-muted-foreground mt-2">{s.date}</div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}