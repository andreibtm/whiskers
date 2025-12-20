import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../../constants/theme";
import { useEditBook } from "../../../features/book/edit/logic";
import { styles } from "../../../features/book/edit/styles";

export default function EditBook() {
  const {
    bookId,
    title,
    setTitle,
    author,
    setAuthor,
    pages,
    setPages,
    isbn,
    setIsbn,
    img,
    currentPage,
    setCurrentPage,
    loading,
    saving,
    error,
    pickImage,
    handleSave,
  } = useEditBook();

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
        <Link href={`/book/${bookId}`} style={styles.back}>
          ← Back to Book
        </Link>
        <Text style={styles.title}>Edit Book</Text>
        <Text style={styles.subtitle}>Update details, pages, and cover. We’ll keep everything in sync with your library.</Text>

        {loading && <Text style={styles.muted}>Loading...</Text>}
        {error && <Text style={styles.error}>{error}</Text>}
        <View style={styles.cardPrimary}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Details</Text>
          </View>

          <View style={styles.inputShell}>
            <TextInput
              style={styles.input}
              placeholder="Title"
              placeholderTextColor={COLORS.textSecondary}
              value={title}
              onChangeText={setTitle}
            />
          </View>
          <View style={styles.inputShell}>
            <TextInput
              style={styles.input}
              placeholder="Author"
              placeholderTextColor={COLORS.textSecondary}
              value={author}
              onChangeText={setAuthor}
            />
          </View>
          <View style={styles.inputShell}>
            <TextInput
              style={styles.input}
              placeholder="Pages"
              placeholderTextColor={COLORS.textSecondary}
              keyboardType="number-pad"
              value={pages}
              onChangeText={setPages}
            />
          </View>
          <View style={styles.inputShell}>
            <TextInput
              style={styles.input}
              placeholder="Current page"
              placeholderTextColor={COLORS.textSecondary}
              keyboardType="number-pad"
              value={currentPage}
              onChangeText={setCurrentPage}
            />
          </View>
          <View style={styles.inputShell}>
            <TextInput
              style={styles.input}
              placeholder="ISBN (optional)"
              placeholderTextColor={COLORS.textSecondary}
              keyboardType="number-pad"
              value={isbn}
              onChangeText={setIsbn}
            />
          </View>

          <TouchableOpacity style={[styles.navButton, styles.ghostButton]} onPress={pickImage} activeOpacity={0.85}>
            <View style={styles.iconLabelRow}>
              <Ionicons name="image" size={16} color={COLORS.textPrimary} />
              <Text style={styles.navButtonText}>Change cover</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.statusRow}>
            {error && <Text style={styles.error}>{error}</Text>}
          </View>

          {img ? (
            <Image source={{ uri: img }} style={styles.cover} />
          ) : (
            <Text style={styles.muted}>No cover selected</Text>
          )}

          <TouchableOpacity style={styles.navButton} onPress={handleSave} disabled={saving} activeOpacity={0.85}>
            <Text style={styles.navButtonText}>{saving ? "Saving…" : "Save Changes"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
