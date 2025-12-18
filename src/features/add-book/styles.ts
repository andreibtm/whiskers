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
    fontSize: 26,
    textAlign: "center",
    marginBottom: 8,
    color: COLORS.textPrimary,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 12,
    color: COLORS.textPrimary,
    fontFamily: FONTS.sans,
  },
  row: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  cover: {
    width: 140,
    aspectRatio: 2 / 3,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  muted: {
    color: COLORS.textSecondary,
  },
  error: {
    color: "#b00020",
  },
  success: {
    color: COLORS.status.finished,
  },
  scanBtn: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  scanText: {
    color: COLORS.textPrimary,
    fontFamily: FONTS.sansBold,
  },
});
