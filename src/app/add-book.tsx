import { Link } from "expo-router";
import React from "react";
import { Button, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
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
          keyboardType="numeric"
          placeholderTextColor={COLORS.textSecondary}
          value={pages}
          onChangeText={setPages}
        />
        <TextInput
          style={styles.input}
          placeholder="ISBN (optional)"
          placeholderTextColor={COLORS.textSecondary}
          value={isbn}
          onChangeText={setIsbn}
        />

        <View style={styles.row}>
          <Button title="Pick Cover" onPress={pickImage} />
          <TouchableOpacity style={styles.scanBtn} onPress={goToScanner}>
            <Text style={styles.scanText}>Scan ISBN</Text>
          </TouchableOpacity>
        </View>

        {img ? (
          <Image source={{ uri: img }} style={styles.cover} />
        ) : (
          <Text style={styles.muted}>No cover selected</Text>
        )}

        {error && <Text style={styles.error}>{error}</Text>}
        {message && <Text style={styles.success}>{message}</Text>}

        <Button title={saving ? "Saving..." : "Save Book"} onPress={handleSave} disabled={saving} />
      </ScrollView>
    </SafeAreaView>
  );
}

