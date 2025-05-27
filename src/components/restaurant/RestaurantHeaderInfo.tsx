import { Call, Location } from "iconsax-react-native";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../utils/colors";

interface RestaurantHeaderInfoProps {
  name: string;
  address: string;
  phone: string;
  image: any;
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const RestaurantHeaderInfo = ({
  name,
  address,
  phone,
  image,
  categories,
  activeCategory,
  onCategoryChange,
}: RestaurantHeaderInfoProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoSection}>
        <Image source={image} style={styles.restaurantImage} />
        <Text style={styles.restaurantName}>{name}</Text>
        <View style={styles.restaurantAddressContainer}>
          <Location size={16} color={colors.gray} variant="Bold" />
          <Text style={styles.restaurantAddress}>{address}</Text>
        </View>
        <View style={styles.restaurantPhoneContainer}>
          <Call size={16} color={colors.gray} variant="Bold" />
          <Text style={styles.restaurantPhone}>{phone}</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.categoriesContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryTab,
              activeCategory === cat && styles.activeCategoryTab,
            ]}
            onPress={() => onCategoryChange(cat)}
          >
            <Text
              style={[
                styles.categoryTabText,
                activeCategory === cat && styles.activeCategoryTabText,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E5F3ED",
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    paddingBottom: 16,
  },
  infoSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 243,
    justifyContent: "center",
    alignItems: "center",
  },
  restaurantImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  restaurantName: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#1D2939",
    marginTop: 4,
  },
  restaurantAddressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  restaurantAddress: {
    color: "#475467",
    fontSize: 14,
    marginTop: 2,
  },
  restaurantPhoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  restaurantPhone: {
    color: colors.gray,
    fontSize: 13,
    marginTop: 2,
  },
  categoriesContainer: {
    marginTop: 50,
    paddingHorizontal: 16,
  },
  categoryTab: {
    height: 36,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#CCE7DB",
    marginRight: 10,
    borderColor: "#AAD8C4",
    borderWidth: 1,
  },
  activeCategoryTab: {
    backgroundColor: colors.seaGreen,
  },
  categoryTabText: {
    color: colors.seaGreen,
    fontWeight: "400",
    fontSize: 14,
  },
  activeCategoryTabText: {
    color: colors.white,
  },
});
