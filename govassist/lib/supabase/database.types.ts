// ---------------------------------------------------------------------------
// These types mirror supabase/migrations/0001_init.sql. Once the project is
// linked to a real Supabase instance, regenerate with:
//   npx supabase gen types typescript --linked > lib/supabase/database.types.ts
// and replace this file — it's hand-written to unblock Phase 2 development
// without CLI/network access in this environment.
// ---------------------------------------------------------------------------

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          phone: string | null;
          created_at: string;
          last_login_at: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["users"]["Row"]> & { id: string; email: string };
        Update: Partial<Database["public"]["Tables"]["users"]["Row"]>;
      };
      admins: {
        Row: { user_id: string; granted_at: string; granted_by: string | null };
        Insert: Partial<Database["public"]["Tables"]["admins"]["Row"]> & { user_id: string };
        Update: Partial<Database["public"]["Tables"]["admins"]["Row"]>;
      };
      profiles: {
        Row: {
          user_id: string;
          full_name: string;
          dob: string;
          gender: "Male" | "Female" | "Other";
          state: string;
          category: "General" | "OBC" | "SC" | "ST" | "EWS";
          is_pwbd: boolean;
          preferred_categories: string[];
          onboarding_completed_at: string | null;
          saved_exam_slugs: string[];
          notification_preferences: { deadline?: boolean; admit_card?: boolean; result?: boolean; system?: boolean };
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["profiles"]["Row"]> & { user_id: string; full_name: string; dob: string; gender: string; state: string; category: string };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Row"]>;
      };
      education: {
        Row: {
          id: string;
          user_id: string;
          qualification_level: string;
          institution_name: string | null;
          board_or_university: string | null;
          subject: string | null;
          passing_year: number | null;
          percentage_or_cgpa: string | null;
          source: "manual" | "ocr" | "digilocker";
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["education"]["Row"]> & { user_id: string; qualification_level: string };
        Update: Partial<Database["public"]["Tables"]["education"]["Row"]>;
      };
      documents: {
        Row: {
          id: string;
          user_id: string;
          document_type: string;
          status: "not_uploaded" | "processing" | "needs_review" | "verified";
          storage_path: string | null;
          file_name: string | null;
          source: "manual_upload" | "digilocker" | null;
          extracted_fields: { label: string; value: string; confidence: "high" | "medium" | "low"; confirmed: boolean }[];
          uploaded_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["documents"]["Row"]> & { user_id: string; document_type: string };
        Update: Partial<Database["public"]["Tables"]["documents"]["Row"]>;
      };
      exams: {
        Row: {
          id: string;
          slug: string;
          name: string;
          short_name: string;
          category: string;
          state: string | null;
          recruiting_body: string;
          official_website: string;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["exams"]["Row"]> & { slug: string; name: string; short_name: string; category: string; recruiting_body: string; official_website: string };
        Update: Partial<Database["public"]["Tables"]["exams"]["Row"]>;
      };
      exam_cycles: {
        Row: {
          id: string;
          exam_id: string;
          cycle_label: string;
          status: "draft" | "published" | "archived";
          official_notification_url: string;
          notification_date: string;
          last_verified_date: string;
          last_verified_by: string | null;
          qualification_summary: string;
          age_min: number | null;
          age_max: number | null;
          age_relaxation_rules: Record<string, number>;
          qualification_rules: Record<string, unknown>;
          category_rules: Record<string, unknown>;
          domicile_required: boolean;
          vacancies: number | null;
          application_start_date: string | null;
          application_end_date: string | null;
          exam_pattern: { tierLabel: string; sections: string[]; duration: string; negativeMarking: string }[];
          important_dates: { label: string; date: string; isTentative?: boolean }[];
          // Phase 4 — structured eligibility fields (0004_eligibility_rules.sql).
          // All nullable: null means this cycle doesn't impose that condition.
          age_cutoff_date: string | null;
          required_degree: string | null;
          required_subject: string | null;
          min_percentage: number | null;
          gender_requirement: "Male" | "Female" | "Other" | null;
          physical_requirements: string | null;
          experience_requirements: string | null;
          other_conditions: string | null;
          // Phase 5 — structured notification fields (0005_notification_fields.sql)
          post: string | null;
          official_application_url: string | null;
          admit_card_date: string | null;
          answer_key_date: string | null;
          result_date: string | null;
          syllabus_summary: string | null;
          marking_scheme_summary: string | null;
          // Phase 5.5 — official update pipeline fields (0007_source_monitoring.sql)
          current_status:
            | "upcoming" | "applications_open" | "applications_closed" | "exam_date_announced"
            | "admit_card_available" | "exam_completed" | "answer_key_available"
            | "objection_window_open" | "result_declared" | "completed" | null;
          objection_window_start: string | null;
          objection_window_end: string | null;
          cutoff_summary: string | null;
          admit_card_url: string | null;
          answer_key_url: string | null;
          result_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["exam_cycles"]["Row"]> & {
          exam_id: string; cycle_label: string; official_notification_url: string;
          notification_date: string; last_verified_date: string; qualification_summary: string;
        };
        Update: Partial<Database["public"]["Tables"]["exam_cycles"]["Row"]>;
      };
      job_notifications: {
        Row: {
          id: string;
          exam_cycle_id: string;
          event_type: "notification_published" | "corrigendum" | "admit_card_released" | "result_declared" | "deadline_extended";
          headline: string;
          detail: string | null;
          source_url: string | null;
          event_date: string;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["job_notifications"]["Row"]> & { exam_cycle_id: string; event_type: string; headline: string; event_date: string };
        Update: Partial<Database["public"]["Tables"]["job_notifications"]["Row"]>;
      };
      notification_sources: {
        Row: {
          id: string;
          organization: string;
          exam_id: string | null;
          official_url: string;
          source_type: "notification_page" | "pdf_index" | "admit_card_page" | "answer_key_page" | "result_page" | "other";
          enabled: boolean;
          check_frequency_minutes: number;
          last_checked_at: string | null;
          last_success_at: string | null;
          last_error: string | null;
          needs_parser_maintenance: boolean;
          parser_version: string;
          last_content_hash: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["notification_sources"]["Row"]> & {
          organization: string; official_url: string; source_type: string;
        };
        Update: Partial<Database["public"]["Tables"]["notification_sources"]["Row"]>;
      };
      detected_updates: {
        Row: {
          id: string;
          source_id: string;
          exam_cycle_id: string | null;
          update_type:
            | "new_notification" | "corrigendum" | "application_start_date" | "application_end_date_change"
            | "exam_date" | "admit_card" | "answer_key" | "response_sheet" | "objection_window"
            | "result" | "cutoff" | "other";
          title: string;
          official_url: string;
          document_url: string | null;
          publication_date: string | null;
          content_hash: string;
          extracted_fields: { label: string; value: string; confidence: "high" | "medium" | "low" }[];
          classification: "auto_publish" | "needs_review" | "reject";
          status: "pending" | "approved" | "rejected" | "published";
          detected_at: string;
          processed_at: string | null;
          reviewed_by: string | null;
          reviewed_at: string | null;
          review_notes: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["detected_updates"]["Row"]> & {
          source_id: string; update_type: string; title: string; official_url: string;
          content_hash: string; classification: string;
        };
        Update: Partial<Database["public"]["Tables"]["detected_updates"]["Row"]>;
      };
      source_audit_log: {
        Row: {
          id: string;
          source_id: string | null;
          detected_update_id: string | null;
          event_type: "checked" | "check_succeeded" | "check_failed" | "change_detected" | "duplicate_skipped" | "published" | "reviewed";
          previous_value: unknown;
          new_value: unknown;
          processing_status: string | null;
          validation_status: string | null;
          reviewer: string | null;
          notes: string | null;
          detected_at: string;
          processed_at: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["source_audit_log"]["Row"]> & { event_type: string };
        Update: Partial<Database["public"]["Tables"]["source_audit_log"]["Row"]>;
      };
      saved_exams: {
        Row: { user_id: string; exam_cycle_id: string; saved_at: string };
        Insert: { user_id: string; exam_cycle_id: string; saved_at?: string };
        Update: Partial<Database["public"]["Tables"]["saved_exams"]["Row"]>;
      };
      applications: {
        Row: {
          id: string;
          user_id: string;
          exam_cycle_id: string;
          status: "applied" | "withdrawn";
          application_reference_number: string | null;
          applied_at: string;
          notes: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["applications"]["Row"]> & { user_id: string; exam_cycle_id: string };
        Update: Partial<Database["public"]["Tables"]["applications"]["Row"]>;
      };
      mock_tests: {
        Row: {
          id: string;
          exam_id: string | null;
          title: string;
          duration_seconds: number;
          questions: { id: string; section: string; prompt: string; options: string[]; correctIndex: number }[];
          source: "pyq" | "practice";
          year: number | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["mock_tests"]["Row"]> & { title: string; duration_seconds: number };
        Update: Partial<Database["public"]["Tables"]["mock_tests"]["Row"]>;
      };
      mock_attempts: {
        Row: {
          id: string;
          user_id: string;
          mock_test_id: string;
          started_at: string;
          submitted_at: string | null;
          answers: Record<string, number>;
          correct_count: number | null;
          incorrect_count: number | null;
          unattempted_count: number | null;
          time_taken_seconds: number | null;
        };
        Insert: Partial<Database["public"]["Tables"]["mock_attempts"]["Row"]> & { user_id: string; mock_test_id: string };
        Update: Partial<Database["public"]["Tables"]["mock_attempts"]["Row"]>;
      };
      answer_keys: {
        Row: {
          id: string;
          exam_cycle_id: string;
          tier_label: string;
          is_final: boolean;
          official_source_url: string;
          published_date: string;
          answers: { questionNumber: number; correctOption: number; marks: number; negativeMarks: number }[];
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["answer_keys"]["Row"]> & { exam_cycle_id: string; tier_label: string; official_source_url: string; published_date: string };
        Update: Partial<Database["public"]["Tables"]["answer_keys"]["Row"]>;
      };
      results: {
        Row: {
          id: string;
          user_id: string;
          exam_cycle_id: string;
          result_status: "declared" | "awaited";
          score: number | null;
          rank: number | null;
          selected: boolean | null;
          official_source_url: string | null;
          declared_at: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["results"]["Row"]> & { user_id: string; exam_cycle_id: string; result_status: string };
        Update: Partial<Database["public"]["Tables"]["results"]["Row"]>;
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          job_notification_id: string | null;
          title: string;
          body: string;
          type: "deadline" | "admit_card" | "result" | "system";
          is_read: boolean;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["notifications"]["Row"]> & { user_id: string; title: string; body: string; type: string };
        Update: Partial<Database["public"]["Tables"]["notifications"]["Row"]>;
      };
    };
  };
}
