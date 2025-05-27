import { useRef } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import OTPTextInput from "react-native-otp-textinput";
import { colors } from "../utils/colors";

export const AppOTP = ({
  onComplete,
  numberOfDigits = 4,
  containerStyle,
}: {
  onComplete: (otp: string) => void;
  numberOfDigits?: number;
  containerStyle?: StyleProp<ViewStyle>;
}) => {
  const otpInput = useRef<OTPTextInput>(null);

  const handleChange = (otp: string) => {
    if (otp.length === numberOfDigits) {
      onComplete(otp);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
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
    gap: 16,
    backgroundColor: "red",
  },
  otpContainer: {
    width: "100%",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "transparent",
  },
  otpInput: {
    width: 65,
    height: 65,
    fontSize: 20,
    fontWeight: "500",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    padding: 10,
  },
});
