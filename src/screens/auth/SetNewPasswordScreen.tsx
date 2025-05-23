import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppBackButton } from "../../components/AppBackButton";
import { AppButton } from "../../components/AppButton";
import { useNavigation } from "@react-navigation/native";
import { AppPasswordInput } from "../../components/AppPasswordInput";
import { useState } from "react";
import { colors } from "../../utils/colors";
import { TickCircle } from "iconsax-react-native";

export const SetNewPasswordScreen = () => {
  const navigation = useNavigation();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const handleSetNewPassword = () => {
    if (newPassword === confirmNewPassword) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppBackButton />
      <View style={styles.content}>
        <Text style={styles.title}>Set New Password</Text>
        <Text style={styles.description}>
          Set a new password that you can easily remember using the fields
          below.
        </Text>
        <View style={styles.form}>
          <AppPasswordInput
            inputTitle="New password"
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <AppPasswordInput
            inputTitle="Confirm new password"
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
          />
        </View>
      </View>
      <AppButton title="Reset password" onPress={handleSetNewPassword} />

      {/* Modal for success  */}
      {/* {success && ( */}
      <Modal
        visible={success}
        transparent={true}
        animationType="fade"
        style={styles.modal}
      >
        <TouchableWithoutFeedback
          // onPress={() => setSuccess(false)}
          style={styles.modal}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalContentInner}>
              <TickCircle
                size={72}
                color={"#12B76A"}
                variant="Bold"
                style={styles.modalIcon}
              />
              <Text style={styles.modalTitle}>Password reset successfully</Text>
              <Text style={styles.modalDescription}>
                Your password has been changed successfully. Tap the button
                below to login to your account.
              </Text>
              <AppButton
                title="Go to login"
                onPress={() => {
                  setSuccess(false);
                  navigation.navigate("Login");
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {/* )} */}
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
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 32,
  },
  form: {
    width: "100%",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
    // width: "100%",
    height: "100%",
    backgroundColor: colors.black + "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContentInner: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    height: 280,
    marginHorizontal: "auto",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  modalDescription: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 32,
    color: "#475467",
    fontWeight: "400",
    width: 330,
    lineHeight: 20,
  },
  modalIcon: {
    marginBottom: 16,
    alignSelf: "center",
  },
});
