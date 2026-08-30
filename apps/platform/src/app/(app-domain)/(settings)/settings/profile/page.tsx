"use client";

import React from "react";
import { Button, Input, TextField, Label, TextArea } from "@heroui/react";

function UploadIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="17 8 12 3 7 8"></polyline>
      <line x1="12" y1="3" x2="12" y2="15"></line>
    </svg>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row md:gap-10 py-8 border-b border-zinc-200 dark:border-zinc-800 last:border-0">
      <div className="w-full md:w-1/3 mb-6 md:mb-0 shrink-0">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          {title}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
          {description}
        </p>
      </div>
      <div className="w-full md:w-2/3 max-w-2xl">
        {children}
      </div>
    </div>
  );
}

export default function ProfileSettingsPage() {
  return (
    <div className="flex flex-col">
      <Section
        title="Workspace Logo"
        description="Manage workspace logo and visual identity"
      >
        <div className="flex flex-col sm:flex-row gap-6 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="size-16 rounded-full bg-black dark:bg-white flex items-center justify-center shrink-0">
              <span className="text-white dark:text-black font-bold text-xl">W</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">The Web Dev Company</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">Professional Plan • Created January 2025</span>
            </div>
          </div>
          
          <div className="mt-4 sm:mt-0 sm:ml-auto flex items-center">
            <Button variant="outline" className="w-full sm:w-auto font-medium">
              <UploadIcon className="size-4 mr-2" />
              Upload
            </Button>
          </div>
        </div>
      </Section>

      <Section
        title="Workspace Information"
        description="Edit workspace name, URL and description details"
      >
        <div className="flex flex-col gap-6 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm">
          <div className="flex flex-col gap-2">
            <TextField name="workspace_name" defaultValue="The Web Dev Company">
              <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Workspace Name
              </Label>
              <Input 
                className="max-w-full"
              />
            </TextField>
          </div>

          <div className="flex flex-col gap-2">
            <TextField name="workspace_url" defaultValue="thewebdevcompany">
              <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Workspace URL
              </Label>
              <Input 
                className="max-w-full"
              />
            </TextField>
          </div>

          <div className="flex flex-col gap-2">
            <TextField name="industry" defaultValue="Technology">
              <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Industry
              </Label>
              <Input 
                className="max-w-full"
              />
            </TextField>
          </div>

          <div className="flex flex-col gap-2">
            <TextField name="description" defaultValue="We are a modern web development agency specializing in building scalable SaaS products, custom dashboards, and enterprise solutions. Our team collaborates daily using TaskFlow to manage projects, track progress, and deliver high quality work on time.">
              <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Description (Optional)
              </Label>
              <TextArea 
                className="max-w-full"
                rows={4}
              />
            </TextField>
          </div>

          <div className="flex justify-end pt-2">
            <Button className="font-medium bg-zinc-900 text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200">
              Save Changes
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
