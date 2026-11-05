import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Construction } from "lucide-react";

export const Route = createFileRoute("/future")({
  component: FuturePage,
});

function FuturePage() {
  return (
    <AppShell title="Future Scope · ভবিষ্যৎ পরিকল্পনা">
       <div className="flex flex-col items-center justify-center h-[60vh] text-center bg-card border rounded-xl shadow-sm">
         <Construction className="size-24 text-gold mb-6 animate-pulse" />
         <h2 className="text-3xl font-bold mb-4 text-primary">Coming Soon!</h2>
         <p className="text-muted-foreground max-w-lg">
           This module is part of our Phase 2 roadmap. 
           We plan to implement Admission, Faculty, Hostel, Library, Transport, SMS Alerts, and ID Card generation here.
         </p>
       </div>
    </AppShell>
  );
}