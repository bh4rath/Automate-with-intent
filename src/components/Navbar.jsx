const TABS = [
  { id: 'today', label: 'Today' },
  { id: 'progress', label: 'Progress' },
  { id: 'community', label: 'Community' },
  { id: 'resources', label: 'Resources' },
  { id: 'qa', label: 'Q&A' },
];

export default function Navbar({ activeTab, onTabChange, daysCompleted }) {
  return (
    <nav
      style={{
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 1.5rem',
        height: 57,
        gap: '1.5rem',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginRight: '1rem',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: '8px',
            background: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.7rem',
            fontWeight: 700,
            color: '#fff',
          }}
        >
          AWI
        </div>
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: '0.95rem',
            color: 'var(--text)',
            display: 'none',
          }}
          className="logo-text"
        >
          Automate with Intent
        </span>
      </div>

      {/* Tabs */}
      <div
        className="nav-tabs-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          flex: 1,
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              background: activeTab === tab.id ? 'var(--accent-soft)' : 'transparent',
              color: activeTab === tab.id ? 'var(--accent)' : 'var(--text-muted)',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: activeTab === tab.id ? 600 : 400,
              fontSize: '0.88rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'background 150ms, color 150ms',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Progress pill */}
      <div
        className="nav-progress"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            background: 'var(--surface2)',
            border: '1px solid var(--border)',
            borderRadius: '999px',
            padding: '4px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div
            style={{
              width: 60,
              height: 4,
              background: 'var(--surface2)',
              borderRadius: '999px',
              overflow: 'hidden',
              border: '1px solid var(--border)',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${Math.round((daysCompleted / 66) * 100)}%`,
                background: 'var(--accent)',
                borderRadius: '999px',
              }}
            />
          </div>
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.68rem',
              fontWeight: 700,
              color: 'var(--text-muted)',
            }}
          >
            {daysCompleted}/66
          </span>
        </div>
      </div>
    </nav>
  );
}
