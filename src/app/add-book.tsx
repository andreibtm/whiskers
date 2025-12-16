import { Link } from "expo-router";
import React from "react";
import { Button, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
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
  } = useAddBook();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Link href="/" style={styles.back}>
          ← Back
        </Link>
        <Text style={styles.title}>Add Book Manually</Text>

        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Author"
          value={author}
          onChangeText={setAuthor}
        />
        <TextInput
          style={styles.input}
          placeholder="Pages"
          keyboardType="numeric"
          value={pages}
          onChangeText={setPages}
        />
        <TextInput
          style={styles.input}
          placeholder="ISBN (optional)"
          value={isbn}
          onChangeText={setIsbn}
        />

        <View style={styles.row}>
          <Button title="Pick Cover" onPress={pickImage} />
          <Link href={{ pathname: "/camera", params: { returnTo: "/add-book" } }} asChild>
            <TouchableOpacity style={styles.scanBtn}>
              <Text style={styles.scanText}>Scan ISBN</Text>
            </TouchableOpacity>
          </Link>
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

