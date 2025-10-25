import Link from "next/link";
import { BoltIcon, BugAntIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

export default function Page() {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-gray-900 text-gray-100 flex flex-col">
      {/* --- 1. Hero Section --- */}
      <section className="text-center py-20 px-4 flex flex-col items-center justify-center bg-gray-900">
        <h2 className="text-6xl font-extrabold mb-4 leading-tight text-gray-100 drop-shadow-lg">
          Zero-Knowledge Privacy. Community Power.
        </h2>
        <p className="text-xl mb-8 max-w-3xl text-gray-400">
          Whisp is a decentralized platform where you can form anonymous, interest-based groups, and cast votes or send
          feedback without revealing your identity.
        </p>
        <div className="flex gap-4">
          <Link
            href="/create-group"
            className="btn btn-lg bg-gray-100 text-gray-900 font-bold shadow-xl hover:bg-gray-300 transition-colors"
          >
            Launch dApp
          </Link>
          <Link
            href="#why-it-matters"
            className="btn btn-lg btn-outline text-gray-100 border-gray-400 hover:bg-gray-700 hover:text-gray-100"
          >
            Why It Matters
          </Link>
        </div>
      </section>

      {/* --- 2. Features Section --- */}
      <section id="features" className="py-16 px-8 max-w-7xl mx-auto">
        <h3 className="text-4xl font-bold text-center mb-12 text-gray-100">Core Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
            <ShieldCheckIcon className="h-8 w-8 mx-auto mb-3 text-gray-300" />
            <h4 className="text-xl font-semibold mb-2 text-gray-100">Anonymous Actions</h4>
            <p className="text-gray-400">Prove group membership without revealing your identity using zk-SNARKs.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
            <BoltIcon className="h-8 w-8 mx-auto mb-3 text-gray-300" />
            <h4 className="text-xl font-semibold mb-2 text-gray-100">Decentralized Groups</h4>
            <p className="text-gray-400">Form and manage communities on-chain, censorship-resistant and transparent.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
            <BugAntIcon className="h-8 w-8 mx-auto mb-3 text-gray-300" />
            <h4 className="text-xl font-semibold mb-2 text-gray-100">Controversy-Free Feedback</h4>
            <p className="text-gray-400">Share sensitive opinions and cast votes fearlessly and securely.</p>
          </div>
        </div>
      </section>

      {/* --- 3. Why It Matters Section --- */}
      <section id="why-it-matters" className="py-20 px-8 bg-gray-800 text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl font-bold mb-6 text-gray-100">Why Privacy Matters</h3>
          <p className="text-lg mb-8 text-gray-400">
            Privacy is normal, and your actions and identity must remain private. This benefits everyone, especially
            those in high-risk environments.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="p-6 bg-gray-900 rounded-lg border border-gray-700">
              <h4 className="text-xl font-semibold mb-2 text-gray-100">Censorship Resistance</h4>
              <p className="text-gray-400">
                In oppressive regimes, citizens can put forward thoughts against leaders and take action without fear of
                retaliation, as their identity is protected by ZK proofs.
              </p>
            </div>
            <div className="p-6 bg-gray-900 rounded-lg border border-gray-700">
              <h4 className="text-xl font-semibold mb-2 text-gray-100">Freedom of Opinion</h4>
              <p className="text-gray-400">
                Everyone has sensitive opinions but is afraid to say them publicly due to controversy. This platform
                allows honest public sharing without worry.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
