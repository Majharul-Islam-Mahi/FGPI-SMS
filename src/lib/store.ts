// ============================================================
// src/lib/store.ts-এর জন্য আপডেট করা অংশ
// ধরে নেওয়া হয়েছে store.ts-এ আগের মতোই `state`, `set`, `supabase` এবং `Role` আছে।
// ============================================================

// ───────── ১. ইন্টারফেস (আগেরগুলো এগুলো দিয়ে বদলান) ─────────
export interface Admin {
  id: string; adminCode: string; name: string; password: string;
  email?: string; isActive?: boolean; avatarUrl?: string;
}

export interface Teacher {
  id: string; teacherId: string; name: string; department: string; designation: string;
  password: string; email?: string; phone?: string; address?: string;
  joinDate?: string; leaveDate?: string;
  status?: string; // Active, Left
  isActive?: boolean; avatarUrl?: string;
}

export interface Student {
  id: string; roll: string; name: string; department: string; semester: number;
  session: string; phone: string; gender: "Male" | "Female"; password: string;
  address?: string;
  status?: string; // Active, Graduated, Dropped
  shift?: string; misId?: string; scholarshipStatus?: string; backlogStatus?: string;
  isHostelStudent?: boolean; avatarUrl?: string;
}

export interface Session {
  role: Role; name: string; userId: string;
  adminId?: string; teacherId?: string; studentId?: string;
  isReadOnly?: boolean; // লাইফটাইম অ্যাক্সেস: দেখতে পারবে, বদলাতে পারবে না
  status?: string;      // Active / Left / Graduated / Dropped
}

// ───────── ২. helper ফাংশন (actions-এর বাইরে, ফাইলের উপরের দিকে) ─────────
const AVATAR_BUCKET = "avatars";
const AVATAR_MAX_BYTES = 2 * 1024 * 1024; // ২ MB
const AVATAR_TYPES = ["image/jpeg", "image/png", "image/webp"];

// স্থানীয় সময়ের তারিখ (YYYY-MM-DD); toISOString() UTC ধরে বলে বাংলাদেশে ভোর ৬টার আগে আগের দিন আসত
const today = () => new Date().toLocaleDateString("en-CA");

const tableOf = (role: Role) =>
  role === "admin" ? "admins" : role === "teacher" ? "teachers" : "students";

const isTeacherReadOnly = (t: Teacher) => t.status === "Left";
const isStudentReadOnly = (s: Student) => s.status === "Graduated" || s.status === "Dropped";

// load()-এ ব্যবহার হবে
const mapAdmin = (a: any): Admin => ({
  ...a, adminCode: a.admin_code, isActive: a.is_active, avatarUrl: a.avatar_url,
});
const mapTeacher = (t: any): Teacher => ({
  ...t, teacherId: t.teacher_id, joinDate: t.join_date, leaveDate: t.leave_date,
  status: t.status, isActive: t.is_active, avatarUrl: t.avatar_url,
});
const mapStudent = (s: any): Student => ({
  ...s, isHostelStudent: s.is_hostel_student, misId: s.mis_id,
  scholarshipStatus: s.scholarship_status, backlogStatus: s.backlog_status,
  avatarUrl: s.avatar_url,
});

// ReadOnly হলে যেকোনো লেখার অ্যাকশন এখানে থেমে যাবে
function assertWritable() {
  if (state.session?.isReadOnly) {
    throw new Error("আপনার অ্যাকাউন্ট শুধু দেখার মোডে আছে, কিছু পরিবর্তন করা যাবে না।");
  }
}

function assertAdmin() {
  if (state.session?.role !== "admin") {
    throw new Error("এই কাজ শুধু অ্যাডমিন করতে পারবেন।");
  }
}

function startSession(session: Session) {
  set((s) => ({ ...s, session }));
  localStorage.setItem("fgpi-session", JSON.stringify(session));
  return session;
}

// localStorage-এর সেশনকে বিশ্বাস না করে ডাটাবেজের status থেকে isReadOnly আবার হিসাব করে।
// load() শেষ হওয়ার পর এটা একবার চালান।
function refreshSessionFlags() {
  const ses = state.session;
  if (!ses) return;

  let isReadOnly = false;
  let status: string | undefined;

  if (ses.role === "teacher") {
    const t = state.teachers.find((x) => x.id === ses.userId);
    if (!t) return;
    isReadOnly = isTeacherReadOnly(t);
    status = t.status;
  } else if (ses.role === "student") {
    const st = state.students.find((x) => x.id === ses.userId);
    if (!st) return;
    isReadOnly = isStudentReadOnly(st);
    status = st.status;
  } else {
    return; // admin সবসময় লিখতে পারে
  }

  if (ses.isReadOnly !== isReadOnly || ses.status !== status) {
    startSession({ ...ses, isReadOnly, status });
  }
}

function avatarPathFromUrl(url?: string): string | null {
  if (!url) return null;
  const part = url.split(`/${AVATAR_BUCKET}/`)[1];
  return part ? decodeURIComponent(part.split("?")[0]) : null;
}

// ───────── ৩. load() ফাংশনে যা বদলাবেন ─────────
//
//   if (admins)   state.admins   = admins.map(mapAdmin);
//   if (teachers) state.teachers = teachers.map(mapTeacher);
//   if (students) state.students = students.map(mapStudent);
//   refreshSessionFlags(); // সব ডেটা বসার পর

// ───────── ৪. actions-এর ভেতরে বসানোর মেথড ─────────
const actionsPatch = {
  loginTeacher(dept: string, teacherId: string, password: string): Session | null {
    const t = state.teachers.find(
      (t) => t.department === dept && t.teacherId.trim() === teacherId.trim()
    );
    if (!t || t.password !== password.trim()) return null;

    return startSession({
      role: "teacher", name: t.name, userId: t.id, teacherId: t.id,
      isReadOnly: isTeacherReadOnly(t), status: t.status,
    });
  },

  loginStudent(dept: string, roll: string, sessionYear: string, password: string): Session | null {
    const st = state.students.find(
      (s) => s.department === dept && s.roll.trim() === roll.trim() && s.session === sessionYear
    );
    if (!st || st.password !== password.trim()) return null;

    return startSession({
      role: "student", name: st.name, userId: st.id, studentId: st.id,
      isReadOnly: isStudentReadOnly(st), status: st.status,
    });
  },

  // শিক্ষক চলে গেলে (শুধু অ্যাডমিন)
  async markTeacherLeft(id: string) {
    assertWritable();
    assertAdmin();

    const prev = state.teachers.find((t) => t.id === id);
    if (!prev) throw new Error("শিক্ষক পাওয়া যায়নি।");

    const leaveDate = today();
    set((s) => ({
      ...s,
      teachers: s.teachers.map((t) => (t.id === id ? { ...t, status: "Left", leaveDate } : t)),
    }));

    const { error } = await supabase
      .from("teachers")
      .update({ status: "Left", leave_date: leaveDate })
      .eq("id", id);

    if (error) {
      // ডাটাবেজে না বসলে UI আগের অবস্থায় ফিরিয়ে দিন
      set((s) => ({ ...s, teachers: s.teachers.map((t) => (t.id === id ? prev : t)) }));
      throw error;
    }
  },

  // শিক্ষার্থী পাশ করলে (শুধু অ্যাডমিন)
  async markStudentGraduated(id: string) {
    assertWritable();
    assertAdmin();

    const prev = state.students.find((st) => st.id === id);
    if (!prev) throw new Error("শিক্ষার্থী পাওয়া যায়নি।");

    set((s) => ({
      ...s,
      students: s.students.map((st) => (st.id === id ? { ...st, status: "Graduated" } : st)),
    }));

    const { error } = await supabase.from("students").update({ status: "Graduated" }).eq("id", id);

    if (error) {
      set((s) => ({ ...s, students: s.students.map((st) => (st.id === id ? prev : st)) }));
      throw error;
    }
  },

  async uploadAvatar(file: File, userId: string, role: Role) {
    assertWritable();

    // অ্যাডমিন সবার ছবি বদলাতে পারবে; বাকিরা শুধু নিজের
    const ses = state.session;
    const allowed = !!ses && (ses.role === "admin" || (ses.role === role && ses.userId === userId));
    if (!allowed) throw new Error("এই ছবি বদলানোর অনুমতি নেই।");

    if (!AVATAR_TYPES.includes(file.type)) throw new Error("শুধু JPG, PNG বা WebP ছবি দেওয়া যাবে।");
    if (file.size > AVATAR_MAX_BYTES) throw new Error("ছবি ২ MB-এর বেশি হতে পারবে না।");

    const table = tableOf(role);
    const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
    const path = `${role}/${userId}/${Date.now()}.${ext}`;

    const oldUrl =
      role === "admin" ? state.admins.find((a) => a.id === userId)?.avatarUrl
      : role === "teacher" ? state.teachers.find((t) => t.id === userId)?.avatarUrl
      : state.students.find((st) => st.id === userId)?.avatarUrl;

    // ১. Storage-এ আপলোড
    const { error: uploadError } = await supabase.storage
      .from(AVATAR_BUCKET)
      .upload(path, file, { contentType: file.type, cacheControl: "3600", upsert: false });
    if (uploadError) throw uploadError;

    // ২. পাবলিক URL
    const { data } = supabase.storage.from(AVATAR_BUCKET).getPublicUrl(path);
    const publicUrl = data.publicUrl;

    // ৩. ডেটাবেজে URL সেভ; ফেইল করলে আপলোড করা ফাইল মুছে দিন
    const { error: dbError } = await supabase.from(table).update({ avatar_url: publicUrl }).eq("id", userId);
    if (dbError) {
      await supabase.storage.from(AVATAR_BUCKET).remove([path]);
      throw dbError;
    }

    // ৪. লোকাল স্টেট
    set((s) => {
      if (role === "admin") return { ...s, admins: s.admins.map((a) => (a.id === userId ? { ...a, avatarUrl: publicUrl } : a)) };
      if (role === "teacher") return { ...s, teachers: s.teachers.map((t) => (t.id === userId ? { ...t, avatarUrl: publicUrl } : t)) };
      return { ...s, students: s.students.map((st) => (st.id === userId ? { ...st, avatarUrl: publicUrl } : st)) };
    });

    // ৫. সব সফল হলে পুরনো ছবি মুছুন (মোছা ফেইল করলেও ব্যবহারকারীর ক্ষতি নেই)
    const oldPath = avatarPathFromUrl(oldUrl);
    if (oldPath) await supabase.storage.from(AVATAR_BUCKET).remove([oldPath]);

    return publicUrl;
  },
};

// UI-তে ব্যবহার (উদাহরণ): এডিট/সেভ/আপলোড বাটনে
//   <button disabled={session?.isReadOnly}>সংরক্ষণ</button>
// এবং ReadOnly হলে একটা ব্যানার দেখান: "আপনি শুধু দেখার মোডে আছেন"
