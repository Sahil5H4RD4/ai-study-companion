import type { Metadata } from 'next';
import './globals.css';
import Sidebar from './components/Sidebar';

export const metadata: Metadata = {
  title: 'AI Study Companion — Study Smarter with Groq AI',
  description: 'Upload notes, generate AI summaries, create quizzes, build study plans, and chat with your AI tutor — all powered by Groq.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Sidebar />
        <main className="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
