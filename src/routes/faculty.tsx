import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const Route = createFileRoute("/faculty")({ component: Faculty });
function Faculty() {
  return (
    <AppShell title="Faculty · শিক্ষক">
      <Card>
        <CardHeader><CardTitle>Faculty Directory</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Department</TableHead><TableHead>Assigned Course</TableHead></TableRow></TableHeader>
            <TableBody>
              <TableRow><TableCell>Md. Karim</TableCell><TableCell>CST</TableCell><TableCell>Data Structure</TableCell></TableRow>
              <TableRow><TableCell>Nusrat Jahan</TableCell><TableCell>Civil</TableCell><TableCell>Surveying</TableCell></TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AppShell>
  );
}