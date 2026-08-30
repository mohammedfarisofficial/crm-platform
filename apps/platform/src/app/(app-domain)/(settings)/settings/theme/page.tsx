"use client";

import React, { useEffect, useState } from "react";
import { Label, ListBox, Select } from "@heroui/react";
import { useTheme } from "next-themes";
import type { Key } from "@heroui/react";

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

export default function ThemeSettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for mount before rendering the select value
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSelectionChange = (key: Key | null) => {
    if (key) {
      setTheme(key.toString());
    }
  };

  return (
    <div className="flex flex-col">
      <Section
        title="Appearance"
        description="Customize the look and feel of the platform."
      >
        <div className="flex flex-col gap-6 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm">
          <div className="flex flex-col gap-2">
            <Select 
              className="max-w-full"
              selectedKey={mounted ? theme : undefined}
              onSelectionChange={handleSelectionChange}
              placeholder="Select a theme"
            >
              <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Theme Preference
              </Label>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="system" textValue="System">
                    System
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="light" textValue="Light">
                    Light
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="dark" textValue="Dark">
                    Dark
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>
        </div>
      </Section>
    </div>
  );
}
