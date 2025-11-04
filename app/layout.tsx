import "./globals.css";
import Link from "next/link";
import AudioToggle from "@/components/AudioToggle";

export const metadata = {
  title: "Ethics-Tech-Policy Decisions Sandbox",
  description: "A web-based simulator for ethical tradeoffs in tech and policy.",
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return (
    <html lang="en">
      <body className="min-h-screen suspense-bg">
        <header className="border-b bg-white/80 backdrop-blur">
          <nav className="mx-auto max-w-5xl flex items-center justify-between p-3">
            <Link href="/" className="font-semibold">
              Ethics-Tech-Policy Decisions Sandbox
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/about" className="text-sm">About</Link>
              <AudioToggle />
            </div>
          </nav>
          <div className="mx-auto max-w-5xl px-3 pb-3 text-xs text-gray-600">
            <strong>Disclaimer:</strong> An independent capstone project by Joshua Williams for the Ethics+Tech Public Policy Practitioner Course; not associated with the McCoy Family Center for Ethics in Society staff.
          </div>
        </header>
        <main className="mx-auto max-w-5xl p-4">{children}</main>
      </body>
    </html>
  );
}
