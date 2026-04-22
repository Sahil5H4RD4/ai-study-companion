'use client';
import { useState } from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
}

interface StudyPlan {
  id: string;
  examDate: string;
  tasks: Task[];
}

export default function StudyPlanPage() {
  const [topics, setTopics] = useState<string[]>([]);
  const [topicInput, setTopicInput] = useState('');
  const [examDate, setExamDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTopic = () => {
    const t = topicInput.trim();
    if (t && !topics.includes(t)) setTopics(prev => [...prev, t]);
    setTopicInput('');
  };

  const removeTopic = (t: string) => setTopics(prev => prev.filter(x => x !== t));

  const handleGenerate = async () => {
    if (topics.length === 0) return setError('Add at least one topic.');
    if (!examDate) return setError('Please select an exam date.');
    const ed = new Date(examDate);
    if (ed <= new Date()) return setError('Exam date must be in the future.');
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/studyplan/generate-public`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topics, examDate: ed.toISOString() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      setPlan(data.studyPlan);
      setTasks(data.studyPlan.tasks);
    } catch (e: any) {
      setError(e.message || 'Something went wrong. Is the backend running?');
    }
    setLoading(false);
  };

  const toggleTask = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    const newVal = !task.isCompleted;
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, isCompleted: newVal } : t));
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/studyplan/task/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isCompleted: newVal }),
      });
    } catch { /* offline - UI already updated */ }
  };

  const completedCount = tasks.filter(t => t.isCompleted).length;
  const progress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  const formatDate = (iso: string) => new Date(iso).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  const daysUntilExam = plan ? Math.ceil((new Date(plan.examDate).getTime() - Date.now()) / 86400000) : null;

  return (
    <div className="fade-in">
      <div className="page-header">
        <div style={{ marginBottom: 8 }}>
          <span className="badge badge-cyan">📅 Study Planner</span>
        </div>
        <h1 className="page-title">AI Study Planner</h1>
        <p className="page-subtitle">Tell the AI your topics and exam date — get a personalized day-by-day revision plan.</p>
      </div>

      {!plan ? (
        <div className="glass-card" style={{ padding: 28, maxWidth: 680 }}>
          {/* Topics */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 8 }}>
              Topics to Study
            </label>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <input
                className="input-field"
                placeholder="e.g., Photosynthesis, Cell Division, Genetics..."
                value={topicInput}
                onChange={e => setTopicInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTopic(); } }}
                style={{ flex: 1 }}
              />
              <button className="btn-primary" onClick={addTopic} disabled={!topicInput.trim()}>
                <span>+ Add</span>
              </button>
            </div>
            {topics.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {topics.map(t => (
                  <span key={t} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '5px 12px',
                    background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)',
                    borderRadius: 999, fontSize: 13, color: '#a5b4fc',
                  }}>
                    {t}
                    <button onClick={() => removeTopic(t)} style={{ background: 'none', border: 'none', color: '#a5b4fc', cursor: 'pointer', padding: 0, fontWeight: 700, fontSize: 14 }}>×</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Exam Date */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 8 }}>
              Exam Date
            </label>
            <input
              type="date"
              className="input-field"
              value={examDate}
              onChange={e => setExamDate(e.target.value)}
              min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
              style={{ colorScheme: 'dark' }}
            />
          </div>

          {error && (
            <div style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: 8, padding: '10px 14px', color: '#fda4af', fontSize: 13, marginBottom: 14 }}>
              ⚠️ {error}
            </div>
          )}

          <button
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: 14 }}
            onClick={handleGenerate}
            disabled={loading || topics.length === 0 || !examDate}
          >
            {loading ? <><span className="spinner" /><span>Building Your Plan...</span></> : <span>📅 Generate Study Plan</span>}
          </button>
          {loading && (
            <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-secondary)', marginTop: 10 }}>
              Groq AI is crafting your personalized schedule... ⚡
            </p>
          )}
        </div>
      ) : (
        <div>
          {/* Plan Header */}
          <div className="glass-card" style={{ padding: 24, marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <h2 style={{ fontWeight: 800, fontSize: 20, marginBottom: 4 }}>📚 Your Study Plan</h2>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {topics.map(t => <span key={t} className="badge badge-indigo">{t}</span>)}
                  <span className="badge badge-rose">Exam in {daysUntilExam} days</span>
                </div>
              </div>
              <button className="btn-secondary" onClick={() => { setPlan(null); setTasks([]); setTopics([]); }}>
                ↩ New Plan
              </button>
            </div>

            {/* Progress */}
            <div style={{ marginTop: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
                <span style={{ color: 'var(--text-secondary)' }}>Progress: {completedCount} / {tasks.length} tasks</span>
                <span style={{ color: '#a5b4fc', fontWeight: 700 }}>{progress}%</span>
              </div>
              <div style={{ height: 8, background: 'var(--bg-elevated)', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #6366f1, #06b6d4)',
                  borderRadius: 999,
                  transition: 'width 0.5s ease',
                }} />
              </div>
            </div>
          </div>

          {/* Task List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {tasks.map((task, i) => (
              <div
                key={task.id}
                className={`glass-card slide-up ${task.isCompleted ? '' : ''}`}
                style={{
                  padding: '16px 20px',
                  animationDelay: `${i * 0.04}s`,
                  opacity: task.isCompleted ? 0.7 : 1,
                  transition: 'opacity 0.3s',
                  cursor: 'pointer',
                }}
                onClick={() => toggleTask(task.id)}
              >
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 24, height: 24, flexShrink: 0,
                    border: `2px solid ${task.isCompleted ? 'var(--accent-emerald)' : 'var(--border-active)'}`,
                    borderRadius: 6,
                    background: task.isCompleted ? 'rgba(16,185,129,0.2)' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s',
                    marginTop: 2,
                  }}>
                    {task.isCompleted && <span style={{ color: '#6ee7b7', fontSize: 14 }}>✓</span>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                      <h3 style={{
                        fontWeight: 600, fontSize: 15, margin: 0,
                        textDecoration: task.isCompleted ? 'line-through' : 'none',
                        color: task.isCompleted ? 'var(--text-muted)' : 'var(--text-primary)',
                        transition: 'color 0.2s',
                      }}>{task.title}</h3>
                      <span className="badge badge-amber" style={{ fontSize: 11, flexShrink: 0 }}>📅 {formatDate(task.dueDate)}</span>
                    </div>
                    {task.description && (
                      <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        {task.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {progress === 100 && (
            <div className="glass-card fade-in" style={{ marginTop: 24, padding: 28, textAlign: 'center', borderColor: 'rgba(16,185,129,0.3)' }}>
              <div style={{ fontSize: 48, marginBottom: 8 }}>🏆</div>
              <h3 style={{ fontWeight: 800, fontSize: 20 }}>All tasks complete!</h3>
              <p style={{ color: 'var(--text-secondary)' }}>You're fully prepared. Go ace that exam! 💪</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
