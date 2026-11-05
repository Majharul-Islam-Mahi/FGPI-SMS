import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { actions, useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bus } from "lucide-react";

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
      <Card className="mb-6 shadow-sm max-w-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bus className="size-5 text-primary" /> Add Route</CardTitle>
          <CardDescription>Register a new bus route.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="flex flex-col md:flex-row gap-3">
            <Input placeholder="Route Name" value={route} onChange={e => setRoute(e.target.value)} required />
            <Input placeholder="Bus No" value={bus} onChange={e => setBus(e.target.value)} required />
            <Button type="submit">Add Route</Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {transports.length === 0 && <p className="text-muted-foreground">No routes added yet.</p>}
        {transports.map(t => (
          <Card key={t.id} className="shadow-sm flex items-center p-4">
            <Bus className="size-8 text-muted-foreground mr-4" />
            <div className="flex-1">
              <h4 className="font-bold text-lg">{t.routeName}</h4>
              <p className="text-sm text-muted-foreground">Bus Number: {t.busNo}</p>
            </div>
            <Badge className="bg-primary text-primary-foreground">Active</Badge>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}