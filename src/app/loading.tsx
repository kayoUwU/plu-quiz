"use client";

import { PrimaryButton } from "@/components/button";

export default function Loading() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <h2 className="text-xl font-semibold">Loading ...</h2>
      <p>Could not find the requested page.</p>
      <PrimaryButton onClick={() => window.location.reload}>
        Refresh
      </PrimaryButton>
    </main>
  );
}
