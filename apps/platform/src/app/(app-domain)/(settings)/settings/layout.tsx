"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs } from "@heroui/react";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentPage = pathname.split("/").pop();
  const pageTitle = currentPage ? currentPage.charAt(0).toUpperCase() + currentPage.slice(1) : "Overview";

  return (
    <div className="flex-1 w-full py-5 px-6 sm:px-10 lg:px-12">
      <div className="mb-8 pt-2">
        <div className="flex items-center gap-2 text-[15px] mb-2">
          <span className="text-zinc-500 dark:text-zinc-400">Settings</span>
          <span className="text-zinc-300 dark:text-zinc-600">/</span>
          <span className="text-zinc-900 dark:text-zinc-100 font-medium">{pageTitle}</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>

      <div className="mb-8">
        <Tabs
          selectedKey={pathname}
          variant="secondary"
          className="w-full"
        >
          <Tabs.ListContainer className="border-b border-zinc-200 dark:border-zinc-800 bg-transparent">
            <Tabs.List aria-label="Settings Options" className="p-0 flex gap-6 border-none bg-transparent">
              <Tabs.Tab
                href="/settings/profile"
                id="/settings/profile"
                render={(domProps: any) => <Link {...domProps} />}
                className="px-1 py-3 text-sm font-medium data-[selected=true]:text-zinc-900 dark:data-[selected=true]:text-zinc-100 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 bg-transparent shadow-none"
              >
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  Profile
                </div>
                <Tabs.Indicator className="bg-zinc-900 dark:bg-zinc-100 rounded-none h-0.5 bottom-0" />
              </Tabs.Tab>
              <Tabs.Tab
                href="/settings/meta"
                id="/settings/meta"
                render={(domProps: any) => <Link {...domProps} />}
                className="px-1 py-3 text-sm font-medium data-[selected=true]:text-zinc-900 dark:data-[selected=true]:text-zinc-100 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 bg-transparent shadow-none"
              >
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>
                  Meta
                </div>
                <Tabs.Indicator className="bg-zinc-900 dark:bg-zinc-100 rounded-none h-0.5 bottom-0" />
              </Tabs.Tab>
              <Tabs.Tab
                href="/settings/theme"
                id="/settings/theme"
                render={(domProps: any) => <Link {...domProps} />}
                className="px-1 py-3 text-sm font-medium data-[selected=true]:text-zinc-900 dark:data-[selected=true]:text-zinc-100 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 bg-transparent shadow-none"
              >
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                  Theme
                </div>
                <Tabs.Indicator className="bg-zinc-900 dark:bg-zinc-100 rounded-none h-0.5 bottom-0" />
              </Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>
        </Tabs>
      </div>

      <div className="pb-20">
        {children}
      </div>
    </div>
  );
}
