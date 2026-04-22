'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/dashboard', icon: '⚡', label: 'Dashboard' },
  { href: '/notes',     icon: '📄', label: 'Notes & Summaries' },
  { href: '/quiz',      icon: '🧠', label: 'Quiz Generator' },
  { href: '/study-plan',icon: '📅', label: 'Study Planner' },
  { href: '/chat',      icon: '💬', label: 'AI Chat Tutor' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <Link href="/dashboard" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: 36, height: 36,
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, boxShadow: '0 4px 15px rgba(99,102,241,0.4)',
              flexShrink: 0,
            }}>🎓</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                StudyAI
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>
                Powered by Groq
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-item ${pathname === item.href || pathname.startsWith(item.href + '/') ? 'active' : ''}`}
            style={{ textDecoration: 'none' }}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div style={{
        padding: '16px 20px',
        borderTop: '1px solid var(--border-default)',
        fontSize: 12,
        color: 'var(--text-muted)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
          <span className="pulse-dot" />
          <span>All systems operational</span>
        </div>
        <div>SESD Project 2026</div>
      </div>
    </aside>
  );
}
