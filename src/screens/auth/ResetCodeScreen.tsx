import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppBackButton } from "../../components/AppBackButton";
import { AppTextInput } from "../../components/AppTextInput";
import { AppButton } from "../../components/AppButton";
import { AppOTP } from "../../components/AppOTP";
import { useNavigation } from "@react-navigation/native";
export const ResetCodeScreen = () => {
  const navigation = useNavigation();

  const verifyCode = () => {
    navigation.navigate("SetNewPassword" as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppBackButton />
      <View style={styles.content}>
        <Text style={styles.title}>Enter reset code</Text>
        <Text style={styles.description}>
          Enter the code sent to your email address
        </Text>
        <View style={styles.form}>
          <AppOTP onComplete={verifyCode} />
        </View>
      </View>
      <AppButton title="Verify code" onPress={verifyCode} />
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
    marginTop: 32,
  },
});
