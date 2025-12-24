// Card showing the in-progress book with cover, progress bar, and resume CTA.
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useMemo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../../constants/theme";
import type { Book } from "../../../modules/books/types";
import { styles } from "../styles";

interface Props {
  currentBook: Book | null;
}

export const CurrentlyReading = ({ currentBook }: Props) => {
  const hasCover = currentBook?.img && currentBook.img !== "no-cover";

  const progressPct = useMemo(() => {
    if (!currentBook || !currentBook.pages) return 0;
    const pct = (currentBook.currentPage / currentBook.pages) * 100;
    return Math.min(100, Math.max(0, Math.round(pct)));
  }, [currentBook]);

  const pagesLabel = useMemo(() => {
    if (!currentBook) return "";
    const total = currentBook.pages || 0;
    const current = currentBook.currentPage || 0;
    if (!total) return `${current} pages read`;
    return `${current}/${total} pages`;
  }, [currentBook]);

  return (
    <View style={styles.card}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Currently Reading</Text>
        {/* Optional: Add a 'Live' pill here if you want, as seen in some designs */}
      </View>

      {currentBook ? (
        <>
          <View style={styles.bookRow}>
            {hasCover ? (
              <Image source={{ uri: currentBook?.img }} style={styles.cover} />
            ) : (
              <View style={[styles.cover, { alignItems: "center", justifyContent: "center" }]}>
                <Ionicons name="book-outline" size={28} color={COLORS.textSecondary} />
              </View>
            )}
            <View style={styles.bookMeta}>
              <View>
                <Text style={styles.bookTitle}>{currentBook.title}</Text>
                <Text style={styles.bookAuthor}>{currentBook.author}</Text>
              </View>
              <View style={{ gap: 6 }}>
                <View style={styles.progressShell}>
                  <View style={[styles.progressFill, { width: `${progressPct}%` }]} />
                </View>
                <View style={styles.progressRow}>
                  <Text style={styles.progressLabel}>{progressPct}% Complete</Text>
                  <Text style={styles.progressMuted}>{pagesLabel}</Text>
                </View>
              </View>
            </View>
          </View>

          <Link href={`/book/${currentBook.id}`} asChild>
            <TouchableOpacity style={styles.cta}>
              <Text style={styles.ctaText}>Resume Reading</Text>
            </TouchableOpacity>
          </Link>
        </>
      ) : (
        <>
          <Text style={styles.emptyState}>No book in progress yet.</Text>
          <Link href="/search" asChild>
            <TouchableOpacity style={styles.cta}>
              <Text style={styles.ctaText}>Find your first book</Text>
            </TouchableOpacity>
          </Link>
        </>
      )}
    </View>
  );
};