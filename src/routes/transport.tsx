import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { actions, useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/transport")({ component: Transport });
function Transport() {
  const { transports } = useStore();
  const [route, setRoute] = useState("");
  const [bus, setBus] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    actions.addTransport({ id: crypto.randomUUID(), routeName: route, busNo: bus });
    setRoute(""); setBus("");
    toast.success("Route added!");
  };

  return (
    <AppShell title="Transport · পরিবহন">
      <form onSubmit={submit} className="flex gap-3 mb-6 bg-card p-4 rounded-lg border max-w-lg">
        <Input placeholder="Route Name" value={route} onChange={e => setRoute(e.target.value)} required />
        <Input placeholder="Bus No" value={bus} onChange={e => setBus(e.target.value)} required />
        <Button type="submit">Add</Button>
      </form>
      <div className="space-y-3">
        {transports.map(t => (
          <div key={t.id} className="p-4 border rounded-lg flex justify-between items-center bg-card">
            <span>{t.routeName}</span><Badge>{t.busNo}</Badge>
          </div>
        ))}
      </div>
    </AppShell>
  );
}