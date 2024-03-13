
import Link from "next/link";

import { INDEX_PAGE } from "@/lib/constant";
import { PrimaryButton } from "@/components/button";

export default function NotFound() {
  return (
    <main className="flex h-screen flex-col items-center p-24">
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested page.</p>
      <Link href={INDEX_PAGE}>
        <PrimaryButton>Go Home</PrimaryButton>
      </Link>
    </main>
  );
}
