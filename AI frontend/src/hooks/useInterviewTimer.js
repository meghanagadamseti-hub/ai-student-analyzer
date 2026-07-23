import { useState, useEffect, useRef, useCallback } from "react";

/**
 * useInterviewTimer
 * Counts UP from 0. Returns elapsed seconds, a formatted mm:ss string,
 * and controls: start / pause / reset.
 */
export function useInterviewTimer(autoStart = false) {
  const [seconds,  setSeconds]  = useState(0);
  const [running,  setRunning]  = useState(autoStart);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const start  = useCallback(() => setRunning(true),  []);
  const pause  = useCallback(() => setRunning(false), []);
  const reset  = useCallback(() => { setRunning(false); setSeconds(0); }, []);
  const restart = useCallback(() => { setSeconds(0); setRunning(true); }, []);

  const formatted = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  return { seconds, formatted, running, start, pause, reset, restart };
}

/**
 * useQuestionTimer
 * Counts DOWN from `limitSeconds`. Calls `onExpire` when it hits 0.
 * Returns elapsed seconds, remaining seconds, formatted remaining string,
 * and a progress 0–100.
 */
export function useQuestionTimer(limitSeconds = 120, onExpire, active = true) {
  const [remaining, setRemaining] = useState(limitSeconds);
  const intervalRef = useRef(null);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  // Reset when limit or active changes
  useEffect(() => {
    setRemaining(limitSeconds);
  }, [limitSeconds, active]);

  useEffect(() => {
    if (!active) { clearInterval(intervalRef.current); return; }
    intervalRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(intervalRef.current);
          onExpireRef.current?.();
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [active, limitSeconds]);

  const reset = useCallback(() => setRemaining(limitSeconds), [limitSeconds]);

  const progress  = Math.round(((limitSeconds - remaining) / limitSeconds) * 100);
  const formatted = `${String(Math.floor(remaining / 60)).padStart(2, "0")}:${String(remaining % 60).padStart(2, "0")}`;
  const isWarning = remaining <= 30;
  const isDanger  = remaining <= 10;

  return { remaining, formatted, progress, isWarning, isDanger, reset };
}
