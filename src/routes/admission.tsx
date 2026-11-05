import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { actions, useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UserPlus } from "lucide-react";

export const Route = createFileRoute("/admission")({ component: Admission });
function Admission() {
  const { admissions } = useStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gpa, setGpa] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    actions.addAdmission({ id: crypto.randomUUID(), name, email, gpa, status: "pending" });
    setName(""); setEmail(""); setGpa("");
    toast.success("Application submitted!");
  };

  return (
    <AppShell title="Admission · ভর্তি">
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 shadow-sm h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><UserPlus className="size-5 text-primary" /> New Application</CardTitle>
            <CardDescription>Fill the form to apply for admission.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              <Input placeholder="Applicant Name" value={name} onChange={e => setName(e.target.value)} required />
              <Input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
              <Input placeholder="Previous GPA" value={gpa} onChange={e => setGpa(e.target.value)} required />
              <Button type="submit" className="w-full">Submit Application</Button>
            </form>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 shadow-sm">
          <CardHeader><CardTitle>Recent Applications</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>GPA</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
              <TableBody>
                {admissions.length === 0 && <TableRow><TableCell colSpan={4} className="text-center py-6 text-muted-foreground">No applications yet.</TableCell></TableRow>}
                {admissions.map(a => (
                  <TableRow key={a.id}><TableCell className="font-medium">{a.name}</TableCell><TableCell>{a.email}</TableCell><TableCell>{a.gpa}</TableCell>
                  <TableCell><Badge variant={a.status === "pending" ? "secondary" : "default"}>{a.status}</Badge></TableCell></TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}