import { Link } from "expo-router";
import React from "react";
import { ActivityIndicator, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/theme";
import { useIsbnSearch } from "../../features/index/logic";
import { styles } from "../../features/index/styles";

export default function Index() {
  const { isbn, setIsbn, loading, error, saveMessage, saving, book, handleFetch, handleSave } = useIsbnSearch();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Scout a Book</Text>

        <View style={styles.navRow}>
          <Link href="/camera" asChild>
            <TouchableOpacity style={[styles.navButton, styles.secondaryButton]}>
              <Text style={[styles.navButtonText, styles.navButtonTextAccent]}>Scan ISBN</Text>
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
          placeholderTextColor={COLORS.textSecondary}
        />

        <TouchableOpacity style={styles.navButton} onPress={() => handleFetch()} disabled={loading} activeOpacity={0.8}>
          <Text style={styles.navButtonText}>{loading ? "Fetching..." : "Fetch Book"}</Text>
        </TouchableOpacity>

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

            <TouchableOpacity style={styles.navButton} onPress={handleSave} disabled={saving} activeOpacity={0.8}>
              <Text style={styles.navButtonText}>{saving ? "Saving..." : "Add to Library"}</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ marginTop: 12 }}>
          <Link href="/add-book" asChild>
            <TouchableOpacity>
              <Text style={[styles.navButtonText, styles.navButtonTextAccent, { textAlign: "center" }]}>Cannot find it? Add manually →</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
