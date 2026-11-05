import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { useStore } from "@/lib/store";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/idcard")({ component: IdCardPage });
function IdCardPage() {
  const { students } = useStore();
  const [sid, setSid] = useState("");
  const st = students.find(s => s.id === sid) || students[0];

  return (
    <AppShell title="ID Card · আইডি কার্ড">
      <Select value={sid} onValueChange={setSid}>
        <SelectTrigger className="w-64 mb-8 bg-card"><SelectValue placeholder="Select Student" /></SelectTrigger>
        <SelectContent>{students.map(s => <SelectItem key={s.id} value={s.id}>{s.roll} — {s.name}</SelectItem>)}</SelectContent>
      </Select>

      {st && (
        <div className="flex justify-center">
          <div className="w-96 bg-gradient-to-br from-primary to-[#02140D] text-white p-6 rounded-xl shadow-2xl relative">
            <div className="text-xs opacity-70 mb-6">Feni Govt Polytechnic Institute</div>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-2xl font-bold">{st.name.charAt(0)}</div>
              <div>
                <h3 className="font-bold text-xl">{st.name}</h3>
                <p className="text-sm opacity-80">Roll: {st.roll}</p>
                <p className="text-xs opacity-60">Dept: {st.department} | Sem: {st.semester}</p>
              </div>
            </div>
            <div className="mt-8 flex justify-between items-end">
              <Badge className="bg-white text-black font-bold">Valid Student</Badge>
              <div className="w-12 h-12 bg-white"></div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}