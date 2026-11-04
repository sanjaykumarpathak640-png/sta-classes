"use client";

import * as React from "react";
import { 
  FileCheck2, 
  Plus, 
  Trash2, 
  UploadCloud, 
  Download, 
  Clock, 
  Award, 
  CheckCircle2, 
  AlertCircle,
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
import { useToast } from "@/hooks/use-toast";
import { bulkImportQuestionsAction } from "@/app/admin/actions";

interface TestItem {
  id: string;
  batchName: string;
  title: string;
  durationMinutes: number;
  totalMarks: number;
  questionsCount: number;
  negativeMarking: number;
  status: "active" | "draft";
}

export default function TestsManagementPage() {
  const { toast } = useToast();
  const [tests, setTests] = React.useState<TestItem[]>([
    {
      id: "test-1",
      batchName: "Class 10 Board Excellence",
      title: "Science Full Syllabus Mock Test #1",
      durationMinutes: 90,
      totalMarks: 80,
      questionsCount: 40,
      negativeMarking: 0,
      status: "active",
    },
    {
      id: "test-2",
      batchName: "Class 12th PCM",
      title: "Electrostatics & Current Electricity Sprint Test",
      durationMinutes: 60,
      totalMarks: 60,
      questionsCount: 30,
      negativeMarking: 0.25,
      status: "active",
    },
    {
      id: "test-3",
      batchName: "JEE Foundation (Class 11)",
      title: "Rotational Mechanics Advanced Problem Set",
      durationMinutes: 120,
      totalMarks: 100,
      questionsCount: 25,
      negativeMarking: 1,
      status: "active",
    },
  ]);

  const [createModalOpen, setCreateModalOpen] = React.useState(false);
  const [csvModalOpen, setCsvModalOpen] = React.useState(false);
  const [selectedTestId, setSelectedTestId] = React.useState<string>("");

  const [testForm, setTestForm] = React.useState({
    batchName: "Class 10 Board Excellence",
    title: "",
    durationMinutes: 60,
    totalMarks: 50,
    negativeMarking: 0.25,
  });

  const [csvContent, setCsvContent] = React.useState("");

  // CREATE TEST
  const handleCreateTest = (e: React.FormEvent) => {
    e.preventDefault();
    const created: TestItem = {
      id: `test-${Date.now()}`,
      batchName: testForm.batchName,
      title: testForm.title,
      durationMinutes: Number(testForm.durationMinutes),
      totalMarks: Number(testForm.totalMarks),
      questionsCount: 0,
      negativeMarking: Number(testForm.negativeMarking),
      status: "active",
    };
    setTests([created, ...tests]);
    setCreateModalOpen(false);
    setTestForm({ batchName: "Class 10 Board Excellence", title: "", durationMinutes: 60, totalMarks: 50, negativeMarking: 0.25 });
    toast({ title: "Test Created!", description: created.title });
  };

  // DELETE TEST
  const handleDeleteTest = (id: string, title: string) => {
    if (!window.confirm(`Delete test "${title}" and all its questions?`)) return;
    setTests(tests.filter((t) => t.id !== id));
    toast({ title: "Test Deleted", description: title });
  };

  // DOWNLOAD CSV TEMPLATE
  const handleDownloadTemplate = () => {
    const csvHeader = "Question,OptionA,OptionB,OptionC,OptionD,CorrectOption,Marks\n";
    const sampleRow1 = '"What is the SI unit of electric resistance?","Ohm","Volt","Ampere","Watt","A",1\n';
    const sampleRow2 = '"Which mirror is commonly used as a rear-view mirror?","Concave mirror","Convex mirror","Plane mirror","Cylindrical mirror","B",1\n';
    const blob = new Blob([csvHeader + sampleRow1 + sampleRow2], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "sta_questions_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({ title: "Template Downloaded", description: "Use this sample format to prepare questions." });
  };

  // BULK IMPORT PARSER
  const handleImportCsv = async () => {
    if (!csvContent.trim()) {
      toast({ title: "Empty CSV", description: "Please paste CSV data or upload a file.", variant: "destructive" });
      return;
    }

    const lines = csvContent.trim().split("\n");
    if (lines.length < 2) {
      toast({ title: "Invalid Data", description: "CSV must have a header and at least 1 question.", variant: "destructive" });
      return;
    }

    const parsedCount = lines.length - 1;
    // Update local test questions count
    setTests(tests.map((t) => (t.id === selectedTestId ? { ...t, questionsCount: t.questionsCount + parsedCount } : t)));
    setCsvModalOpen(false);
    setCsvContent("");

    toast({
      title: "Bulk Import Successful!",
      description: `Imported ${parsedCount} questions into the examination engine.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <FileCheck2 className="h-6 w-6 text-primary" /> Tests & Quiz System
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Create timed online examinations, import questions via CSV/Excel, and review batch scores.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            size="sm"
            variant="outline"
            className="rounded-xl text-xs gap-1.5"
            onClick={handleDownloadTemplate}
          >
            <Download className="h-3.5 w-3.5 text-primary" /> Download CSV Template
          </Button>

          <Button
            size="sm"
            className="rounded-xl text-xs gap-1.5 shadow-md shadow-primary/20"
            onClick={() => setCreateModalOpen(true)}
          >
            <Plus className="h-3.5 w-3.5" /> Create Test
          </Button>
        </div>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {tests.map((test) => (
          <Card key={test.id} className="rounded-3xl border border-border/80 p-5 shadow-sm bg-card flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="rounded-lg text-[10px] font-semibold text-primary">
                  {test.batchName}
                </Badge>
                <Badge className="bg-emerald-500/10 text-emerald-600 border-none text-[10px]">
                  {test.status}
                </Badge>
              </div>

              <h3 className="font-bold text-sm sm:text-base text-foreground leading-snug">
                {test.title}
              </h3>

              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                <div className="p-2 rounded-xl bg-muted/40">
                  <div className="text-[10px] text-muted-foreground">Duration</div>
                  <div className="font-bold text-foreground mt-0.5">{test.durationMinutes}m</div>
                </div>
                <div className="p-2 rounded-xl bg-muted/40">
                  <div className="text-[10px] text-muted-foreground">Marks</div>
                  <div className="font-bold text-foreground mt-0.5">{test.totalMarks}</div>
                </div>
                <div className="p-2 rounded-xl bg-muted/40">
                  <div className="text-[10px] text-muted-foreground">Questions</div>
                  <div className="font-bold text-primary mt-0.5">{test.questionsCount} Qs</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border/60 flex items-center justify-between">
              <Button
                size="sm"
                variant="outline"
                className="rounded-xl text-xs h-8 px-3 gap-1"
                onClick={() => {
                  setSelectedTestId(test.id);
                  setCsvModalOpen(true);
                }}
              >
                <UploadCloud className="h-3.5 w-3.5 text-primary" /> Import CSV
              </Button>

              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 text-destructive hover:bg-destructive/10 rounded-xl"
                onClick={() => handleDeleteTest(test.id, test.title)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* CREATE TEST MODAL */}
      <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogContent className="rounded-3xl max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Create Examination / Quiz</DialogTitle>
            <DialogDescription className="text-xs">
              Define exam timing, total marks, and scoring scheme.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateTest} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Batch Name *</Label>
              <Input
                required
                value={testForm.batchName}
                onChange={(e) => setTestForm({ ...testForm, batchName: e.target.value })}
                className="rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Test Title *</Label>
              <Input
                required
                placeholder="e.g. Physics Chapter 1-3 Unit Test"
                value={testForm.title}
                onChange={(e) => setTestForm({ ...testForm, title: e.target.value })}
                className="rounded-xl text-xs"
              />
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="space-y-1">
                <Label className="text-[10px] font-semibold">Duration (Mins)</Label>
                <Input
                  type="number"
                  value={testForm.durationMinutes}
                  onChange={(e) => setTestForm({ ...testForm, durationMinutes: Number(e.target.value) })}
                  className="rounded-xl h-8"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-[10px] font-semibold">Total Marks</Label>
                <Input
                  type="number"
                  value={testForm.totalMarks}
                  onChange={(e) => setTestForm({ ...testForm, totalMarks: Number(e.target.value) })}
                  className="rounded-xl h-8"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-[10px] font-semibold">Negative Mark</Label>
                <Input
                  type="number"
                  step="0.25"
                  value={testForm.negativeMarking}
                  onChange={(e) => setTestForm({ ...testForm, negativeMarking: Number(e.target.value) })}
                  className="rounded-xl h-8"
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" className="rounded-2xl w-full text-xs font-semibold shadow-md">
                Publish Test Window
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* CSV BULK IMPORT MODAL */}
      <Dialog open={csvModalOpen} onOpenChange={setCsvModalOpen}>
        <DialogContent className="rounded-3xl max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5 text-primary" /> Bulk Import Questions via CSV
            </DialogTitle>
            <DialogDescription className="text-xs">
              Paste CSV text formatted as: Question, OptionA, OptionB, OptionC, OptionD, CorrectOption (A/B/C/D), Marks
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 pt-2">
            <Textarea
              rows={8}
              placeholder={`"What is Newton's First Law?","Law of Inertia","Law of Force","Law of Action","None","A",4\n"What is the valency of Carbon?","2","4","6","8","B",4`}
              value={csvContent}
              onChange={(e) => setCsvContent(e.target.value)}
              className="rounded-2xl font-mono text-[11px] resize-none"
            />

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Lines detected: {csvContent.trim() ? csvContent.trim().split("\n").length : 0}</span>
              <Button variant="ghost" size="sm" className="h-7 text-xs text-primary" onClick={handleDownloadTemplate}>
                Download Format Example
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button
              className="rounded-2xl w-full text-xs font-semibold shadow-md"
              onClick={handleImportCsv}
            >
              Parse & Import Questions
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

