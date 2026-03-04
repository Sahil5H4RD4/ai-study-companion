import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Study Companion',
  description: 'Your intelligent learning assistant',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <nav className="border-b border-gray-800 bg-gray-900/50 p-4 sticky top-0 backdrop-blur-md z-50">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              AI Study Companion
            </Link>
            <div className="space-x-4">
              <Link href="/login" className="text-gray-300 hover:text-white transition">Login</Link>
              <Link href="/register" className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md font-medium transition">Get Started</Link>
            </div>
          </div>
        </nav>
        <main className="flex-grow container mx-auto p-4 md:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}
