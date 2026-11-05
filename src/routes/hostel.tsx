import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/hostel")({ component: Hostel });
function Hostel() {
  return (
    <AppShell title="Hostel · হোস্টেল">
      <Card>
        <CardHeader><CardTitle>Hostel Rooms</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg text-center"><h4 className="font-bold">Room 101</h4><Badge>Available</Badge></div>
            <div className="p-4 border rounded-lg text-center"><h4 className="font-bold">Room 102</h4><Badge variant="destructive">Full</Badge></div>
            <div className="p-4 border rounded-lg text-center"><h4 className="font-bold">Room 103</h4><Badge>Available</Badge></div>
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
}