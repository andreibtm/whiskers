import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useMemo } from "react";
import { ActivityIndicator, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/theme";
import { DEFAULT_SESSION_SECONDS, useHome } from "../../features/home/logic";
import { styles } from "../../features/home/styles";

const formatMinutes = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  return `${hours}h ${mins}m`;
};

const formatTimer = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

export default function Home() {
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

  const hasCover = currentBook?.img && currentBook.img !== "no-cover";

  const progressPct = useMemo(() => {
    if (!currentBook || !currentBook.pages) return 0;
    const pct = (currentBook.currentPage / currentBook.pages) * 100;
    return Math.min(100, Math.max(0, Math.round(pct)));
  }, [currentBook]);

  const pagesLabel = useMemo(() => {
    if (!currentBook) return "";
    const total = currentBook.pages || 0;
    const current = currentBook.currentPage || 0;
    if (!total) return `${current} pages read`;
    return `${current}/${total} pages`;
  }, [currentBook]);

  const handlePrimaryTimerAction = () => {
    if (timerRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Home</Text>
          <Link href="/library" asChild>
            <TouchableOpacity>
              <Text style={styles.link}>See all</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {loading && (
          <View style={[styles.card, { alignItems: "center" }]}>
            <ActivityIndicator />
          </View>
        )}

        {!loading && error && (
          <View style={[styles.card, { alignItems: "center" }]}>
            <Text style={styles.emptyState}>{error}</Text>
          </View>
        )}

        {!loading && !error && (
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Currently Reading</Text>
              <View style={styles.accentPill}>
                <Text style={styles.accentPillText}>Live</Text>
              </View>
            </View>

            {currentBook ? (
              <>
                <View style={styles.bookRow}>
                  {hasCover ? (
                    <Image source={{ uri: currentBook?.img }} style={styles.cover} />
                  ) : (
                    <View style={[styles.cover, { alignItems: "center", justifyContent: "center" }]}>
                      <Ionicons name="book-outline" size={28} color={COLORS.textSecondary} />
                    </View>
                  )}
                  <View style={styles.bookMeta}>
                    <View>
                      <Text style={styles.bookTitle}>{currentBook.title}</Text>
                      <Text style={styles.bookAuthor}>{currentBook.author}</Text>
                    </View>
                    <View style={{ gap: 6 }}>
                      <View style={styles.progressShell}>
                        <View style={[styles.progressFill, { width: `${progressPct}%` }]} />
                      </View>
                      <View style={styles.progressRow}>
                        <Text style={styles.progressLabel}>{progressPct}% Complete</Text>
                        <Text style={styles.progressMuted}>{pagesLabel}</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <Link href={`/book/${currentBook.id}`} asChild>
                  <TouchableOpacity style={styles.cta}>
                    <Text style={styles.ctaText}>Resume Reading</Text>
                  </TouchableOpacity>
                </Link>
              </>
            ) : (
              <>
                <Text style={styles.emptyState}>No book in progress yet.</Text>
                <Link href="/search" asChild>
                  <TouchableOpacity style={styles.cta}>
                    <Text style={styles.ctaText}>Find your first book</Text>
                  </TouchableOpacity>
                </Link>
              </>
            )}
          </View>
        )}

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

        <View style={styles.focusCard}>
          <View style={styles.focusHeader}>
            <Text style={styles.focusTitle}>Focus Session</Text>
            <Text style={styles.progressMuted}>Pomodoro ready</Text>
          </View>
          <View style={styles.focusTimer}>
            <Text style={styles.focusTimeText}>{formatTimer(timerSeconds || DEFAULT_SESSION_SECONDS)}</Text>
          </View>
          <View style={styles.focusActions}>
            <TouchableOpacity style={styles.iconButton} onPress={resetTimer}>
              <Ionicons name="refresh" size={20} color={COLORS.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.primaryAction} onPress={handlePrimaryTimerAction}>
              <Text style={styles.primaryActionText}>{timerRunning ? "Pause" : "Start"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.primaryAction, { backgroundColor: COLORS.surface, borderColor: COLORS.border }]}
              onPress={completeTimerEarly}
            >
              <Text style={styles.primaryActionText}>Done</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={handlePrimaryTimerAction}>
              <Ionicons name={timerRunning ? "pause" : "play"} size={20} color={COLORS.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
