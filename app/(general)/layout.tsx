import { Navbar } from '../../components/navbar/Navbar'
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main>
        <h1>Hello Root Layout Public</h1>
        {children}
      </main>
    </>
  )
}
