import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../../constants/theme";
import type { NoteCategory } from "../../../modules/books/types";
import { styles } from "../styles";

// Define the shape of a Note based on logic.ts usage
interface Note {
  id: number;
  content: string;
  createdAt: string;
  category: NoteCategory;
  page?: number | null;
}

interface Props {
  notes: Note[];
  categories: NoteCategory[];
  filter: NoteCategory | "All";
  onFilterChange: (cat: NoteCategory | "All") => void;
  editingId: number | null;
  editingText: string;
  setEditingText: (text: string) => void;
  editingCategory: NoteCategory;
  setEditingCategory: (cat: NoteCategory) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onStartEdit: (id: number, content: string) => void;
  onDelete: (id: number) => void;
  saving: boolean;
}

export const NoteList = ({
  notes,
  categories,
  filter,
  onFilterChange,
  editingId,
  editingText,
  setEditingText,
  editingCategory,
  setEditingCategory,
  onSaveEdit,
  onCancelEdit,
  onStartEdit,
  onDelete,
  saving,
}: Props) => {
  return (
    <View style={styles.card}>
      <View style={styles.notesHeader}>
        <Text style={styles.sectionTitle}>Notes</Text>
        <View style={styles.chipRow}>
          {(["All", ...categories] as (NoteCategory | "All")[]).map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.chipSmall, filter === cat && styles.chipActive]}
              onPress={() => onFilterChange(cat)}
            >
              <Text style={[styles.chipText, filter === cat && styles.chipTextActive]}>{cat}</Text>
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
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[styles.chip, editingCategory === cat && styles.chipActive]}
                    onPress={() => setEditingCategory(cat)}
                  >
                    <Text style={[styles.chipText, editingCategory === cat && styles.chipTextActive]}>
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.noteActions}>
                <TouchableOpacity
                  style={styles.navButton}
                  onPress={onSaveEdit}
                  disabled={saving}
                  activeOpacity={0.85}
                >
                  <Text style={styles.navButtonText}>{saving ? "Saving…" : "Save"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.navButton, styles.ghostButton]}
                  onPress={onCancelEdit}
                  activeOpacity={0.85}
                >
                  <Text style={[styles.navButtonText, styles.navButtonTextGhost]}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <View style={styles.noteMetaRow}>
                <View
                  style={[
                    styles.noteDot,
                    {
                      backgroundColor:
                        note.category === "Questions"
                          ? COLORS.categories.question
                          : note.category === "Facts"
                          ? COLORS.categories.fact
                          : note.category === "Quotes"
                          ? COLORS.categories.quote
                          : COLORS.categories.synthesis,
                    },
                  ]}
                />
                <Text style={styles.noteBadge}>{note.category}</Text>
              </View>
              <Text style={styles.noteText}>{note.content}</Text>
              <Text style={styles.noteDate}>
                {note.page != null ? `Pg ${note.page} • ` : ""}
                {note.createdAt}
              </Text>
              <View style={styles.noteActions}>
                <TouchableOpacity onPress={() => onStartEdit(note.id, note.content)}>
                  <Text style={styles.action}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDelete(note.id)}>
                  <Text style={[styles.action, styles.danger]}>Delete</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      ))}
    </View>
  );
};