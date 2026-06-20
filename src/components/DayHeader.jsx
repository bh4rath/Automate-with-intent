const DISTRICT_COLORS = {
  1: '#7C6AF7',
  2: '#4ADE80',
  3: '#F59E0B',
  4: '#F472B6',
  5: '#FB923C',
  6: '#60A5FA',
  7: '#A78BFA',
  8: '#F87171',
};

export default function DayHeader({ entry }) {
  const color = DISTRICT_COLORS[entry.district] || 'var(--accent)';
  const dayLabel = entry.isStage
    ? entry.stageLabel
    : entry.isSunday
    ? `Day ${entry.day} — Weekly Recap`
    : `Day ${entry.day}`;

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div className="day-header-meta" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.4rem' }}>
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.68rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color,
          }}
        >
          {dayLabel}
        </span>
        <span style={{ color: 'var(--border-hover)', fontSize: '0.8rem' }}>·</span>
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.68rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--text-dim)',
          }}
        >
          District {entry.district} — {entry.districtName}
        </span>
        {entry.isSunday && (
          <span
            style={{
              background: 'rgba(245,158,11,0.12)',
              border: '1px solid rgba(245,158,11,0.25)',
              borderRadius: '4px',
              padding: '1px 8px',
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#F59E0B',
            }}
          >
            Recap
          </span>
        )}
        {entry.isStage && !entry.isFinalDay && (
          <span
            style={{
              background: 'rgba(248,113,113,0.1)',
              border: '1px solid rgba(248,113,113,0.25)',
              borderRadius: '4px',
              padding: '1px 8px',
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#F87171',
            }}
          >
            Stage
          </span>
        )}
      </div>
      <h1
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(1.4rem, 3vw, 2rem)',
          fontWeight: 700,
          color: 'var(--text)',
          lineHeight: 1.25,
        }}
      >
        {entry.title}
      </h1>
    </div>
  );
}
