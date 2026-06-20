// Returns whether an entry at `index` is unlocked given the progress map.
// Rules:
//  - Index 0 (Day 1) always unlocked
//  - Entry unlocks when the previous entry's reflection is marked complete
//  - Sunday entries auto-unlock their successor (no gate on the Monday after recap)
export function isEntryUnlocked(entries, index, isCompleted) {
  if (index === 0) return true;
  const prev = entries[index - 1];
  if (!prev) return false;
  // If the previous entry is a Sunday, successor unlocks automatically
  if (prev.isSunday) return true;
  return isCompleted(prev.dayStart);
}

// Count calendar days completed (range entries count as their full span)
export function countCalendarDaysCompleted(entries, isCompleted) {
  return entries.reduce((sum, entry) => {
    if (!isCompleted(entry.dayStart)) return sum;
    return sum + (entry.dayEnd - entry.dayStart + 1);
  }, 0);
}

// Compute current streak: consecutive calendar days back from today's progress
export function computeStreak(entries, isCompleted) {
  let streak = 0;
  for (let i = entries.length - 1; i >= 0; i--) {
    if (isCompleted(entries[i].dayStart)) {
      streak += entries[i].dayEnd - entries[i].dayStart + 1;
    } else {
      break;
    }
  }
  return streak;
}

// Group entries by district
export function groupByDistrict(entries) {
  const map = new Map();
  for (const entry of entries) {
    if (!map.has(entry.district)) {
      map.set(entry.district, { district: entry.district, name: entry.districtName, entries: [] });
    }
    map.get(entry.district).entries.push(entry);
  }
  return Array.from(map.values());
}
