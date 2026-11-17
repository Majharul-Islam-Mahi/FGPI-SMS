import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { EmptyState } from "@/components/EmptyState";
import { actions, useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bus, MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/transport")({ component: Transport });

function Transport() {
  const { transports } = useStore();
  const [route, setRoute] = useState("");
  const [bus, setBus] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!route || !bus) return;
    actions.addTransport({ id: crypto.randomUUID(), routeName: route, busNo: bus });
    setRoute("");
    setBus("");
    toast.success("Route added!");
  };

  return (
    <AppShell title="Transport · পরিবহন">
      <Card className="mb-6 shadow-sm max-w-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bus className="size-5 text-primary" /> Add New Route
          </CardTitle>
          <CardDescription>Register a bus route with schedule.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="flex flex-col md:flex-row gap-3">
            <Input
              placeholder="Route Name (e.g. Feni Sadar)"
              value={route}
              onChange={(e) => setRoute(e.target.value)}
              required
            />
            <Input
              placeholder="Bus No (e.g. Bus-01)"
              value={bus}
              onChange={(e) => setBus(e.target.value)}
              required
            />
            <Button type="submit">Add Route</Button>
          </form>
        </CardContent>
      </Card>
      {transports.length === 0 ? (
        <EmptyState
          icon={Bus}
          title="No Routes Available"
          description="Add bus routes to start managing transportation."
        />
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {transports.map((t) => (
            <Card
              key={t.id}
              className="shadow-sm hover:shadow-md transition-all border-l-4 border-l-primary"
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Bus className="size-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{t.routeName}</h4>
                      <p className="text-xs text-muted-foreground">{t.busNo}</p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                    Active
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-3 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="size-4 text-muted-foreground" />
                    <div>
                      <div className="text-xs text-muted-foreground">Departure</div>
                      <div className="font-semibold">08:00 AM</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="size-4 text-muted-foreground" />
                    <div>
                      <div className="text-xs text-muted-foreground">Location</div>
                      <div className="font-semibold">Feni</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </AppShell>
  );
}
