"use client";

import React from "react";
import Button from "../components/Button";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen">
      <h1 className="text-3xl font-semibold mb-8">Federated UI App</h1>
      <div className="w-full max-w-3xl flex flex-col items-center justify-center p-8 border-4 border-dashed border-zinc-200 rounded-xl mb-12">
        <p className="text-sm text-zinc-500 mb-4">This app exposes UI components via Module Federation.</p>
        <Button variant="primary">Sample Button</Button>
      </div>
    </div>
  );
}
