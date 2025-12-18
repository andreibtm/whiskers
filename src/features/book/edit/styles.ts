import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flexGrow: 1,
    padding: 24,
    gap: 16,
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
    marginBottom: 12,
    color: COLORS.textPrimary,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 0,
    paddingVertical: 12,
    color: COLORS.textPrimary,
    fontFamily: FONTS.sans,
    backgroundColor: COLORS.background,
  },
  row: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  navButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  navButtonSecondary: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.accent,
  },
  navButtonText: {
    color: COLORS.textPrimary,
    fontFamily: FONTS.sansBold,
    fontSize: 16,
  },
  navButtonTextAccent: {
    color: COLORS.accent,
  },
  cover: {
    width: 140,
    aspectRatio: 2 / 3,
    borderRadius: 10,
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
  card: {
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 12,
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
