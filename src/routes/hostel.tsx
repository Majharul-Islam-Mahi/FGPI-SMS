import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { actions, useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Hotel, BedDouble } from "lucide-react";

export const Route = createFileRoute("/hostel")({ component: Hostel });
function Hostel() {
  const { hostels } = useStore();
  const [room, setRoom] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    actions.addHostel({ id: crypto.randomUUID(), roomNo: room, status: "Available" });
    setRoom("");
    toast.success("Room added!");
  };

  return (
    <AppShell title="Hostel · হোস্টেল">
      <Card className="mb-6 shadow-sm max-w-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Hotel className="size-5 text-primary" /> Add New Room</CardTitle>
          <CardDescription>Register a new hostel room to the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="flex gap-3">
            <Input placeholder="Room Number (e.g. 101)" value={room} onChange={e => setRoom(e.target.value)} required />
            <Button type="submit">Add Room</Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {hostels.length === 0 && <p className="col-span-full text-muted-foreground py-8">No rooms added yet.</p>}
        {hostels.map(h => (
          <Card key={h.id} className="text-center shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <BedDouble className="size-8 mx-auto text-muted-foreground mb-3" />
              <h4 className="font-bold text-lg mb-2">Room {h.roomNo}</h4>
              <Badge variant={h.status === "Available" ? "default" : "destructive"}>{h.status}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}