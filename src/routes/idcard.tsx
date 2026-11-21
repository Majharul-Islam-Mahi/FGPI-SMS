import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { useStore } from "@/lib/store";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { IdCard, QrCode, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/idcard")({ component: IdCardPage });

function IdCardPage() {
  const { students, session } = useStore();
  const [sid, setSid] = useState("");
  
  // স্টুডেন্ট লগইন করলে সে শুধু নিজের আইডি কার্ড দেখবে
  const isStudent = session?.role === "student";
  const current = isStudent ? session?.studentId : (sid || students[0]?.id);
  const st = students.find((s) => s.id === current);

  return (
    <AppShell title="ID Card · আইডি কার্ড">
      {/* ড্রপডাউন শুধু এডমিন এবং টিচারের জন্য দেখাবে */}
      {!isStudent && (
        <Card className="mb-8 shadow-sm max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IdCard className="size-5 text-primary" /> Generate ID Card
            </CardTitle>
            <CardDescription>Select a student to preview their ID card.</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={current || ""} onValueChange={setSid}>
              <SelectTrigger className="w-full"><SelectValue placeholder="Select Student" /></SelectTrigger>
              <SelectContent>
                {students.map((s) => (
                  <SelectItem key={s.id} value={s.id}>{s.roll} — {s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      )}

      {/* স্টুডেন্ট লগইন করলে এই সুন্দর মেসেজটি দেখাবে */}
      {isStudent && st && (
        <div className="mb-6 bg-gold/10 border border-gold/30 p-4 rounded-xl flex items-center gap-3 max-w-md">
          <CheckCircle2 className="size-6 text-gold" />
          <div>
            <h3 className="font-bold text-gold">Welcome, {st.name}!</h3>
            <p className="text-xs text-muted-foreground">This is your official student ID card.</p>
          </div>
        </div>
      )}

      {/* ID Card ডিজাইন */}
      {st && (
        <div className="flex justify-center mt-4">
          <div className="w-[400px] bg-gradient-to-br from-[#02140D] via-[#0A2419] to-[#02140D] text-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden relative border-2 border-gold/40">
            
            {/* Card Header */}
            <div className="bg-gradient-to-r from-gold to-yellow-500 p-4 flex justify-between items-center">
              <div>
                <h2 className="font-bold text-black text-lg leading-tight font-display">FGPI SMS</h2>
                <p className="text-xs text-black/70 font-semibold tracking-wider">Feni Govt Polytechnic Institute</p>
              </div>
              <div className="bg-black/20 p-2 rounded-full">
                <IdCard className="size-6 text-black" />
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 flex gap-5 items-center">
              {/* Avatar Placeholder */}
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-[#02140D] border-2 border-gold flex items-center justify-center text-4xl font-bold text-gold shadow-inner shrink-0">
                {st.name.charAt(0)}
              </div>
              
              <div className="space-y-1.5 flex-1">
                <h3 className="font-bold text-xl text-white leading-tight">{st.name}</h3>
                <p className="text-sm text-gray-300">Roll: <span className="font-mono text-gold">{st.roll}</span></p>
                <p className="text-xs text-gray-400">Dept: {st.department} | Sem: {st.semester}</p>
                <p className="text-xs text-gray-400">Session: {st.session}</p>
                <Badge className="bg-gold text-black font-bold mt-2 hover:bg-gold/90 border-none">
                  Verified Student
                </Badge>
              </div>
            </div>

            {/* Card Footer */}
            <div className="px-6 pb-6 pt-2 flex justify-between items-end border-t border-white/10">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Emergency Contact</p>
                <p className="text-xs text-gray-300 font-mono">{st.phone}</p>
              </div>
              <div className="bg-white p-1.5 rounded-lg">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=ROLL-${st.roll}-DEPT-${st.department}`} 
                  alt="QR Code" 
                  className="w-12 h-12" 
                />
              </div>
            </div>

            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
              <h1 className="text-8xl font-bold text-white rotate-[-30deg]">FGPI</h1>
            </div>
          </div>
        </div>
      )}

      {/* স্টুডেন্ট না থাকলে */}
      {!st && (
        <p className="text-center text-muted-foreground mt-10">No student data available.</p>
      )}
    </AppShell>
  );
}