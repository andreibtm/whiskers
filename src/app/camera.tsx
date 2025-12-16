import { CameraView } from "expo-camera";
import React from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { useCameraScreen } from "../features/camera/logic";
import { styles } from "../features/camera/styles";

export default function CameraScreen() {
  const { permission, requestPermission, scanned, handleBarCodeScanned, resetScan } = useCameraScreen();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "ean13", "upc_e"],
        }}
      >
        <View style={styles.overlay}>
            <View style={styles.scanFrame} />
            <Text style={styles.overlayText}>{scanned ? "Code captured" : "Align code within frame"}</Text>
        </View>
      </CameraView>

      {scanned && (
        <View style={styles.rescanBar}>
          <Text style={styles.rescanText}>Scanned. Navigating…</Text>
          <TouchableOpacity onPress={resetScan} style={styles.rescanButton}>
            <Text style={styles.rescanButtonText}>Scan Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}