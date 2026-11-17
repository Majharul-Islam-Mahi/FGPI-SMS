import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { EmptyState } from "@/components/EmptyState";
import { actions, useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Hotel, BedDouble, Users } from "lucide-react";

export const Route = createFileRoute("/hostel")({ component: Hostel });

function Hostel() {
  const { hostels } = useStore();
  const [room, setRoom] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!room) return;
    actions.addHostel({ id: crypto.randomUUID(), roomNo: room, status: "Available" });
    setRoom("");
    toast.success("Room added!");
  };
  const available = hostels.filter((h) => h.status === "Available").length;
  const full = hostels.filter((h) => h.status === "Full").length;

  return (
    <AppShell title="Hostel · হোস্টেল">
      <div className="grid grid-cols-2 gap-4 mb-6 max-w-2xl">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <BedDouble className="size-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{available}</div>
              <div className="text-xs text-muted-foreground">Available Seats</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
              <Users className="size-6 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">{full}</div>
              <div className="text-xs text-muted-foreground">Full Rooms</div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="mb-6 shadow-sm max-w-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hotel className="size-5 text-primary" /> Add New Room
          </CardTitle>
          <CardDescription>Register a new hostel room.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="flex gap-3">
            <Input
              placeholder="Room Number (e.g. 101)"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              required
            />
            <Button type="submit">Add Room</Button>
          </form>
        </CardContent>
      </Card>
      {hostels.length === 0 ? (
        <EmptyState
          icon={Hotel}
          title="No Rooms Registered"
          description="Start by adding hostel rooms."
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {hostels.map((h) => (
            <Card
              key={h.id}
              className={`text-center shadow-sm hover:shadow-md transition-all ${h.status === "Available" ? "border-green-500/30" : "border-red-500/30"}`}
            >
              <CardContent className="p-6">
                <BedDouble
                  className={`size-10 mx-auto mb-3 ${h.status === "Available" ? "text-green-600" : "text-red-500"}`}
                />
                <h4 className="font-bold text-lg mb-3">Room {h.roomNo}</h4>
                <div className="flex items-center justify-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${h.status === "Available" ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]" : "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]"}`}
                  />
                  <span
                    className={`text-sm font-semibold ${h.status === "Available" ? "text-green-600" : "text-red-500"}`}
                  >
                    {h.status === "Available" ? "Seat Available" : "Room Full"}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </AppShell>
  );
}
