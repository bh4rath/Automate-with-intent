import { useState } from 'react';

const FAQS = [
  {
    q: 'Do I need prior coding experience to complete this cohort?',
    a: 'No. The cohort is designed specifically for manual QA testers who have never written automation code. District 1 assumes zero coding knowledge. District 2 teaches you exactly the JavaScript you need — taught the way it would be in a 1:1 mentoring session, not a bootcamp.',
  },
  {
    q: 'What if I miss a day?',
    a: 'The portal stays at whatever day you\'re on — there\'s no time pressure inside the app. The cohort runs at your pace. If you fall behind, just pick up where you left off. The only thing that unlocks the next day is submitting your reflection for the current one.',
  },
  {
    q: 'Is there a minimum word count for reflections?',
    a: 'No. Deliberately not. One honest sentence beats five performative paragraphs. The reflection prompt is a Mad Lib structure — fill in what\'s true for you. An empty submission still unlocks the next day. Write what\'s real, not what sounds impressive.',
  },
  {
    q: 'What computer setup do I need?',
    a: 'Any laptop running Windows, Mac, or Linux. You\'ll install Node.js (free), VS Code (free), and Playwright (free) on Day 3. The whole stack costs nothing and runs locally — no cloud subscription required.',
  },
  {
    q: 'Can I start District 8 (Challenge Week) without finishing Districts 1–7?',
    a: 'The portal won\'t let you — each day unlocks only when the previous reflection is submitted. This is intentional. Districts 1–7 build the exact skills Challenge Week requires. Skipping ahead doesn\'t save time; it creates gaps that surface during the build.',
  },
  {
    q: 'What is the "practice app" used throughout the cohort?',
    a: 'Sauce Demo (saucedemo.com) — a free, purpose-built web app for practicing test automation. It has intentional bugs, multiple user types, and a predictable UI that won\'t change on you mid-cohort. Every code example in the course tests against it.',
  },
  {
    q: 'What does "District 8 multi-day stage" mean?',
    a: 'District 8\'s 7 entries each cover multiple calendar days (e.g., "Days 55–57" is a single build stage). You complete the whole stage together, write one reflection at the end, and unlock the next stage. There\'s no way to be "on Day 56" separately from the stage.',
  },
  {
    q: 'Is this course about getting a job or just learning?',
    a: 'Both, in that order. The first 7 districts focus entirely on skill-building. Identity and portfolio work arrive in District 7 (The Signal), when you have real evidence to point to. Challenge Week (District 8) produces a public, CI-verified project you can put in front of a hiring manager.',
  },
  {
    q: 'What if I get stuck on a build task?',
    a: 'The Further Reading section on each day points to the exact docs that address that day\'s topic. For errors: read the error message first, form a hypothesis, change one thing. That\'s the whole debugging method — and it\'s explicitly taught on Day 5.',
  },
  {
    q: 'Can I use this portal on mobile?',
    a: 'Yes — the portal is responsive. The sidebar collapses on small screens. That said, the actual coding tasks in Districts 1–8 require a laptop. Mobile is fine for reading content and submitting reflections; you\'ll need a full machine for the builds.',
  },
];

export default function QAView() {
  const [open, setOpen] = useState(null);

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
          Q&amp;A
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Frequently asked questions about the cohort.
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        {FAQS.map((faq, i) => (
          <div
            key={i}
            style={{
              background: 'var(--surface)',
              border: `1px solid ${open === i ? 'var(--border-hover)' : 'var(--border)'}`,
              borderRadius: '10px',
              overflow: 'hidden',
            }}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: 'var(--text)',
                  lineHeight: 1.4,
                }}
              >
                {faq.q}
              </span>
              <span
                style={{
                  color: 'var(--accent)',
                  fontSize: '1.1rem',
                  flexShrink: 0,
                  transition: 'transform 200ms',
                  transform: open === i ? 'rotate(45deg)' : 'none',
                  display: 'inline-block',
                }}
              >
                +
              </span>
            </button>
            {open === i && (
              <div
                style={{
                  padding: '0 1.25rem 1rem',
                  borderTop: '1px solid var(--border)',
                }}
              >
                <p
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.9rem',
                    lineHeight: 1.7,
                    paddingTop: '0.75rem',
                  }}
                >
                  {faq.a}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
