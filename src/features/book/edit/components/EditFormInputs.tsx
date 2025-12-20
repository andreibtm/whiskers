import React from "react";
import { Text, TextInput, View } from "react-native";
import { COLORS } from "../../../../constants/theme";
import { styles } from "../styles";

interface Props {
  title: string;
  setTitle: (text: string) => void;
  author: string;
  setAuthor: (text: string) => void;
  pages: string;
  setPages: (text: string) => void;
  currentPage: string;
  setCurrentPage: (text: string) => void;
  isbn: string;
  setIsbn: (text: string) => void;
}

export const EditFormInputs = ({
  title,
  setTitle,
  author,
  setAuthor,
  pages,
  setPages,
  currentPage,
  setCurrentPage,
  isbn,
  setIsbn,
}: Props) => {
  return (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Details</Text>
      </View>

      <View style={styles.inputShell}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          placeholderTextColor={COLORS.textSecondary}
          value={title}
          onChangeText={setTitle}
        />
      </View>
      <View style={styles.inputShell}>
        <TextInput
          style={styles.input}
          placeholder="Author"
          placeholderTextColor={COLORS.textSecondary}
          value={author}
          onChangeText={setAuthor}
        />
      </View>
      <View style={styles.inputShell}>
        <TextInput
          style={styles.input}
          placeholder="Pages"
          placeholderTextColor={COLORS.textSecondary}
          keyboardType="number-pad"
          value={pages}
          onChangeText={setPages}
        />
      </View>
      <View style={styles.inputShell}>
        <TextInput
          style={styles.input}
          placeholder="Current page"
          placeholderTextColor={COLORS.textSecondary}
          keyboardType="number-pad"
          value={currentPage}
          onChangeText={setCurrentPage}
        />
      </View>
      <View style={styles.inputShell}>
        <TextInput
          style={styles.input}
          placeholder="ISBN (optional)"
          placeholderTextColor={COLORS.textSecondary}
          keyboardType="number-pad"
          value={isbn}
          onChangeText={setIsbn}
        />
      </View>
    </>
  );
};