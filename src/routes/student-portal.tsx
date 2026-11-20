import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useStore, actions } from "@/lib/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, CalendarCheck, Award, BookOpen, CreditCard, FileText, FileQuestion } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export const Route = createFileRoute("/student-portal")({ component: StudentPortal });

function StudentPortal() {
  const { session, students, attendance, results, routines, fees, applications } = useStore();
  const me = students.find(s => s.id === session?.studentId);

  const [type, setType] = useState("Sick Leave");
  const [reason, setReason] = useState("");

  if (!me) return <AppShell title="Student Portal"><p>Please login as a student.</p></AppShell>;

  const myAttendance = attendance.filter(a => a.studentId === me.id);
  const myResults = results.filter(r => r.studentId === me.id);
  const myRoutine = routines.filter(r => r.department === me.department && r.semester === me.semester && r.shift === (me.shift || "Shift 1"));
  const myFees = fees.filter(f => f.studentId === me.id && f.status === "unpaid");
  const myApps = applications.filter(a => a.studentId === me.id);

  const handlePayment = () => {
    toast.success("Redirecting to Online Banking Gateway (Mock)...");
    setTimeout(() => toast.info("Payment Successful! Fee cleared."), 2000);
  };

  const submitApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason) return toast.error("Please write a reason!");
    actions.addApplication({ id: crypto.randomUUID(), studentId: me.id, type, reason, status: "pending", date: new Date().toISOString().split("T")[0] });
    setReason("");
    toast.success("Application submitted successfully!");
  };

  return (
    <AppShell title="My Portal · আমার পোর্টাল" roles={["student"]}>
      <div className="mb-6 bg-primary/5 border border-primary/20 p-6 rounded-xl flex items-center gap-6">
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center text-3xl font-bold text-primary">
          {me.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-primary">{me.name}</h2>
          <p className="text-muted-foreground">Roll: {me.roll} | Dept: {me.department} | Sem: {me.semester} | Shift: {me.shift || "Shift 1"}</p>
        </div>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent mb-6">
          <TabsTrigger value="profile"><User className="size-4 mr-2"/> Profile</TabsTrigger>
          <TabsTrigger value="attendance"><CalendarCheck className="size-4 mr-2"/> Attendance</TabsTrigger>
          <TabsTrigger value="results"><Award className="size-4 mr-2"/> Results</TabsTrigger>
          <TabsTrigger value="routine"><BookOpen className="size-4 mr-2"/> Routine</TabsTrigger>
          <TabsTrigger value="fees"><CreditCard className="size-4 mr-2"/> Exam Fees</TabsTrigger>
          <TabsTrigger value="applications"><FileQuestion className="size-4 mr-2"/> Applications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader><CardTitle>Personal & Academic Information</CardTitle></CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div><span className="text-sm text-muted-foreground">University ID:</span> <p className="font-semibold">FGPI-{me.roll}</p></div>
                <div><span className="text-sm text-muted-foreground">MIS ID:</span> <p className="font-semibold">{me.mis_id || "MIS-1001"}</p></div>
                <div><span className="text-sm text-muted-foreground">Phone:</span> <p className="font-semibold">{me.phone}</p></div>
              </div>
              <div className="space-y-4">
                <div><span className="text-sm text-muted-foreground">Scholarship Status:</span> <Badge>{me.scholarship_status || "None"}</Badge></div>
                <div><span className="text-sm text-muted-foreground">Backlog/Refard Status:</span> <Badge variant="secondary">{me.backlog_status || "Clear"}</Badge></div>
                <div>
                  <span className="text-sm text-muted-foreground">Admission Documents:</span> 
                  <div className="flex items-center gap-2 mt-1"><FileText className="size-4 text-primary" /> <a href="#" className="text-sm text-primary underline">{me.documents_url || "View Documents"}</a></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance">
          <Card>
            <CardHeader><CardTitle>Subject-wise Attendance</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Subject</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                <TableBody>
                  {myAttendance.map((a, i) => (
                    <TableRow key={i}>
                      <TableCell>{a.date}</TableCell>
                      <TableCell className="font-medium">{a.subject}</TableCell>
                      <TableCell><Badge variant={a.present ? "default" : "destructive"}>{a.present ? "Present" : "Absent"}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results">
          <Card>
            <CardHeader><CardTitle>BTEB Results</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Subject</TableHead><TableHead>Mid</TableHead><TableHead>Practical</TableHead><TableHead>Final</TableHead><TableHead>Total</TableHead></TableRow></TableHeader>
                <TableBody>
                  {myResults.map(r => {
                    const fail = r.marks < 40;
                    return (
                      <TableRow key={r.id} className={fail ? "bg-red-50/50" : ""}>
                        <TableCell className="font-medium">{r.subject}</TableCell>
                        <TableCell>{r.mid_term_marks || "-"}</TableCell>
                        <TableCell>{r.practical_marks || "-"}</TableCell>
                        <TableCell>{r.final_marks || "-"}</TableCell>
                        <TableCell className={fail ? "font-bold text-red-600" : "font-bold text-primary"}>{r.marks}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="routine">
          <Card>
            <CardHeader><CardTitle>Class Routine ({me.shift || "Shift 1"})</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {myRoutine.map(r => (
                  <div key={r.id} className="flex justify-between items-center p-3 bg-muted/30 rounded border">
                    <div><Badge className="mr-2">{r.day}</Badge> <span className="font-semibold">{r.subject}</span></div>
                    <div className="text-sm"><span className="font-mono text-primary">{r.time}</span> | Room: {r.room}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fees">
          <Card>
            <CardHeader><CardTitle>Exam Fees (Due)</CardTitle></CardHeader>
            <CardContent>
              {myFees.length === 0 ? <p className="text-muted-foreground">No due fees.</p> : (
                <div className="space-y-4">
                  {myFees.map(f => (
                    <div key={f.id} className="flex justify-between items-center p-4 border rounded-lg bg-red-50/50">
                      <div>
                        <p className="font-bold text-lg text-red-600">BDT {f.amount}</p>
                        <p className="text-sm text-muted-foreground">Due: {f.dueDate}</p>
                      </div>
                      <Button onClick={handlePayment} className="bg-primary">Pay via Online Banking</Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications">
          <Card className="mb-6">
            <CardHeader><CardTitle>Submit New Application</CardTitle><CardDescription>Apply for leave or certificates.</CardDescription></CardHeader>
            <CardContent>
              <form onSubmit={submitApp} className="flex flex-col md:flex-row gap-3">
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className="w-full md:w-48"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                    <SelectItem value="Personal Leave">Personal Leave</SelectItem>
                    <SelectItem value="Transcript Request">Transcript Request</SelectItem>
                    <SelectItem value="Certificate Request">Certificate Request</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Write your reason here..." value={reason} onChange={e => setReason(e.target.value)} className="flex-1" required />
                <Button type="submit">Submit</Button>
              </form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>My Applications</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Type</TableHead><TableHead>Reason</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                <TableBody>
                  {myApps.map(a => (
                    <TableRow key={a.id}>
                      <TableCell>{a.type}</TableCell>
                      <TableCell>{a.reason}</TableCell>
                      <TableCell>{a.date}</TableCell>
                      <TableCell><Badge variant={a.status === "approved" ? "default" : a.status === "rejected" ? "destructive" : "secondary"}>{a.status}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}