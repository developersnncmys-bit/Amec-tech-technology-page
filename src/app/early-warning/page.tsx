import { notFound } from "next/navigation";

// Early Warning page is temporarily disabled. The full original page is
// preserved alongside this file as `page.tsx.bak` (Next.js / TypeScript
// ignore the .bak extension). To restore: delete this file and rename
// page.tsx.bak → page.tsx, then uncomment the nav entry in Header.tsx.
export default function EarlyWarningPage() {
  notFound();
}
