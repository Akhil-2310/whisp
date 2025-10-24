import Link from "next/link";

/**
 * Landing page of the Whisp dApp.
 * Provides the application title and navigation links.
 */
export default function Page() {
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">Whisp</h1>
      <p>Welcome to Whisp, a decentralized group platform.</p>

      {/* Primary navigation to other pages */}
      <nav className="flex gap-4">
        <Link href="/create-group" className="underline">
          Create Group
        </Link>
        <Link href="/browse-groups" className="underline">
          Browse Groups
        </Link>
        <Link href="/my-groups" className="underline">
          My Groups
        </Link>
      </nav>
    </main>
  );
}
