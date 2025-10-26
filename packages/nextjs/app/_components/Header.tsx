"use client";

import Link from "next/link";
import { BugAntIcon } from "@heroicons/react/24/outline";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};
export const Header = () => {
  return (
    <header className="py-4 px-8 border-b border-gray-700 bg-gray-900">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-100">
          <Link href="/">Whisp</Link>
        </h1>
        <nav className="flex gap-6 items-center">
          {/* Основные ссылки */}
          <Link href="/create-group" className="hover:text-gray-300 transition-colors text-gray-100">
            Create Group
          </Link>
          <Link href="/browse-groups" className="hover:text-gray-300 transition-colors text-gray-100">
            Browse Groups
          </Link>
          <Link href="/my-groups" className="hover:text-gray-300 transition-colors text-gray-100">
            My Groups
          </Link>
          <Link
            href="/debug"
            className="btn btn-sm btn-outline text-gray-100 border-gray-500 hover:bg-gray-700 hover:border-gray-700 transition-colors"
          >
            <BugAntIcon className="h-4 w-4 mr-1" />
            Debug Contracts
          </Link>
        </nav>
        <RainbowKitCustomConnectButton />
        <FaucetButton />
      </div>
    </header>
  );
};
export const whispMenuLinks: HeaderMenuLink[] = [
  {
    label: "Whisp",
    href: "/",
  },
  {
    label: "Create Group",
    href: "/create-group",
  },
  {
    label: "Browse Groups",
    href: "/browse-groups",
  },
  {
    label: "My Groups",
    href: "/my-groups",
  },
];
