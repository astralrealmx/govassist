"use client";

import { StatTile } from "@/components/exams/StatTile";
import { ProfileCompletionCard } from "@/components/profile/ProfileCompletionCard";
import { ExamCard } from "@/components/exams/ExamCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { DemoBanner } from "@/components/ui/DemoBanner";
import { ExamWithEligibility } from "@/lib/types";

interface HomeStats {
  potentiallyEligible: number;
  applicationsOpen: number;
  deadlinesNear: number;
  upcomingExams: number;
  admitCards: number;
  results: number;
  savedExams: number;
  applied: number;
}

interface HomeContentProps {
  firstName: string;
  completionPercent: number;
  stats: HomeStats;
  closingSoonExams: ExamWithEligibility[];
  savedSlugs: string[];
}

export function HomeContent({ firstName, completionPercent, stats, closingSoonExams, savedSlugs }: HomeContentProps) {
  const greetingHour = new Date().getHours();
  const greeting = greetingHour < 12 ? "Good morning" : greetingHour < 17 ? "Good afternoon" : "Good evening";

  return (
    <>
      {/* The exam/stat content below is still demo data (see lib/mock-data.ts)
          — only the greeting name, profile completion, and the eligibility
          computed against them are real. */}
      <DemoBanner label="Exam data below is sample — your name, profile %, and eligibility are computed live" />
      <h1 className="mt-2 text-xl font-semibold text-ink">
        {greeting}, {firstName}
      </h1>
      <p className="text-sm text-ink-muted">Here's where things stand today.</p>

      <div className="mt-5">
        <ProfileCompletionCard percent={completionPercent} />
      </div>

      <h2 className="mt-6 text-[15px] font-semibold text-ink">Your exam dashboard</h2>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <StatTile label="Potentially eligible" value={stats.potentiallyEligible} href="/exams" />
        <StatTile label="Applications open" value={stats.applicationsOpen} href="/jobs" />
        <StatTile label="Deadlines near" value={stats.deadlinesNear} href="/exams" />
        <StatTile label="Upcoming exams" value={stats.upcomingExams} href="/exams" />
        <StatTile label="Admit cards" value={stats.admitCards} href="/exams" />
        <StatTile label="Results" value={stats.results} href="/exams" />
        <StatTile label="Saved exams" value={stats.savedExams} href="/exams" />
        <StatTile label="Applied" value={stats.applied} href="/exams" />
      </div>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-[15px] font-semibold text-ink">Closing soon</h2>
      </div>

      {closingSoonExams.length > 0 ? (
        <div className="mt-3 space-y-3">
          {closingSoonExams.map(({ exam, eligibilityCategory }) => (
            <ExamCard key={exam.id} exam={exam} eligibilityCategory={eligibilityCategory} isSaved={savedSlugs.includes(exam.id)} />
          ))}
        </div>
      ) : (
        <div className="mt-3">
          <EmptyState
            title="Nothing closing soon"
            description="You're not tracking any application that's about to close."
          />
        </div>
      )}
    </>
  );
}
