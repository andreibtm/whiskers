// Manual add-book flow composing inputs, cover picker, and submit actions.
import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAddBook } from "./logic";
import { styles } from "./styles";

// Import new components
import { AddBookHeader } from "./components/AddBookHeader";
import { CoverManager } from "./components/CoverManager";
import { FormInputs } from "./components/FormInputs";
import { SubmissionArea } from "./components/SubmissionArea";

export default function AddBookScreen() {
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
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Intro copy plus a link back to search/manual options. */}
        <AddBookHeader />

        <View style={styles.cardPrimary}>
          {/* Core book fields including optional scan shortcut. */}
          <FormInputs
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            pages={pages}
            setPages={setPages}
            isbn={isbn}
            setIsbn={setIsbn}
            onScan={goToScanner}
          />

          {/* Cover picker + preview. */}
          <CoverManager 
            img={img} 
            onPickImage={pickImage} 
          />

          {/* Save CTA plus inline errors/success. */}
          <SubmissionArea
            saving={saving}
            error={error}
            message={message}
            onSave={handleSave}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}