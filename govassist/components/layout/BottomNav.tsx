"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  JobsIcon,
  ExamsIcon,
  PreparationIcon,
  DocumentsIcon,
  ProfileIcon,
} from "@/components/ui/Icons";
import { cx } from "@/lib/utils";

const items = [
  { href: "/home", label: "Home", icon: HomeIcon },
  { href: "/jobs", label: "Jobs", icon: JobsIcon },
  { href: "/exams", label: "My Exams", icon: ExamsIcon },
  { href: "/preparation", label: "Prepare", icon: PreparationIcon },
  { href: "/documents", label: "Documents", icon: DocumentsIcon },
  { href: "/profile", label: "Profile", icon: ProfileIcon },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-1/2 z-40 w-full max-w-app -translate-x-1/2 border-t border-hairline bg-paper-raised pb-[env(safe-area-inset-bottom)]"
      aria-label="Primary"
    >
      <ul className="flex items-stretch justify-between">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname?.startsWith(href + "/");
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cx(
                  "flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium tap-target",
                  active ? "text-brand-600" : "text-ink-faint"
                )}
              >
                <Icon width={22} height={22} strokeWidth={active ? 2.1 : 1.8} />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
