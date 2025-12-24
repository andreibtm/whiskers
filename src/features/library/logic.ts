// Hook that loads books, filters by status, and wires navigation for the Library tab.
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { updateBookStatus } from "../../modules/books/book.service";
import type { BookStatus } from "../../modules/books/types";
import { useBooks } from "../../modules/books/useBooks";

export const useLibraryScreen = () => {
  const { books, loading, error, load } = useBooks();
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<BookStatus | "all">("reading");

  useEffect(() => {
    load();
  }, [load]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const handlePressBook = useCallback(
    (id: number) => {
      router.push(`/book/${id}`);
    },
    [router]
  );

  const handleToggleStatus = useCallback(async (id: number, currentStatus: BookStatus) => {
    if (currentStatus === "finished") return;
    const nextStatus: BookStatus = currentStatus === "paused" ? "reading" : "paused";
    try {
      await updateBookStatus(id, nextStatus);
      await load();
    } catch (error) {
      console.error(error);
    }
  }, [load]);

  const filteredBooks = useMemo(() => {
    if (statusFilter === "all") return books;
    return books.filter((b) => b.status === statusFilter);
  }, [books, statusFilter]);

  return { books: filteredBooks, loading, error, handlePressBook, handleToggleStatus, statusFilter, setStatusFilter };
};
