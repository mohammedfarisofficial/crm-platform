import React from "react";
import { SidebarLayout } from "@/components/sidebar-layout";

export default function AppDomainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarLayout>{children}</SidebarLayout>;
}
