import type { Metadata } from "next";

import '@/ui/globals.css';
import { DEFAULT_FONT } from '@/ui/fonts';

export const metadata: Metadata = {
  title: "PLU code Quiz",
  description: "quiz on entering the PLU code by looking at the : picture.",
  keywords:['PLU', 'Price look-up codes', 'Quiz'],
  openGraph: {
    type: "website",
    url: "http://localhost:3000/",
    title: "PLU code Quiz",
    description: "quiz on entering the PLU code by looking at the : picture.",
    siteName: "PLU code Quiz",
    images: [{
      url: "http://localhost:3000/next.svg",
    }],
  },
  //metadataBase
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${DEFAULT_FONT.className} antialiased bg-black`}>
        {children}
      </body>
    </html>
  );
}
