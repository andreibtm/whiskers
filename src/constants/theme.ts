// Centralized color and font tokens used across screens.
export const COLORS = {
  background: "#000000",
  surface: "#121212",
  textPrimary: "#EFECE3",
  textSecondary: "#888888",
  border: "#333333",
  accent: "#628141",
  categories: {
    question: "#FF6B6B",
    fact: "#8FABD4",
    quote: "#95A5A6",
    synthesis: "#4A70A9",
  },
  status: {
    reading: "#4A70A9",
    paused: "#8FABD4",
    finished: "#4CAF50",
  },
} as const;

export const FONTS = {
  serif: "LibreBaskerville_400Regular",
  serifBold: "LibreBaskerville_700Bold",
  sans: "Inter_400Regular",
  sansBold: "Inter_600SemiBold",
} as const;
