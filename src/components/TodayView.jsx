import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import MobileDaySelector from './MobileDaySelector';
import DayHeader from './DayHeader';
import WeekdayEntry from './WeekdayEntry';
import SundayEntry from './SundayEntry';
import StageEntry from './StageEntry';
import { isEntryUnlocked } from '../data/unlock';

export default function TodayView({ entries, isCompleted, markComplete, externalIndex, onExternalIndexConsumed }) {
  function getInitialIndex() {
    for (let i = 0; i < entries.length; i++) {
      const unlocked = isEntryUnlocked(entries, i, isCompleted);
      if (unlocked && !isCompleted(entries[i].dayStart)) return i;
    }
    for (let i = entries.length - 1; i >= 0; i--) {
      if (isCompleted(entries[i].dayStart)) return i;
    }
    return 0;
  }

  const [selectedIndex, setSelectedIndex] = useState(getInitialIndex);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (externalIndex !== null && externalIndex !== undefined) {
      setSelectedIndex(externalIndex);
      onExternalIndexConsumed?.();
    }
  }, [externalIndex]);

  const entry = entries[selectedIndex];
  if (!entry) return null;

  const unlocked = isEntryUnlocked(entries, selectedIndex, isCompleted);
  const completed = isCompleted(entry.dayStart);

  function handleSelect(index) {
    setSelectedIndex(index);
    setSidebarOpen(false);
  }

  function renderEntry() {
    if (!unlocked) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            padding: '4rem 2rem',
            textAlign: 'center',
          }}
        >
          <span style={{ fontSize: '2.5rem' }}>🔒</span>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.25rem', fontWeight: 600, color: 'var(--text)' }}>
            Day Locked
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: 380 }}>
            Complete the previous day's reflection to unlock this content.
          </p>
        </div>
      );
    }

    if (entry.isSunday) return <SundayEntry key={entry.dayStart} entry={entry} isCompleted={completed} onComplete={markComplete} />;
    if (entry.isStage) return <StageEntry key={entry.dayStart} entry={entry} isCompleted={completed} onComplete={markComplete} />;
    return <WeekdayEntry key={entry.dayStart} entry={entry} isUnlocked={unlocked} isCompleted={completed} onComplete={markComplete} />;
  }

  const dayLabel = entry.isStage ? entry.stageLabel : `Day ${entry.day}`;

  return (
    <>
      {/* Mobile day selector bar */}
      <div
        style={{
          display: 'none',
          background: 'var(--surface)',
          borderBottom: '1px solid var(--border)',
          padding: '0.6rem 1rem',
          alignItems: 'center',
          gap: '0.75rem',
        }}
        className="mobile-bar"
      >
        <button
          onClick={() => setSidebarOpen(true)}
          style={{
            background: 'var(--surface2)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '6px 12px',
            color: 'var(--text-muted)',
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.72rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          ☰ {dayLabel}
        </button>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.83rem', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {entry.title}
        </span>
      </div>

      <div className="today-content-wrapper" style={{ display: 'flex', height: 'calc(100vh - 57px)', overflow: 'hidden' }}>
        {/* Desktop Sidebar */}
        <div className="sidebar-desktop">
          <Sidebar
            entries={entries}
            selectedIndex={selectedIndex}
            onSelect={handleSelect}
            isCompleted={isCompleted}
          />
        </div>

        {/* Mobile overlay sidebar */}
        {sidebarOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 200,
              display: 'flex',
            }}
          >
            <div
              onClick={() => setSidebarOpen(false)}
              style={{ flex: 1, background: 'rgba(0,0,0,0.6)' }}
            />
            <div style={{ width: 260, height: '100%', overflowY: 'auto' }}>
              <Sidebar
                entries={entries}
                selectedIndex={selectedIndex}
                onSelect={handleSelect}
                isCompleted={isCompleted}
              />
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="today-main-content" style={{ flex: 1, overflowY: 'auto', padding: '2rem 2.5rem' }}>
          <div style={{ maxWidth: 740, margin: '0 auto' }}>
            <DayHeader entry={entry} />
            {renderEntry()}
          </div>
        </main>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .mobile-bar { display: flex !important; }
          .sidebar-desktop { display: none !important; }
        }
        @media (min-width: 641px) {
          .sidebar-desktop { display: block; }
        }
      `}</style>
    </>
  );
}
