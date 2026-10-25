import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { DEPARTMENTS, SEMESTERS, useStore } from "@/lib/store";

export const Route = createFileRoute("/departments")({
  head: () => ({
    meta: [
      { title: "Departments — FGPI SMS" },
      { name: "description", content: "Departments of Feni Govt Polytechnic Institute with semester-wise student counts." },
      { property: "og:title", content: "Departments — FGPI SMS" },
      { property: "og:description", content: "বিভাগ ও সেমিস্টারভিত্তিক শিক্ষার্থী সংখ্যা" },
    ],
  }),
  component: Departments,
});

function Departments() {
  const { students } = useStore();
  return (
    <AppShell title="Departments · বিভাগ">
      <div className="grid md:grid-cols-2 gap-4">
        {DEPARTMENTS.map((d) => {
          const list = students.filter((s) => s.department === d.code);
          return (
            <div key={d.code} className="rounded-lg bg-card border shadow-card p-5 card-premium card-premium-hover">
              <div className="flex justify-between">
                <div>
                  <div className="font-display text-lg font-bold">{d.name}</div>
                  <div className="text-sm text-muted-foreground">{d.bn}</div>
                </div>
                <div className="text-3xl font-bold text-primary">{list.length}</div>
              </div>
              <div className="grid grid-cols-8 gap-1 mt-4">
                {SEMESTERS.map((s) => (
                  <div key={s} className="rounded bg-muted text-center py-1 text-xs">
                    <div className="text-muted-foreground">S{s}</div>
                    <div className="font-semibold">{list.filter((x) => x.semester === s).length}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}