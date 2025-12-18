import { Ionicons } from "@expo/vector-icons"; // Using Ionicons for cleaner look
import { Tabs } from "expo-router";
import React from "react";
import { COLORS } from "../../constants/theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // 1. The Colors
        tabBarActiveTintColor: COLORS.textPrimary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        
        // 2. The Bar Style
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopColor: COLORS.border, // The Divider Line Color
          borderTopWidth: 1,             // The Divider Line Thickness
          height: 80,                    // Taller, premium feel
          paddingTop: 10,                // Push icons down slightly
          paddingBottom: 20,             // Extra padding for iPhone Home Indicator
        },
        
        // 3. The Label Style (Text below icon)
        tabBarLabelStyle: {
          fontFamily: 'Inter_400Regular', // Use your custom Sans font
          fontSize: 14,
          marginTop: 2,                 // Pull text closer to icon if needed
        },
        
        // 4. Remove default click effect on Android
        tabBarItemStyle: {
            justifyContent: 'center',
            alignItems: 'center',
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            // Swapping icon based on focus state (filled vs outline)
            <Ionicons 
              size={24} 
              name={focused ? "home" : "home-outline"} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Library',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              size={24} 
              name={focused ? "book" : "book-outline"} 
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
  );
}