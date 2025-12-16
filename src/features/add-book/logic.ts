import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { addBook } from "../../modules/books/book.service";

export const useAddBook = () => {
  const router = useRouter();
  const { isbn: scannedIsbn } = useLocalSearchParams<{ isbn?: string }>();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [isbn, setIsbn] = useState("");
  const [img, setImg] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof scannedIsbn === "string" && scannedIsbn.trim()) {
      setIsbn(scannedIsbn.trim());
    }
  }, [scannedIsbn]);

  const pickImage = async () => {
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
    if (!title.trim() || !author.trim()) {
      setError("Title and author are required");
      return;
    }
    const parsedPages = Number(pages) || 0;
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      await addBook({
        title: title.trim(),
        author: author.trim(),
        img: img ?? "no-cover",
        isbn: isbn.trim() || null,
        pages: parsedPages,
        currentPage: 0,
      });
      setMessage("Book added");
      router.push("/library");
    } catch (error) {
      console.error(error);
      setError("Could not save book");
    } finally {
      setSaving(false);
    }
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
  };
};
