import { Link } from "expo-router";
import React from "react";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useHome } from "../../features/home/logic";
import { styles } from "../../features/home/styles";

// Import your new separate components
import { CurrentlyReading } from "../../features/home/components/CurrentlyReading";
import { FocusSession } from "../../features/home/components/FocusSession";
import { WeeklyProgress } from "../../features/home/components/WeeklyProgress";

export default function HomeScreen() {
  const {
    currentBook,
    pagesThisMonth,
    minutesThisMonth,
    streak,
    booksFinished,
    goalTarget,
    loading,
    error,
    timerSeconds,
    timerRunning,
    startTimer,
    pauseTimer,
    resetTimer,
    completeTimerEarly,
  } = useHome();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Home</Text>
          <Link href="/library" asChild>
            <TouchableOpacity>
              <Text style={styles.link}>See all</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Loading State */}
        {loading && (
          <View style={[styles.card, { alignItems: "center" }]}>
            <ActivityIndicator />
          </View>
        )}

        {/* Error State */}
        {!loading && error && (
          <View style={[styles.card, { alignItems: "center" }]}>
            <Text style={styles.emptyState}>{error}</Text>
          </View>
        )}

        {/* Main Dashboard Content */}
        {!loading && !error && (
          <>
            <CurrentlyReading currentBook={currentBook} />

            <WeeklyProgress
              streak={streak}
              pagesThisMonth={pagesThisMonth}
              minutesThisMonth={minutesThisMonth}
              booksFinished={booksFinished}
              goalTarget={goalTarget}
            />

            <FocusSession
              timerSeconds={timerSeconds}
              timerRunning={timerRunning}
              onStart={startTimer}
              onPause={pauseTimer}
              onReset={resetTimer}
              onComplete={completeTimerEarly}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}