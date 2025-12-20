import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { COLORS } from "../../../constants/theme";
import type { BookWithOptionalMeta } from "../logic";
import { styles } from "../styles";

interface Props {
  book: BookWithOptionalMeta;
}

export const BookHeader = ({ book }: Props) => {
  return (
    <View style={styles.card}>
      <View style={styles.sectionHeader}>
        <View style={{ flex: 1, gap: 4 }}>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.subtitle}>{book.author}</Text>
        </View>
        {book.status ? (
          <View
            style={[
              styles.statusPill,
              { borderColor: COLORS.status[book.status], backgroundColor: COLORS.surface },
            ]}
          >
            <Text style={styles.statusPillText}>{book.status}</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.metaRow}>
        {book.isbn ? <Text style={styles.meta}>ISBN • {book.isbn}</Text> : null}
        {typeof book.pages === "number" && book.pages > 0 ? (
          <Text style={styles.meta}>Pages • {book.pages}</Text>
        ) : null}
      </View>

      <Link href={`/book/edit/${book.id}`} style={styles.editLink}>
        Edit book →
      </Link>
    </View>
  );
};