export default function SomosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>Hello Root Layout Somos</h1>
      {children}
    </div>
  );
}
