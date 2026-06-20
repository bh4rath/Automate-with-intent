import { groupByDistrict, countCalendarDaysCompleted, isEntryUnlocked } from '../data/unlock';

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

function StatCard({ value, label, color }) {
  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        flex: 1,
        minWidth: 120,
      }}
    >
      <span
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '1.75rem',
          fontWeight: 700,
          color: color || 'var(--accent)',
          lineHeight: 1,
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.68rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--text-dim)',
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function ProgressView({ entries, isCompleted, onSelectEntry }) {
  const groups = groupByDistrict(entries);
  const daysCompleted = countCalendarDaysCompleted(entries, isCompleted);
  const daysRemaining = 66 - daysCompleted;

  // Streak: consecutive completed entries from the last
  let streak = 0;
  for (let i = entries.length - 1; i >= 0; i--) {
    if (isCompleted(entries[i].dayStart)) {
      streak += entries[i].dayEnd - entries[i].dayStart + 1;
    } else {
      break;
    }
  }

  const progressPct = Math.round((daysCompleted / 66) * 100);

  return (
    <div
      style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: '2rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      <div>
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--text)',
            marginBottom: '0.25rem',
          }}
        >
          Your Progress
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          {daysCompleted} of 66 calendar days complete
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <StatCard value={daysCompleted} label="Days Done" color="var(--accent)" />
        <StatCard value={streak} label="Current Streak" color="var(--green)" />
        <StatCard value={daysRemaining} label="Days Remaining" color="var(--amber)" />
        <StatCard value={`${progressPct}%`} label="Complete" color="#F472B6" />
      </div>

      {/* Overall progress bar */}
      <div
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '1.25rem 1.5rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.75rem',
            alignItems: 'center',
          }}
        >
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
            Overall Progress
          </span>
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.8rem',
              color: 'var(--accent)',
              fontWeight: 700,
            }}
          >
            {progressPct}%
          </span>
        </div>
        <div
          style={{
            background: 'var(--surface2)',
            borderRadius: '999px',
            height: '8px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progressPct}%`,
              background: 'linear-gradient(90deg, var(--accent), #9B8FFA)',
              borderRadius: '999px',
              transition: 'width 600ms ease',
            }}
          />
        </div>
      </div>

      {/* District grids */}
      {groups.map((group) => {
        const color = DISTRICT_COLORS[group.district] || 'var(--accent)';
        const distCompleted = group.entries.filter((e) => isCompleted(e.dayStart)).length;

        return (
          <div
            key={group.district}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
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
                  District {group.district}
                </span>
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'var(--text)',
                    marginTop: '2px',
                  }}
                >
                  {group.name}
                </h3>
              </div>
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.75rem',
                  color: 'var(--text-dim)',
                }}
              >
                {distCompleted}/{group.entries.length}
              </span>
            </div>

            {/* Cell grid */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
              }}
            >
              {group.entries.map((entry) => {
                const entryIndex = entries.indexOf(entry);
                const unlocked = isEntryUnlocked(entries, entryIndex, isCompleted);
                const completed = isCompleted(entry.dayStart);
                const isRange = entry.dayEnd > entry.dayStart;

                const cellLabel = entry.isStage
                  ? entry.stageLabel.replace('Days ', '').replace('Day ', '')
                  : entry.isSunday
                  ? `${entry.day}↺`
                  : `${entry.day}`;

                return (
                  <button
                    key={entry.dayStart}
                    onClick={() => unlocked && onSelectEntry && onSelectEntry(entryIndex)}
                    title={`${entry.title}${!unlocked ? ' (locked)' : ''}`}
                    style={{
                      width: isRange ? 'auto' : 36,
                      minWidth: isRange ? 54 : 36,
                      height: 36,
                      padding: '0 8px',
                      borderRadius: '6px',
                      border: `1px solid ${
                        completed
                          ? color
                          : unlocked
                          ? 'var(--border-hover)'
                          : 'var(--border)'
                      }`,
                      background: completed
                        ? `${color}22`
                        : unlocked
                        ? 'var(--surface2)'
                        : 'transparent',
                      cursor: unlocked ? 'pointer' : 'default',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'Space Mono', monospace",
                      fontSize: isRange ? '0.6rem' : '0.65rem',
                      fontWeight: 700,
                      color: completed
                        ? color
                        : unlocked
                        ? 'var(--text-muted)'
                        : 'var(--text-dim)',
                      opacity: unlocked ? 1 : 0.4,
                      transition: 'all 150ms',
                    }}
                  >
                    {unlocked || completed ? cellLabel : '·'}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
