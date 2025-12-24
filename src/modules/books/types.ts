// Shared Book/Note domain types and enums used across features.
export type NoteCategory = "Questions" | "Facts" | "Quotes" | "Synthesis";

export type Book = {
  id: number;
  isbn: string | null;
  title: string;
  author: string;
  img: string;
  pages: number;
  currentPage: number;
  status: BookStatus;
};

export type BookStatus = "reading" | "paused" | "finished";

export type NewBookInput = {
  isbn?: string | null;
  title: string;
  author: string;
  img: string;
  pages?: number;
  currentPage?: number;
  status?: BookStatus;
};

export type Note = {
  id: number;
  bookId: number;
  content: string;
  category: NoteCategory;
  createdAt: string;
  page?: number | null;
};

export const NOTE_CATEGORIES: NoteCategory[] = [
  "Questions",
  "Facts",
  "Quotes",
  "Synthesis",
];
