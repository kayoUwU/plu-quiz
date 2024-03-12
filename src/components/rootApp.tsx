"use client";

import { ReactNode, useEffect } from "react";

import useSWwithWorkbox from "@/lib/servicesWorker";

export default function RootApp({ children }: { children: ReactNode }) {
  const [registerSWwithWorkbox] = useSWwithWorkbox();
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
