// Hook for editing a book: preload fields, handle cover selection, and persist changes.
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { getBookById, updateBook } from "../../../modules/books/book.service";

export const useEditBook = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const bookId = id ? Number(id) : NaN;

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [isbn, setIsbn] = useState("");
  const [img, setImg] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!bookId) return;
      setLoading(true);
      setError(null);
      try {
        const rows = await getBookById(bookId);
        const b = rows[0];
        if (b) {
          setTitle(b.title || "");
          setAuthor(b.author || "");
          setPages((b.pages ?? 0).toString());
          setCurrentPage((b.currentPage ?? 0).toString());
          setIsbn(b.isbn ?? "");
          setImg(b.img ?? null);
        }
      } catch (error) {
        console.error(error);
        setError("Could not load book");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [bookId]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: false,
    });
    if (!result.canceled) {
      setImg(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!bookId || !title.trim() || !author.trim()) {
      setError("Title and author are required");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await updateBook(bookId, {
        title: title.trim(),
        author: author.trim(),
        img: img ?? "no-cover",
        isbn: isbn.trim() || null,
        pages: Number(pages) || 0,
        currentPage: Number(currentPage) || 0,
      });
      router.push(`/book/${bookId}`);
    } catch (error) {
      console.error(error);
      setError("Could not update book");
    } finally {
      setSaving(false);
    }
  };

  return {
    bookId,
    title,
    setTitle,
    author,
    setAuthor,
    pages,
    setPages,
    isbn,
    setIsbn,
    img,
    currentPage,
    setCurrentPage,
    loading,
    saving,
    error,
    pickImage,
    handleSave,
  };
};
