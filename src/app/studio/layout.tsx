// This file is no longer needed and can be removed.
// The logic has been moved to src/app/layout.tsx to conditionally render the header and footer.
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
        {children}
    </>
  )
}
