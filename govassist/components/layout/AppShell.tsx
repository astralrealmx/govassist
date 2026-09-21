import { ReactNode } from "react";
import { TopBar } from "./TopBar";
import { BottomNav } from "./BottomNav";

interface AppShellProps {
  children: ReactNode;
  title?: string;
  showBack?: boolean;
}

export function AppShell({ children, title, showBack }: AppShellProps) {
  return (
    <div className="app-shell">
      <TopBar title={title} showBack={showBack} />
      <main className="px-4 pb-24 pt-4">{children}</main>
      <BottomNav />
    </div>
  );
}
