import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { EmptyState } from "@/components/EmptyState";
import { actions, useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreditCard } from "lucide-react";

export const Route = createFileRoute("/fees")({ component: Fees });

function Fees() {
  const { students, fees, session } = useStore();
  const isStudent = session?.role === "student";
  const [sid, setSid] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const current = isStudent ? (session?.studentId ?? "") : sid || students[0]?.id || "";
  const myFees = isStudent ? fees.filter((f) => f.studentId === current) : fees;

  const addFee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!current || !amount || !dueDate) return;
    actions.addFee({
      id: crypto.randomUUID(),
      studentId: current,
      amount: Number(amount),
      status: "unpaid",
      dueDate,
    });
    setAmount("");
    setDueDate("");
    toast.success("Fee added!");
  };

  return (
    <AppShell title="Fees · ফি">
      {!isStudent && (
        <form
          onSubmit={addFee}
          className="flex flex-col md:flex-row gap-3 mb-6 bg-card p-4 rounded-lg border shadow-sm max-w-3xl"
        >
          <Select value={current} onValueChange={setSid}>
            <SelectTrigger className="w-full md:w-64">
              <SelectValue placeholder="Select Student" />
            </SelectTrigger>
            <SelectContent>
              {students.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.roll} — {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="number"
            placeholder="Amount (BDT)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full md:w-40"
            required
          />
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full md:w-40"
            required
          />
          <Button type="submit">Add Fee</Button>
        </form>
      )}
      {myFees.length === 0 ? (
        <EmptyState
          icon={CreditCard}
          title="No Fees Found"
          description="There are no fee records available."
        />
      ) : (
        <div className="space-y-4">
          {myFees.map((f) => (
            <div
              key={f.id}
              className="bg-card border p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm gap-4"
            >
              <div>
                <div className="font-bold text-lg text-primary">BDT {f.amount}</div>
                <div className="text-sm text-muted-foreground">Due Date: {f.dueDate}</div>
              </div>
              <div className="flex gap-4 items-center">
                <Badge variant={f.status === "paid" ? "default" : "destructive"}>
                  {f.status.toUpperCase()}
                </Badge>
                {f.status === "unpaid" && (
                  <Button
                    size="sm"
                    onClick={() => {
                      actions.payFee(f.id);
                      toast.success("Paid!");
                    }}
                  >
                    Pay Now
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </AppShell>
  );
}
