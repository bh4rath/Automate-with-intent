import { useState, useCallback } from 'react';

const STORAGE_KEY = 'awi_progress';

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

export function useProgress() {
  const [progress, setProgress] = useState(loadProgress);

  const isCompleted = useCallback(
    (dayStart) => !!progress[`day_${dayStart}_done`],
    [progress]
  );

  const markComplete = useCallback((dayStart) => {
    setProgress((prev) => {
      const next = { ...prev, [`day_${dayStart}_done`]: true };
      saveProgress(next);
      return next;
    });
  }, []);

  return { progress, isCompleted, markComplete };
}
