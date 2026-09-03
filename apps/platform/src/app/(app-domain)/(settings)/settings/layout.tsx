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
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" xmlSpace="preserve" fill="currentColor"><path fillRule="evenodd" d="M7.703 7a3.06 3.06 0 0 0-2.82 1.88c-.433 1.04-1.017 3.615-1.281 4.845-.074.34-.104.633-.08.896.078.88.35 1.3.606 1.516.267.227.673.363 1.267.363.653 0 1.26-.337 1.607-.89l1.645-2.632 2.187-3.645-.51-.85A3.06 3.06 0 0 0 7.704 7M12 7.39a5.056 5.056 0 0 0-8.963.721c-.52 1.249-1.143 4.038-1.39 5.194a5 5 0 0 0-.118 1.494c.111 1.24.54 2.214 1.305 2.863.753.639 1.687.838 2.561.838a3.9 3.9 0 0 0 3.303-1.83l1.65-2.64.01-.015L12 11.277l1.642 2.738.01.015 1.65 2.64a3.9 3.9 0 0 0 3.302 1.83c.983 0 2.005-.28 2.772-1.086.76-.799 1.124-1.96 1.124-3.414 0-.923-.35-2.266-.675-3.341a43 43 0 0 0-.815-2.422A5.056 5.056 0 0 0 12 7.39m1.166 1.943 2.187 3.645 1.644 2.631c.346.554.954.891 1.607.891.617 0 1.043-.17 1.323-.465.288-.301.573-.89.573-2.035 0-.584-.255-1.655-.59-2.764a41 41 0 0 0-.774-2.303 3.056 3.056 0 0 0-5.46-.45z" clipRule="evenodd" /></svg>
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
