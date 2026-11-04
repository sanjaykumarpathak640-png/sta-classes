"use client";

import * as React from "react";
import { 
  BookOpen, 
  Plus, 
  Trash2, 
  Edit3, 
  Video, 
  FileText, 
  ChevronRight, 
  Eye, 
  Sparkles, 
  Clock, 
  Calendar,
  Layers,
  ArrowUpDown,
  CheckCircle2,
  ExternalLink
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
import { siteContent, type BatchItem } from "@/data/site-content";
import { 
  upsertBatchAction, 
  deleteBatchAction,
  upsertSubjectAction,
  deleteSubjectAction,
  upsertChapterAction,
  deleteChapterAction,
  upsertLectureAction,
  deleteLectureAction,
  upsertNoteAction,
  deleteNoteAction
} from "@/app/admin/actions";

interface SubjectItem {
  id: string;
  batchId: string;
  name: string;
}

interface ChapterItem {
  id: string;
  subjectId: string;
  name: string;
}

interface LectureItem {
  id: string;
  chapterId: string;
  title: string;
  videoType: "youtube" | "upload";
  videoUrl: string;
  duration: string;
  isFreePreview: boolean;
}

interface NoteItem {
  id: string;
  chapterId: string;
  title: string;
  fileUrl: string;
}

export default function BatchesCurriculumPage() {
  const { toast } = useToast();

  // Batches
  const [batches, setBatches] = React.useState<BatchItem[]>(siteContent.batches);
  const [selectedBatch, setSelectedBatch] = React.useState<BatchItem>(siteContent.batches[0]);

  // Subjects
  const [subjects, setSubjects] = React.useState<SubjectItem[]>([
    { id: "sub-1", batchId: "b-1", name: "Physics & Mechanics" },
    { id: "sub-2", batchId: "b-1", name: "Chemistry" },
    { id: "sub-3", batchId: "b-1", name: "Mathematics" },
    { id: "sub-4", batchId: "b-2", name: "Modern Physics" },
  ]);
  const [selectedSubject, setSelectedSubject] = React.useState<SubjectItem | null>(null);

  // Chapters
  const [chapters, setChapters] = React.useState<ChapterItem[]>([
    { id: "ch-1", subjectId: "sub-1", name: "Chapter 1: Light Reflection & Refraction" },
    { id: "ch-2", subjectId: "sub-1", name: "Chapter 2: Human Eye & Colourful World" },
    { id: "ch-3", subjectId: "sub-1", name: "Chapter 3: Electricity & Ohm's Law" },
  ]);
  const [selectedChapter, setSelectedChapter] = React.useState<ChapterItem | null>(null);

  // Lectures & Notes
  const [lectures, setLectures] = React.useState<LectureItem[]>([
    {
      id: "lec-1",
      chapterId: "ch-1",
      title: "Lecture 01: Introduction to Spherical Mirrors & Ray Diagrams",
      videoType: "youtube",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      duration: "48 mins",
      isFreePreview: true,
    },
    {
      id: "lec-2",
      chapterId: "ch-1",
      title: "Lecture 02: Mirror Formula & Numerical Problem Solving",
      videoType: "youtube",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      duration: "54 mins",
      isFreePreview: false,
    },
  ]);

  const [notes, setNotes] = React.useState<NoteItem[]>([
    {
      id: "note-1",
      chapterId: "ch-1",
      title: "Handwritten Class Notes & Ray Diagram Charts (PDF)",
      fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      id: "note-2",
      chapterId: "ch-1",
      title: "Formula Sheet & NCERT Exemplar Solutions (PDF)",
      fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  ]);

  // Modal States
  const [batchModalOpen, setBatchModalOpen] = React.useState(false);
  const [lectureModalOpen, setLectureModalOpen] = React.useState(false);
  const [noteModalOpen, setNoteModalOpen] = React.useState(false);

  // Form states
  const [batchForm, setBatchForm] = React.useState({
    title: "",
    classLevel: "Class 10th",
    category: "class-10" as any,
    description: "",
    price: 14999,
    originalPrice: 19999,
    duration: "10 Months",
    startDate: "15 April 2026",
    badge: "New Batch",
    isPopular: false,
    features: "Daily Live Sessions\nPrinted Study Modules\nWeekly Mock Tests\nInstant Doubt Clearing",
  });

  const [lectureForm, setLectureForm] = React.useState({
    title: "",
    videoUrl: "",
    duration: "45 mins",
    isFreePreview: false,
  });

  const [noteForm, setNoteForm] = React.useState({
    title: "",
    fileUrl: "",
  });

  // Select initial subject and chapter on batch change
  React.useEffect(() => {
    const batchSubs = subjects.filter((s) => s.batchId === selectedBatch.id);
    if (batchSubs.length > 0) {
      setSelectedSubject(batchSubs[0]);
    } else {
      setSelectedSubject(null);
      setSelectedChapter(null);
    }
  }, [selectedBatch, subjects]);

  React.useEffect(() => {
    if (selectedSubject) {
      const subChaps = chapters.filter((c) => c.subjectId === selectedSubject.id);
      if (subChaps.length > 0) {
        setSelectedChapter(subChaps[0]);
      } else {
        setSelectedChapter(null);
      }
    } else {
      setSelectedChapter(null);
    }
  }, [selectedSubject, chapters]);

  // ADD BATCH
  const handleSaveBatch = (e: React.FormEvent) => {
    e.preventDefault();
    const newBatch: BatchItem = {
      id: `b-${Date.now()}`,
      title: batchForm.title,
      classLevel: batchForm.classLevel,
      category: batchForm.category,
      description: batchForm.description,
      price: Number(batchForm.price),
      originalPrice: Number(batchForm.originalPrice),
      duration: batchForm.duration,
      startDate: batchForm.startDate,
      badge: batchForm.badge || undefined,
      isPopular: batchForm.isPopular,
      features: batchForm.features.split("\n").filter(Boolean),
    };

    setBatches([...batches, newBatch]);
    setSelectedBatch(newBatch);
    setBatchModalOpen(false);
    toast({ title: "Batch Created!", description: `${newBatch.title} is now active.` });
  };

  // DELETE BATCH
  const handleDeleteBatch = (id: string, title: string) => {
    if (!window.confirm(`Delete batch "${title}" and all its subjects/lectures?`)) return;
    const remaining = batches.filter((b) => b.id !== id);
    setBatches(remaining);
    if (remaining.length > 0) setSelectedBatch(remaining[0]);
    toast({ title: "Batch Deleted", description: title });
  };

  // ADD SUBJECT
  const handleAddSubject = () => {
    const name = window.prompt("Enter new Subject name (e.g. Mathematics):");
    if (!name) return;
    const newSub: SubjectItem = {
      id: `sub-${Date.now()}`,
      batchId: selectedBatch.id,
      name,
    };
    setSubjects([...subjects, newSub]);
    setSelectedSubject(newSub);
    toast({ title: "Subject Added", description: name });
  };

  // ADD CHAPTER
  const handleAddChapter = () => {
    if (!selectedSubject) return;
    const name = window.prompt(`Enter Chapter title for ${selectedSubject.name}:`);
    if (!name) return;
    const newChap: ChapterItem = {
      id: `ch-${Date.now()}`,
      subjectId: selectedSubject.id,
      name,
    };
    setChapters([...chapters, newChap]);
    setSelectedChapter(newChap);
    toast({ title: "Chapter Added", description: name });
  };

  // ADD LECTURE
  const handleSaveLecture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChapter) return;
    const newLec: LectureItem = {
      id: `lec-${Date.now()}`,
      chapterId: selectedChapter.id,
      title: lectureForm.title,
      videoType: "youtube",
      videoUrl: lectureForm.videoUrl,
      duration: lectureForm.duration,
      isFreePreview: lectureForm.isFreePreview,
    };
    setLectures([...lectures, newLec]);
    setLectureModalOpen(false);
    setLectureForm({ title: "", videoUrl: "", duration: "45 mins", isFreePreview: false });
    toast({ title: "Lecture Added!", description: newLec.title });
  };

  // ADD NOTE
  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChapter) return;
    const newNote: NoteItem = {
      id: `note-${Date.now()}`,
      chapterId: selectedChapter.id,
      title: noteForm.title,
      fileUrl: noteForm.fileUrl,
    };
    setNotes([...notes, newNote]);
    setNoteModalOpen(false);
    setNoteForm({ title: "", fileUrl: "" });
    toast({ title: "PDF Note Added!", description: newNote.title });
  };

  const currentSubjects = subjects.filter((s) => s.batchId === selectedBatch?.id);
  const currentChapters = chapters.filter((c) => c.subjectId === selectedSubject?.id);
  const currentLectures = lectures.filter((l) => l.chapterId === selectedChapter?.id);
  const currentNotes = notes.filter((n) => n.chapterId === selectedChapter?.id);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" /> Batches & Curriculum Manager
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Manage course batches, subjects, chapters, recorded video lectures, and PDF study notes.
          </p>
        </div>

        <Button
          size="sm"
          className="rounded-xl text-xs gap-1.5 shadow-md shadow-primary/20"
          onClick={() => {
            setBatchForm({
              title: "Class 10 Intensive Batch 2026",
              classLevel: "Class 10th",
              category: "class-10",
              description: "Complete course preparation with syllabus coverage, derivation booklets, and test series.",
              price: 13999,
              originalPrice: 18999,
              duration: "9 Months",
              startDate: "01 May 2026",
              badge: "New",
              isPopular: false,
              features: "Daily Live Lectures\nHandwritten Chapter Notes\nWeekly Mock Exams\n1-on-1 Doubt Sessions",
            });
            setBatchModalOpen(true);
          }}
        >
          <Plus className="h-3.5 w-3.5" /> Create New Batch
        </Button>
      </div>

      {/* 3-Tier Curriculum Grid Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Column 1: Batches List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Batches ({batches.length})
            </span>
          </div>

          <div className="space-y-2.5">
            {batches.map((b) => {
              const isSelected = selectedBatch?.id === b.id;
              return (
                <div
                  key={b.id}
                  onClick={() => setSelectedBatch(b)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? "border-primary bg-primary/[0.05] shadow-md shadow-primary/10 ring-1 ring-primary/40"
                      : "border-border/80 bg-card hover:border-primary/40 hover:bg-muted/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <Badge variant="outline" className="text-[10px] font-semibold">
                      {b.classLevel}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-destructive hover:bg-destructive/10 rounded-md"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteBatch(b.id, b.title);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                      <ChevronRight className={`h-4 w-4 transition-transform ${isSelected ? "text-primary translate-x-1" : "text-muted-foreground"}`} />
                    </div>
                  </div>

                  <h4 className="font-bold text-sm text-foreground mt-2 line-clamp-1">{b.title}</h4>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-2 pt-2 border-t border-border/50">
                    <span className="font-bold text-foreground">₹{b.price.toLocaleString("en-IN")}</span>
                    <span>{b.duration}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 2: Subjects & Chapters (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Subjects Card */}
          <Card className="rounded-3xl border border-border/80 p-5 shadow-sm bg-card space-y-3">
            <div className="flex items-center justify-between pb-2 border-b">
              <span className="text-xs font-bold text-foreground">
                Subjects in {selectedBatch?.classLevel}
              </span>
              <Button size="sm" variant="ghost" className="h-7 text-xs text-primary px-2" onClick={handleAddSubject}>
                <Plus className="h-3 w-3 mr-1" /> Add
              </Button>
            </div>

            <div className="space-y-1.5">
              {currentSubjects.length === 0 ? (
                <p className="text-xs text-muted-foreground py-2 text-center">No subjects added yet.</p>
              ) : (
                currentSubjects.map((sub) => {
                  const isSelected = selectedSubject?.id === sub.id;
                  return (
                    <div
                      key={sub.id}
                      onClick={() => setSelectedSubject(sub)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold cursor-pointer flex items-center justify-between transition-colors ${
                        isSelected
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-muted/30 border-border/60 hover:bg-muted/70 text-foreground"
                      }`}
                    >
                      <span className="truncate">{sub.name}</span>
                      <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-80" />
                    </div>
                  );
                })
              )}
            </div>
          </Card>

          {/* Chapters Card */}
          <Card className="rounded-3xl border border-border/80 p-5 shadow-sm bg-card space-y-3">
            <div className="flex items-center justify-between pb-2 border-b">
              <span className="text-xs font-bold text-foreground truncate">
                Chapters {selectedSubject ? `(${selectedSubject.name})` : ""}
              </span>
              <Button
                size="sm"
                variant="ghost"
                disabled={!selectedSubject}
                className="h-7 text-xs text-primary px-2"
                onClick={handleAddChapter}
              >
                <Plus className="h-3 w-3 mr-1" /> Add
              </Button>
            </div>

            <div className="space-y-1.5">
              {!selectedSubject ? (
                <p className="text-xs text-muted-foreground py-2 text-center">Select a subject above.</p>
              ) : currentChapters.length === 0 ? (
                <p className="text-xs text-muted-foreground py-2 text-center">No chapters yet. Click Add.</p>
              ) : (
                currentChapters.map((ch) => {
                  const isSelected = selectedChapter?.id === ch.id;
                  return (
                    <div
                      key={ch.id}
                      onClick={() => setSelectedChapter(ch)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold cursor-pointer flex items-center justify-between transition-colors ${
                        isSelected
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-muted/30 border-border/60 hover:bg-muted/70 text-foreground"
                      }`}
                    >
                      <span className="truncate">{ch.name}</span>
                      <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-80" />
                    </div>
                  );
                })
              )}
            </div>
          </Card>
        </div>

        {/* Column 3: Lectures & Notes in Selected Chapter (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Lectures List */}
          <Card className="rounded-3xl border border-border/80 p-5 shadow-sm bg-card space-y-3">
            <div className="flex items-center justify-between pb-2 border-b">
              <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Video className="h-3.5 w-3.5 text-primary" /> Lectures ({currentLectures.length})
              </span>
              <Button
                size="sm"
                disabled={!selectedChapter}
                className="h-7 text-xs px-2.5 rounded-lg"
                onClick={() => setLectureModalOpen(true)}
              >
                <Plus className="h-3 w-3 mr-1" /> Add Lecture
              </Button>
            </div>

            <div className="space-y-2">
              {!selectedChapter ? (
                <p className="text-xs text-muted-foreground py-2 text-center">Select a chapter to manage lectures.</p>
              ) : currentLectures.length === 0 ? (
                <p className="text-xs text-muted-foreground py-2 text-center">No video lectures uploaded yet.</p>
              ) : (
                currentLectures.map((lec) => (
                  <div key={lec.id} className="p-3 rounded-xl border border-border/80 bg-muted/20 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      {lec.isFreePreview ? (
                        <Badge className="bg-emerald-500/10 text-emerald-600 border-none text-[9px] py-0">
                          Free Preview
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-[9px] py-0 text-muted-foreground">
                          Locked (Enrolled Only)
                        </Badge>
                      )}
                      <span className="text-[10px] font-mono text-muted-foreground">{lec.duration}</span>
                    </div>

                    <div className="font-semibold text-foreground line-clamp-2">{lec.title}</div>

                    <div className="flex items-center justify-between pt-1 border-t border-border/50 text-[10px] text-muted-foreground">
                      <a href={lec.videoUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                        <Video className="h-3 w-3" /> Test Link
                      </a>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 text-destructive rounded-md"
                        onClick={() => setLectures(lectures.filter((x) => x.id !== lec.id))}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Notes List */}
          <Card className="rounded-3xl border border-border/80 p-5 shadow-sm bg-card space-y-3">
            <div className="flex items-center justify-between pb-2 border-b">
              <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-emerald-500" /> PDF Notes ({currentNotes.length})
              </span>
              <Button
                size="sm"
                variant="outline"
                disabled={!selectedChapter}
                className="h-7 text-xs px-2.5 rounded-lg"
                onClick={() => setNoteModalOpen(true)}
              >
                <Plus className="h-3 w-3 mr-1" /> Add PDF
              </Button>
            </div>

            <div className="space-y-2">
              {!selectedChapter ? (
                <p className="text-xs text-muted-foreground py-2 text-center">Select a chapter.</p>
              ) : currentNotes.length === 0 ? (
                <p className="text-xs text-muted-foreground py-2 text-center">No PDF notes uploaded.</p>
              ) : (
                currentNotes.map((note) => (
                  <div key={note.id} className="p-3 rounded-xl border border-border/80 bg-muted/20 space-y-1 text-xs">
                    <div className="font-semibold text-foreground line-clamp-1">{note.title}</div>
                    <div className="flex items-center justify-between pt-1 text-[10px] text-muted-foreground">
                      <a href={note.fileUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline flex items-center gap-1 font-medium">
                        <ExternalLink className="h-3 w-3" /> Open PDF
                      </a>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 text-destructive rounded-md"
                        onClick={() => setNotes(notes.filter((x) => x.id !== note.id))}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* CREATE BATCH MODAL */}
      <Dialog open={batchModalOpen} onOpenChange={setBatchModalOpen}>
        <DialogContent className="rounded-3xl max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Create New Course Batch</DialogTitle>
            <DialogDescription className="text-xs">
              Configure curriculum metadata, pricing, and key features.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveBatch} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Batch Name / Title *</Label>
              <Input
                required
                value={batchForm.title}
                onChange={(e) => setBatchForm({ ...batchForm, title: e.target.value })}
                className="rounded-xl text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Class / Target Grade *</Label>
                <Input
                  required
                  value={batchForm.classLevel}
                  onChange={(e) => setBatchForm({ ...batchForm, classLevel: e.target.value })}
                  className="rounded-xl text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Batch Duration</Label>
                <Input
                  value={batchForm.duration}
                  onChange={(e) => setBatchForm({ ...batchForm, duration: e.target.value })}
                  className="rounded-xl text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Offer Price (₹) *</Label>
                <Input
                  type="number"
                  required
                  value={batchForm.price}
                  onChange={(e) => setBatchForm({ ...batchForm, price: Number(e.target.value) })}
                  className="rounded-xl text-xs font-bold"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Original Price (₹)</Label>
                <Input
                  type="number"
                  value={batchForm.originalPrice}
                  onChange={(e) => setBatchForm({ ...batchForm, originalPrice: Number(e.target.value) })}
                  className="rounded-xl text-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Batch Description</Label>
              <Textarea
                rows={2}
                value={batchForm.description}
                onChange={(e) => setBatchForm({ ...batchForm, description: e.target.value })}
                className="rounded-xl text-xs resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Key Bullet Features (One per line)</Label>
              <Textarea
                rows={4}
                value={batchForm.features}
                onChange={(e) => setBatchForm({ ...batchForm, features: e.target.value })}
                className="rounded-xl text-xs"
              />
            </div>

            <DialogFooter>
              <Button type="submit" className="rounded-2xl w-full text-xs font-semibold shadow-md">
                Publish & Save Batch
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ADD LECTURE MODAL */}
      <Dialog open={lectureModalOpen} onOpenChange={setLectureModalOpen}>
        <DialogContent className="rounded-3xl max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Add Video Lecture</DialogTitle>
            <DialogDescription className="text-xs">
              Attach a YouTube unlisted link or video stream to {selectedChapter?.name}.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveLecture} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Lecture Title *</Label>
              <Input
                required
                placeholder="e.g. Lecture 03: Lens Formula & Magnification"
                value={lectureForm.title}
                onChange={(e) => setLectureForm({ ...lectureForm, title: e.target.value })}
                className="rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">YouTube URL / Video Link *</Label>
              <Input
                required
                placeholder="https://www.youtube.com/watch?v=..."
                value={lectureForm.videoUrl}
                onChange={(e) => setLectureForm({ ...lectureForm, videoUrl: e.target.value })}
                className="rounded-xl text-xs font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Duration</Label>
                <Input
                  value={lectureForm.duration}
                  onChange={(e) => setLectureForm({ ...lectureForm, duration: e.target.value })}
                  className="rounded-xl text-xs"
                />
              </div>

              <div className="space-y-1.5 flex flex-col justify-end">
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer pb-2">
                  <input
                    type="checkbox"
                    checked={lectureForm.isFreePreview}
                    onChange={(e) => setLectureForm({ ...lectureForm, isFreePreview: e.target.checked })}
                    className="rounded h-4 w-4 text-primary"
                  />
                  <span>Free Preview Clip</span>
                </label>
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" className="rounded-2xl w-full text-xs font-semibold shadow-md">
                Save Lecture
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ADD NOTE MODAL */}
      <Dialog open={noteModalOpen} onOpenChange={setNoteModalOpen}>
        <DialogContent className="rounded-3xl max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Add PDF Study Notes</DialogTitle>
            <DialogDescription className="text-xs">
              Upload or link chapter notes, derivation booklets, or formula sheets.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveNote} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Notes Title *</Label>
              <Input
                required
                placeholder="e.g. Chapter 01 Comprehensive Revision PDF"
                value={noteForm.title}
                onChange={(e) => setNoteForm({ ...noteForm, title: e.target.value })}
                className="rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">PDF File URL *</Label>
              <Input
                required
                placeholder="https://.../notes.pdf"
                value={noteForm.fileUrl}
                onChange={(e) => setNoteForm({ ...noteForm, fileUrl: e.target.value })}
                className="rounded-xl text-xs font-mono"
              />
            </div>

            <DialogFooter>
              <Button type="submit" className="rounded-2xl w-full text-xs font-semibold shadow-md">
                Attach PDF Note
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

