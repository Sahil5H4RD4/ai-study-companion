'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Stats {
  notes: number;
  quizzes: number;
  plans: number;
}

const features = [
  { href: '/notes',      icon: '📄', title: 'Summarize Notes',  desc: 'Paste any text and get an AI-powered summary instantly.',       color: '#6366f1', badge: 'Fast' },
  { href: '/quiz',       icon: '🧠', title: 'Generate Quiz',    desc: 'Turn your study material into interactive MCQs automatically.', color: '#8b5cf6', badge: 'Smart' },
  { href: '/study-plan', icon: '📅', title: 'Study Planner',    desc: 'Get a personalized day-by-day plan before your exam.',          color: '#06b6d4', badge: 'AI-Powered' },
  { href: '/chat',       icon: '💬', title: 'AI Chat Tutor',    desc: 'Ask anything — get clear, detailed explanations instantly.',    color: '#10b981', badge: 'Live' },
];

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ notes: 0, quizzes: 0, plans: 0 });
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const h = new Date().getHours();
    if (h < 12) setGreeting('Good morning');
    else if (h < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    async function fetchStats() {
      try {
        const [n, q, p] = await Promise.all([
          fetch('http://localhost:5000/api/notes').then(r => r.json()),
          fetch('http://localhost:5000/api/quiz').then(r => r.json()),
          fetch('http://localhost:5000/api/studyplan').then(r => r.json()),
        ]);
        setStats({
          notes: n.notes?.length ?? 0,
          quizzes: q.quizzes?.length ?? 0,
          plans: p.plans?.length ?? 0,
        });
      } catch { /* silently ignore */ }
      setLoading(false);
    }
    fetchStats();
  }, []);

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span className="badge badge-indigo">⚡ Dashboard</span>
          <span className="badge badge-emerald" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="pulse-dot" style={{ width: 6, height: 6 }} />
            Groq AI Active
          </span>
        </div>
        <h1 className="page-title gradient-text">{greeting}, Scholar 👋</h1>
        <p className="page-subtitle">Your AI-powered study companion is ready. What do you want to master today?</p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {[
          { icon: '📄', label: 'Notes Created',   value: loading ? '—' : stats.notes,   color: '#6366f1' },
          { icon: '🧠', label: 'Quizzes Made',    value: loading ? '—' : stats.quizzes,  color: '#8b5cf6' },
          { icon: '📅', label: 'Study Plans',      value: loading ? '—' : stats.plans,   color: '#06b6d4' },
          { icon: '🔥', label: 'AI Model',         value: 'Llama 3.3',                    color: '#f59e0b' },
        ].map((s, i) => (
          <div key={i} className="stat-card slide-up" style={{ animationDelay: `${i * 0.07}s` }}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-number gradient-text">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Feature Grid */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: 'var(--text-secondary)' }}>
          Quick Actions
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {features.map((f, i) => (
            <Link key={f.href} href={f.href} style={{ textDecoration: 'none' }}>
              <div
                className="glass-card slide-up"
                style={{ padding: 24, cursor: 'pointer', animationDelay: `${i * 0.08}s` }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                  <div style={{
                    width: 48, height: 48,
                    background: `${f.color}22`,
                    border: `1px solid ${f.color}44`,
                    borderRadius: 12,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 22,
                  }}>{f.icon}</div>
                  <span className="badge badge-indigo" style={{ fontSize: 11 }}>{f.badge}</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6, color: 'var(--text-primary)' }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>{f.desc}</p>
                <div style={{ marginTop: 16, fontSize: 13, color: f.color, fontWeight: 600 }}>
                  Get started →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="glass-card" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ fontSize: 32 }}>🚀</div>
        <div>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>Powered by Groq — Ultra-Fast AI Inference</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            Using <code style={{ background: 'rgba(99,102,241,0.15)', padding: '2px 6px', borderRadius: 4, fontFamily: 'monospace' }}>llama-3.3-70b-versatile</code> for summaries, quizzes, study plans, and tutoring. Sub-second responses.
          </div>
        </div>
      </div>
    </div>
  );
}
