import type { Metadata } from "next";

import "@/ui/globals.css";
import { DEFAULT_FONT } from "@/ui/fonts";
import { SITE_BASE_URL, BASE_PATH, WEB_ICON } from "@/lib/constant";
import { AppProvider } from "@/data/store/appProvider";
import RootApp from "@/components/rootApp";

export const metadata: Metadata = {
  title: "PLU code Quiz",
  description: "quiz on entering the PLU code by looking at the picture.",
  keywords: ["PLU", "Price look-up codes", "Quiz"],
  openGraph: {
    type: "website",
    url: SITE_BASE_URL,
    title: "PLU code Quiz",
    description: "quiz on entering the PLU code by looking at the picture.",
    siteName: "PLU code Quiz",
  },
  icons: {
    icon: WEB_ICON,
  },
  // metadataBase: new URL(SITE_BASE_URL), //dont new URL('');
  manifest: BASE_PATH.concat("/manifest.json")
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${DEFAULT_FONT.className} antialiased bg-gradient-to-b from-orange-500 to-red-500`}
      >
        <AppProvider>
          <RootApp>{children}</RootApp>
        </AppProvider>
      </body>
    </html>
  );
}
