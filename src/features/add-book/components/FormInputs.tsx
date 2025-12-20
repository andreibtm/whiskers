import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../../constants/theme";
import { styles } from "../styles";

interface Props {
  title: string;
  setTitle: (text: string) => void;
  author: string;
  setAuthor: (text: string) => void;
  pages: string;
  setPages: (text: string) => void;
  isbn: string;
  setIsbn: (text: string) => void;
  onScan: () => void;
}

export const FormInputs = ({
  title,
  setTitle,
  author,
  setAuthor,
  pages,
  setPages,
  isbn,
  setIsbn,
  onScan,
}: Props) => {
  return (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Details</Text>
        <TouchableOpacity style={styles.headerIcon} onPress={onScan} activeOpacity={0.85}>
          <Ionicons name="camera" size={18} color={COLORS.accent} />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor={COLORS.textSecondary}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Author"
        placeholderTextColor={COLORS.textSecondary}
        value={author}
        onChangeText={setAuthor}
      />
      <TextInput
        style={styles.input}
        placeholder="Pages"
        keyboardType="number-pad"
        placeholderTextColor={COLORS.textSecondary}
        value={pages}
        onChangeText={setPages}
      />
      <TextInput
        style={styles.input}
        placeholder="ISBN (optional)"
        keyboardType="number-pad"
        placeholderTextColor={COLORS.textSecondary}
        value={isbn}
        onChangeText={setIsbn}
      />
    </>
  );
};