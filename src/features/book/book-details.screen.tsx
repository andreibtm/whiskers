import { Link } from "expo-router";
import React from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBookDetails } from "./logic";
import { styles } from "./styles";

// Import new components
import { BookHeader } from "./components/BookHeader";
import { NoteInput } from "./components/NoteInput";
import { NoteList } from "./components/NoteList";
import { ReadingProgress } from "./components/ReadingProgress";

export default function BookDetailsScreen() {
  const {
    bookId,
    book,
    notes,
    categories,
    loading,
    saving,
    error,
    noteText,
    setNoteText,
    noteCategory,
    setNoteCategory,
    noteFilter,
    setNoteFilter,
    notePage,
    setNotePage,
    pageIncrement,
    setPageIncrement,
    editingId,
    editingText,
    setEditingText,
    editingCategory,
    setEditingCategory,
    progressPct,
    handleAddNote,
    handleUpdateProgress,
    startEdit,
    cancelEdit,
    handleUpdateNote,
    handleDeleteNote,
  } = useBookDetails();

  if (!bookId || Number.isNaN(bookId)) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text>Invalid book id.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Link href="/library" style={styles.back}>
          ← Back to Library
        </Link>

        {loading && (
          <View style={styles.center}>
            <ActivityIndicator />
          </View>
        )}

        {error && <Text style={styles.error}>{error}</Text>}

        {book && (
          <>
            <BookHeader book={book} />

            <ReadingProgress
              progressPct={progressPct}
              currentPage={book.currentPage ?? 0}
              totalPages={book.pages}
              pageIncrement={pageIncrement}
              saving={saving}
              onPageChange={setPageIncrement}
              onUpdate={handleUpdateProgress}
            />

            <NoteInput
              categories={categories}
              selectedCategory={noteCategory}
              onCategorySelect={setNoteCategory}
              page={notePage}
              onPageChange={setNotePage}
              currentBookPage={book.currentPage}
              text={noteText}
              onTextChange={setNoteText}
              onSave={handleAddNote}
              saving={saving}
            />

            <NoteList
              notes={notes}
              categories={categories}
              filter={noteFilter}
              onFilterChange={setNoteFilter}
              editingId={editingId}
              editingText={editingText}
              setEditingText={setEditingText}
              editingCategory={editingCategory}
              setEditingCategory={setEditingCategory}
              onSaveEdit={handleUpdateNote}
              onCancelEdit={cancelEdit}
              onStartEdit={startEdit}
              onDelete={handleDeleteNote}
              saving={saving}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}