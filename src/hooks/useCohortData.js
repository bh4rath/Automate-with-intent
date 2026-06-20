import { useState, useEffect } from 'react';

export function useCohortData() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/cohort-data.json')
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load cohort data');
        return r.json();
      })
      .then((data) => {
        setEntries(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { entries, loading, error };
}
