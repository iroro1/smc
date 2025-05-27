import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../utils/colors";

export interface MenuItemProps {
  id: number;
  name: string;
  desc: string;
  price: number;
  time: number;
  image: any;
  onAddToCart?: () => void;
  onPress?: () => void;
}

export const MenuItem = ({
  name,
  desc,
  price,
  time,
  image,
  onAddToCart,
  onPress,
}: MenuItemProps) => {
  return (
    <TouchableOpacity
      style={styles.menuCard}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image source={image} style={styles.menuImage} />
      <View style={[styles.menuInfo, { height: "100%" }]}>
        <Text style={styles.menuName}>{name}</Text>
        <Text style={styles.menuDesc} numberOfLines={2}>
          {desc}
        </Text>
        <View style={styles.menuMeta}>
          <Text style={styles.menuTime}>⏱ {time} mins</Text>
          <View
            style={{
              backgroundColor: colors.seaGreen + "70",
              width: 4,
              height: 4,
              borderRadius: 1,
              marginHorizontal: 8,
            }}
          />
          <Text style={styles.menuPrice}>₦{price.toLocaleString()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: colors.white,
    borderRadius: 14,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1,
    borderColor: "#EAECF0",
    position: "relative",
    height: 120,
    marginHorizontal: 16,
  },
  menuImage: {
    width: 120,
    height: 120,
    marginRight: 12,
    resizeMode: "cover",
  },
  menuInfo: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  menuName: {
    fontWeight: "600",
    fontSize: 16,
    color: "#1D2939",
  },
  menuDesc: {
    color: "#475467",
    fontSize: 13,
    marginTop: 2,
  },
  menuMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    // gap: 12,
    // backgroundColor: "red",
  },
  menuTime: {
    color: colors.seaGreen,
    fontSize: 13,
    // marginRight: 12,
  },
  menuPrice: {
    color: colors.seaGreen,
    fontWeight: "bold",
    fontSize: 13,
  },
  menuAddBtn: {
    marginLeft: 8,
    marginTop: 8,
  },
});
