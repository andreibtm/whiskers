// Status filter chips for the Library tab.
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import type { BookStatus } from "../../../modules/books/types";
import { styles } from "../styles";

interface Props {
  activeFilter: BookStatus | "all";
  onFilterChange: (filter: BookStatus | "all") => void;
}

const FILTERS: (BookStatus | "all")[] = ["all", "reading", "paused", "finished"];

export const LibraryFilters = ({ activeFilter, onFilterChange }: Props) => {
  return (
    <>
      <View style={styles.filterRow}>
        {FILTERS.map((state) => (
          <TouchableOpacity
            key={state}
            style={[styles.filterChip, activeFilter === state && styles.filterChipActive]}
            onPress={() => onFilterChange(state)}
          >
            <Text style={[styles.filterChipText, activeFilter === state && styles.filterChipTextActive]}>
              {state === "all" ? "All" : state.charAt(0).toUpperCase() + state.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.filterDivider} />
    </>
  );
};