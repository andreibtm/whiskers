// Library tab showing filters and the list of saved books.
import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLibraryScreen } from "../../features/library/logic";
import { styles } from "../../features/library/styles";

// Import new components
import { BookList } from "../../features/library/components/BookList";
import { LibraryFilters } from "../../features/library/components/LibraryFilters";
import { LibraryHeader } from "../../features/library/components/LibraryHeader";

export default function LibraryScreen() {
  const { 
    books, 
    loading, 
    error, 
    handlePressBook, 
    handleToggleStatus, 
    statusFilter, 
    setStatusFilter 
  } = useLibraryScreen();

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.content}>
        
        <LibraryHeader />

        <LibraryFilters 
          activeFilter={statusFilter} 
          onFilterChange={setStatusFilter} 
        />

        <BookList
          books={books}
          loading={loading}
          error={error}
          onPressBook={handlePressBook}
          onToggleStatus={handleToggleStatus}
        />

      </ScrollView>
    </SafeAreaView>
  );
}