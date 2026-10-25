import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { AppShell, Stat } from "@/components/AppShell";
import { DEPARTMENTS, gradeFor, useStore, deptName } from "@/lib/store";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — FGPI SMS" },
      { name: "description", content: "Overview of students, attendance and results." },
      { property: "og:title", content: "Dashboard — FGPI SMS" },
      { property: "og:description", content: "ড্যাশবোর্ড — শিক্ষার্থী, উপস্থিতি ও ফলাফল" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { students, attendance, results, session } = useStore();

  /* ── Student view: own profile ── */
  if (session?.role === "student") {
    const me = students.find((s) => s.id === session.studentId);
    const att = attendance.filter((a) => a.studentId === me?.id);
    const res = results.filter((r) => r.studentId === me?.id);
    const gpa = res.length ? res.reduce((a, r) => a + gradeFor(r.marks).gp, 0) / res.length : 0;

    return (
      <AppShell title="My Profile · আমার প্রোফাইল">
        {me && (
          <div className="rounded-lg bg-card border p-6 shadow-card mb-6 card-premium">
            <div className="text-2xl font-display font-bold">{me.name}</div>
            <div className="text-muted-foreground">
              Roll {me.roll} · {deptName(me.department)} · Semester {me.semester} · Session {me.session}
            </div>
          </div>
        )}
        <div className="grid sm:grid-cols-3 gap-4">
          <Stat label="Attendance · উপস্থিতি" value={`${att.length ? Math.round((att.filter((a) => a.present).length / att.length) * 100) : 0}%`} />
          <Stat label="Subjects" value={res.length} />
          <Stat label="GPA" value={gpa.toFixed(2)} sub="out of 4.00" />
        </div>
      </AppShell>
    );
  }

  /* ── Admin / Teacher view ── */
  const present = attendance.filter((a) => a.present).length;
  const pass = results.filter((r) => r.marks >= 40).length;
  const data = DEPARTMENTS.map((d) => ({
    name: d.code,
    students: students.filter((s) => s.department === d.code).length,
  }));

  return (
    <AppShell title="Dashboard · ড্যাশবোর্ড">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Total Students · মোট শিক্ষার্থী" value={students.length} />
        <Stat label="Departments · বিভাগ" value={DEPARTMENTS.length} />
        <Stat label="Avg Attendance" value={`${attendance.length ? Math.round((present / attendance.length) * 100) : 0}%`} />
        <Stat label="Pass Rate · পাসের হার" value={`${results.length ? Math.round((pass / results.length) * 100) : 0}%`} />
      </div>
      <div className="rounded-lg bg-card border p-6 shadow-card mt-6 card-premium">
        <h2 className="text-lg font-bold mb-4">Students by Department</h2>
        <div className="h-72">
          <ResponsiveContainer>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="students" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AppShell>
  );
}