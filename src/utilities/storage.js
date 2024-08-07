import { useEffect, useState } from 'preact/hooks';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = window.localStorage.getItem(key);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (err) {
        console.error('localStorage error:', key, stored, err); //eslint-disable-line no-console
      }
    }
    window.localStorage.setItem(key, JSON.stringify(initialValue));
    return initialValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
