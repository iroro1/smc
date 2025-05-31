import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppBackButton } from "../../components/AppBackButton";
import { AppTextInput } from "../../components/AppTextInput";
import { AppButton } from "../../components/AppButton";
import { AppOTP } from "../../components/AppOTP";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/RootNavigation";
import { authService } from "../../services/authService";
import Toast from "react-native-toast-message";

interface ResetCodeProps {
  route: RouteProp<RootStackParamList, "ResetCode">;
}

export const ResetCodeScreen = ({ route }: ResetCodeProps) => {
  const navigation = useNavigation();
  const { email } = route.params;
  const [code, setCode] = React.useState("");
  const [isCodeValid, setIsCodeValid] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  console.log("email", email);

  const verifyCode = async () => {
    setIsLoading(true);
    try {
      const response = await authService.confirmToken({
        email,
        code,
      });
      console.log("response", response);

      if (response.status.toLowerCase() === "success") {
        Toast.show({
          type: "success",
          text1: response.data,
          text2: response.message,
        });
        navigation.navigate("SetNewPassword", { email });
      }
    } catch (error: Error | any) {
      Toast.show({
        type: "error",
        text1: "Error verifying code",
        text2: error.message,
      });
      console.log("error", error);
    }
    setIsLoading(false);
    // navigation.navigate("SetNewPassword" as never);
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
          <AppOTP
            onComplete={(code) => {
              setCode(code);
              code.length === 4 ? setIsCodeValid(true) : setIsCodeValid(false);
            }}
          />
        </View>
      </View>
      <AppButton
        title="Verify code"
        onPress={verifyCode}
        loading={isLoading}
        disabled={!isCodeValid}
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
    marginTop: 32,
  },
});
