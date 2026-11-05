import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/sms")({ component: Sms });
function Sms() {
  return (
    <AppShell title="SMS Alerts · এসএমএস">
      <Card className="max-w-lg">
        <CardHeader><CardTitle>Send SMS Alert</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Target (e.g., All Students)" />
          <textarea className="w-full border p-3 rounded-md h-24" placeholder="Type your message here..." />
          <Button>Send SMS</Button>
        </CardContent>
      </Card>
    </AppShell>
  );
}