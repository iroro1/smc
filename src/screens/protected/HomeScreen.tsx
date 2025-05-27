import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AddCircle, Location, SearchNormal } from "iconsax-react-native";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { colors } from "../../utils/colors";

type HomeStackParamList = {
  HomeScreen: undefined;
  RestaurantMenu: { restaurantId: string };
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  "HomeScreen"
>;

const { width } = Dimensions.get("window");

const bannerData = [
  {
    id: "1",
    text: "20% off orders above ₦20,000",
    bgColor: colors.seaGreen,
    textColor: colors.white,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "2",
    text: "20% off orders above ₦20,000",
    bgColor: colors.yellow + "80",
    textColor: colors.black,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
  },
  // Add more banners if needed
];

const restaurantData = [
  {
    id: "1",
    name: "Genesis Foods",
    address: "24b Admiralty Way, Lekki Phase 1",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    closed: false,
  },
  {
    id: "2",
    name: "The Place Lekki",
    address: "Admiralty Way, Lekki Phase 1",
    image:
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
    closed: false,
  },
  {
    id: "3",
    name: "Yakoyo Food Canteen",
    address: "14 Okotie Str, Off Gbagada Expressway",
    image:
      "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80",
    closed: true,
  },
  {
    id: "4",
    name: "Marriot Hotels Restaurant",
    address: "122 Joel Ogunnaike St, Ikeja GRA",
    image:
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
    closed: false,
  },
  {
    id: "5",
    name: "Circa Lagos",
    address: "2 Kola Adeyina Close, Off Jerry Iriabe St, Lekki Phase I",
    image:
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
    closed: false,
  },
];

const Dots = ({
  activeIndex,
  numOfDots,
  style,
  onPress,
}: {
  activeIndex: number;
  numOfDots: number;
  style?: StyleProp<ViewStyle>;
  onPress?: (index: number) => void;
}) => (
  <View style={[styles.dotsContainer, style]}>
    {Array.from({ length: numOfDots }).map((_, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.dot,
          {
            backgroundColor:
              activeIndex === index ? colors.seaGreen : colors.lightGray,
          },
        ]}
        onPress={() => {
          onPress?.(index);
        }}
      />
    ))}
  </View>
);

const BannerHeader = ({
  scrollViewRef,
  activeBannerIndex,
  setActiveBannerIndex,
}: {
  scrollViewRef: React.RefObject<FlatList<any> | null>;
  activeBannerIndex: number;
  setActiveBannerIndex: (index: number) => void;
}) => (
  <View style={styles.bannerHeaderContainer}>
    <FlatList
      ref={scrollViewRef}
      data={bannerData}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View
          style={[
            styles.promoBanner,
            { backgroundColor: item.bgColor, overflow: "hidden" },
          ]}
        >
          <Text style={[styles.promoText, { color: item.textColor }]}>
            {item.text}
          </Text>
          <Image source={{ uri: item.image }} style={styles.promoImage} />
        </View>
      )}
    />

    <Dots
      activeIndex={activeBannerIndex}
      numOfDots={bannerData.length}
      style={{ width: "100%", justifyContent: "center" }}
      onPress={(index) => {
        setActiveBannerIndex(index);
        scrollViewRef.current?.scrollToIndex({ index, animated: true });
      }}
    />

    <Text style={styles.sectionTitle}>Available restaurants</Text>
  </View>
);

export const HomeScreen = () => {
  const scrollViewRef = useRef<FlatList<any>>(null);
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <View style={styles.container}>
      {/* Header with location and search bar */}
      <View style={styles.header}>
        <TouchableOpacity>
          <View style={styles.locationContainer}>
            <Location size={20} color={colors.gray} variant="Bold" />

            <View style={styles.locationTextContainer}>
              <Text style={styles.location}>
                10, Cottage Crescent, Lekki 1, Lagos.
              </Text>
              <Ionicons
                name="chevron-down"
                size={16}
                color={colors.gray}
                style={{ marginLeft: 4 }}
              />
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <SearchNormal
            size={20}
            color={colors.gray}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchBar}
            placeholder="Find a restaurant"
            placeholderTextColor={colors.gray}
          />
        </View>
      </View>
      <FlatList
        data={restaurantData}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <BannerHeader
            scrollViewRef={scrollViewRef}
            activeBannerIndex={activeBannerIndex}
            setActiveBannerIndex={setActiveBannerIndex}
          />
        }
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.restaurantCard}
            onPress={() => {
              navigation.navigate("RestaurantMenu", {
                restaurantId: item.id,
              });
            }}
          >
            <Image
              style={styles.restaurantImage}
              source={{ uri: item.image }}
            />
            {item.closed && (
              <View style={styles.closedBadge}>
                <Text style={styles.closedBadgeText}>Closed</Text>
              </View>
            )}
            <View style={styles.restaurantInfo}>
              <Text style={styles.restaurantName}>{item.name}</Text>
              <Text style={styles.restaurantAddress}>{item.address}</Text>
            </View>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "flex-start",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.gray + "40",
    width: "100%",
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  locationTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    width: "90%",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "flex-start",
    marginBottom: 16,
    width: "100%",
  },
  location: {
    color: colors.seaGreen,
    fontWeight: "600",
    fontSize: 14,
  },
  searchBar: {
    backgroundColor: "transparent",
    color: colors.black,
    width: "100%",
    fontSize: 16,
    fontWeight: "500",
    height: 44,
  },
  bannerHeaderContainer: {
    paddingBottom: 16,
    overflow: "visible",
  },
  promoBanner: {
    backgroundColor: colors.seaGreen,
    margin: 6,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    minWidth: width,
    maxWidth: width * 0.9,
    height: 120,
  },
  promoText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    flex: 1,
  },
  promoImage: {
    width: "60%",
    height: 224,
    borderRadius: 112,
    marginLeft: 16,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 16,
    marginLeft: 16,
    color: "#475467",
  },
  restaurantCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    marginHorizontal: 16,
    // padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    height: 224,
    overflow: "hidden",
  },
  restaurantInfo: {
    paddingHorizontal: 12,
    // paddingVertical: 8,
  },
  restaurantImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },
  restaurantName: {
    fontWeight: "600",
    fontSize: 16,
    color: "#1D2939",
  },
  restaurantAddress: {
    color: "#475467",
    fontSize: 14,
    marginTop: 4,
  },
  closedBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#F04438",
    paddingHorizontal: 12,
    paddingVertical: 4,
    zIndex: 1,
    borderBottomLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  closedBadgeText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
  fab: {
    position: "absolute",
    right: 0,
    bottom: "40%",
    backgroundColor: colors.black,
    width: 56,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    borderTopLeftRadius: 120,
    borderBottomLeftRadius: 120,
    zIndex: 1000,
  },
  fabText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  dotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
