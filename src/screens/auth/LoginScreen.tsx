import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";
import { AppBackButton } from "../../components/AppBackButton";
import { colors } from "../../utils/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppTextInput } from "../../components/AppTextInput";
import { AppButton } from "../../components/AppButton";
import { AppPasswordInput } from "../../components/AppPasswordInput";
import { authService } from "../../services/authService";
import Toast from "react-native-toast-message";

type RootStackParamList = {
  Main: undefined;
  CreateAccount: undefined;
  ForgotPassword: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    // TODO: Replace with actual login logic
    try {
      const response = await authService.login({ email, password });
      if (response?.data?.token) {
        dispatch(setUser(response.data));
        Toast.show({
          type: "success",
          text1: "Login successful",
          text2: "You are now logged in",
        });
        navigation.navigate("Main");
      }
    } catch (error: Error | any) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Login failed",
        text2: error.message,
        // text2: "Please try again",
      });
    }
    setIsLoading(false);
  };

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  return (
    <SafeAreaView style={styles.container}>
      <AppBackButton />
      <Text style={styles.title}>Login</Text>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
          <Text style={styles.link}>Create Account</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.form}>
        <AppTextInput
          placeholder="e.g., johndoe@gmail.com"
          inputTitle="Email Address"
          value={email}
          onChangeText={setEmail}
        />
        <AppPasswordInput
          inputTitle="Password"
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPassword")}
          style={styles.forgotPassword}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </ScrollView>
      <AppButton
        title="Login"
        onPress={handleLogin}
        disabled={!isFormValid}
        loading={isLoading}
        style={{
          marginBottom: 30,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    position: "relative",
    backgroundColor: colors.white,
  },
  button: {
    backgroundColor: "#FF4D00",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  form: {
    gap: 12,
    height: "80%",
    // marginTop: 32,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    // marginBottom: 8,
    marginTop: 16,
  },
  subtitleContainer: {
    flexDirection: "row",
    marginBottom: 24,
    gap: 4,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    position: "relative",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    color: colors.seaGreen,
    fontWeight: "600",
  },
  forgotPassword: {
    alignSelf: "flex-start",
    // marginTop: 16,
  },
  forgotPasswordText: {
    color: colors.seaGreen,
    fontWeight: "600",
  },
});
