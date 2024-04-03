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
import { Link, useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";

const Page = () => {
	const [countryCode, setCountryCode] = useState("+91");
	const [phoneNumber, setPhoneNumber] = useState("");
	const router = useRouter();
	const { signUp } = useSignUp();

	const onSignup = async () => {
		const fullPhoneNumber = `${countryCode}${phoneNumber}`;
		try {
			await signUp!.create({
				phoneNumber: fullPhoneNumber,
			});
			signUp!.preparePhoneNumberVerification();
			router.push({
				pathname: "/verify/[phone]",
				params: { phone: fullPhoneNumber },
			});
		} catch (error) {
			console.error("Sign up failed", error);
		}
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
						onChangeText={setCountryCode}
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
