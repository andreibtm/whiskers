import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../../constants/theme";
import { styles } from "../styles";

interface Props {
  img: string | null;
  onPickImage: () => void;
}

export const CoverManager = ({ img, onPickImage }: Props) => {
  return (
    <>
      <TouchableOpacity
        style={[styles.navButton, styles.ghostButton]}
        onPress={onPickImage}
        activeOpacity={0.85}
      >
        <View style={styles.iconLabelRow}>
          <Ionicons name="image" size={16} color={COLORS.textPrimary} />
          <Text style={styles.navButtonText}>Pick cover</Text>
        </View>
      </TouchableOpacity>

      {img ? (
        <Image source={{ uri: img }} style={styles.cover} />
      ) : (
        <Text style={styles.muted}>No cover selected</Text>
      )}
    </>
  );
};