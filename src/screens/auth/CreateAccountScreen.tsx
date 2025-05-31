import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Button,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppBackButton } from "../../components/AppBackButton";
import { AppButton } from "../../components/AppButton";
import { AppPasswordInput } from "../../components/AppPasswordInput";
import { AppTextInput } from "../../components/AppTextInput";
import { colors } from "../../utils/colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { authService } from "../../services/authService";
import Toast from "react-native-toast-message";
import tw from "twrnc";
import { useDispatch } from "react-redux";
import { setRegisterData, setUser } from "../../redux/slices/authSlice";

type RootStackParamList = {
  Main: undefined;
  CreateAccount: undefined;
  ForgotPassword: undefined;
  VerifyCode: undefined;
  Login: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const CreateAccountScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp>();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const isFormValid = () => {
    return (
      formData.fullName.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.phoneNumber.trim() !== "" &&
      formData.password.trim() !== "" &&
      formData.password.trim().length >= 8
    );
  };

  // console.log("formData", formData);

  const createAccount = async () => {
    setIsLoading(true);
    if (isFormValid()) {
      try {
        const response = await authService.register(formData);
        console.log("Registration response:", response);

        if (response?.data?.token) {
          Toast.show({
            type: "success",
            text1: "Account created successfully",
            text2: "Please check your email to verify your account",
          });
          dispatch(setUser(response.data));
          // navigation.navigate("VerifyCode");
        }
      } catch (error: Error | any) {
        console.error("Error creating account:", error);

        Toast.show({
          type: "error",
          text1: "Error creating account",
          text2: error.message,
        });
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Invalid form",
        text2:
          "Please fill in all fields and ensure password is at least 8 characters",
      });
    }

    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppBackButton />
      <Text style={styles.title}>Create Account</Text>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <KeyboardAvoidingView behavior="padding">
          <AppTextInput
            placeholder="e.g., John Doe"
            inputTitle="Full Name"
            value={formData.fullName}
            onChangeText={(text) =>
              setFormData({ ...formData, fullName: text })
            }
          />
          <AppTextInput
            inputTitle="Email Address"
            placeholder="e.g., johndoe@gmail.com"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />
          <AppTextInput
            inputTitle="Phone Number"
            placeholder="e.g., +2348060000000"
            value={formData.phoneNumber}
            onChangeText={(text) =>
              setFormData({ ...formData, phoneNumber: text })
            }
          />
          <AppPasswordInput
            inputTitle="Password"
            value={formData.password}
            onChangeText={(text) =>
              setFormData({
                ...formData,
                password: text,
                confirmPassword: text,
              })
            }
          />
          {formData.password.trim().length > 0 &&
            formData.password.trim().length < 8 && (
              <Text style={tw`text-red-500 text-[12px] mt-[-8px] mb-8`}>
                Password must be at least 8 characters
              </Text>
            )}
        </KeyboardAvoidingView>
      </ScrollView>
      <AppButton
        loading={isLoading}
        title="Create Account"
        onPress={() => createAccount()}
        disabled={!isFormValid()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 0,
    position: "relative",
    backgroundColor: colors.white,
  },
  form: {
    flex: 1,
    gap: 24,
    // marginTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 16,
  },
  subtitleContainer: {
    flexDirection: "row",
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    position: "relative",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  link: {
    color: colors.seaGreen,
    fontWeight: "600",
    // textDecorationLine: "underline",
  },
});
