import React, { useMemo } from "react";
import { ScrollView } from "react-native";
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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        
        <SearchHeader />

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

        {book && (
          <SearchResult 
            book={book} 
            saving={saving} 
            onSave={handleSave} 
          />
        )}

        <ManualEntryTip />
        
      </ScrollView>
    </SafeAreaView>
  );
}