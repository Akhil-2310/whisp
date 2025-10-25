import Link from "next/link";

/**
 * Landing page of the Whisp dApp.
 * Provides the application title and navigation links.
 */
export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-600 to-blue-500 text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-extrabold mb-4">Whisp</h1>
      <p className="text-lg mb-8">A decentralized platform to create and join groups</p>
      <nav className="flex gap-6">
        <Link href="/create-group" className="btn btn-primary">
          Create Group
        </Link>
        <Link href="/browse-groups" className="btn btn-secondary">
          Browse Groups
        </Link>
        <Link href="/my-groups" className="btn btn-accent">
          My Groups
        </Link>
      </nav>
    </main>
  );
}
