export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1 className="text-center">PLU code Quiz</h1>
      <div>{children}</div>
    </>
  );
}
