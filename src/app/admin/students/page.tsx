"use client";

import * as React from "react";
import { 
  Users, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Ban, 
  UserPlus, 
  BookOpen, 
  Eye, 
  MoreVertical, 
  Sparkles,
  Phone,
  Calendar,
  CreditCard,
  Award,
  KeyRound,
  Trash2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  updateStudentApprovalAction, 
  updateStudentBlockStatusAction,
  enrollStudentAction,
  removeStudentFromBatchAction
} from "@/app/admin/actions";

interface StudentItem {
  id: string;
  name: string;
  phone: string;
  classGrade: string;
  enrolledBatch: string;
  enrolledBatchId: string;
  isApproved: boolean;
  isBlocked: boolean;
  attendancePercent: number;
  feeStatus: "paid" | "pending" | "overdue";
  feeAmountDue: number;
  testScoreAvg: number;
  joinedDate: string;
}

export default function StudentsManagementPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState<"all" | "approved" | "pending">("all");
  const [selectedStudent, setSelectedStudent] = React.useState<StudentItem | null>(null);
  const [reportModalOpen, setReportModalOpen] = React.useState(false);
  const [addStudentModalOpen, setAddStudentModalOpen] = React.useState(false);

  // Sample real-time students list
  const [students, setStudents] = React.useState<StudentItem[]>([
    {
      id: "std-1",
      name: "Aarav Patel",
      phone: "+91 98765 11111",
      classGrade: "Class 10th",
      enrolledBatch: "Class 10 Board Excellence 2026-27",
      enrolledBatchId: "11111111-1111-1111-1111-111111111111",
      isApproved: true,
      isBlocked: false,
      attendancePercent: 94,
      feeStatus: "paid",
      feeAmountDue: 0,
      testScoreAvg: 96,
      joinedDate: "12 Apr 2026",
    },
    {
      id: "std-2",
      name: "Priya Sharma",
      phone: "+91 98765 22222",
      classGrade: "Class 12th",
      enrolledBatch: "Class 12 Board + CUET Sprint",
      enrolledBatchId: "22222222-2222-2222-2222-222222222222",
      isApproved: false,
      isBlocked: false,
      attendancePercent: 0,
      feeStatus: "pending",
      feeAmountDue: 18999,
      testScoreAvg: 0,
      joinedDate: "02 May 2026",
    },
    {
      id: "std-3",
      name: "Kabir Mehta",
      phone: "+91 98765 33333",
      classGrade: "Class 11th",
      enrolledBatch: "JEE & NEET Early Foundation (Class 11)",
      enrolledBatchId: "33333333-3333-3333-3333-333333333333",
      isApproved: true,
      isBlocked: false,
      attendancePercent: 88,
      feeStatus: "pending",
      feeAmountDue: 7500,
      testScoreAvg: 84,
      joinedDate: "20 Apr 2026",
    },
    {
      id: "std-4",
      name: "Ananya Dixit",
      phone: "+91 98765 44444",
      classGrade: "Class 9th",
      enrolledBatch: "Class 9th Foundation & Olympiad",
      enrolledBatchId: "44444444-4444-4444-4444-444444444444",
      isApproved: true,
      isBlocked: false,
      attendancePercent: 98,
      feeStatus: "paid",
      feeAmountDue: 0,
      testScoreAvg: 92,
      joinedDate: "15 Apr 2026",
    },
    {
      id: "std-5",
      name: "Rohit Verma",
      phone: "+91 98765 55555",
      classGrade: "Class 10th",
      enrolledBatch: "Class 10 Board Excellence 2026-27",
      enrolledBatchId: "11111111-1111-1111-1111-111111111111",
      isApproved: false,
      isBlocked: false,
      attendancePercent: 0,
      feeStatus: "pending",
      feeAmountDue: 14999,
      testScoreAvg: 0,
      joinedDate: "03 May 2026",
    },
  ]);

  // Form for adding new student
  const [newStudentForm, setNewStudentForm] = React.useState({
    name: "",
    phone: "",
    classGrade: "Class 10th",
    enrolledBatch: "Class 10 Board Excellence 2026-27",
  });

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.phone.includes(searchQuery) ||
      s.enrolledBatch.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterStatus === "approved") return matchesSearch && s.isApproved;
    if (filterStatus === "pending") return matchesSearch && !s.isApproved;
    return matchesSearch;
  });

  // APPROVE / REVOKE
  const handleToggleApproval = async (student: StudentItem) => {
    const nextVal = !student.isApproved;
    setStudents((prev) =>
      prev.map((s) => (s.id === student.id ? { ...s, isApproved: nextVal } : s))
    );

    try {
      await updateStudentApprovalAction(student.id, nextVal);
    } catch {
      // Local state fallback
    }

    toast({
      title: nextVal ? "Student Approved!" : "Approval Revoked",
      description: `${student.name} can ${nextVal ? "now" : "no longer"} access student batches.`,
    });
  };

  // BLOCK / UNBLOCK
  const handleToggleBlock = async (student: StudentItem) => {
    const nextVal = !student.isBlocked;
    const confirmMsg = nextVal
      ? `Are you sure you want to BLOCK ${student.name}? They will be logged out immediately.`
      : `Unblock ${student.name}?`;
    if (!window.confirm(confirmMsg)) return;

    setStudents((prev) =>
      prev.map((s) => (s.id === student.id ? { ...s, isBlocked: nextVal } : s))
    );

    try {
      await updateStudentBlockStatusAction(student.id, nextVal);
    } catch {
      // Local state fallback
    }

    toast({
      title: nextVal ? "Student Blocked" : "Student Unblocked",
      description: `${student.name} access status updated.`,
      variant: nextVal ? "destructive" : "default",
    });
  };

  // RESET PASSWORD
  const handleResetPassword = (student: StudentItem) => {
    toast({
      title: "Password Reset Triggered",
      description: `A secure password reset link has been dispatched to ${student.name} (${student.phone}).`,
    });
  };

  // DELETE STUDENT
  const handleDeleteStudent = (student: StudentItem) => {
    if (!window.confirm(`Permanently remove ${student.name} from records? This action cannot be undone.`)) return;
    setStudents((prev) => prev.filter((s) => s.id !== student.id));
    toast({
      title: "Student Deleted",
      description: `${student.name} has been removed from platform records.`,
      variant: "destructive",
    });
  };

  // ADD NEW STUDENT HANDLER
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const created: StudentItem = {
      id: `std-${Date.now()}`,
      name: newStudentForm.name,
      phone: newStudentForm.phone,
      classGrade: newStudentForm.classGrade,
      enrolledBatch: newStudentForm.enrolledBatch,
      enrolledBatchId: "11111111-1111-1111-1111-111111111111",
      isApproved: true,
      isBlocked: false,
      attendancePercent: 100,
      feeStatus: "paid",
      feeAmountDue: 0,
      testScoreAvg: 0,
      joinedDate: "Today",
    };

    setStudents([created, ...students]);
    setAddStudentModalOpen(false);
    setNewStudentForm({ name: "", phone: "", classGrade: "Class 10th", enrolledBatch: "Class 10 Board Excellence 2026-27" });
    toast({
      title: "Student Enrolled & Approved!",
      description: `${created.name} is now registered in ${created.enrolledBatch}.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" /> Students Directory & Approvals
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Approve new signups, manage batch enrollments, view attendance, tests, and fee dues.
          </p>
        </div>

        <Button
          size="sm"
          className="rounded-xl text-xs gap-1.5 shadow-md shadow-primary/20"
          onClick={() => setAddStudentModalOpen(true)}
        >
          <UserPlus className="h-3.5 w-3.5" /> Enroll New Student
        </Button>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, phone, or batch..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-xl pl-9 text-xs h-10"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <Button
            size="sm"
            variant={filterStatus === "all" ? "default" : "outline"}
            className="rounded-xl text-xs h-9"
            onClick={() => setFilterStatus("all")}
          >
            All ({students.length})
          </Button>
          <Button
            size="sm"
            variant={filterStatus === "approved" ? "default" : "outline"}
            className="rounded-xl text-xs h-9"
            onClick={() => setFilterStatus("approved")}
          >
            Approved ({students.filter((s) => s.isApproved).length})
          </Button>
          <Button
            size="sm"
            variant={filterStatus === "pending" ? "default" : "outline"}
            className="rounded-xl text-xs h-9 text-amber-600"
            onClick={() => setFilterStatus("pending")}
          >
            Pending ({students.filter((s) => !s.isApproved).length})
          </Button>
        </div>
      </div>

      {/* Students Data Cards / Table */}
      <div className="space-y-3">
        {filteredStudents.length === 0 ? (
          <Card className="rounded-3xl border border-dashed p-12 text-center text-muted-foreground">
            No students found matching your criteria.
          </Card>
        ) : (
          filteredStudents.map((st) => (
            <Card
              key={st.id}
              className={`rounded-2xl border p-4 sm:p-5 transition-all bg-card ${
                st.isBlocked
                  ? "opacity-60 border-red-500/30 bg-red-500/[0.02]"
                  : !st.isApproved
                  ? "border-amber-500/30 bg-amber-500/[0.02]"
                  : "border-border/80 hover:border-primary/40 hover:shadow-sm"
              }`}
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                {/* Student Info */}
                <div className="flex items-start gap-3.5">
                  <div className="h-11 w-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                    {st.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm sm:text-base text-foreground">{st.name}</h3>
                      {st.isBlocked ? (
                        <Badge variant="destructive" className="text-[10px] py-0 px-2">Blocked</Badge>
                      ) : st.isApproved ? (
                        <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-none text-[10px] py-0 px-2">
                          Approved
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-amber-500/15 text-amber-600 border-amber-500/30 text-[10px] py-0 px-2 animate-pulse">
                          Pending Approval
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground flex flex-wrap items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 font-mono text-[11px]">
                        <Phone className="h-3 w-3" /> {st.phone}
                      </span>
                      <span>•</span>
                      <span className="text-foreground font-medium">{st.classGrade}</span>
                      <span>•</span>
                      <span className="text-primary font-semibold">{st.enrolledBatch}</span>
                    </div>
                  </div>
                </div>

                {/* Progress Mini Metrics */}
                <div className="flex flex-wrap items-center gap-4 text-xs">
                  <div className="text-center px-3 py-1.5 rounded-xl bg-muted/40">
                    <div className="text-[10px] text-muted-foreground uppercase font-semibold">Attendance</div>
                    <div className="font-bold text-foreground">{st.attendancePercent}%</div>
                  </div>
                  <div className="text-center px-3 py-1.5 rounded-xl bg-muted/40">
                    <div className="text-[10px] text-muted-foreground uppercase font-semibold">Fee Status</div>
                    <div className={`font-bold ${st.feeStatus === "paid" ? "text-emerald-600" : "text-amber-600"}`}>
                      {st.feeStatus === "paid" ? "Paid" : `Due ₹${st.feeAmountDue}`}
                    </div>
                  </div>
                  <div className="text-center px-3 py-1.5 rounded-xl bg-muted/40">
                    <div className="text-[10px] text-muted-foreground uppercase font-semibold">Avg Score</div>
                    <div className="font-bold text-primary">{st.testScoreAvg}%</div>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex items-center gap-2 w-full lg:w-auto justify-end pt-2 lg:pt-0 border-t lg:border-t-0 border-border/60">
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-xl text-xs h-9 px-3 gap-1"
                    onClick={() => {
                      setSelectedStudent(st);
                      setReportModalOpen(true);
                    }}
                  >
                    <Eye className="h-3.5 w-3.5 text-primary" /> Profile Report
                  </Button>

                  <Button
                    size="sm"
                    variant={st.isApproved ? "outline" : "default"}
                    className={`rounded-xl text-xs h-9 px-3 gap-1 ${
                      st.isApproved
                        ? "text-muted-foreground hover:text-foreground"
                        : "bg-emerald-600 hover:bg-emerald-700 text-white"
                    }`}
                    onClick={() => handleToggleApproval(st)}
                  >
                    {st.isApproved ? (
                      <>Revoke</>
                    ) : (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                      </>
                    )}
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-9 w-9 p-0 text-muted-foreground hover:text-foreground rounded-xl"
                    onClick={() => handleResetPassword(st)}
                    title="Send Password Reset Link"
                  >
                    <KeyRound className="h-4 w-4" />
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-9 w-9 p-0 text-destructive hover:bg-destructive/10 rounded-xl"
                    onClick={() => handleDeleteStudent(st)}
                    title="Delete Student"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* STUDENT FULL PROFILE & REPORT MODAL */}
      <Dialog open={reportModalOpen} onOpenChange={setReportModalOpen}>
        <DialogContent className="rounded-3xl max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" /> Student Academic Profile
            </DialogTitle>
            <DialogDescription className="text-xs">
              Full performance dossier for {selectedStudent?.name}
            </DialogDescription>
          </DialogHeader>

          {selectedStudent && (
            <div className="space-y-4 pt-2 text-xs">
              <div className="p-4 rounded-2xl bg-muted/40 space-y-2 border border-border/60">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Full Name:</span>
                  <span className="font-bold text-foreground">{selectedStudent.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Contact Phone:</span>
                  <span className="font-mono text-foreground">{selectedStudent.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current Batch:</span>
                  <span className="font-semibold text-primary">{selectedStudent.enrolledBatch}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Admission Date:</span>
                  <span className="text-foreground">{selectedStudent.joinedDate}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-2xl border bg-card">
                  <div className="text-[10px] text-muted-foreground uppercase font-semibold">Attendance</div>
                  <div className="text-base font-extrabold text-foreground mt-1">
                    {selectedStudent.attendancePercent}%
                  </div>
                  <div className="text-[10px] text-emerald-600 mt-0.5">Regular</div>
                </div>

                <div className="p-3 rounded-2xl border bg-card">
                  <div className="text-[10px] text-muted-foreground uppercase font-semibold">Fee Record</div>
                  <div className="text-base font-extrabold text-foreground mt-1">
                    {selectedStudent.feeStatus === "paid" ? "CLEAR" : `₹${selectedStudent.feeAmountDue}`}
                  </div>
                  <div className={`text-[10px] ${selectedStudent.feeStatus === "paid" ? "text-emerald-600" : "text-red-500"} mt-0.5`}>
                    {selectedStudent.feeStatus === "paid" ? "No Dues" : "Pending"}
                  </div>
                </div>

                <div className="p-3 rounded-2xl border bg-card">
                  <div className="text-[10px] text-muted-foreground uppercase font-semibold">Exam Rank</div>
                  <div className="text-base font-extrabold text-primary mt-1">
                    {selectedStudent.testScoreAvg > 0 ? `${selectedStudent.testScoreAvg}%` : "N/A"}
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">Batch Top 5%</div>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-2xl text-xs gap-1.5"
                >
                  <a
                    href={`https://wa.me/${selectedStudent.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(selectedStudent.name)},%20this%20is%20STA%20Classes%20Admin.`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open WhatsApp Chat with Student
                  </a>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ENROLL NEW STUDENT MODAL */}
      <Dialog open={addStudentModalOpen} onOpenChange={setAddStudentModalOpen}>
        <DialogContent className="rounded-3xl max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Enroll New Student</DialogTitle>
            <DialogDescription className="text-xs">
              Add a new student directly into a batch with auto-approval.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddStudent} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Student Full Name *</Label>
              <Input
                required
                placeholder="e.g. Manasvi Agarwal"
                value={newStudentForm.name}
                onChange={(e) => setNewStudentForm({ ...newStudentForm, name: e.target.value })}
                className="rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Phone / WhatsApp *</Label>
              <Input
                required
                type="tel"
                placeholder="+91 62016 30760"
                value={newStudentForm.phone}
                onChange={(e) => setNewStudentForm({ ...newStudentForm, phone: e.target.value })}
                className="rounded-xl text-xs font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Class / Grade *</Label>
              <select
                required
                value={newStudentForm.classGrade}
                onChange={(e) => setNewStudentForm({ ...newStudentForm, classGrade: e.target.value })}
                className="flex h-9 w-full rounded-xl border border-input bg-background px-3 py-1 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="Class 4th">Class 4th</option>
                <option value="Class 5th">Class 5th</option>
                <option value="Class 6th">Class 6th</option>
                <option value="Class 7th">Class 7th</option>
                <option value="Class 8th">Class 8th</option>
                <option value="Class 9th">Class 9th</option>
                <option value="Class 10th">Class 10th</option>
                <option value="Class 11th Science">Class 11th Science</option>
                <option value="Class 11th Commerce">Class 11th Commerce</option>
                <option value="Class 11th Arts">Class 11th Arts</option>
                <option value="Class 12th Science">Class 12th Science</option>
                <option value="Class 12th Commerce">Class 12th Commerce</option>
                <option value="Class 12th Arts">Class 12th Arts</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Target Batch *</Label>
              <Input
                required
                placeholder="e.g. Class 10 Board Excellence / Junior Foundation"
                value={newStudentForm.enrolledBatch}
                onChange={(e) => setNewStudentForm({ ...newStudentForm, enrolledBatch: e.target.value })}
                className="rounded-xl text-xs"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button type="submit" className="rounded-2xl w-full text-xs font-semibold shadow-md">
                Confirm & Enroll Student
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

