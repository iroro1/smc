import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import OTPTextInput from "react-native-otp-textinput";
import { colors } from "../utils/colors";

export const AppOTP = ({
  onComplete,
}: {
  onComplete: (otp: string) => void;
}) => {
  const otpInput = useRef<OTPTextInput>(null);

  const handleChange = (otp: string) => {
    if (otp.length === 4) {
      onComplete(otp);
    }
  };

  return (
    <View style={styles.container}>
      <OTPTextInput
        ref={otpInput}
        handleTextChange={handleChange}
        containerStyle={styles.otpContainer}
        textInputStyle={styles.otpInput}
        tintColor={colors.gray}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  otpContainer: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#F5F5F5",
  },
  otpInput: {
    width: 73,
    height: 73,
    fontSize: 24,
    fontWeight: "500",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    padding: 10,
  },
});
