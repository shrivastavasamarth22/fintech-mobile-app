import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

type Props = {
	text: string;
	icon: typeof Ionicons.defaultProps;
	onPress?: () => void;
};

const RoundBtn = ({ text, icon, onPress }: Props) => {
	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<View style={styles.circle}>
				<Ionicons name={icon} size={30} color={Colors.dark} />
			</View>
			<Text style={styles.label}>{text}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		gap: 10,
	},
	circle: {
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: Colors.lightGray,
		alignItems: "center",
		justifyContent: "center",
	},
	label: {
		fontSize: 16,
		fontWeight: "500",
		color: Colors.dark,
	},
});

export default RoundBtn;
