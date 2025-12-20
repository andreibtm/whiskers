import React from "react";
import { Text, View } from "react-native";
import { styles } from "../styles";

export const SearchHeader = () => {
  return (
    <View>
      <Text style={styles.title}>Scout a Book</Text>
      <Text style={styles.subtitle}>
        Search by ISBN, scan a barcode, or add it yourself. We’ll pull cover, author, and source automatically.
      </Text>
    </View>
  );
};