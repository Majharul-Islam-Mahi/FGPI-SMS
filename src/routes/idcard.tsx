import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { useStore } from "@/lib/store";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { IdCard } from "lucide-react";

export const Route = createFileRoute("/idcard")({ component: IdCardPage });
function IdCardPage() {
  const { students } = useStore();
  const [sid, setSid] = useState("");
  const st = students.find(s => s.id === sid) || students[0];

  return (
    <AppShell title="ID Card · আইডি কার্ড">
      <Card className="mb-8 shadow-sm max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><IdCard className="size-5 text-primary" /> Generate ID Card</CardTitle>
          <CardDescription>Select a student to preview their ID card.</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={sid} onValueChange={setSid}>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select Student" /></SelectTrigger>
            <SelectContent>{students.map(s => <SelectItem key={s.id} value={s.id}>{s.roll} — {s.name}</SelectItem>)}</SelectContent>
          </Select>
        </CardContent>
      </Card>

      {st && (
        <div className="flex justify-center">
          <div className="w-96 bg-gradient-to-br from-[#02140D] to-primary text-white p-6 rounded-2xl shadow-2xl relative border border-gold/30">
            <div className="text-xs text-gold uppercase tracking-widest mb-6 border-b border-gold/30 pb-2">Feni Govt Polytechnic Institute</div>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-gold flex items-center justify-center text-3xl font-bold text-gold">{st.name.charAt(0)}</div>
              <div>
                <h3 className="font-bold text-xl">{st.name}</h3>
                <p className="text-sm text-gray-300">Roll: {st.roll}</p>
                <p className="text-xs text-gray-400">Dept: {st.department} | Sem: {st.semester}</p>
              </div>
            </div>
            <div className="mt-8 flex justify-between items-end">
              <Badge className="bg-gold text-black font-bold hover:bg-gold/90">Valid Student</Badge>
              <div className="w-12 h-12 bg-white rounded-md p-1">
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${st.roll}`} alt="QR" className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}