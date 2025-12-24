// Hook behind the book detail screen: loads book + notes, manages filters, and syncs progress/status.
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";
import {
    addNoteForBook,
    deleteNoteById,
    getBookById,
    getNotesByBookId,
    updateBookProgress,
    updateBookStatus,
    updateNoteContent,
} from "../../modules/books/book.service";
import { NOTE_CATEGORIES, type BookStatus, type NoteCategory } from "../../modules/books/types";

export type BookWithOptionalMeta = {
  id: number;
  isbn: string | null;
  title: string;
  author: string;
  img?: string;
  pages?: number;
  currentPage?: number;
  status?: BookStatus;
};

export const useBookDetails = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const bookId = id ? Number(id) : NaN;

  const [book, setBook] = useState<BookWithOptionalMeta | null>(null);
  const [notes, setNotes] = useState<{ id: number; content: string; createdAt: string; category: NoteCategory; page?: number | null }[]>([]);
  const [noteText, setNoteText] = useState("");
  const [noteCategory, setNoteCategory] = useState<NoteCategory>("Synthesis");
  const [noteFilter, setNoteFilter] = useState<NoteCategory | "All">("All");
  const [notePage, setNotePage] = useState("");
  const [pageIncrement, setPageIncrement] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");
  const [editingCategory, setEditingCategory] = useState<NoteCategory>("Synthesis");
  const [error, setError] = useState<string | null>(null);

  const categories = NOTE_CATEGORIES;

  // Fetch book metadata and its notes; optionally filter by category.
  const loadData = useCallback(
    async (categoryFilter?: NoteCategory | "All") => {
      if (!bookId) return;
      setLoading(true);
      setError(null);
      try {
        const bookRows = await getBookById(bookId);
        setBook(bookRows[0] ?? null);
        const loadedBook = bookRows[0];
        if (loadedBook && (loadedBook.currentPage ?? 0) >= 0) {
          setPageIncrement("");
          setNotePage(String(loadedBook.currentPage ?? ""));
        }
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
      // Keep details in sync when returning from other screens (e.g., edit view).
      loadData(noteFilter);
    }, [noteFilter, loadData])
  );

  // Create a new note against the current book and refresh the list.
  const handleAddNote = useCallback(async () => {
    if (!bookId || !noteText.trim()) return;
    const parsedPage = notePage.trim() ? Number(notePage) : book?.currentPage ?? null;
    const safePage = Number.isFinite(parsedPage as number) ? Number(parsedPage) : null;
    setSaving(true);
    setError(null);
    try {
      await addNoteForBook(bookId, noteText.trim(), noteCategory, safePage ?? null);
      setNoteText("");
      if (book?.currentPage !== undefined) {
        setNotePage(String(book.currentPage ?? ""));
      }
      await loadData(noteFilter);
    } catch (error) {
      console.error(error);
      setError("Could not save note");
    } finally {
      setSaving(false);
    }
  }, [bookId, noteText, noteCategory, notePage, book?.currentPage, loadData, noteFilter]);

  // Persist a new current page, adjust status when finishing, and reload state.
  const handleUpdateProgress = useCallback(async () => {
    if (!bookId || !pageIncrement.trim()) return;
    const targetPage = Number(pageIncrement);
    if (Number.isNaN(targetPage)) return;
    const total = book?.pages ?? 0;
    const next = Math.max(0, total ? Math.min(targetPage, total) : targetPage);
    setSaving(true);
    setError(null);
    try {
      await updateBookProgress(bookId, next);
      setPageIncrement(String(next));
      if (book) {
        const statusToSet: BookStatus | null = total > 0 && next >= total ? "finished" : book.status === "paused" ? "reading" : null;
        if (statusToSet === "finished" && book.status !== "finished") {
          Alert.alert("Finished?", "Did you finish this book?", [
            { text: "Not yet" },
            { text: "Yes", onPress: async () => { await updateBookStatus(bookId, "finished"); await loadData(noteFilter); } }
          ]);
        } else if (statusToSet === "reading" && book.status === "paused") {
          await updateBookStatus(bookId, "reading");
        }
      }
      await loadData(noteFilter);
    } catch (error) {
      console.error(error);
      setError("Could not update progress");
    } finally {
      setSaving(false);
    }
  }, [bookId, pageIncrement, book, loadData, noteFilter]);

  // Enter inline edit mode for a note.
  const startEdit = useCallback(
    (id: number, content: string) => {
      setEditingId(id);
      setEditingText(content);
      const note = notes.find((n) => n.id === id);
      if (note) setEditingCategory(note.category);
    },
    [notes]
  );

  // Exit edit mode and clear edit buffers.
  const cancelEdit = useCallback(() => {
    setEditingId(null);
    setEditingText("");
    setEditingCategory("Synthesis");
  }, []);

  // Save edits to a note then reload filtered notes.
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

  // Delete a note and refresh; also exit edit mode if needed.
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
    notePage,
    setNotePage,
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
