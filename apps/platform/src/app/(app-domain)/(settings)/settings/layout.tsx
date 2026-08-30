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

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto py-10 px-6 sm:px-10 lg:px-12">
      <div className="mb-8">
        <h1 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2">Settings</h1>
        <h2 className="text-3xl font-semibold tracking-tight">Settings</h2>
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
                Profile
                <Tabs.Indicator className="bg-zinc-900 dark:bg-zinc-100 rounded-none h-0.5 bottom-0" />
              </Tabs.Tab>
              <Tabs.Tab
                href="/settings/meta"
                id="/settings/meta"
                render={(domProps: any) => <Link {...domProps} />}
                className="px-1 py-3 text-sm font-medium data-[selected=true]:text-zinc-900 dark:data-[selected=true]:text-zinc-100 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 bg-transparent shadow-none"
              >
                Meta
                <Tabs.Indicator className="bg-zinc-900 dark:bg-zinc-100 rounded-none h-0.5 bottom-0" />
              </Tabs.Tab>
              <Tabs.Tab
                href="/settings/theme"
                id="/settings/theme"
                render={(domProps: any) => <Link {...domProps} />}
                className="px-1 py-3 text-sm font-medium data-[selected=true]:text-zinc-900 dark:data-[selected=true]:text-zinc-100 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 bg-transparent shadow-none"
              >
                Theme
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
