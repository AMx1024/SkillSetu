import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 dark:bg-black dark:border-white/[.145]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-blue-600 dark:text-blue-500">
          SkillSetu
        </Link>
        <div className="flex gap-6">
          <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition dark:text-zinc-300 dark:hover:text-blue-400">
            Home
          </Link>
          <Link href="/careers" className="text-gray-700 hover:text-blue-600 font-medium transition dark:text-zinc-300 dark:hover:text-blue-400">
            Careers
          </Link>
          <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition dark:text-zinc-300 dark:hover:text-blue-400">
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}
