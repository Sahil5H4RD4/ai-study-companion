'use client';
import { useState } from 'react';

interface Note {
  id: string;
  title: string;
  content: string;
  summary: string;
  createdAt: string;
}

export default function NotesPage() {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Note | null>(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<Note[]>([]);
  const [activeTab, setActiveTab] = useState<'create' | 'history'>('create');

  const handleSummarize = async () => {
    if (!text.trim()) return setError('Please paste some text to summarize.');
    if (text.length < 10) return setError('Text must be at least 10 characters.');
    setError('');
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('http://localhost:5000/api/notes/summarize-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, title: title || 'My Note' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      setResult(data.note);
      setHistory(prev => [data.note, ...prev]);
      setActiveTab('create');
    } catch (e: any) {
      setError(e.message || 'Something went wrong. Is the backend running?');
    }
    setLoading(false);
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div className="fade-in">
      <div className="page-header">
        <div style={{ marginBottom: 8 }}>
          <span className="badge badge-indigo">📄 Smart Notes</span>
        </div>
        <h1 className="page-title">Notes &amp; Summaries</h1>
        <p className="page-subtitle">Paste your study material and get an AI-generated summary in seconds.</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {(['create', 'history'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={activeTab === tab ? 'btn-primary' : 'btn-secondary'} style={{ textTransform: 'capitalize' }}>
            <span>{tab === 'create' ? '✨ Summarize' : `🗂 History (${history.length})`}</span>
          </button>
        ))}
      </div>

      {activeTab === 'create' && (
        <div style={{ display: 'grid', gridTemplateColumns: result ? '1fr 1fr' : '1fr', gap: 24 }}>
          {/* Input Panel */}
          <div className="glass-card" style={{ padding: 24 }}>
            <div style={{ marginBottom: 16 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Your Study Material</h2>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>
                Paste notes, textbook excerpts, or any educational content
              </p>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Title (optional)
              </label>
              <input
                className="input-field"
                placeholder="e.g., Chapter 3 — Photosynthesis"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>

            <div style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>Text Content</label>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{wordCount} words</span>
              </div>
              <textarea
                className="textarea-field"
                style={{ minHeight: 220 }}
                placeholder="Paste your study material here... The AI will summarize it into clear, concise points."
                value={text}
                onChange={e => setText(e.target.value)}
              />
            </div>

            {error && (
              <div style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: 8, padding: '10px 14px', color: '#fda4af', fontSize: 13, marginBottom: 14 }}>
                ⚠️ {error}
              </div>
            )}

            <button
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '13px 20px' }}
              onClick={handleSummarize}
              disabled={loading || !text.trim()}
            >
              {loading ? (
                <><span className="spinner" /><span>Generating Summary...</span></>
              ) : (
                <span>✨ Summarize with AI</span>
              )}
            </button>
          </div>

          {/* Result Panel */}
          {result && (
            <div className="glass-card slide-up" style={{ padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>✅ AI Summary</h2>
                <span className="badge badge-emerald">Groq Llama 3.3</span>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: 'var(--accent-primary)' }}>{result.title}</h3>
              <div style={{
                background: 'rgba(16,185,129,0.05)',
                border: '1px solid rgba(16,185,129,0.2)',
                borderRadius: 10,
                padding: 16,
                fontSize: 14,
                lineHeight: 1.8,
                color: 'var(--text-primary)',
                whiteSpace: 'pre-wrap',
                maxHeight: 400,
                overflow: 'auto',
              }}>
                {result.summary}
              </div>
              <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
                <button className="btn-secondary" style={{ fontSize: 13 }} onClick={() => { setText(''); setTitle(''); setResult(null); }}>
                  ↩ New Summary
                </button>
                <button className="btn-secondary" style={{ fontSize: 13 }} onClick={() => navigator.clipboard.writeText(result.summary)}>
                  📋 Copy
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'history' && (
        <div>
          {history.length === 0 ? (
            <div className="glass-card" style={{ padding: 48, textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📂</div>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>No summaries yet</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Create your first summary above</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {history.map((note, i) => (
                <div key={note.id || i} className="glass-card slide-up" style={{ padding: 20, animationDelay: `${i * 0.05}s` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <h3 style={{ fontWeight: 700, margin: 0, fontSize: 16 }}>{note.title}</h3>
                    <span className="badge badge-indigo">Summary</span>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                    {note.summary.slice(0, 200)}{note.summary.length > 200 ? '…' : ''}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
