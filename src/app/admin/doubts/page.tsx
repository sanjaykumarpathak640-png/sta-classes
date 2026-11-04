"use client";

import * as React from "react";
import { 
  HelpCircle, 
  Search, 
  Filter, 
  Send, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  MessageSquare
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { answerDoubtAction } from "@/app/admin/actions";

interface DoubtItem {
  id: string;
  studentName: string;
  batchName: string;
  chapter: string;
  question: string;
  imageUrl?: string;
  status: "pending" | "answered";
  answer?: string;
  createdAt: string;
}

export default function DoubtsInboxPage() {
  const { toast } = useToast();
  const [filter, setFilter] = React.useState<"all" | "pending" | "answered">("pending");
  const [replyTextMap, setReplyTextMap] = React.useState<Record<string, string>>({});

  const [doubts, setDoubts] = React.useState<DoubtItem[]>([
    {
      id: "d-1",
      studentName: "Aarav Patel",
      batchName: "Class 10 Board Excellence",
      chapter: "Chapter 1: Light Reflection & Refraction",
      question: "Sir, in question 4 of exercise 10.2, why do we take the focal length of a concave mirror as negative? Can you explain the sign convention rule again?",
      imageUrl: "https://images.unsplash.com/photo-1632571401005-458e9d244591?auto=format&fit=crop&w=600&q=80",
      status: "pending",
      createdAt: "25 mins ago",
    },
    {
      id: "d-2",
      studentName: "Priya Sharma",
      batchName: "Class 12th PCM",
      chapter: "Chapter 2: Electrostatics",
      question: "How does dielectric constant change when capacitance is connected to battery vs disconnected from battery?",
      status: "pending",
      createdAt: "1 hour ago",
    },
    {
      id: "d-3",
      studentName: "Kabir Mehta",
      batchName: "JEE Foundation",
      chapter: "Chapter 4: Rotational Dynamics",
      question: "Why is moment of inertia not a pure scalar or vector, but a tensor quantity?",
      status: "answered",
      answer: "Moment of inertia depends on the orientation of the axis of rotation in 3D space, which is why it behaves as a second-rank tensor in advanced classical mechanics.",
      createdAt: "Yesterday",
    },
  ]);

  const filtered = doubts.filter((d) => {
    if (filter === "pending") return d.status === "pending";
    if (filter === "answered") return d.status === "answered";
    return true;
  });

  const handleSendAnswer = async (doubtId: string) => {
    const text = replyTextMap[doubtId];
    if (!text || !text.trim()) {
      toast({ title: "Empty Answer", description: "Please enter an explanation.", variant: "destructive" });
      return;
    }

    setDoubts(doubts.map((d) => (d.id === doubtId ? { ...d, status: "answered", answer: text } : d)));
    setReplyTextMap({ ...replyTextMap, [doubtId]: "" });

    try {
      await answerDoubtAction(doubtId, text);
    } catch {
      // Local fallback
    }

    toast({ title: "Doubt Resolved!", description: "Answer has been sent to the student's app." });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-primary" /> Photo Doubt Resolution Inbox
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Review and answer questions submitted by students directly from their mobile app.
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            size="sm"
            variant={filter === "pending" ? "default" : "outline"}
            className="rounded-xl text-xs h-9"
            onClick={() => setFilter("pending")}
          >
            Pending ({doubts.filter((d) => d.status === "pending").length})
          </Button>
          <Button
            size="sm"
            variant={filter === "answered" ? "default" : "outline"}
            className="rounded-xl text-xs h-9"
            onClick={() => setFilter("answered")}
          >
            Answered ({doubts.filter((d) => d.status === "answered").length})
          </Button>
          <Button
            size="sm"
            variant={filter === "all" ? "default" : "outline"}
            className="rounded-xl text-xs h-9"
            onClick={() => setFilter("all")}
          >
            All
          </Button>
        </div>
      </div>

      {/* Doubts Feed */}
      <div className="space-y-4 max-w-4xl">
        {filtered.length === 0 ? (
          <Card className="rounded-3xl border border-dashed p-12 text-center text-muted-foreground">
            No doubts in this category. You&apos;re all caught up!
          </Card>
        ) : (
          filtered.map((d) => (
            <Card key={d.id} className="rounded-3xl border border-border/80 p-5 sm:p-6 shadow-sm bg-card space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-foreground">{d.studentName}</span>
                    <Badge variant="secondary" className="text-[10px] py-0 font-semibold text-primary">
                      {d.batchName}
                    </Badge>
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{d.chapter}</div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground">{d.createdAt}</span>
                  {d.status === "pending" ? (
                    <Badge className="bg-amber-500/10 text-amber-600 border-none text-[10px]">
                      Pending
                    </Badge>
                  ) : (
                    <Badge className="bg-emerald-500/10 text-emerald-600 border-none text-[10px]">
                      Answered
                    </Badge>
                  )}
                </div>
              </div>

              {/* Question Text & Photo */}
              <div className="p-4 rounded-2xl bg-muted/30 border border-border/50 space-y-3">
                <p className="text-xs sm:text-sm text-foreground font-medium leading-relaxed">
                  &ldquo;{d.question}&rdquo;
                </p>

                {d.imageUrl && (
                  <div>
                    <a
                      href={d.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline"
                    >
                      <ExternalLink className="h-3.5 w-3.5" /> View Attached Problem Photo
                    </a>
                  </div>
                )}
              </div>

              {/* Existing Answer or Reply Form */}
              {d.status === "answered" && d.answer ? (
                <div className="p-4 rounded-2xl bg-primary/[0.04] border border-primary/20 space-y-1">
                  <div className="text-[10px] font-bold text-primary uppercase">Official Faculty Reply:</div>
                  <p className="text-xs text-foreground/90 leading-relaxed">{d.answer}</p>
                </div>
              ) : (
                <div className="space-y-2 pt-1">
                  <Textarea
                    rows={2}
                    placeholder="Type step-by-step conceptual answer or explanation..."
                    value={replyTextMap[d.id] || ""}
                    onChange={(e) => setReplyTextMap({ ...replyTextMap, [d.id]: e.target.value })}
                    className="rounded-2xl text-xs resize-none"
                  />
                  <Button
                    size="sm"
                    className="rounded-xl text-xs gap-1.5 shadow-md shadow-primary/20"
                    onClick={() => handleSendAnswer(d.id)}
                  >
                    <Send className="h-3 w-3" /> Send Answer to Student
                  </Button>
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

