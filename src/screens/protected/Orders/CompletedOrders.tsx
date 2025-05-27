import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import OrderCard, { Order } from "./OrderCard";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  OrderSummary: { order: Order };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const completedOrders: Order[] = [
  {
    id: "1",
    image: require("../../../../assets/images/orders/jollof-rice.png"),
    mainItem: "Smokey Jollof Rice",
    otherItems: 7,
    date: "12 AUG",
    time: "04:27PM",
    location: "Marriot Hotels Restaurant",
    price: 43400,
    isCompleted: true,
    restaurant: {
      logo: "https://example.com/marriot-logo.png",
      name: "Marriot Hotels Restaurant",
      address: "Victoria Island, Lagos",
    },
  },
  {
    id: "2",
    image: require("../../../../assets/images/orders/eba.png"),
    mainItem: "White Eba",
    otherItems: 1,
    date: "9 AUG",
    time: "03:12PM",
    location: "Foodies, Lekki 1",
    price: 6950,
    isCompleted: true,
    restaurant: {
      logo: "https://example.com/foodies-logo.png",
      name: "Foodies",
      address: "Lekki 1, Lagos",
    },
  },
  {
    id: "3",
    image: require("../../../../assets/images/orders/roundabout-fish.png"),
    mainItem: "Roundabout Fish",
    otherItems: 0,
    date: "9 AUG",
    time: "03:34PM",
    location: "Foodies, Lekki 1",
    price: 1400,
    isCompleted: true,
    restaurant: {
      logo: "https://example.com/foodies-logo.png",
      name: "Foodies",
      address: "Lekki 1, Lagos",
    },
  },
  {
    id: "4",
    image: require("../../../../assets/images/orders/ewa-agoin.png"),
    mainItem: "Ewa Agoin",
    otherItems: 3,
    date: "28 JUL",
    time: "08:47PM",
    location: "Yakoyo Food Canteen",
    price: 4300,
    isCompleted: true,
    restaurant: {
      logo: "https://example.com/yakoyo-logo.png",
      name: "Yakoyo Food Canteen",
      address: "Ikeja, Lagos",
    },
  },
];

export const CompletedOrders = () => {
  const navigation = useNavigation<NavigationProp>();
  const handleOrderPress = (order: Order) => {
    navigation.navigate("OrderSummary", { order });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={completedOrders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <OrderCard order={item} onPress={() => handleOrderPress(item)} />
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
});
