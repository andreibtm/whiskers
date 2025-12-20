import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEditBook } from "./logic"; // Updated import to relative path
import { styles } from "./styles"; // Updated import to relative path

// Import new components
import { CoverManager } from "./components/CoverManager";
import { EditBookHeader } from "./components/EditBookHeader";
import { EditFormInputs } from "./components/EditFormInputs";
import { SubmissionArea } from "./components/SubmissionArea";

export default function EditBookScreen() {
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
        
        <EditBookHeader bookId={bookId} />

        {loading && <Text style={styles.muted}>Loading...</Text>}
        {error && <Text style={styles.error}>{error}</Text>}

        <View style={styles.cardPrimary}>
          <EditFormInputs
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            pages={pages}
            setPages={setPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            isbn={isbn}
            setIsbn={setIsbn}
          />

          <CoverManager 
            img={img} 
            onPickImage={pickImage} 
          />

          <SubmissionArea 
            saving={saving} 
            error={error} 
            onSave={handleSave} 
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}