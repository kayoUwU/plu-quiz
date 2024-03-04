export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1 className="text-center">PLU Quiz</h1>
      <div>{children}</div>
    </>
  );
}
