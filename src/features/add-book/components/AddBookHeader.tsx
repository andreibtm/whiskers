import { Link } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { styles } from "../styles";

export const AddBookHeader = () => {
  return (
    <>
      <Link href="/search" style={styles.back}>
        ← Back
      </Link>
      <Text style={styles.title}>Add Book Manually</Text>
      <Text style={styles.subtitle}>
        Fill in the details, scan an ISBN, or add a cover. We keep it consistent with your library.
      </Text>
    </>
  );
};