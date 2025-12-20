import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import type { BookStatus } from "../../../modules/books/types";
import { styles } from "../styles";
import BookCard from "./BookCard";

interface Book {
  id: number;
  title: string;
  author: string;
  img?: string;
  isbn?: string | null;
  status?: string; // or BookStatus
}

interface Props {
  books: Book[];
  loading: boolean;
  error: string | null;
  onPressBook: (id: number) => void;
  onToggleStatus: (id: number, currentStatus: BookStatus) => void;
}

export const BookList = ({ books, loading, error, onPressBook, onToggleStatus }: Props) => {
  if (loading) {
    return (
      <View style={styles.centerRow}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  if (books.length === 0) {
    return <Text style={styles.muted}>No books saved yet.</Text>;
  }

  return (
    <View style={styles.list}>
      {books.map((book) => (
        <BookCard
          key={book.id}
          title={book.title}
          author={book.author}
          coverUrl={book.img}
          isbn={book.isbn ?? undefined}
          status={book.status}
          onPress={() => onPressBook(book.id)}
          // We wrap the toggle logic here to keep the parent clean
          onLongPress={() => onToggleStatus(book.id, (book.status as BookStatus) ?? "reading")}
        />
      ))}
    </View>
  );
};