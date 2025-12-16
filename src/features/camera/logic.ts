import { useCameraPermissions, type BarcodeScanningResult } from "expo-camera";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";

export const useCameraScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const handlingScanRef = useRef(false);
  const router = useRouter();
  const { returnTo } = useLocalSearchParams<{ returnTo?: string }>();

  const resetScan = () => {
    handlingScanRef.current = false;
    setScanned(false);
  };

  const handleBarCodeScanned = ({ type, data }: BarcodeScanningResult) => {
    if (handlingScanRef.current) return;
    handlingScanRef.current = true;
    setScanned(true);
    router.push({ pathname: returnTo || "/", params: { isbn: data, type } });
  };

  return {
    permission,
    requestPermission,
    scanned,
    handleBarCodeScanned,
    resetScan,
  };
};
