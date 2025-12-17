import { and, eq } from "drizzle-orm";
import { db } from "../../db/client";
import { booksTable, notesTable } from "../../db/schema";
import type { Book, NewBookInput, Note, NoteCategory } from "./types";

type DbBookRow = typeof booksTable.$inferSelect;
type DbNoteRow = typeof notesTable.$inferSelect;

const normalizeBookInput = (input: NewBookInput) => ({
  ...input,
  img: input.img?.trim() || "no-cover",
  pages: Number.isFinite(input.pages) ? Number(input.pages) : 0,
  currentPage: Number.isFinite(input.currentPage) ? Number(input.currentPage) : 0,
});

const mapBook = (row: DbBookRow): Book => ({
  id: row.id,
  isbn: row.isbn ?? null,
  title: row.title,
  author: row.author,
  img: row.img,
  pages: row.pages ?? 0,
  currentPage: row.currentPage ?? 0,
});

const mapNote = (row: DbNoteRow): Note => ({
  id: row.id,
  bookId: row.bookId,
  content: row.content,
  category: row.category as NoteCategory,
  createdAt: row.createdAt,
});

export const getBooks = async (): Promise<Book[]> => {
  const rows = await db.select().from(booksTable).orderBy(booksTable.title);
  return rows.map(mapBook);
};

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

export const updateBook = async (id: number, payload: NewBookInput) => {
  const normalized = normalizeBookInput(payload);
  await db.update(booksTable).set(normalized).where(eq(booksTable.id, id));
};

export const updateBookProgress = async (id: number, currentPage: number) => {
  await db.update(booksTable).set({ currentPage }).where(eq(booksTable.id, id));
};

export const getBookById = async (id: number): Promise<Book[]> => {
  const rows = await db.select().from(booksTable).where(eq(booksTable.id, id));
  return rows.map(mapBook);
};

export const deleteBookById = async (id: number) => {
  await db.delete(booksTable).where(eq(booksTable.id, id));
};

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

export const addNoteForBook = async (bookId: number, content: string, category: NoteCategory) => {
  await db.insert(notesTable).values({ bookId, content, category });
};

export const updateNoteContent = async (id: number, content: string, category?: NoteCategory) => {
  const updateValues: { content: string; category?: NoteCategory } = { content };
  if (category) updateValues.category = category;
  await db.update(notesTable).set(updateValues).where(eq(notesTable.id, id));
};

export const deleteNoteById = async (id: number) => {
  await db.delete(notesTable).where(eq(notesTable.id, id));
};
