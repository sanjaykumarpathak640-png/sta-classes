"use client";

import * as React from "react";
import Link from "next/link";
import { 
  Users, 
  BookOpen, 
  AlertCircle, 
  CreditCard, 
  Radio, 
  HelpCircle, 
  ArrowUpRight, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Calendar,
  Sparkles,
  Plus
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar, 
  CartesianGrid 
} from "recharts";

export default function AdminDashboardPage() {
  // Sample analytics data for the dashboard
  const enrollmentTrend = [
    { month: "Nov", students: 320, collections: 240000 },
    { month: "Dec", students: 410, collections: 310000 },
    { month: "Jan", students: 540, collections: 420000 },
    { month: "Feb", students: 690, collections: 510000 },
    { month: "Mar", students: 880, collections: 680000 },
    { month: "Apr", students: 1120, collections: 890000 },
  ];

  const batchDistribution = [
    { name: "Class 10th", students: 480, fill: "#5B3DF5" },
    { name: "Class 12th", students: 390, fill: "#7C3AED" },
    { name: "JEE Foundation", students: 260, fill: "#3B82F6" },
    { name: "Class 9th", students: 190, fill: "#10B981" },
  ];

  const recentStudents = [
    { name: "Aarav Patel", batch: "Class 10 Board Excellence", phone: "+91 98765 11111", status: "pending", time: "10 mins ago" },
    { name: "Priya Sharma", batch: "Class 12th Science", phone: "+91 98765 22222", status: "pending", time: "25 mins ago" },
    { name: "Kabir Mehta", batch: "JEE Foundation (Class 11)", phone: "+91 98765 33333", status: "approved", time: "1 hour ago" },
    { name: "Ananya Dixit", batch: "Class 9th Foundation", phone: "+91 98765 44444", status: "approved", time: "3 hours ago" },
  ];

  const todayClasses = [
    { title: "Ray Optics Derivation Drill", batch: "Class 12th PCM", time: "05:00 PM – 06:30 PM", teacher: "Er. S. T. Agrawal" },
    { title: "Carbon & Its Compounds Q&A", batch: "Class 10th", time: "07:00 PM – 08:15 PM", teacher: "Dr. Ananya Sharma" },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-primary via-violet-600 to-indigo-600 p-6 sm:p-8 text-white shadow-xl shadow-primary/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <Badge className="bg-white/20 hover:bg-white/30 text-white border-none text-[11px] font-semibold px-3 py-1 rounded-full">
            <Sparkles className="h-3 w-3 mr-1.5" /> All Systems Live & Synced
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, Admin!
          </h2>
          <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
            Monitor real-time student admissions, publish lectures, review fee receipts, and customize your landing page.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button asChild variant="secondary" size="sm" className="rounded-xl text-xs font-semibold shadow-sm">
            <Link href="/admin/website">
              Edit Website CMS
            </Link>
          </Button>
          <Button asChild size="sm" className="rounded-xl bg-white text-primary hover:bg-white/90 text-xs font-semibold shadow-md">
            <Link href="/admin/batches">
              <Plus className="h-3.5 w-3.5 mr-1" /> New Batch
            </Link>
          </Button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="rounded-2xl border border-border/80 p-5 shadow-sm bg-card hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Total Enrolled</span>
            <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-foreground mt-2">
            1,320
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
            <TrendingUp className="h-3 w-3" /> +18% this month
          </div>
        </Card>

        <Card className="rounded-2xl border border-border/80 p-5 shadow-sm bg-card hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Pending Approvals</span>
            <div className="h-8 w-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <AlertCircle className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-500 mt-2">
            14
          </div>
          <Link href="/admin/students" className="text-[11px] text-primary font-semibold hover:underline mt-1 inline-block">
            Review signups →
          </Link>
        </Card>

        <Card className="rounded-2xl border border-border/80 p-5 shadow-sm bg-card hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Fees Pending</span>
            <div className="h-8 w-8 rounded-lg bg-red-500/10 text-red-600 flex items-center justify-center">
              <CreditCard className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-foreground mt-2">
            ₹1,45,000
          </div>
          <Link href="/admin/fees" className="text-[11px] text-muted-foreground hover:text-foreground mt-1 inline-block">
            Across 19 students
          </Link>
        </Card>

        <Card className="rounded-2xl border border-border/80 p-5 shadow-sm bg-card hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Today&apos;s Live</span>
            <div className="h-8 w-8 rounded-lg bg-sky-500/10 text-sky-600 flex items-center justify-center">
              <Radio className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-foreground mt-2">
            2 Classes
          </div>
          <Link href="/admin/live-classes" className="text-[11px] text-primary font-semibold hover:underline mt-1 inline-block">
            Starts at 5:00 PM →
          </Link>
        </Card>
      </div>

      {/* Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Chart: Student Enrollment Trends */}
        <Card className="lg:col-span-8 rounded-3xl border border-border/80 shadow-sm p-6 bg-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <CardTitle className="text-base font-bold">Admissions & Growth Trend</CardTitle>
              <CardDescription className="text-xs">Monthly enrolled students across all batches</CardDescription>
            </div>
            <Badge variant="outline" className="text-xs font-semibold text-primary border-primary/20 bg-primary/5">
              Last 6 Months
            </Badge>
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={enrollmentTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="studentGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5B3DF5" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#5B3DF5" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "1rem",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="students"
                  stroke="#5B3DF5"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#studentGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Right Chart: Batch Wise Student Distribution */}
        <Card className="lg:col-span-4 rounded-3xl border border-border/80 shadow-sm p-6 bg-card flex flex-col justify-between">
          <div>
            <CardTitle className="text-base font-bold">Batch Enrollments</CardTitle>
            <CardDescription className="text-xs mb-4">Distribution by course tier</CardDescription>

            <div className="h-[180px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={batchDistribution} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="name" tick={{ fontSize: 9 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "0.75rem",
                      fontSize: "11px",
                    }}
                  />
                  <Bar dataKey="students" fill="#5B3DF5" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-4 border-t border-border/60 text-xs space-y-2">
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Active Programs</span>
              <span className="font-bold text-foreground">4 Batches</span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Classroom Capacity</span>
              <span className="font-bold text-emerald-600">84% Occupied</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Two Column Section: Pending Approvals & Today's Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Student Registrations */}
        <Card className="rounded-3xl border border-border/80 shadow-sm p-6 bg-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <CardTitle className="text-base font-bold">Recent Student Signups</CardTitle>
              <CardDescription className="text-xs">Quick review & approval queue</CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm" className="text-xs text-primary font-semibold">
              <Link href="/admin/students">View All</Link>
            </Button>
          </div>

          <div className="space-y-3">
            {recentStudents.map((st, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-2xl bg-muted/40 hover:bg-muted/70 transition-colors border border-border/50"
              >
                <div>
                  <div className="font-bold text-xs sm:text-sm text-foreground">{st.name}</div>
                  <div className="text-[11px] text-muted-foreground">{st.batch}</div>
                  <div className="text-[10px] text-muted-foreground font-mono">{st.phone}</div>
                </div>

                <div className="text-right space-y-1">
                  {st.status === "pending" ? (
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20 text-[10px] font-semibold">
                      Pending
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px] font-semibold">
                      Approved
                    </Badge>
                  )}
                  <div className="text-[10px] text-muted-foreground">{st.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Today's Live Classes */}
        <Card className="rounded-3xl border border-border/80 shadow-sm p-6 bg-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <CardTitle className="text-base font-bold">Today&apos;s Live Timetable</CardTitle>
              <CardDescription className="text-xs">Scheduled lectures for today</CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm" className="text-xs text-primary font-semibold">
              <Link href="/admin/live-classes">Schedule Class</Link>
            </Button>
          </div>

          <div className="space-y-3">
            {todayClasses.map((cl, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl border border-primary/20 bg-primary/[0.03] space-y-2"
              >
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="rounded-lg text-[10px] font-semibold text-primary">
                    {cl.batch}
                  </Badge>
                  <span className="text-xs font-mono font-medium text-foreground flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-primary" /> {cl.time}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-foreground">{cl.title}</h4>
                <div className="text-xs text-muted-foreground flex items-center justify-between pt-1 border-t border-border/50">
                  <span>Faculty: {cl.teacher}</span>
                  <span className="text-primary font-semibold text-[11px]">Google Meet Link Ready</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

