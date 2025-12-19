import { Inter_400Regular, Inter_600SemiBold, useFonts } from "@expo-google-fonts/inter";
import { LibreBaskerville_400Regular, LibreBaskerville_700Bold } from "@expo-google-fonts/libre-baskerville";
import { Stack } from "expo-router";
import React from "react";
import { ActivityIndicator, SafeAreaView, Text } from "react-native";
import { useLibraryMigrations } from "../db/client";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    LibreBaskerville_400Regular,
    LibreBaskerville_700Bold,
  });
  const { success, error } = useLibraryMigrations();

  if (error) {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Could not prepare local library</Text>
      </SafeAreaView>
    );
  }

  if (!success || !fontsLoaded) {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 12 }}>
        <ActivityIndicator />
        <Text>Preparing app...</Text>
      </SafeAreaView>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="camera" options={{ headerShown: false }} />
      <Stack.Screen name="add-book" options={{ headerShown: false }} />
      <Stack.Screen name="book/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="book/edit/[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
