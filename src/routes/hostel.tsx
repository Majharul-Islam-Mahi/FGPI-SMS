import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { EmptyState } from "@/components/EmptyState";
import { actions, useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Hotel, BedDouble, Users, Building } from "lucide-react";

export const Route = createFileRoute("/hostel")({ component: Hostel });

const BUILDINGS = ["Boys Hostel", "Girls Hostel"];

function Hostel() {
  const { hostels } = useStore();
  const [building, setBuilding] = useState(BUILDINGS[0]);
  const [roomStart, setRoomStart] = useState("");
  const [roomEnd, setRoomEnd] = useState("");
  const [seatCount, setSeatCount] = useState("4");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomStart || !roomEnd) return toast.error("Room start & end required");
    const start = Number(roomStart);
    const end = Number(roomEnd);
    if (start > end) return toast.error("Start must be less than End");
    
    for (let i = start; i <= end; i++) {
      actions.addHostel({ 
        id: crypto.randomUUID(), 
        roomNo: String(i), 
        status: "Available",
        seatCount: Number(seatCount),
        bookedSeats: 0,
        building
      } as any);
    }
    setRoomStart(""); setRoomEnd("");
    toast.success(`${end - start + 1} rooms added to ${building}!`);
  };

  const boysRooms = hostels.filter((h: any) => (h.building || "Boys Hostel") === "Boys Hostel");
  const girlsRooms = hostels.filter((h: any) => h.building === "Girls Hostel");

  const Stats = ({ rooms, label }: { rooms: any[]; label: string }) => {
    const available = rooms.filter(r => r.status === "Available").length;
    const full = rooms.filter(r => r.status === "Full").length;
    return (
      <Card className="border-l-4 border-l-primary">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Building className="size-5 text-primary" />
              <h3 className="font-bold text-lg">{label}</h3>
            </div>
            <Badge variant="outline">{rooms.length} Rooms</Badge>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-green-50 rounded p-2 text-center">
              <div className="text-xl font-bold text-green-600">{available}</div>
              <div className="text-xs text-green-700">Available</div>
            </div>
            <div className="bg-red-50 rounded p-2 text-center">
              <div className="text-xl font-bold text-red-600">{full}</div>
              <div className="text-xs text-red-700">Full</div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <AppShell title="Hostel · হোস্টেল">
      {/* Building Overview */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <Stats rooms={boysRooms} label="Boys Hostel" />
        <Stats rooms={girlsRooms} label="Girls Hostel" />
      </div>

      {/* Add Rooms Form */}
      <Card className="mb-6 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hotel className="size-5 text-primary" /> Add Rooms (Bulk)
          </CardTitle>
          <CardDescription>Add multiple rooms at once by specifying start & end room numbers.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <Select value={building} onValueChange={setBuilding}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{BUILDINGS.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
            </Select>
            <Input placeholder="Start Room (101)" value={roomStart} onChange={e => setRoomStart(e.target.value)} required />
            <Input placeholder="End Room (120)" value={roomEnd} onChange={e => setRoomEnd(e.target.value)} required />
            <Input type="number" placeholder="Seats/Room" value={seatCount} onChange={e => setSeatCount(e.target.value)} required />
            <Button type="submit">Add Range</Button>
          </form>
        </CardContent>
      </Card>

      {/* Boys Hostel Rooms */}
      {boysRooms.length > 0 && (
        <div className="mb-8">
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            <Building className="size-5 text-primary" /> Boys Hostel — Rooms
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {boysRooms.sort((a: any, b: any) => Number(a.roomNo) - Number(b.roomNo)).map((h: any) => (
              <Card key={h.id} className={`text-center shadow-sm ${h.status === "Available" ? "border-green-500/30" : "border-red-500/30"}`}>
                <CardContent className="p-3">
                  <BedDouble className={`size-6 mx-auto mb-1 ${h.status === "Available" ? "text-green-600" : "text-red-500"}`} />
                  <div className="font-bold text-sm">{h.roomNo}</div>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <span className={`w-2 h-2 rounded-full ${h.status === "Available" ? "bg-green-500" : "bg-red-500"}`} />
                    <span className="text-xs">{h.bookedSeats || 0}/{h.seatCount || 4}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Girls Hostel Rooms */}
      {girlsRooms.length > 0 && (
        <div>
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            <Building className="size-5 text-primary" /> Girls Hostel — Rooms
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {girlsRooms.sort((a: any, b: any) => Number(a.roomNo) - Number(b.roomNo)).map((h: any) => (
              <Card key={h.id} className={`text-center shadow-sm ${h.status === "Available" ? "border-green-500/30" : "border-red-500/30"}`}>
                <CardContent className="p-3">
                  <BedDouble className={`size-6 mx-auto mb-1 ${h.status === "Available" ? "text-green-600" : "text-red-500"}`} />
                  <div className="font-bold text-sm">{h.roomNo}</div>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <span className={`w-2 h-2 rounded-full ${h.status === "Available" ? "bg-green-500" : "bg-red-500"}`} />
                    <span className="text-xs">{h.bookedSeats || 0}/{h.seatCount || 4}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {hostels.length === 0 && (
        <EmptyState icon={Hotel} title="No Rooms Registered" description="Start by adding rooms using the form above." />
      )}
    </AppShell>
  );
}