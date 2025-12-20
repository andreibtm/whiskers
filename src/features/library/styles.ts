import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flexGrow: 1,
    padding: 20,
    gap: 18,
  },
  back: {
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  title: {
    fontFamily: FONTS.serifBold,
    fontSize: 26,
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
    gap: 16,
    marginBottom: 4,
  },
  filterChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
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
    fontSize: 16,
  },
  filterChipTextActive: {
    color: COLORS.background,
  },
  filterDivider: {
    marginTop: 4,
    height: 1,
    backgroundColor: COLORS.border,
  },
  list: {
    gap: 12,
  },
  error: {
    color: "#b00020",
  },
  muted: {
    color: COLORS.textSecondary,
  },
});
