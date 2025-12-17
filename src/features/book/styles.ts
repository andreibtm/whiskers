import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  content: {
    flexGrow: 1,
    padding: 24,
    gap: 16,
  },
  back: {
    color: "#1a73e8",
    marginBottom: 4,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    padding: 12,
    gap: 8,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 16,
    color: "#444",
  },
  meta: {
    fontSize: 12,
    color: "#666",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  input: {
    minHeight: 80,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    textAlignVertical: "top",
  },
  error: {
    color: "#b00020",
  },
  muted: {
    color: "#666",
  },
  noteItem: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 8,
    marginTop: 8,
  },
  noteActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 6,
  },
  action: {
    color: "#1a73e8",
    fontWeight: "700",
  },
  danger: {
    color: "#b00020",
  },
  noteText: {
    fontSize: 14,
  },
  noteDate: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
  noteInput: {
    minHeight: 60,
  },
  noteBadge: {
    fontSize: 12,
    color: "#1a73e8",
    marginTop: 4,
    fontWeight: "700",
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
    borderColor: "#d1d5db",
    backgroundColor: "#fff",
  },
  chipSmall: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
    backgroundColor: "#fff",
  },
  chipActive: {
    backgroundColor: "#1a73e8",
    borderColor: "#1a73e8",
  },
  chipText: {
    color: "#374151",
    fontWeight: "600",
  },
  chipTextActive: {
    color: "#fff",
  },
  notesHeader: {
    gap: 8,
  },
  progressBarShell: {
    height: 10,
    borderRadius: 6,
    backgroundColor: "#e5e7eb",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#1a73e8",
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
    color: "#1a73e8",
    fontWeight: "700",
    marginTop: 4,
  },
});
