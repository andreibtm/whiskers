import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/theme";
import { useAddBook } from "../features/add-book/logic";
import { styles } from "../features/add-book/styles";

export default function AddBook() {
  const {
    title,
    setTitle,
    author,
    setAuthor,
    pages,
    setPages,
    isbn,
    setIsbn,
    img,
    saving,
    error,
    message,
    pickImage,
    handleSave,
    goToScanner,
  } = useAddBook();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Link href="/search" style={styles.back}>
          ← Back
        </Link>
        <Text style={styles.title}>Add Book Manually</Text>
        <Text style={styles.subtitle}>Fill in the details, scan an ISBN, or add a cover. We keep it consistent with your library.</Text>
        <View style={styles.cardPrimary}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Details</Text>
            <TouchableOpacity style={styles.headerIcon} onPress={goToScanner} activeOpacity={0.85}>
              <Ionicons name="camera" size={18} color={COLORS.accent} />
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Title"
            placeholderTextColor={COLORS.textSecondary}
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Author"
            placeholderTextColor={COLORS.textSecondary}
            value={author}
            onChangeText={setAuthor}
          />
          <TextInput
            style={styles.input}
            placeholder="Pages"
            keyboardType="number-pad"
            placeholderTextColor={COLORS.textSecondary}
            value={pages}
            onChangeText={setPages}
          />
          <TextInput
            style={styles.input}
            placeholder="ISBN (optional)"
            keyboardType="number-pad"
            placeholderTextColor={COLORS.textSecondary}
            value={isbn}
            onChangeText={setIsbn}
          />

          <TouchableOpacity style={[styles.navButton, styles.ghostButton]} onPress={pickImage} activeOpacity={0.85}>
            <View style={styles.iconLabelRow}>
              <Ionicons name="image" size={16} color={COLORS.textPrimary} />
              <Text style={styles.navButtonText}>Pick cover</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.statusRow}>
            {error && <Text style={styles.error}>{error}</Text>}
            {message && <Text style={styles.success}>{message}</Text>}
          </View>

          {img ? (
            <Image source={{ uri: img }} style={styles.cover} />
          ) : (
            <Text style={styles.muted}>No cover selected</Text>
          )}

          <TouchableOpacity style={[styles.navButton, { marginTop: 4 }]} onPress={handleSave} disabled={saving} activeOpacity={0.85}>
            <Text style={styles.navButtonText}>{saving ? "Saving…" : "Save Book"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

