import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/idcard")({ component: IdCardPage });
function IdCardPage() {
  return (
    <AppShell title="ID Card · আইডি কার্ড">
      <Card>
        <CardHeader><CardTitle>Student ID Card Preview</CardTitle></CardHeader>
        <CardContent className="flex justify-center p-8">
          <div className="w-80 bg-gradient-to-br from-primary to-[#02140D] text-white p-6 rounded-xl shadow-2xl relative">
            <div className="text-xs opacity-70 mb-4">Feni Govt Polytechnic Institute</div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white"></div>
              <div>
                <h3 className="font-bold text-lg">Majharul Islam</h3>
                <p className="text-sm opacity-80">Roll: 878656</p>
                <p className="text-xs opacity-60">Dept: CST | Sem: 7</p>
              </div>
            </div>
            <div className="mt-6 flex justify-between items-end">
              <Badge className="bg-white text-black font-bold">Valid Student</Badge>
              <div className="w-12 h-12 bg-white"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
}