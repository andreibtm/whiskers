import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
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
    borderWidth: 3,
    borderColor: "rgba(0,0,0,0.5)",
    backgroundColor: "rgba(0, 0, 0, 0)",
    borderRadius: 20,
  },
  overlayText: {
    color: "white",
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 10,
  },
  rescanBar: {
    position: "absolute",
    bottom: 32,
    left: 16,
    right: 16,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  rescanText: {
    color: "white",
    fontSize: 16,
  },
  rescanButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#4b8df8",
    borderRadius: 8,
  },
  rescanButtonText: {
    color: "white",
    fontWeight: "600",
  },
});
