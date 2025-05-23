import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppBackButton } from "../../components/AppBackButton";
import { AppTextInput } from "../../components/AppTextInput";
import { AppButton } from "../../components/AppButton";
import { useNavigation } from "@react-navigation/native";

export const ForgotPasswordScreen = () => {
  const navigation = useNavigation();

  const getResetCode = async () => {
    navigation.navigate("ResetCode" as never);
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
          />
        </View>
      </View>
      <AppButton title="Get reset code" onPress={getResetCode} />
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
