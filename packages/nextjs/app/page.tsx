import Link from "next/link";

/**
 * Landing page of the Whisp dApp.
 * Provides the application title and navigation links, structured with Hero and Feature sections.
 */
export default function Page() {
  return (
    <main className="min-h-screen bg-gray-900 text-gray-100">
      {/* --- 1. Header/Navigation --- */}
      <header className="py-4 px-8 border-b border-gray-700">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-400">Whisp</h1>
          <nav className="flex gap-6 items-center">
            <Link href="/create-group" className="hover:text-green-400 transition-colors">
              Create Group
            </Link>
            <Link href="/browse-groups" className="hover:text-green-400 transition-colors">
              Browse Groups
            </Link>
            <Link href="/my-groups" className="hover:text-green-400 transition-colors">
              My Groups
            </Link>
            {/* New: Debug Contracts Link added to navigation */}
            <Link
              href="/debug"
              className="btn btn-sm btn-outline btn-success border-green-500 hover:bg-green-500 hover:text-gray-900 transition-colors"
            >
              Debug Contracts
            </Link>
          </nav>
        </div>
      </header>

      {/* --- 2. Hero Section --- */}
      <section className="text-center py-20 px-4 flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-green-900">
        <h2 className="text-6xl font-extrabold mb-4 leading-tight text-green-300 drop-shadow-lg">
          Zero-Knowledge Privacy. Community Power.
        </h2>
        <p className="text-xl mb-8 max-w-3xl text-gray-300">
          Whisp is a decentralized platform where you can form anonymous, interest-based groups, and cast votes or send
          feedback without revealing your identity.
        </p>
        <div className="flex gap-4">
          <Link href="/create-group" className="btn btn-lg btn-success text-gray-900 font-bold shadow-xl">
            Launch dApp
          </Link>
          <Link
            href="#features"
            className="btn btn-lg btn-outline text-green-400 border-green-400 hover:bg-green-400 hover:text-gray-900"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* --- 3. Features Section (Placeholder) --- */}
      <section id="features" className="py-16 px-8 max-w-7xl mx-auto">
        <h3 className="text-4xl font-bold text-center mb-12 text-green-400">Core Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
            <h4 className="text-xl font-semibold mb-2 text-green-300">Anonymous Actions</h4>
            <p className="text-gray-400">Prove group membership without revealing your identity using zk-SNARKs.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
            <h4 className="text-xl font-semibold mb-2 text-green-300">Decentralized Groups</h4>
            <p className="text-gray-400">Form and manage communities on-chain, censorship-resistant and transparent.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
            <h4 className="text-xl font-semibold mb-2 text-green-300">Controversy-Free Feedback</h4>
            <p className="text-gray-400">Share sensitive opinions and cast votes fearlessly and securely.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
