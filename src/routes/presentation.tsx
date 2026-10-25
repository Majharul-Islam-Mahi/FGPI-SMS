import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { DEPARTMENTS } from "@/lib/store";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/presentation")({
  head: () => ({
    meta: [
      { title: "Presentation — Student Management System" },
      { name: "description", content: "শিক্ষার্থী ব্যবস্থাপনা সিস্টেম — project presentation slides." },
      { property: "og:title", content: "Presentation — FGPI SMS" },
      { property: "og:description", content: "Student Management System Website project presentation" },
    ],
  }),
  component: Deck,
});

const TEAM = [
  { name: "Member 1", role: "Team Lead + Backend", work: "DB schema, store logic, deployment" },
  { name: "Member 2", role: "Frontend: Auth & Dashboard", work: "Login, dashboard, chart, navigation" },
  { name: "Member 3", role: "Frontend: Students & Departments", work: "Student CRUD, filters, counts" },
  { name: "Member 4", role: "Frontend: Attendance & Results", work: "Attendance, marks, GPA UI" },
  { name: "Member 5", role: "UI/UX + Presentation + QA", work: "Theme, home, slides, testing" },
];

const SLIDES: { kicker: string; title: string; points: string[] }[] = [
  {
    kicker: "Feni Govt Polytechnic Institute",
    title: "Student Management System\nশিক্ষার্থী ব্যবস্থাপনা সিস্টেম",
    points: [
      "Project: Student Management System Website",
      "প্রজেক্ট: শিক্ষার্থী ব্যবস্থাপনা ওয়েবসাইট",
      "Admin · Teacher · Student",
    ],
  },
  {
    kicker: "Problem · সমস্যা",
    title: "Why we need it",
    points: [
      "কাগজে রেকর্ড রাখা ধীর ও ভুলপ্রবণ",
      "Attendance and results are scattered",
      "Students cannot easily see their own data",
    ],
  },
  {
    kicker: "Objectives · লক্ষ্য",
    title: "What the system does",
    points: [
      "Store student records by department & semester",
      "Daily attendance tracking",
      "Marks, grade & GPA calculation (BTEB scale)",
    ],
  },
  {
    kicker: "Users · ব্যবহারকারী",
    title: "Three roles",
    points: [
      "Admin — সব তথ্য যোগ / সম্পাদনা / মুছুন",
      "Teacher — attendance ও result এন্ট্রি",
      "Student — নিজের প্রোফাইল, উপস্থিতি ও ফলাফল",
    ],
  },
  {
    kicker: "Departments · বিভাগ",
    title: "Six departments",
    points: DEPARTMENTS.map((d) => `${d.name} · ${d.bn}`),
  },
  {
    kicker: "Data · ডেটাবেস",
    title: "Data model",
    points: [
      "Students: roll, name, department, semester, session",
      "Attendance: date, student, present/absent",
      "Results: subject, marks → grade & GPA (BTEB)",
      "Prototype: localStorage · Production: PostgreSQL",
    ],
  },
  {
    kicker: "Technology",
    title: "Built with",
    points: [
      "React + TanStack Start + Tailwind CSS",
      "Browser local storage as the prototype database",
      "Recharts for department chart",
      "Responsive — mobile & desktop",
    ],
  },
  {
    kicker: "Team · আমাদের টিম",
    title: "Meet the team",
    points: TEAM.map((t) => `${t.name} — ${t.role}`),
  },
  {
    kicker: "Future · ভবিষ্যৎ",
    title: "Next steps",
    points: [
      "Supabase/PostgreSQL database migration",
      "Real JWT authentication",
      "SMS notice to guardians",
      "Printable mark sheets & reports",
    ],
  },
  {
    kicker: "ধন্যবাদ",
    title: "Thank you!\nপ্রশ্ন থাকলে করুন",
    points: ["Student Management System Website", "Feni Govt Polytechnic Institute"],
  },
];

function Deck() {
  const [i, setI] = useState(0);
  const [scale, setScale] = useState(0.5);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fit = () => {
      const el = box.current;
      if (el) setScale(Math.min(el.clientWidth / 1920, el.clientHeight / 1080));
    };
    fit();
    window.addEventListener("resize", fit);
    document.addEventListener("fullscreenchange", fit);

    const key = (e: KeyboardEvent) => {
      if (["ArrowRight", " ", "PageDown"].includes(e.key)) {
        setI((x) => Math.min(x + 1, SLIDES.length - 1));
      }
      if (["ArrowLeft", "PageUp"].includes(e.key)) {
        setI((x) => Math.max(x - 1, 0));
      }
    };
    window.addEventListener("keydown", key);

    return () => {
      window.removeEventListener("resize", fit);
      document.removeEventListener("fullscreenchange", fit);
      window.removeEventListener("keydown", key);
    };
  }, []);

  const s = SLIDES[i]!;

  return (
    <div className="h-screen flex flex-col bg-foreground">
      {/* Controls */}
      <div className="flex gap-2 p-3 items-center bg-sidebar text-sidebar-foreground">
        <Button asChild variant="secondary" size="sm"><Link to="/">Home</Link></Button>
        <span className="text-sm">{i + 1} / {SLIDES.length}</span>
        <Button size="sm" variant="secondary" className="ml-auto" onClick={() => setI(Math.max(i - 1, 0))}>Prev</Button>
        <Button size="sm" variant="secondary" onClick={() => setI(Math.min(i + 1, SLIDES.length - 1))}>Next</Button>
        <Button size="sm" onClick={() => box.current?.requestFullscreen()}>Present</Button>
      </div>

      {/* Slide area */}
      <div ref={box} className="relative flex-1 overflow-hidden bg-foreground">
        <div
          className="slide-content absolute left-1/2 top-1/2 bg-hero text-primary-foreground"
          style={{ marginLeft: -960, marginTop: -540, transform: `scale(${scale})` }}
        >
          <div className="p-[120px] h-full flex flex-col justify-center">
            <div className="slide-kicker text-gold">{s.kicker}</div>
            <h1
              className={`${i === 0 || i === SLIDES.length - 1 ? "slide-title-lg" : "slide-title"} mt-6 whitespace-pre-line font-bold`}
            >
              {s.title}
            </h1>
            <ul className="mt-12 space-y-5">
              {s.points.map((p) => (
                <li key={p} className="slide-body-lg flex gap-4">
                  <span className="text-gold">■</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="absolute bottom-10 right-[120px] slide-caption opacity-70">
            FGPI · Student Management System · {i + 1}
          </div>
        </div>
      </div>
    </div>
  );
}