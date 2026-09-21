import { listPendingReviewsAction } from "@/lib/actions/admin-review";
import { AdminReviewClient } from "@/components/admin/AdminReviewClient";

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage() {
  const result = await listPendingReviewsAction();

  return (
    <div className="app-shell min-h-screen px-4 py-6">
      <h1 className="font-display text-xl font-semibold text-ink">Pending official updates</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Detected updates that need a human check before they become part of an exam's real record.
      </p>

      {result.error ? (
        <p className="mt-6 text-sm text-ineligible-fg">{result.error}</p>
      ) : (
        <div className="mt-6">
          <AdminReviewClient initialUpdates={result.updates} />
        </div>
      )}
    </div>
  );
}
