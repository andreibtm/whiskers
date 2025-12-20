import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../../constants/theme";
import { styles } from "../styles";

interface Props {
  isbn: string;
  loading: boolean;
  error: string | null;
  saveMessage: string | null;
  sampleIsbns: string[];
  onIsbnChange: (text: string) => void;
  onFetch: (isbn?: string) => void;
  onClear: () => void;
}

export const SearchForm = ({
  isbn,
  loading,
  error,
  saveMessage,
  sampleIsbns,
  onIsbnChange,
  onFetch,
  onClear,
}: Props) => {
  return (
    <View style={styles.cardPrimary}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Search by ISBN</Text>
        <Link href="/camera" asChild>
          <TouchableOpacity style={styles.headerIcon} activeOpacity={0.85}>
            <Ionicons name="camera" size={18} color={COLORS.accent} />
          </TouchableOpacity>
        </Link>
      </View>

      <Text style={styles.label}>ISBN</Text>
      <View style={styles.inputRow}>
        <View style={[styles.inputShell, styles.inputFlex]}>
          <TextInput
            value={isbn}
            onChangeText={onIsbnChange}
            placeholder="9780143127796"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={13}
            style={styles.input}
            placeholderTextColor={COLORS.textSecondary}
            returnKeyType="search"
            onSubmitEditing={() => onFetch()}
          />
        </View>
        {isbn ? (
          <TouchableOpacity style={styles.clearBtn} onPress={onClear} accessibilityRole="button">
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <Text style={styles.helper}>Tip: Paste an ISBN or scan it directly.</Text>

      <View style={styles.chipRow}>
        {sampleIsbns.map((sample) => (
          <TouchableOpacity
            key={sample}
            style={styles.chip}
            onPress={() => {
              onIsbnChange(sample);
              onFetch(sample);
            }}
            activeOpacity={0.85}
          >
            <Text style={styles.chipText}>{sample}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.statusRow}>
        {loading && <ActivityIndicator />}
        {error && <Text style={styles.error}>{error}</Text>}
        {saveMessage && <Text style={styles.success}>{saveMessage}</Text>}
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.navButton, { flex: 1 }]}
          onPress={() => onFetch()}
          disabled={loading}
          activeOpacity={0.85}
        >
          <Text style={styles.navButtonText}>{loading ? "Fetching…" : "Fetch details"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};