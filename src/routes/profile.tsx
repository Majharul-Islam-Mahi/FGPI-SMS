import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Shield, Calendar } from "lucide-react";

export const Route = createFileRoute("/profile")({ component: ProfilePage });

function ProfilePage() {
  const { session, students } = useStore();
  const me = students.find(s => s.id === session?.studentId);

  return (
    <AppShell title="My Profile · আমার প্রোফাইল">
      <div className="max-w-2xl">
        <Card className="shadow-sm border-t-4 border-t-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl"><User className="size-6 text-primary" /> Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-3xl font-bold text-primary">
                {session?.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold">{session?.name}</h2>
                <p className="text-sm text-muted-foreground capitalize flex items-center gap-1"><Shield className="size-3" /> {session?.role} Account</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div><span className="text-xs text-muted-foreground">Username/ID</span><p className="font-semibold">{me?.roll || session?.name}</p></div>
              <div><span className="text-xs text-muted-foreground">Department</span><p className="font-semibold">{me?.department || "N/A"}</p></div>
              <div><span className="text-xs text-muted-foreground">Phone</span><p className="font-semibold">{me?.phone || "N/A"}</p></div>
              <div><span className="text-xs text-muted-foreground">Session</span><p className="font-semibold">{me?.session || "N/A"}</p></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}