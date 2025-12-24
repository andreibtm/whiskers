// Header copy for the edit-book flow with a back link to the detail page.
import { Link } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { styles } from "../styles";

interface Props {
  bookId: number;
}

export const EditBookHeader = ({ bookId }: Props) => {
  return (
    <>
      <Link href={`/book/${bookId}`} style={styles.back}>
        ← Back
      </Link>
      <Text style={styles.title}>Edit Book</Text>
      <Text style={styles.subtitle}>
        Update details, pages, and cover. We’ll keep everything in sync with your library.
      </Text>
    </>
  );
};