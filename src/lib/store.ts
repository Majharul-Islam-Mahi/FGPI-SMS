/**
 * FGPI SMS — Data store
 * ────────────────────
 * Prototype storage: browser localStorage (key: fgpi-sms-v1)
 * Production-ready: Supabase/PostgreSQL schema সহজে এখান থেকে migrate করা যাবে।
 *
 * কেন useSyncExternalStore?
 * → React 19-এর official way, SSR-safe, এবং simple pub/sub।
 */
import { useSyncExternalStore } from "react";

/* ═══════════ Departments ═══════════ */
export const DEPARTMENTS = [
  { code: "CIVIL", name: "Civil Technology", bn: "সিভিল টেকনোলজি" },
  { code: "CST", name: "Computer Science & Technology", bn: "কম্পিউটার সায়েন্স অ্যান্ড টেকনোলজি" },
  { code: "MECH", name: "Mechanical Technology", bn: "মেকানিক্যাল টেকনোলজি" },
  { code: "ELEC", name: "Electrical Technology", bn: "ইলেকট্রিক্যাল টেকনোলজি" },
  { code: "POWER", name: "Power Technology", bn: "পাওয়ার টেকনোলজি" },
  { code: "ARCH", name: "Architecture Technology", bn: "আর্কিটেকচার টেকনোলজি" },
] as const;

export const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

/* ═══════════ Types ═══════════ */
export type Role = "admin" | "teacher" | "student";

export interface Student {
  id: string;
  roll: string;
  name: string;
  department: string;
  semester: number;
  session: string;
  phone: string;
  gender: "Male" | "Female";
}

export interface AttendanceRecord {
  date: string;
  studentId: string;
  present: boolean;
}

export interface ResultRecord {
  id: string;
  studentId: string;
  subject: string;
  semester: number;
  marks: number;
}

export interface Session {
  role: Role;
  name: string;
  studentId?: string;
}

interface State {
  students: Student[];
  attendance: AttendanceRecord[];
  results: ResultRecord[];
  session: Session | null;
}

/* ═══════════ BTEB grading scale ═══════════ */
/**
 * Bangladesh Technical Education Board (BTEB) GPA scale
 * 80+ → A+ (4.00) ... 40 → D (2.00) ... <40 → F (0.00)
 */
export function gradeFor(marks: number): { grade: string; gp: number } {
  const scale: [number, string, number][] = [
    [80, "A+", 4.0],
    [75, "A", 3.75],
    [70, "A-", 3.5],
    [65, "B+", 3.25],
    [60, "B", 3.0],
    [55, "B-", 2.75],
    [50, "C+", 2.5],
    [45, "C", 2.25],
    [40, "D", 2.0],
  ];
  for (const [min, grade, gp] of scale) if (marks >= min) return { grade, gp };
  return { grade: "F", gp: 0 };
}

/* ═══════════ Seed data (12 sample students) ═══════════ */
const SEED_NAMES = [
  "Md. Rakib Hasan", "Nusrat Jahan", "Tanvir Ahmed", "Sumaiya Akter",
  "Arif Hossain", "Farhana Islam", "Mahmudul Hoque", "Sadia Rahman",
  "Imran Kabir", "Jannatul Ferdous", "Shakil Uddin", "Mim Chowdhury",
];

function seed(): State {
  const students: Student[] = SEED_NAMES.map((name, i) => ({
    id: `s${i + 1}`,
    roll: String(510100 + i * 7),
    name,
    department: DEPARTMENTS[i % DEPARTMENTS.length]!.code,
    semester: (i % 4) * 2 + 1,
    session: i % 2 ? "2022-23" : "2023-24",
    phone: `01${7 + (i % 3)}1234${String(5600 + i).slice(-4)}`,
    gender: [1, 3, 5, 7, 9, 11].includes(i) ? "Female" : "Male",
  }));

  const subjects = ["Mathematics", "Physics", "English", "Basic Electricity"];
  const results: ResultRecord[] = [];
  students.forEach((s, i) =>
    subjects.forEach((sub, j) =>
      results.push({
        id: `r${i}-${j}`,
        studentId: s.id,
        subject: sub,
        semester: s.semester,
        marks: 42 + ((i * 13 + j * 17) % 55),
      }),
    ),
  );

  const attendance: AttendanceRecord[] = [];
  ["2026-10-20", "2026-10-21", "2026-10-22"].forEach((date, d) =>
    students.forEach((s, i) =>
      attendance.push({ date, studentId: s.id, present: (i + d) % 4 !== 0 }),
    ),
  );

  return { students, attendance, results, session: null };
}

/* ═══════════ Store mechanics ═══════════ */
const KEY = "fgpi-sms-v1";
const serverState = seed();
let state: State = serverState;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = localStorage.getItem(KEY);
    state = raw ? JSON.parse(raw) : seed();
  } catch {
    state = seed();
  }
}

function set(fn: (s: State) => State) {
  load();
  state = fn(state);
  localStorage.setItem(KEY, JSON.stringify(state));
  listeners.forEach((l) => l());
}

/** React hook — সব component এই useStore() দিয়ে state পায় */
export function useStore(): State {
  return useSyncExternalStore(
    (l) => {
      load();
      listeners.add(l);
      l();
      return () => listeners.delete(l);
    },
    () => {
      load();
      return state;
    },
    () => serverState,
  );
}

/* ═══════════ Actions ═══════════ */
export const actions = {
  /** Demo login — admin/admin123, teacher/teacher123, student roll+1234 */
  login(role: Role, username: string, password: string): Session | null {
    load();
    let session: Session | null = null;

    if (role === "admin" && username === "admin" && password === "admin123") {
      session = { role, name: "Administrator" };
    }
    if (role === "teacher" && username === "teacher" && password === "teacher123") {
      session = { role, name: "Teacher" };
    }
    if (role === "student") {
      const st = state.students.find((s) => s.roll === username.trim());
      if (st && password === "1234") session = { role, name: st.name, studentId: st.id };
    }

    if (session) set((s) => ({ ...s, session }));
    return session;
  },

  logout: () => set((s) => ({ ...s, session: null })),

  /** Add বা update — duplicate roll থাকলে caller-কে আগে check করতে হবে */
  saveStudent: (st: Student) =>
    set((s) => ({
      ...s,
      students: s.students.some((x) => x.id === st.id)
        ? s.students.map((x) => (x.id === st.id ? st : x))
        : [...s.students, st],
    })),

  deleteStudent: (id: string) =>
    set((s) => ({
      ...s,
      students: s.students.filter((x) => x.id !== id),
      attendance: s.attendance.filter((a) => a.studentId !== id),
      results: s.results.filter((r) => r.studentId !== id),
    })),

  setAttendance: (date: string, studentId: string, present: boolean) =>
    set((s) => ({
      ...s,
      attendance: [
        ...s.attendance.filter((a) => !(a.date === date && a.studentId === studentId)),
        { date, studentId, present },
      ],
    })),

  addResult: (r: ResultRecord) => set((s) => ({ ...s, results: [...s.results, r] })),

  deleteResult: (id: string) => set((s) => ({ ...s, results: s.results.filter((r) => r.id !== id) })),

  /** Demo reset — session রাখে, data আবার seed করে */
  reset: () => set(() => ({ ...seed(), session: state.session })),
};

/* ═══════════ Helpers ═══════════ */
export const deptName = (code: string) => DEPARTMENTS.find((d) => d.code === code)?.name ?? code;