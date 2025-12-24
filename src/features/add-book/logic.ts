// State and handlers for the manual add-book form, including prefill from scanner params.
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { addBook } from "../../modules/books/book.service";

export const useAddBook = () => {
  const router = useRouter();
  const { isbn: scannedIsbn, title: titleParam, author: authorParam, pages: pagesParam, img: imgParam } =
    useLocalSearchParams<{ isbn?: string; title?: string; author?: string; pages?: string; img?: string }>();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [isbn, setIsbn] = useState("");
  const [img, setImg] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // Seed the ISBN field when returning from the camera scanner.
  useEffect(() => {
    if (typeof scannedIsbn === "string" && scannedIsbn.trim()) {
      setIsbn(scannedIsbn.trim());
    }
  }, [scannedIsbn]);

  useEffect(() => {
    if (typeof titleParam === "string" && titleParam.length) {
      setTitle(titleParam);
    }
    if (typeof authorParam === "string" && authorParam.length) {
      setAuthor(authorParam);
    }
    if (typeof pagesParam === "string" && pagesParam.length) {
      setPages(pagesParam);
    }
    if (typeof imgParam === "string" && imgParam.length) {
      setImg(imgParam);
    }
  }, [titleParam, authorParam, pagesParam, imgParam]);

  const pickImage = async () => {
    // Let the user pick/trim a cover; we keep the resulting URI in local state.
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
    });
    if (!result.canceled) {
      setImg(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    // Validate required fields, normalize values, and attempt to insert; surface duplicate ISBNs.
    if (!title.trim() || !author.trim()) {
      setError("Title and author are required");
      return;
    }
    const parsedPages = Number(pages) || 0;
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const result = await addBook({
        title: title.trim(),
        author: author.trim(),
        img: img ?? "no-cover",
        isbn: isbn.trim() || null,
        pages: parsedPages,
        currentPage: 0,
      });
      if (result.status === "duplicate") {
        setError("A book with that ISBN is already in your library");
      } else {
        setMessage("Book added");
        router.push("/library");
      }
    } catch (error) {
      console.error(error);
      setError("Could not save book");
    } finally {
      setSaving(false);
    }
  };

  const goToScanner = () => {
    // Jump to the camera while preserving current form state so it can be restored on return.
    router.push({
      pathname: "/camera",
      params: {
        returnTo: "/add-book",
        title,
        author,
        pages,
        img: img ?? undefined,
        isbn,
      },
    });
  };

  return {
    title,
    setTitle,
    author,
    setAuthor,
    pages,
    setPages,
    isbn,
    setIsbn,
    img,
    saving,
    error,
    message,
    pickImage,
    handleSave,
    goToScanner,
  };
};
