'use client';
 
import { useEffect } from 'react';

import { PrimaryButton } from "@/components/button";
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error("error",error);
  }, [error]);
 
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <PrimaryButton
        onClick={
          // Attempt to recover by trying to re-render the route
          () => reset()
        }
      >
        Try again
      </PrimaryButton>
    </main>
  );
}