import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flexGrow: 1,
    padding: 24,
    gap: 12,
  },
  back: {
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  title: {
    fontFamily: FONTS.serifBold,
    fontSize: 28,
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: 8,
  },
  centerRow: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  filterChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  filterChipActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  filterChipText: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.sansBold,
  },
  filterChipTextActive: {
    color: COLORS.background,
  },
  error: {
    color: "#b00020",
  },
  muted: {
    color: COLORS.textSecondary,
  },
});
