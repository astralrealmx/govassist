"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BackArrowIcon, BellIcon } from "@/components/ui/Icons";
import { demoNotifications } from "@/lib/mock-data";

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  showBell?: boolean;
}

export function TopBar({ title, showBack, showBell = true }: TopBarProps) {
  const router = useRouter();
  const unreadCount = demoNotifications.filter((n) => !n.isRead).length;

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-hairline bg-paper/95 px-4 backdrop-blur">
      <div className="flex items-center gap-2">
        {showBack ? (
          <button
            onClick={() => router.back()}
            aria-label="Go back"
            className="-ml-2 flex tap-target items-center justify-center text-ink"
          >
            <BackArrowIcon />
          </button>
        ) : null}
        {title ? (
          <h1 className="text-[17px] font-semibold text-ink">{title}</h1>
        ) : (
          <span className="font-display text-[19px] font-semibold text-brand-700">GovAssist</span>
        )}
      </div>
      {showBell && (
        <Link
          href="/notifications"
          aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
          className="relative flex tap-target items-center justify-center text-ink"
        >
          <BellIcon />
          {unreadCount > 0 && (
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent-500" />
          )}
        </Link>
      )}
    </header>
  );
}
