export const COLORS = {
  background: "#000000",
  surface: "#121212",
  textPrimary: "#FFFFFF",
  textSecondary: "#888888",
  border: "#333333",
  accent: "#D4AF37",
  categories: {
    question: "#FF6B6B",
    fact: "#4ECDC4",
    quote: "#95A5A6",
    synthesis: "#FDCB6E",
  },
  status: {
    reading: "#D4AF37",
    paused: "#A0A0A0",
    finished: "#4CAF50",
  },
} as const;

export const FONTS = {
  serif: "LibreBaskerville_400Regular",
  serifBold: "LibreBaskerville_700Bold",
  sans: "Inter_400Regular",
  sansBold: "Inter_600SemiBold",
} as const;
