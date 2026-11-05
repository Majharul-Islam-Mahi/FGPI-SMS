import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admission')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admission"!</div>
}
import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admission")({ component: Admission });
function Admission() {
  return (
    <AppShell title="Admission · ভর্তি">
      <Card className="max-w-lg">
        <CardHeader><CardTitle>Admission Application</CardTitle><CardDescription>Online application for new students.</CardDescription></CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Applicant Name" />
          <Input placeholder="Email Address" />
          <Input placeholder="Previous GPA" />
          <Button className="w-full">Submit Application</Button>
        </CardContent>
      </Card>
    </AppShell>
  );
}