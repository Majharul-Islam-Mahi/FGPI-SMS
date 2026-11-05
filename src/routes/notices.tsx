import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { actions, useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/notices")({
  component: Notices,
});

function Notices() {
  const { notices, session } = useStore();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !session) return;
    actions.addNotice({ id: `n${Date.now()}`, title, content, date: new Date().toISOString().split("T")[0], author: session.name });
    setTitle(""); setContent("");
    toast.success("Notice added!");
  };

  const canPost = session?.role === "admin" || session?.role === "teacher";

  return (
    <AppShell title="Notice Board · নোটিশ">
      {canPost && (
        <form onSubmit={submit} className="mb-6 bg-card border p-4 rounded-lg shadow-sm space-y-3">
          <Input placeholder="Notice Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Input placeholder="Notice Details" value={content} onChange={(e) => setContent(e.target.value)} />
          <Button type="submit">Post Notice</Button>
        </form>
      )}
      <div className="space-y-4">
        {notices.map((n) => (
          <div key={n.id} className="bg-card border p-5 rounded-lg shadow-sm border-l-4 border-l-primary">
            <div className="font-bold text-lg">{n.title}</div>
            <div className="text-gray-600 mt-1">{n.content}</div>
            <div className="text-xs text-muted-foreground mt-3">Posted by {n.author} on {n.date}</div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}