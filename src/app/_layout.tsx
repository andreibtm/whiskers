import { Stack } from "expo-router";
import React from "react";
import { ActivityIndicator, SafeAreaView, Text } from "react-native";
import { useLibraryMigrations } from "../db/client";

export default function RootLayout() {
  const { success, error } = useLibraryMigrations();

  if (error) {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Could not prepare local library</Text>
      </SafeAreaView>
    );
  }

  if (!success) {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 12 }}>
        <ActivityIndicator />
        <Text>Preparing library...</Text>
      </SafeAreaView>
    );
  }

  return <Stack
      screenOptions={{
        headerShown: false, // This hides the header for all screens in this stack
      }}
    />;
}
