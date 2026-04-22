'use client';
import { useState } from 'react';

interface Question {
  text: string;
  options: string[];
  correctOptionIndex: number;
}

interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

type QuizPhase = 'input' | 'taking' | 'results';

export default function QuizPage() {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [phase, setPhase] = useState<QuizPhase>('input');
  const [selected, setSelected] = useState<(number | null)[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleGenerate = async () => {
    if (!text.trim() || text.length < 10) return setError('Please provide at least 10 characters of text.');
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/quiz/generate-from-text`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, title: title || 'Quick Quiz' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      setQuiz(data.quiz);
      setSelected(new Array(data.quiz.questions.length).fill(null));
      setSubmitted(false);
      setPhase('taking');
    } catch (e: any) {
      setError(e.message || 'Something went wrong. Is the backend running?');
    }
    setLoading(false);
  };

  const score = quiz ? quiz.questions.filter((q, i) => selected[i] === q.correctOptionIndex).length : 0;
  const total = quiz?.questions.length ?? 0;
  const pct = total ? Math.round((score / total) * 100) : 0;

  return (
    <div className="fade-in">
      <div className="page-header">
        <div style={{ marginBottom: 8 }}>
          <span className="badge badge-indigo">🧠 Quiz Generator</span>
        </div>
        <h1 className="page-title">Auto-Quiz Generator</h1>
        <p className="page-subtitle">Paste any text and get 5 AI-generated MCQs with instant scoring.</p>
      </div>

      {/* ── INPUT PHASE ── */}
      {phase === 'input' && (
        <div className="glass-card" style={{ padding: 28, maxWidth: 720 }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Quiz Title</label>
            <input className="input-field" placeholder="e.g., Biology Chapter 4 Quiz" value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>Study Material</label>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{text.trim().split(/\s+/).filter(Boolean).length} words</span>
            </div>
            <textarea
              className="textarea-field"
              style={{ minHeight: 200 }}
              placeholder="Paste your study content here. The AI will generate 5 multiple-choice questions with correct answers."
              value={text}
              onChange={e => setText(e.target.value)}
            />
          </div>
          {error && (
            <div style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: 8, padding: '10px 14px', color: '#fda4af', fontSize: 13, marginBottom: 14 }}>
              ⚠️ {error}
            </div>
          )}
          <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: 14 }} onClick={handleGenerate} disabled={loading || !text.trim()}>
            {loading ? <><span className="spinner" /><span>Generating Questions...</span></> : <span>🧠 Generate Quiz</span>}
          </button>
          {loading && (
            <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-secondary)', marginTop: 12 }}>
              Groq AI is crafting your questions... ⚡
            </p>
          )}
        </div>
      )}

      {/* ── TAKING PHASE ── */}
      {phase === 'taking' && quiz && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>{quiz.title}</h2>
            <div style={{ display: 'flex', gap: 8 }}>
              <span className="badge badge-indigo">{total} Questions</span>
              <span className="badge badge-cyan">MCQ</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {quiz.questions.map((q, qi) => (
              <div key={qi} className="glass-card slide-up" style={{ padding: 24, animationDelay: `${qi * 0.06}s` }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
                  <span style={{
                    flexShrink: 0, width: 30, height: 30,
                    background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)',
                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: 13, color: '#a5b4fc',
                  }}>
                    {qi + 1}
                  </span>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: 15, lineHeight: 1.5 }}>{q.text}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {q.options.map((opt, oi) => {
                    const isSelected = selected[qi] === oi;
                    const isCorrect = oi === q.correctOptionIndex;
                    let bg = 'rgba(255,255,255,0.03)';
                    let border = 'var(--border-default)';
                    let color = 'var(--text-primary)';

                    if (submitted) {
                      if (isCorrect) { bg = 'rgba(16,185,129,0.12)'; border = 'rgba(16,185,129,0.4)'; color = '#6ee7b7'; }
                      else if (isSelected && !isCorrect) { bg = 'rgba(244,63,94,0.1)'; border = 'rgba(244,63,94,0.3)'; color = '#fda4af'; }
                    } else if (isSelected) {
                      bg = 'rgba(99,102,241,0.15)'; border = 'rgba(99,102,241,0.5)'; color = '#a5b4fc';
                    }

                    return (
                      <button key={oi} onClick={() => { if (!submitted) { const s = [...selected]; s[qi] = oi; setSelected(s); } }}
                        style={{
                          padding: '12px 14px', background: bg, border: `1px solid ${border}`,
                          borderRadius: 10, color, textAlign: 'left', cursor: submitted ? 'default' : 'pointer',
                          fontSize: 14, lineHeight: 1.4, transition: 'all 0.2s', fontFamily: 'inherit',
                          display: 'flex', alignItems: 'center', gap: 8,
                        }}>
                        <span style={{ fontWeight: 700, opacity: 0.6 }}>{String.fromCharCode(65 + oi)}.</span>
                        {opt}
                        {submitted && isCorrect && ' ✓'}
                        {submitted && isSelected && !isCorrect && ' ✗'}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
            {!submitted ? (
              <button className="btn-primary" style={{ padding: '13px 32px' }}
                onClick={() => setSubmitted(true)}
                disabled={selected.some(s => s === null)}>
                <span>📊 Submit Answers</span>
              </button>
            ) : (
              <button className="btn-primary" onClick={() => setPhase('results')} style={{ padding: '13px 32px' }}>
                <span>View Results →</span>
              </button>
            )}
            <button className="btn-secondary" onClick={() => { setPhase('input'); setQuiz(null); setSubmitted(false); }}>
              ↩ New Quiz
            </button>
          </div>
        </div>
      )}

      {/* ── RESULTS PHASE ── */}
      {phase === 'results' && quiz && (
        <div className="fade-in">
          <div className="glass-card" style={{ padding: 40, textAlign: 'center', maxWidth: 560, margin: '0 auto' }}>
            <div style={{ fontSize: 64, marginBottom: 12 }}>
              {pct === 100 ? '🏆' : pct >= 60 ? '🎉' : '📚'}
            </div>
            <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 6 }}>
              <span className="gradient-text">{pct}%</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 4 }}>
              You scored <strong style={{ color: 'var(--text-primary)' }}>{score} out of {total}</strong> questions correctly
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
              {pct === 100 ? 'Perfect score! You nailed it!' : pct >= 80 ? 'Excellent work — keep it up!' : pct >= 60 ? 'Good effort — review the missed topics.' : 'Keep studying — you\'re getting there!'}
            </p>

            <div style={{ display: 'flex', gap: 12, marginTop: 28, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn-primary" onClick={() => { setPhase('taking'); setSelected(new Array(total).fill(null)); setSubmitted(false); }}>
                <span>🔄 Retake Quiz</span>
              </button>
              <button className="btn-secondary" onClick={() => { setPhase('input'); setQuiz(null); setSubmitted(false); }}>
                ✨ New Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
