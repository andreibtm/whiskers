import { Link } from "expo-router";
import React from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Kbook from "../components/Kbook";
import { useLibraryScreen } from "../features/library/logic";
import { styles } from "../features/library/styles";

export default function Library() {
  const { books, loading, error, handlePressBook, handleToggleStatus, statusFilter, setStatusFilter } = useLibraryScreen();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Link href="/" style={styles.back}>
          ← Back to Home
        </Link>
        <Text style={styles.title}>Your Library</Text>

        <View style={styles.filterRow}>
          {["reading", "paused", "finished", "all"].map((state) => (
            <TouchableOpacity
              key={state}
              style={[styles.filterChip, statusFilter === state && styles.filterChipActive]}
              onPress={() => setStatusFilter(state as any)}
            >
              <Text style={[styles.filterChipText, statusFilter === state && styles.filterChipTextActive]}>
                {state === "all" ? "All" : state.charAt(0).toUpperCase() + state.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

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
          books.map((book: { id: number; title: string; author: string; img?: string; isbn?: string | null; status?: string }) => (
            <Kbook
              key={book.id}
              title={book.title}
              author={book.author}
              coverUrl={book.img}
              isbn={book.isbn ?? undefined}
              status={book.status}
              onPress={() => handlePressBook(book.id)}
              onLongPress={() => handleToggleStatus(book.id, (book.status as any) ?? "reading")}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}
