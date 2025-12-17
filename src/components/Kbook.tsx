import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type BookProps = {
	title: string;
	author: string;
	coverUrl?: string | null;
	isbn?: string;
	onPress?: () => void;
	onLongPress?: () => void;
	status?: string;
};

const statusLabels: Record<string, string> = {
	reading: "Reading",
	paused: "Paused",
	finished: "Finished",
};

const statusColors: Record<string, string> = {
	reading: "#2563eb",
	paused: "#d97706",
	finished: "#16a34a",
};

const Kbook: React.FC<BookProps> = ({ title, author, coverUrl, isbn, onPress, onLongPress, status }) => {
	const hasCover = Boolean(coverUrl);
	const statusKey = status ?? "";

	const Wrapper: React.ComponentType<any> = onPress ? TouchableOpacity : View;

	return (
		<Wrapper style={styles.card} onPress={onPress} onLongPress={onLongPress} activeOpacity={0.85}>
			<View style={styles.row}>
				{hasCover ? (
					<Image
						source={{ uri: coverUrl as string }}
						style={styles.cover}
						resizeMode="cover"
					/>
				) : (
					<View style={[styles.cover, styles.coverPlaceholder]}>
						<Text style={styles.placeholderText}>No Cover</Text>
					</View>
				)}

				<View style={styles.info}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.author}>{author}</Text>
					{isbn ? <Text style={styles.meta}>ISBN: {isbn}</Text> : null}
					{statusKey ? (
						<Text style={[styles.status, { color: statusColors[statusKey] ?? "#374151" }]}>
							{statusLabels[statusKey] ?? statusKey}
						</Text>
					) : null}
				</View>
			</View>
		</Wrapper>
	);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#fff",
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "#e4e4e4",
		padding: 12,
		marginBottom: 12,
	},
	row: {
		flexDirection: "row",
		gap: 12,
	},
	cover: {
		width: 80,
		height: 110,
		borderRadius: 8,
		backgroundColor: "#f0f0f0",
		borderWidth: 1,
		borderColor: "#dedede",
	},
	coverPlaceholder: {
		alignItems: "center",
		justifyContent: "center",
	},
	placeholderText: {
		color: "#777",
		fontSize: 12,
	},
	info: {
		flex: 1,
		justifyContent: "center",
		gap: 4,
	},
	title: {
		fontSize: 16,
		fontWeight: "700",
		color: "#111",
	},
	author: {
		fontSize: 14,
		color: "#444",
	},
	meta: {
		fontSize: 12,
		color: "#666",
	},
	status: {
		fontSize: 12,
		fontWeight: "700",
	},
});

export default Kbook;
