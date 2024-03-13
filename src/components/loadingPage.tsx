'use client';

import { PrimaryButton } from "@/components/button";

export default function loadingPage() {
  return (
    <>
      <h2 className="text-xl font-semibold">Loading ...</h2>
      <PrimaryButton onClick={() => window.location.reload}>
        Refresh
      </PrimaryButton>
    </>
  );
}
