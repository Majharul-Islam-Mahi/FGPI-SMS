import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { actions, useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

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
      <form onSubmit={submit} className="flex gap-3 mb-6 bg-card p-4 rounded-lg border max-w-sm">
        <Input placeholder="Room Number (e.g. 101)" value={room} onChange={e => setRoom(e.target.value)} required />
        <Button type="submit">Add Room</Button>
      </form>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {hostels.map(h => (
          <div key={h.id} className="p-4 border rounded-lg text-center bg-card">
            <h4 className="font-bold">Room {h.roomNo}</h4>
            <Badge variant={h.status === "Available" ? "default" : "destructive"}>{h.status}</Badge>
          </div>
        ))}
      </div>
    </AppShell>
  );
}}