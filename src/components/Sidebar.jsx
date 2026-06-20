import { groupByDistrict } from '../data/unlock';
import { isEntryUnlocked } from '../data/unlock';

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

export default function Sidebar({ entries, selectedIndex, onSelect, isCompleted }) {
  const groups = groupByDistrict(entries);

  return (
    <aside
      style={{
        width: 240,
        flexShrink: 0,
        background: 'var(--surface)',
        borderRight: '1px solid var(--border)',
        height: '100%',
        overflowY: 'auto',
        position: 'sticky',
        top: 0,
      }}
    >
      <div style={{ padding: '1rem 0', display: 'flex', flexDirection: 'column', gap: 0 }}>
        {groups.map((group) => (
          <div key={group.district}>
            {/* District divider */}
            <div
              style={{
                padding: '0.5rem 1rem 0.3rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: 'var(--border)',
                }}
              />
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: DISTRICT_COLORS[group.district] || 'var(--text-dim)',
                  whiteSpace: 'nowrap',
                }}
              >
                D{group.district} · {group.name}
              </span>
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: 'var(--border)',
                }}
              />
            </div>

            {/* Day entries */}
            {group.entries.map((entry) => {
              const entryIndex = entries.indexOf(entry);
              const unlocked = isEntryUnlocked(entries, entryIndex, isCompleted);
              const completed = isCompleted(entry.dayStart);
              const selected = entryIndex === selectedIndex;

              const dayLabel = entry.isStage
                ? entry.stageLabel
                : entry.isSunday
                ? `Day ${entry.day} — Recap`
                : `Day ${entry.day}`;

              return (
                <button
                  key={entry.dayStart}
                  disabled={!unlocked}
                  onClick={() => unlocked && onSelect(entryIndex)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '0.5rem 1rem',
                    background: selected ? 'var(--accent-soft)' : 'transparent',
                    border: 'none',
                    borderLeft: selected
                      ? `3px solid var(--accent)`
                      : '3px solid transparent',
                    cursor: unlocked ? 'pointer' : 'not-allowed',
                    textAlign: 'left',
                    opacity: unlocked ? 1 : 0.35,
                    transition: 'background 150ms, border-color 150ms',
                  }}
                  onMouseEnter={(e) => {
                    if (unlocked && !selected) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!selected) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                  title={!unlocked ? 'Complete the previous day to unlock' : undefined}
                >
                  {/* Status dot */}
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      flexShrink: 0,
                      background: completed
                        ? 'var(--green)'
                        : selected
                        ? 'var(--accent)'
                        : unlocked
                        ? 'var(--border-hover)'
                        : 'var(--border)',
                    }}
                  />
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: '0.65rem',
                        color: selected ? 'var(--accent)' : 'var(--text-dim)',
                        marginBottom: '1px',
                      }}
                    >
                      {dayLabel}
                    </div>
                    <div
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: selected ? 600 : 400,
                        color: selected ? 'var(--text)' : 'var(--text-muted)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {entry.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </aside>
  );
}
