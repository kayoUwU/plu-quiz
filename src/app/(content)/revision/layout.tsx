import { Metadata } from "next";

const TITLE = 'PLU code Revision';

export const metadata: Metadata = {
  title: TITLE,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full flex flex-col">
      <h1 className="flex-1 text-center">{TITLE}</h1>
      <div className="grow overflow-y-auto">{children}</div>
    </div>
  );
}
