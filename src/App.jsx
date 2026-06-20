import { useState } from 'react';
import './App.css';
import { useCohortData } from './hooks/useCohortData';
import { useProgress } from './hooks/useProgress';
import { countCalendarDaysCompleted } from './data/unlock';
import Navbar from './components/Navbar';
import TodayView from './components/TodayView';
import ProgressView from './components/ProgressView';
import CommunityView from './components/CommunityView';
import ResourcesView from './components/ResourcesView';
import QAView from './components/QAView';

export default function App() {
  const { entries, loading, error } = useCohortData();
  const { isCompleted, markComplete } = useProgress();
  const [activeTab, setActiveTab] = useState('today');
  const [todayEntryIndex, setTodayEntryIndex] = useState(null);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '3px solid var(--surface2)',
            borderTopColor: 'var(--accent)',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.8rem',
            color: 'var(--text-dim)',
          }}
        >
          Loading cohort data...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          flexDirection: 'column',
          gap: '0.75rem',
        }}
      >
        <span style={{ fontSize: '2rem' }}>⚠️</span>
        <p style={{ color: 'var(--red)', fontFamily: "'Space Mono', monospace", fontSize: '0.85rem' }}>
          {error}
        </p>
      </div>
    );
  }

  const daysCompleted = countCalendarDaysCompleted(entries, isCompleted);

  function handleSelectFromProgress(index) {
    setTodayEntryIndex(index);
    setActiveTab('today');
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} daysCompleted={daysCompleted} />

      {activeTab === 'today' && (
        <TodayView
          entries={entries}
          isCompleted={isCompleted}
          markComplete={markComplete}
          externalIndex={todayEntryIndex}
          onExternalIndexConsumed={() => setTodayEntryIndex(null)}
        />
      )}
      {activeTab === 'progress' && (
        <ProgressView
          entries={entries}
          isCompleted={isCompleted}
          onSelectEntry={handleSelectFromProgress}
        />
      )}
      {activeTab === 'community' && <CommunityView />}
      {activeTab === 'resources' && <ResourcesView />}
      {activeTab === 'qa' && <QAView />}
    </div>
  );
}
