import { useState } from 'react';
import ContentCard from './ContentCard';
import CodeBlock from './CodeBlock';

const CARD_COLORS = {
  idea: '#7C6AF7',
  why: '#F59E0B',
  build: '#4ADE80',
  reflection: '#F472B6',
  further: 'rgba(237,232,218,0.55)',
  stretch: '#FB923C',
};

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

export default function WeekdayEntry({ entry, isUnlocked, isCompleted, onComplete }) {
  const [reflection, setReflection] = useState('');
  const [submitted, setSubmitted] = useState(isCompleted);

  function handleSubmit() {
    setSubmitted(true);
    onComplete(entry.dayStart);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* The Idea */}
      <ContentCard color={CARD_COLORS.idea} label="The Idea">
        <Paragraphs text={entry.idea} />
      </ContentCard>

      {/* Why It Matters */}
      <ContentCard color={CARD_COLORS.why} label="Why It Matters">
        <Paragraphs text={entry.why} />
      </ContentCard>

      {/* Today's Build */}
      <ContentCard color={CARD_COLORS.build} label="Today's Build">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'var(--green-soft)',
              border: '1px solid rgba(74,222,128,0.2)',
              borderRadius: '6px',
              padding: '4px 10px',
            }}
          >
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.72rem',
                color: 'var(--green)',
                fontWeight: 700,
              }}
            >
              TOOL
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {entry.build.tool}
            </span>
          </div>
          <ol
            style={{
              paddingLeft: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            {entry.build.steps.map((step, i) => (
              <li key={i} style={{ color: 'var(--text)', lineHeight: 1.65 }}>
                <span style={{ whiteSpace: 'pre-wrap' }}>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </ContentCard>

      {/* Code block if present */}
      {entry.codeRaw && (
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-dim)',
              }}
            >
              Code Sample
            </span>
          </div>
          <CodeBlock code={entry.codeRaw} />
        </div>
      )}

      {/* Reflection */}
      <ContentCard color={CARD_COLORS.reflection} label="Reflection Prompt">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.82rem',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
              whiteSpace: 'pre-wrap',
            }}
          >
            {entry.reflection}
          </div>
          {!submitted ? (
            <>
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="Write your reflection here..."
                rows={5}
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
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--accent)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--border)';
                }}
              />
              <button
                onClick={handleSubmit}
                style={{
                  alignSelf: 'flex-start',
                  background: '#F472B6',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.6rem 1.25rem',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                }}
              >
                Submit Reflection
              </button>
            </>
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#F472B6',
                fontSize: '0.88rem',
                fontWeight: 600,
              }}
            >
              <span>✓</span>
              <span>Reflection submitted — next day unlocked</span>
            </div>
          )}
        </div>
      </ContentCard>

      {/* Teaser (shown after reflection submitted) */}
      {submitted && entry.teaser && (
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
            <strong style={{ color: 'var(--accent)' }}>Tomorrow: </strong>
            {entry.teaser}
          </p>
        </div>
      )}

      {/* Further Reading */}
      {entry.further && entry.further.length > 0 && (
        <ContentCard color={CARD_COLORS.further} label="Further Reading">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {entry.further.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: 'var(--text-dim)',
                    background: 'var(--surface2)',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    padding: '2px 6px',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  {item.tag}
                </span>
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--accent)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      lineHeight: 1.5,
                    }}
                  >
                    {item.text}
                  </a>
                ) : (
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    {item.text}
                  </span>
                )}
              </div>
            ))}
          </div>
        </ContentCard>
      )}

      {/* Stretch */}
      {entry.stretch && (
        <ContentCard color={CARD_COLORS.stretch} label="Stretch">
          <Paragraphs text={entry.stretch} />
        </ContentCard>
      )}
    </div>
  );
}
