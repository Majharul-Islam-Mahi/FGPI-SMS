import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { actions, useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/library")({ component: Library });
function Library() {
  const { libraries } = useStore();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    actions.addLibrary({ id: crypto.randomUUID(), title, author, status: "Available" });
    setTitle(""); setAuthor("");
    toast.success("Book added!");
  };

  return (
    <AppShell title="Library · লাইব্রেরি">
      <form onSubmit={submit} className="flex flex-col md:flex-row gap-3 mb-6 bg-card p-4 rounded-lg border shadow-sm">
        <Input placeholder="Book Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <Input placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} required />
        <Button type="submit">Add Book</Button>
      </form>
      <div className="border rounded-lg bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Author</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
          <TableBody>
            {libraries.map(l => (
              <TableRow key={l.id}><TableCell>{l.title}</TableCell><TableCell>{l.author}</TableCell><TableCell><Badge>{l.status}</Badge></TableCell></TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AppShell>
  );
}