import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  TouchableOpacity,
} from "react-native";
import { colors } from "../utils/colors";
import { useState } from "react";
import { EyeSlash, Eye } from "iconsax-react-native";
export const AppPasswordInput = (
  props: TextInputProps & { inputTitle?: string }
) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={styles.container}>
      {props.inputTitle && (
        <Text style={styles.inputTitle}>{props.inputTitle}</Text>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          secureTextEntry={!showPassword}
          style={styles.input}
          {...props}
        />
        <TouchableOpacity
          style={styles.showPasswordButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeSlash size={24} color={colors.gray} />
          ) : (
            <Eye size={24} color={colors.gray} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    justifyContent: "center",
  },
  inputContainer: {
    position: "relative",
  },
  inputTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    height: 44,
    borderRadius: 4,
    padding: 10,
  },
  inputText: {
    fontSize: 16,
    fontWeight: "400",
  },
  showPasswordButton: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  showPasswordText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.seaGreen,
  },
});
