import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import OrderCard, { Order } from "./OrderCard";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const orders: Order[] = [
  {
    id: 1,
    image: require("../../../../assets/images/orders/roundabout-fish.png"), // Replace with your actual image path
    title: "Roundabout Fish",
    otherItems: 0,
    date: "9 AUG",
    time: "03:34PM",
    location: "Foodies, Lekki 1",
    price: 1400,
    isCompleted: false,
    restaurant: {
      logo: "https://images.pexels.com/photos/2180780/pexels-photo-2180780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      name: "Foodies",
      address: "Lekki 1, Lagos",
    },
    status: "pending",
  },
  {
    id: 2,
    image: require("../../../../assets/images/orders/ewa-agoin.png"), // Replace with your actual image path
    title: "Ewa Agoin",
    otherItems: 3,
    date: "28 JUL",
    time: "08:47PM",
    location: "Yakoyo Food Canteen",
    price: 4300,
    isCompleted: false,
    restaurant: {
      logo: "https://images.pexels.com/photos/2180780/pexels-photo-2180780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      name: "Yakoyo Food Canteen",
      address: "Ikeja, Lagos",
    },
    status: "confirmed",
  },
];

type RootStackParamList = {
  OrderSummary: { order: Order };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const OpenOrders = () => {
  const navigation = useNavigation<NavigationProp>();
  const handleOrderPress = (order: Order) => {
    navigation.navigate("OrderSummary", { order });
  };
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          onPress={() => handleOrderPress(order)}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 16,
  },
});
