'use client';
import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const suggestions = [
  "Explain photosynthesis in simple terms",
  "What is the difference between mitosis and meiosis?",
  "Help me understand Newton's laws of motion",
  "Give me a mnemonic for the planets in order",
  "Explain the French Revolution briefly",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "👋 Hey there! I'm your AI Study Tutor powered by Groq's Llama 3.3. Ask me anything — I can explain concepts, quiz you, give examples, create summaries, or help you understand any topic. What are you studying today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const msgText = (text || input).trim();
    if (!msgText || loading) return;
    setInput('');

    const userMsg: Message = { role: 'user', content: msgText, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const history = messages.slice(-8).map(m => ({ role: m.role, content: m.content }));
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msgText, history }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Chat failed');
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply, timestamp: new Date() }]);
    } catch (e: any) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `⚠️ ${e.message || 'Something went wrong. Make sure the backend is running on port 5000.'}`,
        timestamp: new Date(),
      }]);
    }
    setLoading(false);
  };

  const formatTime = (d: Date) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)' }}>
      <div className="page-header" style={{ marginBottom: 16, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ marginBottom: 6 }}>
              <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span className="pulse-dot" style={{ width: 6, height: 6 }} /> Live AI Tutor
              </span>
            </div>
            <h1 className="page-title" style={{ marginBottom: 4 }}>AI Chat Tutor</h1>
            <p className="page-subtitle">Powered by Groq — <span style={{ fontFamily: 'monospace', background: 'rgba(99,102,241,0.1)', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>llama-3.3-70b-versatile</span></p>
          </div>
          <button className="btn-secondary" style={{ fontSize: 13 }} onClick={() => setMessages([{
            role: 'assistant',
            content: "Chat cleared! I'm ready to help you study. What topic would you like to explore?",
            timestamp: new Date(),
          }])}>
            🗑 Clear Chat
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '4px 0 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}>
        {messages.map((msg, i) => (
          <div key={i} className="slide-up" style={{
            display: 'flex',
            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            animationDelay: '0s',
          }}>
            <div style={{
              maxWidth: '75%',
              display: 'flex',
              gap: 10,
              flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
              alignItems: 'flex-end',
            }}>
              {/* Avatar */}
              <div style={{
                width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16,
                background: msg.role === 'user'
                  ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                  : 'linear-gradient(135deg, #0d1117, #161b27)',
                border: msg.role === 'assistant' ? '1px solid var(--border-active)' : 'none',
              }}>
                {msg.role === 'user' ? '👤' : '🎓'}
              </div>

              {/* Bubble */}
              <div style={{
                padding: '12px 16px',
                borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                background: msg.role === 'user'
                  ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                  : 'var(--bg-glass)',
                border: msg.role === 'assistant' ? '1px solid var(--border-default)' : 'none',
                backdropFilter: 'blur(12px)',
              }}>
                <div style={{
                  fontSize: 14, lineHeight: 1.7, whiteSpace: 'pre-wrap',
                  color: msg.role === 'user' ? 'white' : 'var(--text-primary)',
                }}>
                  {msg.content}
                </div>
                <div style={{
                  fontSize: 11, marginTop: 6,
                  color: msg.role === 'user' ? 'rgba(255,255,255,0.6)' : 'var(--text-muted)',
                  textAlign: msg.role === 'user' ? 'right' : 'left',
                }}>
                  {formatTime(msg.timestamp)}
                </div>
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, background: 'linear-gradient(135deg, #0d1117, #161b27)',
              border: '1px solid var(--border-active)',
            }}>🎓</div>
            <div style={{
              padding: '14px 18px',
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-default)',
              borderRadius: '16px 16px 16px 4px',
              backdropFilter: 'blur(12px)',
            }}>
              <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                {[0, 1, 2].map(j => (
                  <div key={j} style={{
                    width: 7, height: 7, borderRadius: '50%',
                    background: 'var(--accent-primary)',
                    animation: `pulse-ring 1.2s ease-in-out ${j * 0.2}s infinite`,
                  }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length === 1 && (
        <div style={{ padding: '8px 0', flexShrink: 0 }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>💡 Try asking:</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {suggestions.map(s => (
              <button key={s} onClick={() => sendMessage(s)}
                style={{
                  padding: '7px 14px', background: 'rgba(99,102,241,0.08)',
                  border: '1px solid var(--border-default)', borderRadius: 999,
                  color: 'var(--text-secondary)', fontSize: 13, cursor: 'pointer',
                  transition: 'all 0.2s', fontFamily: 'inherit',
                }}
                onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = 'var(--border-active)'; (e.target as HTMLElement).style.color = 'var(--text-primary)'; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = 'var(--border-default)'; (e.target as HTMLElement).style.color = 'var(--text-secondary)'; }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div style={{
        flexShrink: 0, paddingTop: 12,
        borderTop: '1px solid var(--border-default)',
      }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <textarea
            className="textarea-field"
            style={{ minHeight: 'unset', height: 52, resize: 'none', lineHeight: 1.4, paddingTop: 14 }}
            placeholder="Ask your AI tutor anything about your studies..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
            }}
          />
          <button
            className="btn-primary"
            style={{ padding: '0 20px', flexShrink: 0, height: 52, borderRadius: 12 }}
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
          >
            {loading ? <span className="spinner" style={{ width: 16, height: 16 }} /> : <span>Send ↑</span>}
          </button>
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>
          Press Enter to send • Shift+Enter for new line
        </div>
      </div>
    </div>
  );
}
