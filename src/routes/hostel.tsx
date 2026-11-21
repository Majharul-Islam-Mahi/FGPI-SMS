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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Hotel, BedDouble, Users, Building, UserCheck } from "lucide-react";

export const Route = createFileRoute("/hostel")({ component: Hostel });

const BUILDINGS = ["Boys Hostel", "Girls Hostel"];

function Hostel() {
  const { hostels, students, hostelAllocations } = useStore();
  const [building, setBuilding] = useState(BUILDINGS[0]);
  const [roomStart, setRoomStart] = useState("");
  const [roomEnd, setRoomEnd] = useState("");
  const [monthlyFee, setMonthlyFee] = useState("1500");
  const [allocStudentId, setAllocStudentId] = useState("");
  const [allocRoomId, setAllocRoomId] = useState("");

  const submitRooms = (e: React.FormEvent) => {
    e.preventDefault();
    const start = Number(roomStart);
    const end = Number(roomEnd);
    if (!start || !end || start > end) return toast.error("Invalid range");
    for (let i = start; i <= end; i++) {
      actions.addHostelRoom({ id: crypto.randomUUID(), roomNo: String(i), building, status: "Available", seatCount: 4, bookedSeats: 0, monthlyFee: Number(monthlyFee) });
    }
    setRoomStart(""); setRoomEnd("");
    toast.success(`${end - start + 1} rooms added to ${building}`);
  };

  const submitAllocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allocStudentId || !allocRoomId) return toast.error("Select student and room");
    actions.allocateHostel({
      id: crypto.randomUUID(), studentId: allocStudentId, roomId: allocRoomId,
      allocateDate: new Date().toISOString().split("T")[0],
      monthlyFee: Number(monthlyFee), paidAmount: 0, status: "active"
    });
    setAllocStudentId(""); setAllocRoomId("");
    toast.success("Student allocated to hostel");
  };

  const availableRooms = hostels.filter((h) => h.status === "Available");
  const nonAllocatedStudents = students.filter((s) => !s.isHostelStudent);

  const boysRooms = hostels.filter((h) => h.building === "Boys Hostel");
  const girlsRooms = hostels.filter((h) => h.building === "Girls Hostel");

  return (
    <AppShell title="Hostel · হোস্টেল" roles={["admin", "teacher"]}>
      {/* Stats */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-5">
            <div className="flex justify-between mb-2"><h3 className="font-bold flex items-center gap-2"><Building className="size-5 text-primary" /> Boys Hostel</h3><Badge>{boysRooms.length} Rooms</Badge></div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-green-50 rounded p-2 text-center"><div className="text-xl font-bold text-green-600">{boysRooms.filter((r) => r.status === "Available").length}</div><div className="text-xs">Available</div></div>
              <div className="bg-red-50 rounded p-2 text-center"><div className="text-xl font-bold text-red-600">{boysRooms.filter((r) => r.status === "Full").length}</div><div className="text-xs">Full</div></div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-5">
            <div className="flex justify-between mb-2"><h3 className="font-bold flex items-center gap-2"><Building className="size-5 text-primary" /> Girls Hostel</h3><Badge>{girlsRooms.length} Rooms</Badge></div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-green-50 rounded p-2 text-center"><div className="text-xl font-bold text-green-600">{girlsRooms.filter((r) => r.status === "Available").length}</div><div className="text-xs">Available</div></div>
              <div className="bg-red-50 rounded p-2 text-center"><div className="text-xl font-bold text-red-600">{girlsRooms.filter((r) => r.status === "Full").length}</div><div className="text-xs">Full</div></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Rooms */}
      <Card className="mb-6 shadow-sm">
        <CardHeader><CardTitle className="flex items-center gap-2"><Hotel className="size-5 text-primary" /> Add Rooms (Bulk)</CardTitle><CardDescription>Add multiple rooms at once.</CardDescription></CardHeader>
        <CardContent>
          <form onSubmit={submitRooms} className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <Select value={building} onValueChange={setBuilding}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{BUILDINGS.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent></Select>
            <Input placeholder="Start (101)" value={roomStart} onChange={(e) => setRoomStart(e.target.value)} required />
            <Input placeholder="End (120)" value={roomEnd} onChange={(e) => setRoomEnd(e.target.value)} required />
            <Input type="number" placeholder="Monthly Fee" value={monthlyFee} onChange={(e) => setMonthlyFee(e.target.value)} required />
            <Button type="submit">Add Range</Button>
          </form>
        </CardContent>
      </Card>

      {/* Allocate Student */}
      <Card className="mb-6 shadow-sm">
        <CardHeader><CardTitle className="flex items-center gap-2"><UserCheck className="size-5 text-primary" /> Allocate Student to Room</CardTitle><CardDescription>Assign a student to an available room.</CardDescription></CardHeader>
        <CardContent>
          <form onSubmit={submitAllocation} className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Select value={allocStudentId} onValueChange={setAllocStudentId}><SelectTrigger><SelectValue placeholder="Select Student" /></SelectTrigger><SelectContent>{nonAllocatedStudents.map((s) => <SelectItem key={s.id} value={s.id}>{s.roll} - {s.name}</SelectItem>)}</SelectContent></Select>
            <Select value={allocRoomId} onValueChange={setAllocRoomId}><SelectTrigger><SelectValue placeholder="Select Room" /></SelectTrigger><SelectContent>{availableRooms.map((r) => <SelectItem key={r.id} value={r.id}>{r.building} - Room {r.roomNo} ({r.seatCount - r.bookedSeats} seats free)</SelectItem>)}</SelectContent></Select>
            <Button type="submit">Allocate</Button>
          </form>
        </CardContent>
      </Card>

      {/* Allocations List */}
      <Card className="shadow-sm">
        <CardHeader><CardTitle>Current Allocations ({hostelAllocations.length})</CardTitle></CardHeader>
        <CardContent>
          {hostelAllocations.length === 0 ? <EmptyState icon={Users} title="No Allocations Yet" description="No students have been allocated to hostels." /> : (
            <Table>
              <TableHeader><TableRow><TableHead>Student</TableHead><TableHead>Room</TableHead><TableHead>Monthly Fee</TableHead><TableHead>Allocated</TableHead><TableHead className="text-right">Action</TableHead></TableRow></TableHeader>
              <TableBody>
                {hostelAllocations.map((a) => {
                  const st = students.find((s) => s.id === a.studentId);
                  const rm = hostels.find((h) => h.id === a.roomId);
                  return (
                    <TableRow key={a.id}>
                      <TableCell>{st?.name} ({st?.roll})</TableCell>
                      <TableCell>{rm?.building} - {rm?.roomNo}</TableCell>
                      <TableCell>BDT {a.monthlyFee}</TableCell>
                      <TableCell>{a.allocateDate}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="destructive" onClick={() => actions.vacateHostel(a.id, a.roomId, a.studentId)}>Vacate</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </AppShell>
  );
}