// Data-layer helpers for CRUD on books and notes, plus progress tracking.
import { and, eq } from "drizzle-orm";
import { db } from "../../db/client";
import { booksTable, notesTable, readingSessionsTable } from "../../db/schema";
import type { Book, BookStatus, NewBookInput, Note, NoteCategory } from "./types";

type DbBookRow = typeof booksTable.$inferSelect;
type DbNoteRow = typeof notesTable.$inferSelect;

// Ensure book payloads have defaults for cover, pages, and status.
const normalizeBookInput = (input: NewBookInput) => ({
  ...input,
  img: input.img?.trim() || "no-cover",
  pages: Number.isFinite(input.pages) ? Number(input.pages) : 0,
  currentPage: Number.isFinite(input.currentPage) ? Number(input.currentPage) : 0,
  status: input.status ?? "reading",
});

// Convert DB row into app-facing Book shape.
const mapBook = (row: DbBookRow): Book => ({
  id: row.id,
  isbn: row.isbn ?? null,
  title: row.title,
  author: row.author,
  img: row.img,
  pages: row.pages ?? 0,
  currentPage: row.currentPage ?? 0,
  status: (row as any).status ?? "reading",
});

// Convert DB row into app-facing Note shape.
const mapNote = (row: DbNoteRow): Note => ({
  id: row.id,
  bookId: row.bookId,
  content: row.content,
  category: row.category as NoteCategory,
  createdAt: row.createdAt,
  page: (row as any).page ?? null,
});

// Fetch every book ordered by title for list views.
export const getBooks = async (): Promise<Book[]> => {
  const rows = await db.select().from(booksTable).orderBy(booksTable.title);
  return rows.map(mapBook);
};

// Insert a new book; returns duplicate status when the ISBN already exists.
export const addBook = async (payload: NewBookInput): Promise<{ status: "inserted" | "duplicate" }> => {
  const normalized = normalizeBookInput(payload);
  try {
    await db.insert(booksTable).values(normalized);
    return { status: "inserted" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message.includes("UNIQUE") && normalized.isbn) {
        return { status: "duplicate" };
    }
    throw error;
  }
};

// Update an existing book with normalized values (cover defaults, numeric pages).
export const updateBook = async (id: number, payload: NewBookInput) => {
  const normalized = normalizeBookInput(payload);
  await db.update(booksTable).set(normalized).where(eq(booksTable.id, id));
};

// Persist a new currentPage value and log a reading session delta for analytics.
export const updateBookProgress = async (id: number, currentPage: number) => {
  const previous = await db
    .select({ currentPage: booksTable.currentPage })
    .from(booksTable)
    .where(eq(booksTable.id, id))
    .limit(1);
  const previousPage = previous[0]?.currentPage ?? 0;

  await db.update(booksTable).set({ currentPage }).where(eq(booksTable.id, id));

  const delta = Math.max(0, currentPage - previousPage);
  if (delta > 0) {
    await db.insert(readingSessionsTable).values({
      bookId: id,
      pagesRead: delta,
      minutes: 0,
      recordedAt: new Date().toISOString(),
    });
  }
};

// Update a book's reading status (reading/paused/finished).
export const updateBookStatus = async (id: number, status: BookStatus) => {
  await db.update(booksTable).set({ status }).where(eq(booksTable.id, id));
};

// Retrieve a single book by id (used for details and edit screens).
export const getBookById = async (id: number): Promise<Book[]> => {
  const rows = await db.select().from(booksTable).where(eq(booksTable.id, id));
  return rows.map(mapBook);
};

// Remove a book entirely (no cascade cleanup here).
export const deleteBookById = async (id: number) => {
  await db.delete(booksTable).where(eq(booksTable.id, id));
};

// Get notes for a book, optionally filtered by category for UI chips.
export const getNotesByBookId = async (bookId: number, category?: NoteCategory): Promise<Note[]> => {
  const whereClause = category
    ? and(eq(notesTable.bookId, bookId), eq(notesTable.category, category))
    : eq(notesTable.bookId, bookId);
  const rows = await db
    .select()
    .from(notesTable)
    .where(whereClause)
    .orderBy(notesTable.category, notesTable.id);
  return rows.map(mapNote);
};

// Append a new note to a book, optionally including a page reference.
export const addNoteForBook = async (bookId: number, content: string, category: NoteCategory, page?: number | null) => {
  await db.insert(notesTable).values({ bookId, content, category, page });
};

// Update content (and optionally category) of an existing note.
export const updateNoteContent = async (id: number, content: string, category?: NoteCategory) => {
  const updateValues: { content: string; category?: NoteCategory } = { content };
  if (category) updateValues.category = category;
  await db.update(notesTable).set(updateValues).where(eq(notesTable.id, id));
};

// Delete a note by id.
export const deleteNoteById = async (id: number) => {
  await db.delete(notesTable).where(eq(notesTable.id, id));
};
