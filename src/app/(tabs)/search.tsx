import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useMemo } from "react";
import { ActivityIndicator, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/theme";
import { useIsbnSearch } from "../../features/index/logic";
import { styles } from "../../features/index/styles";

export default function Search() {
  const { isbn, setIsbn, loading, error, saveMessage, saving, book, handleFetch, handleSave } = useIsbnSearch();

  const sampleIsbns = useMemo(() => ["9780143127796", "9780385547345"], []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Scout a Book</Text>
        <Text style={styles.subtitle}>Search by ISBN, scan a barcode, or add it yourself. We’ll pull cover, author, and source automatically.</Text>

        <View style={styles.cardPrimary}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Search by ISBN</Text>
            <Link href="/camera" asChild>
              <TouchableOpacity style={styles.headerIcon} activeOpacity={0.85}>
                <Ionicons name="camera" size={18} color={COLORS.accent} />
              </TouchableOpacity>
            </Link>
          </View>

          <Text style={styles.label}>ISBN</Text>
          <View style={styles.inputRow}>
            <View style={[styles.inputShell, styles.inputFlex]}>
              <TextInput
                value={isbn}
                onChangeText={setIsbn}
                placeholder="9780143127796"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={13}
                style={styles.input}
                placeholderTextColor={COLORS.textSecondary}
                returnKeyType="search"
                onSubmitEditing={() => handleFetch()}
              />
            </View>
            {isbn ? (
              <TouchableOpacity style={styles.clearBtn} onPress={() => setIsbn("")} accessibilityRole="button">
                <Text style={styles.clearText}>Clear</Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <Text style={styles.helper}>Tip: Paste an ISBN or scan it directly.</Text>

          <View style={styles.chipRow}>
            {sampleIsbns.map((sample) => (
              <TouchableOpacity
                key={sample}
                style={styles.chip}
                onPress={() => {
                  setIsbn(sample);
                  handleFetch(sample);
                }}
                activeOpacity={0.85}
              >
                <Text style={styles.chipText}>{sample}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.statusRow}>
            {loading && <ActivityIndicator />}
            {error && <Text style={styles.error}>{error}</Text>}
            {saveMessage && <Text style={styles.success}>{saveMessage}</Text>}
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.navButton, { flex: 1 }]} onPress={() => handleFetch()} disabled={loading} activeOpacity={0.85}>
              <Text style={styles.navButtonText}>{loading ? "Fetching…" : "Fetch details"}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {book && (
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

            <TouchableOpacity style={styles.navButton} onPress={handleSave} disabled={saving} activeOpacity={0.85}>
              <Text style={styles.navButtonText}>{saving ? "Saving…" : "Add to Library"}</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.tipCard}>
          <Text style={styles.sectionTitle}>Trouble finding it?</Text>
          <Text style={styles.helper}>Try a different ISBN (10/13), or add it yourself.</Text>
          <Link href="/add-book" asChild>
            <TouchableOpacity>
              <Text style={[styles.navButtonText, styles.linkInline]}>Add manually →</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
