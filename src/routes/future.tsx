import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { 
  UserPlus, Briefcase, Hotel, Book, Bus, MessageSquare, IdCard, Construction 
} from "lucide-react";

export const Route = createFileRoute("/future")({
  component: FuturePage,
});

const FUTURE_MODULES = [
  { title: "Admission Management", bn: "ভর্তি ব্যবস্থাপনা", icon: UserPlus, desc: "Online application, document upload, merit list, and auto Student ID generation." },
  { title: "Faculty Management", bn: "শিক্ষক ব্যবস্থাপনা", icon: Briefcase, desc: "Teacher profiles, course assignment, and class routine management." },
  { title: "Hostel Management", bn: "হোস্টেল ব্যবস্থাপনা", icon: Hotel, desc: "Room allocation, availability calendar, and automated notifications." },
  { title: "Library Management", bn: "লাইব্রেরি ব্যবস্থাপনা", icon: Book, desc: "Book issue/return, fine calculation, and overdue alerts." },
  { title: "Transport Management", bn: "পরিবহন ব্যবস্থাপনা", icon: Bus, desc: "Bus routes, driver assignment, and student pass management." },
  { title: "Mass SMS Alerts", bn: "এসএমএস নোটিফিকেশন", icon: MessageSquare, desc: "Send fee dues, results, and urgent notices directly to guardians." },
  { title: "ID Card Generation", bn: "আইডি কার্ড তৈরি", icon: IdCard, desc: "Automated digital ID cards and certificates with QR codes." },
];

function FuturePage() {
  return (
    <AppShell title="Future Scope · ভবিষ্যৎ পরিকল্পনা">
      <div className="mb-8 bg-primary/10 border border-primary/20 p-6 rounded-xl flex items-center gap-4">
        <Construction className="size-10 text-primary animate-pulse" />
        <div>
          <h2 className="text-xl font-bold text-primary">Phase 2 Roadmap</h2>
          <p className="text-muted-foreground text-sm">
            These modules are planned for the next version of our Student Management System.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FUTURE_MODULES.map((m, idx) => (
          <div key={idx} className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md hover:border-gold transition-all group">
            <div className="bg-primary/5 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
              <m.icon className="size-6 text-primary group-hover:text-gold transition-colors" />
            </div>
            <h3 className="font-bold text-lg mb-1">{m.title}</h3>
            <p className="text-sm text-primary font-medium mb-2">{m.bn}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {m.desc}
            </p>
          </div>
        ))}
      </div>
    </AppShell>
  );
}