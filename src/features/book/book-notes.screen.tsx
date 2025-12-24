// Dedicated notes workspace with filters and a floating composer anchored above the keyboard.
import { Link } from "expo-router";
import React from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { NoteList } from "./components/NoteList";
import { useBookDetails } from "./logic";
import { styles } from "./styles";

export default function BookNotesScreen() {
  const insets = useSafeAreaInsets();
  const [showComposer, setShowComposer] = React.useState(false);
  const noteBodyRef = React.useRef<TextInput | null>(null);
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
    handleAddNote,
    editingId,
    editingText,
    setEditingText,
    editingCategory,
    setEditingCategory,
    handleUpdateNote,
    cancelEdit,
    startEdit,
    handleDeleteNote,
  } = useBookDetails();

  const openComposer = () => {
    setShowComposer(true);
    setTimeout(() => noteBodyRef.current?.focus(), 80);
  };

  const closeComposer = () => {
    setShowComposer(false);
  };

  if (!bookId || Number.isNaN(bookId)) {
    return (
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <View style={styles.center}>
          <Text>Invalid book id.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={styles.detailHeaderRow}>
        <Link href={`/book/${bookId}`} style={styles.detailBack}>
          ← Back
        </Link>
        <Text style={styles.sectionTitle}>Notes</Text>
        {/* Spacer to balance header layout. */}
        <View style={{ width: 44 }} />
      </View>

      {loading && (
        <View style={styles.center}>
          <ActivityIndicator />
        </View>
      )}

      {error && <Text style={styles.error}>{error}</Text>}

      <ScrollView contentContainerStyle={[styles.content, styles.notesContent]}>
        {book ? (
          <View style={styles.detailTitleBlock}>
            <Text style={styles.detailTitle}>{book.title}</Text>
            <Text style={styles.detailAuthor}>{book.author}</Text>
          </View>
        ) : null}

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
      </ScrollView>

      {!showComposer ? (
        <View style={[styles.floatingComposer, { bottom: insets.bottom + 8 }]}> 
          <TouchableOpacity style={styles.navButton} onPress={openComposer}>
            <Text style={styles.navButtonText}>Add Note</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <KeyboardAvoidingView
          style={[styles.floatingComposer, { bottom: insets.bottom + 8 }]}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? insets.top + 60 : 0}
        >
          <View style={[styles.floatingCard, styles.floatingShadow]}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Add a note</Text>
              <TouchableOpacity onPress={closeComposer}>
                <Text style={styles.navButtonTextGhost}>Close</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.chipRow}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.chip, noteCategory === cat && styles.chipActive]}
                  onPress={() => setNoteCategory(cat)}
                >
                  <Text style={[styles.chipText, noteCategory === cat && styles.chipTextActive]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.pageRow}>
              <Text style={styles.meta}>Page:</Text>
              <TextInput
                style={[styles.input, styles.inputCompact, styles.pageInput]}
                keyboardType="numeric"
                value={notePage}
                onChangeText={setNotePage}
                placeholder={book?.currentPage ? String(book.currentPage) : "Page #"}
              />
            </View>

            <TextInput
              ref={noteBodyRef}
              style={[styles.input, styles.noteInput]}
              placeholder="Write your note"
              multiline
              value={noteText}
              onChangeText={setNoteText}
            />

            <TouchableOpacity
              style={styles.navButton}
              onPress={async () => {
                await handleAddNote();
                closeComposer();
              }}
              disabled={saving}
              activeOpacity={0.85}
            >
              <Text style={styles.navButtonText}>{saving ? "Saving…" : "Save Note"}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
}
