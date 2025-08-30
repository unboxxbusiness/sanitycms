// src/app/studio/layout.tsx
// This layout ensures that the Sanity Studio pages do not inherit the main application's header and footer.
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
