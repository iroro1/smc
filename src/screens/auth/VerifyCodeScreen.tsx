import React, { useState } from "react";
import { ActivityIndicator, Modal, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppBackButton } from "../../components/AppBackButton";
import { AppButton } from "../../components/AppButton";
import { AppOTP } from "../../components/AppOTP";
import { colors } from "../../utils/colors";
import { TickCircle } from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";

export const VerifyCodeScreen = () => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleVerifyCode = () => {
    setIsLoading(true);
    console.log("otp", otp);
    setError("Invalid code");
    setSuccess("Code verified successfully");
    setIsVerified(true);
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppBackButton />
      <View style={styles.content}>
        <Text style={styles.title}>Verification code</Text>
        <Text style={styles.description}>
          Enter the code sent to your email address
        </Text>
        <View>
          <AppOTP
            onComplete={(e) => {
              console.log("complete", e);
              setOtp(e);
            }}
          />
        </View>
      </View>
      <AppButton
        title="Verify code"
        onPress={handleVerifyCode}
        disabled={otp.length !== 4}
        style={{
          backgroundColor: otp.length !== 4 ? colors.gray : colors.seaGreen,
          opacity: otp.length !== 4 ? 0.5 : 1,
        }}
      />

      {/* {isVerified && <Text style={styles.error}>{error}</Text>} */}
      {isLoading && (
        <ActivityIndicator style={styles.loading} color={colors.seaGreen} />
      )}
      {/* {isVerified && <Text style={styles.success}>{success}</Text>} */}
      {isVerified && (
        <Modal visible={isVerified} transparent={true} animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TickCircle size={72} variant="Bold" color={"#12B76A"} />
              <Text style={styles.modalTitle}>
                Account verified successfully
              </Text>
              <Text style={styles.modalDescription}>
                You can now login to your account
              </Text>
              <AppButton
                title="Go to login"
                onPress={() => {
                  setIsVerified(false);
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "Login" as never }],
                  });
                }}
                style={styles.modalButton}
              />
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
  },
  content: {
    flex: 0.9,
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
    paddingHorizontal: 16,
    marginTop: 32,
  },
  error: {
    color: colors.red,
    marginTop: 10,
  },
  loading: {
    marginTop: 10,
  },
  success: {
    color: colors.seaGreen,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 10,
    marginTop: 20,
    textAlign: "center",
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButton: {
    marginTop: 20,
    width: "100%",
  },
});
