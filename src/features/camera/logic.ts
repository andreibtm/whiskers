import { useCameraPermissions, type BarcodeScanningResult } from "expo-camera";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";

export const useCameraScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const handlingScanRef = useRef(false);
  const router = useRouter();
  const { returnTo, title, author, pages, img } = useLocalSearchParams<{
    returnTo?: string;
    title?: string;
    author?: string;
    pages?: string;
    img?: string;
  }>();

  const resolveTargetPath = (): "/" | "/add-book" | "/camera" | "/library" => {
    switch (returnTo) {
      case "/add-book":
      case "/camera":
      case "/library":
        return returnTo;
      default:
        return "/";
    }
  };

  const resetScan = () => {
    handlingScanRef.current = false;
    setScanned(false);
  };

  const handleBarCodeScanned = ({ type, data }: BarcodeScanningResult) => {
    if (handlingScanRef.current) return;
    handlingScanRef.current = true;
    setScanned(true);
    const pathname = resolveTargetPath();
    if (pathname === "/add-book") {
      router.push({ pathname: "/add-book", params: { isbn: data, type, title, author, pages, img } });
    } else if (pathname === "/camera") {
      router.push({ pathname: "/camera" });
    } else if (pathname === "/library") {
      router.push({ pathname: "/library" });
    } else {
      router.push({ pathname: "/", params: { isbn: data } });
    }
  };

  return {
    permission,
    requestPermission,
    scanned,
    handleBarCodeScanned,
    resetScan,
  };
};
