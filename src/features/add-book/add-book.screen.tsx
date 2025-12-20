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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        
        <AddBookHeader />

        <View style={styles.cardPrimary}>
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

          <CoverManager 
            img={img} 
            onPickImage={pickImage} 
          />

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