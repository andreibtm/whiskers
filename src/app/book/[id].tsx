import { Link } from "expo-router";
import React from "react";
import { ActivityIndicator, Button, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useBookDetails } from "../../features/book/logic";
import { styles } from "../../features/book/styles";
import { type NoteCategory } from "../../modules/books/types";

export default function BookDetails() {
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
          <View style={styles.card}>
            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.subtitle}>{book.author}</Text>
            {book.isbn ? <Text style={styles.meta}>ISBN: {book.isbn}</Text> : null}
            {typeof book.pages === "number" && book.pages > 0 ? (
              <Text style={styles.meta}>Pages: {book.pages}</Text>
            ) : null}
            <Link href={`/book/edit/${book.id}`} style={styles.editLink}>
              Edit book →
            </Link>
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Reading Progress</Text>
          <View style={styles.progressBarShell}>
            <View style={[styles.progressBarFill, { width: `${progressPct}%` }]} />
          </View>
          <Text style={styles.meta}>
            Pages read: {book?.currentPage ?? 0}
            {book?.pages ? ` / ${book.pages}` : " (total unknown)"}
          </Text>
          <View style={styles.progressRow}>
            <TextInput
              style={[styles.input, styles.progressInput]}
              placeholder="Pages read"
              keyboardType="numeric"
              value={pageIncrement}
              onChangeText={setPageIncrement}
            />
            <Button title={saving ? "Saving..." : "Add"} onPress={handleUpdateProgress} disabled={saving} />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Add a note</Text>
          <View style={styles.chipRow}>
            {categories.map((cat: NoteCategory) => (
              <TouchableOpacity
                key={cat}
                style={[styles.chip, noteCategory === cat && styles.chipActive]}
                onPress={() => setNoteCategory(cat)}
              >
                <Text style={[styles.chipText, noteCategory === cat && styles.chipTextActive]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={styles.input}
            placeholder="Write your note"
            multiline
            value={noteText}
            onChangeText={setNoteText}
          />
          <Button title={saving ? "Saving..." : "Save Note"} onPress={handleAddNote} disabled={saving} />
        </View>

        <View style={styles.card}>
          <View style={styles.notesHeader}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <View style={styles.chipRow}>
              {(["All", ...categories] as (NoteCategory | "All")[]).map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.chipSmall, noteFilter === cat && styles.chipActive]}
                  onPress={() => setNoteFilter(cat)}
                >
                  <Text style={[styles.chipText, noteFilter === cat && styles.chipTextActive]}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {notes.length === 0 && <Text style={styles.muted}>No notes yet.</Text>}
          {notes.map((note) => (
            <View key={note.id} style={styles.noteItem}>
              {editingId === note.id ? (
                <>
                  <TextInput
                    style={[styles.input, styles.noteInput]}
                    multiline
                    value={editingText}
                    onChangeText={setEditingText}
                  />
                  <View style={styles.chipRow}>
                    {categories.map((cat: NoteCategory) => (
                      <TouchableOpacity
                        key={cat}
                        style={[styles.chip, editingCategory === cat && styles.chipActive]}
                        onPress={() => setEditingCategory(cat)}
                      >
                        <Text style={[styles.chipText, editingCategory === cat && styles.chipTextActive]}>{cat}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <View style={styles.noteActions}>
                    <Button title={saving ? "Saving..." : "Save"} onPress={handleUpdateNote} disabled={saving} />
                    <Button title="Cancel" onPress={cancelEdit} color="#6b7280" />
                  </View>
                </>
              ) : (
                <>
                  <Text style={styles.noteText}>{note.content}</Text>
                  <Text style={styles.noteBadge}>{note.category}</Text>
                  <Text style={styles.noteDate}>{note.createdAt}</Text>
                  <View style={styles.noteActions}>
                    <TouchableOpacity onPress={() => startEdit(note.id, note.content)}>
                      <Text style={styles.action}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDeleteNote(note.id)}>
                      <Text style={[styles.action, styles.danger]}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

