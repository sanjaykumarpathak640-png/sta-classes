"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/admin-guard";

export type ActionResponse = {
  success: boolean;
  message: string;
  data?: any;
};

// 1. SITE SETTINGS
export async function updateSiteSettingsAction(settingsData: any): Promise<ActionResponse> {
  await requireAdmin();
  const supabase = createClient();

  const { data, error } = await supabase
    .from("site_settings")
    .upsert({
      id: 1,
      ...settingsData,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/website");
  return { success: true, message: "Site settings updated successfully!", data };
}

// 2. SECTION SETTINGS (Show/Hide toggles)
export async function updateSectionSettingsAction(sections: Array<{ section_key: string; is_visible: boolean }>): Promise<ActionResponse> {
  await requireAdmin();
  const supabase = createClient();

  for (const s of sections) {
    await supabase
      .from("section_settings")
      .upsert({
        section_key: s.section_key,
        is_visible: s.is_visible,
        updated_at: new Date().toISOString(),
      });
  }

  revalidatePath("/");
  revalidatePath("/admin/website");
  return { success: true, message: "Section visibility updated successfully!" };
}

// 3. HERO SLIDE
export async function upsertHeroSlideAction(heroData: any): Promise<ActionResponse> {
  await requireAdmin();
  const supabase = createClient();

  const { data, error } = await supabase
    .from("hero_slides")
    .upsert(heroData)
    .select()
    .single();

  if (error) return { success: false, message: error.message };

  revalidatePath("/");
  revalidatePath("/admin/website");
  return { success: true, message: "Hero section saved successfully!", data };
}

// 4. STATS
export async function upsertStatAction(statData: any): Promise<ActionResponse> {
  await requireAdmin();
  const supabase = createClient();

  const { data, error } = await supabase
    .from("stats")
    .upsert(statData)
    .select()
    .single();

  if (error) return { success: false, message: error.message };

  revalidatePath("/");
  revalidatePath("/admin/website");
  return { success: true, message: "Stat counter saved successfully!", data };
}

export async function deleteStatAction(id: string): Promise<ActionResponse> {
  await requireAdmin();
  const supabase = createClient();

  const { error } = await supabase.from("stats").delete().eq("id", id);
  if (error) return { success: false, message: error.message };

  revalidatePath("/");
  revalidatePath("/admin/website");
  return { success: true, message: "Stat deleted successfully!" };
}

// 5. FACULTY
export async function upsertFacultyAction(facultyData: any): Promise<ActionResponse> {
  await requireAdmin();
  const supabase = createClient();

  const { data, error } = await supabase
    .from("faculty")
    .upsert(facultyData)
    .select()
    .single();

  if (error) return { success: false, message: error.message };

  revalidatePath("/");
  revalidatePath("/admin/website");
  return { success: true, message: "Faculty member saved successfully!", data };
}

export async function deleteFacultyAction(id: string): Promise<ActionResponse> {
  await requireAdmin();
  const supabase = createClient();

  const { error } = await supabase.from("faculty").delete().eq("id", id);
  if (error) return { success: false, message: error.message };

  revalidatePath("/");
  revalidatePath("/admin/website");
  return { success: true, message: "Faculty member removed successfully!" };
}

// 6. TOPPERS / RESULTS
export async function upsertTopperAction(topperData: any): Promise<ActionResponse> {
  await requireAdmin();
  const supabase = createClient();

  const { data, error } = await supabase
    .from("toppers")
    .upsert(topperData)
    .select()
    .single();

  if (error) return { success: false, message: error.message };

  revalidatePath("/");
  revalidatePath("/admin/website");
  return { success: true, message: "Topper record saved successfully!", data };
}

export async function deleteTopperAction(id: string): Promise<ActionResponse> {
  await requireAdmin();
  const supabase = createClient();

  const { error } = await supabase.from("toppers").delete().eq("id", id);
  if (error) return { success: false, message: error.message };

  revalidatePath("/");
  revalidatePath("/admin/website");
  return { success: true, message: "Topper record deleted!" };
}

// 7. TESTIMONIALS
export async function upsertTestimonialAction(testimonialData: any): Promise<ActionResponse> {
  await requireAdmin();
  const supabase = createClient();

  const { data, error } = await supabase
    .from("testimonials")
    .upsert(testimonialData)
    .select()
    .single();

  if (error) return { success: false, message: error.message };

  revalidatePath("/");
  revalidatePath("/admin/website");
  return { success: true, message: "Testimonial saved successfully!", data };
}

export async function deleteTestimonialAction(id: string): Promise<ActionResponse> {
  await requireAdmin();
  const supabase = createClient();

  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) return { success: false, message: error.message };

  revalidatePath("/");
  revalidatePath("/admin/website");
  return { success: true, message: "Testimonial deleted!" };
}

// 8. FAQS
export async function upsertFaqAction(faqData: any): Promise<ActionResponse> {
  await requireAdmin();
  const supabase = createClient();

  const { data, error } = await supabase
    .from("faqs")
    .upsert(faqData)
    .select()
    .single();

  if (error) return { success: false, message: error.message };

  revalidatePath("/");
  revalidatePath("/admin/website");
  return { success: true, message: "FAQ saved successfully!", data };
}

export async function deleteFaqAction(id: string): Promise<ActionResponse> {
  await requireAdmin();
  const supabase = createClient();

  const { error } = await supabase.from("faqs").delete().eq("id", id);
  if (error) return { success: false, message: error.message };

  revalidatePath("/");
  revalidatePath("/admin/website");
  return { success: true, message: "FAQ deleted!" };
}

// 9. GALLERY
export async function upsertGalleryImageAction(imageData: any): Promise<ActionResponse> {
  await requireAdmin();
  const supabase = createClient();

  const { data, error } = await supabase
    .from("gallery_images")
    .upsert(imageData)
    .select()
    .single();

  if (error) return { success: false, message: error.message };

  revalidatePath("/");
  revalidatePath("/admin/website");
  return { success: true, message: "Gallery image saved!", data };
}

export async function deleteGalleryImageAction(id: string): Promise<ActionResponse> {
  await requireAdmin();
  const supabase = createClient();

  const { error } = await supabase.from("gallery_images").delete().eq("id", id);
  if (error) return { success: false, message: error.message };

  revalidatePath("/");
  revalidatePath("/admin/website");
  return { success: true, message: "Gallery image deleted!" };
}

// 10. BATCHES & CURRICULUM
export async function upsertBatchAction(batchData: any, features: string[] = []): Promise<ActionResponse> {
  await requireAdmin();
  const supabase = createClient();

  const { data: batch, error } = await supabase
    .from("batches")
    .upsert(batchData)
    .select()
    .single();

  if (error) return { success: false, message: error.message };

  // Update batch features
  if (features && features.length > 0) {
    await supabase.from("batch_features").delete().eq("batch_id", batch.id);
    const featureRows = features.map((f, idx) => ({
      batch_id: batch.id,
      feature_text: f,
      order_index: idx + 1,
    }));
    await supabase.from("batch_features").insert(featureRows);
  }

  revalidatePath("/");
  revalidatePath("/admin/batches");
  return { success: true, message: "Batch saved successfully!", data: batch };
}

export async function deleteBatchAction(id: string): Promise<ActionResponse> {
  await requireAdmin();
  const supabase = createClient();

  const { error } = await supabase.from("batches").delete().eq("id", id);
  if (error) return { success: false, message: error.message };

  revalidatePath("/");
  revalidatePath("/admin/batches");
  return { success: true, message: "Batch and associated curriculum deleted!" };
}

// SUBJECTS, CHAPTERS, LECTURES, NOTES
export async function upsertSubjectAction(subjectData: any): Promise<ActionResponse> {
  await requireAdmin();
  const supabase = createClient();
  const { data, error } = await supabase.from("subjects").upsert(subjectData).select().single();
  if (error) return { success: false, message: error.message };
  revalidatePath("/admin/batches");
  return { success: true, message: "Subject saved!", data };
}

export async function deleteSubjectAction(id: string): Promise<ActionResponse> {
  await requireAdmin();
  const supabase = createClient();
  const { error } = await supabase.from("subjects").delete().eq("id", id);
  if (error) return { success: false, message: error.message };
  revalidatePath("/admin/batches");
  return { success: true, message: "Subject deleted!" };
}

export async function upsertChapterAction(chapterData: any): Promise<ActionResponse> {
  await requireAdmin();
  const supabase = createClient();
  const { data, error } = await supabase.from("chapters").upsert(chapterData).select().single();
  if (error) return { success: false, message: error.message };
  revalidatePath("/admin/batches");
  return { success: true, message: "Chapter saved!", data };
}

export async function deleteChapterAction(id: string): Promise<ActionResponse> {
  await requireAdmin();
  const supabase = createClient();
  const { error } = await supabase.from("chapters").delete().eq("id", id);
  if (error) return { success: false, message: error.message };
  revalidatePath("/admin/batches");
  return { success: true, message: "Chapter deleted!" };
}

export async function upsertLectureAction(lectureData: any): Promise<ActionResponse> {
  await requireAdmin();
  const supabase = createClient();
  const { data, error } = await supabase.from("lectures").upsert(lectureData).select().single();
  if (error) return { success: false, message: error.message };
  revalidatePath("/admin/batches");
  return { success: true, message: "Lecture saved!", data };
}

export async function deleteLectureAction(id: string): Promise<ActionResponse> {
  await requireAdmin();
  const supabase = createClient();
  const { error } = await supabase.from("lectures").delete().eq("id", id);
  if (error) return { success: false, message: error.message };
  revalidatePath("/admin/batches");
  return { success: true, message: "Lecture deleted!" };
}

export async function upsertNoteAction(noteData: any): Promise<ActionResponse> {
  await requireAdmin();
  const supabase = createClient();
  const { data, error } = await supabase.from("notes").upsert(noteData).select().single();
  if (error) return { success: false, message: error.message };
  revalidatePath("/admin/batches");
  return { success: true, message: "Note PDF saved!", data };
}

export async function deleteNoteAction(id: string): Promise<ActionResponse> {
  await requireAdmin();
  const supabase = createClient();
  const { error } = await supabase.from("notes").delete().eq("id", id);
  if (error) return { success: false, message: error.message };
  revalidatePath("/admin/batches");
  return { success: true, message: "Note deleted!" };
}

// 11. STUDENTS MANAGEMENT
export async function updateStudentApprovalAction(studentId: string, isApproved: boolean): Promise<ActionResponse> {
  await requireAdmin();
  const supabase = createClient();

  const { error } = await supabase
    .from("profiles")
    .update({ is_approved: isApproved, updated_at: new Date().toISOString() })
    .eq("id", studentId);

  if (error) return { success: false, message: error.message };
  revalidatePath("/admin/students");
  return { success: true, message: isApproved ? "Student approved successfully!" : "Student unapproved." };
}

export async function updateStudentBlockStatusAction(studentId: string, isBlocked: boolean): Promise<ActionResponse> {
  await requireAdmin();
  const supabase = createClient();

  const { error } = await supabase
    .from("profiles")
    .update({ is_blocked: isBlocked, updated_at: new Date().toISOString() })
    .eq("id", studentId);

  if (error) return { success: false, message: error.message };
  revalidatePath("/admin/students");
  return { success: true, message: isBlocked ? "Student blocked from platform." : "Student unblocked." };
}

export async function enrollStudentAction(studentId: string, batchId: string): Promise<ActionResponse> {
  await requireAdmin();
  const supabase = createClient();

  const { error } = await supabase
    .from("enrollments")
    .upsert({
      student_id: studentId,
      batch_id: batchId,
      status: "active",
      enrolled_at: new Date().toISOString(),
    });

  if (error) return { success: false, message: error.message };
  revalidatePath("/admin/students");
  return { success: true, message: "Student enrolled in batch successfully!" };
}

export async function removeStudentFromBatchAction(studentId: string, batchId: string): Promise<ActionResponse> {
  await requireAdmin();
  const supabase = createClient();

  const { error } = await supabase
    .from("enrollments")
    .delete()
    .eq("student_id", studentId)
    .eq("batch_id", batchId);

  if (error) return { success: false, message: error.message };
  revalidatePath("/admin/students");
  return { success: true, message: "Student removed from batch." };
}

// 12. LIVE CLASSES
export async function upsertLiveClassAction(classData: any): Promise<ActionResponse> {
  await requireAdmin();
  const supabase = createClient();

  const { data, error } = await supabase
    .from("live_classes")
    .upsert(classData)
    .select()
    .single();

  if (error) return { success: false, message: error.message };
  revalidatePath("/admin/live-classes");
  return { success: true, message: "Live class scheduled successfully!", data };
}

export async function deleteLiveClassAction(id: string): Promise<ActionResponse> {
  await requireAdmin();
  const supabase = createClient();

  const { error } = await supabase.from("live_classes").delete().eq("id", id);
  if (error) return { success: false, message: error.message };
  revalidatePath("/admin/live-classes");
  return { success: true, message: "Live class deleted!" };
}

// 13. TESTS & BULK IMPORT
export async function upsertTestAction(testData: any): Promise<ActionResponse> {
  await requireAdmin();
  const supabase = createClient();

  const { data, error } = await supabase
    .from("tests")
    .upsert(testData)
    .select()
    .single();

  if (error) return { success: false, message: error.message };
  revalidatePath("/admin/tests");
  return { success: true, message: "Test created/updated successfully!", data };
}

export async function deleteTestAction(id: string): Promise<ActionResponse> {
  await requireAdmin();
  const supabase = createClient();

  const { error } = await supabase.from("tests").delete().eq("id", id);
  if (error) return { success: false, message: error.message };
  revalidatePath("/admin/tests");
  return { success: true, message: "Test deleted!" };
}

export async function bulkImportQuestionsAction(testId: string, questionsList: any[]): Promise<ActionResponse> {
  await requireAdmin();
  const supabase = createClient();

  const rows = questionsList.map((q, idx) => ({
    test_id: testId,
    question_text: q.question_text,
    image_url: q.image_url || null,
    options: q.options,
    correct_option: q.correct_option,
    marks: Number(q.marks) || 4,
    order_index: idx + 1,
  }));

  const { error } = await supabase.from("questions").insert(rows);
  if (error) return { success: false, message: error.message };

  revalidatePath("/admin/tests");
  return { success: true, message: `Successfully imported ${rows.length} questions into test!` };
}

// 14. DOUBTS INBOX
export async function answerDoubtAction(doubtId: string, answerText: string): Promise<ActionResponse> {
  const { profile } = await requireAdmin();
  const supabase = createClient();

  const { error } = await supabase
    .from("doubts")
    .update({
      answer: answerText,
      answered_by: profile?.id || null,
      answered_at: new Date().toISOString(),
      status: "answered",
    })
    .eq("id", doubtId);

  if (error) return { success: false, message: error.message };
  revalidatePath("/admin/doubts");
  return { success: true, message: "Doubt reply sent to student!" };
}

// 15. ATTENDANCE
export async function markBatchAttendanceAction(
  batchId: string,
  date: string,
  attendanceMap: Record<string, "present" | "absent" | "late">
): Promise<ActionResponse> {
  await requireAdmin();
  const supabase = createClient();

  const rows = Object.entries(attendanceMap).map(([studentId, status]) => ({
    batch_id: batchId,
    student_id: studentId,
    date,
    status,
  }));

  const { error } = await supabase.from("attendance").upsert(rows);
  if (error) return { success: false, message: error.message };

  revalidatePath("/admin/attendance");
  return { success: true, message: `Attendance marked for ${rows.length} students on ${date}!` };
}

// 16. FEES RECORD
export async function recordFeePaymentAction(feeData: any): Promise<ActionResponse> {
  await requireAdmin();
  const supabase = createClient();

  const { data, error } = await supabase.from("fees").upsert(feeData).select().single();
  if (error) return { success: false, message: error.message };

  revalidatePath("/admin/fees");
  return { success: true, message: "Fee transaction recorded successfully!", data };
}

// 17. NOTICES
export async function broadcastNoticeAction(noticeData: any): Promise<ActionResponse> {
  await requireAdmin();
  const supabase = createClient();

  const { data, error } = await supabase.from("notices").insert(noticeData).select().single();
  if (error) return { success: false, message: error.message };

  revalidatePath("/");
  revalidatePath("/admin/notices");
  return { success: true, message: "Notice published & broadcasted successfully!", data };
}

export async function deleteNoticeAction(id: string): Promise<ActionResponse> {
  await requireAdmin();
  const supabase = createClient();

  const { error } = await supabase.from("notices").delete().eq("id", id);
  if (error) return { success: false, message: error.message };

  revalidatePath("/admin/notices");
  return { success: true, message: "Notice deleted!" };
}

