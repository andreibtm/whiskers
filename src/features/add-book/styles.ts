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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  cover: {
    width: 140,
    height: 200,
    borderRadius: 8,
    backgroundColor: "#eee",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  muted: {
    color: "#666",
  },
  error: {
    color: "#b00020",
  },
  success: {
    color: "#0f8b4c",
  },
  scanBtn: {
    backgroundColor: "#111827",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },
  scanText: {
    color: "#fff",
    fontWeight: "700",
  },
});
