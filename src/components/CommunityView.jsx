const ANNOUNCEMENTS = [
  {
    id: 1,
    tag: 'Welcome',
    title: 'Welcome to the Automate with Intent Cohort',
    body: 'You\'re part of a cohort of manual QA testers building real automation skills together over 66 days. The community channel is your space to share wins, ask questions, and support each other. Post your Day 1 reflection to introduce yourself.',
    color: '#7C6AF7',
  },
  {
    id: 2,
    tag: 'How to Share',
    title: 'Weekly Screenshot Ritual',
    body: 'Every Sunday recap day, share one screenshot from the week — your first passing test, an error you fixed, your HTML report. It doesn\'t need to be impressive. It needs to be real. The people who post the messy screenshot are the ones who finish.',
    color: '#4ADE80',
  },
  {
    id: 3,
    tag: 'Challenge Week',
    title: 'Challenge Week (Days 53–66)',
    body: 'District 8 is build-in-public time. Post a daily 2–3 sentence update on what you built. Your finished project goes into the community as your Challenge Week submission. Peer reviews follow on Day 65.',
    color: '#F59E0B',
  },
  {
    id: 4,
    tag: 'Community Norms',
    title: 'How We Support Each Other',
    body: 'Specific > generic. "In your selector on line 12, consider using a data-test attribute because it\'s more resilient than the class name" beats "looks good!" Use the Day 46 feedback framework: observation → suggestion → reason.',
    color: '#F472B6',
  },
];

export default function CommunityView() {
  return (
    <div
      style={{
        maxWidth: 780,
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
          Community
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Announcements, rituals, and how we work together.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {ANNOUNCEMENTS.map((item) => (
          <div
            key={item.id}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: item.color,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: item.color,
                }}
              >
                {item.tag}
              </span>
            </div>
            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--text)',
              }}
            >
              {item.title}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
