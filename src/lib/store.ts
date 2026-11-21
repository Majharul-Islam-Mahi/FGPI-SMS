// ⬇️ ইন্টারফেস আপডেট
export interface Teacher { 
  id: string; teacherId: string; name: string; department: string; designation: string; 
  password: string; email?: string; phone?: string; address?: string; 
  joinDate?: string; leaveDate?: string; status?: string; isActive?: boolean; 
}

export interface Student { 
  id: string; roll: string; name: string; department: string; semester: number; 
  session: string; phone: string; gender: "Male" | "Female"; password: string; 
  address?: string; status?: string; // Active, Graduated, Dropped
  shift?: string; misId?: string; scholarshipStatus?: string; backlogStatus?: string; isHostelStudent?: boolean; 
}

export interface Session { 
  role: Role; name: string; userId: string; adminId?: string; teacherId?: string; studentId?: string; 
  isReadOnly?: boolean; // ⬅️ নতুন: লাইফটাইম অ্যাক্সেসের জন্য
  status?: string;      // ⬅️ নতুন: Active/Left/Graduated
}

// ⬇️ লগইন ফাংশন আপডেট
loginTeacher(dept: string, teacherId: string, password: string): Session | null {
  const t = state.teachers.find((t) => t.department === dept && t.teacherId.trim() === teacherId.trim());
  if (!t || t.password !== password.trim()) return null;
  
  // যদি শিক্ষক চলে যান (Left), তবে ReadOnly হবে
  const isReadOnly = t.status === "Left";
  const session: Session = { 
    role: "teacher", name: t.name, userId: t.id, teacherId: t.id, 
    isReadOnly, status: t.status 
  };
  set((s) => ({ ...s, session }));
  localStorage.setItem("fgpi-session", JSON.stringify(session));
  return session;
},

loginStudent(dept: string, roll: string, sessionYear: string, password: string): Session | null {
  const st = state.students.find((s) => s.department === dept && s.roll.trim() === roll.trim() && s.session === sessionYear);
  if (!st || st.password !== password.trim()) return null;
  
  // যদি শিক্ষার্থী পাশ করে চলে যায় (Graduated), তবে ReadOnly হবে
  const isReadOnly = st.status === "Graduated" || st.status === "Dropped";
  const session: Session = { 
    role: "student", name: st.name, userId: st.id, studentId: st.id, 
    isReadOnly, status: st.status 
  };
  set((s) => ({ ...s, session }));
  localStorage.setItem("fgpi-session", JSON.stringify(session));
  return session;
},

// ⬇️ শিক্ষক/শিক্ষার্থী চলে গেলে স্ট্যাটাস আপডেটের ফাংশন
async markTeacherLeft(id: string) {
  set((s) => ({ 
    ...s, 
    teachers: s.teachers.map((t) => t.id === id ? { ...t, status: "Left", leaveDate: new Date().toISOString().split("T")[0] } : t) 
  }));
  await supabase.from("teachers").update({ status: "Left", leave_date: new Date().toISOString().split("T")[0] }).eq("id", id);
},

async markStudentGraduated(id: string) {
  set((s) => ({ 
    ...s, 
    students: s.students.map((st) => st.id === id ? { ...st, status: "Graduated" } : st) 
  }));
  await supabase.from("students").update({ status: "Graduated" }).eq("id", id);
},