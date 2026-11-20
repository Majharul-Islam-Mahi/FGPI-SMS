import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useStore } from "@/lib/store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/fee-ledger")({ component: FeeLedger });

function FeeLedger() {
  const { feeLedgers, students } = useStore();

  return (
    <AppShell title="Fee Ledger" roles={["admin"]}>
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {feeLedgers.length ? (
              feeLedgers.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>
                    {students.find((student) => student.id === entry.studentId)?.name ??
                      entry.studentId}
                  </TableCell>
                  <TableCell>{entry.description}</TableCell>
                  <TableCell className="capitalize">{entry.type}</TableCell>
                  <TableCell className="text-right">৳{entry.amount.toLocaleString()}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  No fee ledger entries yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </AppShell>
  );
}
