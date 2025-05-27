import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../../utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export const AppCheckBox = ({
  label,
  checked,
  onPress,
}: {
  label: string;
  checked: boolean;
  onPress: () => void;
}) => {
  const [isChecked, setIsChecked] = useState(checked);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
        {isChecked ? (
          <View style={styles.checkbox}>
            <Ionicons name="checkmark" size={16} color={colors.white} />
          </View>
        ) : (
          <View style={[styles.checkbox, { backgroundColor: colors.white }]} />
        )}
      </TouchableOpacity>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.gray,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.seaGreen,
  },
  label: {
    fontSize: 14,
    fontWeight: "400",
    color: "#475467",
  },
});
