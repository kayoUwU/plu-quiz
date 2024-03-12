"use client";

import { ReactNode, useEffect } from "react";

import { registerSWwithWorkbox } from "@/lib/servicesWorker";

export default function RootApp({ children }: { children: ReactNode }) {
  useEffect(() => {
    registerSWwithWorkbox().catch((e) => {
      console.warn("fail to register services worker:", e);
    });
  }, []);

  return (
    <>
      <button id="install" hidden>
        Install
      </button>
      {children}
    </>
  );
}
