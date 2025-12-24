// Progress bar and page updater for a single book.
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";

interface Props {
  progressPct: number;
  currentPage: number;
  totalPages?: number;
  pageIncrement: string;
  saving: boolean;
  onPageChange: (text: string) => void;
  onUpdate: () => void;
}

export const ReadingProgress = ({
  progressPct,
  currentPage,
  totalPages,
  pageIncrement,
  saving,
  onPageChange,
  onUpdate,
}: Props) => {
  return (
    <View style={styles.card}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Reading Progress</Text>
        <Text style={styles.meta}>{progressPct.toFixed(0)}% complete</Text>
      </View>
      <View style={styles.progressBarShell}>
        <View style={[styles.progressBarFill, { width: `${progressPct}%` }]} />
      </View>
      <Text style={styles.meta}>
        Pages read: {currentPage ?? 0}
        {totalPages ? ` / ${totalPages}` : " (total unknown)"}
      </Text>
      <View style={styles.progressRow}>
        <TextInput
          style={[styles.input, styles.progressInput]}
          placeholder="Update to Page #"
          keyboardType="number-pad"
          value={pageIncrement}
          onChangeText={onPageChange}
          returnKeyType="done"
          onSubmitEditing={onUpdate}
        />
        <TouchableOpacity
          style={styles.navButton}
          onPress={onUpdate}
          disabled={saving}
          activeOpacity={0.85}
        >
          <Text style={styles.navButtonText}>{saving ? "Saving…" : "Update"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};