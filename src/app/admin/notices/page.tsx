"use client";

import * as React from "react";
import { 
  Bell, 
  Plus, 
  Trash2, 
  Pin, 
  Send, 
  Sparkles, 
  Calendar,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { broadcastNoticeAction, deleteNoticeAction } from "@/app/admin/actions";

interface NoticeItem {
  id: string;
  title: string;
  body: string;
  batchName: string;
  isPinned: boolean;
  date: string;
}

export default function NoticesAdminPage() {
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = React.useState(false);

  const [notices, setNotices] = React.useState<NoticeItem[]>([
    {
      id: "n-1",
      title: "Admissions Open for Academic Session 2026-27",
      body: "Orientation batches for Class 9, 10, 11, and 12 begin this month. Early registration discount is valid till 10th May.",
      batchName: "All Batches (Public Broadcast)",
      isPinned: true,
      date: "04 May 2026",
    },
    {
      id: "n-2",
      title: "Class 10 Science Sample Paper Drill Announced",
      body: "Weekly subjective answer-writing test will be conducted this Sunday from 10:00 AM to 1:00 PM at Main Academic Hall.",
      batchName: "Class 10 Board Excellence",
      isPinned: true,
      date: "02 May 2026",
    },
    {
      id: "n-3",
      title: "STA Talent Scholarship Test (STST) Schedule",
      body: "Eligible students can appear for the 100% tuition fee waiver test on 18th May. Collect hall tickets from campus desk.",
      batchName: "All Batches (Public Broadcast)",
      isPinned: false,
      date: "28 Apr 2026",
    },
  ]);

  const [form, setForm] = React.useState({
    title: "",
    body: "",
    batchName: "All Batches (Public Broadcast)",
    isPinned: false,
  });

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    const created: NoticeItem = {
      id: `n-${Date.now()}`,
      title: form.title,
      body: form.body,
      batchName: form.batchName,
      isPinned: form.isPinned,
      date: "Today",
    };

    setNotices([created, ...notices]);
    setModalOpen(false);
    setForm({ title: "", body: "", batchName: "All Batches (Public Broadcast)", isPinned: false });
    toast({ title: "Notice Broadcasted!", description: created.title });
  };

  const handleDeleteNotice = (id: string, title: string) => {
    if (!window.confirm(`Delete announcement "${title}"?`)) return;
    setNotices(notices.filter((n) => n.id !== id));
    toast({ title: "Notice Deleted", description: title });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Bell className="h-6 w-6 text-primary" /> Notice Board & Announcements
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Publish circulars, test schedules, and important alerts across web, PWA, and student apps.
          </p>
        </div>

        <Button
          size="sm"
          className="rounded-xl text-xs gap-1.5 shadow-md shadow-primary/20"
          onClick={() => setModalOpen(true)}
        >
          <Plus className="h-3.5 w-3.5" /> Broadcast Notice
        </Button>
      </div>

      {/* Notices Feed */}
      <div className="space-y-4 max-w-4xl">
        {notices.map((item) => (
          <Card
            key={item.id}
            className={`rounded-3xl border p-5 sm:p-6 bg-card shadow-sm space-y-3 ${
              item.isPinned ? "border-primary/40 bg-primary/[0.02]" : "border-border/80"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="rounded-lg text-[10px] font-semibold text-primary">
                    {item.batchName}
                  </Badge>
                  {item.isPinned && (
                    <Badge className="bg-primary text-primary-foreground border-none text-[9px] flex items-center gap-1">
                      <Pin className="h-2.5 w-2.5" /> Pinned
                    </Badge>
                  )}
                </div>
                <h3 className="font-bold text-base text-foreground leading-snug">{item.title}</h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground font-mono">{item.date}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-destructive hover:bg-destructive/10 rounded-xl"
                  onClick={() => handleDeleteNotice(item.id, item.title)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {item.body}
            </p>
          </Card>
        ))}
      </div>

      {/* BROADCAST MODAL */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="rounded-3xl max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Broadcast Announcement</DialogTitle>
            <DialogDescription className="text-xs">
              Publish circular to all students or target a specific batch.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateNotice} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Target Audience / Batch *</Label>
              <Input
                required
                value={form.batchName}
                onChange={(e) => setForm({ ...form, batchName: e.target.value })}
                className="rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Notice Title *</Label>
              <Input
                required
                placeholder="e.g. Schedule for Monthly Assessment"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Notice Message *</Label>
              <Textarea
                required
                rows={4}
                placeholder="Write detailed circular message..."
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                className="rounded-xl text-xs"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="pinToggle"
                checked={form.isPinned}
                onChange={(e) => setForm({ ...form, isPinned: e.target.checked })}
                className="rounded h-4 w-4 text-primary"
              />
              <Label htmlFor="pinToggle" className="text-xs font-semibold cursor-pointer">
                Pin to top of notice board
              </Label>
            </div>

            <DialogFooter>
              <Button type="submit" className="rounded-2xl w-full text-xs font-semibold shadow-md gap-1.5">
                <Send className="h-3.5 w-3.5" /> Broadcast Now
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

