import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ChevronRightIcon } from "@/components/ui/Icons";

export function ProfileCompletionCard({ percent }: { percent: number }) {
  return (
    <Link href="/profile">
      <Card interactive className="p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[15px] font-semibold text-ink">Complete your profile</p>
            <p className="text-sm text-ink-muted">Better matches for eligibility once it's complete.</p>
          </div>
          <ChevronRightIcon className="shrink-0 text-ink-faint" />
        </div>
        <div className="mt-3 flex items-center gap-3">
          <ProgressBar percent={percent} />
          <span className="shrink-0 text-sm font-medium text-ink">{percent}%</span>
        </div>
      </Card>
    </Link>
  );
}
