import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, Users, CalendarCheck, Award, Building2 } from "lucide-react";
import campus from "@/assets/campus.jpg";
import { Button } from "@/components/ui/button";
import { DEPARTMENTS } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Student Management System — Feni Govt Polytechnic Institute" },
      { name: "description", content: "শিক্ষার্থী ব্যবস্থাপনা ওয়েবসাইট: students, attendance, results and departments." },
      { property: "og:title", content: "Student Management System — FGPI" },
      { property: "og:description", content: "শিক্ষার্থী ব্যবস্থাপনা সিস্টেম — Feni Govt Polytechnic Institute" },
    ],
  }),
  component: Index,
});

const FEATURES = [
  { icon: Users, t: "Student Records", bn: "শিক্ষার্থীর তথ্য সংরক্ষণ" },
  { icon: CalendarCheck, t: "Attendance", bn: "দৈনিক উপস্থিতি" },
  { icon: Award, t: "Results & GPA", bn: "ফলাফল ও জিপিএ" },
  { icon: Building2, t: "Departments", bn: "বিভাগভিত্তিক তথ্য" },
];

function Index() {
  return (
    <div className="min-h-screen">
      <section className="relative bg-hero text-primary-foreground">
        <img
          src={campus}
          alt="Feni Govt Polytechnic Institute campus"
          width={1600} height={912}
          className="absolute inset-0 size-full object-cover opacity-25"
        />
        <div className="relative max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2 font-display font-bold">
            <GraduationCap className="size-7 text-gold" /> FGPI SMS
          </div>
          <div className="flex gap-2">
            <Button asChild variant="ghost"><Link to="/presentation">Presentation</Link></Button>
            <Button asChild variant="secondary"><Link to="/login">Login</Link></Button>
          </div>
        </div>
        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-28">
          <p className="text-gold font-semibold tracking-widest text-sm uppercase">Feni Govt Polytechnic Institute</p>
          <h1 className="text-4xl md:text-6xl font-bold mt-3 max-w-3xl leading-tight">Student Management System</h1>
          <p className="text-2xl md:text-3xl mt-2 font-display opacity-90">শিক্ষার্থী ব্যবস্থাপনা সিস্টেম</p>
          <p className="mt-6 max-w-xl opacity-85">
            এক জায়গায় শিক্ষার্থীর তথ্য, উপস্থিতি ও ফলাফল — for admins, teachers and students.
          </p>
          <div className="mt-8 flex gap-3">
            <Button asChild size="lg" variant="secondary"><Link to="/login">Get started · শুরু করুন</Link></Button>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 -mt-12 relative grid grid-cols-2 md:grid-cols-4 gap-4">
        {FEATURES.map((f) => (
          <div key={f.t} className="rounded-lg bg-card p-5 shadow-card border card-premium card-premium-hover">
            <f.icon className="size-7 text-accent" />
            <div className="font-semibold mt-3">{f.t}</div>
            <div className="text-sm text-muted-foreground">{f.bn}</div>
          </div>
        ))}
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold">Departments · বিভাগসমূহ</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {DEPARTMENTS.map((d) => (
            <div key={d.code} className="rounded-lg border bg-card p-5 border-l-4 border-l-primary card-premium card-premium-hover">
              <div className="font-semibold">{d.name}</div>
              <div className="text-sm text-muted-foreground">{d.bn}</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        © 2026 Feni Govt Polytechnic Institute · Student Management System (educational prototype)
      </footer>
    </div>
  );
}