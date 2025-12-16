import { Link } from "expo-router";
import React from "react";
import { Button, Image, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
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

        {loading && <Text>Loading...</Text>}
        {error && <Text style={styles.error}>{error}</Text>}

        <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
        <TextInput style={styles.input} placeholder="Author" value={author} onChangeText={setAuthor} />
        <TextInput
          style={styles.input}
          placeholder="Pages"
          keyboardType="numeric"
          value={pages}
          onChangeText={setPages}
        />
        <TextInput
          style={styles.input}
          placeholder="Current page"
          keyboardType="numeric"
          value={currentPage}
          onChangeText={setCurrentPage}
        />
        <TextInput
          style={styles.input}
          placeholder="ISBN (optional)"
          value={isbn}
          onChangeText={setIsbn}
        />

        <View style={styles.row}>
          <Button title="Change Cover" onPress={pickImage} />
        </View>

        {img ? (
          <Image source={{ uri: img }} style={styles.cover} />
        ) : (
          <Text style={styles.muted}>No cover selected</Text>
        )}

        <Button title={saving ? "Saving..." : "Save Changes"} onPress={handleSave} disabled={saving} />
      </ScrollView>
    </SafeAreaView>
  );
}
