"use client";

import * as React from "react";
import { 
  Radio, 
  Plus, 
  Trash2, 
  Calendar, 
  Clock, 
  Video, 
  ExternalLink,
  CheckCircle2,
  AlertCircle
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
import { upsertLiveClassAction, deleteLiveClassAction } from "@/app/admin/actions";

interface LiveClassItem {
  id: string;
  batchName: string;
  title: string;
  meetingLink: string;
  meetingPlatform: string;
  date: string;
  time: string;
  recordingUrl?: string;
}

export default function LiveClassesAdminPage() {
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [classes, setClasses] = React.useState<LiveClassItem[]>([
    {
      id: "live-1",
      batchName: "Class 12th PCM",
      title: "Ray Optics Derivation Drill & Doubt Discussion",
      meetingLink: "https://meet.google.com/abc-defg-hij",
      meetingPlatform: "Google Meet",
      date: "Today, 05 May 2026",
      time: "05:00 PM – 06:30 PM",
    },
    {
      id: "live-2",
      batchName: "Class 10 Board Excellence",
      title: "Carbon & Its Compounds: Hydrocarbons & Nomenclature",
      meetingLink: "https://meet.google.com/xyz-uvwx-rst",
      meetingPlatform: "Google Meet",
      date: "Today, 05 May 2026",
      time: "07:00 PM – 08:15 PM",
    },
    {
      id: "live-3",
      batchName: "JEE Foundation (Class 11)",
      title: "Newton's Laws of Motion: Pulley & Friction Mechanics",
      meetingLink: "https://meet.google.com/pqr-stuv-wxy",
      meetingPlatform: "Google Meet",
      date: "Tomorrow, 06 May 2026",
      time: "06:00 PM – 07:45 PM",
    },
  ]);

  const [form, setForm] = React.useState({
    batchName: "Class 10 Board Excellence",
    title: "",
    meetingLink: "",
    meetingPlatform: "Google Meet",
    date: "Today, 05 May 2026",
    time: "05:00 PM – 06:15 PM",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const created: LiveClassItem = {
      id: `live-${Date.now()}`,
      batchName: form.batchName,
      title: form.title,
      meetingLink: form.meetingLink,
      meetingPlatform: form.meetingPlatform,
      date: form.date,
      time: form.time,
    };

    setClasses([created, ...classes]);
    setModalOpen(false);
    setForm({ batchName: "Class 10 Board Excellence", title: "", meetingLink: "", meetingPlatform: "Google Meet", date: "Today, 05 May 2026", time: "05:00 PM – 06:15 PM" });
    toast({ title: "Live Class Scheduled!", description: created.title });
  };

  const handleDelete = (id: string, title: string) => {
    if (!window.confirm(`Delete scheduled live class "${title}"?`)) return;
    setClasses(classes.filter((c) => c.id !== id));
    toast({ title: "Class Deleted", description: title });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Radio className="h-6 w-6 text-red-500 animate-pulse" /> Live Class Scheduler
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Schedule live interactive lectures with Google Meet/Zoom links and attach recorded archives.
          </p>
        </div>

        <Button
          size="sm"
          className="rounded-xl text-xs gap-1.5 shadow-md shadow-primary/20"
          onClick={() => setModalOpen(true)}
        >
          <Plus className="h-3.5 w-3.5" /> Schedule Class
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {classes.map((item) => (
          <Card key={item.id} className="rounded-3xl border border-border/80 p-5 shadow-sm bg-card flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="rounded-lg text-[10px] font-semibold text-primary">
                  {item.batchName}
                </Badge>
                <span className="text-[10px] bg-red-500/10 text-red-600 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" /> {item.meetingPlatform}
                </span>
              </div>

              <h3 className="font-bold text-sm sm:text-base text-foreground leading-snug">
                {item.title}
              </h3>

              <div className="space-y-1 text-xs text-muted-foreground pt-1">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-primary" /> {item.date}
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-primary" /> {item.time}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border/60 flex items-center justify-between">
              <Button asChild size="sm" variant="outline" className="rounded-xl text-xs h-8 px-3 gap-1">
                <a href={item.meetingLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3 w-3 text-primary" /> Join URL
                </a>
              </Button>

              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 text-destructive hover:bg-destructive/10 rounded-xl"
                onClick={() => handleDelete(item.id, item.title)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* SCHEDULE MODAL */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="rounded-3xl max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Schedule Live Class</DialogTitle>
            <DialogDescription className="text-xs">
              Students will see this in their Live Timetable and receive notifications.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Target Batch *</Label>
              <Input
                required
                value={form.batchName}
                onChange={(e) => setForm({ ...form, batchName: e.target.value })}
                className="rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Class Topic / Title *</Label>
              <Input
                required
                placeholder="e.g. Thermodynamics Problem Solving"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Google Meet / Zoom URL *</Label>
              <Input
                required
                placeholder="https://meet.google.com/..."
                value={form.meetingLink}
                onChange={(e) => setForm({ ...form, meetingLink: e.target.value })}
                className="rounded-xl text-xs font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Date</Label>
                <Input
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="rounded-xl text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Time Window</Label>
                <Input
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="rounded-xl text-xs"
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" className="rounded-2xl w-full text-xs font-semibold shadow-md">
                Broadcast Live Session
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

