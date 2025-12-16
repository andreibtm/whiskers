import { Link } from "expo-router";
import React from "react";
import { ActivityIndicator, Button, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useIsbnSearch } from "../features/index/logic";
import { styles } from "../features/index/styles";

export default function Index() {
  const { isbn, setIsbn, loading, error, saveMessage, saving, book, handleFetch, handleSave } = useIsbnSearch();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Find a Book by ISBN</Text>

        <View style={styles.navRow}>
          <Link href="/library" asChild>
            <TouchableOpacity style={styles.navButton}>
              <Text style={styles.navButtonText}>Go to Library</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/camera" asChild>
            <TouchableOpacity style={[styles.navButton, styles.secondaryButton]}>
              <Text style={styles.navButtonText}>Scan ISBN</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/add-book" asChild>
            <TouchableOpacity style={[styles.navButton, styles.tertiaryButton]}>
              <Text style={styles.navButtonText}>Add Manually</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <TextInput
          value={isbn}
          onChangeText={setIsbn}
          placeholder="Enter ISBN"
          autoCapitalize="none"
          keyboardType="default"
          style={styles.input}
        />

        <Button title="Fetch Book" onPress={() => handleFetch()} disabled={loading} />

        <View style={styles.status}>
          {loading && <ActivityIndicator />}
          {error && <Text style={styles.error}>{error}</Text>}
          {saveMessage && <Text style={styles.success}>{saveMessage}</Text>}
        </View>

        {book && (
          <View style={styles.card}>
            <Text style={styles.label}>Title</Text>
            <Text style={styles.value}>{book.title}</Text>

            <Text style={styles.label}>Author(s)</Text>
            <Text style={styles.value}>{book.authors}</Text>

            <Text style={styles.label}>Source</Text>
            <Text style={styles.value}>{book.source}</Text>

            <Text style={styles.label}>Cover</Text>
            {book.coverUrl ? (
              <Image
                source={{ uri: book.coverUrl }}
                style={styles.cover}
                resizeMode="cover"
              />
            ) : (
              <Text style={styles.placeholder}>No cover available</Text>
            )}

            <Button
              title={saving ? "Saving..." : "Add to Library"}
              onPress={handleSave}
              disabled={saving}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

