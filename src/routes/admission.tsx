import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { actions, useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

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
      <form onSubmit={submit} className="flex flex-col md:flex-row gap-3 mb-6 bg-card p-4 rounded-lg border shadow-sm">
        <Input placeholder="Applicant Name" value={name} onChange={e => setName(e.target.value)} required />
        <Input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <Input placeholder="GPA" value={gpa} onChange={e => setGpa(e.target.value)} required />
        <Button type="submit">Apply</Button>
      </form>
      <div className="border rounded-lg bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>GPA</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
          <TableBody>
            {admissions.map(a => (
              <TableRow key={a.id}><TableCell>{a.name}</TableCell><TableCell>{a.email}</TableCell><TableCell>{a.gpa}</TableCell>
              <TableCell><Badge>{a.status}</Badge></TableCell></TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AppShell>
  );
}