import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import type { RemoteBook } from "../logic"; // Ensure RemoteBook is exported from logic.ts
import { styles } from "../styles";

interface Props {
  book: RemoteBook;
  saving: boolean;
  onSave: () => void;
}

export const SearchResult = ({ book, saving, onSave }: Props) => {
  return (
    <View style={styles.bookCard}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Found book</Text>
        <View style={styles.sourcePill}>
          <Text style={styles.sourceText}>{book.source}</Text>
        </View>
      </View>

      <View style={styles.bookRow}>
        {book.coverUrl ? (
          <Image source={{ uri: book.coverUrl }} style={styles.coverLarge} resizeMode="cover" />
        ) : (
          <View style={[styles.coverLarge, styles.coverPlaceholder]}>
            <Text style={styles.placeholder}>No cover</Text>
          </View>
        )}

        <View style={styles.bookMeta}>
          <Text style={styles.bookTitle}>{book.title}</Text>
          <Text style={styles.bookAuthor}>{book.authors}</Text>
          <Text style={styles.bookIsbn}>ISBN {book.isbn}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.navButton} onPress={onSave} disabled={saving} activeOpacity={0.85}>
        <Text style={styles.navButtonText}>{saving ? "Saving…" : "Add to Library"}</Text>
      </TouchableOpacity>
    </View>
  );
};