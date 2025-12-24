// Styling for the manual add-book form, buttons, and feedback labels.
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
    fontFamily: FONTS.sansBold,
    marginBottom: 6,
  },
  title: {
    fontFamily: FONTS.serifBold,
    fontSize: 26,
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
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 12,
    color: COLORS.textPrimary,
    fontFamily: FONTS.sans,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  navButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 12,
    paddingHorizontal: 16,
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
  },
  iconGhostBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  cover: {
    width: 140,
    aspectRatio: 2 / 3,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignSelf: "center",
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
  statusRow: {
    minHeight: 28,
    justifyContent: "center",
    gap: 4,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
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
  headerIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
});
