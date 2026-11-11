"use client";

import * as React from "react";
import Link from "next/link";
import { 
  BookOpen, 
  Plus, 
  Trash2, 
  Edit3, 
  Video, 
  FileText, 
  ChevronRight,
  ChevronUp,
  ChevronDown, 
  Sparkles, 
  Clock, 
  Calendar,
  Layers,
  ArrowUpDown,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  Award,
  HelpCircle,
  FileSpreadsheet
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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

export interface PyqItem {
  id: string;
  chapterId: string;
  title: string;
  examYear: string;
  boardExam: string; // CBSE, ICSE, Bihar Board, School Exam
  fileUrl: string;
}

export default function BatchesCurriculumPage() {
  const { toast } = useToast();

  // Batches State
  const [batches, setBatches] = React.useState<BatchItem[]>(siteContent.batches);
  const [selectedBatch, setSelectedBatch] = React.useState<BatchItem>(siteContent.batches[0]);
  const [editingBatchId, setEditingBatchId] = React.useState<string | null>(null);

  // Load customized batches and PYQs from localStorage if present
  React.useEffect(() => {
    try {
      const storedBatches = localStorage.getItem("sta_batches_data");
      if (storedBatches) {
        const parsed = JSON.parse(storedBatches);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setBatches(parsed);
          setSelectedBatch(parsed[0]);
        }
      }
      const storedPyqs = localStorage.getItem("sta_pyqs_data");
      if (storedPyqs) {
        const parsedP = JSON.parse(storedPyqs);
        if (Array.isArray(parsedP)) {
          setPyqs(parsedP);
        }
      }
      const storedLectures = localStorage.getItem("sta_lectures_data");
      if (storedLectures) {
        const parsedL = JSON.parse(storedLectures);
        if (Array.isArray(parsedL) && parsedL.length > 0) {
          setLectures(parsedL);
        }
      }
    } catch {
      // fallback to initial
    }
  }, []);

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

  // PYQs (Previous Year Questions)
  const [pyqs, setPyqs] = React.useState<PyqItem[]>([
    {
      id: "pyq-1",
      chapterId: "ch-1",
      title: "CBSE Class 10 Board 2024 Science Solved Paper",
      examYear: "2024",
      boardExam: "CBSE Board",
      fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      id: "pyq-2",
      chapterId: "ch-1",
      title: "Bihar Board (BSEB) Class 10 Science 2023 Solved Paper",
      examYear: "2023",
      boardExam: "Bihar Board",
      fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      id: "pyq-3",
      chapterId: "ch-1",
      title: "Annual School Exam Chapter-wise PYQ & Model Answers",
      examYear: "2022",
      boardExam: "School Annual",
      fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  ]);

  // Active curriculum content tab: lectures | notes | pyqs
  const [curriculumTab, setCurriculumTab] = React.useState<"lectures" | "notes" | "pyqs">("lectures");

  // Modal States
  const [batchModalOpen, setBatchModalOpen] = React.useState(false);
  const [lectureModalOpen, setLectureModalOpen] = React.useState(false);
  const [noteModalOpen, setNoteModalOpen] = React.useState(false);
  const [pyqModalOpen, setPyqModalOpen] = React.useState(false);
  const [editingLectureId, setEditingLectureId] = React.useState<string | null>(null);

  // Form states
  const [batchForm, setBatchForm] = React.useState({
    title: "",
    classLevel: "Class 10th",
    category: "secondary" as "junior" | "middle" | "secondary" | "senior",
    description: "",
    price: 0,
    originalPrice: 0,
    duration: "Full Session 2026–27",
    startDate: "Admissions Open",
    badge: "Class 4-12",
    isPopular: false,
    features: "Daily Offline / App Teaching\nChapter Revision Notes\nWeekly Test Series\n1-on-1 Doubt Clearance",
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

  const [pyqForm, setPyqForm] = React.useState({
    title: "",
    examYear: "2024",
    boardExam: "CBSE Board",
    fileUrl: "",
  });

  // Select initial subject and chapter on batch change
  React.useEffect(() => {
    if (!selectedBatch) return;
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

  // OPEN CREATE BATCH MODAL
  const handleOpenCreateBatch = () => {
    setEditingBatchId(null);
    setBatchForm({
      title: "Class 10 Board Excellence 2026-27",
      classLevel: "Class 10th",
      category: "secondary",
      description: "Comprehensive subject tuition with full syllabus coverage, notes, and weekly tests.",
      price: 0,
      originalPrice: 0,
      duration: "Full Session 2026–27",
      startDate: "Admissions Open",
      badge: "Board Special",
      isPopular: true,
      features: "Complete Syllabus Coverage\nHandwritten Chapter Notes\nWeekly Tests & Result Analysis\n1-on-1 Faculty Doubt Clearing",
    });
    setBatchModalOpen(true);
  };

  // OPEN EDIT BATCH MODAL
  const handleOpenEditBatch = (batch: BatchItem) => {
    setEditingBatchId(batch.id);
    setBatchForm({
      title: batch.title,
      classLevel: batch.classLevel,
      category: (batch.category === "all" ? "secondary" : batch.category) as any,
      description: batch.description,
      price: batch.price || 0,
      originalPrice: batch.originalPrice || 0,
      duration: batch.duration,
      startDate: batch.startDate,
      badge: batch.badge || "",
      isPopular: Boolean(batch.isPopular),
      features: batch.features ? batch.features.join("\n") : "",
    });
    setBatchModalOpen(true);
  };

  // SAVE (CREATE OR EDIT) BATCH
  const handleSaveBatch = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingBatchId) {
      // Update existing batch
      const updatedList = batches.map((b) => {
        if (b.id === editingBatchId) {
          return {
            ...b,
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
            features: batchForm.features.split("\n").map((f) => f.trim()).filter(Boolean),
          };
        }
        return b;
      });

      setBatches(updatedList);
      const updatedCurrent = updatedList.find((b) => b.id === editingBatchId);
      if (updatedCurrent) setSelectedBatch(updatedCurrent);

      try {
        localStorage.setItem("sta_batches_data", JSON.stringify(updatedList));
      } catch {}

      setBatchModalOpen(false);
      setEditingBatchId(null);
      toast({
        title: "Batch Updated Successfully!",
        description: `Fee: ${batchForm.price > 0 ? `₹${batchForm.price}` : "Custom Fee / Set by Institute"}. Changes live on homepage.`,
      });
    } else {
      // Create new batch
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
        features: batchForm.features.split("\n").map((f) => f.trim()).filter(Boolean),
      };

      const updatedList = [...batches, newBatch];
      setBatches(updatedList);
      setSelectedBatch(newBatch);

      try {
        localStorage.setItem("sta_batches_data", JSON.stringify(updatedList));
      } catch {}

      setBatchModalOpen(false);
      toast({
        title: "Batch Created Successfully!",
        description: `${newBatch.title} is now active. Fee set to ${newBatch.price > 0 ? `₹${newBatch.price}` : "Custom / On Request"}.`,
      });
    }
  };

  // DELETE BATCH
  const handleDeleteBatch = (id: string, title: string) => {
    if (!window.confirm(`Delete batch "${title}" and all its subjects/lectures?`)) return;
    const remaining = batches.filter((b) => b.id !== id);
    setBatches(remaining);
    if (remaining.length > 0) setSelectedBatch(remaining[0]);
    try {
      localStorage.setItem("sta_batches_data", JSON.stringify(remaining));
    } catch {}
    toast({ title: "Batch Deleted", description: title });
  };

  // ADD SUBJECT
  const handleAddSubject = () => {
    if (!selectedBatch) return;
    const name = window.prompt("Enter new Subject name (e.g. Mathematics, Science, English):");
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

  // DELETE SUBJECT
  const handleDeleteSubject = (id: string, name: string) => {
    if (!window.confirm(`Delete subject "${name}"?`)) return;
    const remaining = subjects.filter((s) => s.id !== id);
    setSubjects(remaining);
    toast({ title: "Subject Deleted", description: name });
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

  // DELETE CHAPTER
  const handleDeleteChapter = (id: string, name: string) => {
    if (!window.confirm(`Delete chapter "${name}"?`)) return;
    const remaining = chapters.filter((c) => c.id !== id);
    setChapters(remaining);
    toast({ title: "Chapter Deleted", description: name });
  };

  // Helper to extract YouTube 11-char ID
  const extractYouTubeId = (url?: string): string | null => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|live\/))([\w-]{11})/);
    return match ? match[1] : null;
  };

  // ADD / EDIT LECTURE (YOUTUBE LINK)
  const handleSaveLecture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChapter) return;

    let updated: LectureItem[];
    if (editingLectureId) {
      updated = lectures.map((l) =>
        l.id === editingLectureId
          ? {
              ...l,
              title: lectureForm.title,
              videoUrl: lectureForm.videoUrl,
              duration: lectureForm.duration,
              isFreePreview: lectureForm.isFreePreview,
            }
          : l
      );
      toast({ title: "Video Lecture Updated!", description: lectureForm.title });
    } else {
      const newLec: LectureItem = {
        id: `lec-${Date.now()}`,
        chapterId: selectedChapter.id,
        title: lectureForm.title,
        videoType: "youtube",
        videoUrl: lectureForm.videoUrl,
        duration: lectureForm.duration,
        isFreePreview: lectureForm.isFreePreview,
      };
      updated = [...lectures, newLec];
      toast({ title: "YouTube Video Lecture Added!", description: newLec.title });
    }

    setLectures(updated);
    try {
      localStorage.setItem("sta_lectures_data", JSON.stringify(updated));
    } catch {}

    setLectureModalOpen(false);
    setEditingLectureId(null);
    setLectureForm({ title: "", videoUrl: "", duration: "45 mins", isFreePreview: false });
  };

  const handleDeleteLecture = (id: string, title: string) => {
    const remaining = lectures.filter((x) => x.id !== id);
    setLectures(remaining);
    try {
      localStorage.setItem("sta_lectures_data", JSON.stringify(remaining));
    } catch {}
    toast({ title: "Lecture Removed", description: title });
  };

  // ADD NOTE (PDF LINK)
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
    toast({ title: "PDF Study Note Added!", description: newNote.title });
  };

  // ADD PYQ (PREVIOUS YEAR QUESTIONS)
  const handleSavePyq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChapter) return;
    const newPyq: PyqItem = {
      id: `pyq-${Date.now()}`,
      chapterId: selectedChapter.id,
      title: pyqForm.title,
      examYear: pyqForm.examYear,
      boardExam: pyqForm.boardExam,
      fileUrl: pyqForm.fileUrl,
    };
    const updatedPyqs = [...pyqs, newPyq];
    setPyqs(updatedPyqs);
    try {
      localStorage.setItem("sta_pyqs_data", JSON.stringify(updatedPyqs));
    } catch {}
    setPyqModalOpen(false);
    setPyqForm({ title: "", examYear: "2024", boardExam: "CBSE Board", fileUrl: "" });
    toast({ title: "PYQ Paper Added!", description: `${newPyq.title} (${newPyq.examYear})` });
  };

  const handleDeletePyq = (id: string, title: string) => {
    if (!window.confirm(`Delete PYQ "${title}"?`)) return;
    const remaining = pyqs.filter((p) => p.id !== id);
    setPyqs(remaining);
    try {
      localStorage.setItem("sta_pyqs_data", JSON.stringify(remaining));
    } catch {}
    toast({ title: "PYQ Deleted", description: title });
  };

  const reorderList = <T,>(list: T[], index: number, direction: "up" | "down", setter: (items: T[]) => void) => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;
    const copy = [...list];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIdx, 0, moved);
    setter(copy);
  };

  const currentSubjects = subjects.filter((s) => s.batchId === selectedBatch?.id);
  const currentChapters = chapters.filter((c) => c.subjectId === selectedSubject?.id);
  const currentLectures = lectures.filter((l) => l.chapterId === selectedChapter?.id);
  const currentNotes = notes.filter((n) => n.chapterId === selectedChapter?.id);
  const currentPyqs = pyqs.filter((p) => p.chapterId === selectedChapter?.id);

  return (
    <div className="space-y-6">
      {/* Top Banner / Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3 border-b border-border/60">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" /> Batches, Lectures, Notes & PYQ Manager
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Aap admin hain — yahan se batch fees set karein, YouTube video links dein, notes PDF dalein, PYQ papers upload karein aur test banayein.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            asChild
            className="rounded-xl text-xs gap-1.5 border-border"
          >
            <Link href="/admin/tests">
              <Award className="h-3.5 w-3.5 text-primary" /> Create & Take Tests →
            </Link>
          </Button>

          <Button
            size="sm"
            className="rounded-xl text-xs gap-1.5 shadow-md shadow-primary/20"
            onClick={handleOpenCreateBatch}
          >
            <Plus className="h-3.5 w-3.5" /> Create New Batch
          </Button>
        </div>
      </div>

      {/* 3-Column Manager Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ================= COLUMN 1: BATCHES LIST & PRICING ================= */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Batches ({batches.length})
            </span>
            <span className="text-[11px] text-primary font-medium">Click to select & manage</span>
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
                      {/* EDIT BATCH BUTTON */}
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Edit Batch & Set Price"
                        className="h-6 w-6 text-primary hover:bg-primary/10 rounded-md"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenEditBatch(b);
                        }}
                      >
                        <Edit3 className="h-3 w-3" />
                      </Button>

                      {/* DELETE BATCH BUTTON */}
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Delete Batch"
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
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-bold text-foreground">
                        {b.price && b.price > 0 ? `₹${b.price.toLocaleString("en-IN")}` : "Fee: Set by You"}
                      </span>
                      {b.originalPrice && b.originalPrice > b.price ? (
                        <span className="line-through text-[10px] text-muted-foreground">₹{b.originalPrice}</span>
                      ) : null}
                    </div>
                    <span className="text-[11px]">{b.duration}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Active Batch Summary Card */}
          {selectedBatch && (
            <Card className="rounded-2xl border border-primary/20 bg-primary/[0.02] p-4 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground text-xs">Selected: {selectedBatch.title}</span>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-6 text-[11px] px-2 rounded-lg gap-1 border-primary/30 text-primary"
                  onClick={() => handleOpenEditBatch(selectedBatch)}
                >
                  <Edit3 className="h-3 w-3" /> Edit Fee & Info
                </Button>
              </div>
              <p className="text-muted-foreground text-[11px] line-clamp-2">{selectedBatch.description}</p>
              <div className="flex items-center gap-2 pt-1 font-semibold text-primary">
                <span>Fee: {selectedBatch.price > 0 ? `₹${selectedBatch.price.toLocaleString("en-IN")}` : "Custom / On Request"}</span>
                <span>•</span>
                <span>{selectedBatch.classLevel}</span>
              </div>
            </Card>
          )}
        </div>

        {/* ================= COLUMN 2: SUBJECTS & CHAPTERS ================= */}
        <div className="lg:col-span-4 space-y-5">
          {/* Subjects Card */}
          <Card className="rounded-3xl border border-border/80 p-5 shadow-sm bg-card space-y-3">
            <div className="flex items-center justify-between pb-2 border-b">
              <span className="text-xs font-bold text-foreground">
                Subjects in {selectedBatch?.classLevel || "Selected Batch"}
              </span>
              <Button size="sm" variant="ghost" className="h-7 text-xs text-primary px-2" onClick={handleAddSubject}>
                <Plus className="h-3 w-3 mr-1" /> Add Subject
              </Button>
            </div>

            <div className="space-y-1.5">
              {currentSubjects.length === 0 ? (
                <p className="text-xs text-muted-foreground py-2 text-center">No subjects added yet. Click &apos;Add Subject&apos;.</p>
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
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 opacity-70 hover:opacity-100 rounded-md"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteSubject(sub.id, sub.name);
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                        <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-80" />
                      </div>
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
                <Plus className="h-3 w-3 mr-1" /> Add Chapter
              </Button>
            </div>

            <div className="space-y-1.5">
              {!selectedSubject ? (
                <p className="text-xs text-muted-foreground py-2 text-center">Select a subject above first.</p>
              ) : currentChapters.length === 0 ? (
                <p className="text-xs text-muted-foreground py-2 text-center">No chapters yet. Click &apos;Add Chapter&apos;.</p>
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
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 opacity-70 hover:opacity-100 rounded-md"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteChapter(ch.id, ch.name);
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                        <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-80" />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </Card>
        </div>

        {/* ================= COLUMN 3: CONTENT TABS (LECTURES, NOTES, PYQs) ================= */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="rounded-3xl border border-border/80 p-5 shadow-sm bg-card space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground truncate">
                  Chapter Content: {selectedChapter ? selectedChapter.name : "Select Chapter"}
                </span>
              </div>

              {/* Tabs for Lectures / Notes / PYQs */}
              <Tabs value={curriculumTab} onValueChange={(v) => setCurriculumTab(v as any)} className="w-full">
                <TabsList className="grid grid-cols-3 rounded-xl h-9 p-0.5">
                  <TabsTrigger value="lectures" className="rounded-lg text-[11px] font-semibold gap-1">
                    <Video className="h-3 w-3" /> Videos ({currentLectures.length})
                  </TabsTrigger>
                  <TabsTrigger value="notes" className="rounded-lg text-[11px] font-semibold gap-1">
                    <FileText className="h-3 w-3" /> Notes ({currentNotes.length})
                  </TabsTrigger>
                  <TabsTrigger value="pyqs" className="rounded-lg text-[11px] font-semibold gap-1">
                    <Award className="h-3 w-3 text-amber-500" /> PYQs ({currentPyqs.length})
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* TAB 1: LECTURES (YOUTUBE LINK) */}
            {curriculumTab === "lectures" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-semibold text-muted-foreground">YouTube Video Lectures</span>
                  <Button
                    size="sm"
                    disabled={!selectedChapter}
                    className="h-7 text-xs px-2.5 rounded-lg"
                    onClick={() => {
                      setEditingLectureId(null);
                      setLectureForm({ title: "", videoUrl: "", duration: "45 mins", isFreePreview: false });
                      setLectureModalOpen(true);
                    }}
                  >
                    <Plus className="h-3 w-3 mr-1" /> Add Video Link
                  </Button>
                </div>

                <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                  {!selectedChapter ? (
                    <p className="text-xs text-muted-foreground py-4 text-center">Select a chapter to manage video lectures.</p>
                  ) : currentLectures.length === 0 ? (
                    <div className="p-6 text-center border border-dashed rounded-2xl text-xs text-muted-foreground space-y-2">
                      <Video className="h-6 w-6 text-primary mx-auto opacity-50" />
                      <p>Aap YouTube unlisted link ya video link yahan add kar sakte hain.</p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-xl text-xs"
                        onClick={() => {
                          setEditingLectureId(null);
                          setLectureForm({ title: "", videoUrl: "", duration: "45 mins", isFreePreview: false });
                          setLectureModalOpen(true);
                        }}
                      >
                        + Add First Video
                      </Button>
                    </div>
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
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-5 w-5 text-muted-foreground hover:text-foreground"
                              title="Move Up"
                              onClick={() => reorderList(lectures, lectures.findIndex(l => l.id === lec.id), "up", setLectures)}
                            >
                              <ChevronUp className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-5 w-5 text-muted-foreground hover:text-foreground"
                              title="Move Down"
                              onClick={() => reorderList(lectures, lectures.findIndex(l => l.id === lec.id), "down", setLectures)}
                            >
                              <ChevronDown className="h-3 w-3" />
                            </Button>
                            <a href={lec.videoUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1 ml-1 font-medium">
                              <ExternalLink className="h-3 w-3" /> Open Link
                            </a>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-primary hover:bg-primary/10 rounded-md"
                              title="Edit Video Lecture"
                              onClick={() => {
                                setEditingLectureId(lec.id);
                                setLectureForm({
                                  title: lec.title,
                                  videoUrl: lec.videoUrl,
                                  duration: lec.duration,
                                  isFreePreview: lec.isFreePreview,
                                });
                                setLectureModalOpen(true);
                              }}
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-destructive hover:bg-destructive/10 rounded-md"
                              title="Delete Video Lecture"
                              onClick={() => handleDeleteLecture(lec.id, lec.title)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: PDF NOTES */}
            {curriculumTab === "notes" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-semibold text-muted-foreground">Chapter Study Notes & Formula Sheets</span>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={!selectedChapter}
                    className="h-7 text-xs px-2.5 rounded-lg border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/10"
                    onClick={() => setNoteModalOpen(true)}
                  >
                    <Plus className="h-3 w-3 mr-1" /> Add PDF Note
                  </Button>
                </div>

                <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                  {!selectedChapter ? (
                    <p className="text-xs text-muted-foreground py-4 text-center">Select a chapter to manage study notes.</p>
                  ) : currentNotes.length === 0 ? (
                    <div className="p-6 text-center border border-dashed rounded-2xl text-xs text-muted-foreground space-y-2">
                      <FileText className="h-6 w-6 text-emerald-500 mx-auto opacity-50" />
                      <p>Koi PDF note nahi hai. PDF link ya Drive link add karein.</p>
                      <Button size="sm" variant="outline" className="rounded-xl text-xs" onClick={() => setNoteModalOpen(true)}>
                        + Add First Note
                      </Button>
                    </div>
                  ) : (
                    currentNotes.map((note) => (
                      <div key={note.id} className="p-3 rounded-xl border border-border/80 bg-muted/20 space-y-1 text-xs">
                        <div className="font-semibold text-foreground line-clamp-1">{note.title}</div>
                        <div className="flex items-center justify-between pt-1 text-[10px] text-muted-foreground">
                          <a href={note.fileUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline flex items-center gap-1 font-medium">
                            <ExternalLink className="h-3 w-3" /> View / Download PDF
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
              </div>
            )}

            {/* TAB 3: PYQ (PREVIOUS YEAR QUESTIONS) */}
            {curriculumTab === "pyqs" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-semibold text-muted-foreground">Board & School PYQ Papers</span>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={!selectedChapter}
                    className="h-7 text-xs px-2.5 rounded-lg border-amber-500/30 text-amber-600 hover:bg-amber-500/10"
                    onClick={() => setPyqModalOpen(true)}
                  >
                    <Plus className="h-3 w-3 mr-1" /> Add PYQ Paper
                  </Button>
                </div>

                <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                  {!selectedChapter ? (
                    <p className="text-xs text-muted-foreground py-4 text-center">Select a chapter to manage PYQ papers.</p>
                  ) : currentPyqs.length === 0 ? (
                    <div className="p-6 text-center border border-dashed rounded-2xl text-xs text-muted-foreground space-y-2">
                      <Award className="h-6 w-6 text-amber-500 mx-auto opacity-50" />
                      <p>Past years question papers (CBSE/Bihar Board/School) yahan add karein.</p>
                      <Button size="sm" variant="outline" className="rounded-xl text-xs" onClick={() => setPyqModalOpen(true)}>
                        + Add First PYQ
                      </Button>
                    </div>
                  ) : (
                    currentPyqs.map((pyq) => (
                      <div key={pyq.id} className="p-3 rounded-xl border border-border/80 bg-muted/20 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                          <Badge className="bg-amber-500/10 text-amber-600 border-none text-[9px] py-0">
                            {pyq.boardExam}
                          </Badge>
                          <span className="text-[10px] font-bold text-foreground font-mono">Year {pyq.examYear}</span>
                        </div>

                        <div className="font-semibold text-foreground line-clamp-2">{pyq.title}</div>

                        <div className="flex items-center justify-between pt-1 border-t border-border/50 text-[10px] text-muted-foreground">
                          <a href={pyq.fileUrl} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline flex items-center gap-1 font-medium">
                            <ExternalLink className="h-3 w-3" /> Open Question & Solution PDF
                          </a>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 text-destructive rounded-md"
                            onClick={() => handleDeletePyq(pyq.id, pyq.title)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* ================= BATCH (CREATE / EDIT) MODAL ================= */}
      <Dialog open={batchModalOpen} onOpenChange={setBatchModalOpen}>
        <DialogContent className="rounded-3xl max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              {editingBatchId ? "Edit Batch & Price Settings" : "Create New Course Batch"}
            </DialogTitle>
            <DialogDescription className="text-xs">
              Aap batch ka naam, target class, fee price aur features apne hisaab se set kar sakte hain.
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
                <Label className="text-xs font-semibold">Category Wing *</Label>
                <select
                  value={batchForm.category}
                  onChange={(e) => setBatchForm({ ...batchForm, category: e.target.value as any })}
                  className="flex h-9 w-full rounded-xl border border-input bg-background px-3 py-1 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="junior">Junior Wing (Class 4 – 5)</option>
                  <option value="middle">Middle School (Class 6 – 8)</option>
                  <option value="secondary">High School (Class 9 – 10)</option>
                  <option value="senior">Senior Secondary (Class 11 – 12)</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Class / Target Grade *</Label>
                <Input
                  required
                  placeholder="e.g. Class 7th or Class 10th"
                  value={batchForm.classLevel}
                  onChange={(e) => setBatchForm({ ...batchForm, classLevel: e.target.value })}
                  className="rounded-xl text-xs"
                />
              </div>
            </div>

            {/* PRICING FIELDS - USER REQUESTED CONTROL */}
            <div className="p-3.5 rounded-2xl bg-primary/[0.04] border border-primary/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-primary" /> Batch Fee Settings
                </span>
                <span className="text-[10px] text-muted-foreground">0 rakhenge to &apos;Fee on Request&apos; dikhega</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Offer / Batch Fee (₹)</Label>
                  <Input
                    type="number"
                    min="0"
                    placeholder="e.g. 1000 or 0 for Contact"
                    value={batchForm.price}
                    onChange={(e) => setBatchForm({ ...batchForm, price: Number(e.target.value) })}
                    className="rounded-xl text-xs font-bold"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Original Fee (₹) [Optional]</Label>
                  <Input
                    type="number"
                    min="0"
                    placeholder="e.g. 1500 (optional)"
                    value={batchForm.originalPrice}
                    onChange={(e) => setBatchForm({ ...batchForm, originalPrice: Number(e.target.value) })}
                    className="rounded-xl text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Batch Duration</Label>
                <Input
                  placeholder="e.g. Full Session 2026-27 or Monthly"
                  value={batchForm.duration}
                  onChange={(e) => setBatchForm({ ...batchForm, duration: e.target.value })}
                  className="rounded-xl text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Batch Start Date</Label>
                <Input
                  placeholder="e.g. Admissions Open or 15 April"
                  value={batchForm.startDate}
                  onChange={(e) => setBatchForm({ ...batchForm, startDate: e.target.value })}
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
                {editingBatchId ? "Save Batch Changes & Update Homepage" : "Publish & Save New Batch"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ================= ADD / EDIT LECTURE MODAL ================= */}
      <Dialog open={lectureModalOpen} onOpenChange={setLectureModalOpen}>
        <DialogContent className="rounded-3xl max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              {editingLectureId ? "Edit YouTube Video Lecture" : "Add YouTube Video Lecture"}
            </DialogTitle>
            <DialogDescription className="text-xs">
              Attach a YouTube video link or unlisted class recording to {selectedChapter?.name}.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveLecture} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Lecture Title *</Label>
              <Input
                required
                placeholder="e.g. Lecture 03: Lens Formula & Numericals"
                value={lectureForm.title}
                onChange={(e) => setLectureForm({ ...lectureForm, title: e.target.value })}
                className="rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">YouTube URL / Video Link *</Label>
              <Input
                required
                placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                value={lectureForm.videoUrl}
                onChange={(e) => setLectureForm({ ...lectureForm, videoUrl: e.target.value })}
                className="rounded-xl text-xs font-mono"
              />
              <span className="text-[10px] text-muted-foreground block">
                Standard YouTube, unlisted, ya live streaming URL paste karein.
              </span>
            </div>

            {/* Instant Live Player Preview */}
            {extractYouTubeId(lectureForm.videoUrl) ? (
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Video Verified! Live Playable Preview:
                </span>
                <div className="rounded-2xl overflow-hidden border border-border/80 aspect-video bg-black shadow-inner">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${extractYouTubeId(lectureForm.videoUrl)}`}
                    title="Live YouTube Preview"
                    allowFullScreen
                  />
                </div>
              </div>
            ) : lectureForm.videoUrl.trim().length > 5 ? (
              <p className="text-[11px] text-amber-600 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
                ⚠️ Kripya valid YouTube video link daalein (e.g. youtube.com/watch?v=... ya youtu.be/...)
              </p>
            ) : null}

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
                {editingLectureId ? "Update Video Lecture" : "Save Video Lecture"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ================= ADD NOTE MODAL ================= */}
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
                placeholder="https://.../notes.pdf or Google Drive link"
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

      {/* ================= ADD PYQ MODAL ================= */}
      <Dialog open={pyqModalOpen} onOpenChange={setPyqModalOpen}>
        <DialogContent className="rounded-3xl max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Add Previous Year Questions (PYQ)</DialogTitle>
            <DialogDescription className="text-xs">
              Attach past board/school question papers and solved solution PDF for {selectedChapter?.name}.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSavePyq} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Paper Title *</Label>
              <Input
                required
                placeholder="e.g. CBSE 2024 Board Solved Question Paper"
                value={pyqForm.title}
                onChange={(e) => setPyqForm({ ...pyqForm, title: e.target.value })}
                className="rounded-xl text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Exam Year *</Label>
                <Input
                  required
                  placeholder="e.g. 2024, 2023, 2022"
                  value={pyqForm.examYear}
                  onChange={(e) => setPyqForm({ ...pyqForm, examYear: e.target.value })}
                  className="rounded-xl text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Board / Exam Type *</Label>
                <select
                  value={pyqForm.boardExam}
                  onChange={(e) => setPyqForm({ ...pyqForm, boardExam: e.target.value })}
                  className="flex h-9 w-full rounded-xl border border-input bg-background px-3 py-1 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="CBSE Board">CBSE Board</option>
                  <option value="Bihar Board">Bihar Board (BSEB)</option>
                  <option value="ICSE Board">ICSE Board</option>
                  <option value="School Annual">School Annual Exam</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Question Paper PDF Link *</Label>
              <Input
                required
                placeholder="https://.../pyq-2024.pdf or Google Drive link"
                value={pyqForm.fileUrl}
                onChange={(e) => setPyqForm({ ...pyqForm, fileUrl: e.target.value })}
                className="rounded-xl text-xs font-mono"
              />
            </div>

            <DialogFooter>
              <Button type="submit" className="rounded-2xl w-full text-xs font-semibold shadow-md">
                Publish PYQ Paper
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
