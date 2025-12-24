// Drizzle schema definitions for books, notes, reading sessions, and goals tables.
import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const booksTable = sqliteTable("books_table", {
  id: int().primaryKey({ autoIncrement: true }),
  isbn: text().unique(),
  title: text().notNull(),
  author: text().notNull(),
  img: text().notNull(),
  pages: int().notNull().default(0),
  currentPage: int().notNull().default(0),
  status: text({ length: 20 }).notNull().default("reading"),
});

export const notesTable = sqliteTable("notes_table", {
  id: int().primaryKey({ autoIncrement: true }),
  bookId: int().notNull(),
  content: text().notNull(),
  category: text().notNull().default('Synthesis'),
  createdAt: text().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
  page: int(),
});

export const readingSessionsTable = sqliteTable("reading_sessions_table", {
  id: int().primaryKey({ autoIncrement: true }),
  bookId: int(),
  pagesRead: int().notNull().default(0),
  minutes: int().notNull().default(0),
  recordedAt: text().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});

export const goalsTable = sqliteTable("goals_table", {
  id: int().primaryKey({ autoIncrement: true }),
  booksTarget: int().notNull().default(12),
});
