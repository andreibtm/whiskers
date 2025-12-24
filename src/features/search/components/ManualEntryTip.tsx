// Helper tip that nudges users to manual entry when search fails.
import { Link } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";

export const ManualEntryTip = () => {
  return (
    <View style={styles.tipCard}>
      <Text style={styles.sectionTitle}>Trouble finding it?</Text>
      <Text style={styles.helper}>Try a different ISBN (10/13), or add it yourself.</Text>
      <Link href="/add-book" asChild>
        <TouchableOpacity>
          <Text style={[styles.navButtonText, styles.linkInline]}>Add manually →</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};