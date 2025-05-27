import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../../utils/colors";
import { RestaurantHeader } from "../../../components/restaurant/RestaurantHeader";
import { RestaurantHeaderInfo } from "../../../components/restaurant/RestaurantHeaderInfo";
import {
  MenuItem,
  MenuItemProps,
} from "../../../components/restaurant/MenuItem";
import { Ionicons } from "@expo/vector-icons";
import { Clock } from "iconsax-react-native";

const heroImage = require("../../../../assets/images/orders/jollof-rice.png");

const categories = [
  "All",
  "Main dishes",
  "Swallows",
  "Sides",
  "Proteins",
  "Soups",
];

const menuData: Record<string, MenuItemProps[]> = {
  "Main dishes": [
    {
      id: 1,
      name: "Smoky jollof rice",
      desc: "Our signature smoky jollof rice. Prepared traditionally with smoked peppers.",
      price: 1200,
      time: 25,
      image: require("../../../../assets/images/orders/jollof-rice.png"),
    },
    {
      id: 2,
      name: "Fried rice",
      desc: "Our signature smokey jollof rice. Prepared traditionally with smoked peppers.",
      price: 1300,
      time: 25,
      image: require("../../../../assets/images/orders/fried-rice.png"),
    },
    {
      id: 3,
      name: "Basmati rice",
      desc: "Our signature smokey jollof rice. Prepared traditionally with smoked peppers.",
      price: 1300,
      time: 25,
      image: require("../../../../assets/images/orders/fried-rice.png"),
    },
    {
      id: 4,
      name: "Mexican rice",
      desc: "Our signature smokey jollof rice. Prepared traditionally with smoked peppers.",
      price: 1300,
      time: 25,
      image: require("../../../../assets/images/orders/fried-rice.png"),
    },
    {
      id: 5,
      name: "Ewa Agoin",
      desc: "Our signature smokey jollof rice. Prepared traditionally with smoked peppers.",
      price: 1300,
      time: 25,
      image: require("../../../../assets/images/orders/ewa-agoin.png"),
    },
  ],
  Swallows: [
    {
      id: 6,
      name: "White eba",
      desc: "White eba prepared lovingly.",
      price: 400,
      time: 25,
      image: require("../../../../assets/images/orders/eba.png"),
    },
    {
      id: 7,
      name: "Yellow eba",
      desc: "Yellow eba prepared lovingly.",
      price: 400,
      time: 25,
      image: require("../../../../assets/images/orders/eba.png"),
    },
    {
      id: 8,
      name: "Pounded yam",
      desc: "Soft, light pounded yam.",
      price: 500,
      time: 25,
      image: require("../../../../assets/images/orders/eba.png"),
    },
    {
      id: 9,
      name: "Amala",
      desc: "Soft, light amala. Made from yam flour.",
      price: 500,
      time: 25,
      image: require("../../../../assets/images/orders/eba.png"),
    },
    {
      id: 10,
      name: "Semolina",
      desc: "Very fluffy semolina.",
      price: 500,
      time: 25,
      image: require("../../../../assets/images/orders/eba.png"),
    },
  ],
  Sides: [
    {
      id: 11,
      name: "Plantain",
      desc: "Fried ripe plantains.",
      price: 300,
      time: 25,
      image: require("../../../../assets/images/orders/plantains.png"),
    },
    {
      id: 12,
      name: "Coleslaw",
      desc: "Vegetable salad with mayonnaise.",
      price: 500,
      time: 25,
      image: require("../../../../assets/images/orders/plantains.png"),
    },
    {
      id: 13,
      name: "Moi moi",
      desc: "Delicious bean pudding (moi moi).",
      price: 600,
      time: 25,
      image: require("../../../../assets/images/orders/plantains.png"),
    },
  ],
};

const sidesOptions = [
  { id: 1, name: "Coleslaw", price: 500 },
  { id: 2, name: "Moin Moin", price: 3200 },
  { id: 3, name: "Fried plantains", price: 400 },
];
const proteinsOptions = [
  { id: 1, name: "Grilled Turkey", price: 3200 },
  { id: 2, name: "Barbeque chicken", price: 500 },
  { id: 3, name: "Regular chicken", price: 1000 },
  { id: 4, name: "Croaker fish", price: 3200 },
  { id: 5, name: "Titus fish", price: 1000 },
];
const drinksOptions = [
  { id: 1, name: "Coke", price: 400 },
  { id: 2, name: "5 Alive Pulpy", price: 800 },
  { id: 3, name: "Fanta", price: 400 },
  { id: 4, name: "Sprite", price: 400 },
  { id: 5, name: "Chivita Active", price: 1200 },
];

export const RestaurantMenu = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [showBanner, setShowBanner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItemProps | null>(null);
  const [selectedSide, setSelectedSide] = useState<number | null>(null);
  const [selectedProteins, setSelectedProteins] = useState<number[]>([]);
  const [selectedDrink, setSelectedDrink] = useState<number | null>(null);

  useEffect(() => {
    setLoading(false);
    setShowBanner(false);
  }, []);

  const handleAddToCart = (item: MenuItemProps) => {
    // Implement add to cart functionality
    console.log("Adding to cart:", item);
  };
  const handlePress = (item: MenuItemProps) => {
    console.log("Pressing:", item);
    setSelectedItem(item);
  };
  return (
    <SafeAreaView style={styles.container}>
      <RestaurantHeader title="Restaurant Menu" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {showBanner && (
          <View style={styles.bannerContainer}>
            <Text style={styles.bannerText}>20% off orders above ₦20,000</Text>
            <Image source={heroImage} style={styles.bannerImage} />
          </View>
        )}

        <RestaurantHeaderInfo
          name="Genesis Foods"
          address="24b Admiralty Way, Lekki"
          phone="+234 8163 344 486"
          image={heroImage}
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <View style={styles.menuSection}>
          {loading ? (
            <ActivityIndicator color={colors.seaGreen} size="large" />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : activeCategory === "All" ? (
            Object.entries(menuData).map(([category, items]) => (
              <View key={category}>
                <Text style={styles.sectionTitle}>{category}</Text>
                {items.map((item) => (
                  <MenuItem
                    key={item.id}
                    {...item}
                    onAddToCart={() => handleAddToCart(item)}
                    onPress={() => handlePress(item)}
                  />
                ))}
              </View>
            ))
          ) : (
            <View style={{ paddingTop: 16 }}>
              {menuData[activeCategory]?.map((item) => (
                <MenuItem
                  key={item.id}
                  {...item}
                  onAddToCart={() => handleAddToCart(item)}
                  onPress={() => handlePress(item)}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <Modal
        visible={!!selectedItem}
        onRequestClose={() => setSelectedItem(null)}
        transparent={true}
      >
        <TouchableWithoutFeedback onPress={() => setSelectedItem(null)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                  }}
                >
                  <TouchableWithoutFeedback onPress={() => {}}>
                    <ScrollView style={{ flex: 1 }}>
                      <Image
                        source={selectedItem?.image}
                        style={{
                          width: "100%",
                          height: 240,
                          resizeMode: "cover",
                          borderRadius: 12,
                        }}
                      />
                      <View
                        style={{
                          flex: 1,
                          marginTop: 24,
                          width: "100%",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            color: "#1D2939",
                          }}
                        >
                          {selectedItem?.name}
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 4,
                            marginVertical: 6,
                          }}
                        >
                          <Clock size={16} color={colors.gray} />
                          <Text
                            style={{
                              fontSize: 14,
                              color: "#475467",
                              marginLeft: 4,
                            }}
                          >
                            Preparation time: {selectedItem?.time} minutes
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontSize: 14,
                            color: "#475467",
                          }}
                        >
                          {selectedItem?.desc}
                        </Text>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            color: colors.seaGreen,
                            marginTop: 16,
                          }}
                        >
                          ₦{selectedItem?.price?.toLocaleString()}
                        </Text>
                      </View>
                      <View style={{ marginTop: 24 }}>
                        {/* SIDES */}
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: 16,
                            color: "#475467",
                            marginBottom: 4,
                          }}
                        >
                          SIDES{" "}
                          <Text style={{ color: colors.red, fontSize: 12 }}>
                            Required
                          </Text>
                          <Text style={{ color: colors.gray, fontSize: 12 }}>
                            {" "}
                            Select 1
                          </Text>
                        </Text>
                        {sidesOptions.map((option) => (
                          <TouchableOpacity
                            key={option.id}
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              marginVertical: 8,
                            }}
                            onPress={() => setSelectedSide(option.id)}
                          >
                            <View
                              style={{
                                width: 20,
                                height: 20,
                                borderRadius: 10,
                                borderWidth: 2,
                                borderColor:
                                  selectedSide === option.id
                                    ? colors.seaGreen
                                    : "#ccc",
                                alignItems: "center",
                                justifyContent: "center",
                                marginRight: 12,
                              }}
                            >
                              {selectedSide === option.id && (
                                <View
                                  style={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: 6,
                                    backgroundColor: colors.seaGreen,
                                  }}
                                />
                              )}
                            </View>
                            <Text style={{ flex: 1 }}>{option.name}</Text>
                            <Text>₦{option.price.toLocaleString()}</Text>
                          </TouchableOpacity>
                        ))}
                        {/* PROTEINS */}
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: 16,
                            color: "#475467",
                            marginTop: 20,
                            marginBottom: 4,
                          }}
                        >
                          PROTEINS{" "}
                          <Text style={{ color: colors.gray, fontSize: 12 }}>
                            Select up to 2
                          </Text>
                        </Text>
                        {proteinsOptions.map((option) => {
                          const checked = selectedProteins.includes(option.id);
                          return (
                            <TouchableOpacity
                              key={option.id}
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginVertical: 8,
                              }}
                              onPress={() => {
                                if (checked) {
                                  setSelectedProteins(
                                    selectedProteins.filter(
                                      (id) => id !== option.id
                                    )
                                  );
                                } else if (selectedProteins.length < 2) {
                                  setSelectedProteins([
                                    ...selectedProteins,
                                    option.id,
                                  ]);
                                }
                              }}
                            >
                              <View
                                style={{
                                  width: 20,
                                  height: 20,
                                  borderRadius: 4,
                                  borderWidth: 2,
                                  borderColor: checked
                                    ? colors.seaGreen
                                    : "#ccc",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  marginRight: 12,
                                }}
                              >
                                {checked && (
                                  <View
                                    style={{
                                      width: 12,
                                      height: 12,
                                      borderRadius: 2,
                                      backgroundColor: colors.seaGreen,
                                    }}
                                  />
                                )}
                              </View>
                              <Text style={{ flex: 1 }}>{option.name}</Text>
                              <Text>₦{option.price.toLocaleString()}</Text>
                            </TouchableOpacity>
                          );
                        })}
                        {/* DRINKS */}
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: 16,
                            color: "#475467",
                            marginTop: 20,
                            marginBottom: 4,
                          }}
                        >
                          DRINKS{" "}
                          <Text style={{ color: colors.gray, fontSize: 12 }}>
                            Select 1
                          </Text>
                        </Text>
                        {drinksOptions.map((option) => (
                          <TouchableOpacity
                            key={option.id}
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              marginVertical: 8,
                            }}
                            onPress={() => setSelectedDrink(option.id)}
                          >
                            <View
                              style={{
                                width: 20,
                                height: 20,
                                borderRadius: 10,
                                borderWidth: 2,
                                borderColor:
                                  selectedDrink === option.id
                                    ? colors.seaGreen
                                    : "#ccc",
                                alignItems: "center",
                                justifyContent: "center",
                                marginRight: 12,
                              }}
                            >
                              {selectedDrink === option.id && (
                                <View
                                  style={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: 6,
                                    backgroundColor: colors.seaGreen,
                                  }}
                                />
                              )}
                            </View>
                            <Text style={{ flex: 1 }}>{option.name}</Text>
                            <Text>₦{option.price.toLocaleString()}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </ScrollView>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerContainer: {
    width: "100%",
    height: 120,
    position: "relative",
    backgroundColor: colors.seaGreen,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    overflow: "hidden",
  },
  bannerImage: {
    width: 224,
    height: 224,
    resizeMode: "cover",
    borderRadius: 122,
  },
  bannerText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: colors.seaGreen,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: "hidden",
    width: "45%",
  },
  menuSection: {
    paddingBottom: 32,
    flex: 1,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 18,
    // marginVertical: 16,
    marginBottom: 8,
    color: "#475467",
    backgroundColor: colors.white,
    height: 48,
    width: "100%",
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  errorText: {
    color: colors.red,
    textAlign: "center",
    marginVertical: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    // alignItems: "center",
  },
  modalContent: {
    backgroundColor: colors.white,
    width: "100%",
    height: "80%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
