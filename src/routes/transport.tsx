import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/transport")({ component: Transport });
function Transport() {
  return (
    <AppShell title="Transport · পরিবহন">
      <Card>
        <CardHeader><CardTitle>Bus Routes</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 border rounded flex justify-between items-center"><span>Route A (Feni Sadar)</span><Badge>Bus 1</Badge></div>
          <div className="p-3 border rounded flex justify-between items-center"><span>Route B (Chhagalnaiya)</span><Badge>Bus 2</Badge></div>
        </CardContent>
      </Card>
    </AppShell>
  );
}