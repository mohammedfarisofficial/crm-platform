"use client";

import React from "react";
import { Button, Input, Switch, TextField, Label } from "@heroui/react";

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

export default function MetaSettingsPage() {
  return (
    <div className="flex flex-col">
      <Section
        title="SEO Meta Tags"
        description="Configure the default meta tags and OpenGraph properties for this workspace."
      >
        <div className="flex flex-col gap-6 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm">
          <div className="flex flex-col gap-2">
            <TextField name="meta_title" defaultValue="The Web Dev Company - Professional Services">
              <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Meta Title
              </Label>
              <Input 
                className="max-w-full"
              />
            </TextField>
          </div>

          <div className="flex flex-col gap-2">
            <TextField name="meta_description" defaultValue="We provide top-notch web development services.">
              <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Meta Description
              </Label>
              <Input 
                className="max-w-full"
              />
            </TextField>
          </div>
          
          <div className="flex justify-end pt-2">
            <Button className="font-medium bg-zinc-900 text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200">
              Save Meta Tags
            </Button>
          </div>
        </div>
      </Section>

      <Section
        title="Search Engine Indexing"
        description="Manage how search engines crawl and index your workspace pages."
      >
        <div className="flex flex-col gap-6 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Allow Indexing</span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">Let search engines index this workspace</span>
            </div>
            <Switch defaultSelected>
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
            </Switch>
          </div>
          <div className="h-px w-full bg-zinc-100 dark:bg-zinc-800 my-2" />
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Sitemap Generation</span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">Automatically generate sitemap.xml</span>
            </div>
            <Switch defaultSelected>
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
            </Switch>
          </div>
        </div>
      </Section>
    </div>
  );
}
