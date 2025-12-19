import { and, desc, eq, gte, lt } from "drizzle-orm";
import { db } from "../../db/client";
import { goalsTable, readingSessionsTable } from "../../db/schema";

export type ReadingSession = {
  id: number;
  bookId: number | null;
  pagesRead: number;
  minutes: number;
  recordedAt: string;
};

const dateOnly = (iso: string) => iso.slice(0, 10);

export const recordReadingSession = async (params: { bookId?: number | null; pagesRead?: number; minutes?: number; recordedAt?: string }) => {
  const { bookId = null, pagesRead = 0, minutes = 0, recordedAt } = params;
  const safePages = Number.isFinite(pagesRead) ? Math.max(0, pagesRead) : 0;
  const safeMinutes = Number.isFinite(minutes) ? Math.max(0, minutes) : 0;
  const payload = {
    bookId: typeof bookId === "number" ? bookId : null,
    pagesRead: safePages,
    minutes: safeMinutes,
    recordedAt: recordedAt ?? new Date().toISOString(),
  };
  await db.insert(readingSessionsTable).values(payload);
};

export const getLatestReadingSession = async (): Promise<ReadingSession | null> => {
  const rows = await db
    .select()
    .from(readingSessionsTable)
    .orderBy(desc(readingSessionsTable.recordedAt))
    .limit(1);
  return (rows[0] as ReadingSession | undefined) ?? null;
};

export const getMonthlyReadingTotals = async (targetDate: Date = new Date()) => {
  const start = new Date(targetDate);
  start.setDate(1);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setMonth(start.getMonth() + 1);

  const rows = await db
    .select({ pagesRead: readingSessionsTable.pagesRead, minutes: readingSessionsTable.minutes, recordedAt: readingSessionsTable.recordedAt })
    .from(readingSessionsTable)
    .where(
      and(
        gte(readingSessionsTable.recordedAt, start.toISOString()),
        lt(readingSessionsTable.recordedAt, end.toISOString())
      )
    );

  const totals = rows.reduce(
    (acc, row) => {
      const pages = Number(row.pagesRead) || 0;
      const minutes = Number(row.minutes) || 0;
      return { pages: acc.pages + pages, minutes: acc.minutes + minutes };
    },
    { pages: 0, minutes: 0 }
  );

  return totals;
};

export const getRecentReadingDates = async (daysBack = 60) => {
  const start = new Date();
  start.setDate(start.getDate() - daysBack);
  start.setHours(0, 0, 0, 0);

  const rows = await db
    .select({ recordedAt: readingSessionsTable.recordedAt })
    .from(readingSessionsTable)
    .where(gte(readingSessionsTable.recordedAt, start.toISOString()))
    .orderBy(desc(readingSessionsTable.recordedAt));

  return rows.map((row) => dateOnly(row.recordedAt as string));
};

export const getGoalTarget = async () => {
  const rows = await db.select().from(goalsTable).limit(1);
  if (rows.length === 0) {
    await db.insert(goalsTable).values({ booksTarget: 12 });
    return 12;
  }
  const target = rows[0].booksTarget as number | undefined;
  return typeof target === "number" && Number.isFinite(target) ? target : 12;
};

export const setGoalTarget = async (target: number) => {
  const safeTarget = Number.isFinite(target) && target > 0 ? Math.round(target) : 12;
  const rows = await db.select().from(goalsTable).limit(1);
  if (rows.length === 0) {
    await db.insert(goalsTable).values({ booksTarget: safeTarget });
  } else {
    await db.update(goalsTable).set({ booksTarget: safeTarget }).where(eq(goalsTable.id, rows[0].id as number));
  }
  return safeTarget;
};
