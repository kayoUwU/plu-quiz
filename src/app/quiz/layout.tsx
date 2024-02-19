import NavLink from "@/components/navLink";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col items-stretch content-center">
      <div className="flex-none">
        <NavLink/>
      </div>
      <div className="grow self-center p-6 md:p-24 container max-w-screen-md">
        <h1 className="text-center">PLU Quiz</h1>
        <div className="md:overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
