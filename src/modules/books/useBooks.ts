import { useCallback, useState } from "react";
import { getBooks } from "./book.service";
import type { Book } from "./types";

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const rows = await getBooks();
      setBooks(rows);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      setError("Could not load library");
    } finally {
      setLoading(false);
    }
  }, []);

  return { books, loading, error, load };
};
