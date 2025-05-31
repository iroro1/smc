import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  StyleProp,
  ActivityIndicator,
} from "react-native";
import { colors } from "../utils/colors";

interface AppButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  loading?: boolean;
}

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  style,
  disabled,
  loading,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        {
          opacity: disabled ? 0.5 : 1,
          backgroundColor: disabled ? colors.gray : colors.seaGreen,
        },
        style,
      ]}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
      {loading && (
        <ActivityIndicator
          style={{ marginLeft: 10 }}
          size="small"
          color={colors.white}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.seaGreen,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    flexDirection: "row",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
