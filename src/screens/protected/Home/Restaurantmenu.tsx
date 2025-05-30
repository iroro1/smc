import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  AddCircle,
  Clock,
  CloseCircle,
  DollarCircle,
  Message2,
  TickSquare,
} from "iconsax-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import {
  MenuItem,
  MenuItemProps,
} from "../../../components/restaurant/MenuItem";
import { RestaurantHeader } from "../../../components/restaurant/RestaurantHeader";
import { RestaurantHeaderInfo } from "../../../components/restaurant/RestaurantHeaderInfo";
import { addToCart } from "../../../redux/slices/cartSlice";
import { useAppDispatch } from "../../../redux/store";
import { colors } from "../../../utils/colors";

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

type RootStackParamList = {
  Checkout: undefined;
  Home: undefined;
  Cart: undefined;
  Restaurantmenu: { externalDelivery?: boolean; mealId?: number };
  DineOrDeliver: { externalDelivery?: boolean; mealId?: number };
};

type RestaurantMenuNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Checkout" | "Home" | "Cart" | "Restaurantmenu" | "DineOrDeliver"
>;

type RestaurantMenuRouteProp = RouteProp<RootStackParamList, "Restaurantmenu">;

export const RestaurantMenu = () => {
  const navigation = useNavigation<RestaurantMenuNavigationProp>();
  const route = useRoute<RestaurantMenuRouteProp>();
  const dispatch = useAppDispatch();
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [showBanner, setShowBanner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItemProps | null>(null);
  const [selectedSide, setSelectedSide] = useState<number | null>(null);
  const [selectedProteins, setSelectedProteins] = useState<number[]>([]);
  const [selectedDrink, setSelectedDrink] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [fabOpen, setFabOpen] = useState(false);
  const fabAnim = useState(new Animated.Value(0))[0];
  const [showToast, setShowToast] = useState(false);
  const [reopenModal, setReopenModal] = useState(false);

  console.log(route.params);

  useEffect(() => {
    setLoading(false);
    setShowBanner(false);
    if (route.params?.externalDelivery) {
      setShowToast(true);
    }
  }, [route.params]);

  useEffect(() => {
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  }, [showToast]);

  const handleAddToCart = () => {
    if (!selectedItem) return;

    const selectedSideItem = sidesOptions.find(
      (opt) => opt.id === selectedSide
    );
    const selectedProteinsItems = proteinsOptions.filter((opt) =>
      selectedProteins.includes(opt.id)
    );
    const selectedDrinkItem = drinksOptions.find(
      (opt) => opt.id === selectedDrink
    );

    dispatch(
      addToCart({
        id: selectedItem.id,
        name: selectedItem.name,
        price: selectedItem.price,
        quantity,
        image: selectedItem.image,
        side: selectedSideItem,
        proteins: selectedProteinsItems,
        drink: selectedDrinkItem,
        restaurantId: route.params?.mealId,
        restaurantName: route.params?.restaurantName,
      })
    );

    setSelectedItem(null);

    navigation.navigate("DineOrDeliver", {
      externalDelivery: route.params?.externalDelivery,
      mealId: route.params?.mealId,
    });
  };
  const handlePress = (item: MenuItemProps) => {
    console.log("Pressing:", item);
    setSelectedItem(item);
  };

  const handleFabPress = () => {
    setFabOpen((open) => {
      Animated.timing(fabAnim, {
        toValue: open ? 0 : 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
      return !open;
    });
  };
  const handleFabClose = () => {
    Animated.timing(fabAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setFabOpen(false));
  };

  const handleExternalDelivery = () => {
    if (!selectedItem) return;

    const selectedSideItem = sidesOptions.find(
      (opt) => opt.id === selectedSide
    );
    const selectedProteinsItems = proteinsOptions.filter((opt) =>
      selectedProteins.includes(opt.id)
    );
    const selectedDrinkItem = drinksOptions.find(
      (opt) => opt.id === selectedDrink
    );

    dispatch(
      addToCart({
        id: selectedItem.id,
        name: selectedItem.name,
        price: selectedItem.price,
        quantity,
        image: selectedItem.image,
        side: selectedSideItem,
        proteins: selectedProteinsItems,
        drink: selectedDrinkItem,
      })
    );

    // Show success toast
    setShowToast(true);

    // Close the modal
    setSelectedItem(null);

    // Hide toast after 4 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };
  const SuccessIcon = () => {
    return (
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22 12C22 17.5228 17.5228 22 12 22H2.9937C2.11018 22 1.66771 20.9229 2.29245 20.2929L4.2495 18.3195C2.84334 16.597 2 14.397 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15.7071 10.7071C16.0976 10.3166 16.0976 9.68342 15.7071 9.29289C15.3166 8.90237 14.6834 8.90237 14.2929 9.29289L11 12.5858L9.70711 11.2929C9.31658 10.9024 8.68342 10.9024 8.29289 11.2929C7.90237 11.6834 7.90237 12.3166 8.29289 12.7071L10.2929 14.7071C10.4804 14.8946 10.7348 15 11 15C11.2652 15 11.5196 14.8946 11.7071 14.7071L15.7071 10.7071Z"
          fill="#12B76A"
        />
      </Svg>
    );
  };
  const MessageIcon = () => {
    return (
      <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <Path
          d="M15 0.429688H5C2 0.429688 0 2.42969 0 5.42969V11.4297C0 14.4297 2 16.4297 5 16.4297V18.5597C5 19.3597 5.89 19.8397 6.55 19.3897L11 16.4297H15C18 16.4297 20 14.4297 20 11.4297V5.42969C20 2.42969 18 0.429688 15 0.429688ZM10 12.5997C9.58 12.5997 9.25 12.2597 9.25 11.8497C9.25 11.4397 9.58 11.0997 10 11.0997C10.42 11.0997 10.75 11.4397 10.75 11.8497C10.75 12.2597 10.42 12.5997 10 12.5997ZM11.26 8.44969C10.87 8.70969 10.75 8.87969 10.75 9.15969V9.36969C10.75 9.77969 10.41 10.1197 10 10.1197C9.59 10.1197 9.25 9.77969 9.25 9.36969V9.15969C9.25 7.99969 10.1 7.42969 10.42 7.20969C10.79 6.95969 10.91 6.78969 10.91 6.52969C10.91 6.02969 10.5 5.61969 10 5.61969C9.5 5.61969 9.09 6.02969 9.09 6.52969C9.09 6.93969 8.75 7.27969 8.34 7.27969C7.93 7.27969 7.59 6.93969 7.59 6.52969C7.59 5.19969 8.67 4.11969 10 4.11969C11.33 4.11969 12.41 5.19969 12.41 6.52969C12.41 7.66969 11.57 8.23969 11.26 8.44969Z"
          fill="white"
        />
      </Svg>
    );
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
          name={route.params?.restaurantName}
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
                    onAddToCart={() => handlePress(item)}
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
                  onAddToCart={() => handlePress(item)}
                  onPress={() => handlePress(item)}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {showToast && (
        <View
          style={{
            position: "absolute",
            bottom: 16,
            left: 16,
            right: 16,
            backgroundColor: "#fff",
            borderRadius: 12,
            padding: 16,
            flexDirection: "row",
            alignItems: "flex-start",
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
            zIndex: 9999,
            marginTop: 16,
          }}
        >
          <View style={{ marginRight: 16 }}>
            <SuccessIcon />
          </View>
          <View style={{ flex: 1, position: "relative" }}>
            <TouchableOpacity
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                zIndex: 9999,
              }}
              onPress={() => setShowToast(false)}
            >
              <Text style={{ color: "#475467", fontSize: 14 }}>X</Text>
            </TouchableOpacity>
            <Text
              style={{ fontWeight: "bold", color: "#1D2939", fontSize: 16 }}
            >
              Successfully added to cart
            </Text>
            <Text style={{ color: "#475467", fontSize: 14 }}>
              You can go ahead and checkout to make payment.
            </Text>
          </View>
        </View>
      )}
      <Modal
        visible={!!selectedItem}
        onRequestClose={() => setSelectedItem(null)}
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => setSelectedItem(null)}>
            <View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ padding: 0 }}
              scrollEnabled={true}
              showsVerticalScrollIndicator={true}
              nestedScrollEnabled={true}
            >
              <View
                style={{
                  padding: 16,
                }}
              >
                <Image
                  source={selectedItem?.image}
                  style={{
                    width: "100%",
                    height: 240,
                    resizeMode: "cover",
                    borderRadius: 12,
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  marginTop: 24,
                  width: "100%",
                  paddingHorizontal: 16,
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
              <View
                style={{
                  marginTop: 24,
                  // paddingHorizontal: 16,
                  paddingBottom: 32,
                }}
              >
                {/* SIDES */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 16,
                    backgroundColor: "#F2F4F7",
                    marginBottom: 16,
                    height: 48,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "400",
                      fontSize: 13,
                      color: "#667085",
                    }}
                  >
                    SIDES{" "}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        height: 20,
                        width: 62,
                        borderRadius: 60,
                        backgroundColor: "#FECDCA",
                      }}
                    >
                      <Text
                        style={{
                          color: "#F04438",
                          fontSize: 12,
                          fontWeight: "400",
                        }}
                      >
                        Required
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        height: 20,
                        width: 62,
                        borderRadius: 60,
                        backgroundColor: "#D0D5DD",
                      }}
                    >
                      <Text
                        style={{
                          color: "#475467",
                          fontSize: 12,
                          fontWeight: "400",
                        }}
                      >
                        Select 1
                      </Text>
                    </View>
                  </View>
                </View>
                {sidesOptions.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 8,
                      paddingHorizontal: 16,
                    }}
                    onPress={() => setSelectedSide(option.id)}
                  >
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 4,
                        borderWidth: 2,
                        borderColor:
                          selectedSide === option.id ? colors.seaGreen : "#ccc",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 12,
                      }}
                    >
                      {selectedSide === option.id && (
                        <TickSquare
                          size={20}
                          color={colors.seaGreen}
                          variant="Bold"
                        />
                      )}
                    </View>
                    <Text style={{ flex: 1 }}>{option.name}</Text>
                    <Text>₦{option.price.toLocaleString()}</Text>
                  </TouchableOpacity>
                ))}
                {/* PROTEINS */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 16,
                    backgroundColor: "#F2F4F7",
                    marginBottom: 16,
                    height: 48,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "400",
                      fontSize: 13,
                      color: "#667085",
                    }}
                  >
                    PROTEINS{" "}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#D0D5DD",
                      borderRadius: 60,
                      height: 20,
                      width: 100,
                    }}
                  >
                    <Text style={{ color: colors.gray, fontSize: 12 }}>
                      Select up to 2
                    </Text>
                  </View>
                </View>
                {proteinsOptions.map((option) => {
                  const checked = selectedProteins.includes(option.id);
                  return (
                    <TouchableOpacity
                      key={option.id}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginVertical: 8,
                        paddingHorizontal: 16,
                      }}
                      onPress={() => {
                        if (checked) {
                          setSelectedProteins(
                            selectedProteins.filter((id) => id !== option.id)
                          );
                        } else if (selectedProteins.length < 2) {
                          setSelectedProteins([...selectedProteins, option.id]);
                        }
                      }}
                    >
                      <View
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 4,
                          borderWidth: 2,
                          borderColor: checked ? colors.seaGreen : "#ccc",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: 12,
                        }}
                      >
                        {checked && (
                          <TickSquare
                            size={20}
                            color={colors.seaGreen}
                            variant="Bold"
                          />
                        )}
                      </View>
                      <Text style={{ flex: 1 }}>{option.name}</Text>
                      <Text>₦{option.price.toLocaleString()}</Text>
                    </TouchableOpacity>
                  );
                })}
                {/* DRINKS */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 16,
                    backgroundColor: "#F2F4F7",
                    marginBottom: 16,
                    height: 48,
                  }}
                >
                  <Text style={{ color: "#475467", fontSize: 12 }}>DRINKS</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#D0D5DD",
                      borderRadius: 60,
                      height: 20,
                      width: 100,
                    }}
                  >
                    <Text style={{ color: "#475467", fontSize: 12 }}>
                      Select 1
                    </Text>
                  </View>
                </View>

                {drinksOptions.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 8,
                      paddingHorizontal: 16,
                    }}
                    onPress={() => setSelectedDrink(option.id)}
                  >
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 4,
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
                        <TickSquare
                          size={20}
                          color={colors.seaGreen}
                          variant="Bold"
                        />
                      )}
                    </View>
                    <Text style={{ flex: 1 }}>{option.name}</Text>
                    <Text>₦{option.price.toLocaleString()}</Text>
                  </TouchableOpacity>
                ))}

                {/* Quantity and Add to Cart Buttons */}
                <View
                  style={{
                    flexDirection: "row",
                    paddingHorizontal: 16,
                    paddingTop: 24,
                    gap: 12,
                  }}
                >
                  {/* Quantity Selector */}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      borderWidth: 1,
                      borderColor: "#D0D5DD",
                      borderRadius: 8,
                      height: 48,
                      flex: 1,
                      minWidth: 120,
                      backgroundColor: "#EAECF0",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        width: 48,
                        height: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRightWidth: 1,
                        borderRightColor: "#D0D5DD",
                      }}
                      onPress={() => {
                        if (quantity > 0) {
                          setQuantity(quantity - 1);
                        }
                      }}
                    >
                      <Text style={{ fontSize: 20, color: "#475467" }}>-</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 1, alignItems: "center" }}>
                      <Text style={{ fontSize: 16, color: "#1D2939" }}>
                        {quantity}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        width: 48,
                        height: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        borderLeftWidth: 1,
                        borderLeftColor: "#D0D5DD",
                      }}
                      onPress={() => {
                        setQuantity(quantity + 1);
                      }}
                    >
                      <Text style={{ fontSize: 20, color: "#475467" }}>+</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Add to Cart Button */}
                  <TouchableOpacity
                    style={{
                      backgroundColor:
                        selectedSide &&
                        selectedProteins.length > 0 &&
                        selectedDrink
                          ? colors.seaGreen
                          : colors.gray,
                      borderRadius: 8,
                      height: 48,
                      flex: 2,
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: "50%",
                    }}
                    onPress={handleAddToCart}
                    disabled={
                      !selectedSide ||
                      selectedProteins.length === 0 ||
                      !selectedDrink
                    }
                  >
                    <Text
                      style={{
                        color: colors.white,
                        fontSize: 16,
                        fontWeight: "600",
                      }}
                    >
                      Add to Cart
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* <TouchableOpacity
                  style={{
                    backgroundColor: colors.seaGreen,
                    borderRadius: 8,
                    height: 48,
                    flex: 2,
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "50%",
                    marginTop: 12,
                  }}
                  onPress={handleExternalDelivery}
                >
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                  >
                    External delivery
                  </Text>
                </TouchableOpacity> */}
              </View>
            </ScrollView>
          </View>
          {/* FAB Menu */}
          <View style={styles.fabMenuContainer} pointerEvents="box-none">
            {/* Expanded actions */}
            <Animated.View
              style={{
                opacity: fabAnim,
                transform: [
                  {
                    translateY: fabAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [40, 0],
                    }),
                  },
                ],
              }}
              pointerEvents={fabOpen ? "auto" : "none"}
            >
              <TouchableOpacity
                style={styles.fabAction}
                onPress={() => {
                  /* TODO: Checkout action */
                }}
              >
                <View style={styles.fabIconCircle}>
                  <DollarCircle size={24} color={colors.white} variant="Bold" />
                </View>
                <Text style={styles.fabActionText}>Checkout</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.fabAction}
                onPress={() => {
                  /* TODO: Help action */
                }}
              >
                <View style={styles.fabIconCircle}>
                  <MessageIcon />
                </View>
              </TouchableOpacity>
            </Animated.View>
            {/* Main FAB */}
            {fabOpen ? (
              <TouchableOpacity style={styles.fab} onPress={handleFabClose}>
                <CloseCircle size={24} color={colors.white} variant="Bold" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.fab} onPress={handleFabPress}>
                <AddCircle size={24} color={colors.white} variant="Bold" />
              </TouchableOpacity>
            )}
          </View>
        </View>
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
  },
  modalContent: {
    backgroundColor: colors.white,
    width: "100%",
    height: "80%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  fabMenuContainer: {
    position: "absolute",
    right: 0,
    bottom: "40%",
    alignItems: "flex-end",
    zIndex: 9999,
    width: 200,
  },
  fab: {
    backgroundColor: colors.black,
    width: 56,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8,
    borderTopLeftRadius: 120,
    borderBottomLeftRadius: 120,
    zIndex: 9999,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
      },
      android: {
        elevation: 8,
      },
    }),
  },
  fabAction: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.black,
    borderTopLeftRadius: 120,
    borderBottomLeftRadius: 120,
    marginBottom: 12,
    paddingVertical: 10,
    paddingLeft: 18,
    paddingRight: 12,
    minWidth: 56,
    minHeight: 46,
    alignSelf: "flex-end",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8,
  },
  fabIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  fabActionText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
  },
});
