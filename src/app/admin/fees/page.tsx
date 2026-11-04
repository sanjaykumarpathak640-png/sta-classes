"use client";

import * as React from "react";
import { 
  CreditCard, 
  Plus, 
  MessageCircle, 
  CheckCircle2, 
  Clock, 
  Search, 
  ExternalLink,
  DollarSign
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { recordFeePaymentAction } from "@/app/admin/actions";

interface FeeItem {
  id: string;
  studentName: string;
  phone: string;
  batchName: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: "paid" | "pending" | "overdue";
  paymentMode: string;
}

export default function FeesAdminPage() {
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const [feesList, setFeesList] = React.useState<FeeItem[]>([
    {
      id: "fee-1",
      studentName: "Aarav Patel",
      phone: "+91 98765 11111",
      batchName: "Class 10 Board Excellence",
      amount: 14999,
      dueDate: "15 Apr 2026",
      paidDate: "14 Apr 2026",
      status: "paid",
      paymentMode: "UPI / PhonePe",
    },
    {
      id: "fee-2",
      studentName: "Priya Sharma",
      phone: "+91 98765 22222",
      batchName: "Class 12th PCM",
      amount: 18999,
      dueDate: "20 Apr 2026",
      status: "overdue",
      paymentMode: "Pending",
    },
    {
      id: "fee-3",
      studentName: "Kabir Mehta",
      phone: "+91 98765 33333",
      batchName: "JEE Foundation",
      amount: 7500,
      dueDate: "10 May 2026",
      status: "pending",
      paymentMode: "Pending Installment",
    },
    {
      id: "fee-4",
      studentName: "Ananya Dixit",
      phone: "+91 98765 44444",
      batchName: "Class 9th Foundation",
      amount: 12999,
      dueDate: "15 Apr 2026",
      paidDate: "15 Apr 2026",
      status: "paid",
      paymentMode: "Cash Receipt #481",
    },
  ]);

  const [form, setForm] = React.useState({
    studentName: "",
    phone: "",
    batchName: "Class 10 Board Excellence",
    amount: 14999,
    dueDate: "2026-05-15",
  });

  const handleMarkPaid = (id: string, name: string) => {
    setFeesList(
      feesList.map((f) =>
        f.id === id
          ? { ...f, status: "paid", paidDate: "Today", paymentMode: "UPI / Cash Recorded" }
          : f
      )
    );
    toast({ title: "Payment Recorded!", description: `Fee of ${name} marked as PAID.` });
  };

  const handleAddFee = (e: React.FormEvent) => {
    e.preventDefault();
    const created: FeeItem = {
      id: `fee-${Date.now()}`,
      studentName: form.studentName,
      phone: form.phone,
      batchName: form.batchName,
      amount: Number(form.amount),
      dueDate: form.dueDate,
      status: "pending",
      paymentMode: "Pending",
    };
    setFeesList([created, ...feesList]);
    setModalOpen(false);
    setForm({ studentName: "", phone: "", batchName: "Class 10 Board Excellence", amount: 14999, dueDate: "2026-05-15" });
    toast({ title: "Fee Record Created!", description: `Due ₹${created.amount} for ${created.studentName}` });
  };

  const totalCollected = feesList
    .filter((f) => f.status === "paid")
    .reduce((acc, f) => acc + f.amount, 0);

  const totalPending = feesList
    .filter((f) => f.status !== "paid")
    .reduce((acc, f) => acc + f.amount, 0);

  const filtered = feesList.filter(
    (f) =>
      f.studentName.toLowerCase().includes(search.toLowerCase()) ||
      f.phone.includes(search) ||
      f.batchName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-primary" /> Fees Ledger & WhatsApp Reminders
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Track tuition installments, mark cash/UPI receipts, and dispatch 1-click WhatsApp reminders.
          </p>
        </div>

        <Button
          size="sm"
          className="rounded-xl text-xs gap-1.5 shadow-md shadow-primary/20"
          onClick={() => setModalOpen(true)}
        >
          <Plus className="h-3.5 w-3.5" /> Add Fee Due Record
        </Button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="rounded-2xl border border-border/80 p-5 bg-card">
          <span className="text-xs font-semibold text-muted-foreground">Total Fee Collected</span>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">
            ₹{totalCollected.toLocaleString("en-IN")}
          </div>
          <span className="text-[10px] text-muted-foreground">All clear receipts</span>
        </Card>

        <Card className="rounded-2xl border border-border/80 p-5 bg-card">
          <span className="text-xs font-semibold text-muted-foreground">Pending / Due Collections</span>
          <div className="text-2xl font-extrabold text-amber-600 mt-1">
            ₹{totalPending.toLocaleString("en-IN")}
          </div>
          <span className="text-[10px] text-muted-foreground">{feesList.filter((f) => f.status !== "paid").length} students pending</span>
        </Card>

        <Card className="rounded-2xl border border-border/80 p-5 bg-card">
          <span className="text-xs font-semibold text-muted-foreground">Payment Modes</span>
          <div className="text-sm font-bold text-foreground mt-2 space-y-1">
            <div className="flex justify-between text-xs"><span>UPI / Online:</span><span className="font-mono">75%</span></div>
            <div className="flex justify-between text-xs"><span>Cash Counter:</span><span className="font-mono">25%</span></div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <div className="w-full sm:w-80">
        <Input
          placeholder="Search student or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-xl text-xs h-10"
        />
      </div>

      {/* Fees List */}
      <div className="space-y-3">
        {filtered.map((item) => {
          const rawPhone = item.phone.replace(/[^0-9]/g, "");
          const whatsappReminderMessage = `Dear Parent, this is an academic reminder from STA Classes regarding tuition fee for ${item.studentName} (${item.batchName}). An amount of Rs. ${item.amount} is due by ${item.dueDate}. Kindly clear the dues via UPI or at campus office. Thank you!`;
          const whatsappUrl = `https://wa.me/${rawPhone}?text=${encodeURIComponent(whatsappReminderMessage)}`;

          return (
            <Card
              key={item.id}
              className={`rounded-2xl border p-4 sm:p-5 bg-card flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 ${
                item.status === "paid" ? "border-border/80" : "border-amber-500/30 bg-amber-500/[0.02]"
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm sm:text-base text-foreground">{item.studentName}</h4>
                  {item.status === "paid" ? (
                    <Badge className="bg-emerald-500/10 text-emerald-600 border-none text-[10px]">
                      PAID
                    </Badge>
                  ) : item.status === "overdue" ? (
                    <Badge variant="destructive" className="text-[10px]">
                      OVERDUE
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/30 text-[10px]">
                      DUE SOON
                    </Badge>
                  )}
                </div>

                <div className="text-xs text-muted-foreground flex flex-wrap items-center gap-3 mt-1">
                  <span className="font-mono text-[11px]">{item.phone}</span>
                  <span>•</span>
                  <span className="text-primary font-medium">{item.batchName}</span>
                  <span>•</span>
                  <span>Due: {item.dueDate}</span>
                  {item.paidDate && <span className="text-emerald-600 font-semibold">• Paid: {item.paidDate}</span>}
                </div>
              </div>

              <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end pt-2 lg:pt-0 border-t lg:border-t-0 border-border/60">
                <div className="text-right mr-2">
                  <div className="text-base font-extrabold text-foreground">
                    ₹{item.amount.toLocaleString("en-IN")}
                  </div>
                  <div className="text-[10px] text-muted-foreground">{item.paymentMode}</div>
                </div>

                {item.status !== "paid" && (
                  <>
                    <Button asChild size="sm" variant="outline" className="rounded-xl text-xs h-9 px-3 gap-1.5 border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/10">
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="h-3.5 w-3.5" /> WhatsApp Reminder
                      </a>
                    </Button>

                    <Button
                      size="sm"
                      className="rounded-xl text-xs h-9 px-3 bg-emerald-600 hover:bg-emerald-700 text-white"
                      onClick={() => handleMarkPaid(item.id, item.studentName)}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Mark Paid
                    </Button>
                  </>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* CREATE FEE MODAL */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="rounded-3xl max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Add Fee Due Entry</DialogTitle>
            <DialogDescription className="text-xs">
              Record a fee schedule for student tuition.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddFee} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Student Name *</Label>
              <Input
                required
                placeholder="Student name"
                value={form.studentName}
                onChange={(e) => setForm({ ...form, studentName: e.target.value })}
                className="rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Phone Number (with WhatsApp) *</Label>
              <Input
                required
                type="tel"
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="rounded-xl text-xs font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Fee Amount (₹) *</Label>
                <Input
                  type="number"
                  required
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
                  className="rounded-xl text-xs font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Due Date</Label>
                <Input
                  type="date"
                  required
                  value={form.dueDate}
                  onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                  className="rounded-xl text-xs font-mono"
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" className="rounded-2xl w-full text-xs font-semibold shadow-md">
                Create Fee Due Record
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

