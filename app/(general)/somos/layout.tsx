export default function SomosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>Somos</h1>
      {children}
    </div>
  );
}
