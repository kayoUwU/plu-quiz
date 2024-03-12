
import Link from "next/link";

import { INDEX_PAGE } from "@/lib/constant";
import { PrimaryButton } from "@/components/button";

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested page.</p>
      <Link href={INDEX_PAGE}>
        <PrimaryButton>Go Home</PrimaryButton>
      </Link>
    </main>
  );
}
