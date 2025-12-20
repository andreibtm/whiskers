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
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    gap: 12,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  title: {
    fontFamily: FONTS.serifBold,
    fontSize: 22,
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontFamily: FONTS.sans,
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  meta: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  sectionTitle: {
    fontFamily: FONTS.serifBold,
    fontSize: 18,
    color: COLORS.textPrimary,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  metaRow: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
  },
  input: {
    minHeight: 80,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 12,
    color: COLORS.textPrimary,
    textAlignVertical: "top",
    fontFamily: FONTS.sans,
  },
  error: {
    color: "#b00020",
  },
  muted: {
    color: COLORS.textSecondary,
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
  navButtonTextGhost: {
    color: COLORS.accent,
  },
  ghostButton: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderWidth: 1,
  },
  noteItem: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 8,
    marginTop: 8,
  },
  noteMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  noteDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
  },
  noteActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 6,
  },
  action: {
    color: COLORS.accent,
    fontFamily: FONTS.sansBold,
  },
  danger: {
    color: "#b00020",
  },
  noteText: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  noteDate: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  noteInput: {
    minHeight: 60,
  },
  noteBadge: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
    fontFamily: FONTS.sansBold,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  pageRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  chipSmall: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  chipActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  chipText: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.sansBold,
  },
  chipTextActive: {
    color: COLORS.background,
  },
  notesHeader: {
    gap: 8,
  },
  progressBarShell: {
    height: 12,
    borderRadius: 12,
    backgroundColor: COLORS.border,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: COLORS.accent,
  },
  progressRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  progressInput: {
    flex: 1,
    minHeight: 44,
  },
  pageInput: {
    flex: 0.4,
    minHeight: 44,
  },
  editLink: {
    color: COLORS.accent,
    fontFamily: FONTS.sansBold,
    marginTop: 4,
  },
});
