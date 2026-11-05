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
import { BookOpen, BookMarked } from "lucide-react";

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
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 shadow-sm h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BookOpen className="size-5 text-primary" /> Add Book</CardTitle>
            <CardDescription>Insert a new book into the catalog.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              <Input placeholder="Book Title" value={title} onChange={e => setTitle(e.target.value)} required />
              <Input placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} required />
              <Button type="submit" className="w-full">Add Book</Button>
            </form>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 shadow-sm">
          <CardHeader><CardTitle>Book Catalog</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Author</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
              <TableBody>
                {libraries.length === 0 && <TableRow><TableCell colSpan={3} className="text-center py-6 text-muted-foreground">No books added yet.</TableCell></TableRow>}
                {libraries.map(l => (
                  <TableRow key={l.id}>
                    <TableCell className="font-medium flex items-center gap-2"><BookMarked className="size-4 text-muted-foreground"/> {l.title}</TableCell>
                    <TableCell>{l.author}</TableCell>
                    <TableCell><Badge variant={l.status === "Available" ? "default" : "secondary"}>{l.status}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}