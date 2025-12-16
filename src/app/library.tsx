import { Link } from "expo-router";
import React from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, Text, View } from "react-native";
import Kbook from "../components/Kbook";
import { useLibraryScreen } from "../features/library/logic";
import { styles } from "../features/library/styles";

export default function Library() {
  const { books, loading, error, handlePressBook } = useLibraryScreen();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Link href="/" style={styles.back}>
          ← Back to Search
        </Link>
        <Text style={styles.title}>Your Library</Text>

        {loading && (
          <View style={styles.centerRow}>
            <ActivityIndicator />
          </View>
        )}

        {error && <Text style={styles.error}>{error}</Text>}

        {!loading && !error && books.length === 0 && (
          <Text style={styles.muted}>No books saved yet.</Text>
        )}

        {!loading && !error &&
          books.map((book: { id: number; title: string; author: string; img?: string; isbn?: string | null }) => (
            <Kbook
              key={book.id}
              title={book.title}
              author={book.author}
              coverUrl={book.img}
              isbn={book.isbn ?? undefined}
              onPress={() => handlePressBook(book.id)}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}
