import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { actions, useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Shield, Camera, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({ component: ProfilePage });

function ProfilePage() {
  const { session, admins, teachers, students } = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  // লগইন করা ইউজারের সম্পূর্ণ ডেটা বের করা
  const currentUser =
    session?.role === "admin" ? admins.find(a => a.id === session.adminId) :
    session?.role === "teacher" ? teachers.find(t => t.id === session.teacherId) :
    session?.role === "student" ? students.find(s => s.id === session.studentId) : null;

  const avatarUrl = currentUser?.avatarUrl;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !session) return;

    if (file.size > 2 * 1024 * 1024) return toast.error("Image must be less than 2MB");

    setUploading(true);
    try {
      await actions.uploadAvatar(file, session.userId, session.role);
      toast.success("Profile picture updated!");
    } catch (err) {
      toast.error("Failed to upload picture");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <AppShell title="My Profile · আমার প্রোফাইল">
      <div className="max-w-2xl">
        <Card className="shadow-sm border-t-4 border-t-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl"><User className="size-6 text-primary" /> Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* প্রোফাইল পিকচার সেকশন */}
            <div className="flex items-center gap-6 pb-6 border-b">
              <div 
                className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-primary/20 cursor-pointer group shadow-lg"
                onClick={() => fileInputRef.current?.click()}
              >
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-primary/10 flex items-center justify-center text-4xl font-bold text-primary">
                    {session?.name.charAt(0)}
                  </div>
                )}
                {/* হোভার করলে ক্যামেরা আইকন দেখাবে */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  {uploading ? <Loader2 className="size-8 text-white animate-spin" /> : <Camera className="size-8 text-white" />}
                </div>
              </div>
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
              
              <div>
                <h2 className="text-2xl font-bold">{session?.name}</h2>
                <p className="text-sm text-muted-foreground capitalize flex items-center gap-1 mt-1">
                  <Shield className="size-4" /> {session?.role} Account
                </p>
                <p className="text-xs text-muted-foreground mt-2">Click the picture to update your photo.</p>
              </div>
            </div>
            
            {/* অন্যান্য তথ্য */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-muted-foreground">Username/ID</span>
                <p className="font-semibold">
                  {session?.role === "student" ? (currentUser as any)?.roll : 
                   session?.role === "teacher" ? (currentUser as any)?.teacherId : 
                   (currentUser as any)?.adminCode}
                </p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Department</span>
                <p className="font-semibold">{(currentUser as any)?.department || "N/A"}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Phone</span>
                <p className="font-semibold">{(currentUser as any)?.phone || "N/A"}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Address</span>
                <p className="font-semibold">{(currentUser as any)?.address || "N/A"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}