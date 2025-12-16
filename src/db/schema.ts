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
});

export const notesTable = sqliteTable("notes_table", {
  id: int().primaryKey({ autoIncrement: true }),
  bookId: int().notNull(),
  content: text().notNull(),
  category: text().notNull().default('Synthesis'),
  createdAt: text().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});
