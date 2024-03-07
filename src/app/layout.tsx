import type { Metadata } from "next";

import '@/ui/globals.css';
import { DEFAULT_FONT } from '@/ui/fonts';
import { SITE_BASE_URL } from '@/lib/constant';
import {AnsweredProvider} from '@/data/store/answeredContext';

export const metadata: Metadata = {
  title: "PLU code Quiz",
  description: "quiz on entering the PLU code by looking at the picture.",
  keywords:['PLU', 'Price look-up codes', 'Quiz'],
  openGraph: {
    type: "website",
    url: SITE_BASE_URL,
    title: "PLU code Quiz",
    description: "quiz on entering the PLU code by looking at the picture.",
    siteName: "PLU code Quiz",
  },
  metadataBase: new URL(SITE_BASE_URL),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${DEFAULT_FONT.className} antialiased bg-gradient-to-b from-orange-500 to-red-500`}>
        <AnsweredProvider>
          {children}
        </AnsweredProvider>
      </body>
    </html>
  );
}
