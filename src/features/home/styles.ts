// Styling for the Home dashboard cards, typography, and focus timer controls.
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
    paddingBottom: 40,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: 26,
    fontFamily: FONTS.serifBold,
  },
  link: {
    color: COLORS.accent,
    fontFamily: FONTS.sansBold,
    fontSize: 14,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  bookRow: {
    flexDirection: "row",
    gap: 16,
  },
  cover: {
    width: 96,
    height: 144,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  bookMeta: {
    flex: 1,
    gap: 8,
    justifyContent: "space-between",
  },
  bookTitle: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontFamily: FONTS.serifBold,
  },
  bookAuthor: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.sans,
  },
  progressShell: {
    height: 12,
    borderRadius: 12,
    backgroundColor: COLORS.border,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.accent,
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressLabel: {
    color: COLORS.textPrimary,
    fontFamily: FONTS.sansBold,
  },
  progressMuted: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.sans,
  },
  cta: {
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  ctaText: {
    color: COLORS.textPrimary,
    fontFamily: FONTS.sansBold,
    fontSize: 16,
  },
  emptyState: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.sans,
  },
  statGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  statCard: {
    flexGrow: 1,
    minWidth: 150,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    gap: 6,
  },
  statLabel: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.sansBold,
    letterSpacing: 0.5,
  },
  statValue: {
    color: COLORS.textPrimary,
    fontSize: 22,
    fontFamily: FONTS.serifBold,
  },
  statSub: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.sans,
    fontSize: 12,
  },
  focusCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    gap: 12,
  },
  focusHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  focusTitle: {
    color: COLORS.textPrimary,
    fontFamily: FONTS.sansBold,
    fontSize: 16,
  },
  focusTimer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  focusTimeText: {
    color: COLORS.textPrimary,
    fontFamily: FONTS.serifBold,
    fontSize: 42,
  },
  focusActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  iconButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  primaryAction: {
    flex: 1,
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  primaryActionText: {
    color: COLORS.textPrimary,
    fontFamily: FONTS.sansBold,
    fontSize: 16,
  },
  accentPill: {
    backgroundColor: COLORS.accent,
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  accentPillText: {
    color: COLORS.background,
    fontFamily: FONTS.sansBold,
    fontSize: 12,
  },
});
