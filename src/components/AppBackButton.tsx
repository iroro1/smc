import { ArrowLeft } from "iconsax-react-native";
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../utils/colors";
import { useNavigation } from "@react-navigation/native";

export const AppBackButton = ({ variant = 1 }: { variant?: number }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[
        styles.backButton,
        { backgroundColor: variant === 2 ? "transparent" : "#F2F4F7" },
      ]}
      onPress={() => navigation.goBack()}
    >
      <ArrowLeft color={colors.black} size={24} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: "#F2F4F7",
    borderRadius: 20,
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
