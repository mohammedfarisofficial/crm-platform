import React from "react";
import { Sidebar } from "@/components/sidebar";

export default function AppDomainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-100 overflow-hidden">
      <div className="p-2 pr-0 shrink-0 h-screen flex">
        <div className="rounded-3xl bg-zinc-50 dark:bg-zinc-950 flex flex-col overflow-hidden">
          <Sidebar />
        </div>
      </div>
      <div className="flex-1 py-2 pr-2 pl-1 overflow-hidden flex flex-col">
        <main className="flex-1 overflow-y-auto bg-white dark:bg-black rounded-3xl border border-zinc-200 dark:border-zinc-800 relative">
          {children}
        </main>
      </div>
    </div>
  );
}
