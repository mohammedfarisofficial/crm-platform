"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Accordion } from "@heroui/react";

function SettingsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  );
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const isSettingsActive = pathname.startsWith("/settings");

  return (
    <div className="w-64 h-screen flex-shrink-0 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 flex flex-col p-4 sticky top-0 overflow-y-auto">
      <div className="mb-8 px-2 flex items-center gap-3">
        <div className="size-8 bg-zinc-900 dark:bg-zinc-100 rounded-lg flex items-center justify-center shadow-sm">
          <span className="text-zinc-100 dark:text-zinc-900 font-bold text-sm">CRM</span>
        </div>
        <span className="font-semibold text-lg dark:text-zinc-100 text-zinc-900">Platform</span>
      </div>

      <nav className="flex-1 flex flex-col gap-1">
        <Accordion
          className="px-0 w-full"
          defaultExpandedKeys={isSettingsActive ? ["settings"] : []}
        >
          <Accordion.Item id="settings">
            <Accordion.Heading>
              <Accordion.Trigger className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100">
                <div className="flex items-center gap-3">
                  <SettingsIcon className="size-[18px]" />
                  <span>Settings</span>
                </div>
                <Accordion.Indicator className="text-zinc-400">
                  <ChevronDownIcon className="size-4" />
                </Accordion.Indicator>
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body className="px-0 pb-1 pt-0">
                <div className="flex flex-col gap-0.5 pl-[38px] pr-2 pt-1">
                  <Link
                    href="/settings/profile"
                    className={`text-sm py-1.5 px-3 rounded-md transition-colors ${
                      pathname === "/settings/profile"
                        ? "bg-zinc-200/50 dark:bg-zinc-800 font-medium text-zinc-900 dark:text-zinc-100"
                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                    }`}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/settings/meta"
                    className={`text-sm py-1.5 px-3 rounded-md transition-colors ${
                      pathname === "/settings/meta"
                        ? "bg-zinc-200/50 dark:bg-zinc-800 font-medium text-zinc-900 dark:text-zinc-100"
                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                    }`}
                  >
                    Meta
                  </Link>
                  <Link
                    href="/settings/theme"
                    className={`text-sm py-1.5 px-3 rounded-md transition-colors ${
                      pathname === "/settings/theme"
                        ? "bg-zinc-200/50 dark:bg-zinc-800 font-medium text-zinc-900 dark:text-zinc-100"
                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                    }`}
                  >
                    Theme
                  </Link>
                </div>
              </Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </nav>
      
      <div className="mt-auto px-2 pb-2">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer border border-transparent dark:hover:border-zinc-800">
          <div className="size-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-bold uppercase ring-1 ring-inset ring-indigo-500/10 dark:ring-indigo-500/20">
            MF
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium leading-tight">Mohammed Faris</span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
}
