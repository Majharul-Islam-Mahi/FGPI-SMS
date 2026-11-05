import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserPlus, Briefcase, Hotel, Book, Bus, MessageSquare, IdCard } from "lucide-react";

export const Route = createFileRoute("/future")({
  component: FuturePage,
});

function FuturePage() {
  return (
    <AppShell title="Advanced Modules · উন্নত মডিউল">
      <Tabs defaultValue="admission" className="w-full">
        <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent mb-6">
          <TabsTrigger value="admission" className="data-[state=active]:bg-primary data-[state=active]:text-white"><UserPlus className="size-4 mr-2"/> Admission</TabsTrigger>
          <TabsTrigger value="faculty" className="data-[state=active]:bg-primary data-[state=active]:text-white"><Briefcase className="size-4 mr-2"/> Faculty</TabsTrigger>
          <TabsTrigger value="hostel" className="data-[state=active]:bg-primary data-[state=active]:text-white"><Hotel className="size-4 mr-2"/> Hostel</TabsTrigger>
          <TabsTrigger value="library" className="data-[state=active]:bg-primary data-[state=active]:text-white"><Book className="size-4 mr-2"/> Library</TabsTrigger>
          <TabsTrigger value="transport" className="data-[state=active]:bg-primary data-[state=active]:text-white"><Bus className="size-4 mr-2"/> Transport</TabsTrigger>
          <TabsTrigger value="sms" className="data-[state=active]:bg-primary data-[state=active]:text-white"><MessageSquare className="size-4 mr-2"/> SMS Alerts</TabsTrigger>
          <TabsTrigger value="idcard" className="data-[state=active]:bg-primary data-[state=active]:text-white"><IdCard className="size-4 mr-2"/> ID Card</TabsTrigger>
        </TabsList>

        {/* ১. Admission */}
        <TabsContent value="admission">
          <Card>
            <CardHeader>
              <CardTitle>Admission Application</CardTitle>
              <CardDescription>Online application for new students.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-w-lg">
              <Input placeholder="Applicant Name" />
              <Input placeholder="Email Address" />
              <Input placeholder="Previous GPA" />
              <Button className="w-full">Submit Application</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ২. Faculty */}
        <TabsContent value="faculty">
          <Card>
            <CardHeader><CardTitle>Faculty Directory</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Department</TableHead><TableHead>Assigned Course</TableHead></TableRow></TableHeader>
                <TableBody>
                  <TableRow><TableCell>Md. Karim</TableCell><TableCell>CST</TableCell><TableCell>Data Structure</TableCell></TableRow>
                  <TableRow><TableCell>Nusrat Jahan</TableCell><TableCell>Civil</TableCell><TableCell>Surveying</TableCell></TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ৩. Hostel */}
        <TabsContent value="hostel">
          <Card>
            <CardHeader><CardTitle>Hostel Rooms</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg text-center"><h4 className="font-bold">Room 101</h4><Badge>Available</Badge></div>
                <div className="p-4 border rounded-lg text-center"><h4 className="font-bold">Room 102</h4><Badge variant="destructive">Full</Badge></div>
                <div className="p-4 border rounded-lg text-center"><h4 className="font-bold">Room 103</h4><Badge>Available</Badge></div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ৪. Library */}
        <TabsContent value="library">
          <Card>
            <CardHeader><CardTitle>Library Books</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Book Title</TableHead><TableHead>Author</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                <TableBody>
                  <TableRow><TableCell>Physics 1st Paper</TableCell><TableCell>Dr. Shahjahan</TableCell><TableCell><Badge>Available</Badge></TableCell></TableRow>
                  <TableRow><TableCell>Mathematics</TableCell><TableCell>S. Chowdhury</TableCell><TableCell><Badge variant="secondary">Issued</Badge></TableCell></TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ৫. Transport */}
        <TabsContent value="transport">
          <Card>
            <CardHeader><CardTitle>Bus Routes</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <div className="p-3 border rounded flex justify-between"><span>Route A (Feni Sadar)</span><Badge>Bus 1</Badge></div>
              <div className="p-3 border rounded flex justify-between"><span>Route B (Chhagalnaiya)</span><Badge>Bus 2</Badge></div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ৬. SMS */}
        <TabsContent value="sms">
          <Card>
            <CardHeader><CardTitle>Send SMS Alert</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Target (e.g., All Students)" />
              <textarea className="w-full border p-3 rounded-md h-24" placeholder="Type your message here..." />
              <Button>Send SMS</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ৭. ID Card */}
        <TabsContent value="idcard">
          <Card>
            <CardHeader><CardTitle>Student ID Card Preview</CardTitle></CardHeader>
            <CardContent className="flex justify-center p-8">
              <div className="w-80 bg-gradient-to-br from-primary to-[#02140D] text-white p-6 rounded-xl shadow-2xl relative">
                <div className="text-xs opacity-70 mb-4">Feni Govt Polytechnic Institute</div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white"></div>
                  <div>
                    <h3 className="font-bold text-lg">Majharul Islam</h3>
                    <p className="text-sm opacity-80">Roll: 878656</p>
                    <p className="text-xs opacity-60">Dept: CST | Sem: 7</p>
                  </div>
                </div>
                <div className="mt-6 flex justify-between items-end">
                  <Badge className="bg-white text-black font-bold">Valid Student</Badge>
                  <div className="w-12 h-12 bg-white"></div> {/* QR Placeholder */}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </AppShell>
  );
}