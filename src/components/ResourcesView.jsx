const RESOURCES = [
  {
    category: 'Core Tools',
    color: '#7C6AF7',
    links: [
      { label: 'Playwright Documentation', url: 'https://playwright.dev/docs/intro', desc: 'Official docs — start here for any Playwright question.' },
      { label: 'Node.js', url: 'https://nodejs.org', desc: 'JavaScript runtime. Download the LTS version.' },
      { label: 'VS Code', url: 'https://code.visualstudio.com', desc: 'Recommended code editor for this cohort.' },
      { label: 'Sauce Demo', url: 'https://www.saucedemo.com', desc: 'The practice app you\'ll build your entire test suite against.' },
    ],
  },
  {
    category: 'JavaScript Reference',
    color: '#F59E0B',
    links: [
      { label: 'MDN — JavaScript First Steps', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps', desc: 'Variables, strings, arrays — the foundation.' },
      { label: 'MDN — Functions', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Functions', desc: 'Write it once, use it everywhere.' },
      { label: 'MDN — Async/Await', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises', desc: 'How Playwright\'s await pattern works under the hood.' },
      { label: 'javascript.info', url: 'https://javascript.info', desc: 'The best free JavaScript reference. Use as a lookup, not a read-through.' },
    ],
  },
  {
    category: 'Testing Concepts',
    color: '#4ADE80',
    links: [
      { label: 'Playwright — Writing Tests', url: 'https://playwright.dev/docs/writing-tests', desc: 'The AAA pattern applied in the official docs.' },
      { label: 'Playwright — Page Object Models', url: 'https://playwright.dev/docs/pom', desc: 'District 5 core reading — structure for scale.' },
      { label: 'Playwright — CI with GitHub Actions', url: 'https://playwright.dev/docs/ci-intro', desc: 'District 6 core reading.' },
      { label: 'Playwright — Debugging', url: 'https://playwright.dev/docs/debug', desc: 'The Inspector. Use it when tests fail unexpectedly.' },
    ],
  },
  {
    category: 'Career & Portfolio',
    color: '#F472B6',
    links: [
      { label: 'GitHub', url: 'https://github.com', desc: 'Where your project lives. Make it public.' },
      { label: 'LinkedIn', url: 'https://linkedin.com', desc: 'Build in public here. Tag your cohort posts #AutomateWithIntent.' },
    ],
  },
];

export default function ResourcesView() {
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
          Resources
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Curated links for every district of the cohort.
        </p>
      </div>

      {RESOURCES.map((section) => (
        <div
          key={section.category}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: section.color,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: section.color,
              }}
            >
              {section.category}
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {section.links.map((link) => (
              <div key={link.url} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: section.color,
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                  }}
                >
                  {link.label} →
                </a>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.83rem', lineHeight: 1.5 }}>
                  {link.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
