import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  addNoteForBook,
  deleteNoteById,
  getBookById,
  getNotesByBookId,
  updateBookProgress,
  updateNoteContent,
} from "../../modules/books/book.service";
import { NOTE_CATEGORIES, type NoteCategory } from "../../modules/books/types";

export type BookWithOptionalMeta = {
  id: number;
  isbn: string | null;
  title: string;
  author: string;
  img?: string;
  pages?: number;
  currentPage?: number;
};

export const useBookDetails = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const bookId = id ? Number(id) : NaN;

  const [book, setBook] = useState<BookWithOptionalMeta | null>(null);
  const [notes, setNotes] = useState<{ id: number; content: string; createdAt: string; category: NoteCategory }[]>([]);
  const [noteText, setNoteText] = useState("");
  const [noteCategory, setNoteCategory] = useState<NoteCategory>("Synthesis");
  const [noteFilter, setNoteFilter] = useState<NoteCategory | "All">("All");
  const [pageIncrement, setPageIncrement] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");
  const [editingCategory, setEditingCategory] = useState<NoteCategory>("Synthesis");
  const [error, setError] = useState<string | null>(null);

  const categories = NOTE_CATEGORIES;

  const loadData = useCallback(
    async (categoryFilter?: NoteCategory | "All") => {
      if (!bookId) return;
      setLoading(true);
      setError(null);
      try {
        const bookRows = await getBookById(bookId);
        setBook(bookRows[0] ?? null);
        const noteRows = await getNotesByBookId(
          bookId,
          categoryFilter && categoryFilter !== "All" ? categoryFilter : undefined
        );
        setNotes(noteRows as any);
      } catch (error) {
        console.error(error);
        setError("Could not load book");
      } finally {
        setLoading(false);
      }
    },
    [bookId]
  );

  useEffect(() => {
    loadData(noteFilter);
  }, [bookId, noteFilter, loadData]);

  useFocusEffect(
    useCallback(() => {
      loadData(noteFilter);
    }, [noteFilter, loadData])
  );

  const handleAddNote = useCallback(async () => {
    if (!bookId || !noteText.trim()) return;
    setSaving(true);
    setError(null);
    try {
      await addNoteForBook(bookId, noteText.trim(), noteCategory);
      setNoteText("");
      await loadData(noteFilter);
    } catch (error) {
      console.error(error);
      setError("Could not save note");
    } finally {
      setSaving(false);
    }
  }, [bookId, noteText, noteCategory, loadData, noteFilter]);

  const handleUpdateProgress = useCallback(async () => {
    if (!bookId || !pageIncrement.trim()) return;
    const delta = Number(pageIncrement);
    if (Number.isNaN(delta)) return;
    const current = book?.currentPage ?? 0;
    const total = book?.pages ?? 0;
    const next = Math.max(0, total ? Math.min(current + delta, total) : current + delta);
    setSaving(true);
    setError(null);
    try {
      await updateBookProgress(bookId, next);
      setPageIncrement("");
      await loadData(noteFilter);
    } catch (error) {
      console.error(error);
      setError("Could not update progress");
    } finally {
      setSaving(false);
    }
  }, [bookId, pageIncrement, book?.currentPage, book?.pages, loadData, noteFilter]);

  const startEdit = useCallback(
    (id: number, content: string) => {
      setEditingId(id);
      setEditingText(content);
      const note = notes.find((n) => n.id === id);
      if (note) setEditingCategory(note.category);
    },
    [notes]
  );

  const cancelEdit = useCallback(() => {
    setEditingId(null);
    setEditingText("");
    setEditingCategory("Synthesis");
  }, []);

  const handleUpdateNote = useCallback(async () => {
    if (!editingId || !editingText.trim()) return;
    setSaving(true);
    setError(null);
    try {
      await updateNoteContent(editingId, editingText.trim(), editingCategory);
      cancelEdit();
      await loadData(noteFilter);
    } catch (error) {
      console.error(error);
      setError("Could not update note");
    } finally {
      setSaving(false);
    }
  }, [editingId, editingText, editingCategory, cancelEdit, loadData, noteFilter]);

  const handleDeleteNote = useCallback(
    async (noteId: number) => {
      setSaving(true);
      setError(null);
      try {
        await deleteNoteById(noteId);
        if (editingId === noteId) {
          cancelEdit();
        }
        await loadData(noteFilter);
      } catch (error) {
        console.error(error);
        setError("Could not delete note");
      } finally {
        setSaving(false);
      }
    },
    [editingId, cancelEdit, loadData, noteFilter]
  );

  const progressPct = useMemo(() => {
    return Math.min(
      100,
      Math.max(0, book?.pages && book.pages > 0 ? ((book?.currentPage ?? 0) / book.pages) * 100 : 0)
    );
  }, [book?.pages, book?.currentPage]);

  return {
    bookId,
    book,
    notes,
    categories,
    loading,
    saving,
    error,
    noteText,
    setNoteText,
    noteCategory,
    setNoteCategory,
    noteFilter,
    setNoteFilter,
    pageIncrement,
    setPageIncrement,
    editingId,
    editingText,
    setEditingText,
    editingCategory,
    setEditingCategory,
    progressPct,
    handleAddNote,
    handleUpdateProgress,
    startEdit,
    cancelEdit,
    handleUpdateNote,
    handleDeleteNote,
  };
};
