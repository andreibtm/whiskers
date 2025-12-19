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
    fontFamily: FONTS.serif,
    fontSize:30,
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
    paddingHorizontal: 0,
    paddingVertical: 6,
    borderRadius: 0,
  },
  filterChipActive: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.textPrimary,
  },
  filterChipText: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.sansBold,
    fontSize: 16,
  },
  filterChipTextActive: {
    color: COLORS.textPrimary,
  },
  filterDivider: {
    marginTop: 4,
    height: 1,
    backgroundColor: COLORS.border,
  },
  error: {
    color: "#b00020",
  },
  muted: {
    color: COLORS.textSecondary,
  },
});
