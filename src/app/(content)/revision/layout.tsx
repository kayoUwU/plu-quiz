import { Metadata } from "next";

const TITLE = 'PLU code Revision';

export const metadata: Metadata = {
  title: TITLE,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full flex flex-col">
      <h1 className="text-center">{TITLE}</h1>
      <div className="grow overflow-y-hidden">{children}</div>
    </div>
  );
}
