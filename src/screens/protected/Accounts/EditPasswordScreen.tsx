import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../../utils/colors";
import { ArrowLeft } from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";
import { AppPasswordInput } from "../../../components/AppPasswordInput";
import { useState } from "react";
import { AppButton } from "../../../components/AppButton";
import { AppOTP } from "../../../components/AppOTP";

export default function EditPasswordScreen() {
  const navigation = useNavigation();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const handleVerifyOTP = (code: string) => {
    // TODO: Implement actual OTP verification
    setOtp(code);
    setIsVerified(true);
    setShowForgotPasswordModal(false);
  };

  const handleSaveChanges = () => {
    // TODO: Implement password change logic
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          padding: 16,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color={colors.gray} />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: "500", color: colors.black }}>
          Change password
        </Text>
      </View>

      <ScrollView style={{ padding: 16 }}>
        <AppPasswordInput
          inputTitle="Current password"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          placeholder="Enter your current password"
        />
        <AppPasswordInput
          inputTitle="New password"
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="Enter your new password"
        />
        <AppPasswordInput
          inputTitle="Confirm new password"
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
          placeholder="Confirm your new password"
        />

        <TouchableOpacity
          onPress={() => setShowForgotPasswordModal(true)}
          style={styles.forgotPassword}
        >
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={{ padding: 16 }}>
        <AppButton title="Save changes" onPress={handleSaveChanges} />
      </View>

      {/* Forgot Password Modal */}
      <Modal
        visible={showForgotPasswordModal}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter verification code</Text>
            <Text style={styles.modalDescription}>
              Enter the code sent to your email address
            </Text>
            <View style={styles.otpContainer}>
              <AppOTP
                onComplete={handleVerifyOTP}
                containerStyle={{
                  backgroundColor: "transparent",
                  padding: 0,
                }}
              />
            </View>
            <AppButton
              title="Verify code"
              onPress={() => handleVerifyOTP(otp)}
              style={styles.modalButton}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    marginTop: 16,
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: colors.seaGreen,
    fontSize: 14,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    width: "90%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 10,
    textAlign: "center",
  },
  modalDescription: {
    fontSize: 16,
    textAlign: "center",
    color: colors.gray,
    marginTop: 10,
  },
  otpContainer: {
    height: 80,
    marginBottom: 60,
  },
  modalButton: {
    marginTop: 10,
  },
});
