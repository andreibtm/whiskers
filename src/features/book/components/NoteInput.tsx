import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import type { NoteCategory } from "../../../modules/books/types";
import { styles } from "../styles";

interface Props {
  categories: NoteCategory[];
  selectedCategory: NoteCategory;
  onCategorySelect: (cat: NoteCategory) => void;
  page: string;
  onPageChange: (text: string) => void;
  currentBookPage?: number;
  text: string;
  onTextChange: (text: string) => void;
  onSave: () => void;
  saving: boolean;
}

export const NoteInput = ({
  categories,
  selectedCategory,
  onCategorySelect,
  page,
  onPageChange,
  currentBookPage,
  text,
  onTextChange,
  onSave,
  saving,
}: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Add a note</Text>
      <View style={styles.chipRow}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.chip, selectedCategory === cat && styles.chipActive]}
            onPress={() => onCategorySelect(cat)}
          >
            <Text style={[styles.chipText, selectedCategory === cat && styles.chipTextActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.pageRow}>
        <Text style={styles.meta}>Page:</Text>
        <TextInput
          style={[styles.input, styles.pageInput]}
          keyboardType="numeric"
          value={page}
          onChangeText={onPageChange}
          placeholder={currentBookPage ? String(currentBookPage) : "Page #"}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Write your note"
        multiline
        value={text}
        onChangeText={onTextChange}
      />
      <TouchableOpacity
        style={styles.navButton}
        onPress={onSave}
        disabled={saving}
        activeOpacity={0.85}
      >
        <Text style={styles.navButtonText}>{saving ? "Saving…" : "Save Note"}</Text>
      </TouchableOpacity>
    </View>
  );
};