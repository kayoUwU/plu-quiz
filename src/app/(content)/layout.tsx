import NavLink from "@/components/navLink";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen overflow-y-hidden flex flex-col items-stretch content-center">
      <div className="flex-none">
        <NavLink/>
      </div>
      
      <div className="grow self-center p-6 md:p-12 container max-w-screen-md h-full overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
