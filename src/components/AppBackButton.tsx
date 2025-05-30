import { ArrowLeft } from "iconsax-react-native";
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../utils/colors";
import { useNavigation } from "@react-navigation/native";

export const AppBackButton = ({
  variant = 1,
  size = 24,
  route,
}: {
  variant?: number;
  size?: number;
  route?: string;
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[
        styles.backButton,
        { backgroundColor: variant === 2 ? "transparent" : "#F2F4F7" },
      ]}
      onPress={() =>
        route?.length > 0
          ? navigation.navigate(route as any)
          : navigation.goBack()
      }
    >
      <ArrowLeft color={colors.black} size={size} />
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
