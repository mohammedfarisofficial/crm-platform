"use client";

import Image from "next/image";
import React, { Suspense } from "react";

import dynamic from "next/dynamic";

const SampleComponent = dynamic(() => import("legacyApp/SampleComponent"), { ssr: false });
const Button = dynamic(() => import("federatedApp/Button"), { ssr: false });

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        
        <h1 className="text-3xl font-semibold mb-8">Next.js Module Federation Host</h1>
        
        <div className="w-full p-8 border-4 border-dashed border-zinc-200 rounded-xl mb-12 flex flex-col items-center">
          <p className="text-sm text-zinc-500 mb-4">The component below is dynamically loaded from the Legacy App (Port 5050)</p>
          <Suspense fallback={<div className="animate-pulse bg-zinc-200 h-32 w-full rounded-lg">Loading Federated Component...</div>}>
            <SampleComponent />
          </Suspense>
        </div>

        <div className="w-full p-8 border-4 border-dashed border-zinc-200 rounded-xl mb-12 flex flex-col items-center">
          <p className="text-sm text-zinc-500 mb-4">The component below is dynamically loaded from the UI App (Port 6060)</p>
          <Suspense fallback={<div className="animate-pulse bg-zinc-200 h-10 w-32 rounded-lg">Loading...</div>}>
            <Button variant="primary">Federated Button</Button>
          </Suspense>
        </div>

        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
      </main>
    </div>
  );
}
