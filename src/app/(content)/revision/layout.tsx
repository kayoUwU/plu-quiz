export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full flex flex-col">
      <h1 className="flex-1 text-center">PLU Revision</h1>
      <div className="grow overflow-y-auto">{children}</div>
    </div>
  );
}
