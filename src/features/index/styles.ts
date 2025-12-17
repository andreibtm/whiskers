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
    gap: 16,
  },
  title: {
    fontFamily: FONTS.serifBold,
    fontSize: 28,
    textAlign: "center",
    color: COLORS.textPrimary,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 0,
    paddingVertical: 12,
    color: COLORS.textPrimary,
    fontFamily: FONTS.sans,
  },
  navButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  navButtonText: {
    color: COLORS.textPrimary,
    fontFamily: FONTS.sansBold,
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: COLORS.surface,
  },
  tertiaryButton: {
    backgroundColor: COLORS.accent,
  },
  navButtonTextAccent: {
    color: COLORS.accent,
  },
  navRow: {
    flexDirection: "row",
    gap: 8,
  },
  status: {
    minHeight: 32,
    justifyContent: "center",
  },
  error: {
    color: "#b00020",
    marginTop: 8,
  },
  success: {
    color: COLORS.status.finished,
    marginTop: 8,
  },
  card: {
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 6,
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
  cover: {
    width: 140,
    height: 200,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 6,
  },
  placeholder: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 6,
    fontFamily: FONTS.sans,
  },
});
