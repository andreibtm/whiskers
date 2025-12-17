import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { fetchBooks } from "../../modules/api/fetchBooks";
import { addBook } from "../../modules/books/book.service";

export type RemoteBook = {
  isbn: string;
  title: string;
  authors: string;
  coverUrl: string;
  source: string;
  pages?: number;
};

export const useIsbnSearch = () => {
  const { isbn: isbnParam } = useLocalSearchParams<{ isbn?: string }>();

  const [isbn, setIsbn] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [book, setBook] = useState<RemoteBook | null>(null);

  const handleFetch = async (incomingIsbn?: string | number | null) => {
    const incoming =
      typeof incomingIsbn === "string"
        ? incomingIsbn
        : typeof incomingIsbn === "number"
          ? String(incomingIsbn)
          : "";
    const targetIsbn = (incoming || isbn || "").trim();
    if (!targetIsbn) {
      setError("Enter an ISBN to search");
      return;
    }

    setError(null);
    setSaveMessage(null);
    setBook(null);
    setLoading(true);

    try {
      const result = await fetchBooks(targetIsbn);
      if (!result) {
        setError("No book found for that ISBN");
      }
      setBook(result);
    } catch (error) {
      console.error(error);
      setError("Something went wrong while fetching the book");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof isbnParam === "string") {
      const normalized = isbnParam.trim();
      if (normalized && normalized !== isbn) {
        setIsbn(normalized);
        handleFetch(normalized);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isbnParam]);

  const handleSave = async () => {
    if (!book) return;
    setSaving(true);
    setError(null);
    setSaveMessage(null);
    try {
      const safeAuthor = book.authors?.trim() || "Unknown";
      const safeCover = book.coverUrl?.trim() || "no-cover";
      const result = await addBook({
        isbn: book.isbn,
        title: book.title,
        author: safeAuthor,
        img: safeCover,
        pages: book.pages ?? 0,
        currentPage: 0,
      });
      if (result.status === "duplicate") {
        setError("This ISBN is already saved");
      } else {
        setSaveMessage("Saved to library");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not save this book";
      if (message.includes("NOT NULL")) {
        setError("Missing required book fields");
      } else {
        setError("Could not save this book");
      }
    } finally {
      setSaving(false);
    }
  };

  return {
    isbn,
    setIsbn,
    loading,
    error,
    saveMessage,
    saving,
    book,
    handleFetch,
    handleSave,
  };
};
