import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../../constants/theme";

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
    color: COLORS.accent,
    marginBottom: 6,
    fontFamily: FONTS.sansBold,
  },
  title: {
    fontSize: 24,
    fontFamily: FONTS.serifBold,
    textAlign: "center",
    marginBottom: 8,
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
  input: {
    paddingHorizontal: 0,
    paddingVertical: 12,
    color: COLORS.textPrimary,
    fontFamily: FONTS.sans,
  },
  inputShell: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  navButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  navButtonText: {
    color: COLORS.textPrimary,
    fontFamily: FONTS.sansBold,
    fontSize: 16,
  },
  ghostButton: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderWidth: 1,
    paddingHorizontal: 14,
  },
  iconLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  navButtonTextGhost: {
    color: COLORS.accent,
  },
  cover: {
    width: 140,
    aspectRatio: 2 / 3,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 6,
  },
  muted: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.sans,
  },
  error: {
    color: "#b00020",
    fontFamily: FONTS.sansBold,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  statusRow: {
    minHeight: 24,
    justifyContent: "center",
    gap: 4,
  },
  cardPrimary: {
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 14,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  sectionTitle: {
    fontFamily: FONTS.serifBold,
    fontSize: 18,
    color: COLORS.textPrimary,
  },
  label: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    fontFamily: FONTS.sansBold,
  },
  value: {
    fontSize: 16,
    fontFamily: FONTS.sansBold,
    color: COLORS.textPrimary,
  },
});
