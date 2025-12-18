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

        {loading && <Text style={styles.muted}>Loading...</Text>}
        {error && <Text style={styles.error}>{error}</Text>}
        <View style={styles.card}>
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
            placeholderTextColor={COLORS.textSecondary}
            keyboardType="numeric"
            value={pages}
            onChangeText={setPages}
          />
          <TextInput
            style={styles.input}
            placeholder="Current page"
            placeholderTextColor={COLORS.textSecondary}
            keyboardType="numeric"
            value={currentPage}
            onChangeText={setCurrentPage}
          />
          <TextInput
            style={styles.input}
            placeholder="ISBN (optional)"
            placeholderTextColor={COLORS.textSecondary}
            value={isbn}
            onChangeText={setIsbn}
          />

          <TouchableOpacity style={[styles.navButton, styles.navButtonSecondary]} onPress={pickImage} activeOpacity={0.8}>
            <Text style={[styles.navButtonText, styles.navButtonTextAccent]}>Change Cover</Text>
          </TouchableOpacity>

          {img ? (
            <Image source={{ uri: img }} style={styles.cover} />
          ) : (
            <Text style={styles.muted}>No cover selected</Text>
          )}
        </View>

        <TouchableOpacity style={styles.navButton} onPress={handleSave} disabled={saving} activeOpacity={0.8}>
          <Text style={styles.navButtonText}>{saving ? "Saving..." : "Save Changes"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
