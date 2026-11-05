import { createClient } from "@supabase/supabase-js";
import { useSyncExternalStore } from "react";

// ⬇️ আপনার Supabase কানেকশন
const supabaseUrl = "https://glnznqudtpeqrbbofvuj.supabase.co";
const supabaseKey = "sb_publishable_t_ECNkw21IatDqlcKp805A_AoCATAA4";
const supabase = createClient(supabaseUrl, supabaseKey);

export const DEPARTMENTS = [
  { code: "CIVIL", name: "Civil Technology", bn: "সিভিল টেকনোলজি" },
  { code: "CST", name: "Computer Science & Technology", bn: "কম্পিউটার সায়েন্স" },
  { code: "MECH", name: "Mechanical Technology", bn: "মেকানিক্যাল টেকনোলজি" },
  { code: "ELEC", name: "Electrical Technology", bn: "ইলেকট্রিক্যাল টেকনোলজি" },
  { code: "POWER", name: "Power Technology", bn: "পাওয়ার টেকনোলজি" },
  { code: "ARCH", name: "Architecture Technology", bn: "আর্কিটেকচার টেকনোলজি" },
];

export const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];
export type Role = "admin" | "teacher" | "student";

export interface Student { id: string; roll: string; name: string; department: string; semester: number; session: string; phone: string; gender: "Male" | "Female"; }
export interface AttendanceRecord { date: string; studentId: string; present: boolean; }
export interface ResultRecord { id: string; studentId: string; subject: string; semester: number; marks: number; }
export interface NoticeRecord { id: string; title: string; content: string; date: string; author: string; }
export interface FeeRecord { id: string; studentId: string; amount: number; status: "paid" | "unpaid"; dueDate: string; }
// ⬇️ RoutineRecord-এ shift যুক্ত করা হলো
export interface RoutineRecord { id: string; department: string; semester: number; shift: string; day: string; time: string; subject: string; teacher: string; room: string; }
export interface ApplicationRecord { id: string; studentId: string; type: string; reason: string; status: "pending" | "approved" | "rejected"; date: string; }
export interface Session { role: Role; name: string; studentId?: string; }

interface State {
  students: Student[];
  attendance: AttendanceRecord[];
  results: ResultRecord[];
  notices: NoticeRecord[];
  fees: FeeRecord[];
  routines: RoutineRecord[];
  applications: ApplicationRecord[];
  session: Session | null;
}

export function gradeFor(marks: number): { grade: string; gp: number } {
  const scale: [number, string, number][] = [[80, "A+", 4.0], [75, "A", 3.75], [70, "A-", 3.5], [65, "B+", 3.25], [60, "B", 3.0], [55, "B-", 2.75], [50, "C+", 2.5], [45, "C", 2.25], [40, "D", 2.0]];
  for (const [min, grade, gp] of scale) if (marks >= min) return { grade, gp };
  return { grade: "F", gp: 0 };
}

let state: State = { students: [], attendance: [], results: [], notices: [], fees: [], routines: [], applications: [], session: null };
const listeners = new Set<() => void>();
let loaded = false;

async function load() {
  if (loaded) return;
  loaded = true;
  
  // ডেটাবেজ থেকে সব ডেটা লোড করা
  const { data: students } = await supabase.from("students").select("*");
  const { data: attendance } = await supabase.from("attendance").select("*");
  const { data: results } = await supabase.from("results").select("*");
  const { data: notices } = await supabase.from("notices").select("*").order("date", { ascending: false });
  const { data: fees } = await supabase.from("fees").select("*");
  const { data: routines } = await supabase.from("routines").select("*");
  const { data: applications } = await supabase.from("applications").select("*").order("date", { ascending: false });
  
  // ডেটা ম্যাপিং
  if (students) state.students = students as any;
  if (attendance) state.attendance = attendance.map((a: any) => ({ ...a, studentId: a.student_id }));
  if (results) state.results = results.map((r: any) => ({ ...r, studentId: r.student_id }));
  if (notices) state.notices = notices as any;
  if (fees) state.fees = fees.map((f: any) => ({ ...f, studentId: f.student_id, dueDate: f.due_date }));
  if (routines) state.routines = routines as any;
  if (applications) state.applications = applications.map((a: any) => ({ ...a, studentId: a.student_id }));
  
  const savedSession = localStorage.getItem("fgpi-session");
  if (savedSession) state.session = JSON.parse(savedSession);

  listeners.forEach((l) => l());
}

function set(fn: (s: State) => State) {
  state = fn(state);
  listeners.forEach((l) => l());
}

export function useStore(): State {
  return useSyncExternalStore(
    (l) => { if (!loaded) load(); listeners.add(l); l(); return () => listeners.delete(l); },
    () => state,
    () => state
  );
}

export const actions = {
  login(role: Role, username: string, password: string): Session | null {
    let session: Session | null = null;
    if (role === "admin" && username === "admin" && password === "admin123") session = { role, name: "Administrator" };
    if (role === "teacher" && username === "teacher" && password === "teacher123") session = { role, name: "Teacher" };
    if (role === "student") {
      const st = state.students.find((s) => s.roll === username.trim());
      if (st && password === "1234") session = { role, name: st.name, studentId: st.id };
    }
    if (session) {
      set((s) => ({ ...s, session }));
      localStorage.setItem("fgpi-session", JSON.stringify(session));
    }
    return session;
  },
  
  logout: () => {
    set((s) => ({ ...s, session: null }));
    localStorage.removeItem("fgpi-session");
  },
  
  async saveStudent(st: Student) {
    set((s) => ({ ...s, students: s.students.some((x) => x.id === st.id) ? s.students.map((x) => (x.id === st.id ? st : x)) : [...s.students, st] }));
    await supabase.from("students").upsert(st);
  },
  
  async deleteStudent(id: string) {
    set((s) => ({ ...s, students: s.students.filter((x) => x.id !== id) }));
    await supabase.from("students").delete().eq("id", id);
  },
  
  async setAttendance(date: string, studentId: string, present: boolean) {
    set((s) => ({ ...s, attendance: [...s.attendance.filter((a) => !(a.date === date && a.studentId === studentId)), { date, studentId, present }] }));
    await supabase.from("attendance").upsert({ date, student_id: studentId, present }, { onConflict: 'date,student_id' });
  },
  
  async addResult(r: ResultRecord) {
    set((s) => ({ ...s, results: [...s.results, r] }));
    await supabase.from("results").insert({ id: r.id, student_id: r.studentId, subject: r.subject, semester: r.semester, marks: r.marks });
  },
  
  async deleteResult(id: string) {
    set((s) => ({ ...s, results: s.results.filter((r) => r.id !== id) }));
    await supabase.from("results").delete().eq("id", id);
  },

  async addNotice(n: NoticeRecord) {
    set((s) => ({ ...s, notices: [n, ...s.notices] }));
    await supabase.from("notices").insert(n);
  },

  async addFee(f: FeeRecord) {
    set((s) => ({ ...s, fees: [...s.fees, f] }));
    await supabase.from("fees").insert({ id: f.id, student_id: f.studentId, amount: f.amount, status: f.status, due_date: f.dueDate });
  },

  async payFee(id: string) {
    set((s) => ({ ...s, fees: s.fees.map(f => f.id === id ? { ...f, status: "paid" } : f) }));
    await supabase.from("fees").update({ status: "paid" }).eq("id", id);
  },

  async addRoutine(r: RoutineRecord) {
    set((s) => ({ ...s, routines: [...s.routines, r] }));
    // ⬇️ ডেটাবেজে shift সহ সেভ করা হচ্ছে
    await supabase.from("routines").insert({ 
      id: r.id, department: r.department, semester: r.semester, 
      shift: r.shift, day: r.day, time: r.time, 
      subject: r.subject, teacher: r.teacher, room: r.room 
    });
  },

  async addApplication(a: ApplicationRecord) {
    set((s) => ({ ...s, applications: [a, ...s.applications] }));
    await supabase.from("applications").insert({ id: a.id, student_id: a.studentId, type: a.type, reason: a.reason, status: a.status, date: a.date });
  },

  async updateApplicationStatus(id: string, status: "approved" | "rejected") {
    set((s) => ({ ...s, applications: s.applications.map(a => a.id === id ? { ...a, status } : a) }));
    await supabase.from("applications").update({ status }).eq("id", id);
  }
};

export const deptName = (code: string) => DEPARTMENTS.find((d) => d.code === code)?.name ?? code;