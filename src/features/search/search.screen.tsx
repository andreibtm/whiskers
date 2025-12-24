// Search tab that fetches book metadata by ISBN and lets users save the result.
import React, { useMemo } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsbnSearch } from "./logic";
import { styles } from "./styles";

// Import new components
import { ManualEntryTip } from "./components/ManualEntryTip";
import { SearchForm } from "./components/SearchForm";
import { SearchHeader } from "./components/SearchHeader";
import { SearchResult } from "./components/SearchResult";

export default function SearchScreen() {
  const { isbn, setIsbn, loading, error, saveMessage, saving, book, handleFetch, handleSave } = useIsbnSearch();

  const sampleIsbns = useMemo(() => ["9780143127796", "9780385547345"], []);

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.content}>
        
        <SearchHeader />

        {/* Entry form: accepts manual ISBN input, scan shortcut, and shows request status. */}
        <SearchForm
          isbn={isbn}
          onIsbnChange={setIsbn}
          onFetch={handleFetch}
          onClear={() => setIsbn("")}
          loading={loading}
          error={error}
          saveMessage={saveMessage}
          sampleIsbns={sampleIsbns}
        />

        {/* Preview of the fetched Google Books result with add-to-library CTA. */}
        {book && (
          <SearchResult 
            book={book} 
            saving={saving} 
            onSave={handleSave} 
          />
        )}
        
        <View style={{flex: 1}} />

        {/* Manual fallback if search/barcode fails. */}
        <ManualEntryTip />
        
      </ScrollView>
    </SafeAreaView>
  );
}