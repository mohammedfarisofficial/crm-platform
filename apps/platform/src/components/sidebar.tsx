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
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  );
}

function DashboardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      xmlSpace="preserve"
      fill="currentColor"
      {...props}
    >
      <path d="M15 3.75a.75.75 0 0 0 0-1.5h-3.045c-1.837 0-3.276 0-4.419.124-1.165.126-2.11.388-2.916.974A5.8 5.8 0 0 0 3.348 4.62c-.586.807-.848 1.75-.974 2.916-.124 1.143-.124 2.582-.124 4.419v.09c0 1.837 0 3.276.124 4.419.126 1.165.388 2.11.974 2.916a5.8 5.8 0 0 0 1.272 1.272c.807.586 1.75.848 2.916.974 1.143.124 2.582.124 4.419.124h.09c1.837 0 3.276 0 4.419-.124 1.165-.126 2.11-.388 2.916-.974a5.8 5.8 0 0 0 1.272-1.272c.586-.807.848-1.75.974-2.916.124-1.143.124-2.582.124-4.419V9a.75.75 0 0 0-1.5 0v3c0 1.892-.001 3.25-.115 4.302-.113 1.038-.328 1.688-.697 2.196-.262.36-.58.678-.94.94-.508.37-1.158.585-2.196.697-1.052.114-2.41.115-4.302.115s-3.25-.001-4.302-.115c-1.038-.112-1.688-.328-2.196-.697a4.3 4.3 0 0 1-.94-.94c-.37-.508-.585-1.158-.697-2.196-.114-1.052-.115-2.41-.115-4.302s.001-3.25.115-4.302c.112-1.038.328-1.688.697-2.196.262-.36.58-.678.94-.94.508-.37 1.158-.585 2.196-.697C8.75 3.751 10.108 3.75 12 3.75z" />
      <path d="M6.327 14.527a.75.75 0 0 0 1.346.66l1.46-2.977c.453-.922 1.784-.877 2.173.074.879 2.149 3.884 2.25 4.907.166l1.46-2.977a.75.75 0 0 0-1.346-.66l-1.46 2.977c-.453.922-1.784.877-2.173-.074-.879-2.149-3.884-2.25-4.907-.166z" />
      <path fillRule="evenodd" d="M17.5 4a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0M19 4a1 1 0 1 0 2 0 1 1 0 0 0-2 0" clipRule="evenodd" />
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

function LeadsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
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
  const isLeadsActive = pathname.startsWith("/leads");
  const [isExpanded, setIsExpanded] = React.useState(true);

  return (
    <div className={`${isExpanded ? "w-64" : "w-18"} transition-all duration-300 h-full shrink-0 flex flex-col py-2 pl-2 pr-1 overflow-y-auto bg-transparent overflow-x-hidden`}>
      <div className="mb-6 px-2">
        <div className="flex items-center justify-between p-2 -mx-2 rounded-xl hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 cursor-pointer transition-colors border border-zinc-200/50 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-500 rounded-lg shrink-0"></div>
            {isExpanded && (
              <div className="flex flex-col whitespace-nowrap">
                <span className="text-xs text-zinc-500 font-medium">Organization</span>
                <span className="text-sm font-semibold">eClinical Solutions</span>
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
        <Link
          href="/"
          className={`w-full flex items-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 rounded-lg ${isExpanded ? "justify-start px-3 py-2.5" : "justify-center px-0 py-3"} ${
            pathname === "/" ? "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100" : ""
          }`}
        >
          <div className={`flex items-center ${isExpanded ? "gap-3" : ""}`}>
            <DashboardIcon className="size-4.5 shrink-0" />
            {isExpanded && <span>Dashboard</span>}
          </div>
        </Link>
        <Accordion
          className="px-0 w-full"
          defaultExpandedKeys={[
            ...(isSettingsActive ? ["settings"] : []),
            ...(isLeadsActive ? ["leads"] : [])
          ]}
        >
          <Accordion.Item id="leads">
            <Accordion.Heading>
              <Accordion.Trigger className={`w-full flex items-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 rounded-lg ${isExpanded ? "justify-between px-3 py-2.5" : "justify-center px-0 py-3"}`}>
                <div className={`flex items-center ${isExpanded ? "gap-3" : ""}`}>
                  <LeadsIcon className="size-4.5 shrink-0" />
                  {isExpanded && <span>Leads</span>}
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
                <div className={`flex flex-col gap-1 pr-2 pt-1 transition-all ${isExpanded ? "pl-5.5" : "pl-0"}`}>
                  <Link
                    href="/leads/all"
                    className={`text-sm py-2 flex items-center rounded-xl transition-all ${isExpanded ? "px-3 gap-3" : "justify-center px-0"} ${
                      pathname === "/leads/all"
                        ? "bg-white dark:bg-zinc-800 font-medium text-zinc-900 dark:text-zinc-100 border border-zinc-200/50 dark:border-zinc-700/50"
                        : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-200 border border-transparent"
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 shrink-0"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                    {isExpanded && <span>All Leads</span>}
                  </Link>
                  <Link
                    href="/leads/pipeline"
                    className={`text-sm py-2 flex items-center rounded-xl transition-all ${isExpanded ? "px-3 gap-3" : "justify-center px-0"} ${
                      pathname === "/leads/pipeline"
                        ? "bg-white dark:bg-zinc-800 font-medium text-zinc-900 dark:text-zinc-100 border border-zinc-200/50 dark:border-zinc-700/50"
                        : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-200 border border-transparent"
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 shrink-0"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="9" y1="3" x2="9" y2="21" /><path d="M17 3v18" /><path d="M3 9h6" /><path d="M3 15h6" /></svg>
                    {isExpanded && <span>Pipeline</span>}
                  </Link>
                </div>
              </Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item id="settings">
            <Accordion.Heading>
              <Accordion.Trigger className={`w-full flex items-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 rounded-lg ${isExpanded ? "justify-between px-3 py-2.5" : "justify-center px-0 py-3"}`}>
                <div className={`flex items-center ${isExpanded ? "gap-3" : ""}`}>
                  <SettingsIcon className="size-4.5 shrink-0" />
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
                <div className={`flex flex-col gap-1 pr-2 pt-1 transition-all ${isExpanded ? "pl-5.5" : "pl-0"}`}>
                  <Link
                    href="/settings/profile"
                    className={`text-sm py-2 flex items-center rounded-xl transition-all ${isExpanded ? "px-3 gap-3" : "justify-center px-0"} ${
                      pathname === "/settings/profile"
                        ? "bg-white dark:bg-zinc-800 font-medium text-zinc-900 dark:text-zinc-100 border border-zinc-200/50 dark:border-zinc-700/50"
                        : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-200 border border-transparent"
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 shrink-0"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" xmlSpace="preserve" fill="currentColor" className="opacity-70 shrink-0"><path fillRule="evenodd" d="M7.703 7a3.06 3.06 0 0 0-2.82 1.88c-.433 1.04-1.017 3.615-1.281 4.845-.074.34-.104.633-.08.896.078.88.35 1.3.606 1.516.267.227.673.363 1.267.363.653 0 1.26-.337 1.607-.89l1.645-2.632 2.187-3.645-.51-.85A3.06 3.06 0 0 0 7.704 7M12 7.39a5.056 5.056 0 0 0-8.963.721c-.52 1.249-1.143 4.038-1.39 5.194a5 5 0 0 0-.118 1.494c.111 1.24.54 2.214 1.305 2.863.753.639 1.687.838 2.561.838a3.9 3.9 0 0 0 3.303-1.83l1.65-2.64.01-.015L12 11.277l1.642 2.738.01.015 1.65 2.64a3.9 3.9 0 0 0 3.302 1.83c.983 0 2.005-.28 2.772-1.086.76-.799 1.124-1.96 1.124-3.414 0-.923-.35-2.266-.675-3.341a43 43 0 0 0-.815-2.422A5.056 5.056 0 0 0 12 7.39m1.166 1.943 2.187 3.645 1.644 2.631c.346.554.954.891 1.607.891.617 0 1.043-.17 1.323-.465.288-.301.573-.89.573-2.035 0-.584-.255-1.655-.59-2.764a41 41 0 0 0-.774-2.303 3.056 3.056 0 0 0-5.46-.45z" clipRule="evenodd" /></svg>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 shrink-0"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
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
