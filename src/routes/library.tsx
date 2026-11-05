import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/library')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/library"!</div>
}
import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/library")({ component: Library });
function Library() {
  return (
    <AppShell title="Library · লাইব্রেরি">
      <Card>
        <CardHeader><CardTitle>Library Books</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Book Title</TableHead><TableHead>Author</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
            <TableBody>
              <TableRow><TableCell>Physics 1st Paper</TableCell><TableCell>Dr. Shahjahan</TableCell><TableCell><Badge>Available</Badge></TableCell></TableRow>
              <TableRow><TableCell>Mathematics</TableCell><TableCell>S. Chowdhury</TableCell><TableCell><Badge variant="secondary">Issued</Badge></TableCell></TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AppShell>
  );
}