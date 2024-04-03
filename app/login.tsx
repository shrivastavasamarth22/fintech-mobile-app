import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
	Alert,
} from "react-native";
import React, { useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";

enum SignInType {
	Phone,
	Email,
	Google,
	Apple,
}

const Page = () => {
	const [countryCode, setCountryCode] = useState("+91");
	const [phoneNumber, setPhoneNumber] = useState("");
	const router = useRouter();
	const { signIn } = useSignIn();

	const onSignIn = async (type: SignInType) => {
		if (type === SignInType.Phone) {
			try {
				const fullPhoneNumber = `${countryCode}${phoneNumber}`;
				const { supportedFirstFactors } = await signIn!.create({
					identifier: fullPhoneNumber,
				});

				const firstPhoneFactor: any = supportedFirstFactors.find(
					(factor: any) => {
						return factor.strategy === "phone_code";
					}
				);

				const { phoneNumberId } = firstPhoneFactor;

				await signIn!.prepareFirstFactor({
					strategy: "phone_code",
					phoneNumberId,
				});

				router.push({
					pathname: "/verify/[phone]",
					params: { phone: fullPhoneNumber, signin: "true" },
				});
			} catch (error) {
				console.log("error", JSON.stringify(error, null, 2));
				if (isClerkAPIResponseError(error)) {
					if (error.errors[0].code === "form_identifier_not_found") {
						Alert.alert("Error", error.errors[0].message);
					}
				}
			}
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
				<Text style={defaultStyles.header}>Welcome Back</Text>
				<Text style={defaultStyles.descriptionText}>
					Enter the phone number associated with your account.
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
				<TouchableOpacity
					style={[
						defaultStyles.pillButton,
						checkPhoneNumber() ? styles.enabled : styles.disabled,
						{ marginBottom: 20 },
					]}
					onPress={() => onSignIn(SignInType.Phone)}
				>
					<Text style={defaultStyles.buttonText}>Continue</Text>
				</TouchableOpacity>

				<View style={styles.dividerContainer}>
					<View style={styles.divider} />
					<Text style={styles.dividerText}>or</Text>
					<View style={styles.divider} />
				</View>

				<TouchableOpacity
					style={[
						defaultStyles.pillButton,
						{
							flexDirection: "row",
							gap: 16,
							marginTop: 20,
							backgroundColor: "#fff",
						},
					]}
					onPress={() => onSignIn(SignInType.Email)}
				>
					<Ionicons name="mail" size={24} color={"#000"} />
					<Text style={[defaultStyles.buttonText, { color: "#000" }]}>
						Continue with email
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[
						defaultStyles.pillButton,
						{
							flexDirection: "row",
							gap: 16,
							marginTop: 20,
							backgroundColor: "#fff",
						},
					]}
					onPress={() => onSignIn(SignInType.Google)}
				>
					<Ionicons name="logo-google" size={24} color={"#000"} />
					<Text style={[defaultStyles.buttonText, { color: "#000" }]}>
						Continue with Google
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[
						defaultStyles.pillButton,
						{
							flexDirection: "row",
							gap: 16,
							marginTop: 20,
							backgroundColor: "#fff",
						},
					]}
					onPress={() => onSignIn(SignInType.Apple)}
				>
					<Ionicons name="logo-apple" size={24} color={"#000"} />
					<Text style={[defaultStyles.buttonText, { color: "#000" }]}>
						Continue with Apple
					</Text>
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
	dividerContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 16,
	},
	divider: {
		flex: 1,
		height: StyleSheet.hairlineWidth,
		backgroundColor: Colors.gray,
	},
	dividerText: {
		fontSize: 20,
		color: Colors.gray,
		fontWeight: "500",
	},
});

export default Page;
