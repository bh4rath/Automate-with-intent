import { useState } from 'react';
import ContentCard from './ContentCard';

function Paragraphs({ text }) {
  if (!text) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {text.split('\n\n').map((p, i) => (
        <p key={i} style={{ color: 'var(--text)', lineHeight: 1.7 }}>
          {p}
        </p>
      ))}
    </div>
  );
}

export default function SundayEntry({ entry, isCompleted, onComplete }) {
  const [submitted, setSubmitted] = useState(isCompleted);
  const [reflection, setReflection] = useState('');

  function handleSubmit() {
    setSubmitted(true);
    onComplete(entry.dayStart);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Weekly Recap */}
      <ContentCard color="#F59E0B" label="Weekly Recap">
        <Paragraphs text={entry.recap} />
        {!submitted ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Your weekly reflection..."
              rows={6}
              style={{
                background: 'var(--surface2)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                color: 'var(--text)',
                fontSize: '0.9rem',
                fontFamily: "'Inter', sans-serif",
                resize: 'vertical',
                outline: 'none',
                width: '100%',
                lineHeight: 1.6,
              }}
              onFocus={(e) => { e.target.style.borderColor = 'var(--amber)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
            />
            <button
              onClick={handleSubmit}
              style={{
                alignSelf: 'flex-start',
                background: '#F59E0B',
                color: '#000',
                border: 'none',
                borderRadius: '8px',
                padding: '0.6rem 1.25rem',
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
              }}
            >
              Submit Weekly Reflection
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#F59E0B',
              fontSize: '0.88rem',
              fontWeight: 600,
              marginTop: '0.75rem',
            }}
          >
            <span>✓</span>
            <span>Weekly reflection saved</span>
          </div>
        )}
      </ContentCard>

      {/* Community */}
      <ContentCard color="var(--accent)" label="Community">
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>{entry.community}</p>
      </ContentCard>

      {/* Rest */}
      <div
        style={{
          background: 'var(--green-soft)',
          border: '1px solid rgba(74,222,128,0.15)',
          borderRadius: '12px',
          padding: '1.25rem 1.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', flexShrink: 0 }} />
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--green)',
            }}
          >
            Permission to Rest
          </span>
        </div>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>{entry.rest}</p>
      </div>

      {/* Teaser */}
      {entry.teaser && (
        <div
          style={{
            background: 'var(--accent-soft)',
            border: '1px solid var(--accent-glow)',
            borderRadius: '10px',
            padding: '1rem 1.25rem',
            display: 'flex',
            gap: '10px',
            alignItems: 'flex-start',
          }}
        >
          <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>→</span>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>
            <strong style={{ color: 'var(--accent)' }}>Next week: </strong>
            {entry.teaser}
          </p>
        </div>
      )}
    </div>
  );
}
