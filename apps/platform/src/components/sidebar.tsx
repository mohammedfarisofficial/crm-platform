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

function SidebarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M21.97 15V9C21.97 4 19.97 2 14.97 2H8.96997C3.96997 2 1.96997 4 1.96997 9V15C1.96997 20 3.96997 22 8.96997 22H14.97C19.97 22 21.97 20 21.97 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.96997 2V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14.97 9.43994L12.41 11.9999L14.97 14.5599" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const isSettingsActive = pathname.startsWith("/settings");
  const [isExpanded, setIsExpanded] = React.useState(true);

  return (
    <div className={`${isExpanded ? "w-64" : "w-[72px]"} transition-all duration-300 h-full flex-shrink-0 flex flex-col py-2 pl-2 pr-1 overflow-y-auto bg-transparent overflow-x-hidden`}>
      <div className="mb-6 px-2">
        <div className="flex items-center justify-between p-2 -mx-2 rounded-xl hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 cursor-pointer transition-colors border border-zinc-200/50 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex-shrink-0"></div>
            {isExpanded && (
              <div className="flex flex-col whitespace-nowrap">
                <span className="text-xs text-zinc-500 font-medium">Sales</span>
                <span className="text-sm font-semibold">Mohammed Faris</span>
              </div>
            )}
          </div>
          {isExpanded && (
            <button onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }} className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-md transition-colors">
              <SidebarIcon className="size-4 text-zinc-400" />
            </button>
          )}
          {!isExpanded && (
             <div className="absolute left-full ml-2 opacity-0">
                 {/* Placeholder to keep alignment if needed, but we handle toggle inside the icon or outside */}
             </div>
          )}
        </div>
      </div>
      
      {!isExpanded && (
        <div className="px-2 mb-4 flex justify-center">
          <button onClick={() => setIsExpanded(true)} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-xl transition-colors bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200 dark:border-zinc-800">
            <SidebarIcon className="size-5 text-zinc-500" />
          </button>
        </div>
      )}

      <nav className="flex-1 flex flex-col gap-1">
        <Accordion
          className="px-0 w-full"
          defaultExpandedKeys={isSettingsActive ? ["settings"] : []}
        >
          <Accordion.Item id="settings">
            <Accordion.Heading>
              <Accordion.Trigger className={`w-full flex items-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 rounded-lg ${isExpanded ? "justify-between px-3 py-2.5" : "justify-center px-0 py-3"}`}>
                <div className={`flex items-center ${isExpanded ? "gap-3" : ""}`}>
                  <SettingsIcon className="size-[18px] flex-shrink-0" />
                  {isExpanded && <span>Settings</span>}
                </div>
                {isExpanded && (
                  <Accordion.Indicator className="text-zinc-400">
                    <ChevronDownIcon className="size-4" />
                  </Accordion.Indicator>
                )}
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body className="px-0 pb-1 pt-0">
                <div className={`flex flex-col gap-1 pr-2 pt-1 transition-all ${isExpanded ? "pl-[22px]" : "pl-0"}`}>
                  <Link
                    href="/settings/profile"
                    className={`text-sm py-2 flex items-center rounded-xl transition-all ${isExpanded ? "px-3 gap-3" : "justify-center px-0"} ${
                      pathname === "/settings/profile"
                        ? "bg-white dark:bg-zinc-800 font-medium text-zinc-900 dark:text-zinc-100 border border-zinc-200/50 dark:border-zinc-700/50"
                        : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-200 border border-transparent"
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 flex-shrink-0"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    {isExpanded && <span>Profile</span>}
                  </Link>
                  <Link
                    href="/settings/meta"
                    className={`text-sm py-2 flex items-center rounded-xl transition-all ${isExpanded ? "px-3 gap-3" : "justify-center px-0"} ${
                      pathname === "/settings/meta"
                        ? "bg-white dark:bg-zinc-800 font-medium text-zinc-900 dark:text-zinc-100 border border-zinc-200/50 dark:border-zinc-700/50"
                        : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-200 border border-transparent"
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 flex-shrink-0"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>
                    {isExpanded && <span>Meta</span>}
                  </Link>
                  <Link
                    href="/settings/theme"
                    className={`text-sm py-2 flex items-center rounded-xl transition-all ${isExpanded ? "px-3 gap-3" : "justify-center px-0"} ${
                      pathname === "/settings/theme"
                        ? "bg-white dark:bg-zinc-800 font-medium text-zinc-900 dark:text-zinc-100 border border-zinc-200/50 dark:border-zinc-700/50"
                        : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-200 border border-transparent"
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 flex-shrink-0"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                    {isExpanded && <span>Theme</span>}
                  </Link>
                </div>
              </Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </nav>

    </div>
  );
}
