import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppBackButton } from "../../components/AppBackButton";
import { AppTextInput } from "../../components/AppTextInput";
import { AppButton } from "../../components/AppButton";
import { useNavigation } from "@react-navigation/native";
import { authService } from "../../services/authService";
import Toast from "react-native-toast-message";

interface ResetCodeParams {
  email: string;
}

const ForgotPasswordScreen = () => {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation();

  const getResetCode = async () => {
    if (email.trim() === "") {
      Toast.show({
        type: "error",
        text1: "Email is required",
        text2: "Please enter your email address",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await authService.forgotPassword({ email });
      console.log("response", response);

      if (response.status.toLowerCase() === "success") {
        Toast.show({
          type: "success",
          text1: response.data,
          text2: response.message,
        });

        navigation.navigate("ResetCode" as never, { email } as never);
      }
    } catch (error: any) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Error getting reset code",
        text2: error.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppBackButton />
      <View style={styles.content}>
        <Text style={styles.title}>Forgot your password?</Text>
        <Text style={styles.description}>
          Don’t worry. We can help with that. Simply enter your email address
          below.
        </Text>
        <View style={styles.form}>
          <AppTextInput
            inputTitle="Email address"
            placeholder="e.g., johndoe@example.com"
            value={email}
            onChangeText={(text) => setEmail(text.toLowerCase())}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>
      <AppButton
        title="Get reset code"
        onPress={getResetCode}
        loading={loading}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 10,
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  form: {
    width: "100%",
  },
});

export default ForgotPasswordScreen;
