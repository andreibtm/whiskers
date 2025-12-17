import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  content: {
    flexGrow: 1,
    padding: 24,
    gap: 12,
  },
  back: {
    color: "#1a73e8",
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
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
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  filterChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#d1d5db",
    backgroundColor: "#fff",
  },
  filterChipActive: {
    backgroundColor: "#1a73e8",
    borderColor: "#1a73e8",
  },
  filterChipText: {
    color: "#374151",
    fontWeight: "600",
  },
  filterChipTextActive: {
    color: "#fff",
  },
  error: {
    color: "#b00020",
  },
  muted: {
    color: "#666",
  },
});
