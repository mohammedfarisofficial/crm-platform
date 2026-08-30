import React from "react";
import { Sidebar } from "@/components/sidebar";

export default function AppDomainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-white dark:bg-black font-sans text-zinc-900 dark:text-zinc-100 overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-white dark:bg-black relative">
        {children}
      </main>
    </div>
  );
}
