import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../../constants/theme";
import { styles } from "../styles";

interface Props {
  timerSeconds: number;
  timerRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onComplete: () => void;
}

const formatTimer = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

export const FocusSession = ({
  timerSeconds,
  timerRunning,
  onStart,
  onPause,
  onReset,
  onComplete,
}: Props) => {
  
  const handlePrimaryTimerAction = () => {
    if (timerRunning) {
      onPause();
    } else {
      onStart();
    }
  };

  return (
    <View style={styles.focusCard}>
      <View style={styles.focusHeader}>
        <Text style={styles.focusTitle}>Focus Session</Text>
        <Text style={styles.progressMuted}>Pomodoro ready</Text>
      </View>
      <View style={styles.focusTimer}>
        <Text style={styles.focusTimeText}>{formatTimer(timerSeconds)}</Text>
      </View>
      <View style={styles.focusActions}>
        <TouchableOpacity style={styles.iconButton} onPress={onReset}>
          <Ionicons name="refresh" size={20} color={COLORS.textPrimary} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.primaryAction} onPress={handlePrimaryTimerAction}>
          <Text style={styles.primaryActionText}>{timerRunning ? "Pause" : "Start"}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.primaryAction, { backgroundColor: COLORS.surface, borderColor: COLORS.border }]}
          onPress={onComplete}
        >
          <Text style={styles.primaryActionText}>Done</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.iconButton} onPress={handlePrimaryTimerAction}>
          <Ionicons name={timerRunning ? "pause" : "play"} size={20} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};