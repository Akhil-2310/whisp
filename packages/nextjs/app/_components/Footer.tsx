import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-700 py-6 px-8 text-gray-500 text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} Whisp. Built for ETHBishkek Hackathon.</p>
        <div className="flex gap-4 mt-3 md:mt-0">
          <Link href="/terms" className="hover:text-gray-300">
            Terms of Service
          </Link>
          <Link href="/privacy" className="hover:text-gray-300">
            Privacy Policy
          </Link>
          {/* link to GitHub */}
          <a
            href="https://github.com/Akhil-2310/whisp"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};
