// Compact stats grid summarizing streak, pages, time spent, and goals progress.
import React from "react";
import { Text, View } from "react-native";
import { styles } from "../styles";

interface Props {
  streak: number;
  pagesThisMonth: number;
  minutesThisMonth: number;
  booksFinished: number;
  goalTarget: number;
}

const formatMinutes = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  return `${hours}h ${mins}m`;
};

export const WeeklyProgress = ({
  streak,
  pagesThisMonth,
  minutesThisMonth,
  booksFinished,
  goalTarget,
}: Props) => {
  return (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Weekly Progress</Text>
      </View>
      <View style={styles.statGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Streak</Text>
          <Text style={styles.statValue}>{streak}</Text>
          <Text style={styles.statSub}>Days in a row</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Pages</Text>
          <Text style={styles.statValue}>{pagesThisMonth}</Text>
          <Text style={styles.statSub}>Pages this month</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Time</Text>
          <Text style={styles.statValue}>{formatMinutes(minutesThisMonth)}</Text>
          <Text style={styles.statSub}>Focused reading</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Goals</Text>
          <Text style={styles.statValue}>
            {booksFinished}/{goalTarget}
          </Text>
          <Text style={styles.statSub}>Books finished</Text>
        </View>
      </View>
    </>
  );
};