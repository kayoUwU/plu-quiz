"use client";

import { memo } from "react";

import { PrimaryButton } from "@/components/button";

function Offline() {
  return (
    <main className="flex h-screen flex-col items-center justify-between p-24">
      <p>waiting for network ...</p>
      <PrimaryButton onClick={() => window.location.reload}>
        Refresh
      </PrimaryButton>
    </main>
  );
}

export default memo(Offline);
