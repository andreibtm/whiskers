import { Tabs } from "expo-router";
import React from "react";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#1a73e8",
      }}
    >
      <Tabs.Screen name="library" options={{ title: "Library" }} />
      <Tabs.Screen name="index" options={{ title: "Scout" }} />
    </Tabs>
  );
}
