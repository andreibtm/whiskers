// Hook powering the Home dashboard: loads stats, determines current book, and runs a focus timer.
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { getBooks } from "../../modules/books/book.service";
import type { Book } from "../../modules/books/types";
import {
    getGoalTarget,
    getLatestReadingSession,
    getMonthlyReadingTotals,
    getRecentReadingDates,
    recordReadingSession,
} from "../../modules/reading/reading.service";

const DEFAULT_TIMER_SECONDS = 25 * 60;
const dayKey = (date: Date) => date.toISOString().slice(0, 10);

// Derive a reading streak in days based on ISO date strings of recent sessions.
const computeStreak = (dates: string[]) => {
  if (!dates || dates.length === 0) return 0;
  const days = new Set(dates);
  const cursor = new Date();
  if (!days.has(dayKey(cursor))) return 0;
  let streak = 0;
  while (days.has(dayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
};

export const useHome = () => {
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [pagesThisMonth, setPagesThisMonth] = useState(0);
  const [minutesThisMonth, setMinutesThisMonth] = useState(0);
  const [streak, setStreak] = useState(0);
  const [booksFinished, setBooksFinished] = useState(0);
  const [goalTarget, setGoalTargetState] = useState(12);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [timerSeconds, setTimerSeconds] = useState(DEFAULT_TIMER_SECONDS);
  const [timerRunning, setTimerRunning] = useState(false);
  const timerStartRef = useRef(DEFAULT_TIMER_SECONDS);

  const resetTimerState = useCallback(() => {
    setTimerRunning(false);
    setTimerSeconds(DEFAULT_TIMER_SECONDS);
    timerStartRef.current = DEFAULT_TIMER_SECONDS;
  }, []);

  // Pull dashboard data: library list, most recent session, monthly totals, streak, and goal target.
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [books, latestSession, totals, recentDates, target] = await Promise.all([
        getBooks(),
        getLatestReadingSession(),
        getMonthlyReadingTotals(),
        getRecentReadingDates(),
        getGoalTarget(),
      ]);

      const finishedCount = books.filter((b) => b.status === "finished").length;
      setBooksFinished(finishedCount);
      setGoalTargetState(target);
      setPagesThisMonth(totals.pages);
      setMinutesThisMonth(totals.minutes);
      setStreak(computeStreak(recentDates));

      let nextCurrent: Book | null = null;
      if (latestSession?.bookId) {
        nextCurrent = books.find((b) => b.id === latestSession.bookId) ?? null;
      }
      if (!nextCurrent) {
        nextCurrent = books.find((b) => b.status === "reading") ?? books[0] ?? null;
      }
      setCurrentBook(nextCurrent ?? null);
    } catch (err) {
      console.error(err);
      setError("Could not load home data");
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const logSession = useCallback(async (elapsedSeconds: number) => {
    const minutesSpent = Math.max(1, Math.round(elapsedSeconds / 60));
    try {
      await recordReadingSession({ bookId: currentBook?.id ?? null, pagesRead: 0, minutes: minutesSpent });
      await load();
    } catch (err) {
      console.error(err);
      setError("Could not log focus session");
    }
  }, [currentBook?.id, load]);

  const handleTimerComplete = useCallback(async () => {
    setTimerRunning(false);
    await logSession(timerStartRef.current);
    resetTimerState();
  }, [logSession, resetTimerState]);

  useEffect(() => {
    if (!timerRunning) return;
    // Tick down once per second; when it hits zero, log a reading session and reset the timer.
    const id = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          void handleTimerComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [timerRunning, handleTimerComplete]);

  const startTimer = useCallback(() => {
    timerStartRef.current = timerSeconds || DEFAULT_TIMER_SECONDS;
    setTimerRunning(true);
  }, [timerSeconds]);

  const pauseTimer = useCallback(() => {
    setTimerRunning(false);
  }, []);

  const resetTimer = useCallback(() => {
    resetTimerState();
  }, [resetTimerState]);

   // Used when a user taps “Done” mid-session; logs elapsed time so far.
  const completeTimerEarly = useCallback(async () => {
    if (timerRunning || timerSeconds !== timerStartRef.current) {
      setTimerRunning(false);
      const elapsed = Math.max(1, timerStartRef.current - timerSeconds);
      await logSession(elapsed);
      resetTimerState();
    }
  }, [logSession, resetTimerState, timerRunning, timerSeconds]);

  return {
    currentBook,
    pagesThisMonth,
    minutesThisMonth,
    streak,
    booksFinished,
    goalTarget,
    loading,
    error,
    timerSeconds,
    timerRunning,
    startTimer,
    pauseTimer,
    resetTimer,
    completeTimerEarly,
    refresh: load,
  };
};

export const DEFAULT_SESSION_SECONDS = DEFAULT_TIMER_SECONDS;
