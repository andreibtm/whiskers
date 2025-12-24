// Library title row with quick link to add/search books.
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../../constants/theme";
import { styles } from "../styles";

export const LibraryHeader = () => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
      <Text style={styles.title}>Library</Text>
      <Link href="/search" asChild>
        <TouchableOpacity>
          <AntDesign name="plus" size={24} color={COLORS.textSecondary} />
        </TouchableOpacity>
      </Link>
    </View>
  );
};