import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { actions, useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/fees")({
  component: Fees,
});

function Fees() {
  const { students, fees, session } = useStore();
  const isStudent = session?.role === "student";
  const [sid, setSid] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");

  const current = isStudent ? session?.studentId ?? "" : sid || students[0]?.id || "";
  const myFees = isStudent ? fees.filter(f => f.studentId === current) : fees;

  const addFee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!current || !amount || !dueDate) return;
    actions.addFee({ id: `f${Date.now()}`, studentId: current, amount: Number(amount), status: "unpaid", dueDate });
    setAmount(""); setDueDate("");
    toast.success("Fee added!");
  };

  return (
    <AppShell title="Fees · ফি">
      {!isStudent && (
        <form onSubmit={addFee} className="flex gap-3 mb-6">
          <Select value={current} onValueChange={setSid}>
            <SelectTrigger className="w-64"><SelectValue placeholder="Select Student" /></SelectTrigger>
            <SelectContent>{students.map(s => <SelectItem key={s.id} value={s.id}>{s.roll} — {s.name}</SelectItem>)}</SelectContent>
          </Select>
          <Input type="number" placeholder="Amount (BDT)" value={amount} onChange={e => setAmount(e.target.value)} className="w-40" />
          <Input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="w-40" />
          <Button type="submit">Add Fee</Button>
        </form>
      )}

      <div className="space-y-4">
        {myFees.map(f => (
          <div key={f.id} className="bg-card border p-4 rounded-lg flex justify-between items-center shadow-sm">
            <div>
              <div className="font-bold text-lg">BDT {f.amount}</div>
              <div className="text-sm text-muted-foreground">Due: {f.dueDate}</div>
            </div>
            <div className="flex gap-4 items-center">
              <Badge variant={f.status === "paid" ? "default" : "destructive"}>
                {f.status.toUpperCase()}
              </Badge>
              {f.status === "unpaid" && (
                <Button size="sm" onClick={() => { actions.payFee(f.id); toast.success("Paid!"); }}>Pay Now</Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}