import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS } from "../constants/theme";

type BookProps = {
	title: string;
	author: string;
	coverUrl?: string | null;
	isbn?: string;
	onPress?: () => void;
	onLongPress?: () => void;
	status?: string;
};

const Kbook: React.FC<BookProps> = ({ title, author, coverUrl, isbn, onPress, onLongPress, status }) => {
	const hasCover = Boolean(coverUrl);
	const statusKey = status ?? "";
	const statusColors: Record<"reading" | "paused" | "finished", string> = COLORS.status;
	const statusColor = (statusKey === "reading" || statusKey === "paused" || statusKey === "finished")
		? statusColors[statusKey]
		: COLORS.border;

	const Wrapper: React.ComponentType<any> = onPress ? TouchableOpacity : View;

	return (
		<Wrapper style={styles.card} onPress={onPress} onLongPress={onLongPress} activeOpacity={0.7}>
			<Image
				source={hasCover ? { uri: coverUrl as string } : undefined}
				style={[styles.cover, !hasCover && styles.coverPlaceholder]}
				resizeMode="cover"
			/>

			<View style={styles.info}>
				<Text style={styles.title} numberOfLines={2}>{title}</Text>
				<Text style={styles.author} numberOfLines={1}>{author}</Text>
				<View style={{ flex: 1 }} />
				{statusKey ? (
					<View style={[styles.statusPill, { borderColor: statusColor }] }>
						<Ionicons name="bookmark" size={12} color={COLORS.textPrimary} />
						<Text style={styles.statusText}>{statusKey.charAt(0).toUpperCase() + statusKey.slice(1)}</Text>
					</View>
				) : null}
			</View>

			<View style={styles.moreBtn}>
				<Ionicons name="ellipsis-vertical" size={18} color={COLORS.textSecondary} />
			</View>
		</Wrapper>
	);
};

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		paddingVertical: 16,
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: COLORS.border,
		gap: 12,
	},
	row: {
		flexDirection: "row",
		gap: 12,
	},
	cover: {
		width: 60,
		aspectRatio: 2 / 3,
		borderRadius: 4,
		backgroundColor: "#222",
	},
	coverPlaceholder: {
		alignItems: "center",
		justifyContent: "center",
	},
	placeholderText: {
		color: COLORS.textSecondary,
		fontSize: 12,
	},
	info: {
		flex: 1,
		justifyContent: "center",
		gap: 4,
	},
	title: {
		fontFamily: FONTS.sans,
		fontSize: 18,
		color: COLORS.textPrimary,
	},
	author: {
		fontFamily: FONTS.sans,
		fontSize: 14,
		color: COLORS.textSecondary,
	},
	meta: {
		fontFamily: FONTS.sans,
		fontSize: 12,
		color: COLORS.textSecondary,
	},
	statusPill: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: COLORS.surface,
		paddingVertical: 4,
		paddingHorizontal: 8,
		borderRadius: 12,
		alignSelf: "flex-start",
		gap: 4,
		borderWidth: 1,
	},
	statusText: {
		fontFamily: FONTS.sans,
		fontSize: 12,
		color: COLORS.textPrimary,
	},
	moreBtn: {
		padding: 8,
	},
});

export default Kbook;
