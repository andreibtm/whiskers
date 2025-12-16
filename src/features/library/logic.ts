import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect } from "react";
import { useBooks } from "../../modules/books/useBooks";

export const useLibraryScreen = () => {
  const { books, loading, error, load } = useBooks();
  const router = useRouter();

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

  return { books, loading, error, handlePressBook };
};
