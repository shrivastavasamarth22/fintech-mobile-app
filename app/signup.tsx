import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";

const Page = () => {
	const [countryCode, setCountryCode] = useState("+91");
	const [phoneNumber, setPhoneNumber] = useState("");

	const onSignup = async () => {
		// TODO: Implement signup with clerk
	};

	const checkPhoneNumber = () => {
		if (phoneNumber.length !== 10) {
			return false;
		}
		return true;
	};

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior="padding"
			keyboardVerticalOffset={80}
		>
			<View style={defaultStyles.container}>
				<Text style={defaultStyles.header}>Let's get started!</Text>
				<Text style={defaultStyles.descriptionText}>
					Enter your phone number. We will send you a confirmation code there.
				</Text>
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						placeholder="Country Code"
						placeholderTextColor={Colors.gray}
						keyboardType="numeric"
						value={countryCode}
					/>
					<TextInput
						style={[styles.input, { flex: 1, alignItems: "center" }]}
						placeholder="Mobile Number"
						placeholderTextColor={Colors.gray}
						keyboardType="phone-pad"
						value={phoneNumber}
						onChangeText={setPhoneNumber}
					/>
				</View>

				<Link href="/login" replace asChild>
					<TouchableOpacity>
						<Text style={defaultStyles.textLink}>
							Already have an account? Log in.
						</Text>
					</TouchableOpacity>
				</Link>

				<View style={{ flex: 1 }} />
				<TouchableOpacity
					style={[
						defaultStyles.pillButton,
						checkPhoneNumber() ? styles.enabled : styles.disabled,
						{ marginBottom: 20 },
					]}
					onPress={onSignup}
				>
					<Text style={defaultStyles.buttonText}>Sign Up</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		marginVertical: 30,
		flexDirection: "row",
		columnGap: 10,
	},
	input: {
		backgroundColor: Colors.lightGray,
		padding: 20,
		borderRadius: 16,
		fontSize: 20,
	},
	enabled: {
		backgroundColor: Colors.primary,
	},
	disabled: {
		backgroundColor: Colors.primaryMuted,
	},
});

export default Page;
