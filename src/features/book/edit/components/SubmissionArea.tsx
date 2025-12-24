// Displays validation errors and triggers saving edits.
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";

interface Props {
  saving: boolean;
  error: string | null;
  onSave: () => void;
}

export const SubmissionArea = ({ saving, error, onSave }: Props) => {
  return (
    <>
      <View style={styles.statusRow}>
        {error && <Text style={styles.error}>{error}</Text>}
      </View>

      <TouchableOpacity
        style={styles.navButton}
        onPress={onSave}
        disabled={saving}
        activeOpacity={0.85}
      >
        <Text style={styles.navButtonText}>{saving ? "Saving…" : "Save Changes"}</Text>
      </TouchableOpacity>
    </>
  );
};