export type NoteCategory = "Questions" | "Facts" | "Quotes" | "Synthesis";

export type Book = {
  id: number;
  isbn: string | null;
  title: string;
  author: string;
  img: string;
  pages: number;
  currentPage: number;
};

export type NewBookInput = {
  isbn?: string | null;
  title: string;
  author: string;
  img: string;
  pages?: number;
  currentPage?: number;
};

export type Note = {
  id: number;
  bookId: number;
  content: string;
  category: NoteCategory;
  createdAt: string;
};

export const NOTE_CATEGORIES: NoteCategory[] = [
  "Questions",
  "Facts",
  "Quotes",
  "Synthesis",
];
