import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header";
import "@rainbow-me/rainbowkit/styles.css";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/globals.css";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Whisp App",
  description: "A privacy-preserving social media platform powered by zk.",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={``}>
      {}
      <body className="min-h-screen bg-gray-900 text-gray-100">
        <ThemeProvider enableSystem>
          <ScaffoldEthAppWithProviders>
            {/* Global Navbar */}
            <Header />

            {/* Content Wrapper */}
            <main className="flex-grow">{children}</main>

            {/* Global Footer */}
            <Footer />
          </ScaffoldEthAppWithProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
