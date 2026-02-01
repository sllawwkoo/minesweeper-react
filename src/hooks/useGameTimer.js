import { useState, useEffect, useCallback } from 'react';

/**
 * Хук таймера. Відповідає лише за час (секунди).
 * Не знає про правила гри, перемогу чи поразку.
 */
export function useGameTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const stop = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setSeconds(0);
    setIsRunning(false);
  }, []);

  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [isRunning]);

  return { seconds, isRunning, start, stop, reset };
}
