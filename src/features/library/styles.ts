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
  error: {
    color: "#b00020",
  },
  muted: {
    color: "#666",
  },
});
