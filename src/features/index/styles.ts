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
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  navButton: {
    backgroundColor: "#1a73e8",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
  },
  navButtonText: {
    backgroundColor: "#1a73e8",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    color: "#fff",
    fontWeight: "700",
  },
  secondaryButton: {
    backgroundColor: "#111827",
  },
  tertiaryButton: {
    backgroundColor: "#16a34a",
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
    color: "#0f8b4c",
    marginTop: 8,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    gap: 6,
  },
  label: {
    fontSize: 12,
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
  },
  cover: {
    width: 140,
    height: 200,
    borderRadius: 8,
    backgroundColor: "#eee",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginTop: 6,
  },
  placeholder: {
    fontSize: 14,
    color: "#777",
    marginTop: 6,
  },
});
