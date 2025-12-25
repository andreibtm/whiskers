// Book detail view combining metadata, progress controls, and a note workspace.
import { Link } from "expo-router";
import React from "react";
import {
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useBookDetails } from "./logic";
import { styles } from "./styles";

export default function BookDetailsScreen() {
  const insets = useSafeAreaInsets();
  const [showPageEditor, setShowPageEditor] = React.useState(false);
  const {
    bookId,
    book,
    loading,
    saving,
    error,
    pageIncrement,
    setPageIncrement,
    progressPct,
    handleUpdateProgress,
  } = useBookDetails();

  const openPageEditor = () => {
    setPageIncrement("");
    setShowPageEditor(true);
  };

  const closePageEditor = () => {
    setShowPageEditor(false);
    setPageIncrement("");
  };

  if (!bookId || Number.isNaN(bookId)) {
    return (
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <View style={styles.center}>
          <Text>Invalid book id.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={styles.detailHeaderRow}>
        <Link href="/library" style={styles.detailBack}>
          ← Back
        </Link>
        {book && (
          <Link href={`/book/edit/${book.id}`} asChild>
            <TouchableOpacity style={styles.editCircle}>
              <Text style={styles.editCircleText}>✎</Text>
            </TouchableOpacity>
          </Link>
        )}
      </View>

      {loading && (
        <View style={styles.center}>
          <ActivityIndicator />
        </View>
      )}

      {/* Error State: surface any load/save issues for this book. */}
      {error && <Text style={styles.error}>{error}</Text>}

      {book && (
        <ScrollView contentContainerStyle={styles.detailContent}>
          <View style={styles.coverFrame}>
            {book.img ? (
              <Image
                source={{ uri: book.img }}
                style={styles.coverImage}
                resizeMode="contain"
              />
            ) : (
              <View style={styles.coverPlaceholder}>
                <Text style={styles.coverPlaceholderText}>Cover</Text>
              </View>
            )}
          </View>

          <View style={styles.detailTitleBlock}>
            <Text style={styles.detailTitle}>{book.title}</Text>
            <Text style={styles.detailAuthor}>{book.author}</Text>
          </View>

          <View style={styles.progressBlock}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Progress</Text>
              <Text style={styles.meta}>{progressPct.toFixed(0)}% completed</Text>
            </View>
            <View style={styles.progressBarShellLarge}>
              <View style={[styles.progressBarFill, { width: `${progressPct}%` }]} />
            </View>
            <Text style={styles.meta}>
              Pages read: {book.currentPage ?? 0}
              {book.pages ? ` / ${book.pages}` : ""}
            </Text>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.navButton} onPress={openPageEditor}>
              <Text style={styles.navButtonText}>Update Page</Text>
            </TouchableOpacity>
            <Link href={`/book/${book.id}/notes`} asChild>
              <TouchableOpacity style={styles.navButton}> 
                <Text style={styles.navButtonText}>Open Notes</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
      )}

      {showPageEditor && (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={insets.top + 60}
          style={[styles.floatingComposer, { bottom: insets.bottom + 8 }]}
        >
          <View style={[styles.floatingCard, styles.floatingShadow]}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Update page</Text>
              <TouchableOpacity onPress={closePageEditor}>
                <Text style={styles.navButtonTextGhost}>Close</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={[styles.input, styles.inputCompact, styles.progressInput]}
              placeholder="Page number"
              keyboardType="number-pad"
              value={pageIncrement}
              onChangeText={setPageIncrement}
              autoFocus
              returnKeyType="done"
              onSubmitEditing={async () => {
                await handleUpdateProgress();
                closePageEditor();
              }}
            />
            <TouchableOpacity
              style={styles.navButton}
              onPress={async () => {
                await handleUpdateProgress();
                closePageEditor();
              }}
              disabled={saving}
              activeOpacity={0.9}
            >
              <Text style={styles.navButtonText}>{saving ? "Saving…" : "Save"}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
}