import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";

interface Props {
  saving: boolean;
  error: string | null;
  message: string | null;
  onSave: () => void;
}

export const SubmissionArea = ({ saving, error, message, onSave }: Props) => {
  return (
    <>
      <View style={styles.statusRow}>
        {error && <Text style={styles.error}>{error}</Text>}
        {message && <Text style={styles.success}>{message}</Text>}
      </View>

      <TouchableOpacity
        style={[styles.navButton, { marginTop: 4 }]}
        onPress={onSave}
        disabled={saving}
        activeOpacity={0.85}
      >
        <Text style={styles.navButtonText}>{saving ? "Saving…" : "Save Book"}</Text>
      </TouchableOpacity>
    </>
  );
};