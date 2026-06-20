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

export default function StageEntry({ entry, isCompleted, onComplete }) {
  const [reflection, setReflection] = useState('');
  const [submitted, setSubmitted] = useState(isCompleted);

  const isFinal = entry.isFinalDay;

  function handleSubmit() {
    setSubmitted(true);
    onComplete(entry.dayStart);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Framing */}
      <ContentCard color="var(--accent)" label="Stage Overview">
        <Paragraphs text={entry.framing} />
      </ContentCard>

      {/* Named sections */}
      {entry.sections && entry.sections.map((section, i) => (
        <div
          key={i}
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '1.25rem 1.5rem',
          }}
        >
          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--text)',
              marginBottom: '0.75rem',
            }}
          >
            {section.heading}
          </h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>{section.body}</p>
        </div>
      ))}

      {/* Build — null on Day 66 */}
      {entry.build && (
        <ContentCard color="#4ADE80" label="Today's Build">
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
      )}

      {/* Reflection */}
      <ContentCard color="#F472B6" label="Reflection">
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
                onFocus={(e) => { e.target.style.borderColor = '#F472B6'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
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
                {isFinal ? 'Complete the Cohort' : 'Submit Reflection'}
              </button>
            </>
          ) : isFinal ? (
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(124,106,247,0.15), rgba(74,222,128,0.1))',
                border: '1px solid var(--accent-glow)',
                borderRadius: '12px',
                padding: '1.5rem',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: '2rem',
                  marginBottom: '0.75rem',
                }}
              >
                🎯
              </div>
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--accent)',
                  marginBottom: '0.5rem',
                }}
              >
                COHORT COMPLETE
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.65 }}>
                {entry.teaser}
              </p>
            </div>
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
              <span>Reflection submitted — next stage unlocked</span>
            </div>
          )}
        </div>
      </ContentCard>

      {/* Non-final teaser */}
      {submitted && !isFinal && entry.teaser && (
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
            <strong style={{ color: 'var(--accent)' }}>Up next: </strong>
            {entry.teaser}
          </p>
        </div>
      )}
    </div>
  );
}
