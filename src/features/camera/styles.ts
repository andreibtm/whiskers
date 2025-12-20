import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.background,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
    color: COLORS.textSecondary,
    fontFamily: FONTS.sans,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  scanFrame: {
    width: 250,
    height: 150,
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: "rgba(0, 0, 0, 0)",
    borderRadius: 16,
  },
  overlayText: {
    color: COLORS.textPrimary,
    marginTop: 20,
    fontSize: 16,
    fontFamily: FONTS.sansBold,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 8,
    borderRadius: 8,
  },
  rescanBar: {
    position: "absolute",
    bottom: 32,
    left: 16,
    right: 16,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  rescanText: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontFamily: FONTS.sans,
  },
  rescanButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: COLORS.accent,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  rescanButtonText: {
    color: COLORS.textPrimary,
    fontFamily: FONTS.sansBold,
  },
});
