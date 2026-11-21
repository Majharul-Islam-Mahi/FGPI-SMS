import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Database, ShieldCheck, Download } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({ component: SettingsPage });

function SettingsPage() {
  const handleBackup = () => {
    toast.success("Database backup started (Mock)...");
  };

  return (
    <AppShell title="Settings · সেটিংস" roles={["admin"]}>
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Database className="size-5 text-primary" /> Database</CardTitle>
            <CardDescription>Manage system data and backups.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleBackup} variant="outline" className="w-full"><Download className="size-4 mr-2" /> Download Backup (CSV)</Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ShieldCheck className="size-5 text-primary" /> Security</CardTitle>
            <CardDescription>Manage access and roles.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Role-Based Access Control (RBAC) is currently enabled.</p>
            <Button variant="outline" className="w-full" disabled>Configure RLS Policies</Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}