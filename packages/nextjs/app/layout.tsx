import Link from "next/link";
import "@rainbow-me/rainbowkit/styles.css";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/globals.css";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

// Retain the metadata export
export const metadata = getMetadata({
  title: "Whisp App",
  description: "Built with 🏗 Scaffold-ETH 2 and Whisp components",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={``}>
      <body className="min-h-screen bg-base-200">
        {/* Global Navbar from the Whisp layout */}
        <header className="bg-neutral text-neutral-content p-4 flex gap-4">
          <Link href="/" className="font-bold text-xl">
            Whisp
          </Link>
          <nav className="flex gap-4">
            <Link href="/create-group" className="link">
              Create Group
            </Link>
            <Link href="/browse-groups" className="link">
              Browse Groups
            </Link>
            <Link href="/my-groups" className="link">
              My Groups
            </Link>
          </nav>
        </header>

        {/* Content Wrapper */}
        <main className="p-6">
          {/* Wrap the content in the essential Scaffold-ETH 2 Providers.
            This is the key step to merge the two layouts.
          */}
          <ThemeProvider enableSystem>
            <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
