"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { DemoBanner } from "@/components/ui/DemoBanner";
import { CategoryFilterBar } from "@/components/exams/CategoryFilterBar";
import { PreparationCard } from "@/components/exams/PreparationCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ListSkeleton } from "@/components/ui/Skeleton";
import { demoExamCycles } from "@/lib/mock-data";
import { ExamCategory } from "@/lib/types";
import { useDemoLoadState } from "@/lib/useDemoLoadState";
import { PreparationIcon } from "@/components/ui/Icons";

export default function PreparationPage() {
  const { state, retry } = useDemoLoadState();
  const [category, setCategory] = useState<ExamCategory | "All">("All");

  const filtered = useMemo(
    () => (category === "All" ? demoExamCycles : demoExamCycles.filter((e) => e.category === category)),
    [category]
  );

  return (
    <AppShell title="Preparation">
      <DemoBanner />
      <p className="mt-2 text-sm text-ink-muted">
        Previous year papers, converted into timed mock tests, with a breakdown of your attempt after.
      </p>

      <div className="mt-4">
        <CategoryFilterBar selected={category} onSelect={setCategory} />
      </div>

      <div className="mt-4">
        {state === "loading" && <ListSkeleton count={3} />}
        {state === "error" && <ErrorState onRetry={retry} />}
        {state === "ready" && filtered.length === 0 && (
          <EmptyState
            icon={<PreparationIcon />}
            title="Nothing here yet"
            description="We haven't added previous year papers for this category yet."
          />
        )}
        {state === "ready" && filtered.length > 0 && (
          <div className="space-y-3">
            {filtered.map((exam) => (
              <PreparationCard key={exam.id} exam={exam} />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
